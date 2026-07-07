import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";
import Disclaimer from "@/components/Disclaimer";
import LeadForm from "@/components/LeadForm";
import { getCityBySlug, getLocalMedicarePath } from "@/lib/cities";
import { siteConfig, telHref } from "@/lib/site";

/**
 * Build metadata for a Central Oregon local Medicare page.
 * The rendered <title> becomes "Medicare Help in {City}, OR | Medicare in Bend"
 * once the root layout appends the brand name.
 */
export function getLocalMedicareMetadata(citySlug: string): Metadata {
  const city = getCityBySlug(citySlug);

  if (!city) {
    return { title: "Not Found" };
  }

  const canonical = `${siteConfig.url}${getLocalMedicarePath(city.slug)}`;

  return {
    title: `Medicare Help in ${city.name}, OR`,
    description: city.metaDescription,
    alternates: { canonical },
    openGraph: {
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
    body: "Bundled plans from private carriers that often include Part D and extras like dental, vision, and hearing. Because these plans use networks, we confirm your providers are covered.",
  },
  {
    href: "/medicare-supplements",
    title: "Medicare Supplement (Medigap)",
    body: "Standardized plans that help with Original Medicare's out-of-pocket costs and let you see any provider nationwide who accepts Medicare.",
  },
  {
    href: "/medicare-part-d",
    title: "Medicare Part D",
    body: "Standalone prescription drug coverage. Formularies, tiers, and preferred pharmacies vary by plan, so we compare how your medications are covered.",
  },
  {
    href: "/supplemental-insurance",
    title: "Dental, Vision & Supplemental",
    body: "Optional dental, vision, hearing, and hospital-indemnity coverage to round out your Medicare benefits where it makes sense for you.",
  },
] as const;

const processSteps = [
  {
    title: "Tell us about your Medicare situation",
    body: "Share where you are — turning 65, leaving employer coverage, new to the area, or reviewing your current plan.",
  },
  {
    title: "Review your doctors, prescriptions, and coverage needs",
    body: "We look at the providers and pharmacies you use and the medications you take.",
  },
  {
    title: "Compare available options",
    body: "We compare the plans we represent side by side so you can weigh costs and coverage.",
  },
  {
    title: "Enroll or review next steps if you choose",
    body: "If you decide to move forward, we help with enrollment — and we stay available year-round.",
  },
] as const;

const helpfulLinks = [
  { href: "/compare-medicare-options", label: "Compare Medicare Options" },
  { href: "/rx-drug-review", label: "Prescription Drug Review" },
  { href: "/turning-65-medicare-bend", label: "Turning 65 & Medicare" },
  { href: "/medicare-plan-review-bend", label: "Annual Plan Review" },
  { href: "/contact", label: "Contact a Local Agent" },
] as const;

interface LocalMedicarePageProps {
  citySlug: string;
}

export default function LocalMedicarePage({ citySlug }: LocalMedicarePageProps) {
  const city = getCityBySlug(citySlug);

  if (!city) {
    notFound();
  }

  const canonicalPath = getLocalMedicarePath(city.slug);

  const reviewItems: string[] = [
    "The doctors and hospitals you use, and whether they are in a plan's network",
    "Your prescription drugs and preferred pharmacies",
    "Premiums, copays, deductibles, and out-of-pocket costs",
    ...(city.travelNote ? [city.travelNote] : []),
    "Enrollment timing, so you understand your windows and avoid late penalties",
  ];

  const localSchema = {
    "@context": "https://schema.org",
    "@type": ["InsuranceAgency", "LocalBusiness"],
    "@id": `${siteConfig.url}${canonicalPath}`,
    name: `${siteConfig.legalName} — Medicare Help in ${city.name}`,
    description: city.metaDescription,
    url: `${siteConfig.url}${canonicalPath}`,
    telephone: siteConfig.phone,
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: `${city.county}, ${city.state}`,
      },
    },
    serviceType: [
      "Medicare Advantage",
      "Medicare Supplement",
      "Medicare Part D",
      "Supplemental insurance",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-800 to-blue-600 px-4 py-16 text-white">
        <div className="mx-auto max-w-5xl">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-blue-200">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Medicare Help in {city.name}</span>
          </nav>
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
          <p className="mt-4 text-sm text-blue-100">{siteConfig.serviceAreaStatement}</p>
        </div>
      </section>

      {/* Local context — the genuinely city-specific section */}
      <section className="bg-white px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Medicare guidance for {city.name} residents
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">{city.localContext}</p>
          <p className="mt-4 text-lg leading-relaxed text-gray-700">
            {siteConfig.legalName} is {siteConfig.agencyDescriptor} serving {city.name} and Central
            Oregon. We help you review coverage options and compare the plans we represent — with no
            cost and no obligation.
          </p>
        </div>
      </section>

      {/* Medicare options to review */}
      <section className="border-y border-slate-100 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900">
              Medicare options to review in {city.name}
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-gray-700">
              Depending on your situation, it can help to review each of these coverage types and how
              they fit your doctors, prescriptions, and budget.
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {optionCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
              >
                <h3 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-blue-700">
                  {card.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-gray-700">{card.body}</p>
                <span className="mt-4 inline-block text-sm font-medium text-blue-700 group-hover:underline">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What we help review */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900">What we help review</h2>
          <ul className="mt-8 space-y-3">
            {reviewItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <span
                  className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span className="text-gray-800">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Local process */}
      <section className="border-y border-slate-100 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900">How local Medicare help works</h2>
            <p className="mt-3 text-lg leading-relaxed text-gray-700">
              A simple, no-pressure process for {city.name} residents.
            </p>
          </div>
          <ol className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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

      {/* Lead form */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Request Medicare help in {city.name}
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Tell us a little about what you want to review, and a licensed local agent will follow
              up. We can help by phone, online, or by appointment.
            </p>
          </div>
          <div id="local-lead-form">
            <LeadForm
              source={city.leadSource}
              heading={`Request Medicare Help in ${city.name}`}
              subheading={`Share your questions about Medicare coverage in ${city.name}, and our Central Oregon team will follow up.`}
              showMessage
            />
          </div>
        </div>
      </section>

      {/* Helpful links */}
      <section className="border-y border-slate-100 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900">Helpful Medicare pages</h2>
            <p className="mt-3 text-lg text-gray-600">
              Review related pages before or after your consultation.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {helpfulLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-700">
                  {item.label}
                </h3>
                <span className="mt-4 inline-block text-sm font-medium text-blue-700 group-hover:underline">
                  Visit page →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <Disclaimer />
        </div>
      </section>

      <CTASection
        heading={`Talk With a Local ${city.name} Medicare Advisor`}
        subheading="No cost, no pressure — just straightforward Medicare guidance for Central Oregon."
      />
    </>
  );
}
