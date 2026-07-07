# Medicare in Bend Site

A production-ready Next.js (App Router) website for a local Medicare insurance agency serving Bend, OR and surrounding Central Oregon communities.

> **Deployment status:** The GitHub Actions workflow (`.github/workflows/deploy.yml`) is configured for the Bend project (`medicare-bend-site` / `medicare-bend-site-beta`, `us-west1`) with a guard that blocks any Spokane target. **Nothing is deployed yet** — a deploy runs only after the Google Cloud setup and GitHub Variables/Secrets are in place and either `DEPLOY_ENABLED=true` (push-to-`main` beta) or a manual dispatch is used. The GCP/Cloud Run instructions below are the setup to complete.
>
> **Canonical environment reference:** For the full Bend environment variables, CRM setup, Firestore configuration, and smoke-test details, see [`docs/bend-environment.md`](docs/bend-environment.md) (added in this same PR).

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Deployment**: Google Cloud Run (Docker)

## Features

- SEO-optimized layout with metadata, Open Graph, and Twitter cards
- JSON-LD structured data (LocalBusiness + FAQPage schemas)
- Dynamic XML sitemap and robots.txt generation
- Local SEO page structure:
  - **Central Oregon local Medicare pages**: `/medicare-bend`, `/medicare-redmond`, `/medicare-sisters`, `/medicare-sunriver`, `/medicare-la-pine`, `/medicare-prineville`, `/medicare-madras`
- Fully responsive design
- Static generation with `generateStaticParams`

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Building for Production

```bash
npm run build
npm start
```

## Docker / Google Cloud Run

> Cloud Run deployment is wired up in **PR 5** and is not live yet. The commands below are the target reference.

The Dockerfile is a multi-stage Alpine/Node 20 build that produces the Next.js [`standalone`](https://nextjs.org/docs/app/api-reference/config/next-config-js/output) output. The runtime stage runs as a non-root user and listens on `0.0.0.0:8080` (Cloud Run's expected contract).

```bash
# Build Docker image
docker build -t medicare-bend-site .

# Run locally (Cloud Run-style: PORT 8080)
docker run -p 8080:8080 \
  -e NEXT_PUBLIC_SITE_URL=http://localhost:8080 \
  medicare-bend-site

# Manual one-off deploy (for emergencies — normal deploys go through CI)
gcloud run deploy medicare-bend-site \
  --image=REGION-docker.pkg.dev/PROJECT/REPO/medicare-bend-site:TAG \
  --platform=managed \
  --region=us-west1 \
  --allow-unauthenticated \
  --service-account=cloud-run-runtime@PROJECT.iam.gserviceaccount.com \
  --set-env-vars=NEXT_PUBLIC_SITE_URL=https://www.medicareinbend.com,FIREBASE_PROJECT_ID=PROJECT,NODE_ENV=production
```

## Continuous Deployment (GitHub Actions → Cloud Run)

> **Configured but not turned on.** The workflow at `.github/workflows/deploy.yml` targets the Bend project, but no deploy runs until (a) the Google Cloud setup and GitHub Variables/Secrets in [`docs/deploy-beta-checklist.md`](docs/deploy-beta-checklist.md) are complete, and (b) either `DEPLOY_ENABLED=true` is set (for push-to-`main` beta deploys) or you run a manual dispatch. See [`docs/bend-environment.md`](docs/bend-environment.md).

The workflow triggers on push to `main` and on manual dispatch:
- **Push to `main`** deploys **beta** — and only when the `DEPLOY_ENABLED` repo variable is `true`.
- **Manual dispatch** lets you choose `beta` or `production`. **Production is only ever deployed by a manual dispatch** (never automatically).

On each run it:

1. Lints (`npm run lint`), typechecks (`npm run typecheck`), tests (`npm test`), and builds (`npm run build`) the project, then runs a sanity check that the built sitemap is Bend-only.
2. Builds the Docker image and pushes it to Artifact Registry, tagged with the commit SHA.
3. Deploys the new image to Cloud Run, binding the runtime service account so the container picks up Application Default Credentials for Firestore.

### Required GitHub configuration

Set these in **Settings → Secrets and variables → Actions**.

#### Variables (not secrets — visible in logs)

| Variable | Example | Purpose |
|---|---|---|
| `GCP_PROJECT_ID` | `medicare-bend-site` | Target GCP project |
| `GCP_REGION` | `us-west1` | Cloud Run + Artifact Registry region |
| `CLOUD_RUN_SERVICE` | `medicare-bend-site` | Production Cloud Run service name |
| `CLOUD_RUN_SERVICE_BETA` | `medicare-bend-site-beta` | Beta Cloud Run service name |
| `ARTIFACT_REGISTRY_REPO` | `web` | Existing Artifact Registry repo in `GCP_REGION` |
| `RUNTIME_SERVICE_ACCOUNT` | `cloud-run-runtime@<project>.iam.gserviceaccount.com` | SA the container runs as. **Must have `roles/datastore.user`** on the Firestore project, and `roles/secretmanager.secretAccessor` on `crm-prod-api-key` for production CRM sync. |
| `FIREBASE_PROJECT_ID` | same as `GCP_PROJECT_ID` (usually) | Tells `firebase-admin` which project's Firestore to talk to |
| `DEPLOY_ENABLED` | `true` | Set to `true` to allow push-to-`main` **beta** deploys. Leave unset to require a manual dispatch for every deploy. Production is **only** deployed by a manual dispatch. |

> **CRM:** the workflow sets `CRM_API_BASE_URL` per target automatically (production only) and injects `CRM_API_KEY` from the Secret Manager secret `crm-prod-api-key` — it is **not** a GitHub secret. Beta omits CRM, so beta leads report `crmSyncStatus: "skipped"`. See [`docs/bend-environment.md`](docs/bend-environment.md).

#### Authentication — pick **one**

**A) Workload Identity Federation (recommended — no long-lived keys):**

| Variable | Purpose |
|---|---|
| `GCP_WORKLOAD_IDENTITY_PROVIDER` | Full provider resource name, e.g. `projects/123456789/locations/global/workloadIdentityPools/github/providers/github` |
| `GCP_DEPLOY_SERVICE_ACCOUNT` | Deployer SA email, e.g. `github-deployer@<project>.iam.gserviceaccount.com` |

The deployer SA needs: `roles/run.admin`, `roles/artifactregistry.writer`, and `roles/iam.serviceAccountUser` on the runtime SA.

**B) Service-account JSON key (legacy fallback):**

| Secret | Purpose |
|---|---|
| `GCP_SERVICE_ACCOUNT_KEY` | Entire JSON key for the deployer SA. Store as a **secret**, never a variable. |

The workflow auto-detects which path to use based on whether `GCP_WORKLOAD_IDENTITY_PROVIDER` is set.

### One-time GCP setup checklist

- [ ] Enable APIs: `run.googleapis.com`, `artifactregistry.googleapis.com`, `firestore.googleapis.com`, `iamcredentials.googleapis.com`.
- [ ] Create the Firestore database in **Native** mode in the chosen region.
- [ ] Create an Artifact Registry **Docker** repo (`gcloud artifacts repositories create web --repository-format=docker --location=$REGION`).
- [ ] Create the **runtime** service account and grant it `roles/datastore.user`.
- [ ] Create the **deployer** service account and grant it `roles/run.admin`, `roles/artifactregistry.writer`, `roles/iam.serviceAccountUser` (on the runtime SA).
- [ ] (WIF only) Create a Workload Identity Pool + Provider for GitHub OIDC and bind the deployer SA to the GitHub repo.
- [ ] Configure all GitHub variables/secrets listed above.
- [ ] (Optional, after first dedupe query in prod) Click the auto-generated link in Cloud Run logs to create the composite indexes for `website_leads`.

### Deployment checklist (per release)

- [ ] PR is green (lint, test, build all pass via the `ci` job).
- [ ] No new `FIREBASE_*` secrets are needed — the runtime SA's ADC is used in Cloud Run.
- [ ] Set `DEPLOY_ENABLED=true`, then merge to `main` → workflow deploys **beta** (production stays manual-dispatch only).
- [ ] Verify the new revision in Cloud Run console; check `100%` traffic is on the new revision.
- [ ] Hit `https://www.medicareinbend.com/api/leads` with a smoke test payload and confirm a doc appears in Firestore.
- [ ] Watch Cloud Run logs for ~5 min for any `[leads]` or `[api/leads]` errors.

## Project Structure

```
app/
├── layout.tsx          # Root layout — metadata, Header, Footer
├── page.tsx            # Home page
├── sitemap.ts          # Dynamic XML sitemap
├── robots.ts           # robots.txt
├── not-found.tsx       # 404 page
├── medicare-*/         # Core Medicare + Central Oregon local area pages
├── api/                # Lead + review-feedback API routes
└── healthz/            # Health check endpoint
components/
├── Header.tsx
├── Footer.tsx
├── CTASection.tsx
└── LocalBusinessSchema.tsx
lib/
├── cities.ts           # City data
├── zips.ts             # ZIP code data
├── topics.ts           # Medicare topic data
└── site.ts             # Site-wide config
```

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | The canonical URL of the site | `https://www.medicareinbend.com` |
| `PORT` | Port the server listens on (Cloud Run sets this automatically) | `8080` |
| `LEADS_COLLECTION` | Firestore collection for lead documents | `website_leads` |
| `FIREBASE_PROJECT_ID` | GCP project that owns the Firestore database | _required for lead capture_ |
| `FIREBASE_CLIENT_EMAIL` | Service-account client email (admin SDK) | _required if not using ADC_ |
| `FIREBASE_PRIVATE_KEY` | Service-account private key. Newlines may be escaped as `\n` — they are unescaped at runtime. **Server-only — never expose to the client.** | _required if not using ADC_ |
| `GOOGLE_APPLICATION_CREDENTIALS` | Path to a service-account JSON. Used as a fallback when the three vars above are not set. | _optional_ |
| `CRM_API_BASE_URL` | Base URL for the CRM public form submission endpoint (e.g. `https://crm-prod-910764532297.us-west1.run.app`). **Server-only — never expose to the client.** | _required for CRM sync_ |
| `CRM_API_KEY` | Optional server-side API key forwarded to the CRM public form submission endpoint as an `x-api-key` header. Never expose it to the client. | _optional_ |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID (e.g. `GTM-XXXXXXX`). When set, GTM is loaded site-wide and lead submissions fire a `generate_lead` dataLayer event. Empty disables GTM entirely. | _optional_ |
| `NEXT_PUBLIC_SITE_ENV` | `production`, `staging`, `beta`, `preview`, or `development`. Anything other than `production` forces `noindex,nofollow` on every page and a blanket `Disallow: /` in `robots.txt`. The conversion event is tagged with this so you can filter staging traffic out of GA4 / Ads. | `production` |

**Production (Cloud Run):** set only `NEXT_PUBLIC_SITE_URL`, `FIREBASE_PROJECT_ID`, and `NODE_ENV=production`. **Do not** set `FIREBASE_CLIENT_EMAIL` / `FIREBASE_PRIVATE_KEY` — Cloud Run's runtime service account provides Application Default Credentials automatically (see the deployment section below). See [`docs/bend-environment.md`](docs/bend-environment.md) for the full, canonical list of Bend values.


When running on Google Cloud Run, the simplest setup is to grant the Cloud Run service account the `roles/datastore.user` (Firestore) role and rely on Application Default Credentials — no `FIREBASE_*` env vars are required in that case.

## Lead Capture (Firestore)

`POST /api/leads` validates the request, writes a sanitized document to the `website_leads` collection as a backup, then submits the full form payload to the CRM public form endpoint (`api/public/forms/medicare-in-bend-contact/submit`) from the server-side route. Standard lead forms require `fullName` plus either `email` or `phone`; `zip` and `message` are optional. Stored fields:

- `fullName`, `email`, `phone`, `zip`, `message`
- `emailNorm`, `phoneNorm` — normalized identities used for dedupe
- `source` (`homepage` | `contact` | `compare-medicare-options` | `rx-drug-review` | `turning-65-medicare-bend` | `working-past-65-medicare` | `helping-parent-with-medicare` | `medicare-appointment-checklist` | `medicare-plan-review-bend` | `medicare-enrollment-resources` | `medicare-advantage` | `medicare-supplements` | `medicare-part-d` | `supplemental-insurance` | `carriers` | `testimonials` | `about` | `request-contact` | `medicare-faq` | `medicare-bend` | `medicare-redmond` | `medicare-sisters` | `medicare-sunriver` | `medicare-la-pine` | `medicare-prineville` | `medicare-madras` | `review-feedback` | `unknown`)
- Attribution: `sourcePath`, `referrer`, `utm`, `clientSubmittedAt`
- Server stamps: `submittedAt` (Firestore Timestamp), `submittedAtIso`, `createdAt` (`serverTimestamp`)
- Workflow: `status: "new"`, `siteSource: "medicareinbend.com"`
- CRM sync tracking: `crmSyncStatus`, `crmSyncAttempts`, `crmContactId`, `crmLastAttemptAt`, `crmLastAttemptAtIso`, `crmLastError`, `crmLastResponseStatus`, `crmEndpointPath`

If the same normalized email **or** phone submits again within 10 minutes, the existing document id is returned with `duplicate: true` instead of creating a new doc. If that recent lead has not synced to the CRM yet, the server retries the CRM sync against the existing Firestore backup before responding.

The Firebase Admin SDK is only ever imported via `lib/firebase-admin.ts`, and the CRM client lives in the server-only `lib/crm.ts`. Both are only called from the Node.js route handler, so the Firestore credentials and CRM API key are never exposed to the browser.

`POST /api/review-feedback` follows the same backup-first pattern for the review funnel: validate the request, save the feedback to the `review_feedback` collection, then attempt the CRM public form sync without blocking a successful response after the Firestore write.

### Suggested Firestore index

For the dedupe lookup, create composite indexes on `website_leads`:

- `emailNorm` (Asc) + `submittedAt` (Desc)
- `phoneNorm` (Asc) + `submittedAt` (Desc)

Firestore will print an "index required" link in the server logs the first time the query runs in production — opening it auto-creates the right index.

## Testing

```bash
npm test
```

Runs lightweight unit tests for the pure validation/dedupe helpers in `lib/leadValidation.ts` (Node's built-in `node:test` via `tsx`).

## Analytics & conversion tracking

Tracking is **opt-in** via `NEXT_PUBLIC_GTM_ID`. When that variable is set, the layout loads Google Tag Manager via `@next/third-parties/google` once for the whole app, and successful lead-form submissions push a privacy-friendly conversion event onto the `dataLayer`:

```js
{
  event: "generate_lead",          // GA4 recommended event name
  lead_source: "homepage",          // which form was used
  had_message: "no",                 // boolean as string
  site_env: "production",
  utm_source, utm_medium, utm_campaign, utm_term, utm_content   // when present
}
```

**Privacy guarantees** (enforced in `lib/analytics.ts`):

- Name, email, phone, ZIP, free-text message body, and IP address are **never** sent to GTM/GA4.
- Only structural metadata (form ID, env, UTM tags) is forwarded.
- Map `generate_lead` to a Conversion / Google Ads conversion inside GTM — no extra code needed.

## Operational endpoints

| Path | Purpose |
|---|---|
| `/healthz` | Liveness probe for Cloud Run / uptime monitors. Returns `{ status: "ok", uptime }` with `Cache-Control: no-store`. Performs no I/O so it cannot fail because of Firestore. |
| `/robots.txt` | Auto-generated. Disallows everything when `NEXT_PUBLIC_SITE_ENV` ≠ `production`. |
| `/sitemap.xml` | Auto-generated from `lib/cities`, `lib/zips`, `lib/topics`. |

## Security headers

Set in `next.config.ts` for every path:

- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: DENY`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()`
- `Cross-Origin-Opener-Policy: same-origin`
- `X-Powered-By` is suppressed (`poweredByHeader: false`).

## Launch QA checklist

Run through this before flipping DNS to the Cloud Run URL.

**Build & runtime**
- [ ] `npm run lint` clean
- [ ] `npm test` all green
- [ ] `npm run build` succeeds and reports the expected route count
- [ ] Container starts locally on `:8080` (`docker run -p 8080:8080 …`)
- [ ] `GET /healthz` returns 200 with `{"status":"ok"}`

**SEO / indexing**
- [ ] `NEXT_PUBLIC_SITE_ENV=production` is set in Cloud Run for the live service
- [ ] Beta revisions have `NEXT_PUBLIC_SITE_ENV=beta` and serve `Disallow: /` at `/robots.txt`
- [ ] `/robots.txt` on prod allows crawling and lists `/sitemap.xml`
- [ ] `/sitemap.xml` includes the core pages and the 7 Central Oregon local pages (and has **no** ZIP, directory, or health-insurance routes)
- [ ] Each page has a unique `<title>` and canonical tag pointing at `https://www.medicareinbend.com/...`

**Forms & lead capture**
- [ ] Submitting the homepage form creates a Firestore doc in `website_leads`
- [ ] Submitting the contact form (with message) creates a doc with `message` populated
- [ ] Re-submitting the same email/phone within the dedupe window updates the existing doc rather than duplicating
- [ ] On success, the GTM dataLayer contains a `generate_lead` event with **no** name/email/phone/ZIP fields
- [ ] GTM Preview mode confirms the event fires and contains only the whitelisted fields

**Security headers**
- [ ] `curl -I https://www.medicareinbend.com/` shows all headers from `next.config.ts`
- [ ] `X-Powered-By` header is absent
- [ ] HTTPS enforced (HSTS); HTTP redirects to HTTPS at the load balancer / Cloud Run domain

**Error pages**
- [ ] `/this-route-does-not-exist` renders the styled 404 page
- [ ] Forcing a render error shows the in-layout error page with a working "Try again" button

**Analytics**
- [ ] GTM container is published (not just in workspace)
- [ ] GA4 sees `generate_lead` events from production traffic only
- [ ] The Google Ads conversion (if applicable) is mapped to the same event

## Phase 6 — Beta deployment runbook

> **Not enabled yet.** The steps below describe the target beta setup. The deploy workflow is Bend-ready; deployment stays off until the Google Cloud setup and GitHub Variables/Secrets are complete and `DEPLOY_ENABLED=true` (or a manual dispatch) is used. Full runbook: [`docs/deploy-beta-checklist.md`](docs/deploy-beta-checklist.md).

> **For the owner doing the actual deploy:** the full beginner-friendly, click-by-click checklist (GitHub vars, GCP APIs, Artifact Registry, Cloud Run service, IAM, DNS, dispatching the workflow, post-deploy QA, and promotion to prod) is in [`docs/deploy-beta-checklist.md`](docs/deploy-beta-checklist.md). The canonical Bend environment values live in [`docs/bend-environment.md`](docs/bend-environment.md). The summary below is the short version.

Phase 6 deploys the site to a **separate** Cloud Run service at `beta.medicareinbend.com` so production QA can happen against real Cloud Run + real Firestore without risking the live root domain.

### One-time setup

1. **Create a second Cloud Run service** (empty placeholder is fine — the workflow will replace it):
   ```bash
   gcloud run deploy medicare-bend-site-beta \
     --image=us-docker.pkg.dev/cloudrun/container/hello \
     --region="$GCP_REGION" \
     --no-allow-unauthenticated   # tighten until you're ready
   ```
2. **Add GitHub repo variables** (Settings → Secrets and variables → Actions → Variables):
   - `CLOUD_RUN_SERVICE_BETA` = `medicare-bend-site-beta`
   - `NEXT_PUBLIC_GTM_ID` = `GTM-XXXXXXX` (or leave unset to disable GTM)
   - All existing prod vars must remain set: `GCP_PROJECT_ID`, `GCP_REGION`, `ARTIFACT_REGISTRY_REPO`, `RUNTIME_SERVICE_ACCOUNT`, `FIREBASE_PROJECT_ID`, `CLOUD_RUN_SERVICE`.
3. **Map the beta domain** in Cloud Run → Manage Custom Domains:
   - Domain: `beta.medicareinbend.com`
   - Service: `medicare-bend-site-beta`
   - Add the CNAME record GCP gives you to your DNS provider.

### Trigger the beta deploy

GitHub → Actions → **Deploy to Cloud Run** → **Run workflow** → choose:
- Branch: `main` (or your release branch)
- Target: `beta`

The workflow will:
- Build the image with `NEXT_PUBLIC_SITE_URL=https://beta.medicareinbend.com`, `NEXT_PUBLIC_SITE_ENV=beta`, `NEXT_PUBLIC_GTM_ID=$VAR` baked in.
- Push to `…/site-beta:<sha>` in Artifact Registry.
- Deploy to the `medicare-bend-site-beta` service with the same vars set as runtime env (and `FIREBASE_PROJECT_ID`, `NODE_ENV=production`).

> ⚠️ `NEXT_PUBLIC_*` values are inlined into the client JS bundle at `next build`. Setting them only on Cloud Run is not enough — they must also be passed as `--build-arg` (the workflow does this).

### Post-deploy QA on beta

Run the [Launch QA checklist](#launch-qa-checklist) against `https://beta.medicareinbend.com`. In particular:
- `curl -sI https://beta.medicareinbend.com/robots.txt` shows `Disallow: /` (because `NEXT_PUBLIC_SITE_ENV=beta`).
- `curl -sI https://beta.medicareinbend.com/healthz` returns `200`.
- View source on any page → `<meta name="robots" content="noindex,nofollow,…">` is present.
- Submit a test lead → check Firestore `website_leads` for the doc (with `crmSyncStatus: "skipped"` since beta omits CRM), and GTM Preview for a `generate_lead` event tagged `site_env: "beta"` with **no** name/email/phone/zip in the payload.
- Confirm security headers on `curl -sI https://beta.medicareinbend.com/` (HSTS, `X-Frame-Options: DENY`, etc.).

### Promote to production

After beta passes QA, re-run the same workflow with **Target: production**. It rebuilds with `NEXT_PUBLIC_SITE_ENV=production` and `NEXT_PUBLIC_SITE_URL=https://www.medicareinbend.com` and deploys to the `medicare-bend-site` service.
