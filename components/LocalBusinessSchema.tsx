import { siteConfig } from "@/lib/site";
import { centralOregonCities } from "@/lib/cities";

export default function LocalBusinessSchema() {
  const sameAs: string[] = [];
  if (siteConfig.social.facebook) sameAs.push(siteConfig.social.facebook);

  const schema = {
    "@context": "https://schema.org",
    "@type": ["InsuranceAgency", "LocalBusiness"],
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.legalName,
    alternateName: [siteConfig.name, siteConfig.shortName],
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    slogan: siteConfig.positioning,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "Free consultation",
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      addressCountry: siteConfig.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      // Approximate coordinates for Bend, OR.
      latitude: 44.0582,
      longitude: -121.3153,
    },
    areaServed: [
      ...centralOregonCities.map((city) => ({
        "@type": "City",
        name: city.name,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: `${city.county}, ${city.state}`,
        },
      })),
      { "@type": "AdministrativeArea", name: "Deschutes County, Oregon" },
      { "@type": "AdministrativeArea", name: "Crook County, Oregon" },
      { "@type": "AdministrativeArea", name: "Jefferson County, Oregon" },
      { "@type": "AdministrativeArea", name: "Central Oregon" },
    ],
    serviceType: [
      "Medicare Advantage",
      "Medicare Supplement",
      "Medicare Part D",
      "Supplemental Insurance",
      "Medicare Enrollment Assistance",
      "Prescription Drug Plan Review",
    ],
    knowsAbout: [
      "Medicare",
      "Medicare Advantage (Part C)",
      "Medicare Supplement (Medigap)",
      "Medicare Part D prescription drug plans",
      "Supplemental insurance (dental, vision, hospital indemnity)",
      "Medicare Initial Enrollment Period",
      "Medicare Annual Enrollment Period",
      "Turning 65 and Medicare",
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    sameAs,
    disclaimer: siteConfig.disclaimer,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
