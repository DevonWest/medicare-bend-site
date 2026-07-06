export type City = {
  name: string;
  slug: string;
  county: string;
  state: string;
  stateCode: string;
  nearbyCommunities: string[];
  zipCodes: string[];
};

/**
 * Central Oregon service-area cities. Factual location data only — the
 * per-city marketing copy and local landing pages are built in a later PR.
 * "bend" is the primary city and maps to `/medicare-bend`.
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
  },
  {
    name: "Redmond",
    slug: "redmond",
    county: "Deschutes County",
    state: "Oregon",
    stateCode: "OR",
    nearbyCommunities: ["Bend", "Terrebonne", "Sisters"],
    zipCodes: ["97756"],
  },
  {
    name: "Sisters",
    slug: "sisters",
    county: "Deschutes County",
    state: "Oregon",
    stateCode: "OR",
    nearbyCommunities: ["Bend", "Redmond", "Camp Sherman"],
    zipCodes: ["97759"],
  },
  {
    name: "Sunriver",
    slug: "sunriver",
    county: "Deschutes County",
    state: "Oregon",
    stateCode: "OR",
    nearbyCommunities: ["Bend", "La Pine"],
    zipCodes: ["97707"],
  },
  {
    name: "La Pine",
    slug: "la-pine",
    county: "Deschutes County",
    state: "Oregon",
    stateCode: "OR",
    nearbyCommunities: ["Sunriver", "Bend"],
    zipCodes: ["97739"],
  },
  {
    name: "Prineville",
    slug: "prineville",
    county: "Crook County",
    state: "Oregon",
    stateCode: "OR",
    nearbyCommunities: ["Redmond", "Bend"],
    zipCodes: ["97754"],
  },
  {
    name: "Madras",
    slug: "madras",
    county: "Jefferson County",
    state: "Oregon",
    stateCode: "OR",
    nearbyCommunities: ["Redmond", "Prineville"],
    zipCodes: ["97741"],
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
