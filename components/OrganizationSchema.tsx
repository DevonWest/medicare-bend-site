import { siteConfig } from "@/lib/site";
import { centralOregonCities } from "@/lib/cities";
import JsonLd from "@/components/JsonLd";

export default function OrganizationSchema() {
  const sameAs: string[] = [];
  if (siteConfig.social.facebook) sameAs.push(siteConfig.social.facebook);

  const organization = {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.legalName,
    alternateName: [siteConfig.name, siteConfig.shortName],
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    slogan: siteConfig.positioning,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    logo: `${siteConfig.url}/brand/hio-logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      email: siteConfig.email,
      contactType: "customer service",
      areaServed: "US-OR",
      availableLanguage: "English",
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
    ...(sameAs.length ? { sameAs } : {}),
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { "@id": `${siteConfig.url}#organization` },
        inLanguage: "en-US",
      },
    ],
  };

  return <JsonLd data={schema} />;
}

