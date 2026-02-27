import Section from './ui/Section';
import { User, Stethoscope, Building2 } from 'lucide-react';

const stakeholders = [
  {
    icon: User,
    title: "Veterans & Seniors",
    benefits: [
      { title: "Clear Health Picture", desc: "No more confusing lab numbers. See exactly what's normal and what needs attention." },
      { title: "Specific Action Steps", desc: "Concrete steps: 'Add 1 cup of oats daily' instead of vague 'eat healthier' advice." },
      { title: "Focus on Quality of Life", desc: "The goal isn't just living longer — it's living better, with energy and independence." }
    ]
  },
  {
    icon: Stethoscope,
    title: "Clinicians",
    benefits: [
      { title: "Time Savings", desc: "AI-generated summaries reduce documentation time and prep work before visits." },
      { title: "Prioritized Flags", desc: "Critical values and concerning patterns automatically highlighted." },
      { title: "Care Coordination", desc: "Same health picture shared across primary care, specialists, and patient." }
    ]
  },
  {
    icon: Building2,
    title: "VA / Administrators",
    benefits: [
      { title: "Cost-Effective Prevention", desc: "Proactive interventions are far cheaper than treating advanced chronic disease." },
      { title: "Scalable Solution", desc: "Can serve thousands of veterans with minimal per-user cost increase." },
      { title: "Data-Driven Insights", desc: "De-identified dashboards showing population deficiencies and intervention effectiveness." }
    ]
  }
];

export default function Benefits() {
  return (
    <Section id="benefits">
      <div className="text-center mb-16">
        <h2 className="text-sky-600 font-semibold tracking-wide uppercase text-sm mb-2">Benefits</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
          What Each Stakeholder Gets
        </h3>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {stakeholders.map((stakeholder, index) => (
          <div key={index} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-sky-400 hover:shadow-lg hover:shadow-sky-100/50 transition-all duration-300 group">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-sky-600 group-hover:scale-110 group-hover:bg-sky-50 transition-all duration-300">
              <stakeholder.icon className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-6">{stakeholder.title}</h4>
            <div className="space-y-6">
              {stakeholder.benefits.map((benefit, i) => (
                <div key={i}>
                  <h5 className="font-semibold text-slate-800 mb-1">{benefit.title}</h5>
                  <p className="text-sm text-slate-600 leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
