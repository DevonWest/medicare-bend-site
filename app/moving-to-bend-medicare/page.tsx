import type { Metadata } from "next";
import Link from "next/link";
import GuideArticle from "@/components/GuideArticle";
import { MEDICARE_MOVING, MEDICARE_PLAN_COMPARE, OREGON_SHIBA } from "@/lib/guideSources";
import { siteConfig } from "@/lib/site";

const path = "/moving-to-bend-medicare";
const title = "Moving to Bend? Your Medicare Checklist";
const description =
  "A practical Medicare checklist for changing your address, reviewing local plans, providers, prescriptions, and enrollment deadlines.";
const sources = [MEDICARE_MOVING, MEDICARE_PLAN_COMPARE, OREGON_SHIBA];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}${path}` },
  openGraph: { images: ["/opengraph-image"], title, description, url: `${siteConfig.url}${path}` },
};

export default function MovingToBendPage() {
  return (
    <GuideArticle
      path={path}
      title={title}
      description={description}
      crumb="Moving to Bend"
      published="2026-08-27"
      modified="2026-08-27"
      sources={sources}
      ctaHeading="Moving Your Medicare Coverage to Central Oregon?"
      ctaSubheading="Scott can help you review local plan availability, providers, and prescriptions before your move."
    >
      <p>
        Original Medicare generally travels with you inside the United States, but a move can affect
        Medicare Advantage and Part D availability because those plans have service areas. Notify
        Social Security of your address change and contact your plan before the move.
      </p>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">Before you move</h2>
      <ol className="list-decimal space-y-4 pl-7">
        <li><strong>Tell your current plan.</strong> Ask how the new address affects the service area and what Special Enrollment Period dates apply.</li>
        <li><strong>Update Social Security.</strong> Medicare uses the address Social Security has on file.</li>
        <li><strong>Compare plans at the exact new address.</strong> Bend and Redmond are in Deschutes County; Prineville is in Crook County; Madras is in Jefferson County. Options can differ by county.</li>
        <li><strong>Check St. Charles, Summit Health, and every clinician.</strong> Confirm the exact plan, facility, and individual provider.</li>
        <li><strong>Recheck every prescription.</strong> Formularies, tiers, prior authorization, and preferred pharmacies can change.</li>
      </ol>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">Questions for seasonal residents</h2>
      <p>
        If Bend or Sunriver is one of two homes, ask how routine care works outside the plan&apos;s local
        area, how long you live at each address, and which address Medicare and the plan treat as your
        permanent residence. Do not select an address only to gain plan access.
      </p>

      <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-gray-900">Your move folder</h2>
        <ul className="mt-4 grid gap-3 text-base md:grid-cols-2">
          <li>✓ Medicare card</li>
          <li>✓ Current plan card</li>
          <li>✓ New Central Oregon address</li>
          <li>✓ Moving date</li>
          <li>✓ Providers and clinics</li>
          <li>✓ Prescriptions and pharmacies</li>
          <li>✓ Current coverage notices</li>
          <li>✓ Plan call confirmation numbers</li>
        </ul>
      </section>

      <p>
        After you have the new address, use the{" "}
        <Link href="/central-oregon-medicare-provider-networks" className="font-medium text-blue-700 underline">
          local provider-network guide
        </Link>{" "}
        and Medicare Plan Compare. Oregon SHIBA also provides free, unbiased Medicare counseling at
        800-722-4134.
      </p>
    </GuideArticle>
  );
}
