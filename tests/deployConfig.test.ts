import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const deployYml = readFileSync(join(root, ".github/workflows/deploy.yml"), "utf8");
const dockerfile = readFileSync(join(root, "Dockerfile"), "utf8");
const bendEnvDoc = readFileSync(join(root, "docs/bend-environment.md"), "utf8");

test("deploy workflow uses the Bend production and beta domains", () => {
  assert.match(deployYml, /site_url=https:\/\/www\.medicareinbend\.com/);
  assert.match(deployYml, /site_url=https:\/\/beta\.medicareinbend\.com/);
});

test("deploy workflow never targets the prior Spokane project, service, or domain", () => {
  // The guard step legitimately references the word "spokane" to BLOCK it, so
  // we assert the specific Spokane target identifiers never appear as values.
  assert.doesNotMatch(deployYml, /medicareinspokane\.com/i);
  assert.doesNotMatch(deployYml, /medicare-spokane-site/i);
  assert.doesNotMatch(deployYml, /medicareinspokane-prod/i);
});

test("deploy workflow includes the Spokane guard and the DEPLOY_ENABLED gate", () => {
  assert.match(deployYml, /Refusing to deploy/);
  assert.match(deployYml, /DEPLOY_ENABLED/);
});

test("deploy workflow sets production env to production and beta env to beta", () => {
  assert.match(deployYml, /site_env=production/);
  assert.match(deployYml, /site_env=beta/);
  // Beta must not use the old "staging" env value.
  assert.doesNotMatch(deployYml, /site_env=staging/);
});

test("deploy workflow binds CRM key from Secret Manager and never hardcodes a key value", () => {
  assert.match(deployYml, /crm-prod-api-key:latest/);
  assert.match(deployYml, /CRM_API_BASE_URL=/);
  assert.match(deployYml, /crm-prod-910764532297\.us-west1\.run\.app/);
  // No literal API key assigned inline (the secret NAME is a reference, not a value).
  assert.doesNotMatch(deployYml, /CRM_API_KEY=[A-Za-z0-9_\-]{20,}/);
  assert.doesNotMatch(deployYml, /-----BEGIN [A-Z ]*PRIVATE KEY-----/);
});

test("deploy workflow preserves lint/typecheck/test/build validation", () => {
  assert.match(deployYml, /npm run lint/);
  assert.match(deployYml, /npm run typecheck/);
  assert.match(deployYml, /npm test/);
  assert.match(deployYml, /npm run build/);
});

test("Dockerfile defaults to the Bend production URL and bakes no secrets", () => {
  assert.match(dockerfile, /ARG NEXT_PUBLIC_SITE_URL=https:\/\/www\.medicareinbend\.com/);
  assert.doesNotMatch(dockerfile, /CRM_API_KEY|crm-prod-api-key|-----BEGIN/);
});

test("bend-environment docs reference the Bend CRM slug and project", () => {
  assert.match(bendEnvDoc, /medicare-in-bend-contact/);
  assert.match(bendEnvDoc, /medicare-bend-site/);
  assert.match(bendEnvDoc, /crm-prod-api-key/);
});
