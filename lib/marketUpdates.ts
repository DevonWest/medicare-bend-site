import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export interface MarketUpdate {
  path: `/${string}`;
  title: string;
  shortTitle: string;
  summary: string;
  publishedDate: `${number}-${number}-${number}`;
  modifiedDate: `${number}-${number}-${number}`;
  localStatusLabel: string;
}

export const marketUpdatesHub = {
  path: "/2027-medicare-changes-bend" as const,
  title: "2027 Medicare Changes in Bend and Oregon",
    description:
      "Track confirmed 2027 Medicare changes affecting Bend, Deschutes County, and Oregon, with pending county plan information clearly labeled.",
  modifiedDate: "2026-09-27",
};

/**
 * Source of truth for time-sensitive Bend Medicare coverage.
 *
 * Entries are surfaced on the 2027 hub, homepage, Resources page, standard
 * sitemap, and Google News sitemap. Local claims stay conservative until an
 * official county landscape, provider, carrier, or CMS source confirms them.
 */
export const marketUpdates: readonly MarketUpdate[] = [
  {
    path: "/high-lakes-health-care-medicare-advantage-bend",
    title: "High Lakes Health Care and Medicare Advantage in Bend: 2027 Network Update",
    shortTitle: "High Lakes 2027 Medicare Network Update",
    summary:
      "Praxis Health lists its 2027 Oregon Medicare participation and flags UnitedHealthcare negotiations. Bend residents still need to verify county, clinic, and hospital participation.",
    publishedDate: "2026-09-27",
    modifiedDate: "2026-09-27",
    localStatusLabel: "Provider update confirmed; exact plans still require verification",
  },
  {
    path: "/2027-medicare-part-d-changes",
    title: "2027 Medicare Part D Changes: Deductible, Out-of-Pocket Cap, and Negotiated Drugs",
    shortTitle: "2027 Medicare Part D Changes",
    summary:
      "CMS confirms a $700 standard deductible, a $2,400 annual out-of-pocket threshold, and negotiated prices for 15 selected drugs beginning in 2027.",
    publishedDate: "2026-09-27",
    modifiedDate: "2026-09-27",
    localStatusLabel: "National benefit amounts confirmed; Oregon plan details pending",
  },
  {
    path: "/2027-medicare-advantage-plans-deschutes-county",
    title: "2027 Medicare Advantage Plans in Deschutes County",
    shortTitle: "Deschutes County 2027 Medicare Advantage Plans",
    summary:
      "The official CMS 2027 county landscape is not yet posted. Use this status page to separate confirmed provider announcements from plan counts, premiums, and benefits that remain pending.",
    publishedDate: "2026-09-27",
    modifiedDate: "2026-09-27",
    localStatusLabel: "Official 2027 county landscape pending",
  },
  {
    path: "/providence-medicare-advantage-ending-oregon",
    title: "Providence Medicare Advantage Ending in Oregon for 2027",
    shortTitle: "Providence Medicare Advantage Ending for 2027",
    summary:
      "Providence Medicare Advantage ends after December 31, 2026. In Central Oregon, St. Charles says Providence Medicare Advantage was already no longer offered beginning in 2026.",
    publishedDate: "2026-09-27",
    modifiedDate: "2026-09-27",
    localStatusLabel: "Statewide exit confirmed; Central Oregon context included",
  },
] as const;

export function getMarketUpdatesNewestFirst(): readonly MarketUpdate[] {
  return [...marketUpdates].sort(
    (left, right) =>
      right.publishedDate.localeCompare(left.publishedDate) ||
      left.title.localeCompare(right.title),
  );
}

export function getMarketUpdateSitemapEntries(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteConfig.url}${marketUpdatesHub.path}`,
      lastModified: marketUpdatesHub.modifiedDate,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    ...getMarketUpdatesNewestFirst().map((update) => ({
      url: `${siteConfig.url}${update.path}`,
      lastModified: update.modifiedDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}

export function getCurrentNewsUpdates(now = new Date()): readonly MarketUpdate[] {
  const nowMilliseconds = now.getTime();
  if (Number.isNaN(nowMilliseconds)) return [];

  const twoDaysMilliseconds = 2 * 24 * 60 * 60 * 1_000;
  return getMarketUpdatesNewestFirst().filter((update) => {
    const publicationMilliseconds = Date.parse(`${update.publishedDate}T00:00:00Z`);
    const ageMilliseconds = nowMilliseconds - publicationMilliseconds;
    return ageMilliseconds >= 0 && ageMilliseconds < twoDaysMilliseconds;
  });
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function buildMarketUpdatesNewsSitemap(now = new Date()): string {
  const currentNewsPaths = new Set(getCurrentNewsUpdates(now).map((update) => update.path));
  const nowMilliseconds = now.getTime();
  const publishedUpdates = Number.isNaN(nowMilliseconds)
    ? []
    : getMarketUpdatesNewestFirst().filter(
        (update) => Date.parse(`${update.publishedDate}T00:00:00Z`) <= nowMilliseconds,
      );

  const urls = publishedUpdates
    .map((update) => {
      const newsMetadata = currentNewsPaths.has(update.path)
        ? `
    <news:news>
      <news:publication>
        <news:name>${escapeXml(siteConfig.name)}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${update.publishedDate}</news:publication_date>
      <news:title>${escapeXml(update.title)}</news:title>
    </news:news>`
        : "";

      return `  <url>
    <loc>${escapeXml(`${siteConfig.url}${update.path}`)}</loc>${newsMetadata}
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">${urls ? `\n${urls}\n` : ""}</urlset>\n`;
}
