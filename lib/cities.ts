import type { LeadSource } from "./leadSources";

export interface LocalFacility {
  name: string;
  type: string;
  href: string;
  description: string;
}

export interface LocalFAQ {
  question: string;
  answer: string;
}

export type City = {
  name: string;
  slug: string;
  county: string;
  countyPath: string;
  state: string;
  stateCode: string;
  nearbyCommunities: string[];
  relatedLocations: Array<{ href: string; label: string }>;
  zipCodes: string[];
  leadSource: LeadSource;
  metaDescription: string;
  heroSummary: string;
  localOverview: string[];
  careAccessSummary: string;
  localFacilities: LocalFacility[];
  comparisonFactors: string[];
  faqItems: LocalFAQ[];
};

/** Central Oregon communities with distinct care-access and Medicare considerations. */
export const centralOregonCities: City[] = [
  {
    name: "Bend",
    slug: "bend",
    county: "Deschutes County",
    countyPath: "/medicare-deschutes-county",
    state: "Oregon",
    stateCode: "OR",
    nearbyCommunities: ["Redmond", "Sisters", "Sunriver", "La Pine"],
    relatedLocations: [
      { href: "/medicare-redmond", label: "Redmond" },
      { href: "/medicare-sisters", label: "Sisters" },
      { href: "/medicare-sunriver", label: "Sunriver" },
      { href: "/medicare-la-pine", label: "La Pine" },
    ],
    zipCodes: ["97701", "97702", "97703"],
    leadSource: "medicare-bend",
    metaDescription:
      "Get local Medicare help in Bend, Oregon. Compare provider networks, prescriptions, costs, Medicare Advantage, Medigap, and Part D options.",
    heroSummary:
      "Compare Medicare coverage around the Bend providers, prescriptions, pharmacies, travel, and budget that matter to you.",
    localOverview: [
      "Bend is Central Oregon’s main hospital and specialty-care hub. St. Charles Bend anchors hospital and emergency care, while Summit Health, High Lakes Health Care, St. Charles clinics, Mosaic, and independent practices give residents several places to seek primary and specialty care. Those organizations do not necessarily participate in the same Medicare Advantage networks.",
      "A plan comparison should begin with the complete names of your clinic, individual clinicians, hospital, laboratory, imaging location, and pharmacy. A health system can bill one plan while a particular clinician, facility, or contracted service follows different rules. New-patient availability is also separate from insurance participation.",
      "Bend residents who spend part of the year elsewhere should compare routine and urgent care outside Central Oregon. Original Medicare with a Medicare Supplement generally has different provider-access rules than a network-based Medicare Advantage plan, and prescription access can vary by pharmacy and plan.",
    ],
    careAccessSummary:
      "Bend has the region’s broadest concentration of hospitals, specialists, imaging, and pharmacies, but exact-plan participation still has to be checked at the clinician and facility level.",
    localFacilities: [
      {
        name: "St. Charles Bend",
        type: "Hospital and emergency care",
        href: "https://stcharleshealthcare.org/locations/st-charles-bend",
        description:
          "The Bend hospital campus at 2500 NE Neff Road provides hospital and emergency services. Verify the hospital, employed clinicians, and any separate specialty groups for the exact plan year.",
      },
      {
        name: "Summit Health Oregon",
        type: "Primary and specialty care",
        href: "https://www.smgoregon.com/insurance-medicare/",
        description:
          "Summit publishes a general Medicare statement and operates multiple Bend clinics. Confirm the named plan, clinic, and clinician directly before enrollment.",
      },
      {
        name: "High Lakes Health Care / Praxis Health",
        type: "Primary care network",
        href: "https://www.gopraxishealth.com/clinic-locations/",
        description:
          "High Lakes has multiple Bend-area locations. Use both the practice’s insurance update and the plan directory because participation can change by product and year.",
      },
      {
        name: "Mosaic Community Health",
        type: "Community health centers",
        href: "https://mosaicch.org/locations/",
        description:
          "Mosaic lists several Bend health centers. Ask the center to confirm Medicare status, the individual clinician, and whether new Medicare patients are being scheduled.",
      },
    ],
    comparisonFactors: [
      "St. Charles Bend hospital and every specialist you expect to use",
      "The exact Summit, High Lakes, St. Charles, Mosaic, or independent clinic location and clinician",
      "Laboratory, imaging, rehabilitation, home-health, and durable-medical-equipment suppliers",
      "Every prescription, dosage, refill frequency, and preferred Bend pharmacy",
      "Out-of-area access if you travel, snowbird, or receive care in Portland or another state",
    ],
    faqItems: [
      {
        question: "Which Medicare Advantage plans include St. Charles Bend?",
        answer:
          "Participation can change by plan and year. Check the full plan name and plan ID in the plan directory, then confirm St. Charles Bend and each clinician directly before you enroll.",
      },
      {
        question: "Does a Bend clinic accepting Medicare mean it accepts every Medicare Advantage plan?",
        answer:
          "No. Accepting Original Medicare is not the same as participating in every Medicare Advantage HMO or PPO. Verify the exact product, location, and clinician.",
      },
      {
        question: "What should a Bend resident bring to a Medicare review?",
        answer:
          "Bring your Medicare card, current plan notice, doctors and facilities, prescriptions with dosages, preferred pharmacies, travel needs, and a realistic health-care budget.",
      },
      {
        question: "Is local Medicare guidance available at no cost?",
        answer:
          "Our agency offers no-cost plan comparisons for plans we represent. Oregon SHIBA also provides free, unbiased Medicare counseling through trained volunteers.",
      },
    ],
  },
  {
    name: "Redmond",
    slug: "redmond",
    county: "Deschutes County",
    countyPath: "/medicare-deschutes-county",
    state: "Oregon",
    stateCode: "OR",
    nearbyCommunities: ["Bend", "Terrebonne", "Sisters"],
    relatedLocations: [
      { href: "/medicare-bend", label: "Bend" },
      { href: "/medicare-sisters", label: "Sisters" },
      { href: "/medicare-prineville", label: "Prineville" },
    ],
    zipCodes: ["97756"],
    leadSource: "medicare-redmond",
    metaDescription:
      "Get Medicare help in Redmond, Oregon. Compare Deschutes County plans, St. Charles access, local clinics, prescriptions, Medigap, and Part D.",
    heroSummary:
      "Review Medicare choices for care in Redmond and the Bend specialists or facilities you may also use.",
    localOverview: [
      "Redmond residents can receive hospital, emergency, primary, and outpatient care close to home. St. Charles Redmond, St. Charles Family Care, Mosaic Community Health, Summit Health, and other practices serve the area, while many people travel to Bend for selected specialists, procedures, or hospital services.",
      "That two-city care pattern makes network review especially important. A plan that works for a Redmond primary-care clinic may not include every Bend specialist, imaging center, or hospital service you use. Confirm each location and clinician rather than relying on a carrier logo or a general statement that a group accepts Medicare.",
      "Redmond is in Deschutes County, so its Medicare Advantage availability generally follows the county service area. Your exact ZIP code, however, should still be entered in Medicare Plan Compare, and Part D costs should be run with your own prescriptions and pharmacy choices.",
    ],
    careAccessSummary:
      "Redmond has a local hospital and growing clinic base, but many residents need coverage that also works for specialty care in Bend.",
    localFacilities: [
      {
        name: "St. Charles Redmond",
        type: "Hospital",
        href: "https://stcharleshealthcare.org/locations/st-charles-redmond",
        description:
          "The hospital is at 1253 NW Canal Boulevard. Confirm the facility and each associated clinician or service for your exact plan.",
      },
      {
        name: "St. Charles Redmond Family Care Clinic",
        type: "Primary care",
        href: "https://stcharleshealthcare.org/locations/redmond-family-care-clinic",
        description:
          "The family-care clinic provides routine and preventive care, lab services, and other outpatient services. Insurance and appointment availability should be confirmed separately.",
      },
      {
        name: "Mosaic Redmond Health Center and Pharmacy",
        type: "Community health center and pharmacy",
        href: "https://mosaicch.org/locations/",
        description:
          "Mosaic lists Redmond clinical and pharmacy services. Check clinician availability, Medicare billing, and prescription-plan pharmacy status.",
      },
      {
        name: "Summit Health Oregon",
        type: "Primary and specialty care",
        href: "https://www.smgoregon.com/specialty/primary-care/",
        description:
          "Summit lists Redmond primary care alongside its broader Central Oregon network. Verify the exact Redmond clinic and any Bend referral location.",
      },
    ],
    comparisonFactors: [
      "St. Charles Redmond plus any St. Charles Bend care you expect to use",
      "Redmond primary-care clinicians and Bend specialists on the same plan",
      "Emergency, imaging, lab, and rehabilitation locations—not just the health-system name",
      "Preferred Redmond pharmacies and mail-order rules for every prescription",
      "Referral and prior-authorization rules if a local clinician sends you to Bend",
    ],
    faqItems: [
      {
        question: "Are Bend and Redmond Medicare Advantage networks always the same?",
        answer:
          "Not necessarily. The cities share Deschutes County plan availability, but individual hospitals, clinics, and clinicians can have different contracts. Verify every place you use.",
      },
      {
        question: "Can I keep a Redmond doctor and see a Bend specialist?",
        answer:
          "Possibly, but both providers must fit the plan’s rules. Check network status, referral requirements, and prior authorization before assuming the combination will work.",
      },
      {
        question: "How do I compare prescription coverage in Redmond?",
        answer:
          "Enter every drug, dose, quantity, and preferred pharmacy in Medicare Plan Compare. Compare estimated annual cost and coverage restrictions, not premium alone.",
      },
      {
        question: "Where can I get unbiased Medicare counseling in Central Oregon?",
        answer:
          "Oregon SHIBA counseling is available through the Council on Aging of Central Oregon. The program offers free Medicare assistance by trained counselors.",
      },
    ],
  },
  {
    name: "Sisters",
    slug: "sisters",
    county: "Deschutes County",
    countyPath: "/medicare-deschutes-county",
    state: "Oregon",
    stateCode: "OR",
    nearbyCommunities: ["Bend", "Redmond", "Camp Sherman"],
    relatedLocations: [
      { href: "/medicare-bend", label: "Bend" },
      { href: "/medicare-redmond", label: "Redmond" },
    ],
    zipCodes: ["97759"],
    leadSource: "medicare-sisters",
    metaDescription:
      "Get Medicare help in Sisters, Oregon. Compare local primary care, Bend and Redmond provider access, prescriptions, Medicare Advantage, Medigap, and Part D.",
    heroSummary:
      "Compare coverage for everyday care in Sisters and hospital or specialty care in Redmond and Bend.",
    localOverview: [
      "Sisters has local primary-care access, lab and outpatient services, but residents often travel to Redmond or Bend for hospital care and a wider range of specialists. That travel pattern should be mapped before choosing a network-based Medicare Advantage plan.",
      "St. Charles Sisters Family Care Clinic lists primary care, lab, outpatient radiology, anticoagulation services, and visiting specialty services. A clinic’s service list does not establish participation in every plan, so check the full plan name and each clinician you use.",
      "For residents near Camp Sherman or elsewhere west and north of town, winter travel and distance may also affect the practical value of a network. Compare urgent-care rules, telehealth, and what happens if the nearest appropriate service is in a different community.",
    ],
    careAccessSummary:
      "Sisters offers important local outpatient care, while many hospital and specialty needs lead residents to Redmond or Bend.",
    localFacilities: [
      {
        name: "St. Charles Sisters Family Care Clinic",
        type: "Primary and outpatient care",
        href: "https://stcharleshealthcare.org/locations/sisters-family-care-clinic",
        description:
          "The clinic at 630 N Arrowleaf Trail lists primary care, lab, radiology, and selected visiting services. Confirm each clinician and service for the plan year.",
      },
      {
        name: "St. Charles Redmond",
        type: "Nearby hospital",
        href: "https://stcharleshealthcare.org/locations/st-charles-redmond",
        description:
          "Redmond is one nearby hospital option. Verify hospital, emergency, and professional billing participation separately.",
      },
      {
        name: "St. Charles Bend",
        type: "Regional hospital and specialty hub",
        href: "https://stcharleshealthcare.org/locations/st-charles-bend",
        description:
          "Bend provides a broader range of hospital and specialist services. Include every expected Bend location in a network review.",
      },
      {
        name: "Central Oregon provider directories",
        type: "Clinic search",
        href: "https://www.gopraxishealth.com/clinic-locations/",
        description:
          "Praxis/High Lakes publishes clinic locations in Central Oregon. Use current plan and practice directories together, then call to confirm.",
      },
    ],
    comparisonFactors: [
      "Primary care, lab, and radiology services in Sisters",
      "Hospital and emergency access in Redmond or Bend",
      "Every Bend specialist and the referral route from your Sisters clinician",
      "Winter travel, urgent care, and out-of-area emergency rules",
      "Local pharmacy access, mail order, and preferred-network pricing",
    ],
    faqItems: [
      {
        question: "Why should Sisters residents check providers in more than one city?",
        answer:
          "Many residents use local primary care but travel to Redmond or Bend for hospitals or specialists. All parts of that care path should work with the coverage you choose.",
      },
      {
        question: "Does St. Charles Sisters Family Care Clinic take my Medicare Advantage plan?",
        answer:
          "Check the exact plan, clinic, and individual clinician for the current year. A general health-system statement is not a guarantee for every product or service.",
      },
      {
        question: "Would Medigap offer broader travel access from Sisters?",
        answer:
          "With Original Medicare and a Medicare Supplement, you can generally see providers nationwide who accept Medicare. Compare premiums, underwriting or enrollment rights, and Part D separately.",
      },
      {
        question: "Can a local agent compare Sisters-area options?",
        answer:
          "Yes. A licensed agent can compare the plans they represent using your ZIP code, providers, prescriptions, pharmacies, and travel needs at no cost to you.",
      },
    ],
  },
  {
    name: "Sunriver",
    slug: "sunriver",
    county: "Deschutes County",
    countyPath: "/medicare-deschutes-county",
    state: "Oregon",
    stateCode: "OR",
    nearbyCommunities: ["Bend", "La Pine", "Three Rivers"],
    relatedLocations: [
      { href: "/medicare-bend", label: "Bend" },
      { href: "/medicare-la-pine", label: "La Pine" },
    ],
    zipCodes: ["97707"],
    leadSource: "medicare-sunriver",
    metaDescription:
      "Get Medicare help in Sunriver, Oregon. Compare local and Bend provider access, seasonal travel, prescriptions, Medicare Advantage, Medigap, and Part D.",
    heroSummary:
      "Review Medicare coverage for care near Sunriver, trips to Bend or La Pine, and time spent outside Central Oregon.",
    localOverview: [
      "Sunriver and the surrounding Three Rivers area have local primary-care options, while many residents travel north to Bend or south to La Pine for hospital, urgent, imaging, or specialty services. Coverage should match the full route you use for care rather than one nearby clinic.",
      "Sunriver also has a significant population of seasonal and part-time residents. Medicare Advantage plans use service areas and provider networks, while Original Medicare with a Medicare Supplement generally follows different nationwide provider-access rules. Neither approach is automatically better; the right fit depends on where and how you receive care.",
      "Prescription planning matters when you split time between homes. Check whether your pharmacies are preferred or standard, whether mail order is practical, and how vacation overrides or early refills work under the drug plan.",
    ],
    careAccessSummary:
      "Sunriver residents often combine nearby primary care with Bend or La Pine services, and seasonal travel can be as important as local network access.",
    localFacilities: [
      {
        name: "Summit Health Sunriver Clinic",
        type: "Primary care",
        href: "https://www.smgoregon.com/clinic/sunriver-clinic/",
        description:
          "Summit lists primary care at its Sunriver clinic. Confirm the exact plan, clinician, and appointment availability.",
      },
      {
        name: "St. Charles Bend",
        type: "Regional hospital",
        href: "https://stcharleshealthcare.org/locations/st-charles-bend",
        description:
          "Many residents travel to Bend for hospital and specialist care. Verify the hospital and each professional service separately.",
      },
      {
        name: "St. Charles La Pine Family Care Clinic",
        type: "Primary and urgent care south of Sunriver",
        href: "https://stcharleshealthcare.org/locations/la-pine-family-care-clinic",
        description:
          "The La Pine clinic lists family medicine, urgent care, X-ray, lab, and other services. Check current hours, network status, and clinician availability.",
      },
      {
        name: "La Pine Community Health Center",
        type: "Community health center",
        href: "https://www.lapinehealth.org/locations",
        description:
          "La Pine Community Health Center lists services for the southern Deschutes County area. Confirm Medicare billing and the individual provider before scheduling.",
      },
    ],
    comparisonFactors: [
      "Sunriver primary care plus Bend hospital and specialty services",
      "La Pine urgent, lab, or imaging access when it is the practical option",
      "Routine care outside Oregon if you live elsewhere for part of the year",
      "Prescription refills, preferred pharmacies, and mail-order access in both locations",
      "Urgent and emergency coverage while traveling versus planned out-of-network care",
    ],
    faqItems: [
      {
        question: "What should a seasonal Sunriver resident check before choosing a plan?",
        answer:
          "Compare routine care in both locations, urgent and emergency rules, pharmacy access, refill logistics, and whether out-of-area clinicians are in network or accept Original Medicare.",
      },
      {
        question: "Can I use a Medicare Advantage plan while living in two states?",
        answer:
          "You generally must reside in the plan’s service area, and non-emergency routine care outside its network may be limited. Review the plan’s HMO or PPO rules and your primary residence carefully.",
      },
      {
        question: "Is emergency care covered away from Sunriver?",
        answer:
          "Medicare Advantage plans cover emergency and urgently needed care within the United States, but planned routine care follows the plan’s network and service-area rules.",
      },
      {
        question: "Should I compare pharmacies in Sunriver, Bend, and my second-home area?",
        answer:
          "Yes. Drug prices and preferred status can differ by pharmacy. Run all prescriptions at pharmacies you can realistically use in each location.",
      },
    ],
  },
  {
    name: "La Pine",
    slug: "la-pine",
    county: "Deschutes County",
    countyPath: "/medicare-deschutes-county",
    state: "Oregon",
    stateCode: "OR",
    nearbyCommunities: ["Sunriver", "Bend", "Gilchrist"],
    relatedLocations: [
      { href: "/medicare-sunriver", label: "Sunriver" },
      { href: "/medicare-bend", label: "Bend" },
    ],
    zipCodes: ["97739"],
    leadSource: "medicare-la-pine",
    metaDescription:
      "Get Medicare help in La Pine, Oregon. Compare southern Deschutes County providers, Bend access, prescriptions, Medicare Advantage, Medigap, and Part D.",
    heroSummary:
      "Compare Medicare choices for local La Pine care and the specialists, hospital services, and pharmacies you use in Bend or elsewhere.",
    localOverview: [
      "La Pine has local primary, urgent, lab, X-ray, and community-health services, but residents may travel to Bend for hospital care and a broader range of specialists. Your coverage should account for both local routine care and those northbound appointments.",
      "St. Charles Family Care La Pine and La Pine Community Health Center are separate organizations. Confirm the exact clinic, individual clinician, and any referred facility under the plan you are considering. New-patient availability and plan participation can change independently.",
      "Distance, winter road conditions, and pharmacy choice are practical parts of a Medicare comparison in southern Deschutes County. Look beyond monthly premium to referral rules, prior authorization, specialist travel, drug coverage, and the annual maximum out-of-pocket amount for Medicare Advantage.",
    ],
    careAccessSummary:
      "La Pine has meaningful local outpatient access, while many hospital and specialty services still require a trip to Bend.",
    localFacilities: [
      {
        name: "St. Charles La Pine Family Care Clinic",
        type: "Primary, urgent, lab, and X-ray services",
        href: "https://stcharleshealthcare.org/locations/la-pine-family-care-clinic",
        description:
          "The clinic at 51781 Huntington Road lists family medicine, urgent care, X-ray, laboratory, and Medicare wellness services. Verify the precise service and clinician.",
      },
      {
        name: "La Pine Community Health Center",
        type: "Community health center",
        href: "https://www.lapinehealth.org/locations",
        description:
          "The organization lists its Huntington Road and other service locations. Ask about Medicare billing, appointment availability, and referrals.",
      },
      {
        name: "St. Charles Bend",
        type: "Regional hospital and specialty care",
        href: "https://stcharleshealthcare.org/locations/st-charles-bend",
        description:
          "Bend is the regional hospital hub. Check the facility, specialists, imaging, and professional services that may bill separately.",
      },
      {
        name: "Summit Health Sunriver Clinic",
        type: "Nearby primary care option",
        href: "https://www.smgoregon.com/clinic/sunriver-clinic/",
        description:
          "Sunriver may be another practical outpatient location for some residents. Confirm exact-plan and clinician status before relying on it.",
      },
    ],
    comparisonFactors: [
      "La Pine primary and urgent care plus St. Charles Bend access",
      "Specialist referrals and prior authorization for visits in Bend",
      "Local laboratory, X-ray, rehabilitation, and durable-equipment suppliers",
      "Pharmacy access in La Pine, Sunriver, or Bend and mail-order alternatives",
      "Transportation, winter travel, and the frequency of expected appointments",
    ],
    faqItems: [
      {
        question: "Do La Pine residents have the same Medicare Advantage choices as Bend?",
        answer:
          "Both are in Deschutes County, so county service area is central to availability. Still, use your ZIP code and verify the local providers and pharmacies you need.",
      },
      {
        question: "How should I check a Bend specialist from La Pine?",
        answer:
          "Confirm the individual specialist, practice, facility, referral requirement, and any related imaging or laboratory services under the exact plan.",
      },
      {
        question: "Does La Pine have local urgent care and lab access?",
        answer:
          "St. Charles lists urgent care, X-ray, and laboratory services at its La Pine clinic. Current hours, insurance participation, and availability should be checked directly.",
      },
      {
        question: "What costs matter beyond the monthly premium?",
        answer:
          "Compare deductibles, copays, coinsurance, drug costs, travel for care, and the Medicare Advantage annual maximum out-of-pocket amount.",
      },
    ],
  },
  {
    name: "Prineville",
    slug: "prineville",
    county: "Crook County",
    countyPath: "/medicare-crook-county",
    state: "Oregon",
    stateCode: "OR",
    nearbyCommunities: ["Powell Butte", "Redmond", "Bend"],
    relatedLocations: [
      { href: "/medicare-redmond", label: "Redmond" },
      { href: "/medicare-bend", label: "Bend" },
    ],
    zipCodes: ["97754"],
    leadSource: "medicare-prineville",
    metaDescription:
      "Get Medicare help in Prineville, Oregon. Compare Crook County plans, St. Charles and Mosaic access, prescriptions, Medicare Advantage, Medigap, and Part D.",
    heroSummary:
      "Compare Crook County Medicare choices around Prineville care and the Redmond or Bend providers you may also use.",
    localOverview: [
      "Prineville is in Crook County, and Medicare Advantage service areas are county-based. A plan shown for a Deschutes County ZIP code may not be offered at a Prineville address, even when the carrier name is familiar. Always start with the 97754 ZIP code and your permanent residence.",
      "St. Charles Prineville provides local hospital, emergency, radiology, lab, rehabilitation, primary, and immediate-care services, with visiting specialists listed by the health system. Mosaic also operates a Prineville health center and pharmacy. Residents may still travel to Redmond or Bend for additional specialty care.",
      "The most useful comparison connects all three layers: Crook County plan availability, Prineville providers and pharmacy access, and any out-of-county clinicians you expect to see. A PPO label alone does not guarantee favorable access or cost outside the network.",
    ],
    careAccessSummary:
      "Prineville has a local critical-access hospital and community-health services, while some specialist care leads residents to Redmond or Bend.",
    localFacilities: [
      {
        name: "St. Charles Prineville",
        type: "Critical-access hospital and clinic campus",
        href: "https://stcharleshealthcare.org/locations/st-charles-prineville",
        description:
          "The campus at 384 SE Combs Flat Road lists emergency, radiology, laboratory, rehabilitation, primary, immediate, and visiting-specialist services.",
      },
      {
        name: "Mosaic Prineville Health Center and Pharmacy",
        type: "Community health center and pharmacy",
        href: "https://mosaicch.org/locations/",
        description:
          "Mosaic lists clinical and pharmacy services in Prineville. Verify the clinician, Medicare billing, new-patient status, and Part D pharmacy pricing.",
      },
      {
        name: "St. Charles Redmond",
        type: "Nearby hospital",
        href: "https://stcharleshealthcare.org/locations/st-charles-redmond",
        description:
          "Some care may lead west to Redmond. Check how an out-of-county provider fits the exact network and referral rules.",
      },
      {
        name: "St. Charles Bend",
        type: "Regional specialty and hospital hub",
        href: "https://stcharleshealthcare.org/locations/st-charles-bend",
        description:
          "Include expected Bend specialists and facilities when comparing Crook County options rather than checking Prineville alone.",
      },
    ],
    comparisonFactors: [
      "Plans actually offered in Crook County at ZIP code 97754",
      "St. Charles Prineville hospital, clinic, and individual professional services",
      "Mosaic Prineville clinician and pharmacy participation",
      "Out-of-county specialists or procedures in Redmond and Bend",
      "Emergency transport, rehabilitation, durable equipment, and home-health needs",
    ],
    faqItems: [
      {
        question: "Why can Prineville plan choices differ from Bend?",
        answer:
          "Prineville is in Crook County and Bend is in Deschutes County. Medicare Advantage plans use county service areas, so availability can differ across the county line.",
      },
      {
        question: "Does St. Charles Prineville provide hospital care?",
        answer:
          "Yes. St. Charles describes it as a critical-access hospital campus with emergency, radiology, lab, rehabilitation, primary, and immediate-care services. Verify exact-plan participation.",
      },
      {
        question: "Can a Crook County Medicare Advantage plan cover Bend specialists?",
        answer:
          "It may, depending on the plan and provider. Check each Bend specialist, facility, referral rule, and out-of-network cost before enrollment.",
      },
      {
        question: "What if I move between Prineville and Bend?",
        answer:
          "A permanent move can change your service area and may create a Special Enrollment Period. Report the move and compare the options available at the new address.",
      },
    ],
  },
  {
    name: "Madras",
    slug: "madras",
    county: "Jefferson County",
    countyPath: "/medicare-jefferson-county",
    state: "Oregon",
    stateCode: "OR",
    nearbyCommunities: ["Culver", "Metolius", "Warm Springs", "Redmond"],
    relatedLocations: [
      { href: "/medicare-redmond", label: "Redmond" },
      { href: "/medicare-prineville", label: "Prineville" },
      { href: "/medicare-bend", label: "Bend" },
    ],
    zipCodes: ["97741"],
    leadSource: "medicare-madras",
    metaDescription:
      "Get Medicare help in Madras, Oregon. Compare Jefferson County plans, St. Charles and Mosaic access, prescriptions, Medicare Advantage, Medigap, and Part D.",
    heroSummary:
      "Compare Jefferson County Medicare choices for care in Madras and providers you may use in Redmond, Bend, or Warm Springs.",
    localOverview: [
      "Madras is the health-care hub for much of Jefferson County. St. Charles Madras is a 25-bed critical-access hospital, and Mosaic operates a Madras health center and pharmacy. Residents from Culver, Metolius, rural Jefferson County, and surrounding communities may rely on these services while traveling to Redmond or Bend for selected specialists and procedures.",
      "Medicare Advantage availability is tied to the county service area, so a Deschutes County plan should not be assumed to be available at a Madras address. Even when a carrier operates in both counties, its products and provider networks may differ.",
      "Warm Springs residents who are eligible for Indian Health Service care have another important layer to consider. IHS eligibility and Medicare coverage are separate, so beneficiaries should coordinate Medicare, IHS or tribal services, referral rules, and prescription access rather than assuming one replaces the other.",
    ],
    careAccessSummary:
      "Madras has a local critical-access hospital, community health center, and pharmacy, with some specialty travel to Redmond or Bend and distinct IHS considerations near Warm Springs.",
    localFacilities: [
      {
        name: "St. Charles Madras",
        type: "Critical-access hospital",
        href: "https://stcharleshealthcare.org/locations/st-charles-madras",
        description:
          "The hospital at 470 NE A Street has 25 licensed beds. Confirm hospital, emergency, outpatient, and professional services for the exact plan.",
      },
      {
        name: "Mosaic Madras Health Center and Pharmacy",
        type: "Community health center and pharmacy",
        href: "https://mosaicch.org/locations/",
        description:
          "Mosaic lists Madras clinical and pharmacy services. Check the clinician, new-patient status, Medicare billing, and Part D pharmacy network.",
      },
      {
        name: "Warm Springs Health and Wellness Center",
        type: "IHS primary ambulatory care for eligible patients",
        href: "https://www.ihs.gov/Portland/healthcarefacilities/warmsprings/",
        description:
          "IHS lists medical, dental, optometry, pharmacy, laboratory, radiology, and podiatry services for eligible American Indian and Alaska Native patients in its service area.",
      },
      {
        name: "St. Charles Redmond",
        type: "Nearby hospital and referral destination",
        href: "https://stcharleshealthcare.org/locations/st-charles-redmond",
        description:
          "Residents may travel south for additional services. Verify the Redmond facility and clinician network under a Jefferson County plan.",
      },
    ],
    comparisonFactors: [
      "Plans actually offered in Jefferson County at ZIP code 97741",
      "St. Charles Madras hospital, outpatient, and professional services",
      "Mosaic Madras clinician and pharmacy participation",
      "Specialty or hospital access in Redmond and Bend",
      "Coordination with IHS or tribal services for eligible Warm Springs residents",
    ],
    faqItems: [
      {
        question: "Why can Madras Medicare Advantage options differ from Redmond?",
        answer:
          "Madras is in Jefferson County and Redmond is in Deschutes County. Plan availability is county-based, even when residents use providers across both counties.",
      },
      {
        question: "Does St. Charles Madras participate in every Medicare Advantage plan?",
        answer:
          "Do not assume blanket participation. Check the exact plan, hospital, clinician, and service for the current plan year.",
      },
      {
        question: "How does Medicare work with Indian Health Service care?",
        answer:
          "Eligible beneficiaries can have both Medicare and IHS access. Coordination depends on where care is received, referrals, eligibility, and the Medicare coverage chosen. Ask IHS and the plan about your specific care path.",
      },
      {
        question: "Should I include Redmond and Bend providers in a Madras plan review?",
        answer:
          "Yes, if you use or expect to use them. Check every specialist, facility, referral rule, and related service before enrolling.",
      },
    ],
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return centralOregonCities.find((city) => city.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return centralOregonCities.map((city) => city.slug);
}

export function getLocalMedicarePath(slug: string): string {
  return `/medicare-${slug}`;
}

export function getAllLocalMedicarePaths(): string[] {
  return centralOregonCities.map((city) => getLocalMedicarePath(city.slug));
}
