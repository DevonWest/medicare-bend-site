import type { Metadata } from "next";
import Link from "next/link";
import GuideArticle from "@/components/GuideArticle";
import LeadForm from "@/components/LeadForm";
import {
  OREGON_2027_COUNTY_MAP,
  OREGON_2027_FINAL_RATES,
  OREGON_MARKETPLACE_TRANSITION,
  PACIFICSOURCE_INDIVIDUAL_EXIT,
  PROVIDENCE_INDIVIDUAL_EXIT,
} from "@/lib/guideSources";
import { siteConfig } from "@/lib/site";

const path = "/oregon-health-insurance-changes-2027";
const title = "2027 Oregon Health Insurance Changes";
const description =
  "Final 2027 individual-market rates, Central Oregon carrier choices, Providence and PacificSource exits, and Oregon Marketplace changes.";
const sources = [
  OREGON_2027_FINAL_RATES,
  OREGON_2027_COUNTY_MAP,
  OREGON_MARKETPLACE_TRANSITION,
  PACIFICSOURCE_INDIVIDUAL_EXIT,
  PROVIDENCE_INDIVIDUAL_EXIT,
];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}${path}` },
  openGraph: { images: ["/opengraph-image"], title, description, url: `${siteConfig.url}${path}` },
};

const finalRates = [
  ["BridgeSpan", "19.3%"],
  ["Kaiser", "15.8%"],
  ["Moda", "27.0%"],
  ["Regence", "20.3%"],
] as const;

export default function OregonHealthChangesPage() {
  return (
    <GuideArticle
      path={path}
      title={title}
      description={description}
      crumb="2027 Oregon Changes"
      published="2026-08-27"
      modified="2026-08-27"
      sources={sources}
      medicareDisclaimer={false}
      ctaHeading="Prepare for 2027 Coverage Changes"
      ctaSubheading="Review your renewal, provider network, prescriptions, and Marketplace eligibility before choosing 2027 coverage."
    >
      <p>
        Oregon finalized substantial 2027 individual-market changes on August 18, 2026. The statewide
        average approved rate increase is 21.6%, but that is not the increase every household will
        pay. Your actual premium depends on age, location, plan, household, and any Marketplace
        financial help.
      </p>

      <aside className="rounded-2xl border border-red-200 bg-red-50 p-6 text-base text-red-950">
        <strong>Do not auto-renew without checking.</strong> Providence and PacificSource are leaving
        Oregon&apos;s individual and family market after 2026. Their announcements do not say that
        Medicare Advantage, Medicare Supplement, employer-group, or every other product is ending.
      </aside>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">Final average individual rate increases</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {finalRates.map(([carrier, rate]) => (
          <div key={carrier} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-base font-semibold text-gray-700">{carrier}</p>
            <p className="mt-2 text-3xl font-extrabold text-blue-800">{rate}</p>
          </div>
        ))}
      </div>
      <p className="text-base text-gray-600">
        These are Oregon Division of Financial Regulation averages, not a quote for a specific person or plan.
      </p>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">Final 2027 Central Oregon carrier map</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-base">
          <thead>
            <tr className="border-b-2 border-slate-300"><th className="p-3">County</th><th className="p-3">Individual carriers</th><th className="p-3">Total</th></tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-200"><th className="p-3">Deschutes</th><td className="p-3">BridgeSpan, Regence</td><td className="p-3">2</td></tr>
            <tr className="border-b border-slate-200"><th className="p-3">Crook</th><td className="p-3">BridgeSpan, Regence</td><td className="p-3">2</td></tr>
            <tr className="border-b border-slate-200"><th className="p-3">Jefferson</th><td className="p-3">BridgeSpan, Moda, Regence</td><td className="p-3">3</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">Oregon&apos;s Marketplace is changing too</h2>
      <p>
        Oregon says it will operate a state-based Marketplace for the 2027 coverage year, with open
        enrollment beginning November 1, 2026. Watch official transition instructions for account,
        application, and renewal steps. Be cautious with unsolicited calls or sites asking for
        personal information.
      </p>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">Your 2027 review checklist</h2>
      <ul className="list-disc space-y-3 pl-7">
        <li>Read every discontinuation and renewal notice.</li>
        <li>Confirm that your doctors and facilities participate in the exact 2027 plan.</li>
        <li>Recheck prescriptions, pharmacy networks, and prior authorization.</li>
        <li>Update household and income information used for Marketplace savings.</li>
        <li>Compare total expected cost, not the premium alone.</li>
        <li>Keep proof of enrollment and the first premium payment.</li>
      </ul>

      <p>
        For a broader explanation, see{" "}
        <Link href="/health-insurance-bend" className="font-medium text-blue-700 underline">
          individual health insurance in Bend
        </Link>.
      </p>

      <section className="mt-10 rounded-2xl border border-blue-200 bg-blue-50 p-6">
        <LeadForm
          source="oregon-health-insurance-changes-2027"
          heading="Request a 2027 Coverage Review"
          subheading="Share your county and current coverage. A licensed insurance agent will follow up."
          showMessage
        />
      </section>
    </GuideArticle>
  );
}
