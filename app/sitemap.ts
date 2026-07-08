import { MetadataRoute } from "next";
import { centralOregonCities, getLocalMedicarePath } from "@/lib/cities";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/medicare-advantage`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/medicare-supplements`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/medicare-part-d`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/compare-medicare-options`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/rx-drug-review`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    {
      url: `${baseUrl}/medicare-plan-review-bend`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/medicare-appointment-checklist`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    { url: `${baseUrl}/supplemental-insurance`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/carriers`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/testimonials`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${baseUrl}/turning-65-medicare-bend`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/helping-parent-with-medicare`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/working-past-65-medicare`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    { url: `${baseUrl}/medicare-faq`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${baseUrl}/medicare-enrollment-resources`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    { url: `${baseUrl}/resources`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  // Central Oregon local Medicare pages. Bend (the primary city) gets a higher
  // priority than the surrounding communities.
  const localPages: MetadataRoute.Sitemap = centralOregonCities.map((city) => ({
    url: `${baseUrl}${getLocalMedicarePath(city.slug)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: city.slug === "bend" ? 0.9 : 0.8,
  }));

  return [...staticPages, ...localPages];
}
