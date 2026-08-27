import type { ReactNode } from "react";
import CTASection from "@/components/CTASection";
import Disclaimer from "@/components/Disclaimer";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { siteConfig } from "@/lib/site";

export interface GuideSource {
  href: string;
  label: string;
  publisher: string;
}

interface GuideArticleProps {
  path: string;
  title: string;
  description: string;
  crumb: string;
  published: string;
  modified: string;
  sources: GuideSource[];
  children: ReactNode;
  ctaHeading?: string;
  ctaSubheading?: string;
  medicareDisclaimer?: boolean;
}

export default function GuideArticle({
  path,
  title,
  description,
  crumb,
  published,
  modified,
  sources,
  children,
  ctaHeading,
  ctaSubheading,
  medicareDisclaimer = true,
}: GuideArticleProps) {
  const url = `${siteConfig.url}${path}`;
  const reviewedLabel = new Date(`${modified}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: url,
    datePublished: published,
    dateModified: modified,
    author: { "@id": `${siteConfig.url}#organization` },
    publisher: { "@id": `${siteConfig.url}#organization` },
    reviewedBy: {
      "@type": "Person",
      name: "Scott Lewis",
      jobTitle: "Licensed Insurance Agent",
      worksFor: { "@id": `${siteConfig.url}#organization` },
    },
    citation: sources.map((source) => source.href),
    inLanguage: "en-US",
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <PageHero
        title={title}
        subtitle={description}
        crumbs={[{ href: "/", label: "Home" }, { href: "/resources", label: "Resources" }, { label: crumb }]}
      />
      <article className="bg-white px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <p className="mb-8 text-sm font-medium text-slate-600">
            Reviewed by Scott Lewis, licensed insurance agent · Last reviewed {reviewedLabel}
          </p>
          <div className="space-y-6 text-lg leading-relaxed text-gray-700">{children}</div>

          <section className="mt-14 border-t border-slate-200 pt-8" aria-labelledby="article-sources">
            <h2 id="article-sources" className="text-2xl font-bold text-gray-900">
              Sources and verification
            </h2>
            <p className="mt-3 text-base text-gray-600">
              We use primary sources and link to the current page so you can verify details before making a coverage decision.
            </p>
            <ul className="mt-5 space-y-3 text-base">
              {sources.map((source) => (
                <li key={source.href}>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-700 underline underline-offset-2 hover:text-blue-900"
                  >
                    {source.label}
                  </a>{" "}
                  <span className="text-gray-600">— {source.publisher}</span>
                </li>
              ))}
            </ul>
          </section>

          {medicareDisclaimer ? <Disclaimer className="mt-10" /> : null}
        </div>
      </article>
      <CTASection heading={ctaHeading} subheading={ctaSubheading} />
    </>
  );
}
