import type { Metadata } from "next";
import Link from "next/link";
import Disclaimer from "@/components/Disclaimer";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { getMarketUpdatesNewestFirst, marketUpdatesHub } from "@/lib/marketUpdates";
import { siteConfig } from "@/lib/site";

const pageUrl = siteConfig.url + marketUpdatesHub.path;
const updates = getMarketUpdatesNewestFirst();

export const metadata: Metadata = {
  title: marketUpdatesHub.title,
  description: marketUpdatesHub.description,
  alternates: { canonical: pageUrl },
  openGraph: {
    images: ["/opengraph-image"],
    title: marketUpdatesHub.title,
    description: marketUpdatesHub.description,
    url: pageUrl,
    type: "website",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": pageUrl + "#webpage",
  url: pageUrl,
  name: marketUpdatesHub.title,
  description: marketUpdatesHub.description,
  datePublished: "2026-09-27",
  dateModified: marketUpdatesHub.modifiedDate,
  isPartOf: { "@id": siteConfig.url + "#website" },
  publisher: { "@id": siteConfig.url + "#organization" },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: updates.length,
    itemListElement: updates.map((update, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: siteConfig.url + update.path,
      name: update.title,
    })),
  },
};

const evergreenGuides = [
  {
    href: "/oregon-medigap-birthday-rule",
    title: "Oregon Medigap Birthday Rule",
    body: "Learn the 30-day-before through 30-day-after window and the same-or-lesser-benefits rule.",
  },
  {
    href: "/oregon-medicare-savings-program-extra-help",
    title: "Oregon Medicare Savings Programs & Extra Help",
    body: "Review current income and resource screening figures, benefits, and official application contacts.",
  },
  {
    href: "/doctors-accepting-medicare-bend",
    title: "Doctors Accepting Medicare in Bend",
    body: "Use local directories and a practical script to check Medicare acceptance, plan networks, and new-patient status.",
  },
  {
    href: "/medicare-annual-enrollment-bend",
    title: "Medicare Annual Enrollment in Bend",
    body: "Prepare for October 15 through December 7 with a provider, prescription, pharmacy, and cost checklist.",
  },
] as const;

export default function MedicareChangesBend2027Page() {
  return (
    <>
      <JsonLd data={pageSchema} />
      <PageHero
        title={marketUpdatesHub.title}
        subtitle="A dated local tracker that separates confirmed Medicare changes from plan availability, benefits, and network details that are still pending for Bend and Deschutes County."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/resources", label: "Resources" },
          { label: "2027 Medicare Changes" },
        ]}
      />

      <section className="bg-white px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <aside className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-6 text-amber-950">
            <p className="text-sm font-bold uppercase tracking-wider text-amber-800">Current local status</p>
            <p className="mt-3 text-xl font-bold">
              The official 2027 Deschutes County plan landscape is still pending.
            </p>
            <p className="mt-2 leading-relaxed">
              Provider and national benefit announcements are useful early signals, but they do not
              establish which exact plan is available at a Bend ZIP code. We label that distinction
              on every update.
            </p>
          </aside>

          <h2 className="mt-10 text-3xl font-bold text-gray-900">Latest Bend and Oregon updates</h2>
          <div className="mt-7 space-y-5">
            {updates.map((update) => (
              <Link
                key={update.path}
                href={update.path}
                className="block rounded-2xl border border-blue-200 bg-blue-50 p-6 transition-colors hover:border-blue-400 hover:bg-blue-100"
              >
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
                  Updated September 27, 2026 · {update.localStatusLabel}
                </p>
                <h3 className="mt-2 text-2xl font-bold text-gray-900">{update.shortTitle}</h3>
                <p className="mt-3 leading-relaxed text-gray-700">{update.summary}</p>
                <span className="mt-4 inline-block font-semibold text-blue-700">Read the update →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900">2027 review guides</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-700">
            These Oregon and Bend references cover important decisions that do not depend on the
            final Deschutes County plan count.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {evergreenGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-blue-300"
              >
                <h3 className="text-xl font-bold text-gray-900">{guide.title}</h3>
                <p className="mt-3 leading-relaxed text-gray-700">{guide.body}</p>
                <span className="mt-4 inline-block font-semibold text-blue-700">Read guide →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14">
        <div className="mx-auto max-w-4xl space-y-5 text-lg leading-relaxed text-gray-700">
          <h2 className="text-3xl font-bold text-gray-900">How we verify a local change</h2>
          <ul className="list-disc space-y-3 pl-7">
            <li>CMS or Medicare.gov confirms the national rule or official county plan data.</li>
            <li>A provider or health system identifies the plan year and coverage type.</li>
            <li>A carrier announcement is not treated as Bend availability without a matching service area.</li>
            <li>Provider acceptance, county availability, and a specific plan network are checked separately.</li>
            <li>Every time-sensitive page includes a review date and direct primary-source links.</li>
          </ul>
          <p>
            Before making a change, use Medicare Plan Compare and confirm the full plan name with
            your providers. Our{" "}
            <Link href="/medicare-plan-review-bend" className="font-semibold text-blue-700 underline">
              annual Medicare plan review guide
            </Link>{" "}
            can help you organize the comparison.
          </p>
          <p className="text-sm text-gray-500">Tracker published and last reviewed September 27, 2026.</p>
          <Disclaimer className="mt-8" />
        </div>
      </section>
    </>
  );
}
