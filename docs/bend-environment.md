# Medicare in Bend — Environment & Deployment Readiness

Canonical reference for environment variables, CRM/lead configuration, Firestore,
and the manual smoke tests for **medicareinbend.com**.

> **Nothing is deployed yet, but the workflow is Bend-ready.** The GitHub Actions
> workflow (`.github/workflows/deploy.yml`) is now fully migrated to the Bend
> project (`medicare-bend-site` / `medicare-bend-site-beta`, `us-west1`) with a
> guard that refuses to deploy anything referencing the prior (non-Bend) project.
> Deployment stays OFF until the owner completes the Google Cloud setup, sets the
> GitHub Variables/Secrets, and either sets the repo Variable `DEPLOY_ENABLED=true`
> (push-to-main deploys **beta** only) or runs a manual `workflow_dispatch`
> (the only way to deploy **production**). No Google Cloud resources are created
> and no DNS is connected by this repo — see
> [`deploy-beta-checklist.md`](deploy-beta-checklist.md) for the click-by-click runbook.

---

## 1. Environment variables

`NEXT_PUBLIC_*` values are inlined into the client bundle at `next build`, so in
Cloud Run they must be passed as **build args** (not only runtime env). Server-only
values (`FIREBASE_*`, `CRM_*`) are read at request time.

### Required for production

| Variable | Value | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://www.medicareinbend.com` | Canonical URL; drives sitemap, robots, canonicals, and CRM `sourceUrl`. |
| `NEXT_PUBLIC_SITE_ENV` | `production` | Anything other than `production` forces `noindex,nofollow` + `Disallow: /`. |
| `FIREBASE_PROJECT_ID` | `medicare-bend-site` | Firestore project for lead capture. |
| `CRM_API_BASE_URL` | `https://crm-prod-910764532297.us-west1.run.app` | Base URL for the CRM public form endpoint. **Server-only.** |
| `CRM_API_KEY` | *(from Secret Manager secret `crm-prod-api-key`)* | Forwarded as `x-api-key`. **Bound at deploy time from Secret Manager (`crm-prod-api-key:latest`) — NOT a GitHub secret and never committed.** Only the secret **name** ever appears in the workflow; the value never touches the repo, image, env block, or logs. |
| `NODE_ENV` | `production` | |

On Cloud Run, the runtime service account's Application Default Credentials
provide Firestore access — do **not** set `FIREBASE_CLIENT_EMAIL` /
`FIREBASE_PRIVATE_KEY` there.

### Recommended for beta

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://beta.medicareinbend.com` |
| `NEXT_PUBLIC_SITE_ENV` | `beta` — serves `Disallow: /` so beta is never indexed |
| `FIREBASE_PROJECT_ID` | `medicare-bend-site` |
| `CRM_API_BASE_URL` | *(empty by default)* — the workflow omits it on beta so CRM sync is skipped |
| `CRM_API_KEY` | *(not bound on beta)* — beta omits the CRM entirely, so no secret is attached |
| `NODE_ENV` | `production` |

**The workflow runs beta without the CRM by default:** `CRM_API_BASE_URL` is empty
and no `CRM_API_KEY` secret is bound, so leads still save to Firestore and the API
reports `crmSyncStatus: "skipped"` (see §3).

### Other (optional) variables

| Variable | Purpose | Default |
|---|---|---|
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container id; empty disables GTM. | *(unset)* |
| `LEADS_COLLECTION` | Firestore collection override. | `website_leads` |
| `REVIEW_FEEDBACK_COLLECTION` | Firestore collection for review feedback. | `review_feedback` |

**No secrets belong in the repo.** `CRM_API_KEY` and any service-account keys are
injected at deploy/runtime only (Secret Manager / Cloud Run), never hardcoded.

### Deploy-control variable (GitHub Actions)

| Variable | Value | Notes |
|---|---|---|
| `DEPLOY_ENABLED` | `true` | **GitHub repo Variable** (not an app env var). Set to `true` to allow a push to `main` to auto-deploy **beta** (never production). Leave unset/false to require a manual `workflow_dispatch` for every deploy. |

Production is deployed **only** by a manual `workflow_dispatch` with Target
`production`; there is no push trigger for production. `CRM_API_KEY` is bound from
the Secret Manager secret `crm-prod-api-key` at deploy time — it is **not** a
GitHub secret. Full click-by-click setup lives in
[`deploy-beta-checklist.md`](deploy-beta-checklist.md).

---

## 2. CRM configuration

- **Public form slug:** `medicare-in-bend-contact`
  (`lib/crmPaths.ts` → `CRM_PUBLIC_FORM_SLUG`).
- **Submission path:** `api/public/forms/medicare-in-bend-contact/submit`.
- **Site source stamp:** `medicareinbend.com` (`lib/leadConstants.ts` → `SITE_SOURCE`),
  written to both the CRM payload (`source` / `siteSource`) and the Firestore doc.
- **`sourceUrl`** is derived from `NEXT_PUBLIC_SITE_URL`, e.g.
  `https://www.medicareinbend.com/contact`.

### CRM-side setup required (blocker for CRM sync)

The live CRM must have a **public form registered with the slug
`medicare-in-bend-contact`** before CRM sync can succeed. Until then, submissions
return HTTP 404 and the lead is recorded as `crmSyncStatus: "failed"` with a log
line flagging it as a CRM configuration issue (see §3). This registration is a
CRM-side action — it is **not** done from this repo, and **no CRM records are
created by this PR**.

---

## 3. Lead capture & CRM sync behavior

Flow (`app/api/leads/route.ts` → `lib/leads.ts`):

1. Validate + normalize the request.
2. **Save to Firestore first** (`website_leads`), then attempt CRM sync.
3. The API returns HTTP **200** with `ok: true` for a successful website save
   **regardless of CRM outcome** — a CRM problem never fails the website lead.

The response includes `crmSyncStatus`:

| `crmSyncStatus` | When | HTTP | Logging |
|---|---|---|---|
| `synced` | CRM accepted the submission | 200 | info |
| `skipped` | `CRM_API_BASE_URL` not configured — sync not attempted | 200 | info (not an error) |
| `failed` | CRM configured but the request failed (timeout, 4xx/5xx) | 200 | error (safe fields only) |

Special cases:
- **Missing CRM env → `skipped`, not a 500.** A missing `CRM_API_BASE_URL` is a
  normal state; the website lead still succeeds.
- **CRM 404 (form slug not registered) → `failed`** and the log line is marked as
  a **CRM configuration issue** (`crmConfigurationIssue: true`, includes
  `crmFormSlug`) so it is actionable rather than hidden.
- **Duplicate within 10 minutes** (same normalized email or phone) is idempotent:
  the existing lead id is returned. If that prior lead has not yet synced, a CRM
  retry is attempted; if it was already synced, `crmSyncStatus: "synced"` is
  returned.
- **Safe logging:** failures log only structural/safe fields (source, status,
  endpoint path, clipped error text) — no API keys and no free-text message body.

---

## 4. Firestore

- **Collection:** `website_leads` (leads), `review_feedback` (review funnel).
- Duplicate detection queries by `emailNorm` **or** `phoneNorm` combined with
  `submittedAt`, so the following **single-field-plus-timestamp composite
  indexes** are needed on `website_leads`:
  - `emailNorm` (Asc) + `submittedAt` (Desc)
  - `phoneNorm` (Asc) + `submittedAt` (Desc)
- Firestore should be created in **Native mode** in the same region as Cloud Run
  (`us-west1`) during project setup (see checklist §5f).

---

## 5. Planned Google Cloud resources (not created yet)

| Resource | Value |
|---|---|
| Google Cloud project | `medicare-bend-site` |
| Region | `us-west1` |
| Cloud Run prod service | `medicare-bend-site` |
| Cloud Run beta service | `medicare-bend-site-beta` |
| Firestore | Native mode, `us-west1` |
| Firestore composite indexes | `website_leads` on `emailNorm` (Asc) + `submittedAt` (Desc); `website_leads` on `phoneNorm` (Asc) + `submittedAt` (Desc) |
| Secret Manager secret | `crm-prod-api-key` → bound as `CRM_API_KEY` (`crm-prod-api-key:latest`) on production only |
| Prod domain | `www.medicareinbend.com` |
| Beta domain | `beta.medicareinbend.com` |

**Required Google Cloud APIs** (enabled during setup — see checklist §2):
`run`, `artifactregistry`, `cloudbuild`, `iamcredentials`, `iam`, `firestore`,
`secretmanager` (holds `crm-prod-api-key`), `cloudresourcemanager` (project
metadata + IAM policy bindings), and `compute` (optional Load Balancer path).

The GitHub Actions workflow (`.github/workflows/deploy.yml`) is already pointed at
the Bend project/services and resolves `CRM_API_BASE_URL` (production only) and the
`CRM_API_KEY` Secret Manager binding automatically per target. No Bend deploy runs
until the owner completes the Cloud setup, sets the GitHub Variables/Secrets, and
either sets `DEPLOY_ENABLED=true` (push-to-main beta) or runs a manual dispatch
(production). A guard step fails the deploy if any resolved target still references
the prior (non-Bend) project/service.

### 5a. DNS / domain mapping (planned — do not connect yet)

Documented for reference only; no DNS is connected by this repo. Cloud Run custom
domain mappings issue their own certs, so records point at Google's frontend:

| Host | Record | Value | Target service |
|---|---|---|---|
| `www.medicareinbend.com` | CNAME | `ghs.googlehosted.com.` | `medicare-bend-site` (prod) |
| `beta.medicareinbend.com` | CNAME | `ghs.googlehosted.com.` | `medicare-bend-site-beta` (beta) |
| `medicareinbend.com` (apex) | A | `216.239.32.21`, `216.239.34.21`, `216.239.36.21`, `216.239.38.21` | apex → redirected to `www` |

If Google requests IPv6 for the apex, also add AAAA records
`2001:4860:4802:32::15`, `2001:4860:4802:34::15`, `2001:4860:4802:36::15`,
`2001:4860:4802:38::15`. The apex (`medicareinbend.com`) is **301-redirected to
`https://www.medicareinbend.com`** by the app's proxy — with no `:8080` in the
redirect `Location`.

---

## 6. Manual smoke tests (run after a deploy — only submit leads if approved)

Do **not** submit real production leads during development, and only submit test
leads with the owner's approval. After a beta/prod deploy:

1. Submit a test lead from the **homepage** (`/`).
2. Submit a test lead from **`/contact`**.
3. Submit a test lead from **`/medicare-bend`**.
4. Verify each lead appears in the Firestore `website_leads` collection with the
   expected `source` (`homepage`, `contact`, `medicare-bend`).
5. Verify `crmSyncStatus` on the API response / Firestore doc:
   - **Beta** → `skipped`. Beta omits the CRM (`CRM_API_BASE_URL` empty, no
     `CRM_API_KEY` secret), so sync is never attempted (logged as info, not error).
   - **Production, form slug registered** → `synced` (and a CRM contact/timeline/task
     appears in the CRM).
   - **Production, slug `medicare-in-bend-contact` not yet registered** → `failed`
     with a CRM configuration-issue log. The website lead still succeeds.
6. Confirm `/sitemap.xml` uses `https://www.medicareinbend.com` and `/robots.txt`
   references the Bend sitemap; on beta, confirm `Disallow: /`. The sitemap must
   contain no `/zip`, `/directory`, health-insurance, or prior-project (non-Bend)
   URLs — only `medicareinbend.com`.
7. On production, confirm the apex `medicareinbend.com` 301-redirects to
   `https://www.medicareinbend.com` with no `:8080` in the redirect `Location`.

### Expected behavior summary

- **Beta (CRM omitted):** website lead succeeds; `crmSyncStatus: "skipped"`.
- **Production, CRM form slug missing on the CRM:** website lead succeeds;
  `crmSyncStatus: "failed"`; logs show a CRM form-slug / configuration problem.
- **Production, CRM healthy:** website lead succeeds; `crmSyncStatus: "synced"`.

---

## 7. Open TODOs (need real values from the owner)

- **Bend phone** — placeholder `541-555-0100` in `lib/site.ts` (`TODO(bend-contact)`).
- **Bend email** — `info@medicareinbend.com` (confirm).
- **Physical office vs. appointment-only** — currently "by phone, online, and by
  appointment" (no street address claimed).
- **Bend Google Business Profile review URL** — set `GOOGLE_REVIEW_URL` in
  `lib/reviewFlow.ts` to re-enable 5-star outbound review routing (currently
  disabled; all ratings are collected internally).
- **Bend/Oregon carrier representation count** — the CMS disclaimer stays generic
  until confirmed; do not add a specific organization/product count.
- **Final Bend team roster** — currently Devon West and Denise Chan only.
- **CRM-side registration** of the `medicare-in-bend-contact` public form slug.
- **Google Cloud / Cloud Run / DNS setup** — owner-run setup, not done from this
  repo (see [`deploy-beta-checklist.md`](deploy-beta-checklist.md)).
