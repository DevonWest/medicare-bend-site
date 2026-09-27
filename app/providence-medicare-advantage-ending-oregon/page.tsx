import type { Metadata } from "next";
import Link from "next/link";
import GuideArticle from "@/components/GuideArticle";
import {
  MEDICARE_OPEN_ENROLLMENT,
  PROVIDENCE_COVERAGE_TRANSITION,
  ST_CHARLES_INSURANCE,
} from "@/lib/guideSources";
import { siteConfig } from "@/lib/site";

const path = "/providence-medicare-advantage-ending-oregon";
const title = "Providence Medicare Advantage Ending in Oregon for 2027";
const description =
  "Providence Medicare Advantage ends after December 31, 2026. Learn the Central Oregon context, what continues, and what members should verify for 2027.";
const sources = [PROVIDENCE_COVERAGE_TRANSITION, ST_CHARLES_INSURANCE, MEDICARE_OPEN_ENROLLMENT];

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

const faqItems = [
  {
    question: "When does current Providence Medicare Advantage coverage end?",
    answer:
      "Providence says current Medicare Advantage coverage continues through December 31, 2026, and its Medicare Advantage plans will not be offered for 2027. Members should follow their official notice and keep paying required premiums through the coverage end date.",
  },
  {
    question: "Are Providence Medicare Supplement policies also ending?",
    answer:
      "No. The reviewed transition information says existing Providence Medicare Supplement policies remain active for members in good standing, although new sales closed July 1, 2026.",
  },
  {
    question: "Does the insurance exit mean Providence hospitals or clinics are closing?",
    answer:
      "No. A health-plan product ending is different from a medical facility or practice closing. Provider access under replacement coverage still needs to be checked separately.",
  },
  {
    question: "What should an affected member compare for 2027?",
    answer:
      "Compare the official choices at the permanent address using every doctor, facility, prescription, pharmacy, planned procedure, travel need, premium, medical cost, and annual financial limit.",
  },
  {
    question: "Do Central Oregon residents face the same situation as the rest of Oregon?",
    answer:
      "Not necessarily. St. Charles already reported that Providence Medicare Advantage was no longer offered in Central Oregon beginning in 2026, so the 2027 statewide withdrawal can affect residents differently by location and prior coverage.",
  },
] as const;

export default function ProvidenceMedicareAdvantageOregonPage() {
  return (
    <GuideArticle
      path={path}
      title={title}
      description={description}
      crumb="Providence 2027 Exit"
      published="2026-09-27"
      modified="2026-09-27"
      sources={sources}
      articleType="NewsArticle"
      articleSection="Oregon Medicare Advantage market changes"
      keywords={[
        "Providence Medicare Advantage ending Oregon",
        "Providence Medicare Advantage 2027",
        "Oregon Medicare plan nonrenewal",
        "Central Oregon Medicare Advantage",
      ]}
      faqItems={faqItems}
      ctaHeading="Prepare for Your 2027 Medicare Review"
      ctaSubheading="Bring your coverage notice, doctors, prescriptions, and pharmacies before choosing replacement coverage."
    >
      <p>
        Providence Health Plan has confirmed through a September 9, 2026 producer communication reviewed by our
        agency that CMS approved withdrawal of its 2027 Medicare Advantage bid. Current Providence
        Medicare Advantage coverage continues through December 31, 2026, and those plans will not
        be offered in 2027.
      </p>

      <aside className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-6 text-base text-amber-950">
        <strong>Central Oregon context:</strong> St. Charles already says Providence Medicare
        Advantage is no longer offered in Central Oregon beginning in 2026. The broader 2027 exit
        may therefore affect Oregon residents differently depending on where they live or whether
        they recently moved.
      </aside>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">What is confirmed</h2>
      <ul className="list-disc space-y-3 pl-7">
        <li>Current Providence Medicare Advantage member coverage continues through December 31, 2026.</li>
        <li>Providence Medicare Advantage operations end after 2026 and the plans will not be offered for 2027.</li>
        <li>Existing Providence Medicare Supplement policies remain active for members in good standing.</li>
        <li>New Providence Medicare Supplement sales closed July 1, 2026.</li>
        <li>The insurance change does not mean Providence hospitals, clinics, or medical practices are closing.</li>
      </ul>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">What Bend residents should not assume</h2>
      <p>
        Do not assume that a Providence notice applies to every type of coverage, that a Providence
        Medicare Supplement policy is ending, or that any replacement plan automatically includes
        your providers. Providence Health Plan, Providence medical facilities, Medicare Advantage,
        Medigap, employer coverage, and individual health insurance are distinct subjects.
      </p>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">If you receive a non-renewal notice</h2>
      <ol className="list-decimal space-y-4 pl-7">
        <li><strong>Keep the notice.</strong> It documents the coverage type, end date, and instructions that apply to you.</li>
        <li><strong>Do not cancel early.</strong> Current coverage remains in place through the stated end date if premiums and eligibility requirements are met.</li>
        <li><strong>List your care.</strong> Include every doctor, clinic, hospital, prescription, pharmacy, and planned procedure.</li>
        <li><strong>Compare official 2027 options.</strong> Review the full plan, not just the carrier or monthly premium.</li>
        <li><strong>Confirm the effective date.</strong> Medicare Open Enrollment runs October 15 through December 7 for January 1 coverage, but follow your official notice for any additional rights.</li>
      </ol>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">Build a replacement review around continuity of care</h2>
      <p>
        Start with the care you cannot easily replace. Write down the full names of your primary-care
        clinician, specialists, hospital, laboratory, imaging center, infusion or therapy location,
        durable-medical-equipment supplier, and any procedure already scheduled for 2027. Then check
        each item under the exact replacement plan—not only the carrier name.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-base">
          <thead>
            <tr className="border-b-2 border-slate-300">
              <th className="p-3">Review area</th>
              <th className="p-3">What to confirm for 2027</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-200 align-top">
              <th className="p-3 font-semibold text-gray-900">Medical providers</th>
              <td className="p-3">Every clinician, facility, referral rule, and prior authorization—not just a health-system name.</td>
            </tr>
            <tr className="border-b border-slate-200 align-top">
              <th className="p-3 font-semibold text-gray-900">Prescriptions</th>
              <td className="p-3">Formulary status, tier, restrictions, preferred pharmacies, and estimated annual cost.</td>
            </tr>
            <tr className="border-b border-slate-200 align-top">
              <th className="p-3 font-semibold text-gray-900">Total cost</th>
              <td className="p-3">Premium plus likely copays, coinsurance, deductibles, drug costs, and maximum out-of-pocket exposure.</td>
            </tr>
            <tr className="border-b border-slate-200 align-top">
              <th className="p-3 font-semibold text-gray-900">Travel and residence</th>
              <td className="p-3">Routine out-of-area access, emergency rules, seasonal residence, and the correct county service area.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">Avoid a January disruption</h2>
      <ul className="list-disc space-y-3 pl-7">
        <li>Refill important prescriptions with enough time to resolve formulary or pharmacy questions.</li>
        <li>Ask providers which full 2027 plan names they expect to participate in, then verify with the plan.</li>
        <li>Check scheduled procedures and any authorization that may need to be submitted under new coverage.</li>
        <li>Keep the non-renewal notice, enrollment confirmation, and notes from provider and plan calls.</li>
        <li>Confirm the new effective date before presenting the new member card in January.</li>
      </ul>

      <p>
        Use our{" "}
        <Link href="/medicare-plan-review-bend" className="font-semibold text-blue-700 underline">
          annual Medicare plan review checklist
        </Link>{" "}
        and{" "}
        <Link href="/central-oregon-medicare-provider-networks" className="font-semibold text-blue-700 underline">
          Central Oregon provider-network guide
        </Link>{" "}
        to organize those checks.
      </p>

      <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-gray-900">Moved to Bend with Providence coverage?</h2>
        <p className="mt-3 text-base">
          Medicare Advantage availability is county-specific. A move can create a Special
          Enrollment Period and can change the plans and networks available to you. See our{" "}
          <Link href="/moving-to-bend-medicare" className="font-semibold text-blue-700 underline">
            moving to Bend with Medicare guide
          </Link>.
        </p>
      </section>

      <p>
        We will add new confirmed plan information to the{" "}
        <Link href="/2027-medicare-changes-bend" className="font-semibold text-blue-700 underline">
          2027 Bend Medicare changes tracker
        </Link>{" "}
        when they are confirmed in official sources.
      </p>
    </GuideArticle>
  );
}
