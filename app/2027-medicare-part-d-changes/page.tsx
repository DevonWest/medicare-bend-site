import type { Metadata } from "next";
import Link from "next/link";
import GuideArticle from "@/components/GuideArticle";
import {
  CMS_2027_PART_D_ANNOUNCEMENT,
  CMS_2027_PART_D_BID_FACT_SHEET,
  CMS_NEGOTIATED_DRUG_PRICES_2027,
  CMS_PLAN_LANDSCAPE,
  MEDICARE_PLAN_COMPARE,
} from "@/lib/guideSources";
import { siteConfig } from "@/lib/site";

const path = "/2027-medicare-part-d-changes";
const title = "2027 Medicare Part D Changes: Deductible, Cap & Drug Prices";
const description =
  "Understand the confirmed 2027 Part D $700 standard deductible, $2,400 out-of-pocket threshold, negotiated prices for 15 drugs, and plan details still pending.";
const sources = [
  CMS_2027_PART_D_ANNOUNCEMENT,
  CMS_2027_PART_D_BID_FACT_SHEET,
  CMS_NEGOTIATED_DRUG_PRICES_2027,
  CMS_PLAN_LANDSCAPE,
  MEDICARE_PLAN_COMPARE,
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

const selectedDrugs = [
  "Ozempic, Rybelsus, and Wegovy",
  "Trelegy Ellipta",
  "Xtandi",
  "Pomalyst",
  "Ofev",
  "Ibrance",
  "Linzess",
  "Calquence",
  "Austedo and Austedo XR",
  "Breo Ellipta",
  "Xifaxan",
  "Vraylar",
  "Tradjenta",
  "Janumet and Janumet XR",
  "Otezla and Otezla XR",
] as const;

export default function MedicarePartDChanges2027Page() {
  return (
    <GuideArticle
      path={path}
      title={title}
      description={description}
      crumb="2027 Part D Changes"
      published="2026-09-27"
      modified="2026-09-27"
      sources={sources}
      ctaHeading="Review Your Prescriptions for 2027"
      ctaSubheading="Bring every medication, dose, and preferred pharmacy for a plan-specific Part D comparison."
    >
      <p>
        CMS has confirmed the national Part D benefit parameters for 2027. Those numbers are
        important, but they do not tell you which Bend-area plan will cover your prescriptions at
        the lowest total cost. Formularies, tiers, pharmacy pricing, premiums, and utilization
        rules remain plan-specific.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-700">Standard deductible</p>
          <p className="mt-2 text-4xl font-extrabold text-blue-900">$700</p>
          <p className="mt-3 text-base">
            Up from $615 in 2026. A plan may charge less or apply the deductible differently by drug tier.
          </p>
        </section>
        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
            Annual out-of-pocket threshold
          </p>
          <p className="mt-2 text-4xl font-extrabold text-emerald-900">$2,400</p>
          <p className="mt-3 text-base">
            Up from $2,100 in 2026. This is the 2027 threshold for covered Part D drug costs counted under Medicare rules.
          </p>
        </section>
      </div>

      <aside className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-base text-amber-950">
        <strong>The $41.33 figure is not a quoted consumer premium.</strong> CMS published it as the
        2027 Part D national average monthly bid amount. Your actual premium depends on the plan,
        location, coverage, subsidy eligibility, and any income-related adjustment.
      </aside>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">Fifteen negotiated drugs take effect in 2027</h2>
      <p>
        The negotiated prices under the second cycle of Medicare&apos;s Drug Price Negotiation
        Program take effect January 1, 2027. CMS reports discounts ranging from 38% to 85% compared
        with the selected drugs&apos; 2024 list prices and estimates about $685 million in beneficiary
        out-of-pocket savings during 2027.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {selectedDrugs.map((drug) => (
          <div
            key={drug}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-base font-semibold text-gray-900"
          >
            {drug}
          </div>
        ))}
      </div>
      <p className="text-base text-gray-600">
        The published negotiated amount is not automatically your pharmacy copay. Your cost still
        depends on whether the drug is covered, the plan&apos;s benefit design, the fill, and where you
        are in the Part D benefit.
      </p>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">What is still pending for Bend and Oregon</h2>
      <ul className="list-disc space-y-3 pl-7">
        <li>Which standalone Part D and Medicare Advantage drug plans are offered at your ZIP code.</li>
        <li>Each plan&apos;s final premium, formulary, tiers, deductible design, and pharmacy network.</li>
        <li>Prior authorization, step therapy, and quantity limits for your prescriptions.</li>
        <li>Your own estimated annual cost and whether you qualify for Extra Help.</li>
      </ul>
      <p>
        As of September 27, 2026, CMS&apos; public landscape page still identifies the 2026 landscape
        file. We will update our{" "}
        <Link href="/2027-medicare-changes-bend" className="font-semibold text-blue-700 underline">
          Bend 2027 Medicare tracker
        </Link>{" "}
        when official 2027 county files are posted.
      </p>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">A better way to compare Part D plans</h2>
      <ol className="list-decimal space-y-3 pl-7">
        <li>List every prescription, strength, quantity, and refill frequency.</li>
        <li>Add your preferred Bend-area pharmacy and one practical alternative.</li>
        <li>Compare estimated annual cost, not premium alone.</li>
        <li>Check whether each drug is covered and which restrictions apply.</li>
        <li>Review again before enrolling because plan data can be corrected.</li>
      </ol>
      <p>
        See our main{" "}
        <Link href="/medicare-part-d" className="font-semibold text-blue-700 underline">
          Medicare Part D guide for Bend
        </Link>{" "}
        and{" "}
        <Link href="/oregon-medicare-savings-program-extra-help" className="font-semibold text-blue-700 underline">
          Oregon Extra Help and Medicare Savings Program guide
        </Link>.
      </p>
    </GuideArticle>
  );
}
