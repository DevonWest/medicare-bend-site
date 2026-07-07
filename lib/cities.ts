import type { LeadSource } from "./leadSources";

export type City = {
  name: string;
  slug: string;
  county: string;
  state: string;
  stateCode: string;
  nearbyCommunities: string[];
  zipCodes: string[];
  /** Lead-form source identifier for this city's page. */
  leadSource: LeadSource;
  /** Meta description for the local page. */
  metaDescription: string;
  /** One-line hero subtitle. */
  heroSummary: string;
  /**
   * A genuinely city-specific paragraph (2–4 sentences). This is what keeps
   * each local page from reading like a doorway page — keep it real and
   * distinct per city.
   */
  localContext: string;
  /**
   * Optional extra "what we help review" consideration for cities where
   * travel or seasonal residence genuinely matters. Rendered as one bullet.
   */
  travelNote?: string;
};

/**
 * Central Oregon service-area cities and their local-page content. "bend" is
 * the primary city and maps to `/medicare-bend`.
 */
export const centralOregonCities: City[] = [
  {
    name: "Bend",
    slug: "bend",
    county: "Deschutes County",
    state: "Oregon",
    stateCode: "OR",
    nearbyCommunities: ["Redmond", "Sisters", "Sunriver", "La Pine"],
    zipCodes: ["97701", "97702", "97703"],
    leadSource: "medicare-bend",
    metaDescription:
      "Get local Medicare help in Bend, Oregon. Review Medicare Advantage, Medicare Supplement, and Part D options with licensed guidance for Central Oregon.",
    heroSummary:
      "Local Medicare guidance for Bend residents comparing Medicare Advantage, Medicare Supplement, and Part D options.",
    localContext:
      "As the largest city in Central Oregon, Bend is the region's hub for hospitals, specialists, and pharmacies, so many residents want to confirm their providers and medications are covered before they choose a plan. Because networks, drug formularies, and plan availability can change every year, a yearly review helps Bend residents keep their coverage aligned with the doctors and prescriptions they actually use.",
  },
  {
    name: "Redmond",
    slug: "redmond",
    county: "Deschutes County",
    state: "Oregon",
    stateCode: "OR",
    nearbyCommunities: ["Bend", "Terrebonne", "Sisters"],
    zipCodes: ["97756"],
    leadSource: "medicare-redmond",
    metaDescription:
      "Get local Medicare help in Redmond, Oregon. Review Medicare Advantage, Medicare Supplement, and Part D options with licensed guidance across Redmond and the wider Central Oregon area.",
    heroSummary:
      "Local Medicare guidance for Redmond residents comparing coverage across Redmond and Central Oregon.",
    localContext:
      "Redmond is one of Central Oregon's fastest-growing communities, and many residents use providers in both Redmond and nearby Bend. When you compare Medicare Advantage networks, it helps to confirm that the doctors and hospitals you rely on in each town are in-network, so a referral or specialist visit doesn't turn into a surprise cost.",
    travelNote: "Whether the providers you use in Redmond and Bend are both in a plan's network",
  },
  {
    name: "Sisters",
    slug: "sisters",
    county: "Deschutes County",
    state: "Oregon",
    stateCode: "OR",
    nearbyCommunities: ["Bend", "Redmond", "Camp Sherman"],
    zipCodes: ["97759"],
    leadSource: "medicare-sisters",
    metaDescription:
      "Get local Medicare help in Sisters, Oregon. Review Medicare Advantage, Medicare Supplement, and Part D options with licensed guidance, including provider access in nearby Redmond and Bend.",
    heroSummary: "Local Medicare guidance for Sisters residents, with an eye on nearby provider access.",
    localContext:
      "Sisters is a smaller Central Oregon community, and residents sometimes travel to Redmond or Bend for specialists, imaging, or hospital care. That pattern is worth keeping in mind when you review plan networks and pharmacy access, so both your everyday care in Sisters and any trips for specialty care are covered.",
    travelNote: "How a plan covers care when you travel to Redmond or Bend for specialists",
  },
  {
    name: "Sunriver",
    slug: "sunriver",
    county: "Deschutes County",
    state: "Oregon",
    stateCode: "OR",
    nearbyCommunities: ["Bend", "La Pine"],
    zipCodes: ["97707"],
    leadSource: "medicare-sunriver",
    metaDescription:
      "Get local Medicare help in Sunriver, Oregon. Review Medicare Advantage, Medicare Supplement, and Part D options with licensed guidance for full-time and seasonal Central Oregon residents.",
    heroSummary: "Local Medicare guidance for Sunriver's full-time and seasonal residents.",
    localContext:
      "Sunriver is a resort and residential community where many people are seasonal or part-time residents. If you spend part of the year away, it helps to understand how a plan handles care outside the area — Medicare Supplement plans let you see any provider nationwide who accepts Medicare, while Medicare Advantage plans use networks — along with how to fill prescriptions while you travel.",
    travelNote: "How your coverage and prescriptions work when you spend part of the year away from Sunriver",
  },
  {
    name: "La Pine",
    slug: "la-pine",
    county: "Deschutes County",
    state: "Oregon",
    stateCode: "OR",
    nearbyCommunities: ["Sunriver", "Bend"],
    zipCodes: ["97739"],
    leadSource: "medicare-la-pine",
    metaDescription:
      "Get local Medicare help in La Pine, Oregon. Review Medicare Advantage, Medicare Supplement, and Part D options with licensed guidance for southern Deschutes County.",
    heroSummary: "Local Medicare guidance for La Pine and southern Deschutes County residents.",
    localContext:
      "La Pine sits in southern Deschutes County, where some residents drive to Bend for specialists, hospital care, or a wider choice of pharmacies. That rural access makes it especially useful to review whether your preferred pharmacy is in-network and how a plan covers care when you travel north for appointments.",
    travelNote: "Whether your preferred pharmacy is in-network and how care is covered when you travel to Bend",
  },
  {
    name: "Prineville",
    slug: "prineville",
    county: "Crook County",
    state: "Oregon",
    stateCode: "OR",
    nearbyCommunities: ["Redmond", "Bend"],
    zipCodes: ["97754"],
    leadSource: "medicare-prineville",
    metaDescription:
      "Get local Medicare help in Prineville, Oregon. Review Medicare Advantage, Medicare Supplement, and Part D options with licensed guidance for Crook County and Central Oregon.",
    heroSummary: "Local Medicare guidance for Prineville and Crook County residents.",
    localContext:
      "Prineville is in Crook County, and Medicare Advantage and Part D availability can differ from neighboring Deschutes County because plans are offered county by county. Many Prineville residents also use providers in Redmond or Bend, so it helps to review both what is available in Crook County and whether those providers are in-network before you decide.",
    travelNote: "County-by-county plan availability and access to providers in Redmond or Bend",
  },
  {
    name: "Madras",
    slug: "madras",
    county: "Jefferson County",
    state: "Oregon",
    stateCode: "OR",
    nearbyCommunities: ["Redmond", "Prineville"],
    zipCodes: ["97741"],
    leadSource: "medicare-madras",
    metaDescription:
      "Get local Medicare help in Madras, Oregon. Review Medicare Advantage, Medicare Supplement, and Part D options with licensed guidance for Jefferson County and Central Oregon.",
    heroSummary: "Local Medicare guidance for Madras and Jefferson County residents.",
    localContext:
      "Madras is in Jefferson County, where the Medicare plans offered can differ from those in Deschutes or Crook County, since availability is set at the county level. If you travel to Redmond or Bend for certain care, it's worth confirming those providers and pharmacies work with the plans you're comparing.",
    travelNote: "County-level plan availability and whether Redmond or Bend providers are covered",
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return centralOregonCities.find((city) => city.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return centralOregonCities.map((city) => city.slug);
}

export function getLocalMedicarePath(slug: string): string {
  return `/medicare-${slug}`;
}

export function getAllLocalMedicarePaths(): string[] {
  return centralOregonCities.map((city) => getLocalMedicarePath(city.slug));
}
