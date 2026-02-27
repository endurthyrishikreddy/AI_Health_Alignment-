import Section from './ui/Section';
import { X, Check } from 'lucide-react';

export default function AIRole() {
  return (
    <Section id="ai-role" className="bg-white">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <div>
            <h2 className="text-sky-500 font-bold tracking-wide uppercase text-sm mb-2">AI's Role</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Assistant, Not Replacement
            </h3>
            <p className="text-slate-500 text-lg leading-relaxed">
              Our philosophy: AI gives clinicians superpowers. It doesn't take their jobs.
              Every report is reviewed and approved by a licensed clinician.
            </p>
          </div>
          
          <div className="bg-slate-500 rounded-2xl p-8 shadow-lg text-white">
            <h4 className="font-bold text-lg mb-6">Aligned with Federal AI Guidance</h4>
            <ul className="space-y-4 text-slate-100 text-sm">
              <li className="flex gap-3 items-start">
                <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 shrink-0"></div>
                <span><strong className="text-white">VA AI Strategy:</strong> High-impact AI that enhances, not replaces, clinical judgment.</span>
              </li>
              <li className="flex gap-3 items-start">
                <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 shrink-0"></div>
                <span><strong className="text-white">HHS Trustworthy AI:</strong> Transparency, safety, and human oversight.</span>
              </li>
              <li className="flex gap-3 items-start">
                <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 shrink-0"></div>
                <span><strong className="text-white">AMA Guidelines:</strong> AI must complement physician decision-making.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid gap-6">
          {/* What AI Does NOT Do */}
          <div className="bg-red-50 border border-red-100 rounded-2xl p-8">
            <h4 className="text-red-600 font-bold mb-6 flex items-center gap-3 text-lg">
              <X className="w-6 h-6" /> What AI Does NOT Do
            </h4>
            <ul className="space-y-4">
              {['Diagnose medical conditions', 'Prescribe medications', 'Make clinical decisions independently', 'Replace physician judgment'].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-red-400 font-medium">
                  <X className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What AI DOES Do */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8">
            <h4 className="text-emerald-600 font-bold mb-6 flex items-center gap-3 text-lg">
              <Check className="w-6 h-6" /> What AI DOES Do
            </h4>
            <ul className="space-y-4">
              {[
                'Organizes complex lab data into visual summaries', 
                'Highlights patterns and risk areas for review', 
                'Drafts patient-friendly explanations',
                'Suggests evidence-based interventions',
                'Tracks changes over time'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-emerald-400 font-medium">
                  <Check className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
