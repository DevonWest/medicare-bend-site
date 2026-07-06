import type { Metadata } from "next";
import Link from "next/link";
import FriendlyIllustration from "@/components/FriendlyIllustration";
import LeadForm from "@/components/LeadForm";
import { siteConfig, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact a Licensed Bend Medicare Agent",
  description:
    "Contact Medicare in Bend — a licensed independent insurance agency helping Central Oregon residents with Medicare Advantage, Medicare Supplement, and Part D options.",
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: {
    title: "Contact a Licensed Bend Medicare Agent",
    description:
      "Reach a licensed independent insurance agency for Medicare help in Bend and Central Oregon.",
    url: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-800 to-blue-600 text-white py-16 landscape-mobile:py-5 px-4">
        <div className="max-w-5xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-blue-200 text-sm mb-4 landscape-mobile:mb-2">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Contact</span>
          </nav>
          <h1 className="text-4xl landscape-mobile:text-2xl landscape-mobile:leading-snug md:text-5xl font-extrabold leading-tight mb-4 landscape-mobile:mb-2">
            Contact Us
          </h1>
          <p className="text-xl landscape-mobile:text-base text-blue-100 max-w-2xl">
            Talk to a licensed independent Medicare agent serving Bend, Redmond, Sisters, Sunriver,
            La Pine, Prineville, Madras, and the surrounding Central Oregon area.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6 shadow-sm sm:p-8">
              <div className="grid items-center gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
                    Serving Bend &amp; Central Oregon
                  </p>
                  <h2 className="mt-3 text-3xl font-bold text-gray-900">
                    Talk with a licensed local insurance agent.
                  </h2>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-700">
                    {siteConfig.serviceAreaStatement} Call, email, or send a message and a licensed
                    insurance agent will follow up.
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <a
                      href={telHref}
                      className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-800"
                    >
                      Call {siteConfig.phone}
                    </a>
                    <Link
                      href="#contact-form"
                      aria-label="Jump to the contact form"
                      className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3 text-base font-semibold text-gray-900 transition-colors hover:bg-gray-50"
                    >
                      Request Help Online
                    </Link>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="mx-auto max-w-sm rounded-2xl border border-white/80 bg-white p-4 shadow-sm">
                    <FriendlyIllustration name="officeLocation" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <h3 className="text-2xl font-bold text-gray-900">How to reach us</h3>
                <div className="mt-5 not-italic text-base leading-8 text-gray-800">
                  <p>
                    Phone:{" "}
                    <a href={telHref} className="font-semibold text-blue-700 hover:underline">
                      {siteConfig.phone}
                    </a>
                  </p>
                  <p>
                    Email:{" "}
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="font-semibold text-blue-700 hover:underline"
                    >
                      {siteConfig.email}
                    </a>
                  </p>
                  <p>Hours: {siteConfig.hours}</p>
                  <p>{siteConfig.serviceAreaStatement}</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm leading-relaxed text-blue-900">
              <p className="font-semibold mb-1">Important Medicare information</p>
              <p>{siteConfig.disclaimer}</p>
              <p className="mt-2">{siteConfig.nonAffiliation}</p>
            </div>
          </div>

          {/* Form */}
          <div id="contact-form">
            <LeadForm
              source="contact"
              heading="Send Us a Message"
              subheading="Share a few details and a licensed agent will get back to you."
              showMessage
            />
          </div>
        </div>
      </section>
    </>
  );
}
