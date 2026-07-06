export const LEAD_SOURCES = [
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
  // Central Oregon local pages (routes added in a later PR; kept here so the
  // lead API accepts them as soon as those pages ship).
  "medicare-bend",
  "medicare-redmond",
  "medicare-sisters",
  "medicare-sunriver",
  "medicare-la-pine",
  "medicare-prineville",
  "medicare-madras",
  "review-feedback",
  "unknown",
] as const;

export type LeadSource = (typeof LEAD_SOURCES)[number];
