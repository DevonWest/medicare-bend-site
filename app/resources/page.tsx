import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import Disclaimer from "@/components/Disclaimer";
import PageHero from "@/components/PageHero";
import { centralOregonCities, getLocalMedicarePath } from "@/lib/cities";
import { getMarketUpdatesNewestFirst, marketUpdatesHub } from "@/lib/marketUpdates";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Medicare Resource Library for Central Oregon",
  description:
    "Browse Bend and Central Oregon Medicare guides for turning 65, comparing options, reviewing prescriptions, and finding trusted Medicare and government resources.",
  alternates: { canonical: `${siteConfig.url}/resources` },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Medicare Resource Library for Central Oregon",
    description:
      "Browse Central Oregon Medicare guides for turning 65, comparing options, reviewing prescriptions, and trusted Medicare and government resources.",
    url: `${siteConfig.url}/resources`,
  },
};

interface ResourceLink {
  href: string;
  title: string;
  body: string;
  ctaLabel?: string;
  external?: boolean;
}

const resourceSections: Array<{ title: string; intro: string; items: ResourceLink[] }> = [
  {
    title: "Central Oregon Provider & Plan Guides",
    intro:
      "Use current provider and government sources to check local networks before choosing coverage.",
    items: [
      {
        href: "/high-lakes-health-care-medicare-advantage-bend",
        title: "High Lakes 2027 Medicare Network Update",
        body: "See Praxis Health's published 2027 participation list, the unresolved UnitedHealthcare negotiation, and the three checks Bend residents need.",
      },
      {
        href: "/central-oregon-medicare-provider-networks",
        title: "Central Oregon Medicare Provider Networks",
        body: "Verify St. Charles, Summit Health, individual clinicians, and exact Medicare Advantage plans without confusing acceptance, availability, and network status.",
      },
      {
        href: "/doctors-accepting-medicare-bend",
        title: "Doctors Accepting Medicare in Bend",
        body: "Use High Lakes, Summit Health, St. Charles, and Medicare directories, then verify new-patient and exact-plan status.",
      },
      {
        href: "/st-charles-medicare-plans-bend",
        title: "St. Charles and Medicare Plans",
        body: "Review what St. Charles currently confirms for Medicare and 2026 Medicare Advantage participation, plus what still requires verification.",
      },
      {
        href: "/summit-health-medicare-bend",
        title: "Summit Health and Medicare",
        body: "Understand Summit Health's published Medicare statement and how to verify an exact plan, clinic, and clinician.",
      },
    ],
  },
  {
    title: "Getting Started with Medicare",
    intro:
      "Start with Central Oregon guides for enrollment timing, comparing plan types, and understanding your first Medicare decisions.",
    items: [
      {
        href: "/turning-65-medicare-bend",
        title: "Turning 65 in Bend",
        body: "Use a local checklist to understand enrollment timing, employer coverage questions, and the next steps before Medicare begins.",
        ctaLabel: "Read More",
      },
      {
        href: "/compare-medicare-options",
        title: "Compare Medicare Options",
        body: "Review Medicare Advantage, Medicare Supplement, Part D, and related coverage types from the plans we represent.",
        ctaLabel: "Read More",
      },
      {
        href: "/medicare-advantage-vs-supplement-bend",
        title: "Medicare Advantage vs. Supplement in Bend",
        body: "Compare provider access, prescriptions, costs, travel, and enrollment timing for two common coverage paths.",
        ctaLabel: "Compare",
      },
      {
        href: "/moving-to-bend-medicare",
        title: "Moving to Bend with Medicare",
        body: "Use a move checklist for address changes, county plan availability, provider networks, prescriptions, and Special Enrollment Period timing.",
      },
      {
        href: "/medicare-appointment-checklist",
        title: "What to Bring to Your Medicare Appointment",
        body: "Use this simple checklist to organize prescriptions, doctors, pharmacies, and questions before your visit.",
        ctaLabel: "Read More",
      },
    ],
  },
  {
    title: "Oregon Medicare Savings & Medigap Rights",
    intro:
      "Oregon-specific guides for lowering eligible Medicare costs and reviewing an existing Medicare Supplement policy.",
    items: [
      {
        href: "/oregon-medicare-savings-program-extra-help",
        title: "Oregon Medicare Savings Programs & Extra Help",
        body: "See current screening figures, benefits, Oregon's no-asset-test MSP rule, and official application contacts.",
      },
      {
        href: "/oregon-medigap-birthday-rule",
        title: "Oregon Medigap Birthday Rule",
        body: "Understand the 30-day-before through 30-day-after application window and the equal-or-lesser-benefits requirement.",
      },
    ],
  },
  {
    title: "Individual Health Insurance",
    intro:
      "Information for Central Oregon residents who buy coverage outside an employer or Medicare.",
    items: [
      {
        href: "/oregon-health-insurance-changes-2027",
        title: "2027 Oregon Health Insurance Changes",
        body: "See final rate changes, Central Oregon county carrier choices, individual-market exits, and Oregon's new Marketplace transition.",
      },
      {
        href: "/health-insurance-bend",
        title: "Individual Health Insurance in Bend",
        body: "Compare provider networks, prescriptions, total costs, Marketplace savings, and enrollment timing.",
      },
    ],
  },
  {
    title: "Reviewing or Changing Coverage",
    intro:
      "Review these pages when you want help with prescriptions, plan types, and coverage details before you make a change.",
    items: [
      {
        href: "/medicare-annual-enrollment-bend",
        title: "Medicare Annual Enrollment in Bend",
        body: "Prepare for October 15 through December 7 with a local provider, prescription, pharmacy, and total-cost checklist.",
      },
      {
        href: "/medicare-plan-review-bend",
        title: "Annual Medicare Plan Review",
        body: "Review plan changes, prescriptions, doctors, pharmacies, and out-of-pocket costs before the next plan year.",
        ctaLabel: "Get Help",
      },
      {
        href: "/rx-drug-review",
        title: "Prescription Drug Review",
        body: "Bring your medication list and compare how Medicare Advantage and Part D plans we represent may cover your prescriptions.",
        ctaLabel: "Get Help",
      },
      {
        href: "/2027-medicare-part-d-changes",
        title: "2027 Medicare Part D Changes",
        body: "Review the confirmed $700 standard deductible, $2,400 out-of-pocket threshold, and 15 negotiated drugs.",
      },
      {
        href: "/medicare-part-d",
        title: "Medicare Part D",
        body: "Learn how standalone prescription drug coverage works, what changes year to year, and what to review before enrolling.",
        ctaLabel: "Read More",
      },
    ],
  },
  {
    title: "Family / Caregiver Help",
    intro:
      "Support for adult children, spouses, and caregivers helping a loved one review Medicare options with more clarity.",
    items: [
      {
        href: "/helping-parent-with-medicare",
        title: "Helping a Parent with Medicare",
        body: "Review plan options, prescriptions, doctors, and next steps when you are helping a parent or loved one.",
        ctaLabel: "Get Help",
      },
    ],
  },
  {
    title: "Working and Medicare",
    intro:
      "Guidance for Central Oregon residents who are still working and want to understand employer coverage and Medicare timing.",
    items: [
      {
        href: "/working-past-65-medicare",
        title: "Working Past 65 and Medicare",
        body: "Understand Medicare timing, employer coverage questions, Part B, Part D, and HSA-related concerns.",
        ctaLabel: "Read More",
      },
    ],
  },
  {
    title: "More Medicare Resources",
    intro:
      "Additional guides and supporting pages for common Medicare questions, plan comparisons, and local agency information.",
    items: [
      {
        href: "/medicare-enrollment-resources",
        title: "Medicare Enrollment Resources",
        body: "Initial Enrollment Period, Annual Enrollment Period, and Special Enrollment Periods explained in plain language.",
      },
      {
        href: "/medicare-faq",
        title: "Medicare FAQ",
        body: "Common Medicare questions we hear from Central Oregon residents — answered without the jargon.",
      },
      {
        href: "/carriers",
        title: "Carrier & Plan Availability",
        body: "Learn how current carrier appointments, local plan availability, provider networks, and product details are verified.",
      },
    ],
  },
];

const officialResources: ResourceLink[] = [
  {
    href: "https://www.medicare.gov/",
    title: "Medicare.gov",
    body: "The official U.S. government site for Medicare beneficiaries.",
    external: true,
  },
  {
    href: "https://shiba.oregon.gov/",
    title: "Oregon SHIBA (SHIP)",
    body: "Oregon's Senior Health Insurance Benefits Assistance program — free Medicare counseling through the state's SHIP program.",
    external: true,
  },
  {
    href: "https://www.ssa.gov/medicare/",
    title: "Social Security Administration",
    body: "Apply for Medicare and learn about enrollment timelines through the Social Security Administration.",
    external: true,
  },
];

export default function ResourcesPage() {
  const marketUpdates = getMarketUpdatesNewestFirst();

  return (
    <>
        <PageHero
          title="Medicare Resource Library"
          subtitle="Browse local Medicare guides, plan comparisons, and trusted Medicare and government links to help you review your options with confidence."
          crumbs={[{ href: "/", label: "Home" }, { label: "Resources" }]}
        />

      <section className="border-b border-blue-100 bg-blue-50 px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-700">
            Bend and Oregon coverage updates
          </p>
          <div className="mt-3 grid gap-7 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">2027 Medicare changes</h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-700">
                Track confirmed provider and national changes while final Deschutes County plan
                availability, premiums, and benefits remain pending.
              </p>
              <Link
                href={marketUpdatesHub.path}
                className="mt-5 inline-block font-semibold text-blue-700 underline"
              >
                Open the complete 2027 tracker →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {marketUpdates.map((update) => (
                <Link
                  key={update.path}
                  href={update.path}
                  className="rounded-2xl border border-blue-200 bg-white p-5 transition-colors hover:border-blue-400"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                    {update.localStatusLabel}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-gray-900">{update.shortTitle}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">{update.summary}</p>
                  <span className="mt-3 inline-block text-sm font-semibold text-blue-700">Read update →</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl">Local Medicare Guides</h2>
          <p className="mb-10 max-w-2xl text-gray-600">
            Helping Central Oregon residents review Medicare with large-text, easy-to-scan guides and
            clear next steps.
          </p>
          <div className="space-y-12">
            {resourceSections.map((section) => (
              <section key={section.title}>
                <div className="max-w-3xl">
                  <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-gray-600">{section.intro}</p>
                </div>
                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                  {section.items.map((resource) => (
                    <Link
                      key={resource.href}
                      href={resource.href}
                      className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:border-blue-300 hover:shadow-md"
                    >
                      <h4 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-blue-700">
                        {resource.title}
                      </h4>
                      <p className="mt-3 text-base leading-relaxed text-gray-700">{resource.body}</p>
                      <span className="mt-5 inline-block text-sm font-medium text-blue-700 group-hover:underline">
                        {resource.ctaLabel ?? "Read More"} →
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl">
            Central Oregon Medicare Help
          </h2>
          <p className="mb-8 max-w-2xl text-gray-600">
            Local Medicare guidance for the communities we serve across Central Oregon.
          </p>
          <div className="flex flex-wrap gap-3">
            {centralOregonCities.map((city) => (
              <Link
                key={city.slug}
                href={getLocalMedicarePath(city.slug)}
                className="rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-sm font-medium text-blue-700 transition-colors hover:border-blue-300 hover:bg-blue-50"
              >
                Medicare in {city.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl">
            Medicare &amp; Government Resources
          </h2>
          <p className="mb-10 max-w-2xl text-gray-600">
            Independent guidance starts with reliable information. These official resources can help
            you compare options and understand your rights.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {officialResources.map((r) => (
              <a
                key={r.href}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-md"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-700">
                  {r.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-gray-600">{r.body}</p>
                <span className="text-sm font-medium text-blue-700 group-hover:underline">Visit site ↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <Disclaimer />
        </div>
      </section>

      <CTASection
        heading="Have a Medicare Question?"
        subheading="Talk with a local licensed insurance professional in Central Oregon — no cost, no pressure."
      />
    </>
  );
}
