import type { Metadata } from "next";
import Link from "next/link";
import GuideArticle from "@/components/GuideArticle";
import {
  MEDICARE_MEDIGAP,
  OREGON_MEDIGAP_BIRTHDAY_RULE,
  OREGON_SHIBA,
} from "@/lib/guideSources";
import { siteConfig } from "@/lib/site";

const path = "/oregon-medigap-birthday-rule";
const title = "Oregon Medigap Birthday Rule: How the Window Works";
const description =
  "Oregon's Medigap birthday rule lets eligible policyholders apply from 30 days before through 30 days after their birthday for equal or lesser benefits.";
const sources = [OREGON_MEDIGAP_BIRTHDAY_RULE, OREGON_SHIBA, MEDICARE_MEDIGAP];

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

const steps = [
  ["Review early", "Start comparing premiums, household discounts, rate history, and company service before the 30-day pre-birthday period begins."],
  ["Choose equal or lesser benefits", "The replacement Medigap policy must have the same benefits as your current policy or fewer benefits under Oregon's rule."],
  ["Apply during the window", "Submit the application no earlier than 30 days before and no later than 30 days after your birthday."],
  ["Wait for issuance", "Keep your current policy active until the new carrier confirms approval, issue date, premium, and effective date in writing."],
] as const;

export default function OregonMedigapBirthdayRulePage() {
  return (
    <GuideArticle
      path={path}
      title={title}
      description={description}
      crumb="Oregon Medigap Birthday Rule"
      published="2026-09-27"
      modified="2026-09-27"
      sources={sources}
      ctaHeading="Compare Medigap Options Before Your Birthday"
      ctaSubheading="A licensed agent can help compare equal-or-lesser-benefit options and coordinate effective dates."
    >
      <p>
        Oregon&apos;s Medicare Supplement birthday rule gives eligible Medigap policyholders an
        annual opportunity to move to another Medicare Supplement policy without being declined
        because of health. The application window opens 30 days before your birthday and closes 30
        days after it.
      </p>

      <aside className="rounded-2xl border border-blue-200 bg-blue-50 p-6 text-base text-blue-950">
        <strong>What the rule does:</strong> if you meet the requirements and choose a policy with
        the same or fewer benefits, the new Medigap company must accept the application regardless
        of your health. Premiums and available discounts can still differ by company.
      </aside>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">The Oregon birthday-rule timeline</h2>
      <div className="grid gap-5 md:grid-cols-2">
        {steps.map(([heading, body], index) => (
          <section key={heading} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-bold uppercase tracking-wide text-blue-700">Step {index + 1}</p>
            <h3 className="mt-2 text-xl font-bold text-gray-900">{heading}</h3>
            <p className="mt-2 text-base">{body}</p>
          </section>
        ))}
      </div>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">What “same or lesser benefits” means</h2>
      <p>
        The birthday rule is not an unrestricted move to any richer Medigap policy. Your new plan
        must provide benefits equal to or less than the policy you already have. Because standardized
        plan letters and older policy types can create specific comparison questions, verify the
        permitted replacement with the carrier or Oregon SHIBA before applying.
      </p>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">What the birthday rule does not do</h2>
      <ul className="list-disc space-y-3 pl-7">
        <li>It does not automatically lower your premium.</li>
        <li>It does not create a right to move into a policy with greater benefits.</li>
        <li>It does not replace Medicare&apos;s enrollment rules for Medicare Advantage or Part D.</li>
        <li>It does not mean you should cancel your existing Medigap policy before the replacement is issued.</li>
        <li>Oregon SHIBA says self-funded employer-sponsored group Medigap plans are not eligible for this birthday rule.</li>
      </ul>

      <aside className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-6 text-base text-amber-950">
        <strong>Avoid a coverage gap or duplicate premium.</strong> Do not cancel your current
        policy based only on a quote or application. Confirm that the replacement policy has been
        issued and coordinate the start and termination dates.
      </aside>

      <h2 className="pt-4 text-3xl font-bold text-gray-900">What to compare besides premium</h2>
      <ul className="list-disc space-y-3 pl-7">
        <li>The exact standardized plan letter and benefit level.</li>
        <li>Current premium, household discounts, payment discounts, and rate-change history.</li>
        <li>How the company calculates rates and whether the quote reflects all information.</li>
        <li>Customer service, application timing, and the confirmed effective date.</li>
        <li>Your separate Part D coverage, which is not included in modern Medigap policies.</li>
      </ul>

      <p>
        For a broader comparison, read{" "}
        <Link href="/medicare-advantage-vs-supplement-bend" className="font-semibold text-blue-700 underline">
          Medicare Advantage vs. Medicare Supplement in Bend
        </Link>{" "}
        and our main{" "}
        <Link href="/medicare-supplements" className="font-semibold text-blue-700 underline">
          Medicare Supplement guide
        </Link>.
      </p>
    </GuideArticle>
  );
}
