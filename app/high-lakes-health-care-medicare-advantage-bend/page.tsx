import type { Metadata } from "next";
import Link from "next/link";
import GuideArticle from "@/components/GuideArticle";
import {
  HEALTHSPRING_REBRAND,
  HIGH_LAKES_NEW_PATIENTS,
  MEDICARE_PLAN_COMPARE,
  PRAXIS_2027_INSURANCE_UPDATE,
  PRAXIS_CLINIC_LOCATIONS,
  ST_CHARLES_INSURANCE,
} from "@/lib/guideSources";
import { siteConfig } from "@/lib/site";

const path = "/high-lakes-health-care-medicare-advantage-bend";
const title = "High Lakes Health Care & Medicare Advantage in Bend: 2027 Update";
const description =
  "See the 2027 Medicare participation update for High Lakes and Praxis Health in Bend, including UnitedHealthcare negotiations and a three-step network check.";
const sources = [
  PRAXIS_2027_INSURANCE_UPDATE,
  PRAXIS_CLINIC_LOCATIONS,
  HIGH_LAKES_NEW_PATIENTS,
  ST_CHARLES_INSURANCE,
  HEALTHSPRING_REBRAND,
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

const participation = [
  ["Original Medicare", "Praxis lists Medicare Part B for 2027."],
  ["Aetna Medicare Advantage", "Listed by Praxis for Oregon in 2027."],
  ["HealthSpring Medicare Advantage", "Listed by Praxis. Cigna Medicare products now use the HealthSpring name."],
  ["PacificSource Medicare Advantage", "Listed by Praxis for Oregon in 2027."],
  ["Regence Medicare Advantage", "Listed by Praxis for Oregon in 2027."],
  ["UnitedHealthcare Medicare Advantage", "Praxis says negotiations are ongoing and a termination could occur. Do not treat this as either confirmed participation or a confirmed termination."],
] as const;

export default function HighLakesMedicareAdvantagePage() {
  return (
    <GuideArticle
      path={path}
      title={title}
      description={description}
      crumb="High Lakes 2027 Network"
      published="2026-09-27"
      modified="2026-09-27"
      sources={sources}
      ctaHeading="Check High Lakes Before You Choose a 2027 Plan"
      ctaSubheading="Bring the exact High Lakes clinic, clinician, prescriptions, and plan name for a no-cost coverage review."
    >
      <p>
        High Lakes Health Care is part of Praxis Health, so Praxis&apos; 2027 Oregon insurance update
        is the most useful starting point for people who want to keep a High Lakes doctor. It is
        not, by itself, proof that every listed Medicare Advantage product is offered in Deschutes
        County or accepted by every clinic and clinician.
      </p>

      <aside className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-6 text-base text-amber-950">
        <strong>UnitedHealthcare status:</strong> Praxis says negotiations are ongoing and that a
        termination could occur. As of this review, that is an unresolved negotiation—not a
        confirmed 2027 termination and not a guarantee of continued participation.
      </aside>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">What Praxis currently lists for 2027</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-base">
          <thead>
            <tr className="border-b-2 border-slate-300">
              <th className="p-3">Coverage</th>
              <th className="p-3">Published 2027 status</th>
            </tr>
          </thead>
          <tbody>
            {participation.map(([coverage, status]) => (
              <tr key={coverage} className="border-b border-slate-200 align-top">
                <th className="p-3 font-semibold text-gray-900">{coverage}</th>
                <td className="p-3">{status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        “Cigna Medicare” may still appear in older materials or conversations. Health Care Service
        Corporation says those Medicare products have transitioned to the <strong>HealthSpring</strong>{" "}
        name, with existing contracts carrying over. Always use the complete plan name and contract
        information shown for 2027.
      </p>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">The three checks Bend residents need</h2>
      <ol className="list-decimal space-y-4 pl-7">
        <li>
          <strong>County availability:</strong> confirm the exact 2027 plan is actually offered at
          your Deschutes County ZIP code in Medicare Plan Compare.
        </li>
        <li>
          <strong>High Lakes participation:</strong> confirm the specific clinic and clinician are
          in that exact plan&apos;s network and accepting patients under it.
        </li>
        <li>
          <strong>Hospital participation:</strong> if you rely on St. Charles, verify the hospital,
          facility, and specialists separately. A primary-care contract does not establish the
          hospital system&apos;s network status.
        </li>
      </ol>

      <p>
        Save screenshots or confirmation numbers and repeat the check if your Annual Notice of
        Change, provider directory, or clinic notice changes. Our{" "}
        <Link href="/central-oregon-medicare-provider-networks" className="font-semibold text-blue-700 underline">
          Central Oregon provider-network guide
        </Link>{" "}
        explains the full verification process.
      </p>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">Which Praxis locations are local?</h2>
      <p>
        Praxis lists High Lakes locations in Bend, Redmond, and Sisters, along with Bend specialty
        practices such as Aspen Mountain Dermatology and Endocrinology Services Northwest. Network
        status can differ across locations and clinicians, so ask about the exact place and person
        you intend to use.
      </p>
      <p>
        High Lakes also publishes a list of providers accepting new patients. That list can help
        with the first step of a search, but new-patient availability and insurance participation
        are separate questions and can change.
      </p>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">What to ask on the phone</h2>
      <ul className="list-disc space-y-3 pl-7">
        <li>Do you participate in this full 2027 plan name, not just the carrier?</li>
        <li>Is my named clinician in network and accepting new or continuing patients?</li>
        <li>Are laboratory, imaging, and referral partners in the same network?</li>
        <li>Which St. Charles facilities and specialists should I verify separately?</li>
        <li>Can you give me the date, representative name, and a confirmation number?</li>
      </ul>
    </GuideArticle>
  );
}
