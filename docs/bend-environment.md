# Medicare in Bend — Environment & Deployment Readiness

Canonical reference for environment variables, CRM/lead configuration, Firestore,
and the manual smoke tests for **medicareinbend.com**.

> **Nothing here is deployed yet.** This document prepares the site for a later
> deployment PR (PR 5). No Google Cloud resources are created, no DNS is
> connected, and the GitHub Actions workflow is intentionally left un-migrated
> (see the `TODO(bend-deploy)` comment in `.github/workflows/deploy.yml`).

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
| `CRM_API_KEY` | *(from Secret Manager)* | Forwarded as `x-api-key`. **Never commit.** Store as a Secret Manager secret and inject at runtime. |
| `NODE_ENV` | `production` | |

On Cloud Run, the runtime service account's Application Default Credentials
provide Firestore access — do **not** set `FIREBASE_CLIENT_EMAIL` /
`FIREBASE_PRIVATE_KEY` there.

### Recommended for beta / staging

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://beta.medicareinbend.com` |
| `NEXT_PUBLIC_SITE_ENV` | `beta` (or `staging`) — serves `Disallow: /` so beta is never indexed |
| `FIREBASE_PROJECT_ID` | `medicare-bend-site` |
| `CRM_API_BASE_URL` | `https://crm-prod-910764532297.us-west1.run.app` **or intentionally omitted** if CRM sync should be skipped on beta |
| `CRM_API_KEY` | *(from Secret Manager)* — only if beta should sync to the CRM |
| `NODE_ENV` | `production` |

**To run beta without touching the CRM:** omit `CRM_API_BASE_URL`. Leads still
save to Firestore and the API reports `crmSyncStatus: "skipped"` (see §3).

### Other (optional) variables

| Variable | Purpose | Default |
|---|---|---|
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container id; empty disables GTM. | *(unset)* |
| `LEADS_COLLECTION` | Firestore collection override. | `website_leads` |
| `REVIEW_FEEDBACK_COLLECTION` | Firestore collection for review feedback. | `review_feedback` |

**No secrets belong in the repo.** `CRM_API_KEY` and any service-account keys are
injected at deploy/runtime only (Secret Manager / Cloud Run), never hardcoded.

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
  (`us-west1`) when the project is set up in PR 5.

---

## 5. Planned Google Cloud resources (PR 5 — not created yet)

| Resource | Value |
|---|---|
| Google Cloud project | `medicare-bend-site` |
| Region | `us-west1` |
| Cloud Run prod service | `medicare-bend-site` |
| Cloud Run beta service | `medicare-bend-site-beta` |
| Firestore | Native mode, `us-west1` |
| Secret Manager secret | `crm-prod-api-key` (or a Bend-specific name) → injected as `CRM_API_KEY` |
| Prod domain | `www.medicareinbend.com` |
| Beta domain | `beta.medicareinbend.com` |

The GitHub Actions workflow (`.github/workflows/deploy.yml`) still references the
prior project's values and repo Variables. It must be repointed to the Bend
project/services and have `CRM_API_BASE_URL` / `CRM_API_KEY` wired in PR 5 before
any Bend deploy. **Do not merge to `main` expecting a correct Bend deployment
until then.**

---

## 6. Manual smoke tests (run after PR 5 deploys — not now)

Do **not** submit real production leads during development. After a beta/prod
deploy:

1. Submit a test lead from the **homepage** (`/`).
2. Submit a test lead from **`/contact`**.
3. Submit a test lead from **`/medicare-bend`**.
4. Verify each lead appears in the Firestore `website_leads` collection with the
   expected `source` (`homepage`, `contact`, `medicare-bend`).
5. Verify `crmSyncStatus` on the API response / Firestore doc:
   - CRM configured + form registered → `synced` (and a CRM contact/timeline/task
     appears in the CRM).
   - CRM not configured → `skipped`.
   - CRM configured but slug not registered → `failed` with a config-issue log.
6. Confirm `/sitemap.xml` uses `https://www.medicareinbend.com` and `/robots.txt`
   references the Bend sitemap; on beta, confirm `Disallow: /`.

### Expected behavior summary

- **CRM not configured:** website lead succeeds; `crmSyncStatus: "skipped"`.
- **CRM form slug missing on the CRM:** website lead succeeds;
  `crmSyncStatus: "failed"`; logs show a CRM form-slug / configuration problem.
- **CRM healthy:** website lead succeeds; `crmSyncStatus: "synced"`.

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
- **Google Cloud / Cloud Run / DNS setup** — deferred to PR 5.
