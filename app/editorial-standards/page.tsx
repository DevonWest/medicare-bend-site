import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { siteConfig } from "@/lib/site";

const path = "/editorial-standards";
const title = "Editorial Standards";
const description =
  "How Medicare in Bend researches, reviews, dates, corrects, and discloses the insurance information published on this site.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}${path}` },
  openGraph: { images: ["/opengraph-image"], title, description, url: `${siteConfig.url}${path}` },
};

const standards = [
  {
    title: "Primary sources first",
    body: "Time-sensitive claims should link to the government agency, provider, carrier, or plan document responsible for the information. Secondary sources can add context but do not replace the controlling source.",
  },
  {
    title: "Dates and plan years are explicit",
    body: "Medicare plans, provider contracts, formularies, and individual health markets change. We identify the relevant plan year, show a last-reviewed date on time-sensitive guides, and avoid presenting an old announcement as current status.",
  },
  {
    title: "Local claims require local evidence",
    body: "We distinguish Original Medicare acceptance, Medicare Advantage network participation, carrier availability, and an individual clinician's status. We do not treat those as interchangeable.",
  },
  {
    title: "Licensed review",
    body: "Insurance guidance published as a reviewed guide identifies the reviewer. Scott Lewis, a licensed insurance agent local to Bend, reviews the site's current market and coverage guidance.",
  },
  {
    title: "No invented experience",
    body: "Team biographies, testimonials, office locations, ratings, carrier relationships, and product counts must be verified before publication. We do not reuse reviews from another market or imply a physical office that is not publicly verified.",
  },
  {
    title: "Corrections are direct",
    body: "If a factual error is found, we correct the public page and update its review date when the change is material. Readers can report a concern through the contact page.",
  },
] as const;

export default function EditorialStandardsPage() {
  return (
    <>
      <PageHero
        title={title}
        subtitle={description}
        crumbs={[{ href: "/", label: "Home" }, { label: "Editorial Standards" }]}
      />
      <main className="bg-white px-4 py-14">
        <div className="mx-auto max-w-4xl space-y-10 text-lg leading-relaxed text-gray-700">
          <p className="text-sm font-medium text-slate-600">Effective August 27, 2026</p>
          <p>
            Medicare in Bend is published by {siteConfig.legalName}. Our goal is to make local
            insurance decisions easier to verify without overstating what an educational page or
            directory can prove.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {standards.map((standard) => (
              <section key={standard.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-xl font-bold text-gray-900">{standard.title}</h2>
                <p className="mt-3 text-base">{standard.body}</p>
              </section>
            ))}
          </div>

          <section>
            <h2 className="text-3xl font-bold text-gray-900">Commercial and Medicare disclosures</h2>
            <p className="mt-4">
              {siteConfig.legalName} is paid by insurance carriers when an eligible enrollment is
              completed. Consultations are offered at no cost to the consumer. The agency does not
              represent every plan available in every service area, and this site is not affiliated
              with or endorsed by Medicare or another government agency.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900">Automation and AI-assisted work</h2>
            <p className="mt-4">
              Software may assist with research organization, drafting, testing, and quality checks.
              It does not replace source verification or licensed review. Public insurance claims
              remain subject to the same sourcing, date, and correction standards regardless of the
              tools used during production.
            </p>
          </section>

          <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <h2 className="text-2xl font-bold text-gray-900">Report an error</h2>
            <p className="mt-3 text-base">
              Send the page URL and the detail you believe needs correction through our{" "}
              <Link href="/contact" className="font-medium text-blue-700 underline">
                contact page
              </Link>{" "}
              or email{" "}
              <a href={`mailto:${siteConfig.email}`} className="font-medium text-blue-700 underline">
                {siteConfig.email}
              </a>.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
