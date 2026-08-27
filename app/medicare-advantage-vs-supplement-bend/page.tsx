import type { Metadata } from "next";
import Link from "next/link";
import GuideArticle from "@/components/GuideArticle";
import {
  MEDICARE_COVERAGE_OPTIONS,
  MEDICARE_MEDIGAP,
  MEDICARE_PLAN_COMPARE,
  ST_CHARLES_INSURANCE,
  SUMMIT_MEDICARE,
} from "@/lib/guideSources";
import { siteConfig } from "@/lib/site";

const path = "/medicare-advantage-vs-supplement-bend";
const title = "Medicare Advantage vs. Supplement in Bend";
const description =
  "Compare provider access, drug coverage, costs, and travel considerations for two common Medicare paths in Central Oregon.";
const sources = [MEDICARE_COVERAGE_OPTIONS, MEDICARE_MEDIGAP, MEDICARE_PLAN_COMPARE, ST_CHARLES_INSURANCE, SUMMIT_MEDICARE];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}${path}` },
  openGraph: { images: ["/opengraph-image"], title, description, url: `${siteConfig.url}${path}` },
};

const rows = [
  ["How you receive benefits", "A private plan provides your Medicare-covered Part A and Part B services.", "You keep Original Medicare; the supplement helps with eligible cost-sharing."],
  ["Provider access", "Usually depends on the plan's network and service area.", "Generally any U.S. provider who accepts Medicare, subject to Medicare rules."],
  ["Prescription drugs", "Often included; check the plan formulary and pharmacy network.", "Not included in modern Medigap policies; a separate Part D plan is usually needed."],
  ["Monthly premiums", "You keep paying Part B and may have an additional plan premium.", "You pay Part B, the Medigap premium, and usually a separate Part D premium."],
  ["Out-of-pocket pattern", "Copays and coinsurance as care is used, up to the plan's annual medical maximum.", "More predictable medical cost-sharing depending on the standardized letter plan."],
  ["Travel", "Emergency and urgent care are covered as required, but routine out-of-area care depends on plan rules.", "Broad nationwide access to providers who accept Medicare."],
] as const;

export default function AdvantageVsSupplementPage() {
  return (
    <GuideArticle
      path={path}
      title={title}
      description={description}
      crumb="Advantage vs. Supplement"
      published="2026-08-27"
      modified="2026-08-27"
      sources={sources}
      ctaHeading="Compare Both Paths Side by Side"
      ctaSubheading="Scott can help review costs, providers, prescriptions, and the plans the agency represents."
    >
      <p>
        Medicare Advantage and Original Medicare with a Medicare Supplement are different ways to
        organize your coverage. The right comparison starts with your providers, prescriptions,
        expected costs, travel, and eligibility—not a premium alone.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-base">
          <thead>
            <tr className="border-b-2 border-slate-300">
              <th className="p-3">Question</th>
              <th className="p-3">Medicare Advantage</th>
              <th className="p-3">Original Medicare + Supplement</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([question, advantage, supplement]) => (
              <tr key={question} className="border-b border-slate-200 align-top">
                <th className="p-3 font-semibold">{question}</th>
                <td className="p-3">{advantage}</td>
                <td className="p-3">{supplement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">Central Oregon provider access matters</h2>
      <p>
        If you rely on St. Charles or Summit Health, check your exact Medicare Advantage product and
        each clinician. A carrier relationship at the system level does not prove that every product
        and provider participates. Start with our{" "}
        <Link href="/central-oregon-medicare-provider-networks" className="font-medium text-blue-700 underline">
          Central Oregon network guide
        </Link>.
      </p>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">Enrollment timing can limit a later switch</h2>
      <p>
        Medicare Supplement enrollment rights and underwriting rules are not the same as Medicare
        Advantage election periods. Do not assume you can move from Medicare Advantage to any
        supplement at any time. Review Oregon-specific eligibility and timing before dropping
        existing coverage.
      </p>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">Build a real annual-cost comparison</h2>
      <ul className="list-disc space-y-3 pl-7">
        <li>All monthly premiums, including Part B and any plan premiums.</li>
        <li>Your normal office, specialist, hospital, imaging, and therapy use.</li>
        <li>Prescription premiums, deductibles, tiers, and preferred pharmacies.</li>
        <li>The financial effect of a higher-use year, not only a healthy year.</li>
        <li>Dental, vision, hearing, and other extras only after medical and drug coverage fit.</li>
      </ul>
    </GuideArticle>
  );
}
