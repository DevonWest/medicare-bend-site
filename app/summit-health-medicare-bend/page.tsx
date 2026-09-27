import type { Metadata } from "next";
import Link from "next/link";
import GuideArticle from "@/components/GuideArticle";
import { MEDICARE_PLAN_COMPARE, SUMMIT_MEDICARE, SUMMIT_PRIMARY_CARE } from "@/lib/guideSources";
import { siteConfig } from "@/lib/site";

const path = "/summit-health-medicare-bend";
const title = "Summit Health and Medicare in Bend";
const description =
  "How to verify Original Medicare, Medicare Advantage, and Supplement access at Summit Health Oregon clinics and individual providers.";
const sources = [SUMMIT_MEDICARE, SUMMIT_PRIMARY_CARE, MEDICARE_PLAN_COMPARE];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}${path}` },
  openGraph: { images: ["/opengraph-image"], title, description, url: `${siteConfig.url}${path}` },
};

export default function SummitHealthPage() {
  return (
    <GuideArticle
      path={path}
      title={title}
      description={description}
      crumb="Summit Health"
      published="2026-08-27"
      modified="2026-09-27"
      sources={sources}
      ctaHeading="Compare Coverage Around Your Summit Providers"
      ctaSubheading="Bring your clinic, clinician, medication, and pharmacy list for a no-cost review."
    >
      <p>
        Summit Health Oregon states that it accepts Medicare, Medicare Advantage, and all Medicare
        Supplement plans. That is helpful, but Medicare Advantage participation should still be
        checked at the exact plan and clinician level before you enroll.
      </p>

      <div className="grid gap-5 md:grid-cols-3">
        {[
          ["Original Medicare", "Confirm the clinic and clinician accept Medicare and whether they accept assignment."],
          ["Medicare Advantage", "Confirm the exact plan product, clinic, individual clinician, referral rules, and prior authorization requirements."],
          ["Medicare Supplement", "The supplement generally follows Original Medicare acceptance rather than creating a separate provider network."],
        ].map(([heading, body]) => (
          <section key={heading} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-bold text-gray-900">{heading}</h2>
            <p className="mt-3 text-base">{body}</p>
          </section>
        ))}
      </div>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">Questions to ask</h2>
      <ul className="list-disc space-y-3 pl-7">
        <li>Is this exact Summit clinic in network for the full plan name?</li>
        <li>Is my named primary-care clinician accepting new patients under this plan?</li>
        <li>Are the specialists I use also participating?</li>
        <li>Will I need a referral, and which services need prior authorization?</li>
        <li>Which laboratory, imaging, and hospital facilities are in network?</li>
      </ul>

      <aside className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-base text-amber-950">
        A medical group&apos;s general insurance page is not a coverage guarantee. Call Summit Health
        and the plan using the phone numbers on their official sites or your member card, then save
        the confirmation details.
      </aside>

      <p>
        Use the complete{" "}
        <Link href="/central-oregon-medicare-provider-networks" className="font-medium text-blue-700 underline">
          Central Oregon Medicare provider-network checklist
        </Link>{" "}
        before comparing plans.
      </p>

      <p>
        If you are looking for a new clinician, start with our{" "}
        <Link href="/doctors-accepting-medicare-bend" className="font-medium text-blue-700 underline">
          Bend Medicare doctor-search guide
        </Link>
        . Summit&apos;s primary-care directory is a useful starting point, but new-patient and exact
        plan participation still require direct confirmation.
      </p>
    </GuideArticle>
  );
}
