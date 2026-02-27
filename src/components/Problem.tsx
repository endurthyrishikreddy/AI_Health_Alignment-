import Section from './ui/Section';
import { AlertCircle, FileWarning, Activity, Clock } from 'lucide-react';

const problems = [
  {
    icon: FileWarning,
    title: "No Clear Patient Roadmap",
    description: "Lab results and vitals are rarely translated into a written, actionable plan patients can understand and follow over time.",
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-t-sky-500"
  },
  {
    icon: Activity,
    title: "Clinician Overload",
    description: "Documentation burdens and fragmented workflows leave little time for meaningful preventive conversations with patients.",
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-t-sky-500"
  },
  {
    icon: AlertCircle,
    title: "Common Deficiencies Unmanaged",
    description: "Vitamin D, B12, cholesterol imbalances, and pre-diabetic markers are frequently missed or deprioritized until they become serious.",
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-t-sky-500"
  },
  {
    icon: Clock,
    title: "Living Longer, Not Better",
    description: "The veteran and senior population is growing rapidly. Healthcare systems must shift from reactive treatment to proactive health maintenance.",
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-t-sky-500"
  }
];

export default function Problem() {
  return (
    <Section id="problem" className="bg-slate-50">
      <div className="text-center mb-16">
        <h2 className="text-sky-600 font-semibold tracking-wide uppercase text-sm mb-2">Why This Matters</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Veterans and seniors deserve better than <br /> fragmented, reactive care.
        </h3>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          The Problem: People get numbers. They don't get answers. They don't get a plan.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {problems.map((item, index) => (
          <div key={index} className={`bg-white p-8 rounded-2xl shadow-sm border border-slate-100 border-t-4 ${item.border} hover:shadow-md transition-all duration-300 group`}>
            <div className={`p-3 rounded-lg w-fit mb-6 ${item.bg} ${item.color} group-hover:scale-110 transition-transform duration-300`}>
              <item.icon className="h-8 w-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
            <p className="text-slate-600 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
