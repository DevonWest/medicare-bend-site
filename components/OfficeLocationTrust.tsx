import Link from "next/link";
import FriendlyIllustration from "@/components/FriendlyIllustration";
import { siteConfig, telHref } from "@/lib/site";

const serviceBullets = [
  "Help by phone, online, or by appointment",
  "Serving all of Central Oregon",
  "Licensed local insurance agents",
  "No-cost Medicare consultations",
];

export default function OfficeLocationTrust() {
  return (
    <section className="bg-slate-100 py-16 px-4 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-blue-50 shadow-sm">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
            <div className="p-8 md:p-12">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-700">
                Serving Bend &amp; Central Oregon
              </p>
              <h2 className="mb-5 text-3xl font-bold text-gray-900 md:text-4xl">
                Local Medicare Help Across Central Oregon
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700 md:text-lg">
                <p>
                  {siteConfig.serviceAreaStatement} Whether you prefer to talk by phone, meet
                  online, or set up an appointment, our team is here to guide you through your
                  Medicare options with clarity and confidence.
                </p>
              </div>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {serviceBullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-white p-4"
                  >
                    <span
                      className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-700 text-white"
                      aria-hidden="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 5.292a1 1 0 010 1.416l-7.5 7.5a1 1 0 01-1.416 0l-3.5-3.5a1 1 0 111.416-1.416L8.5 12.088l6.79-6.796a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-sm font-medium text-gray-800 md:text-base">{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-800"
                >
                  Request an Appointment
                </Link>
                <a
                  href={telHref}
                  className="inline-flex items-center justify-center rounded-lg border-2 border-blue-700 bg-white px-6 py-3 text-base font-semibold text-blue-700 transition-colors hover:bg-blue-50"
                >
                  Call {siteConfig.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center border-t border-slate-200 bg-slate-900 p-8 lg:border-t-0 lg:border-l">
              <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white p-8 shadow-lg">
                <div className="mb-6 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <FriendlyIllustration name="officeLocation" />
                </div>

                <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Central Oregon Medicare Help
                </p>
                <div className="mt-4 space-y-3 text-gray-800">
                  <p className="text-2xl font-bold text-gray-900">{siteConfig.shortName}</p>
                  <p className="text-base leading-relaxed text-gray-700">
                    {siteConfig.serviceAreaStatement}
                  </p>
                  <p>
                    <a href={telHref} className="font-semibold text-blue-700 hover:underline">
                      {siteConfig.phone}
                    </a>
                  </p>
                </div>

                <p className="mt-6 rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-600">
                  No-cost Medicare consultations for Bend, Redmond, Sisters, Sunriver, La Pine,
                  Prineville, and Madras.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
