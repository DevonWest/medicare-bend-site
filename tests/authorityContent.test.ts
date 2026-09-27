import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { carriers } from "../lib/carriers";
import * as guideSources from "../lib/guideSources";
import { siteConfig } from "../lib/site";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("public carrier data fails closed until Bend appointments are verified", () => {
  assert.deepEqual(carriers, []);
});

test("authority guides cite secure primary-source URLs", () => {
  const sources = Object.values(guideSources);
  assert.ok(sources.length >= 10);

  for (const source of sources) {
    assert.match(source.href, /^https:\/\//);
    assert.ok(source.label.length > 4);
    assert.ok(source.publisher.length > 4);
  }
});

test("site description is concise enough for a search snippet", () => {
  assert.ok(siteConfig.description.length >= 110);
  assert.ok(siteConfig.description.length <= 160);
});

test("service-area schema does not claim LocalBusiness, street address, or approximate geo", () => {
  const schema = readFileSync(join(root, "components/OrganizationSchema.tsx"), "utf8");
  assert.doesNotMatch(schema, /LocalBusiness|PostalAddress|GeoCoordinates/);
  assert.match(schema, /"@type": "Organization"/);
  assert.match(schema, /"@type": "WebSite"/);
});

test("new guides include reviewed dates and primary sources", () => {
  const guidePaths = {
    "central-oregon-medicare-provider-networks": "2026-09-27",
    "st-charles-medicare-plans-bend": "2026-09-27",
    "summit-health-medicare-bend": "2026-09-27",
    "medicare-advantage-vs-supplement-bend": "2026-08-27",
    "moving-to-bend-medicare": "2026-08-27",
    "health-insurance-bend": "2026-08-27",
    "oregon-health-insurance-changes-2027": "2026-08-27",
    "high-lakes-health-care-medicare-advantage-bend": "2026-09-27",
    "2027-medicare-part-d-changes": "2026-09-27",
    "2027-medicare-advantage-plans-deschutes-county": "2026-09-27",
    "providence-medicare-advantage-ending-oregon": "2026-09-27",
    "oregon-medigap-birthday-rule": "2026-09-27",
    "oregon-medicare-savings-program-extra-help": "2026-09-27",
    "doctors-accepting-medicare-bend": "2026-09-27",
    "medicare-annual-enrollment-bend": "2026-09-27",
  } as const;

  for (const [path, modified] of Object.entries(guidePaths)) {
    const content = readFileSync(join(root, "app", path, "page.tsx"), "utf8");
    assert.match(content, new RegExp('modified="' + modified + '"'));
    assert.match(content, /sources=\{sources\}/);
  }
});

test("every explicit Open Graph metadata block includes the shared image", () => {
  const pageRoots = [join(root, "app")];
  const pageFiles: string[] = [];

  const visit = (directory: string) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) visit(path);
      else if (entry.name.endsWith(".tsx")) pageFiles.push(path);
    }
  };

  pageRoots.forEach(visit);
  for (const path of pageFiles) {
    const content = readFileSync(path, "utf8");
    if (content.includes("openGraph:")) {
      assert.match(content, /images: \["\/opengraph-image"\]/, path);
    }
  }
});
