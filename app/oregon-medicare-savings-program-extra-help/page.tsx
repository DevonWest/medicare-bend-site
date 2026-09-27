import type { Metadata } from "next";
import Link from "next/link";
import GuideArticle from "@/components/GuideArticle";
import {
  OREGON_MEDICARE_SAVINGS_PROGRAMS,
  OREGON_MSP_LIMITS_2026,
  OREGON_SHIBA,
  SOCIAL_SECURITY_EXTRA_HELP,
} from "@/lib/guideSources";
import { siteConfig } from "@/lib/site";

const path = "/oregon-medicare-savings-program-extra-help";
const title = "Oregon Medicare Savings Programs & Extra Help: 2026 Limits";
const description =
  "See Oregon's 2026 Medicare Savings Program and Extra Help screening limits, benefits, no-asset-test MSP rules, and official application contacts.";
const sources = [
  OREGON_MSP_LIMITS_2026,
  OREGON_MEDICARE_SAVINGS_PROGRAMS,
  OREGON_SHIBA,
  SOCIAL_SECURITY_EXTRA_HELP,
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

const programRows = [
  ["QMB", "$1,350", "$1,824", "Part A and Part B premiums, Medicare cost sharing, and Extra Help benefits"],
  ["SLMB", "$1,616", "$2,184", "Part B premium and Extra Help benefits"],
  ["QI / SMF", "$1,816", "$2,455", "Part B premium and Extra Help benefits"],
  ["Extra Help only", "$2,015", "$2,725", "Help with qualifying Part D premiums, deductible, and drug costs"],
] as const;

export default function OregonMedicareSavingsProgramPage() {
  return (
    <GuideArticle
      path={path}
      title={title}
      description={description}
      crumb="Oregon MSP & Extra Help"
      published="2026-09-27"
      modified="2026-09-27"
      sources={sources}
      ctaHeading="Have Questions About Medicare Costs?"
      ctaSubheading="We can explain the programs generally and point you to the government agency that makes eligibility decisions."
    >
      <p>
        Oregon Medicare Savings Programs may help eligible Medicare beneficiaries pay the Part B
        premium and, for some people, Medicare deductibles, coinsurance, and copayments. Extra Help,
        also called the Low-Income Subsidy or LIS, may reduce qualifying Part D prescription costs.
      </p>

      <aside className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-base text-amber-950">
        <strong>These are screening figures, not an eligibility decision.</strong> Oregon and federal
        agencies apply program rules to your full situation. Income limits, deductions, household
        treatment, and effective dates can change.
      </aside>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">2026 monthly income screening figures</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-base">
          <thead>
            <tr className="border-b-2 border-slate-300">
              <th className="p-3">Program</th>
              <th className="p-3">Single</th>
              <th className="p-3">Couple</th>
              <th className="p-3">Potential help</th>
            </tr>
          </thead>
          <tbody>
            {programRows.map(([program, single, couple, help]) => (
              <tr key={program} className="border-b border-slate-200 align-top">
                <th className="p-3 font-semibold text-gray-900">{program}</th>
                <td className="p-3">{single}</td>
                <td className="p-3">{couple}</td>
                <td className="p-3">{help}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-base text-gray-600">
        Oregon SHIBA&apos;s MSP screening figures include the standard $20 general income disregard.
        QMB, SLMB, and QI/SMF figures shown here are effective March 1, 2026, through February 28,
        2027. The Extra Help-only figures shown are for calendar year 2026.
      </p>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">Oregon&apos;s MSP asset rule</h2>
      <p>
        Oregon&apos;s QMB, SLMB, and QI/SMF Medicare Savings Programs do not use an asset test. Extra
        Help-only eligibility does have a federal resource limit: Oregon SHIBA lists $18,090 for
        one person and $36,100 for a couple for 2026. Certain items, including a primary home and
        one vehicle, may be treated differently under program rules.
      </p>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">What each abbreviation means</h2>
      <div className="grid gap-5 md:grid-cols-2">
        {[
          ["QMB", "Qualified Medicare Beneficiary. This can pay Part A and Part B premiums plus Medicare-covered deductibles, coinsurance, and copayments. Providers generally may not bill a QMB member for covered Medicare cost sharing."],
          ["SLMB", "Specified Low-Income Medicare Beneficiary. This generally pays the Medicare Part B premium."],
          ["QI / SMF", "Qualifying Individual, called the State Medicaid-Funded program in Oregon materials. This generally pays the Part B premium, subject to program rules and funding."],
          ["Extra Help / LIS", "Federal help with Medicare Part D costs. Some people qualify automatically through Medicaid or an MSP; others apply through Social Security."],
        ].map(([name, body]) => (
          <section key={name} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-bold text-gray-900">{name}</h3>
            <p className="mt-3 text-base">{body}</p>
          </section>
        ))}
      </div>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">Where Oregon residents can apply</h2>
      <ul className="list-disc space-y-3 pl-7">
        <li>
          Apply for an Oregon Medicare Savings Program through the Oregon Department of Human
          Services, a local ODHS office, or the ONE online benefits system.
        </li>
        <li>
          Call Oregon&apos;s Aging and Disability Resource Connection at{" "}
          <a href="tel:8556732372" className="font-semibold text-blue-700 underline">855-673-2372</a>{" "}
          for local aging and disability-services help.
        </li>
        <li>
          Apply for Extra Help through the Social Security Administration when you are not already
          deemed eligible through Medicaid or a Medicare Savings Program.
        </li>
        <li>Contact Oregon SHIBA for free, unbiased Medicare counseling.</li>
      </ul>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">Why it is worth checking</h2>
      <p>
        Even if your income appears close to a published figure, deductions and program-specific
        rules can affect the outcome. Do not assume you are ineligible from a quick comparison.
        Apply through the official agency or ask SHIBA to help you understand the process.
      </p>
      <p>
        If you qualify for Extra Help, compare the prescription coverage that works with your
        medications and pharmacies. Start with our{" "}
        <Link href="/medicare-part-d" className="font-semibold text-blue-700 underline">
          Medicare Part D guide
        </Link>{" "}
        and{" "}
        <Link href="/2027-medicare-part-d-changes" className="font-semibold text-blue-700 underline">
          confirmed 2027 Part D changes
        </Link>.
      </p>
    </GuideArticle>
  );
}
