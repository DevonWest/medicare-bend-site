import assert from "node:assert/strict";
import { test } from "node:test";
import { NextRequest } from "next/server";
import { metadata as homeMetadata } from "../app/page";
import robots from "../app/robots";
import sitemap from "../app/sitemap";
import {
  getLegacyPathResolution,
  getLegacyRedirectDestination,
  legacyRedirects,
} from "../lib/legacyRedirects";
import { siteConfig } from "../lib/site";
import { proxy } from "../proxy";

const CANONICAL = "https://www.medicareinbend.com";

test("legacy redirect map includes only generic, location-agnostic destinations", () => {
  assert.deepEqual(legacyRedirects, {
    "/about": "/contact",
    "/home": "/",
    "/request-a-quote": "/contact",
    "/request-contact": "/contact",
    "/medicare-supplement-insurance-plans": "/medicare-supplements",
    "/medicare-part-d-prescription-plans": "/medicare-part-d",
    "/videos": "/resources",
    "/rx-drug-lookup": "/rx-drug-review",
    "/rx-drug-lookup-form": "/rx-drug-review",
    "/7-things-to-know-about-working-past-65": "/working-past-65-medicare",
  });
});

test("legacy redirect lookup returns canonical destinations and normalizes trailing slashes", () => {
  assert.equal(getLegacyRedirectDestination("/home"), "/");
  assert.equal(getLegacyRedirectDestination("/home/"), "/");
  assert.equal(getLegacyRedirectDestination("/videos"), "/resources");
  assert.equal(getLegacyRedirectDestination("/rx-drug-lookup"), "/rx-drug-review");
  assert.equal(getLegacyRedirectDestination("/request-a-quote"), "/contact");
  assert.equal(getLegacyRedirectDestination("/about"), "/contact");
  assert.equal(getLegacyRedirectDestination("/does-not-exist"), null);
});

test("legacy redirect lookup is case-insensitive for legacy capitalization", () => {
  assert.equal(getLegacyRedirectDestination("/Home"), "/");
  assert.equal(getLegacyRedirectDestination("/Home/"), "/");
});

test("legacy path resolution returns null for unhandled paths", () => {
  assert.equal(getLegacyPathResolution("/does-not-exist"), null);
  assert.deepEqual(getLegacyPathResolution("/videos"), {
    type: "redirect",
    destination: "/resources",
    preserveQuery: true,
  });
});

test("proxy returns 301 redirects for legacy URLs and preserves query", () => {
  const response = proxy(new NextRequest("https://example.com/request-a-quote?source=google"));

  assert.equal(response.status, 301);
  assert.equal(response.headers.get("location"), "https://example.com/contact?source=google");
});

test("proxy redirects /home to the canonical homepage", () => {
  const response = proxy(new NextRequest(`${CANONICAL}/home`));

  assert.equal(response.status, 301);
  assert.equal(response.headers.get("location"), `${CANONICAL}/`);
});

test("proxy redirects /videos to /resources", () => {
  const response = proxy(new NextRequest(`${CANONICAL}/videos`));

  assert.equal(response.status, 301);
  assert.equal(response.headers.get("location"), `${CANONICAL}/resources`);
});

test("proxy redirects /Home (legacy capitalization) to the canonical homepage", () => {
  const response = proxy(new NextRequest(`${CANONICAL}/Home`));

  assert.equal(response.status, 301);
  assert.equal(response.headers.get("location"), `${CANONICAL}/`);
});

test("proxy passes through unhandled paths without redirecting", () => {
  const response = proxy(new NextRequest(`${CANONICAL}/medicare-advantage`));

  assert.notEqual(response.status, 301);
  assert.equal(response.headers.get("location"), null);
});

test("proxy permanently redirects the apex root host to canonical www without any port", () => {
  const response = proxy(new NextRequest("https://medicareinbend.com/"));

  assert.equal(response.status, 301);
  assert.equal(response.headers.get("location"), `${CANONICAL}/`);
});

test("proxy permanently redirects apex host paths to canonical www without any port", () => {
  const response = proxy(new NextRequest("https://medicareinbend.com/contact"));

  assert.equal(response.status, 301);
  assert.equal(response.headers.get("location"), `${CANONICAL}/contact`);
});

test("proxy permanently redirects apex host to canonical www with path and query intact", () => {
  const response = proxy(new NextRequest("https://medicareinbend.com/rx-drug-review?x=1&ref=google"));

  assert.equal(response.status, 301);
  assert.equal(response.headers.get("location"), `${CANONICAL}/rx-drug-review?x=1&ref=google`);
});

test("proxy redirects apex host with port 8080 to canonical www without any port", () => {
  const response = proxy(new NextRequest("https://medicareinbend.com:8080/contact?x=1"));

  assert.equal(response.status, 301);
  assert.equal(response.headers.get("location"), `${CANONICAL}/contact?x=1`);
});

test("proxy does not redirect apex host when it arrives on a non-canonical port", () => {
  const response = proxy(new NextRequest("https://medicareinbend.com:3000/contact?x=1"));

  assert.notEqual(response.status, 301);
  assert.equal(response.headers.get("location"), null);
});

test("proxy uses forwarded apex host when deciding the canonical redirect", () => {
  const response = proxy(
    new NextRequest("https://medicare-bend-site-12345-uc.a.run.app/contact?x=1", {
      headers: {
        "x-forwarded-host": "medicareinbend.com",
      },
    }),
  );

  assert.equal(response.status, 301);
  assert.equal(response.headers.get("location"), `${CANONICAL}/contact?x=1`);
});

test("proxy does not redirect canonical www host before rendering", () => {
  const response = proxy(new NextRequest(`${CANONICAL}/contact?x=1`));

  assert.notEqual(response.status, 301);
  assert.equal(response.headers.get("location"), null);
});

test("proxy does not redirect Cloud Run hosts before rendering", () => {
  const response = proxy(new NextRequest("https://medicare-bend-site-12345-uc.a.run.app/contact?x=1"));

  assert.notEqual(response.status, 301);
  assert.equal(response.headers.get("location"), null);
});

test("proxy keeps Cloud Run hosts on legacy redirects instead of forcing www", () => {
  const response = proxy(
    new NextRequest("https://medicare-bend-site-12345-uc.a.run.app/request-a-quote?source=google"),
  );

  assert.equal(response.status, 301);
  assert.equal(
    response.headers.get("location"),
    "https://medicare-bend-site-12345-uc.a.run.app/contact?source=google",
  );
});

test("site metadata, sitemap, and robots use the canonical www production URL", () => {
  assert.equal(siteConfig.url, CANONICAL);
  assert.equal(homeMetadata.alternates?.canonical, CANONICAL);
  assert.equal(homeMetadata.openGraph?.url, CANONICAL);
  assert.equal(robots().sitemap, `${CANONICAL}/sitemap.xml`);

  const sitemapUrls = new Set(sitemap().map((entry) => entry.url));

  assert.ok(sitemapUrls.has(CANONICAL));
  assert.ok(sitemapUrls.has(`${CANONICAL}/contact`));
});

test("sitemap includes canonical Bend routes and excludes removed/legacy routes", () => {
  const sitemapUrls = new Set(sitemap().map((entry) => entry.url));

  // Present, canonical Bend routes.
  assert.ok(sitemapUrls.has(`${siteConfig.url}/contact`));
  assert.ok(sitemapUrls.has(`${siteConfig.url}/rx-drug-review`));
  assert.ok(sitemapUrls.has(`${siteConfig.url}/turning-65-medicare-bend`));
  assert.ok(sitemapUrls.has(`${siteConfig.url}/medicare-plan-review-bend`));

  // Redirect-only, removed, or non-canonical routes must not appear.
  // /our-team is temporarily removed pending the finalized Bend team roster.
  assert.equal(sitemapUrls.has(`${siteConfig.url}/our-team`), false);
  assert.equal(sitemapUrls.has(`${siteConfig.url}/about`), false);
  assert.equal(sitemapUrls.has(`${siteConfig.url}/home`), false);
  assert.equal(sitemapUrls.has(`${siteConfig.url}/videos`), false);
  assert.equal(sitemapUrls.has(`${siteConfig.url}/request-contact`), false);
  assert.equal(sitemapUrls.has(`${siteConfig.url}/request-a-quote`), false);
  assert.equal(sitemapUrls.has(`${siteConfig.url}/rx-drug-lookup`), false);

  // No Spokane, directory, ZIP, or health-insurance routes may remain.
  const urls = Array.from(sitemapUrls);
  assert.equal(urls.some((url) => url.includes("spokane")), false);
  assert.equal(urls.some((url) => url.includes("/directory/")), false);
  assert.equal(urls.some((url) => url.includes("/zip/")), false);
  assert.equal(urls.some((url) => url.includes("health-insurance")), false);
  assert.equal(urls.some((url) => url.toLowerCase().includes("washington")), false);
});
