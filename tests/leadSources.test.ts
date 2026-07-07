import assert from "node:assert/strict";
import { test } from "node:test";
import { LEAD_SOURCES } from "../lib/leadSources";
import { SITE_SOURCE } from "../lib/leadConstants";
import { CRM_PUBLIC_FORM_SLUG, CRM_PUBLIC_FORM_SUBMISSION_PATH } from "../lib/crmPaths";
import { centralOregonCities } from "../lib/cities";

const allowlist = LEAD_SOURCES as readonly string[];

test("SITE_SOURCE and CRM form slug/path are the Bend values", () => {
  assert.equal(SITE_SOURCE, "medicareinbend.com");
  assert.equal(CRM_PUBLIC_FORM_SLUG, "medicare-in-bend-contact");
  assert.equal(CRM_PUBLIC_FORM_SUBMISSION_PATH, "api/public/forms/medicare-in-bend-contact/submit");
});

test("every Central Oregon local page source is allowlisted", () => {
  const expected = [
    "medicare-bend",
    "medicare-redmond",
    "medicare-sisters",
    "medicare-sunriver",
    "medicare-la-pine",
    "medicare-prineville",
    "medicare-madras",
  ];

  for (const slug of expected) {
    assert.ok(allowlist.includes(slug), `LEAD_SOURCES is missing "${slug}"`);
  }

  // The data-driven leadSource on each city must also be allowlisted (this is
  // what LocalMedicarePage passes to the LeadForm).
  for (const city of centralOregonCities) {
    assert.ok(allowlist.includes(city.leadSource), `city ${city.slug} leadSource not allowlisted`);
  }
});

test("common Bend page sources are allowlisted", () => {
  const common = [
    "homepage",
    "contact",
    "compare-medicare-options",
    "rx-drug-review",
    "turning-65-medicare-bend",
    "working-past-65-medicare",
    "helping-parent-with-medicare",
    "medicare-appointment-checklist",
    "medicare-plan-review-bend",
    "medicare-enrollment-resources",
    "medicare-advantage",
    "medicare-supplements",
    "medicare-part-d",
    "supplemental-insurance",
    "carriers",
    "testimonials",
    "about",
    "request-contact",
    "medicare-faq",
    "review-feedback",
    "unknown",
  ];

  for (const source of common) {
    assert.ok(allowlist.includes(source), `LEAD_SOURCES is missing "${source}"`);
  }
});

test("no Spokane, Washington, or health-insurance lead sources remain", () => {
  for (const source of allowlist) {
    assert.doesNotMatch(
      source,
      /spokane|washington|health-insurance/i,
      `unexpected lead source: "${source}"`,
    );
  }
});
