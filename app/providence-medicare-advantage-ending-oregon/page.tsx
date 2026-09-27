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
