interface Benefit {
  title: string;
  body: string;
  icon: string;
}

interface TrustBenefitsProps {
  heading?: string;
  subheading?: string;
  items?: Benefit[];
}

const defaultItems: Benefit[] = [
  {
    icon: "📍",
    title: "Local Medicare Guidance",
    body: "Scott Lewis is local to Bend and helps residents across Central Oregon check plan availability, providers, prescriptions, and costs.",
  },
  {
    icon: "🗂️",
    title: "Multiple Carrier Options",
    body: "As a licensed independent insurance agency, we help compare the available options the agency is authorized to represent in your area.",
  },
  {
    icon: "📅",
    title: "Year-Round Support",
    body: "Questions can arise after enrollment. Contact the agency during the year for plan-service questions and Annual Enrollment reviews.",
  },
  {
    icon: "👥",
    title: "Personalized Plan Reviews",
    body: "We sit down with your doctors, prescriptions, and budget to help you find coverage that fits your needs — at your own pace, with no pressure.",
  },
];

export default function TrustBenefits({
  heading = "How We Help Central Oregon Residents",
  subheading = "Independent guidance from a licensed local agency serving Bend and Central Oregon.",
  items = defaultItems,
}: TrustBenefitsProps) {
  return (
    <section className="py-20 px-4 bg-slate-50 border-y border-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="inline-block text-blue-700 text-sm font-semibold uppercase tracking-wider mb-3">
            Trust &amp; Local Experience
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{heading}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">{subheading}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-7 border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-blue-300 transition-all"
            >
              <div className="text-4xl mb-4" aria-hidden="true">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
