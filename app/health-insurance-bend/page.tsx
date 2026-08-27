import type { Metadata } from "next";
import Link from "next/link";
import GuideArticle from "@/components/GuideArticle";
import LeadForm from "@/components/LeadForm";
import {
  OREGON_2027_COUNTY_MAP,
  OREGON_2027_FINAL_RATES,
  OREGON_MARKETPLACE_TRANSITION,
} from "@/lib/guideSources";
import { siteConfig } from "@/lib/site";

const path = "/health-insurance-bend";
const title = "Individual Health Insurance in Bend, Oregon";
const description =
  "Understand 2027 individual health coverage in Bend, including county choices, Marketplace changes, subsidies, networks, and enrollment timing.";
const sources = [OREGON_2027_FINAL_RATES, OREGON_2027_COUNTY_MAP, OREGON_MARKETPLACE_TRANSITION];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}${path}` },
  openGraph: { images: ["/opengraph-image"], title, description, url: `${siteConfig.url}${path}` },
};

export default function HealthInsuranceBendPage() {
  return (
    <GuideArticle
      path={path}
      title={title}
      description={description}
      crumb="Health Insurance"
      published="2026-08-27"
      modified="2026-08-27"
      sources={sources}
      medicareDisclaimer={false}
      ctaHeading="Need Help Reviewing Bend Health Coverage?"
      ctaSubheading="Contact Health Insurance Options for no-pressure guidance on your next coverage step."
    >
      <p>
        Individual and family health insurance is coverage you buy for yourself rather than through
        an employer or Medicare. In Central Oregon, your county, household income, provider needs,
        prescriptions, and enrollment eligibility all affect the comparison.
      </p>

      <aside className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-base text-amber-950">
        <strong>Important for 2027:</strong> Oregon&apos;s final county table shows BridgeSpan and Regence
        offering individual plans in Deschutes County. Providence and PacificSource individual and
        family plans end after 2026. This does not mean their Medicare, Medicare Supplement, or
        employer products are ending.
      </aside>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">What to compare beyond the premium</h2>
      <div className="grid gap-5 md:grid-cols-2">
        {[
          ["Provider network", "Confirm your Bend-area hospital, clinic, primary care clinician, specialists, laboratory, and imaging facilities."],
          ["Prescription coverage", "Review the formulary, tier, deductible, prior authorization rules, and preferred pharmacies."],
          ["Total annual exposure", "Compare the deductible, copays, coinsurance, and out-of-pocket maximum for both routine and higher-use years."],
          ["Marketplace savings", "Premium tax credits and cost-sharing reductions depend on eligibility and are available only through the official Marketplace."],
        ].map(([heading, body]) => (
          <section key={heading} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-bold text-gray-900">{heading}</h3>
            <p className="mt-2 text-base">{body}</p>
          </section>
        ))}
      </div>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">When you can enroll</h2>
      <p>
        Most people enroll during annual Open Enrollment. Outside that window, a Special Enrollment
        Period generally requires a qualifying life event, such as losing eligible coverage, moving,
        marriage, or certain household changes. Keep proof of the event and apply within the allowed
        window.
      </p>

      <p>
        Oregon is moving to its own state-based Marketplace for coverage beginning in 2027. Use the
        official Oregon Marketplace transition guidance rather than assuming the 2026 application
        process will remain unchanged.
      </p>

      <p>
        If you are approaching 65, coordinate individual coverage with Medicare timing. See the{" "}
        <Link href="/turning-65-medicare-bend" className="font-medium text-blue-700 underline">
          Turning 65 in Bend guide
        </Link>{" "}
        before canceling coverage.
      </p>

      <section className="mt-10 rounded-2xl border border-blue-200 bg-blue-50 p-6">
        <LeadForm
          source="health-insurance-bend"
          heading="Request Health Insurance Help"
          subheading="Share your county, timing, and coverage question. A licensed insurance agent will follow up."
          showMessage
        />
      </section>
    </GuideArticle>
  );
}
