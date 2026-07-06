/**
 * Source-of-truth business / brand configuration.
 *
 * Medicare in Bend — Health Insurance Options LLC serving Bend and Central
 * Oregon. Compliance language here is intentionally limited to what CMS
 * marketing rules allow for a licensed independent insurance agency that does
 * not represent every plan in the area.
 *
 * TODO(bend-contact): confirm the final Bend phone number, email address, and
 * whether a physical Bend office address exists. Until then, contact details
 * are placeholders and MUST be verified before any deployment. Keep contact
 * values centralized here — do not hard-code them across pages/components.
 */
export const siteConfig = {
  /** Public-facing brand / site name. */
  name: "Medicare in Bend by Health Insurance Options",
  /** Short brand for nav, breadcrumbs, etc. */
  shortName: "Medicare in Bend",
  /** Legal entity that holds the insurance license. */
  legalName: "Health Insurance Options LLC",
  /** How we describe ourselves for compliance purposes. */
  agencyDescriptor: "a licensed independent insurance agency",
  /** Brand positioning / tagline used on the site. */
  positioning: "Guiding You Through the Confusion of Medicare.",
  tagline: "Local Central Oregon Medicare Help",
  description:
    "Health Insurance Options LLC is a licensed independent insurance agency serving Bend and Central Oregon, helping local Medicare beneficiaries compare Medicare Advantage, Medicare Supplement, Part D, and supplemental insurance options. No-cost consultations with a licensed insurance professional.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.medicareinbend.com",
  // TODO(bend-contact): replace with the real Bend phone number (555-0100 is a
  // reserved fictional number used only as a placeholder for now).
  phone: "541-555-0100",
  // TODO(bend-contact): confirm this matches the canonical domain mailbox.
  email: "info@medicareinbend.com",
  hours: "Mon – Fri, 9:00 AM – 5:00 PM Pacific",
  // No physical Bend office is claimed yet. We describe the service area
  // instead of a street address. TODO(bend-contact): if a Bend office opens,
  // add its address here and restore address rendering where appropriate.
  serviceAreaStatement:
    "Serving Bend and Central Oregon by phone, online, and by appointment.",
  address: {
    // Region-level only; no street address is claimed for Bend yet.
    addressLocality: "Bend",
    addressRegion: "OR",
    addressCountry: "US",
  },
  social: {
    facebook: "",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
  },
  /**
   * CMS-style disclaimer. The prior site cited a specific "8 organizations /
   * 75 products" count; that figure reflected the prior market and is
   * unverified for Bend/Oregon, so we use the generic CMS-compliant form until
   * the Bend/Oregon representation is confirmed.
   * TODO(bend-carriers): confirm the Bend/Oregon carrier representation and, if
   * desired, restore a specific organization/product count here.
   */
  disclaimer:
    "We do not offer every plan available in your area. Currently we represent organizations which offer products in your area. Please contact Medicare.gov, 1-800-MEDICARE, or your local State Health Insurance Assistance Program to get information on all your options.",
  /**
   * Non-affiliation disclosure. The agency is independent and not connected to
   * any government Medicare program.
   */
  nonAffiliation:
    "Health Insurance Options LLC is a licensed independent insurance agency. We are not affiliated with or endorsed by the U.S. Centers for Medicare & Medicaid Services (CMS), Medicare.gov, the Social Security Administration, or the U.S. Department of Health and Human Services (HHS).",
};

export type SiteConfig = typeof siteConfig;

/** Digits-only phone number, suitable for `tel:` links. */
export const phoneDigits = siteConfig.phone.replace(/\D/g, "");

/** Pre-built `tel:` href. */
export const telHref = `tel:${phoneDigits}`;
