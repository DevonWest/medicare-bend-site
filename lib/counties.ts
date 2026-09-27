import type { LeadSource } from "./leadSources";
import type { LocalFAQ, LocalFacility } from "./cities";

export interface CountySource {
  href: string;
  label: string;
  publisher: string;
}

export interface County {
  name: string;
  slug: string;
  state: string;
  leadSource: LeadSource;
  metaDescription: string;
  heroSummary: string;
  communities: string[];
  commonZipCodes: string[];
  cityLinks: Array<{ href: string; label: string }>;
  overview: string[];
  carePattern: string;
  facilities: LocalFacility[];
  comparisonFactors: string[];
  prescriptionConsiderations: string[];
  movingConsiderations: string[];
  faqItems: LocalFAQ[];
  sources: CountySource[];
}

export const centralOregonCounties: County[] = [
  {
    name: "Deschutes County",
    slug: "deschutes-county",
    state: "Oregon",
    leadSource: "medicare-deschutes-county",
    metaDescription:
      "Compare Medicare in Deschutes County, Oregon, including Bend, Redmond, Sisters, Sunriver, and La Pine provider access, prescriptions, Medigap, and Part D.",
    heroSummary:
      "A countywide guide to Medicare choices, provider networks, hospitals, prescriptions, and enrollment help across Bend, Redmond, Sisters, Sunriver, and La Pine.",
    communities: ["Bend", "Redmond", "Sisters", "Sunriver", "La Pine", "Terrebonne", "Tumalo"],
    commonZipCodes: ["97701", "97702", "97703", "97707", "97739", "97756", "97759", "97760"],
    cityLinks: [
      { href: "/medicare-bend", label: "Bend" },
      { href: "/medicare-redmond", label: "Redmond" },
      { href: "/medicare-sisters", label: "Sisters" },
      { href: "/medicare-sunriver", label: "Sunriver" },
      { href: "/medicare-la-pine", label: "La Pine" },
    ],
    overview: [
      "Deschutes County is the center of Central Oregon’s largest health-care network. St. Charles operates hospital campuses in Bend and Redmond and clinics in several communities, while Summit Health, High Lakes Health Care, Mosaic Community Health, La Pine Community Health Center, and independent practices add primary and specialty options.",
      "Medicare Advantage plans use a defined service area, and county is a key part of availability. Enter the ZIP code for your permanent Deschutes County residence when comparing plans. Do not assume a plan available to a friend in Crook or Jefferson County is also available at your address—or that two plans from the same carrier use the same network.",
      "A countywide provider check matters because residents regularly cross city lines for care. Someone may see a primary-care clinician in Sisters or La Pine, use imaging in Redmond, and receive hospital or specialty care in Bend. Every link in that chain should be checked under the complete plan name and plan year.",
      "Original Medicare with a Medicare Supplement follows different provider-access rules from Medicare Advantage. Compare nationwide access, premiums, medical cost sharing, Part D coverage, underwriting or guaranteed-issue rights, and the amount of care you expect before deciding which route fits.",
    ],
    carePattern:
      "Bend and Redmond have hospital campuses, while Sisters, Sunriver, and La Pine residents often combine local outpatient care with hospital or specialty trips elsewhere in the county.",
    facilities: [
      {
        name: "St. Charles Bend",
        type: "Hospital and regional specialty hub",
        href: "https://stcharleshealthcare.org/locations/st-charles-bend",
        description:
          "The Bend campus at 2500 NE Neff Road provides hospital and emergency care. Confirm the facility, clinicians, and separately billed services.",
      },
      {
        name: "St. Charles Redmond",
        type: "Hospital",
        href: "https://stcharleshealthcare.org/locations/st-charles-redmond",
        description:
          "The Redmond campus at 1253 NW Canal Boulevard is a second county hospital location. Network status can still be plan-specific.",
      },
      {
        name: "Sisters Family Care Clinic",
        type: "Primary and outpatient care",
        href: "https://stcharleshealthcare.org/locations/sisters-family-care-clinic",
        description:
          "St. Charles lists primary care, lab, radiology, and selected visiting services in Sisters. Verify each service and clinician.",
      },
      {
        name: "La Pine Family Care Clinic",
        type: "Primary, urgent, lab, and X-ray services",
        href: "https://stcharleshealthcare.org/locations/la-pine-family-care-clinic",
        description:
          "The La Pine clinic provides important southern-county access. Check current hours, appointment availability, and exact-plan participation.",
      },
      {
        name: "Summit Health Oregon",
        type: "Primary and specialty care",
        href: "https://www.smgoregon.com/insurance-medicare/",
        description:
          "Summit publishes a general Medicare statement and operates county locations. Confirm the individual clinic, clinician, and product.",
      },
      {
        name: "High Lakes / Praxis Health",
        type: "Primary care practices",
        href: "https://www.gopraxishealth.com/clinic-locations/",
        description:
          "Praxis lists Central Oregon clinic locations and separate insurance updates. Use both provider and plan directories, then call to verify.",
      },
    ],
    comparisonFactors: [
      "The exact plan is offered at your permanent Deschutes County ZIP code",
      "St. Charles Bend or Redmond hospital and every clinician or specialty group you use",
      "Primary-care access in your community and referral access elsewhere in the county",
      "Summit, High Lakes, St. Charles, Mosaic, La Pine Community Health, and independent providers checked individually",
      "Labs, imaging, rehabilitation, home health, durable equipment, and ambulances—not only doctors",
      "Premium plus expected medical copays, coinsurance, drug costs, and maximum out-of-pocket exposure",
    ],
    prescriptionConsiderations: [
      "Enter every drug, dosage, quantity, and refill frequency in Medicare Plan Compare.",
      "Compare your preferred local pharmacy with at least one practical alternative and mail order.",
      "Check formulary tier, deductible treatment, prior authorization, step therapy, and quantity limits.",
      "Use estimated annual cost rather than choosing from premium alone.",
      "Review again each year because formularies, pharmacy status, and prices can change.",
    ],
    movingConsiderations: [
      "A move into or out of Deschutes County can change the Medicare Advantage and Part D plans available to you.",
      "Report the permanent address change and review the dates in your Special Enrollment Period.",
      "Recheck local clinicians, hospital access, prescriptions, and pharmacies before choosing new coverage.",
      "If you split time between homes, distinguish emergency travel coverage from planned routine care outside a network.",
    ],
    faqItems: [
      {
        question: "Are Medicare Advantage plans the same throughout Central Oregon?",
        answer:
          "No. Availability is tied to a plan’s service area, and Deschutes, Crook, and Jefferson counties can have different choices. Networks can also differ between products from one carrier.",
      },
      {
        question: "Which hospitals should Deschutes County residents check?",
        answer:
          "St. Charles operates hospital campuses in Bend and Redmond. Verify the hospital, individual clinicians, specialty groups, labs, imaging, and other separately billed services for your exact plan.",
      },
      {
        question: "Does a provider directory guarantee an appointment?",
        answer:
          "No. Network participation and new-patient availability are separate. Confirm both with the provider, and recheck the plan directory before enrolling.",
      },
      {
        question: "Where can Deschutes County residents get free Medicare counseling?",
        answer:
          "The Council on Aging of Central Oregon provides free, unbiased Medicare counseling through Oregon SHIBA. Licensed agents can also compare the plans they represent at no cost.",
      },
      {
        question: "When should I review my plan?",
        answer:
          "Review annual plan notices before Medicare Open Enrollment, October 15 through December 7. Also review after a move, provider change, major prescription change, or other qualifying event.",
      },
    ],
    sources: [
      {
        href: "https://stcharleshealthcare.org/about-us",
        label: "Health system hospitals and clinics",
        publisher: "St. Charles Health System",
      },
      {
        href: "https://www.medicare.gov/plan-compare/",
        label: "Medicare Plan Compare",
        publisher: "Centers for Medicare & Medicaid Services",
      },
      {
        href: "https://www.councilonaging.org/programs/medicare-counseling/",
        label: "Central Oregon Medicare counseling",
        publisher: "Council on Aging of Central Oregon",
      },
      {
        href: "https://www.medicare.gov/basics/get-started-with-medicare/using-medicare/if-you-move",
        label: "Medicare guidance if you move",
        publisher: "Centers for Medicare & Medicaid Services",
      },
    ],
  },
  {
    name: "Crook County",
    slug: "crook-county",
    state: "Oregon",
    leadSource: "medicare-crook-county",
    metaDescription:
      "Compare Medicare in Crook County, Oregon, including Prineville and Powell Butte provider access, St. Charles, prescriptions, Medigap, and Part D.",
    heroSummary:
      "A Crook County guide to Medicare choices, Prineville providers, prescription coverage, and access to care in Redmond or Bend.",
    communities: ["Prineville", "Powell Butte", "Post", "rural Crook County"],
    commonZipCodes: ["97754", "97753", "97752"],
    cityLinks: [{ href: "/medicare-prineville", label: "Prineville" }],
    overview: [
      "Crook County Medicare comparisons begin with the county service area. A Medicare Advantage plan offered at a Bend or Redmond address is not automatically offered in Prineville, Powell Butte, Post, or another Crook County community. Use the ZIP code for your permanent residence and confirm county eligibility before reviewing benefits.",
      "St. Charles Prineville is a critical-access hospital campus with emergency, radiology, laboratory, rehabilitation, primary, immediate-care, and visiting-specialist services listed by the health system. Mosaic Community Health also operates a Prineville health center and pharmacy. These local resources reduce some travel, but residents may still use Redmond or Bend clinicians for additional specialty and hospital care.",
      "A Medicare Advantage review should therefore include both the local Prineville care system and every out-of-county provider you expect to use. Confirm the full plan name and ID, not just the carrier. A PPO may allow some out-of-network care, but cost sharing and provider willingness to see out-of-network members still matter.",
      "Original Medicare with a Medicare Supplement may offer broader provider access, but premiums, Part D coverage, enrollment rights, and possible medical underwriting outside protected periods must be considered. Compare both approaches using your actual health-care use and budget.",
    ],
    carePattern:
      "Prineville provides local hospital and outpatient care, while residents may travel west to Redmond or Bend for selected specialists, procedures, or a broader range of services.",
    facilities: [
      {
        name: "St. Charles Prineville",
        type: "Critical-access hospital and clinic campus",
        href: "https://stcharleshealthcare.org/locations/st-charles-prineville",
        description:
          "The campus at 384 SE Combs Flat Road lists emergency, radiology, lab, rehabilitation, primary, immediate, and visiting-specialist care.",
      },
      {
        name: "Mosaic Prineville Health Center and Pharmacy",
        type: "Community health center and pharmacy",
        href: "https://mosaicch.org/locations/",
        description:
          "Mosaic lists both clinical and pharmacy services in Prineville. Confirm the clinician, Medicare billing, new-patient status, and drug-plan pharmacy status.",
      },
      {
        name: "St. Charles Redmond",
        type: "Nearby hospital",
        href: "https://stcharleshealthcare.org/locations/st-charles-redmond",
        description:
          "Redmond may be part of an out-of-county care route. Check the facility, associated clinicians, referrals, and cost sharing.",
      },
      {
        name: "St. Charles Bend",
        type: "Regional hospital and specialty hub",
        href: "https://stcharleshealthcare.org/locations/st-charles-bend",
        description:
          "Bend offers a broader specialty base. Every expected Bend clinician and facility should be checked under a Crook County plan.",
      },
    ],
    comparisonFactors: [
      "The plan is offered at your permanent Crook County address",
      "St. Charles Prineville hospital, clinic, visiting specialists, and separately billed professionals",
      "Mosaic Prineville health center, pharmacy, clinician availability, and Part D pricing",
      "Specialists, imaging, procedures, and hospital services you use in Redmond or Bend",
      "HMO referrals or PPO out-of-network terms and the provider’s willingness to accept them",
      "Travel frequency and total cost, including premium, copays, coinsurance, and prescriptions",
    ],
    prescriptionConsiderations: [
      "Compare Prineville pharmacies using every current prescription, dose, and quantity.",
      "Check whether a pharmacy is preferred or standard under each plan; being in network does not guarantee the lowest copay.",
      "Review mail-order options if travel distance or winter conditions make refills difficult.",
      "Check prior authorization, step therapy, quantity limits, and the plan’s exception process.",
      "Screen for Extra Help and Oregon Medicare Savings Programs if eligible.",
    ],
    movingConsiderations: [
      "Moving between Crook and Deschutes counties can change available Medicare Advantage and Part D plans.",
      "A permanent move may create a Special Enrollment Period; use the dates provided by Medicare or your plan.",
      "Do not wait until after a planned appointment to check whether the new plan includes your clinicians and facilities.",
      "Keep notices and confirmation records for address changes and enrollments.",
    ],
    faqItems: [
      {
        question: "Why are Crook County plan choices different from Deschutes County?",
        answer:
          "Medicare Advantage and Part D plans have service areas. A plan can be offered in one Oregon county and not another, even when the same carrier serves both areas.",
      },
      {
        question: "Can I use Redmond or Bend specialists with a Crook County plan?",
        answer:
          "Possibly, depending on the exact network, plan type, referrals, and provider. Check every out-of-county clinician and facility before enrolling.",
      },
      {
        question: "What services are available at St. Charles Prineville?",
        answer:
          "St. Charles lists emergency, radiology, laboratory, rehabilitation, primary, immediate-care, and visiting-specialist services at the campus. Availability and network participation still need current confirmation.",
      },
      {
        question: "How should rural Crook County residents compare drug plans?",
        answer:
          "Compare actual prescriptions at practical local pharmacies and mail order, then review annual cost, restrictions, refill access, and travel distance.",
      },
      {
        question: "Where can I get help comparing Crook County Medicare coverage?",
        answer:
          "Oregon SHIBA offers free, unbiased counseling. A licensed local agent can compare the plans they represent using your providers, prescriptions, and budget at no cost.",
      },
    ],
    sources: [
      {
        href: "https://stcharleshealthcare.org/locations/st-charles-prineville",
        label: "St. Charles Prineville services",
        publisher: "St. Charles Health System",
      },
      {
        href: "https://mosaicch.org/locations/",
        label: "Prineville health center and pharmacy",
        publisher: "Mosaic Community Health",
      },
      {
        href: "https://www.medicare.gov/plan-compare/",
        label: "Medicare Plan Compare",
        publisher: "Centers for Medicare & Medicaid Services",
      },
      {
        href: "https://shiba.oregon.gov/",
        label: "Oregon Medicare counseling",
        publisher: "Oregon SHIBA",
      },
    ],
  },
  {
    name: "Jefferson County",
    slug: "jefferson-county",
    state: "Oregon",
    leadSource: "medicare-jefferson-county",
    metaDescription:
      "Compare Medicare in Jefferson County, Oregon, including Madras, Culver, Metolius, and Warm Springs providers, prescriptions, Medigap, and Part D.",
    heroSummary:
      "A Jefferson County guide to Medicare choices, Madras providers, Warm Springs care coordination, prescriptions, and access to Redmond or Bend.",
    communities: ["Madras", "Culver", "Metolius", "Warm Springs", "rural Jefferson County"],
    commonZipCodes: ["97741", "97734", "97761"],
    cityLinks: [{ href: "/medicare-madras", label: "Madras" }],
    overview: [
      "Jefferson County Medicare comparisons should begin with the permanent address and county service area. Medicare Advantage and Part D options at a Madras, Culver, Metolius, or Warm Springs address can differ from plans available in Deschutes or Crook County. Use your actual ZIP code in Medicare Plan Compare.",
      "St. Charles Madras is a 25-bed critical-access hospital, and Mosaic Community Health operates a Madras health center and pharmacy. These are important local access points, while some residents travel to Redmond or Bend for specialists, procedures, or additional hospital services.",
      "Eligible Warm Springs residents may also receive services through the Warm Springs Health and Wellness Center. Indian Health Service eligibility and Medicare coverage are different systems. Medicare beneficiaries should coordinate IHS or tribal services, purchased or referred care rules, plan networks, and pharmacy access with the appropriate offices.",
      "A strong comparison checks every local and out-of-county provider, all prescriptions and pharmacies, likely travel, and total financial exposure. It also distinguishes Original Medicare with optional Medigap and Part D from Medicare Advantage rather than treating Medicare as one uniform plan.",
    ],
    carePattern:
      "Madras supplies local hospital, outpatient, community-health, and pharmacy access; some care goes south to Redmond or Bend, while eligible Warm Springs residents may coordinate Medicare with IHS or tribal services.",
    facilities: [
      {
        name: "St. Charles Madras",
        type: "Critical-access hospital",
        href: "https://stcharleshealthcare.org/locations/st-charles-madras",
        description:
          "The hospital at 470 NE A Street has 25 licensed beds. Verify hospital, emergency, outpatient, and professional services for the exact plan.",
      },
      {
        name: "Mosaic Madras Health Center and Pharmacy",
        type: "Community health center and pharmacy",
        href: "https://mosaicch.org/locations/",
        description:
          "Mosaic lists clinical and pharmacy access in Madras. Confirm the clinician, appointment status, Medicare billing, and Part D pharmacy pricing.",
      },
      {
        name: "Warm Springs Health and Wellness Center",
        type: "IHS primary ambulatory care for eligible patients",
        href: "https://www.ihs.gov/Portland/healthcarefacilities/warmsprings/",
        description:
          "IHS lists medical, dental, optometry, pharmacy, laboratory, radiology, and podiatry services for eligible patients in the service-unit area.",
      },
      {
        name: "St. Charles Redmond",
        type: "Nearby hospital",
        href: "https://stcharleshealthcare.org/locations/st-charles-redmond",
        description:
          "Redmond can be part of the regional referral route. Check the hospital, clinicians, authorizations, and cost sharing under the Jefferson County plan.",
      },
      {
        name: "St. Charles Bend",
        type: "Regional specialty and hospital hub",
        href: "https://stcharleshealthcare.org/locations/st-charles-bend",
        description:
          "If you expect Bend care, verify every specialist, facility, and related service rather than relying on the shared health-system name.",
      },
    ],
    comparisonFactors: [
      "The plan is offered at your permanent Jefferson County ZIP code",
      "St. Charles Madras hospital, clinic, outpatient services, and individual professionals",
      "Mosaic Madras health center, pharmacy, clinician availability, and Part D status",
      "Specialists, procedures, imaging, and hospital care you use in Redmond or Bend",
      "IHS or tribal eligibility, referral coordination, and pharmacy access for eligible Warm Springs residents",
      "Premium, medical cost sharing, prescriptions, transportation, and annual financial risk",
    ],
    prescriptionConsiderations: [
      "Enter all drugs, dosages, and refill amounts rather than comparing a sample medication.",
      "Check Madras and Warm Springs pharmacy access as applicable, plus a practical Redmond or mail-order alternative.",
      "Confirm preferred-network status, formulary tiers, prior authorization, step therapy, and quantity limits.",
      "Eligible IHS patients should ask how prescriptions are coordinated when they are filled inside or outside IHS.",
      "Review Extra Help and Oregon Medicare Savings Program eligibility if prescription or premium costs are difficult.",
    ],
    movingConsiderations: [
      "A move across the Jefferson–Deschutes county line can change available Medicare Advantage and Part D choices.",
      "Report a permanent move promptly and use the correct Special Enrollment Period dates.",
      "Recheck Madras providers and any Redmond or Bend specialists under the new coverage.",
      "Warm Springs beneficiaries should also update the offices coordinating IHS or tribal care when applicable.",
    ],
    faqItems: [
      {
        question: "Can Jefferson County residents enroll in the same plans as Bend residents?",
        answer:
          "Not always. Bend is in Deschutes County, and plan service areas can produce different choices. Use the permanent Jefferson County address and ZIP code.",
      },
      {
        question: "Does Medicare replace Indian Health Service eligibility?",
        answer:
          "No. Eligible beneficiaries can have Medicare and IHS access. How they coordinate depends on eligibility, where care is received, referrals, and the coverage selected.",
      },
      {
        question: "What should I verify at St. Charles Madras?",
        answer:
          "Check the exact hospital, service, clinician or professional group, and plan year. A general statement about the health system is not enough for every service.",
      },
      {
        question: "Can a Madras resident use providers in Redmond or Bend?",
        answer:
          "Possibly. Verify the individual providers and facilities, network status, referrals, prior authorization, and out-of-network costs under the exact Jefferson County plan.",
      },
      {
        question: "Where can Jefferson County residents get Medicare counseling?",
        answer:
          "Oregon SHIBA provides free, unbiased Medicare counseling, and a licensed agent can compare the plans they represent at no cost to you.",
      },
    ],
    sources: [
      {
        href: "https://stcharleshealthcare.org/locations/st-charles-madras",
        label: "St. Charles Madras hospital information",
        publisher: "St. Charles Health System",
      },
      {
        href: "https://mosaicch.org/locations/",
        label: "Madras health center and pharmacy",
        publisher: "Mosaic Community Health",
      },
      {
        href: "https://www.ihs.gov/Portland/healthcarefacilities/warmsprings/",
        label: "Warm Springs Service Unit",
        publisher: "Indian Health Service",
      },
      {
        href: "https://www.medicare.gov/plan-compare/",
        label: "Medicare Plan Compare",
        publisher: "Centers for Medicare & Medicaid Services",
      },
    ],
  },
];

export function getCountyBySlug(slug: string): County | undefined {
  return centralOregonCounties.find((county) => county.slug === slug);
}

export function getCountyMedicarePath(slug: string): string {
  return `/medicare-${slug}`;
}

export function getAllCountyMedicarePaths(): string[] {
  return centralOregonCounties.map((county) => getCountyMedicarePath(county.slug));
}
