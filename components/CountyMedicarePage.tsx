import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";
import Disclaimer from "@/components/Disclaimer";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import LeadForm from "@/components/LeadForm";
import PageHero from "@/components/PageHero";
import { getCountyBySlug, getCountyMedicarePath } from "@/lib/counties";
import { siteConfig } from "@/lib/site";

export function getCountyMedicareMetadata(countySlug: string): Metadata {
  const county = getCountyBySlug(countySlug);
  if (!county) return { title: "Not Found" };

  const canonical = `${siteConfig.url}${getCountyMedicarePath(county.slug)}`;
  return {
    title: `Medicare in ${county.name}, Oregon`,
    description: county.metaDescription,
    alternates: { canonical },
    openGraph: {
      images: ["/opengraph-image"],
      title: `Medicare in ${county.name}, Oregon | ${siteConfig.shortName}`,
      description: county.metaDescription,
      url: canonical,
    },
  };
}

const coveragePaths = [
  {
    href: "/medicare-advantage",
    title: "Medicare Advantage",
    body: "County availability, provider networks, referral rules, prior authorization, Part D coverage, cost sharing, and an annual medical out-of-pocket limit all matter.",
  },
  {
    href: "/medicare-supplements",
    title: "Original Medicare + Medigap",
    body: "A Medicare Supplement helps with Original Medicare cost sharing and generally works with providers nationwide who accept Medicare. Part D is separate.",
  },
  {
    href: "/medicare-part-d",
    title: "Prescription drug coverage",
    body: "Standalone Part D and Medicare Advantage drug coverage should be compared with your exact prescriptions, dosages, and pharmacies.",
  },
] as const;

interface CountyMedicarePageProps {
  countySlug: string;
}

export default function CountyMedicarePage({ countySlug }: CountyMedicarePageProps) {
  const county = getCountyBySlug(countySlug);
  if (!county) notFound();

  const path = getCountyMedicarePath(county.slug);
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}${path}#service`,
    name: `Medicare guidance in ${county.name}, Oregon`,
    description: county.metaDescription,
    url: `${siteConfig.url}${path}`,
    provider: { "@id": `${siteConfig.url}#organization` },
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${county.name}, ${county.state}`,
    },
    serviceType: [
      "Medicare Advantage plan comparison",
      "Medicare Supplement comparison",
      "Medicare Part D comparison",
      "Medicare enrollment guidance",
    ],
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <PageHero
        title={`Medicare in ${county.name}, Oregon`}
        subtitle={county.heroSummary}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/resources", label: "Resources" },
          { label: county.name },
        ]}
      />

      <section className="border-b border-slate-200 bg-white px-4 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Communities covered</p>
            <p className="mt-2 font-semibold leading-relaxed text-gray-900">{county.communities.join(", ")}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Common ZIP codes</p>
            <p className="mt-2 font-semibold leading-relaxed text-gray-900">{county.commonZipCodes.join(", ")}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Last reviewed</p>
            <p className="mt-2 font-semibold text-gray-900">September 27, 2026</p>
            <p className="mt-1 text-sm text-gray-600">Verify plan and provider status before enrolling.</p>
          </div>
        </div>
      </section>

      <article className="bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-700">Countywide guide</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">How Medicare works across {county.name}</h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-gray-700">
            {county.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <aside className="mt-8 rounded-2xl border-2 border-amber-200 bg-amber-50 p-6 text-base leading-relaxed text-amber-950">
            <strong>County and network are different checks.</strong> County determines whether a plan is
            available at your address. The plan network determines which doctors, hospitals, pharmacies,
            and other suppliers participate. Complete both checks before comparing extra benefits.
          </aside>
        </div>
      </article>

      <section className="border-y border-slate-100 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-700">Provider access</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">Hospitals, clinics, and care routes to verify</h2>
          <p className="mt-4 max-w-4xl text-lg leading-relaxed text-gray-700">{county.carePattern}</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {county.facilities.map((facility) => (
              <article key={facility.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-700">{facility.type}</p>
                <h3 className="mt-2 text-xl font-bold text-gray-900">{facility.name}</h3>
                <p className="mt-3 leading-relaxed text-gray-700">{facility.description}</p>
                <a
                  href={facility.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block font-semibold text-blue-700 underline underline-offset-2"
                >
                  Check the official provider page ↗
                </a>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-4xl text-sm leading-relaxed text-slate-600">
            Inclusion here is informational and does not establish a plan contract, appointment availability,
            or endorsement. Confirm the exact plan, location, clinician, and service with both sides.
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-700">Before enrollment</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">The {county.name} verification list</h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              Use full plan names and IDs. A carrier can offer several products with different networks,
              benefits, and costs in the same county.
            </p>
            <Link
              href="/central-oregon-medicare-provider-networks"
              className="mt-5 inline-block font-semibold text-blue-700 underline underline-offset-2"
            >
              Open the provider-network guide →
            </Link>
          </div>
          <ul className="space-y-3">
            {county.comparisonFactors.map((factor) => (
              <li key={factor} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <span
                  aria-hidden="true"
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white"
                >
                  ✓
                </span>
                <span className="leading-relaxed text-gray-800">{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900">Three coverage paths to compare</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {coveragePaths.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
              >
                <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-gray-700">{item.body}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-blue-700">Read guide →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-7">
            <h2 className="text-2xl font-bold text-gray-900">Prescription and pharmacy review</h2>
            <ul className="mt-5 list-disc space-y-3 pl-6 text-gray-800">
              {county.prescriptionConsiderations.map((item) => (
                <li key={item} className="leading-relaxed">{item}</li>
              ))}
            </ul>
            <Link href="/rx-drug-review" className="mt-5 inline-block font-semibold text-blue-700 underline">
              Request a prescription review →
            </Link>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-7">
            <h2 className="text-2xl font-bold text-gray-900">Moving or changing counties</h2>
            <ul className="mt-5 list-disc space-y-3 pl-6 text-gray-800">
              {county.movingConsiderations.map((item) => (
                <li key={item} className="leading-relaxed">{item}</li>
              ))}
            </ul>
            <Link href="/moving-to-bend-medicare" className="mt-5 inline-block font-semibold text-blue-700 underline">
              Read the Central Oregon move checklist →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900">Community Medicare guides</h2>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-gray-700">
            Continue with the page for your community to see its care pattern, nearby facilities, and local questions.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {county.cityLinks.map((city) => (
              <Link
                key={city.href}
                href={city.href}
                className="rounded-full border border-blue-200 bg-white px-5 py-2.5 font-semibold text-blue-700 hover:bg-blue-50"
              >
                Medicare in {city.label}
              </Link>
            ))}
            <Link
              href="/resources"
              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 font-semibold text-blue-700 hover:border-blue-300"
            >
              All Central Oregon guides
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-700">Primary references</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">Sources and verification</h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              These government, health-system, and community sources support the local access information in this guide.
              Always confirm current plan participation directly before making a coverage decision.
            </p>
          </div>
          <ul className="space-y-3">
            {county.sources.map((source) => (
              <li key={source.href} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-700 underline underline-offset-2"
                >
                  {source.label} ↗
                </a>
                <p className="mt-1 text-sm text-gray-600">{source.publisher}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Request Medicare help in {county.name}</h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              A licensed local agent can compare the plans we represent using your address, doctors,
              hospitals, prescriptions, pharmacies, travel needs, and budget. There is no cost or obligation.
            </p>
          </div>
          <LeadForm
            source={county.leadSource}
            heading={`Request Medicare Help in ${county.name}`}
            subheading="Share what you want to review, and Scott will follow up."
            showMessage
          />
        </div>
      </section>

      <FAQ heading={`${county.name} Medicare questions`} items={county.faqItems} />

      <section className="bg-white px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <Disclaimer />
        </div>
      </section>

      <CTASection
        heading={`Compare Medicare Coverage in ${county.name}`}
        subheading="Local, no-cost guidance for the plans we represent across Central Oregon."
      />
    </>
  );
}
