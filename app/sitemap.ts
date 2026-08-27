import { MetadataRoute } from "next";
import { centralOregonCities, getLocalMedicarePath } from "@/lib/cities";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const authorityContentLastModified = "2026-08-27";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: authorityContentLastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/our-team`, lastModified: authorityContentLastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/medicare-advantage`, lastModified: authorityContentLastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/medicare-supplements`, lastModified: authorityContentLastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/medicare-part-d`, lastModified: authorityContentLastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/compare-medicare-options`, lastModified: authorityContentLastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/rx-drug-review`, lastModified: authorityContentLastModified, changeFrequency: "weekly", priority: 0.8 },
    {
      url: `${baseUrl}/medicare-plan-review-bend`,
      lastModified: authorityContentLastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/medicare-appointment-checklist`,
      lastModified: authorityContentLastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    { url: `${baseUrl}/supplemental-insurance`, lastModified: authorityContentLastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/carriers`, lastModified: authorityContentLastModified, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${baseUrl}/turning-65-medicare-bend`,
      lastModified: authorityContentLastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/helping-parent-with-medicare`,
      lastModified: authorityContentLastModified,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/working-past-65-medicare`,
      lastModified: authorityContentLastModified,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    { url: `${baseUrl}/medicare-faq`, lastModified: authorityContentLastModified, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${baseUrl}/medicare-enrollment-resources`,
      lastModified: authorityContentLastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    { url: `${baseUrl}/resources`, lastModified: authorityContentLastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: authorityContentLastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/central-oregon-medicare-provider-networks`, lastModified: authorityContentLastModified, changeFrequency: "monthly", priority: 0.95 },
    { url: `${baseUrl}/st-charles-medicare-plans-bend`, lastModified: authorityContentLastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/summit-health-medicare-bend`, lastModified: authorityContentLastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/medicare-advantage-vs-supplement-bend`, lastModified: authorityContentLastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/moving-to-bend-medicare`, lastModified: authorityContentLastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/health-insurance-bend`, lastModified: authorityContentLastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/oregon-health-insurance-changes-2027`, lastModified: authorityContentLastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/editorial-standards`, lastModified: authorityContentLastModified, changeFrequency: "yearly", priority: 0.5 },
  ];

  // Central Oregon local Medicare pages. Bend (the primary city) gets a higher
  // priority than the surrounding communities.
  const localPages: MetadataRoute.Sitemap = centralOregonCities.map((city) => ({
    url: `${baseUrl}${getLocalMedicarePath(city.slug)}`,
    lastModified: authorityContentLastModified,
    changeFrequency: "monthly",
    priority: city.slug === "bend" ? 0.9 : 0.8,
  }));

  return [...staticPages, ...localPages];
}
