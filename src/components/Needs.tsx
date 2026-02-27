import Section from './ui/Section';
import { Stethoscope, Building } from 'lucide-react';

export default function Needs() {
  return (
    <Section id="needs">
      <div className="text-center mb-16">
        <h2 className="text-sky-600 font-semibold tracking-wide uppercase text-sm mb-2">Partnership</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          What We Need from Partners
        </h3>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          To build a system that truly serves clinicians and patients, we need your input.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Clinicians */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-sky-100 rounded-lg text-sky-600">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h4 className="text-2xl font-bold text-slate-900">From Clinicians</h4>
          </div>
          <ul className="space-y-4">
            <li className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <strong className="block text-slate-900 mb-1">Clinical Workflow Insights</strong>
              <p className="text-slate-600 text-sm">How you currently read labs, decision rules used, and pain points.</p>
            </li>
            <li className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <strong className="block text-slate-900 mb-1">Priority Biomarkers</strong>
              <p className="text-slate-600 text-sm">Which values matter most and what ranges trigger intervention.</p>
            </li>
            <li className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <strong className="block text-slate-900 mb-1">De-Identified Training Data</strong>
              <p className="text-slate-600 text-sm">Historical lab panels with recommendations to train the model.</p>
            </li>
          </ul>
        </div>

        {/* VA & Partners */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-slate-100 rounded-lg text-slate-600">
              <Building className="w-6 h-6" />
            </div>
            <h4 className="text-2xl font-bold text-slate-900">From VA & HHS Partners</h4>
          </div>
          <ul className="space-y-4">
            <li className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <strong className="block text-slate-900 mb-1">Pilot Site Selection</strong>
              <p className="text-slate-600 text-sm">Agreement on facilities, patient cohorts, and governance.</p>
            </li>
            <li className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <strong className="block text-slate-900 mb-1">Data Access & Security</strong>
              <p className="text-slate-600 text-sm">Secure sharing agreements, HIPAA/VA compliance frameworks.</p>
            </li>
            <li className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <strong className="block text-slate-900 mb-1">Success Metrics</strong>
              <p className="text-slate-600 text-sm">Aligned definitions of success and reporting requirements.</p>
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
