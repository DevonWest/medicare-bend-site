# Medicare in Bend vs. Medicare in Spokane audit

Audit date: August 27, 2026

## Executive finding

The Bend site had a sound lead-capture foundation but was still close to its initial Spokane localization. It lacked the source-backed local healthcare and individual-market coverage that now gives the Spokane site more topical depth. The highest-risk gaps were not merely page count: the live Bend site published an unverified carrier roster, used plural-team and five-star trust language despite one verified agent and no published testimonials, and described a service-area business with approximate LocalBusiness coordinates despite having no verified public street address.

This branch fixes those trust and technical issues and adds the first Bend-specific authority cluster. It deliberately does not copy thin ZIP pages or the Spokane CMS subsystem before Bend has distinct local evidence, reviewer controls, and rollback ownership.

## Baseline comparison

| Surface | Bend live before this branch | Spokane benchmark | Bend after this branch |
| --- | ---: | ---: | ---: |
| Sitemap URLs | 26 | 69 | 33 |
| Average rendered words per sitemap page | 1,027 | 1,480 | New guides range from about 650–880 words |
| Pages with an Open Graph image | 0 | 0 | 33 indexable pages |
| Titles outside 25–65 characters | 12 | Not used as the direct target | 0 in the production static audit |
| Descriptions outside 110–165 characters | 19 | Not used as the direct target | 0 in the production static audit |
| Local provider/network guides | 0 | Established provider/network cluster | 3 facility/network guides plus one comparison hub |
| Individual-market guidance | 0 | Established pre-Medicare health coverage | Bend guide plus a sourced 2027 Oregon market update |
| Editorial standards | None | Mature content controls | Public standards and dated/source-linked guides |

The response-time figures from the crawl are diagnostic fetch timings, not Core Web Vitals. Lighthouse and field data should be checked on the deployed beta and production builds.

## Changes implemented

### Local authority content

- Central Oregon Medicare provider-network verification hub.
- St. Charles Medicare plan guide that distinguishes Original Medicare acceptance, 2026 PacificSource participation, products no longer offered locally, and historical network notices.
- Summit Health Oregon Medicare verification guide.
- Medicare Advantage vs. Medicare Supplement guide grounded in local provider-access considerations.
- Moving-to-Bend Medicare checklist with county and Special Enrollment Period considerations.
- Individual health insurance in Bend guide.
- 2027 Oregon health insurance update with final rate averages, county carrier maps, carrier exits, and the state-based Marketplace transition.

### Trust and compliance

- Replaced unverified carrier carryovers with a fail-closed verification page.
- Replaced approximate LocalBusiness/address/geo markup with Organization, WebSite, and Service markup suitable for a service-area agency without a verified public office.
- Corrected plural-team and unverifiable rating language around the one verified local agent, Scott Lewis.
- Added a public editorial standards and corrections policy.
- Added visible reviewer and last-reviewed dates, primary-source citations, Article schema, and breadcrumb schema.

### Technical SEO and security

- Added a generated 1200×630 Open Graph image to every explicitly defined page metadata block.
- Tightened legacy and new titles/descriptions to the audit range.
- Replaced build-time `new Date()` sitemap timestamps with content dates.
- Upgraded Next.js and matching packages from 16.2.4 to 16.3.3 and Firebase Admin from 13.8 to 14.3.
- Reduced the production dependency audit from 18 findings, including one critical and eight high, to six moderate transitive findings with no high or critical findings.
- Added regression tests for primary-source URLs, fail-closed carrier data, service-area schema, reviewed guides, sitemap coverage, and Open Graph images.

## Evidence used

- [St. Charles insurance information](https://stcharleshealthcare.org/patients/billing-and-insurance/insurance-information)
- [St. Charles–PacificSource 2026 agreement](https://stcharleshealthcare.org/news/st-charles-reaches-agreement-remain-network-pacificsource)
- [Summit Health Oregon insurance and Medicare](https://www.smgoregon.com/insurance-medicare/)
- [Oregon final 2027 rates](https://dfr.oregon.gov/news/news2026/pages/20260818-dfr-finalizes-2027-insurance-rates.aspx)
- [Oregon final 2027 county coverage table](https://dfr.oregon.gov/healthrates/Documents/2027-rate-and-county-coverage.pdf)
- [Oregon Marketplace transition](https://healthcare.oregon.gov/marketplace/sbmtransition/pages/home.aspx)
- [Google Search guidance for AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

## Recommended rollout after merge

1. Deploy to beta and visually inspect the homepage, guide tables, lead forms, mobile sticky CTA, metadata, schema, and generated social image.
2. Deploy production, resubmit the sitemap, and inspect the eight new URLs in Google Search Console. Check Bing Webmaster Tools and configure IndexNow only after assigning key ownership.
3. Have the licensed agency reviewer verify the public phone, email, carrier appointments, product lines, and CMS organization/product count. Publish a carrier only after that review.
4. Add a verified physical address to site and business-profile markup only if clients can actually visit it and the agency wants it public.
5. Add the Bend Google review URL and real Bend testimonials only after ownership and consent are confirmed.
6. Build the next content cluster around Annual Enrollment, Medicare Savings Programs/Extra Help, self-employed and Special Enrollment health coverage, and genuinely distinct county/provider questions.
7. Port Spokane's controlled CMS and Search Console automation only as a separate change with deterministic revisions, role-based review, preview parity, rollback, and fail-closed publishing.

## Guardrails

- Do not create ZIP or city pages solely to increase route count. Each indexable page needs distinct provider, county, eligibility, or access information.
- Do not infer agency representation from a provider's accepted-insurance list.
- Do not infer current network status from an old announcement.
- Do not describe individual-market exits as changes to Medicare, employer-group, or Medicare Supplement products.
- Keep static public source authoritative until any CMS workflow passes parity and rollback review.
