import type { Metadata } from "next";
import Link from "next/link";
import GuideArticle from "@/components/GuideArticle";
import {
  HIGH_LAKES_NEW_PATIENTS,
  MEDICARE_PLAN_COMPARE,
  PRAXIS_CLINIC_LOCATIONS,
  ST_CHARLES_PROVIDER_DIRECTORY,
  SUMMIT_MEDICARE,
  SUMMIT_PRIMARY_CARE,
} from "@/lib/guideSources";
import { siteConfig } from "@/lib/site";

const path = "/doctors-accepting-medicare-bend";
const title = "Doctors Accepting Medicare in Bend, Oregon";
const description =
  "Find Bend-area Medicare doctors using High Lakes, Summit Health, St. Charles, and Medicare directories, then verify new-patient and exact-plan status.";
const sources = [
  HIGH_LAKES_NEW_PATIENTS,
  PRAXIS_CLINIC_LOCATIONS,
  SUMMIT_PRIMARY_CARE,
  SUMMIT_MEDICARE,
  ST_CHARLES_PROVIDER_DIRECTORY,
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

const directoryRows = [
  [
    "High Lakes Health Care",
    "Publishes a current page for providers accepting patients and Praxis clinic locations in Bend, Redmond, and Sisters.",
    "The exact clinician, new-patient availability, Original Medicare status, and full Medicare Advantage plan name.",
  ],
  [
    "Summit Health Oregon",
    "Publishes a primary-care directory and says it accepts Medicare, Medicare Advantage, and all Medicare Supplement plans.",
    "The exact clinic and clinician, whether the practice is accepting patients, and the precise Medicare Advantage product.",
  ],
  [
    "St. Charles Health System",
    "Offers a Find a Doctor directory covering local physicians and specialties.",
    "Whether the clinician is accepting new patients and participates in your exact plan, facility, and referral arrangement.",
  ],
] as const;

export default function DoctorsAcceptingMedicareBendPage() {
  return (
    <GuideArticle
      path={path}
      title={title}
      description={description}
      crumb="Doctors Accepting Medicare"
      published="2026-09-27"
      modified="2026-09-27"
      sources={sources}
      ctaHeading="Compare Coverage Around Your Bend Doctors"
      ctaSubheading="Bring your provider list and exact plan details for a no-cost Medicare review."
    >
      <p>
        Finding a doctor who “takes Medicare” in Bend requires more than one directory search. You
        need to know whether the practice accepts Original Medicare, whether it participates in your
        exact Medicare Advantage plan, and whether the individual clinician is accepting new
        patients.
      </p>

      <aside className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-base text-amber-950">
        <strong>No static list stays accurate for long.</strong> Staffing, panels, locations, and
        insurance contracts change. Use the official directories below as starting points, then
        call both the office and the plan before scheduling non-emergency care or enrolling.
      </aside>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">Bend-area places to start</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-base">
          <thead>
            <tr className="border-b-2 border-slate-300">
              <th className="p-3">Provider group</th>
              <th className="p-3">Useful official resource</th>
              <th className="p-3">What to verify next</th>
            </tr>
          </thead>
          <tbody>
            {directoryRows.map(([provider, resource, verify]) => (
              <tr key={provider} className="border-b border-slate-200 align-top">
                <th className="p-3 font-semibold text-gray-900">{provider}</th>
                <td className="p-3">{resource}</td>
                <td className="p-3">{verify}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">Original Medicare, Advantage, and Medigap are different</h2>
      <div className="grid gap-5 md:grid-cols-3">
        {[
          ["Original Medicare", "Ask whether the clinician accepts Medicare and whether the office accepts assignment. A provider can limit new patients even when it accepts Medicare."],
          ["Medicare Advantage", "The exact plan network matters. A carrier name or medical group's general statement is not enough to establish participation in every HMO or PPO product."],
          ["Medicare Supplement", "Medigap generally follows Original Medicare provider acceptance and does not create a separate provider network. It does not replace the need to confirm Medicare acceptance."],
        ].map(([heading, body]) => (
          <section key={heading} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-bold text-gray-900">{heading}</h3>
            <p className="mt-3 text-base">{body}</p>
          </section>
        ))}
      </div>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">A five-step doctor search</h2>
      <ol className="list-decimal space-y-4 pl-7">
        <li>Search the provider group&apos;s current directory for the specialty and location you need.</li>
        <li>If you use Medicare Advantage, search the plan directory using the clinician&apos;s full name and location.</li>
        <li>Call the clinic and ask about new-patient status and the complete plan name.</li>
        <li>Call the plan using its official number and verify the clinician, clinic, and associated facility.</li>
        <li>Record the date, representative, confirmation number, and any referral or prior-authorization rules.</li>
      </ol>

      <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-gray-900">Phone script</h2>
        <p className="mt-3 text-base">
          “I am checking care for 2027. Is Dr. [name] at [location] accepting new patients with my
          exact plan, [full plan name and plan ID]? Is the clinic and any hospital or laboratory I
          will use also in network? Are referrals or prior authorizations required?”
        </p>
      </section>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">If you cannot find a primary-care doctor</h2>
      <ul className="list-disc space-y-3 pl-7">
        <li>Ask the plan for several in-network options rather than one name.</li>
        <li>Ask clinics about cancellation lists, nearby locations, and clinicians with future openings.</li>
        <li>Check Redmond, Sisters, and other practical Central Oregon locations if travel is possible.</li>
        <li>Confirm how urgent care, telehealth, prescriptions, and specialist referrals work while you search.</li>
        <li>For an urgent medical need, contact your plan or care team for timely-access assistance.</li>
      </ul>

      <p>
        For plan-year network warnings and St. Charles details, use our{" "}
        <Link href="/central-oregon-medicare-provider-networks" className="font-semibold text-blue-700 underline">
          Central Oregon Medicare provider-network guide
        </Link>{" "}
        and{" "}
        <Link href="/high-lakes-health-care-medicare-advantage-bend" className="font-semibold text-blue-700 underline">
          High Lakes 2027 update
        </Link>.
      </p>
    </GuideArticle>
  );
}
