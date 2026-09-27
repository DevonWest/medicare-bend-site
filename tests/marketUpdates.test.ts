import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import {
  buildMarketUpdatesNewsSitemap,
  getCurrentNewsUpdates,
  getMarketUpdateSitemapEntries,
  marketUpdates,
  marketUpdatesHub,
} from "../lib/marketUpdates";
import { siteConfig } from "../lib/site";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("every Bend market update has a page and standard sitemap entry", () => {
  const sitemapUrls = new Set(getMarketUpdateSitemapEntries().map((entry) => entry.url));

  assert.ok(sitemapUrls.has(siteConfig.url + marketUpdatesHub.path));
  for (const update of marketUpdates) {
    assert.ok(existsSync(join(root, "app", update.path.slice(1), "page.tsx")), update.path);
    assert.ok(sitemapUrls.has(siteConfig.url + update.path), update.path);
    assert.equal(update.publishedDate, "2026-09-27");
    assert.equal(update.modifiedDate, "2026-09-27");
  }
});

test("new updates receive Google News metadata for two days only", () => {
  const currentDate = new Date("2026-09-28T12:00:00Z");
  const expiredDate = new Date("2026-09-30T12:00:00Z");

  assert.equal(getCurrentNewsUpdates(currentDate).length, marketUpdates.length);
  assert.equal(getCurrentNewsUpdates(expiredDate).length, 0);

  const currentXml = buildMarketUpdatesNewsSitemap(currentDate);
  const expiredXml = buildMarketUpdatesNewsSitemap(expiredDate);

  assert.match(currentXml, /xmlns:news="http:\/\/www\.google\.com\/schemas\/sitemap-news\/0\.9"/);
  assert.match(currentXml, /<news:publication_date>2026-09-27<\/news:publication_date>/);
  assert.match(currentXml, /High Lakes Health Care and Medicare Advantage in Bend/);
  assert.doesNotMatch(expiredXml, /<news:news>/);
  for (const update of marketUpdates) {
    assert.match(expiredXml, new RegExp(siteConfig.url + update.path));
  }
});

test("homepage, resources, and tracker surface the update registry", () => {
  const homepage = readFileSync(join(root, "app", "page.tsx"), "utf8");
  const resources = readFileSync(join(root, "app", "resources", "page.tsx"), "utf8");
  const hub = readFileSync(join(root, "app", marketUpdatesHub.path.slice(1), "page.tsx"), "utf8");

  assert.match(homepage, /getMarketUpdatesNewestFirst/);
  assert.match(resources, /getMarketUpdatesNewestFirst/);
  assert.match(hub, /getMarketUpdatesNewestFirst/);
});
