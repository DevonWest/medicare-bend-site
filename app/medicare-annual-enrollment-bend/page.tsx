import type { Metadata } from "next";
import Link from "next/link";
import GuideArticle from "@/components/GuideArticle";
import {
  MEDICARE_OPEN_ENROLLMENT,
  MEDICARE_PLAN_COMPARE,
  PRAXIS_2027_INSURANCE_UPDATE,
  ST_CHARLES_INSURANCE,
} from "@/lib/guideSources";
import { siteConfig } from "@/lib/site";

const path = "/medicare-annual-enrollment-bend";
const title = "Medicare Annual Enrollment Help in Bend, Oregon";
const description =
  "Prepare for Medicare Annual Enrollment from October 15 through December 7 with a Bend checklist for doctors, prescriptions, pharmacies, costs, and 2027 changes.";
const sources = [
  MEDICARE_OPEN_ENROLLMENT,
  MEDICARE_PLAN_COMPARE,
  PRAXIS_2027_INSURANCE_UPDATE,
  ST_CHARLES_INSURANCE,
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

const reviewItems = [
  ["Annual Notice of Change", "Read changes to premium, copays, benefits, formulary, pharmacy network, and service area."],
  ["Prescriptions", "Check every drug, strength, quantity, tier, restriction, and estimated annual cost."],
  ["Doctors and hospitals", "Verify each clinician, clinic, St. Charles facility, laboratory, and imaging provider in the exact plan."],
  ["Pharmacies", "Compare preferred, standard, mail-order, and 90-day-fill pricing rather than assuming your usual pharmacy is lowest."],
  ["Total cost", "Compare premium with likely medical and prescription spending and the maximum out-of-pocket limit."],
  ["Extra benefits", "Review limits, frequency, vendors, and eligibility for dental, vision, hearing, OTC, transportation, and other benefits."],
] as const;

export default function MedicareAnnualEnrollmentBendPage() {
  return (
    <GuideArticle
      path={path}
      title={title}
      description={description}
      crumb="Annual Enrollment in Bend"
      published="2026-09-27"
      modified="2026-09-27"
      sources={sources}
      ctaHeading="Schedule a No-Cost Annual Medicare Review"
      ctaSubheading="Bring your Annual Notice of Change, doctors, prescriptions, pharmacies, and questions."
    >
      <p>
        Medicare&apos;s Annual Enrollment Period runs from October 15 through December 7 each year.
        Changes made during this period generally begin January 1. An annual review is worthwhile
        even when you are comfortable with your current coverage because plan costs, drug coverage,
        networks, and benefits can change.
      </p>

      <aside className="rounded-2xl border border-blue-200 bg-blue-50 p-6 text-base text-blue-950">
        <strong>You do not have to change plans.</strong> The purpose of a review is to understand
        next year&apos;s coverage and make an informed choice. Staying in your current plan may be
        appropriate after you verify the changes.
      </aside>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">What you can do during Annual Enrollment</h2>
      <ul className="list-disc space-y-3 pl-7">
        <li>Join, switch, or drop a Medicare Advantage plan.</li>
        <li>Join, switch, or drop a standalone Medicare Part D plan.</li>
        <li>Move from Original Medicare to Medicare Advantage.</li>
        <li>Leave Medicare Advantage and return to Original Medicare, with Part D decisions handled separately.</li>
      </ul>
      <p>
        Annual Enrollment does not create a blanket guaranteed right to buy any Medicare Supplement
        policy. Medigap enrollment and underwriting rules are separate. Oregon policyholders may
        also have rights under the{" "}
        <Link href="/oregon-medigap-birthday-rule" className="font-semibold text-blue-700 underline">
          Oregon Medigap birthday rule
        </Link>.
      </p>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">Your Bend AEP review checklist</h2>
      <div className="grid gap-5 md:grid-cols-2">
        {reviewItems.map(([heading, body]) => (
          <section key={heading} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-bold text-gray-900">{heading}</h3>
            <p className="mt-3 text-base">{body}</p>
          </section>
        ))}
      </div>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">Important 2027 Bend issues to review</h2>
      <ul className="list-disc space-y-3 pl-7">
        <li>
          High Lakes / Praxis published a 2027 Oregon Medicare participation update and says
          UnitedHealthcare negotiations are ongoing.
        </li>
        <li>
          The official 2027 Deschutes County plan landscape, premiums, and benefits must be checked
          when CMS makes the local data available.
        </li>
        <li>
          The standard Part D deductible rises to $700 and the annual out-of-pocket threshold rises
          to $2,400 in 2027.
        </li>
        <li>
          St. Charles, Summit, High Lakes, specialists, and facilities should be verified separately
          for a specific Medicare Advantage product.
        </li>
      </ul>
      <p>
        Follow our{" "}
        <Link href="/2027-medicare-changes-bend" className="font-semibold text-blue-700 underline">
          2027 Medicare changes tracker
        </Link>{" "}
        for dated local updates.
      </p>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">What to bring to an appointment</h2>
      <ul className="list-disc space-y-3 pl-7">
        <li>Your Medicare card and current plan card.</li>
        <li>Your Annual Notice of Change and other carrier notices.</li>
        <li>A complete prescription list with dosage, quantity, and refill frequency.</li>
        <li>Your preferred pharmacy and a practical backup pharmacy.</li>
        <li>Every doctor, clinic, hospital, and specialist you want to keep.</li>
        <li>Questions about travel, referrals, prior authorization, and expected procedures.</li>
      </ul>

      <aside className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-6 text-base text-amber-950">
        <strong>Do not rely on a premium alone.</strong> A plan with a low or $0 additional premium
        can still differ substantially in drug costs, provider access, copays, coinsurance, and
        maximum out-of-pocket exposure.
      </aside>

      <p>
        Use the detailed{" "}
        <Link href="/medicare-appointment-checklist" className="font-semibold text-blue-700 underline">
          Medicare appointment checklist
        </Link>{" "}
        or request a{" "}
        <Link href="/medicare-plan-review-bend" className="font-semibold text-blue-700 underline">
          Bend Medicare plan review
        </Link>.
      </p>
    </GuideArticle>
  );
}
