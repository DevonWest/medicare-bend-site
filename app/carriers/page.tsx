import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import Disclaimer from "@/components/Disclaimer";
import FriendlyIllustration from "@/components/FriendlyIllustration";
import PageHero from "@/components/PageHero";
import { siteConfig, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Medicare Carrier and Plan Availability in Bend",
  description:
    "Learn how Medicare carrier, plan, county, and provider availability are verified for Bend and Central Oregon before you compare coverage.",
  alternates: { canonical: `${siteConfig.url}/carriers` },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Medicare Carrier and Plan Availability in Bend",
    description:
      "How to verify current Medicare carrier, plan, county, and provider availability in Central Oregon.",
    url: `${siteConfig.url}/carriers`,
  },
};

export default function CarriersPage() {
  return (
    <>
      <PageHero
        title="Medicare Carrier & Plan Availability"
        subtitle="Carrier appointments, county availability, exact products, and provider networks are separate facts. We verify the current details before comparing coverage."
        crumbs={[{ href: "/", label: "Home" }, { label: "Carriers" }]}
        illustration={<FriendlyIllustration name="compareOptions" />}
      />

      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 text-base text-amber-900 leading-relaxed mb-8">
            <p className="font-semibold mb-1">Why there is no static carrier logo wall</p>
            <p>
              Carrier appointments and product availability can change by year, county, product,
              and enrollment period. A stale list can imply choices that are not available at your
              address, so this page does not publish a carrier as represented until its current
              Bend/Oregon details are verified for public display.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900">What we confirm for your comparison</h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              "The plans the agency is authorized to represent",
              "Availability at your exact address and for the current plan year",
              "Your doctors, hospitals, and pharmacies in the exact plan directory",
              "Your prescriptions, tiers, utilization rules, and expected costs",
            ].map((item) => (
              <li key={item} className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-gray-800">
                <span className="mr-2 font-bold text-blue-700" aria-hidden="true">✓</span>{item}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm text-gray-600 leading-relaxed">
            For the most current information on the plans the agency represents at your address,
            call{" "}
            <a href={telHref} className="text-blue-700 underline">
              {siteConfig.phone}
            </a>
            .
          </p>
          <p className="mt-4 text-sm text-gray-600">
            Looking for hospital and clinic participation? Use the{" "}
            <Link href="/central-oregon-medicare-provider-networks" className="text-blue-700 underline">
              Central Oregon provider-network guide
            </Link>. Provider participation does not prove agency representation.
          </p>
        </div>
      </section>

      <section className="py-10 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <Disclaimer />
        </div>
      </section>

      <CTASection
        heading="Want Help Reviewing Current Options?"
        subheading="A licensed insurance agent can confirm and compare the plans the agency represents in your area."
      />
    </>
  );
}
