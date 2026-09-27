import type { Metadata } from "next";
import Link from "next/link";
import GuideArticle from "@/components/GuideArticle";
import {
  CMS_PLAN_LANDSCAPE,
  MEDICARE_PLAN_COMPARE,
  PRAXIS_2027_INSURANCE_UPDATE,
  ST_CHARLES_INSURANCE,
  SUMMIT_MEDICARE,
} from "@/lib/guideSources";
import { siteConfig } from "@/lib/site";

const path = "/2027-medicare-advantage-plans-deschutes-county";
const title = "2027 Medicare Advantage Plans in Deschutes County";
const description =
  "Track official 2027 Medicare Advantage plan availability for Deschutes County and separate confirmed provider updates from plan counts and benefits still pending.";
const sources = [
  CMS_PLAN_LANDSCAPE,
  MEDICARE_PLAN_COMPARE,
  PRAXIS_2027_INSURANCE_UPDATE,
  ST_CHARLES_INSURANCE,
  SUMMIT_MEDICARE,
];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: siteConfig.url + path },
  openGraph: {
    images: ["/opengraph-image"],
    title,
    description,
    url: siteConfig.url + path,
    type: "article",
  },
};

const statusRows = [
  [
    "Official 2027 Deschutes County plan count",
    "Pending",
    "CMS' public landscape page still points to its 2026 landscape file as of September 27, 2026.",
  ],
  [
    "2027 premiums and benefits",
    "Pending",
    "Do not reuse 2026 premiums, dental allowances, copays, or out-of-pocket limits as if they were 2027 values.",
  ],
  [
    "Praxis / High Lakes participation",
    "Partly confirmed",
    "Praxis has published an Oregon 2027 participation list; exact county plans, locations, and clinicians still require verification.",
  ],
  [
    "St. Charles participation",
    "Plan-specific",
    "The current page identifies commonly billed insurers and important 2026 context, but it is not a blanket 2027 guarantee.",
  ],
  [
    "Summit Health participation",
    "General statement",
    "Summit says it accepts Medicare, Medicare Advantage, and all Medicare Supplement plans; confirm the exact 2027 product and clinician.",
  ],
] as const;

const faqItems = [
  {
    question: "How many Medicare Advantage plans will Deschutes County have in 2027?",
    answer:
      "The official 2027 county count was still pending at this page’s September 27, 2026 review. Use the CMS landscape file and Medicare Plan Compare when 2027 data is posted rather than carrying forward a 2026 count.",
  },
  {
    question: "Will every Deschutes County provider accept the same 2027 plans?",
    answer:
      "No. Hospitals, clinics, individual clinicians, laboratories, imaging centers, and other suppliers can have different contracts. Confirm each one under the full plan name and ID.",
  },
  {
    question: "Can I use a carrier’s statewide provider announcement as proof of local coverage?",
    answer:
      "No. A statewide provider statement does not establish that a matching plan is sold at your ZIP code or that every location and clinician participates.",
  },
  {
    question: "What should I compare when final 2027 plans appear?",
    answer:
      "Compare covered prescriptions, pharmacy pricing, local providers, referrals and authorizations, premium, likely medical cost sharing, annual maximum out-of-pocket exposure, and travel access.",
  },
] as const;

export default function DeschutesCountyMedicareAdvantage2027Page() {
  return (
    <GuideArticle
      path={path}
      title={title}
      description={description}
      crumb="Deschutes County 2027 Plans"
      published="2026-09-27"
      modified="2026-09-27"
      sources={sources}
      articleType="NewsArticle"
      articleSection="Deschutes County Medicare Advantage"
      keywords={[
        "2027 Medicare Advantage Deschutes County",
        "Bend Medicare Advantage plans 2027",
        "Deschutes County Medicare plans",
        "Central Oregon Medicare provider networks",
      ]}
      faqItems={faqItems}
      ctaHeading="Compare Deschutes County Plans When 2027 Data Is Final"
      ctaSubheading="A local licensed agent can help verify availability, doctors, prescriptions, and total expected cost."
    >
      <p>
        Official 2027 Medicare Advantage plan counts, premiums, star ratings, and benefit details
        for Deschutes County should not be guessed from early announcements. This page records what
        is confirmed and what still requires the official CMS county landscape or Medicare Plan
        Compare data.
      </p>

      <aside className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-6 text-base text-amber-950">
        <strong>Status as of September 27, 2026:</strong> CMS&apos; public Medicare Advantage and Part D
        landscape page still lists the 2026 landscape. We are not publishing a 2027 plan count,
        “lowest premium,” or carrier list until official Deschutes County data is available.
      </aside>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">Deschutes County 2027 status board</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-base">
          <thead>
            <tr className="border-b-2 border-slate-300">
              <th className="p-3">Item</th>
              <th className="p-3">Status</th>
              <th className="p-3">What that means</th>
            </tr>
          </thead>
          <tbody>
            {statusRows.map(([item, status, meaning]) => (
              <tr key={item} className="border-b border-slate-200 align-top">
                <th className="p-3 font-semibold text-gray-900">{item}</th>
                <td className="p-3 font-semibold text-blue-800">{status}</td>
                <td className="p-3">{meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">Why a carrier name is not enough</h2>
      <p>
        A carrier can offer multiple HMO, PPO, D-SNP, employer, or retiree products with different
        service areas and networks. A provider&apos;s statewide participation list also does not prove
        that a matching individual plan is sold in Bend. Verify the full plan name, contract and
        plan ID, your ZIP code, and the individual providers you use.
      </p>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">Confirmed local signals worth watching</h2>
      <ul className="list-disc space-y-3 pl-7">
        <li>
          <strong>High Lakes / Praxis:</strong> Praxis lists Aetna, HealthSpring, PacificSource, and
          Regence Medicare Advantage participation for Oregon in 2027. It says UnitedHealthcare
          negotiations are ongoing and a termination could occur.
        </li>
        <li>
          <strong>St. Charles:</strong> its current insurance information says Regence, Moda, and
          Providence no longer offer Medicare Advantage in Central Oregon beginning in 2026. The
          page lists PacificSource and UnitedHealthcare among commonly billed insurers, but warns
          that acceptance is not a payment guarantee.
        </li>
        <li>
          <strong>Summit Health:</strong> its public statement says it accepts Medicare, Medicare
          Advantage, and all Medicare Supplement plans, but does not provide a plan-by-plan 2027
          Deschutes County list.
        </li>
      </ul>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">Use this checklist when plan data appears</h2>
      <ol className="list-decimal space-y-3 pl-7">
        <li>Enter your actual ZIP code in Medicare Plan Compare.</li>
        <li>Compare covered prescriptions and pharmacy pricing before extra benefits.</li>
        <li>Check St. Charles, High Lakes, Summit, specialists, labs, and imaging separately.</li>
        <li>Compare premium plus likely copays, coinsurance, and maximum out-of-pocket exposure.</li>
        <li>Read the Evidence of Coverage and provider-directory disclaimer before enrolling.</li>
      </ol>

      <p>
        Follow the{" "}
        <Link href="/2027-medicare-changes-bend" className="font-semibold text-blue-700 underline">
          2027 Bend and Oregon Medicare tracker
        </Link>{" "}
        for dated updates, or start with our{" "}
        <Link href="/medicare-deschutes-county" className="font-semibold text-blue-700 underline">
          complete Deschutes County Medicare guide
        </Link>{" "}
        and{" "}
        <Link href="/central-oregon-medicare-provider-networks" className="font-semibold text-blue-700 underline">
          Central Oregon provider-network guide
        </Link>.
      </p>
    </GuideArticle>
  );
}
