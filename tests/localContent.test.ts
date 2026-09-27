import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { centralOregonCities, getLocalMedicarePath } from "../lib/cities";
import { centralOregonCounties, getCountyMedicarePath } from "../lib/counties";
import sitemap from "../app/sitemap";
import { siteConfig } from "../lib/site";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("every city page has substantial, distinct local decision support", () => {
  assert.equal(centralOregonCities.length, 7);

  const overviews = new Set<string>();
  for (const city of centralOregonCities) {
    assert.ok(city.localOverview.length >= 3, `${city.name}: local overview`);
    assert.ok(city.localFacilities.length >= 4, `${city.name}: facilities`);
    assert.ok(city.comparisonFactors.length >= 5, `${city.name}: comparison factors`);
    assert.ok(city.faqItems.length >= 4, `${city.name}: FAQs`);
    assert.ok(city.relatedLocations.length >= 2, `${city.name}: related locations`);
    assert.ok(city.metaDescription.length >= 120 && city.metaDescription.length <= 170);

    for (const facility of city.localFacilities) {
      assert.match(facility.href, /^https:\/\//, `${city.name}: ${facility.name}`);
      assert.ok(facility.description.length >= 90, `${city.name}: ${facility.name} description`);
    }

    const combinedOverview = city.localOverview.join(" ");
    assert.ok(combinedOverview.length >= 600, `${city.name}: overview depth`);
    assert.equal(overviews.has(combinedOverview), false, `${city.name}: duplicate overview`);
    overviews.add(combinedOverview);
  }
});

test("county guides are complete routes and sitemap destinations", () => {
  assert.deepEqual(
    centralOregonCounties.map((county) => county.slug),
    ["deschutes-county", "crook-county", "jefferson-county"],
  );

  const sitemapUrls = new Set(sitemap().map((entry) => entry.url));
  for (const county of centralOregonCounties) {
    const path = getCountyMedicarePath(county.slug);
    assert.ok(existsSync(join(root, "app", path.slice(1), "page.tsx")), path);
    assert.ok(sitemapUrls.has(siteConfig.url + path), path);
    assert.ok(county.overview.length >= 4, `${county.name}: overview`);
    assert.ok(county.facilities.length >= 4, `${county.name}: facilities`);
    assert.ok(county.comparisonFactors.length >= 6, `${county.name}: comparison factors`);
    assert.ok(county.prescriptionConsiderations.length >= 5, `${county.name}: prescriptions`);
    assert.ok(county.movingConsiderations.length >= 4, `${county.name}: moving guidance`);
    assert.ok(county.faqItems.length >= 5, `${county.name}: FAQs`);
    assert.ok(county.sources.length >= 4, `${county.name}: sources`);
  }
});

test("city routes and county guides cross-link through structured data", () => {
  const countyPaths = new Set(centralOregonCounties.map((county) => getCountyMedicarePath(county.slug)));
  const sitemapUrls = new Set(sitemap().map((entry) => entry.url));

  for (const city of centralOregonCities) {
    assert.ok(countyPaths.has(city.countyPath), `${city.name}: county link`);
    assert.ok(sitemapUrls.has(siteConfig.url + getLocalMedicarePath(city.slug)), city.name);
  }
});

test("current market updates render NewsArticle and FAQ structured content", () => {
  const newsPages = [
    "high-lakes-health-care-medicare-advantage-bend",
    "2027-medicare-part-d-changes",
    "2027-medicare-advantage-plans-deschutes-county",
    "providence-medicare-advantage-ending-oregon",
  ];

  for (const page of newsPages) {
    const source = readFileSync(join(root, "app", page, "page.tsx"), "utf8");
    assert.match(source, /articleType="NewsArticle"/, page);
    assert.match(source, /articleSection=/, page);
    assert.match(source, /keywords=\{\[/, page);
    assert.match(source, /faqItems=\{faqItems\}/, page);
    assert.match(source, /const faqItems = \[/, page);
  }
});
