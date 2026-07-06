import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import Disclaimer from "@/components/Disclaimer";
import PageHero from "@/components/PageHero";
import { siteConfig } from "@/lib/site";
import { testimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Client Testimonials",
  description:
    "Reviews from Central Oregon Medicare clients who work with Health Insurance Options LLC and our local team of licensed insurance professionals.",
  alternates: { canonical: `${siteConfig.url}/testimonials` },
  openGraph: {
    title: "Client Testimonials",
    description:
      "Central Oregon Medicare clients on working with Health Insurance Options LLC.",
    url: `${siteConfig.url}/testimonials`,
  },
};

const featuredFirstTestimonials = [...testimonials].sort(
  (left, right) => (right.featured ? 1 : 0) - (left.featured ? 1 : 0),
);

export default function TestimonialsPage() {
  const hasTestimonials = featuredFirstTestimonials.length > 0;

  return (
    <>
      <PageHero
        title="Client Testimonials"
        subtitle="Feedback from Central Oregon residents we help navigate Medicare."
        crumbs={[{ href: "/", label: "Home" }, { label: "Testimonials" }]}
      />

      <section className="py-14 px-4 bg-white">
        {hasTestimonials ? (
          <>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredFirstTestimonials.map((testimonial) => (
                <figure
                  key={testimonial.name}
                  className="flex flex-col rounded-2xl border border-gray-200 bg-white p-7 shadow-sm"
                >
                  <div className="mb-4 text-xl tracking-[0.2em] text-amber-500" aria-label="5 out of 5 stars">
                    ★★★★★
                  </div>
                  <blockquote className="flex-1 text-lg leading-relaxed text-gray-900">
                    “{testimonial.text}”
                  </blockquote>
                  <figcaption className="mt-6 border-t border-gray-100 pt-5">
                    <p className="text-base font-semibold text-gray-900">{testimonial.name}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                      <span>{testimonial.location}</span>
                      <span aria-hidden="true">•</span>
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                        {testimonial.source} Review
                      </span>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>

            <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-gray-600">
              Reviews sourced from Google.
            </p>
          </>
        ) : (
          <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-slate-50 p-8 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">Reviews are on the way</h2>
            <p className="mt-3 text-base leading-relaxed text-gray-700">
              We&apos;re a growing Central Oregon Medicare practice and are gathering reviews from
              the clients we help. In the meantime, we&apos;d be glad to talk through your Medicare
              questions.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-700 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-800"
            >
              Contact Our Team
            </Link>
          </div>
        )}
      </section>

      <section className="py-10 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <Disclaimer />
        </div>
      </section>

      <CTASection />
    </>
  );
}
