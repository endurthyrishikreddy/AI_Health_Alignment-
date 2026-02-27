import Section from './ui/Section';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export default function Solution() {
  return (
    <Section id="solution">
      <div className="text-center mb-16">
        <h2 className="text-sky-600 font-semibold tracking-wide uppercase text-sm mb-2">Our Solution</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          We turn complex lab data into <br /> simple, personalized health roadmaps.
        </h3>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: The Process */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="bg-sky-100 text-sky-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
              Ingests Comprehensive Data
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-slate-600 text-sm pl-10">
              <li>• Vitamins D, C, B12, A, E</li>
              <li>• Lipid panel</li>
              <li>• A1C (Diabetes)</li>
              <li>• Blood pressure, BMI</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="bg-sky-100 text-sky-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
              Builds Biopsychosocial Profile
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-slate-600 text-sm pl-10">
              <li>• Lab results</li>
              <li>• Lifestyle questionnaire</li>
              <li>• Existing conditions</li>
              <li>• Demographics & risk</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="bg-sky-100 text-sky-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
              Generates Actionable Outputs
            </h4>
            <ul className="space-y-2 text-slate-600 text-sm pl-10">
              <li>• One-page "traffic light" summary</li>
              <li>• Prioritized action plan (Diet, Supplements)</li>
              <li>• Follow-up schedule & timeline</li>
              <li className="font-medium text-sky-700">• Clinician reviews and approves everything</li>
            </ul>
          </div>
        </div>

        {/* Right: Example Report */}
        <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-end mb-6 border-b border-slate-700 pb-4">
              <div>
                <h4 className="text-xl font-bold">Health Snapshot</h4>
                <p className="text-slate-400 text-sm">Patient: John D. (Veteran, Age 62)</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 uppercase tracking-wider">Status</span>
                <p className="text-amber-400 font-medium">Needs Attention</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Row 1: Deficient */}
              <div className="bg-slate-800/50 p-4 rounded-xl border-l-4 border-red-500">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-500" />
                    <span className="font-semibold">Vitamin D</span>
                  </div>
                  <span className="text-red-400 text-sm font-mono">18 ng/mL</span>
                </div>
                <p className="text-xs text-slate-400 mb-2">Target: 30+ ng/mL</p>
                <div className="bg-red-500/10 text-red-200 text-sm p-2 rounded">
                  <strong>Action:</strong> 2,000 IU daily supplement + 15 min morning sun
                </div>
              </div>

              {/* Row 2: High */}
              <div className="bg-slate-800/50 p-4 rounded-xl border-l-4 border-amber-500">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <span className="font-semibold">LDL Cholesterol</span>
                  </div>
                  <span className="text-amber-400 text-sm font-mono">160 mg/dL</span>
                </div>
                <p className="text-xs text-slate-400 mb-2">Target: &lt;100 mg/dL</p>
                <div className="bg-amber-500/10 text-amber-200 text-sm p-2 rounded">
                  <strong>Action:</strong> Reduce saturated fat, add oats/beans, retest in 8 weeks
                </div>
              </div>

              {/* Row 3: Normal */}
              <div className="bg-slate-800/50 p-4 rounded-xl border-l-4 border-green-500">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-semibold">A1C (Diabetes)</span>
                  </div>
                  <span className="text-green-400 text-sm font-mono">5.4%</span>
                </div>
                <p className="text-xs text-slate-400 mb-2">Target: &lt;5.7%</p>
                <div className="bg-green-500/10 text-green-200 text-sm p-2 rounded">
                  <strong>Action:</strong> Continue current diet, recheck annually
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700">
              <h5 className="text-sm font-semibold text-slate-300 mb-3">John's Timeline</h5>
              <div className="flex justify-between text-xs text-slate-400">
                <div className="text-center">
                  <div className="w-2 h-2 bg-sky-500 rounded-full mx-auto mb-1"></div>
                  Week 1-4<br/>Start Plan
                </div>
                <div className="text-center">
                  <div className="w-2 h-2 bg-slate-600 rounded-full mx-auto mb-1"></div>
                  Week 8<br/>Retest Lipids
                </div>
                <div className="text-center">
                  <div className="w-2 h-2 bg-slate-600 rounded-full mx-auto mb-1"></div>
                  Week 12<br/>Retest Vit D
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
