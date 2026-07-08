import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const header = readFileSync(join(root, "components/Header.tsx"), "utf8");
const siteConfig = readFileSync(join(root, "lib/site.ts"), "utf8");

test("header renders the brand from siteConfig text, not a baked-in logo image", () => {
  // The visible brand must come from rendered text (siteConfig.shortName), so it
  // always tracks the config and can never show a stale city name from a raster.
  assert.match(header, /siteConfig\.shortName/);
  // The prior Spokane text logo asset must not be referenced.
  assert.doesNotMatch(header, /logo-horizontal/);
  assert.doesNotMatch(header, /spokane/i);
});

test("siteConfig brand short name is Medicare in Bend", () => {
  assert.match(siteConfig, /shortName:\s*"Medicare in Bend"/);
});
