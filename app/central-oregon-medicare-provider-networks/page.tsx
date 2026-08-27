import type { Metadata } from "next";
import Link from "next/link";
import GuideArticle from "@/components/GuideArticle";
import {
  MEDICARE_PLAN_COMPARE,
  ST_CHARLES_HISTORICAL_MA,
  ST_CHARLES_INSURANCE,
  ST_CHARLES_PACIFICSOURCE_2026,
  SUMMIT_MEDICARE,
} from "@/lib/guideSources";
import { siteConfig } from "@/lib/site";

const path = "/central-oregon-medicare-provider-networks";
const title = "Central Oregon Medicare Provider Networks";
const description =
  "Verify St. Charles, Summit Health, and Medicare plan networks in Bend using current provider and plan sources.";
const sources = [
  ST_CHARLES_INSURANCE,
  ST_CHARLES_PACIFICSOURCE_2026,
  ST_CHARLES_HISTORICAL_MA,
  SUMMIT_MEDICARE,
  MEDICARE_PLAN_COMPARE,
];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}${path}` },
  openGraph: { images: ["/opengraph-image"], title, description, url: `${siteConfig.url}${path}` },
};

const checks = [
  ["Your exact plan", "Carrier names are not enough. Confirm the full plan name and contract/product shown on your member card or enrollment materials."],
  ["Each clinician", "A hospital system, medical group, facility, and individual specialist can have different contracting status."],
  ["Your county and year", "Medicare Advantage availability is county-specific, and contracts can change for January 1."],
  ["Both directories", "Check the plan's directory and the provider's billing office. Save the date, representative name, and confirmation number."],
] as const;

export default function ProviderNetworksPage() {
  return (
    <GuideArticle
      path={path}
      title={title}
      description={description}
      crumb="Provider Networks"
      published="2026-08-27"
      modified="2026-08-27"
      sources={sources}
      ctaHeading="Want Help Checking Your Providers?"
      ctaSubheading="Bring your provider list and plan details. Scott can help you compare the plans the agency represents."
    >
      <p>
        A provider saying it “accepts Medicare” does not automatically mean it participates in every
        Medicare Advantage network. Original Medicare acceptance, a Medicare Advantage contract, and
        a specific doctor&apos;s participation are three different questions.
      </p>

      <aside className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-base text-amber-950">
        <strong>Use this guide as a verification starting point, not a coverage guarantee.</strong>{" "}
        Provider contracts and directories can change. Confirm your exact plan directly with both the
        plan and the provider before enrolling or scheduling non-emergency care.
      </aside>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">What current local sources say</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-base">
          <thead>
            <tr className="border-b-2 border-slate-300">
              <th className="p-3">Provider</th>
              <th className="p-3">What is confirmed</th>
              <th className="p-3">What you still need to verify</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-200 align-top">
              <th className="p-3 font-semibold">St. Charles Health System</th>
              <td className="p-3">Its current insurance page lists Medicare and warns that contracts can change. A separate agreement confirms PacificSource Medicare Advantage participation for 2026.</td>
              <td className="p-3">Your exact plan, facility, and individual clinician. The PacificSource Medicare Advantage agreement described by St. Charles was for one year.</td>
            </tr>
            <tr className="border-b border-slate-200 align-top">
              <th className="p-3 font-semibold">Summit Health Oregon</th>
              <td className="p-3">Summit states that it accepts Medicare, Medicare Advantage, and all Medicare Supplement plans.</td>
              <td className="p-3">Your exact Medicare Advantage product and the individual clinic or clinician you intend to use.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        For a closer look, use our dedicated guides for{" "}
        <Link href="/st-charles-medicare-plans-bend" className="font-medium text-blue-700 underline">
          St. Charles Medicare plan verification
        </Link>{" "}
        and{" "}
        <Link href="/summit-health-medicare-bend" className="font-medium text-blue-700 underline">
          Summit Health Medicare verification
        </Link>.
      </p>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">A four-part network check</h2>
      <div className="grid gap-5 md:grid-cols-2">
        {checks.map(([heading, body], index) => (
          <section key={heading} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-bold uppercase tracking-wide text-blue-700">Check {index + 1}</p>
            <h3 className="mt-2 text-xl font-bold text-gray-900">{heading}</h3>
            <p className="mt-2 text-base">{body}</p>
          </section>
        ))}
      </div>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">Why older announcements need context</h2>
      <p>
        St. Charles announced network changes involving Humana, Health Net, and Wellcare beginning in
        2024. That announcement is useful history, but it is not enough by itself to establish a
        provider&apos;s status for a later plan year. Treat dated announcements as a prompt to recheck the
        current directory.
      </p>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">Original Medicare and Medigap</h2>
      <p>
        With Original Medicare, the key question is whether the provider accepts Medicare. A Medicare
        Supplement policy generally does not create its own provider network; it helps pay eligible
        costs after Original Medicare. That is different from Medicare Advantage, where the plan&apos;s
        network rules matter. See our{" "}
        <Link href="/medicare-advantage-vs-supplement-bend" className="font-medium text-blue-700 underline">
          Bend comparison of Medicare Advantage and Medicare Supplement
        </Link>.
      </p>
    </GuideArticle>
  );
}
