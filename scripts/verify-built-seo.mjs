import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const appOutput = join(process.cwd(), ".next", "server", "app");
const sitemapPath = join(appOutput, "sitemap.xml.body");

assert.ok(existsSync(sitemapPath), `Missing built sitemap: ${sitemapPath}`);

const sitemap = readFileSync(sitemapPath, "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);

assert.ok(urls.length > 0, "The built sitemap contains no URLs");

// /review is intentionally indexable but omitted from the discovery sitemap
// because it is a customer feedback flow rather than an organic landing page.
const crawlUrls = [...urls, new URL("/review", urls[0]).toString()];

const titles = new Map();
const descriptions = new Map();
const failures = [];

const capture = (html, expression) => html.match(expression)?.[1] ?? "";
const addFailure = (pathname, message) => failures.push(`${pathname}: ${message}`);

for (const url of crawlUrls) {
  const parsedUrl = new URL(url);
  const pathname = parsedUrl.pathname;
  const htmlPath = join(appOutput, pathname === "/" ? "index.html" : `${pathname.slice(1)}.html`);

  if (!existsSync(htmlPath)) {
    addFailure(pathname, `missing static HTML at ${htmlPath}`);
    continue;
  }

  const html = readFileSync(htmlPath, "utf8");
  const title = capture(html, /<title>(.*?)<\/title>/s);
  const description = capture(html, /<meta name="description" content="([^"]*)"/);
  const canonical = capture(html, /<link rel="canonical" href="([^"]+)"/);
  const robots = capture(html, /<meta name="robots" content="([^"]+)"/);
  const h1Count = (html.match(/<h1\b/g) ?? []).length;
  const hasVisibleBreadcrumb = html.includes('aria-label="Breadcrumb"');
  const hasCurrentPage = html.includes('aria-current="page"');
  const hasBreadcrumbSchema = html.includes('"@type":"BreadcrumbList"');

  if (!title) addFailure(pathname, "missing title");
  if (!description) addFailure(pathname, "missing meta description");
  if (canonical !== url) addFailure(pathname, `canonical is ${canonical || "missing"}; expected ${url}`);
  if (robots.includes("noindex")) addFailure(pathname, "sitemap URL is noindex");
  if (h1Count !== 1) addFailure(pathname, `expected one H1; found ${h1Count}`);
  if (/\| Medicare in Bend \| Medicare in Bend$/.test(title)) {
    addFailure(pathname, "title repeats the site brand");
  }

  if (pathname === "/") {
    if (hasVisibleBreadcrumb || hasBreadcrumbSchema) {
      addFailure(pathname, "home page should not render a breadcrumb trail");
    }
  } else {
    if (!hasVisibleBreadcrumb) addFailure(pathname, "missing visible breadcrumb navigation");
    if (!hasCurrentPage) addFailure(pathname, "breadcrumb is missing aria-current=page");
    if (!hasBreadcrumbSchema) addFailure(pathname, "missing BreadcrumbList JSON-LD");
  }

  if (titles.has(title)) addFailure(pathname, `duplicate title also used by ${titles.get(title)}`);
  else titles.set(title, pathname);

  if (descriptions.has(description)) {
    addFailure(pathname, `duplicate description also used by ${descriptions.get(description)}`);
  } else {
    descriptions.set(description, pathname);
  }
}

if (failures.length > 0) {
  console.error(`Built SEO verification failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Built SEO verification passed for ${urls.length} sitemap URLs plus /review: metadata, canonicals, H1s, uniqueness, robots, and breadcrumb coverage are valid.`,
);
