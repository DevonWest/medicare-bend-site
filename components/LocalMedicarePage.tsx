import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTASection from "@/components/CTASection";
import Disclaimer from "@/components/Disclaimer";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import LeadForm from "@/components/LeadForm";
import { getCityBySlug, getLocalMedicarePath } from "@/lib/cities";
import { siteConfig, telHref } from "@/lib/site";

export function getLocalMedicareMetadata(citySlug: string): Metadata {
  const city = getCityBySlug(citySlug);

  if (!city) return { title: "Not Found" };

  const canonical = `${siteConfig.url}${getLocalMedicarePath(city.slug)}`;

  return {
    title: `Medicare Help in ${city.name}, OR`,
    description: city.metaDescription,
    alternates: { canonical },
    openGraph: {
      images: ["/opengraph-image"],
      title: `Medicare Help in ${city.name}, OR | ${siteConfig.shortName}`,
      description: city.metaDescription,
      url: canonical,
    },
  };
}

const optionCards = [
  {
    href: "/medicare-advantage",
    title: "Medicare Advantage (Part C)",
    body: "Private Medicare plans that combine Part A and Part B and commonly include Part D. Networks, referrals, authorizations, copays, and annual out-of-pocket limits vary.",
  },
  {
    href: "/medicare-supplements",
    title: "Original Medicare + Medigap",
    body: "A Medicare Supplement can help with Original Medicare cost sharing and generally lets you use providers nationwide who accept Medicare. Part D is selected separately.",
  },
  {
    href: "/medicare-part-d",
    title: "Medicare Part D",
    body: "Standalone drug plans have different formularies, restrictions, pharmacy networks, and total annual costs. The lowest premium may not be the lowest-cost choice.",
  },
  {
    href: "/oregon-medigap-birthday-rule",
    title: "Oregon Medigap Rights",
    body: "Oregon has a Medigap birthday rule for eligible policyholders, but timing and equal-or-lesser-benefit requirements apply. Review the rule before changing coverage.",
  },
] as const;

const processSteps = [
  {
    title: "Map your care",
    body: "List every clinician, clinic, hospital, pharmacy, prescription, and planned procedure you want the coverage to handle.",
  },
  {
    title: "Confirm eligibility and timing",
    body: "Review your county, ZIP code, Medicare status, employer coverage, and any enrollment period that applies.",
  },
  {
    title: "Compare complete costs",
    body: "Look beyond premium to medical cost sharing, drug costs, network rules, travel access, and financial risk.",
  },
  {
    title: "Verify before enrolling",
    body: "Recheck the official plan directory and ask providers about the exact plan name and year before submitting an enrollment.",
  },
] as const;

const officialResources = [
  {
    href: "https://www.medicare.gov/plan-compare/",
    title: "Medicare Plan Compare",
    body: "Use your ZIP code, prescriptions, and pharmacies to review official plan information.",
  },
  {
    href: "https://www.councilonaging.org/programs/medicare-counseling/",
    title: "Central Oregon SHIBA counseling",
    body: "The Council on Aging of Central Oregon offers free, unbiased Medicare counseling through Oregon SHIBA.",
  },
  {
    href: "https://www.medicare.gov/basics/get-started-with-medicare/using-medicare/if-you-move",
    title: "Medicare guidance when you move",
    body: "A permanent move can affect Medicare Advantage or Part D availability and may create an enrollment opportunity.",
  },
] as const;

interface LocalMedicarePageProps {
  citySlug: string;
}

export default function LocalMedicarePage({ citySlug }: LocalMedicarePageProps) {
  const city = getCityBySlug(citySlug);

  if (!city) notFound();

  const canonicalPath = getLocalMedicarePath(city.slug);
  const localSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}${canonicalPath}#service`,
    name: `Medicare guidance in ${city.name}, Oregon`,
    description: city.metaDescription,
    url: `${siteConfig.url}${canonicalPath}`,
    provider: { "@id": `${siteConfig.url}#organization` },
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: `${city.county}, ${city.state}`,
      },
    },
    audience: { "@type": "Audience", audienceType: "Medicare beneficiaries and caregivers" },
    serviceType: [
      "Medicare Advantage plan comparison",
      "Medicare Supplement comparison",
      "Medicare Part D comparison",
      "Medicare enrollment guidance",
    ],
  };

  return (
    <>
      <section className="bg-gradient-to-br from-blue-800 to-blue-600 px-4 py-16 text-white">
        <JsonLd data={localSchema} />
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/resources", label: "Resources" },
              { label: `Medicare in ${city.name}` },
            ]}
            className="mb-4 text-sm text-blue-200"
          />
          <h1 className="mb-4 text-4xl font-extrabold leading-tight md:text-5xl">
            Medicare Help in {city.name}, Oregon
          </h1>
          <p className="max-w-3xl text-xl text-blue-100">{city.heroSummary}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={telHref}
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-blue-700 transition-colors hover:bg-blue-50"
            >
              Call {siteConfig.phone}
            </a>
            <Link
              href="#local-lead-form"
              className="inline-flex items-center justify-center rounded-lg border border-blue-200 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Request Medicare Help
            </Link>
          </div>
          <p className="mt-4 text-sm text-blue-100">No cost · No obligation · Plans from the carriers we represent</p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">County</p>
            <Link href={city.countyPath} className="mt-2 block text-lg font-bold text-gray-900 hover:text-blue-700">
              {city.county}
            </Link>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">ZIP codes covered</p>
            <p className="mt-2 text-lg font-bold text-gray-900">{city.zipCodes.join(", ")}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Nearby care areas</p>
            <p className="mt-2 text-base font-semibold text-gray-900">{city.nearbyCommunities.join(", ")}</p>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold text-slate-600">Reviewed September 27, 2026</p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900">How Medicare and local care connect in {city.name}</h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-gray-700">
            {city.localOverview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <aside className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-base leading-relaxed text-amber-950">
            <strong>Important distinction:</strong> a provider saying it “accepts Medicare” does not prove
            participation in every Medicare Advantage plan. Network status, appointment availability, and
            acceptance of new patients are separate questions.
          </aside>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-700">Local care map</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">Providers and facilities to verify near {city.name}</h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">{city.careAccessSummary}</p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {city.localFacilities.map((facility) => (
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
            These links are starting points, not network guarantees or endorsements. Provider contracts,
            clinician availability, locations, and services can change. Confirm directly with both the plan and provider.
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-700">Your comparison checklist</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">What {city.name} residents should verify</h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              Plan availability starts with your permanent address, but a useful review follows the care you actually receive.
            </p>
            <Link
              href="/central-oregon-medicare-provider-networks"
              className="mt-5 inline-block font-semibold text-blue-700 underline underline-offset-2"
            >
              Use the complete provider-network guide →
            </Link>
          </div>
          <ul className="space-y-3">
            {city.comparisonFactors.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <span
                  className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span className="leading-relaxed text-gray-800">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900">Medicare coverage paths to compare</h2>
            <p className="mt-3 text-lg leading-relaxed text-gray-700">
              Compare how each route handles provider access, prescriptions, predictable premiums, and financial risk.
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {optionCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
              >
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-700">{card.title}</h3>
                <p className="mt-3 leading-relaxed text-gray-700">{card.body}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-blue-700 group-hover:underline">Read guide →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900">A safer four-step review</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-700 font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900">Official Medicare and local help</h2>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-gray-700">
            Use current government and community resources alongside a plan-specific review.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {officialResources.map((resource) => (
              <a
                key={resource.href}
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-blue-300"
              >
                <h3 className="text-lg font-bold text-gray-900">{resource.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">{resource.body}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-blue-700">Visit official resource ↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Request Medicare help in {city.name}</h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              Tell us what you want to review. A licensed local agent can compare the plans we represent
              around your providers, prescriptions, pharmacies, budget, and enrollment timing.
            </p>
            <p className="mt-4 text-gray-700">Help is available by phone, online, or by appointment, with no cost or obligation.</p>
          </div>
          <div id="local-lead-form">
            <LeadForm
              source={city.leadSource}
              heading={`Request Medicare Help in ${city.name}`}
              subheading={`Share your questions about Medicare coverage in ${city.name}, and Scott will follow up.`}
              showMessage
            />
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900">Explore nearby Medicare guides</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={city.countyPath}
              className="rounded-full border border-blue-200 bg-blue-50 px-5 py-2.5 font-semibold text-blue-800 hover:bg-blue-100"
            >
              {city.county} guide
            </Link>
            {city.relatedLocations.map((location) => (
              <Link
                key={location.href}
                href={location.href}
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 font-semibold text-blue-700 hover:border-blue-300"
              >
                Medicare in {location.label}
              </Link>
            ))}
            <Link
              href="/resources"
              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 font-semibold text-blue-700 hover:border-blue-300"
            >
              All Medicare guides
            </Link>
          </div>
        </div>
      </section>

      <FAQ heading={`Medicare questions from ${city.name} residents`} items={city.faqItems} />

      <section className="bg-white px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <Disclaimer />
        </div>
      </section>

      <CTASection
        heading={`Talk With a Local ${city.name} Medicare Advisor`}
        subheading="No cost, no pressure—just straightforward Medicare guidance for Central Oregon."
      />
    </>
  );
}
