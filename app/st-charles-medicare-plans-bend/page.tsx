import type { Metadata } from "next";
import Link from "next/link";
import GuideArticle from "@/components/GuideArticle";
import {
  CMS_PLAN_LANDSCAPE,
  MEDICARE_PLAN_COMPARE,
  ST_CHARLES_HISTORICAL_MA,
  ST_CHARLES_INSURANCE,
  ST_CHARLES_PACIFICSOURCE_2026,
} from "@/lib/guideSources";
import { siteConfig } from "@/lib/site";

const path = "/st-charles-medicare-plans-bend";
const title = "St. Charles and Medicare Plans in Bend";
const description =
  "What St. Charles says about Medicare, confirmed 2026 Medicare Advantage context, the 2027 watch list, and how to verify your exact plan.";
const sources = [
  ST_CHARLES_INSURANCE,
  ST_CHARLES_PACIFICSOURCE_2026,
  ST_CHARLES_HISTORICAL_MA,
  CMS_PLAN_LANDSCAPE,
  MEDICARE_PLAN_COMPARE,
];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}${path}` },
  openGraph: { images: ["/opengraph-image"], title, description, url: `${siteConfig.url}${path}` },
};

export default function StCharlesPage() {
  return (
    <GuideArticle
      path={path}
      title={title}
      description={description}
      crumb="St. Charles Plans"
      published="2026-08-27"
      modified="2026-09-27"
      sources={sources}
      ctaHeading="Review a Plan Around Your St. Charles Care"
      ctaSubheading="Scott can help compare provider and prescription details across the Medicare plans the agency represents."
    >
      <p>
        If you use St. Charles hospitals, clinics, or specialists, verify network participation before
        choosing a Medicare Advantage plan. St. Charles&apos; current insurance page says its list covers
        commonly billed plans, can change, and does not guarantee payment.
      </p>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">Confirmed for 2026</h2>
      <ul className="list-disc space-y-3 pl-7">
        <li><strong>Original Medicare:</strong> St. Charles lists Medicare on its current insurance page.</li>
        <li><strong>PacificSource Medicare Advantage:</strong> St. Charles announced an agreement keeping these members in network for 2026. Its announcement describes the Medicare Advantage contract as a one-year agreement.</li>
        <li><strong>UnitedHealthcare:</strong> UnitedHealthcare appears on the current St. Charles list, but the page does not establish that every product or clinician participates. Verify the exact Medicare Advantage plan.</li>
      </ul>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">“Not offered” is not the same as “out of network”</h2>
      <p>
        St. Charles notes that Regence, Moda, and Providence no longer offer Medicare Advantage plans
        in Central Oregon beginning in 2026. That is a local plan-availability statement—not a reason
        to assume those companies&apos; other products, such as Medicare Supplement coverage, are rejected.
      </p>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">What to watch for 2027</h2>
      <p>
        St. Charles has not published a blanket 2027 Medicare Advantage participation guarantee.
        The PacificSource announcement cited on this page described a one-year 2026 agreement, and
        UnitedHealthcare&apos;s appearance on the current insurance list does not establish every
        2027 product. Confirm both the full plan and the specific St. Charles facility or clinician.
      </p>
      <p>
        See our{" "}
        <Link href="/2027-medicare-advantage-plans-deschutes-county" className="font-medium text-blue-700 underline">
          2027 Deschutes County Medicare Advantage status page
        </Link>{" "}
        for the official-landscape status and local verification checklist.
      </p>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">Historical network notices</h2>
      <p>
        A St. Charles notice published for 2024 said it would no longer be in network for Humana,
        Health Net, and Wellcare Medicare Advantage plans. Because that notice is historical, verify
        the current plan year rather than relying on it alone.
      </p>

      <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-gray-900">Before you enroll</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-7 text-base">
          <li>Search your exact plan in Medicare Plan Compare.</li>
          <li>Check the plan&apos;s provider directory for the facility and each clinician.</li>
          <li>Call the provider&apos;s billing office with the full plan name.</li>
          <li>Ask whether a referral or prior authorization is required.</li>
          <li>Repeat the check for prescriptions and preferred pharmacies.</li>
        </ol>
      </section>

      <p>
        See the broader{" "}
        <Link href="/central-oregon-medicare-provider-networks" className="font-medium text-blue-700 underline">
          Central Oregon provider-network guide
        </Link>{" "}
        for the verification checklist and Summit Health information.
      </p>
    </GuideArticle>
  );
}
