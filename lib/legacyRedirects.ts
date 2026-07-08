/**
 * Generic, location-agnostic legacy path redirects.
 *
 * The prior site carried a large set of person-, ZIP-, and /directory-based
 * redirects for its historical crawl footprint. Those reflected the prior
 * market and are intentionally NOT inherited by the Bend site (a brand-new
 * domain with no prior crawl history). Only safe, generic path renames remain.
 */
export const legacyRedirects = {
  // The team/our-team page is temporarily removed, so /about points to /contact
  // until the Bend team roster is finalized and the team page is restored.
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
} as const;

export type LegacyRedirectPath = keyof typeof legacyRedirects;

export type LegacyPathResolution = {
  type: "redirect";
  destination: string;
  preserveQuery: boolean;
};

function normalizeLegacyPath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

export function getLegacyPathResolution(pathname: string): LegacyPathResolution | null {
  const normalizedPath = normalizeLegacyPath(pathname).toLowerCase();

  const destination = legacyRedirects[normalizedPath as LegacyRedirectPath];

  if (destination) {
    return { type: "redirect", destination, preserveQuery: true };
  }

  return null;
}

export function getLegacyRedirectDestination(pathname: string): string | null {
  const resolution = getLegacyPathResolution(pathname);

  return resolution?.type === "redirect" ? resolution.destination : null;
}
