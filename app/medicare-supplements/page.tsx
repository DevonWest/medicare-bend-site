import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import Disclaimer from "@/components/Disclaimer";
import FAQ, { type FAQItem } from "@/components/FAQ";
import LeadForm from "@/components/LeadForm";
import PageHero from "@/components/PageHero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Medicare Supplement Plans in Bend, Oregon",
  description:
    "Compare standardized Medicare Supplement options in Bend, including benefits, premiums, enrollment timing, provider access, and Part D needs.",
  alternates: { canonical: `${siteConfig.url}/medicare-supplements` },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Medicare Supplement Plans in Bend, Oregon",
    description:
      "Compare Medicare Supplement options with a licensed independent insurance agency serving Bend and Central Oregon.",
    url: `${siteConfig.url}/medicare-supplements`,
  },
};

const faqs: FAQItem[] = [
  {
    question: "What is a Medicare Supplement (Medigap) plan?",
    answer:
      "A Medicare Supplement, also called Medigap, is a private insurance policy that works alongside Original Medicare (Parts A and B). It can help pay for some of the out-of-pocket costs Original Medicare leaves behind, such as deductibles and coinsurance, depending on the plan letter you choose.",
  },
  {
    question: "How is a Medigap plan different from a Medicare Advantage plan?",
    answer:
      "Medigap works with Original Medicare and you generally can see any provider in the U.S. who accepts Medicare. Medicare Advantage replaces the way you receive your benefits and typically uses a network of doctors and hospitals. Most Medigap plans do not include drug coverage, so you typically pair them with a standalone Medicare Part D plan.",
  },
  {
    question: "When is the best time to enroll in a Medigap plan?",
    answer:
      "Your Medigap Open Enrollment Period is a six-month window that begins when you are 65 or older and enrolled in Medicare Part B. During this window you generally have guaranteed-issue rights. Enrolling outside that window may require medical underwriting depending on your situation.",
  },
];

export default function MedicareSupplementsPage() {
  return (
    <>
      <PageHero
        title="Medicare Supplements (Medigap)"
        subtitle="Help comparing Medicare Supplement plans that work alongside Original Medicare and may help with some out-of-pocket costs."
        crumbs={[{ href: "/", label: "Home" }, { label: "Medicare Supplements" }]}
      />

      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-gray-800 space-y-5 text-lg leading-relaxed">
          <p>
            Medicare Supplement plans (Medigap) help cover some of the costs that Original Medicare
            does not — such as deductibles and coinsurance. Plans are standardized and identified by
            letter (for example Plan G, Plan N), so the benefits for a given letter are the same from
            one carrier to the next; premiums and underwriting rules, however, vary by carrier. Medigap
            policies are also guaranteed renewable, so coverage stays in place as long as premiums are paid.
          </p>
          <p>
            {siteConfig.legalName} can help you compare the Medicare Supplement plans we represent
            so you can find a plan that fits your needs and your budget. Most Medigap plans do not
            include prescription drug coverage, so we often pair them with a standalone{" "}
            <Link href="/medicare-part-d" className="text-blue-700 underline">
              Medicare Part D
            </Link>{" "}
            plan.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 pt-4">When Medigap can be a strong fit</h2>
          <ul className="list-disc list-outside pl-6 space-y-2">
            <li>You want predictable out-of-pocket costs.</li>
            <li>
              You want the freedom to see any doctor or hospital across Central Oregon — or anywhere
              in the U.S. — who accepts Medicare, since Medigap plans are not network-based.
            </li>
            <li>You travel frequently or split time between Central Oregon and another part of the country.</li>
            <li>You are within your six-month Medigap Open Enrollment Period.</li>
          </ul>

          <p>
            Not sure how Medigap and Medicare Advantage compare?{" "}
            <Link
              href="/compare-medicare-options"
              className="text-blue-700 underline"
            >
              Read our side-by-side comparison
            </Link>{" "}
            or schedule a no-cost consultation.
          </p>

          <div className="rounded-lg border border-blue-200 bg-blue-50 p-5 not-prose">
            <h2 className="text-xl font-bold text-gray-900">Already have Medigap in Oregon?</h2>
            <p className="mt-3 text-base leading-relaxed text-gray-800">
              Oregon&apos;s birthday rule may let an eligible policyholder apply for a Medigap
              policy with the same or fewer benefits from 30 days before through 30 days after
              their birthday, regardless of health.
            </p>
            <Link
              href="/oregon-medigap-birthday-rule"
              className="mt-4 inline-block font-semibold text-blue-700 underline"
            >
              See how Oregon&apos;s Medigap birthday rule works →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <Disclaimer />
        </div>
      </section>

      <FAQ items={faqs} heading="Medicare Supplement FAQ" />

      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <LeadForm
            source="medicare-supplements"
            heading="Compare Medicare Supplement Plans"
            subheading="A licensed insurance professional will help you compare the Medicare Supplement plans we represent."
            showMessage
          />
        </div>
      </section>

      <CTASection />
    </>
  );
}
