import Section from './ui/Section';
import { Rocket, Target, BarChart3, Users } from 'lucide-react';

export default function Pilot() {
  return (
    <Section id="pilot" className="bg-slate-50">
      <div className="text-center mb-16">
        <h2 className="text-sky-600 font-semibold tracking-wide uppercase text-sm mb-2">Pilot Program</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Where We Are Now
        </h3>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Preparing pilot proposal and clinical validation. Targeted launch Q2 2026.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Structure Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 col-span-1 lg:col-span-2">
          <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-sky-500" />
            Proposed Pilot Structure
          </h4>
          
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h5 className="font-semibold text-slate-700 mb-3 text-sm uppercase tracking-wide">Participants</h5>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2"><Users className="w-4 h-4 text-slate-400" /> 1,000–2,500 veterans/seniors</li>
                <li className="flex items-center gap-2"><Users className="w-4 h-4 text-slate-400" /> Focus on risk factors</li>
                <li className="flex items-center gap-2"><Users className="w-4 h-4 text-slate-400" /> Mix of VA & non-VA settings</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-slate-700 mb-3 text-sm uppercase tracking-wide">Duration & Pricing</h5>
              <ul className="space-y-2 text-slate-600">
                <li>3–6 months initial pilot</li>
                <li>Follow-ups at 8, 12, 24 weeks</li>
                <li>~$100–150 per participant/year</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-100">
             <h5 className="font-semibold text-slate-700 mb-3 text-sm uppercase tracking-wide">Scale Potential</h5>
             <div className="flex flex-col sm:flex-row gap-4 text-sm">
                <div className="flex-1 bg-slate-50 p-3 rounded border border-slate-100">
                  <span className="block font-bold text-slate-900">Phase 1</span>
                  <span className="text-slate-500">2,500 Users</span>
                </div>
                <div className="flex-1 bg-slate-50 p-3 rounded border border-slate-100">
                  <span className="block font-bold text-slate-900">Phase 2</span>
                  <span className="text-slate-500">10,000 Users</span>
                </div>
                <div className="flex-1 bg-sky-50 p-3 rounded border border-sky-100">
                  <span className="block font-bold text-sky-700">Phase 3</span>
                  <span className="text-sky-600">20,000+ Users</span>
                </div>
             </div>
          </div>
        </div>

        {/* Metrics Card */}
        <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg">
          <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-sky-400" />
            What We'll Measure
          </h4>
          <div className="space-y-6">
            <div>
              <h5 className="font-semibold text-sky-400 mb-1">Clinical Outcomes</h5>
              <p className="text-slate-300 text-sm">Lab value improvements, reduction in acute events, QoL scores.</p>
            </div>
            <div>
              <h5 className="font-semibold text-sky-400 mb-1">Clinician Impact</h5>
              <p className="text-slate-300 text-sm">Time saved, satisfaction, override rates.</p>
            </div>
            <div>
              <h5 className="font-semibold text-sky-400 mb-1">Patient Engagement</h5>
              <p className="text-slate-300 text-sm">Report comprehension, adherence, follow-up completion.</p>
            </div>
            <div>
              <h5 className="font-semibold text-sky-400 mb-1">Economics</h5>
              <p className="text-slate-300 text-sm">Cost per user vs. healthcare savings.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-sky-50 border border-sky-100 rounded-xl p-6 text-center max-w-4xl mx-auto">
        <Rocket className="w-8 h-8 text-sky-600 mx-auto mb-3" />
        <p className="text-slate-700 font-medium">
          With 200,000+ veterans potentially eligible for this type of proactive care, the long-term opportunity is substantial.
        </p>
      </div>
    </Section>
  );
}
