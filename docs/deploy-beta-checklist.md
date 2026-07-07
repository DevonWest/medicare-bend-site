# Owner deployment checklist — `beta.medicareinbend.com`

> **Bend-ready, but deployment is still OFF.** The GitHub Actions workflow (`.github/workflows/deploy.yml`) is now fully migrated to the Bend project — it targets `medicare-bend-site` / `medicare-bend-site-beta` in `us-west1` only, and a guard step refuses to deploy if any resolved target still references the prior (non-Bend) project/service. Nothing deploys yet, though, until **you** (the owner):
> 1. complete the Google Cloud setup in this checklist and set the GitHub **Variables/Secrets** in §1, and
> 2. either set the repo Variable **`DEPLOY_ENABLED=true`** — which lets a push to `main` auto-deploy **beta** (never production) — **or** run a **manual `workflow_dispatch`** (the only way to deploy production).
>
> Until both are done, merging to `main` deploys nothing. The workflow no longer carries a Bend-deploy TODO.
>
> **Canonical environment reference:** the full Bend environment variables, CRM setup, Firestore configuration, and smoke-test details live in [`bend-environment.md`](bend-environment.md). Use that as the source of truth for values; this checklist is the click-by-click procedure.

This is the **step-by-step, click-by-click** checklist to take this repo from "code is ready" to "beta is live at https://beta.medicareinbend.com on Google Cloud Run." Follow it top to bottom. You only do sections 1–6 once. After that, every deploy is just section 7.

> **Placeholders used in this doc** — replace them with your real values everywhere they appear:
> - `PROJECT_ID` → your GCP project, e.g. `medicare-bend-site`
> - `REGION` → a Cloud Run region near Central Oregon, recommended `us-west1`
> - `medicareinbend.com` → your real apex domain (already correct here)
>
> Anywhere this doc says "open the Cloud Console," go to https://console.cloud.google.com and make sure the project picker in the top bar shows your `PROJECT_ID` before clicking anything.

---

## 0. Prerequisites (5 min)

- [ ] You're an **Owner** or **Editor** on the GCP project `PROJECT_ID`.
- [ ] You're an **Admin** on the GitHub repo `DevonWest/medicare-bend-site`.
- [ ] You can edit DNS records for `medicareinbend.com` (whoever runs your registrar — GoDaddy, Cloudflare, Namecheap, Google Domains, etc.).
- [ ] You have `gcloud` installed locally **OR** you're comfortable running commands in Cloud Shell (the `>_` icon in the top right of the Cloud Console). Cloud Shell is easier — use it.
- [ ] In Cloud Shell, run once:
  ```bash
  gcloud config set project PROJECT_ID
  gcloud config set run/region REGION
  ```

---

## 1. GitHub repository variables and secrets (10 min)

The deploy workflow (`.github/workflows/deploy.yml`) reads these. You set them in **GitHub → your repo → Settings → Secrets and variables → Actions**.

> The workflow is already pointed at the Bend project and services; these Variables/Secrets are all it needs to run. See [`bend-environment.md`](bend-environment.md) for the full, canonical variable list and CRM values.

There are two tabs there: **Variables** (non-sensitive, shows in logs) and **Secrets** (sensitive, masked in logs). Put each item in the right tab.

### 1a. Variables (tab: "Variables" → "New repository variable")

| Name | Example value | Notes |
|---|---|---|
| `GCP_PROJECT_ID` | `medicare-bend-site` | Your GCP project ID (not the number) |
| `GCP_REGION` | `us-west1` | Same region you'll use for everything else |
| `ARTIFACT_REGISTRY_REPO` | `web` | The Artifact Registry repo name from §3 |
| `CLOUD_RUN_SERVICE` | `medicare-bend-site` | Production service name (from §4) |
| `CLOUD_RUN_SERVICE_BETA` | `medicare-bend-site-beta` | Beta service name (from §4) |
| `FIREBASE_PROJECT_ID` | `medicare-bend-site` | Usually same as `GCP_PROJECT_ID` |
| `RUNTIME_SERVICE_ACCOUNT` | `cloud-run-runtime@medicare-bend-site.iam.gserviceaccount.com` | The runtime SA from §5 |
| `DEPLOY_ENABLED` | `true` | Set to `true` to allow push-to-main **BETA** deploys. Leave unset/false to require a manual dispatch for every deploy. |
| `NEXT_PUBLIC_GTM_ID` | `GTM-XXXXXXX` | **Optional.** Leave unset to disable Google Tag Manager. |

> **CRM — you do NOT add anything here for it.** `CRM_API_BASE_URL` is set by the workflow per-target automatically (production only — `https://crm-prod-910764532297.us-west1.run.app`; beta leaves it empty so beta skips the CRM). `CRM_API_KEY` is **bound at deploy time from Secret Manager** (secret `crm-prod-api-key`), so the owner does **not** add `CRM_API_KEY` as a GitHub secret — it lives only in Secret Manager (see §5e). Full details in [`bend-environment.md`](bend-environment.md).

### 1b. Authentication — pick ONE of these two options

The workflow can authenticate to GCP either way. **Option A is recommended** (no long-lived keys to leak).

**Option A: Workload Identity Federation (recommended, keyless)**

You'll set this up fully in §5d. For now just know you'll add **two more Variables**:
- `GCP_WORKLOAD_IDENTITY_PROVIDER` — full resource name, looks like `projects/123456789/locations/global/workloadIdentityPools/github-pool/providers/github-provider`
- `GCP_DEPLOY_SERVICE_ACCOUNT` — the deployer SA email, e.g. `github-deployer@medicare-bend-site.iam.gserviceaccount.com`

**Option B: Service-account JSON key (legacy, easier first time)**

Add **one Secret** (Secrets tab → "New repository secret"):
- `GCP_SERVICE_ACCOUNT_KEY` — the full JSON of a service-account key file (you'll create this in §5d)

> If you set the WIF variables, the workflow ignores the JSON key. If both are missing, the workflow fails. Pick one.

---

## 2. Enable Google Cloud APIs (3 min)

In Cloud Shell:

```bash
gcloud services enable \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com \
  iamcredentials.googleapis.com \
  iam.googleapis.com \
  firestore.googleapis.com \
  secretmanager.googleapis.com \
  cloudresourcemanager.googleapis.com \
  compute.googleapis.com
```

What each one is for:
- `run` — Cloud Run itself.
- `artifactregistry` — stores your Docker images.
- `cloudbuild` — used implicitly by some `gcloud` flows.
- `iamcredentials` + `iam` — needed for Workload Identity Federation and impersonation.
- `firestore` — your `website_leads` collection lives here.
- `secretmanager` — holds the `crm-prod-api-key` secret that the workflow binds into production as `CRM_API_KEY` (§5e).
- `cloudresourcemanager` — lets the deploy tooling read project metadata and manage IAM policy bindings during setup.
- `compute` — needed if you ever switch from Cloud Run domain mappings to a Load Balancer (optional, §6 alt path).

You should see `Operation "operations/..." finished successfully.` for each.

---

## 3. Artifact Registry setup (2 min)

This is where built Docker images get pushed.

```bash
gcloud artifacts repositories create web \
  --repository-format=docker \
  --location=REGION \
  --description="Container images for the medicare-bend-site Next.js app"
```

If it says "already exists," that's fine — skip.

Verify:
```bash
gcloud artifacts repositories list --location=REGION
```
You should see a row with `web` and `DOCKER`.

> The repo name `web` is what you put in the `ARTIFACT_REGISTRY_REPO` GitHub variable in §1a. If you used a different name, update the GitHub variable to match.

---

## 4. Cloud Run beta service (and a placeholder prod service) (5 min)

You need **two** Cloud Run services so beta and prod never share a URL or env vars.

### 4a. Create the beta service

The first deploy from GitHub Actions will replace this image — we just need the service to exist so we can attach a domain mapping in §6.

```bash
gcloud run deploy medicare-bend-site-beta \
  --image=us-docker.pkg.dev/cloudrun/container/hello \
  --region=REGION \
  --platform=managed \
  --allow-unauthenticated \
  --port=8080
```

When it finishes, copy the `Service URL` it prints — it looks like `https://medicare-bend-site-beta-abcdefg-uw.a.run.app`. Open it in a browser; you should see Google's "It's running!" hello page. That confirms the service is up.

### 4b. (Recommended) Create the production service the same way

```bash
gcloud run deploy medicare-bend-site \
  --image=us-docker.pkg.dev/cloudrun/container/hello \
  --region=REGION \
  --platform=managed \
  --allow-unauthenticated \
  --port=8080
```

You won't deploy real prod traffic until §9 — this is just so the service name exists.

---

## 5. Service accounts and IAM (10 min)

You need **two** service accounts:

| Purpose | Suggested name | What it can do |
|---|---|---|
| **Runtime** — the identity Cloud Run uses to call Firestore from inside the container | `cloud-run-runtime` | `roles/datastore.user` on Firestore |
| **Deployer** — the identity GitHub Actions uses to build/push images and update Cloud Run | `github-deployer` | Push to Artifact Registry, deploy Cloud Run, act as runtime SA |

### 5a. Create the runtime service account

```bash
gcloud iam service-accounts create cloud-run-runtime \
  --display-name="Cloud Run runtime SA (medicare-bend-site)"
```

Grant it Firestore access:
```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:cloud-run-runtime@PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/datastore.user"
```

> `roles/datastore.user` is the right role for Firestore in Native mode (read + write documents, no admin). It's what `firebase-admin` needs to write to `website_leads`.

Put `cloud-run-runtime@PROJECT_ID.iam.gserviceaccount.com` into the `RUNTIME_SERVICE_ACCOUNT` GitHub variable from §1a.

### 5b. Create the deployer service account

```bash
gcloud iam service-accounts create github-deployer \
  --display-name="GitHub Actions deployer (medicare-bend-site)"
```

Grant it the four roles it needs:
```bash
DEPLOYER="github-deployer@PROJECT_ID.iam.gserviceaccount.com"

# Push images to Artifact Registry
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:$DEPLOYER" \
  --role="roles/artifactregistry.writer"

# Deploy and update Cloud Run services
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:$DEPLOYER" \
  --role="roles/run.admin"

# Read project metadata (needed by deploy-cloudrun action)
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:$DEPLOYER" \
  --role="roles/iam.serviceAccountUser"
```

### 5c. Let the deployer "act as" the runtime SA

The deployer needs permission to attach the runtime SA to the Cloud Run service:
```bash
gcloud iam service-accounts add-iam-policy-binding \
  cloud-run-runtime@PROJECT_ID.iam.gserviceaccount.com \
  --member="serviceAccount:github-deployer@PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"
```

### 5d. Give GitHub Actions a way to authenticate as the deployer

Pick **one**:

#### Option A — Workload Identity Federation (recommended)

```bash
PROJECT_NUMBER=$(gcloud projects describe PROJECT_ID --format='value(projectNumber)')

# 1. Create a pool
gcloud iam workload-identity-pools create "github-pool" \
  --location="global" \
  --display-name="GitHub Actions pool"

# 2. Create a provider for github.com inside that pool
gcloud iam workload-identity-pools providers create-oidc "github-provider" \
  --location="global" \
  --workload-identity-pool="github-pool" \
  --display-name="GitHub OIDC provider" \
  --issuer-uri="https://token.actions.githubusercontent.com" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository,attribute.ref=assertion.ref" \
  --attribute-condition="assertion.repository == 'DevonWest/medicare-bend-site'"

# 3. Allow the GitHub repo to impersonate the deployer SA
gcloud iam service-accounts add-iam-policy-binding \
  github-deployer@PROJECT_ID.iam.gserviceaccount.com \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/github-pool/attribute.repository/DevonWest/medicare-bend-site"
```

Now go back to GitHub → repo settings and add these two **Variables**:
- `GCP_WORKLOAD_IDENTITY_PROVIDER` = `projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/providers/github-provider`
- `GCP_DEPLOY_SERVICE_ACCOUNT` = `github-deployer@PROJECT_ID.iam.gserviceaccount.com`

(`PROJECT_NUMBER` is the numeric value `gcloud projects describe` printed.)

#### Option B — JSON key (faster but less secure)

```bash
gcloud iam service-accounts keys create /tmp/github-deployer.json \
  --iam-account=github-deployer@PROJECT_ID.iam.gserviceaccount.com
cat /tmp/github-deployer.json
```

Copy the **entire JSON output** (including the `{` and `}`) into a new GitHub **Secret** named `GCP_SERVICE_ACCOUNT_KEY`. Then **delete the file**:
```bash
rm /tmp/github-deployer.json
```

> Don't put this JSON in a Variable, in code, or in chat. Secret only.

### 5e. Secret Manager — CRM API key

> **Only needed before a PRODUCTION deploy.** Beta skips the CRM entirely (no key, no `CRM_API_BASE_URL`), so you can safely do all of §6–§8 without this. Do it before §9.

The workflow injects the CRM API key into the **production** Cloud Run service straight from Secret Manager (secret `crm-prod-api-key`, bound as `CRM_API_KEY`). The key value must **never** land in the repo, in GitHub, or in any log — only its **name** ever appears in the workflow.

1. Create the secret (this creates an empty container, not the value):
   ```bash
   gcloud secrets create crm-prod-api-key --replication-policy="automatic"
   ```

2. Add the key **value** as a new version *without echoing it*. Two safe options — pick one:

   **Option A — pipe from `printf` (do not paste the key into chat/tickets):**
   ```bash
   printf "%s" "PASTE_KEY_HERE" | gcloud secrets versions add crm-prod-api-key --data-file=-
   ```
   Replace `PASTE_KEY_HERE` with the real key. Afterward **clear your shell history** for that line (e.g. `history -d <n>`, or `unset HISTFILE` before running it) so the key isn't left on disk. Never paste the key into chat, a PR, or a ticket.

   **Option B — read from a file, then delete it:**
   ```bash
   # write the key into a file with an editor (no shell echo), then:
   gcloud secrets versions add crm-prod-api-key --data-file=/path/to/keyfile
   rm -f /path/to/keyfile
   ```

3. Grant the **runtime** service account read access to *this secret only* (not project-wide):
   ```bash
   gcloud secrets add-iam-policy-binding crm-prod-api-key \
     --member="serviceAccount:cloud-run-runtime@PROJECT_ID.iam.gserviceaccount.com" \
     --role="roles/secretmanager.secretAccessor"
   ```

> The key value lives **only** in Secret Manager. It is never added as a GitHub secret, never printed by the workflow, and never baked into the image. To rotate it, add a new version with step 2 — the workflow always binds `crm-prod-api-key:latest`.

### 5f. Firestore database and indexes

1. Create the Firestore database in **Native mode** in your region (only if the project doesn't already have one):
   ```bash
   gcloud firestore databases create --location=REGION
   ```
   Use the region (or multi-region) that matches your Cloud Run region — `us-west1` is fine. Native mode is required (the app uses `firebase-admin`); do **not** pick Datastore mode.

2. You don't create the collection by hand — the app **auto-creates `website_leads`** on the first lead submission.

3. Add the two **composite indexes** the duplicate-detection query needs (it looks up an existing lead by normalized email **or** phone within a 10-minute window). On the `website_leads` collection:
   - `emailNorm` (Ascending) + `submittedAt` (Descending)
   - `phoneNorm` (Ascending) + `submittedAt` (Descending)

   You can create these in **Cloud Console → Firestore → Indexes → Composite → Create Index**. Easier: the first time the duplicate-check query runs without an index, Firestore returns an error whose log line includes a **"create index" link** — click it and Firestore builds the exact index for you. (Index builds take a few minutes; leads still save while they build.)

---

## 6. Domain mapping for `beta.medicareinbend.com` (10 min, plus DNS propagation wait)

We're using Cloud Run's built-in **custom domain mappings** — simpler than a full Load Balancer and free.

### 6a. Verify the apex domain (one-time, only if you've never done it for this Google account)

If this account has never added a custom domain to GCP for `medicareinbend.com`, you'll need to verify domain ownership at https://search.google.com/search-console → Add Property → Domain → `medicareinbend.com`. It will give you a `TXT` record to add at your DNS provider. Add it, click Verify, done. (Skip this if your account already owns the domain in Search Console.)

### 6b. Create the Cloud Run domain mapping

In the **Cloud Console**:
1. Go to **Cloud Run** → **Manage Custom Domains** (button at top of the services list).
2. Click **Add Mapping**.
3. **Service**: select `medicare-bend-site-beta`.
4. **Domain**: enter `beta.medicareinbend.com`.
5. Click **Continue**. It will show you a **CNAME** record to add — usually:
   ```
   beta   CNAME   ghs.googlehosted.com.
   ```

### 6c. Add the DNS record at your registrar

At your DNS provider (GoDaddy / Cloudflare / Namecheap / Google Domains / etc.):
- **Type:** CNAME
- **Name / Host:** `beta` (some providers want `beta.medicareinbend.com` — both work)
- **Value / Target:** `ghs.googlehosted.com.` (include the trailing dot if the UI accepts it)
- **TTL:** 300 (5 min) for the first 24 hours, then bump to 3600 once you're stable
- **Cloudflare users only:** click the orange cloud to set the record to **DNS only** (grey cloud) for the initial setup. You can re-enable proxying later if you want, but Cloud Run's auto-issued cert needs DNS-only at first.

### 6d. Wait for the cert

Back in Cloud Run → Manage Custom Domains, the row for `beta.medicareinbend.com` will progress through `Awaiting domain verification` → `Provisioning certificate` → `OK`. This usually takes 5–30 minutes but can take up to 24 hours. Refresh occasionally.

When it shows **OK**, `https://beta.medicareinbend.com` will serve the placeholder hello page from §4a.

> **Skip the Load Balancer alternative unless you need it.** A global HTTPS Load Balancer + serverless NEG is only worth it if you want Cloud Armor / IAP / a single IP for multiple services. For one beta subdomain, domain mapping is correct.

---

## 7. Trigger the GitHub Actions deploy (2 min)

1. Go to **GitHub → your repo → Actions**.
2. In the left sidebar pick **Deploy to Cloud Run**.
3. Click **Run workflow** (right side).
4. Fill in:
   - **Branch:** `main`
   - **Target:** `beta`
5. Click **Run workflow**.

> You can also trigger a beta deploy by pushing to `main` **once `DEPLOY_ENABLED=true`** is set (§1a). A push to `main` only ever deploys **beta** — production is never deployed by a push.

What happens:
- The `ci` job runs `npm ci`, then `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, and a **sitemap sanity check** that greps the built sitemap for `medicareinbend.com`, fails on any forbidden URL (a prior-project domain, `/zip`, `/directory`, or health-insurance route), and confirms the `/healthz` route exists. All must pass.
- The `deploy` job authenticates to GCP, then a guard step fails the deploy if any resolved target (project, services, service accounts) still references the prior (non-Bend) project. It then builds a Docker image with build-args
  - `NEXT_PUBLIC_SITE_URL=https://beta.medicareinbend.com`
  - `NEXT_PUBLIC_SITE_ENV=beta`
  - `NEXT_PUBLIC_GTM_ID=<value of your GitHub variable, or empty>`
- It pushes the image to `REGION-docker.pkg.dev/PROJECT_ID/web/site-beta:<commit-sha>`.
- It deploys that image to the `medicare-bend-site-beta` Cloud Run service with the runtime SA attached and these env vars set:
  - `NEXT_PUBLIC_SITE_URL=https://beta.medicareinbend.com`
  - `NEXT_PUBLIC_SITE_ENV=beta`
  - `NEXT_PUBLIC_GTM_ID=<same as above>`
  - `FIREBASE_PROJECT_ID=PROJECT_ID`
  - `CRM_API_BASE_URL=` **(empty — beta omits the CRM, so no `CRM_API_KEY` secret is bound and lead submissions report `crmSyncStatus: "skipped"`)**
  - `NODE_ENV=production`

The workflow's last step prints the service URL. Total runtime: ~4–7 minutes.

> **If it fails, the error is in the job log.** Common causes: missing GitHub variable (read the `Validate target service variable is set` step), Artifact Registry repo doesn't exist (§3), or the deployer SA missing a role (§5b/c).

---

## 8. Verify beta after deploy (15 min)

Open `https://beta.medicareinbend.com` and walk these checks. Anything that fails → fix before §9.

### 8a. Site is up and serving the new image
- [ ] Homepage loads, looks right, no console errors (DevTools → Console).
- [ ] `curl -sI https://beta.medicareinbend.com/healthz` returns `HTTP/2 200`.

### 8b. Search engines are blocked (because `SITE_ENV=beta`)
- [ ] `curl -s https://beta.medicareinbend.com/robots.txt` shows `Disallow: /` for `User-agent: *`.
- [ ] View source on the homepage → there's a `<meta name="robots" content="noindex,nofollow,...">` tag in `<head>`.
- [ ] **Critical** — if either of the above is missing, do not promote to prod. The build args were not threaded.

### 8c. Security headers are set
```bash
curl -sI https://beta.medicareinbend.com/ | grep -iE 'strict-transport|x-frame|x-content-type|referrer-policy|permissions-policy|content-security-policy'
```
You should see HSTS, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, a Referrer-Policy, a Permissions-Policy, and a CSP. (The exact CSP is whatever Phase 5 set.)

### 8d. Lead form end-to-end (submit a test lead ONLY if approved)
Only run this if the owner has approved submitting a test lead. If approved:
- [ ] Fill out the lead form on beta with **test data** (e.g. name "QA Test", a throwaway email, a fake phone like `541-555-0100`, ZIP `97701`).
- [ ] Submit. You see the success state.
- [ ] In Cloud Console → **Firestore** → `website_leads` collection: a new doc exists with your test data and a recent timestamp.
- [ ] **Because beta omits the CRM, the expected `crmSyncStatus` is `skipped`.** Verify it in the API response (`crmSyncStatus: "skipped"`) or in the Cloud Run logs for that request — `skipped` is logged as info, not an error.
- [ ] In Cloud Console → **Cloud Run** → `medicare-bend-site-beta` → **Logs**: no `ERROR` or `WARNING` lines for the request that submitted the lead.

### 8d-2. Local pages and beta sitemap/robots
- [ ] `https://beta.medicareinbend.com/medicare-bend` loads and renders correctly.
- [ ] `https://beta.medicareinbend.com/medicare-redmond` loads and renders correctly.
- [ ] The beta **sitemap and robots behave as configured for a non-production env**: `robots.txt` serves `Disallow: /` (beta is never indexed), and `/sitemap.xml` uses the configured site URL and contains no `/zip`, `/directory`, health-insurance, or prior-project (non-Bend) URLs.

### 8e. GTM tagging (only if you set `NEXT_PUBLIC_GTM_ID`)
- [ ] In Google Tag Manager, open **Preview** for `GTM-XXXXXXX`, point it at `https://beta.medicareinbend.com`.
- [ ] Submit another test lead. In the Tag Assistant timeline you see a `generate_lead` event.
- [ ] Click that event → **Variables**. Confirm:
  - `site_env` is `"beta"`
  - **No** name, email, phone, or ZIP appears in the dataLayer payload (PII must not be in tags).

### 8f. Performance smoke test
- [ ] Run https://pagespeed.web.dev/ against `https://beta.medicareinbend.com`. Mobile Performance ≥ 80 is the target. Anything red → investigate before prod.

If all of 8a–8f pass, beta is good.

---

## 9. Promote to production (5 min)

You only do this **after** all of §8 passes on beta.

### 9a. Map the production domain (one-time)

Repeat §6b–6d but for the prod service and prod hostname:
- **Service:** `medicare-bend-site`
- **Domain:** `www.medicareinbend.com` (and optionally `medicareinbend.com` apex)
- DNS at registrar: `www CNAME ghs.googlehosted.com.` (apex needs A/AAAA records — Cloud Console will list the four IPs to use; some registrars don't support apex CNAME, in which case use the four A records)

### 9b. Deploy prod from GitHub Actions

Production is deployed **only** by a manual dispatch — there is no push trigger for production. Make sure §5e (Secret Manager) is done first.

1. **Actions** → **Deploy to Cloud Run** → **Run workflow**.
2. **Branch:** `main`
3. **Target:** `production`
4. **Run workflow.**

The image is rebuilt with `NEXT_PUBLIC_SITE_URL=https://www.medicareinbend.com`, `NEXT_PUBLIC_SITE_ENV=production`, and your real GTM ID, then deployed to `medicare-bend-site`. For production the workflow **also** sets `CRM_API_BASE_URL=https://crm-prod-910764532297.us-west1.run.app` and **binds `CRM_API_KEY` from Secret Manager** (`crm-prod-api-key:latest`) — the key value never appears in the repo, image, env block, or logs.

### 9c. Verify prod (mirror of §8, but production-mode expectations)

- [ ] `https://www.medicareinbend.com/healthz` → `200`.
- [ ] `https://medicareinbend.com` (apex, no `www`) **301-redirects to `https://www.medicareinbend.com`** — and the `Location` header has **no `:8080`** in it (the app's proxy handles the redirect on the standard port).
- [ ] `https://www.medicareinbend.com/robots.txt` → **does NOT** contain `Disallow: /` (it should be the production robots policy, allowing crawlers on real pages) and it **references the Bend sitemap** (`https://www.medicareinbend.com/sitemap.xml`).
- [ ] `https://www.medicareinbend.com/sitemap.xml` uses `https://www.medicareinbend.com` throughout and contains **no `/zip`, no `/directory`, no health-insurance routes, and no prior-project (non-Bend) domains** — only `medicareinbend.com`.
- [ ] View source on a page → **no** `noindex` meta tag.
- [ ] Security headers present (same `curl` as §8c).
- [ ] **Production lead test (submit ONE test lead, only if approved):** it appears in Firestore `website_leads`, and `generate_lead` fires in real GTM with `site_env: "production"`. Check `crmSyncStatus`:
  - `synced` — **only** if the CRM has the public form slug `medicare-in-bend-contact` registered (see §9e).
  - `failed` — if the slug is not yet registered; the log line is marked as a CRM **configuration issue**. The website lead still succeeds either way (Firestore save is independent of CRM sync).

### 9d. Tell Google about prod

- [ ] Google Search Console → add `https://www.medicareinbend.com` as a property → submit `https://www.medicareinbend.com/sitemap.xml`.
- [ ] (Optional) Google Business Profile → make sure the website link points to `https://www.medicareinbend.com`.
- [ ] (Optional) Point beneficiaries to Oregon SHIBA (the state's SHIP) for unbiased help: https://healthcare.oregon.gov/shiba/Pages/index.aspx

You're live.

### 9e. CRM-side setup (required before `crmSyncStatus` can be `synced`)

CRM sync only succeeds once the **live CRM has a public form registered with the slug `medicare-in-bend-contact`**. Until that slug exists, a production lead still saves to Firestore and returns `ok: true`, but `crmSyncStatus` is `failed` (with a CRM configuration-issue log line). This is a one-time CRM-side registration — **do not create CRM records as part of setup; only register the form slug.**

The Bend site submits these fields to that form, so make sure the CRM form accepts them:
`fullName`, `email`, `phone`, `zip`, `message`, `source` / `sourceUrl` / `pageSource`, `referrer`, `utm` (campaign parameters), `clientSubmittedAt`, and `siteSource`.

---

## Rollback (if §9c reveals a problem)

Cloud Run keeps every revision. To roll back instantly without rebuilding:

```bash
# List recent revisions
gcloud run revisions list --service=medicare-bend-site --region=REGION

# Send 100% of traffic to the last known-good revision
gcloud run services update-traffic medicare-bend-site \
  --region=REGION \
  --to-revisions=<previous-revision-name>=100
```

Then debug on beta (§7 with target `beta`), fix the issue on `main`, and re-run the prod deploy.

---

## Recurring deploys after this

After everything in §1–§6 is in place, every future change is:
1. Merge to `main` → **auto-deploys BETA** (never production), and **only when the repo Variable `DEPLOY_ENABLED=true`**. If `DEPLOY_ENABLED` is unset/false, a merge deploys nothing.
2. Once beta passes §8, deploy production with a **manual dispatch**: **Actions → Deploy to Cloud Run → Run workflow → Target: `production`**.

> **Production is only ever deployed by a manual `workflow_dispatch` with Target: `production`.** There is no push trigger for production — merging to `main` can never deploy production.
