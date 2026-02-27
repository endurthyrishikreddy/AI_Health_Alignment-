import Section from './ui/Section';
import { FlaskConical, ShieldCheck, BrainCircuit, Stethoscope, FileOutput } from 'lucide-react';

const steps = [
  {
    icon: FlaskConical,
    title: "Step 1: Lab Draw & Intake",
    description: "Standard lab panel collected at existing VA/clinic facilities. Brief questionnaire on lifestyle, symptoms, and medications."
  },
  {
    icon: ShieldCheck,
    title: "Step 2: Secure Data Import",
    description: "Encrypted, compliant transmission of lab results. HIPAA/VA security standards enforced. HL7/FHIR integration."
  },
  {
    icon: BrainCircuit,
    title: "Step 3: AI Analysis",
    description: "AI applies clinical logic and thresholds. Identifies deficiencies, risk combinations, and trends over time."
  },
  {
    icon: Stethoscope,
    title: "Step 4: Clinician Review",
    description: "Doctor/nurse reviews draft. Can edit any recommendation or override AI. Must approve before patient sees it.",
    highlight: true
  },
  {
    icon: FileOutput,
    title: "Step 5: Patient Report",
    description: "Patient receives clear, jargon-free report. Automated reminders for follow-up labs and check-ins."
  }
];

export default function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-slate-50">
      <div className="text-center mb-16">
        <h2 className="text-sky-600 font-semibold tracking-wide uppercase text-sm mb-2">Process</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
          How the Program Works
        </h3>
      </div>

      <div className="relative">
        {/* Vertical Line for Desktop */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-slate-200"></div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Content Side */}
              <div className="flex-1 w-full md:w-1/2 p-4">
                <div className={`bg-white p-6 rounded-2xl shadow-sm border ${step.highlight ? 'border-sky-200 ring-4 ring-sky-50' : 'border-slate-100'} text-center md:text-left`}>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h4>
                  <p className="text-slate-600">{step.description}</p>
                  {step.highlight && (
                    <span className="inline-block mt-3 text-xs font-bold text-sky-600 bg-sky-50 px-2 py-1 rounded uppercase tracking-wider">
                      Critical Checkpoint
                    </span>
                  )}
                </div>
              </div>

              {/* Icon Center */}
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-slate-100 z-10 shadow-sm">
                <step.icon className={`w-5 h-5 ${step.highlight ? 'text-sky-600' : 'text-slate-400'}`} />
              </div>

              {/* Empty Side for Balance */}
              <div className="flex-1 w-full md:w-1/2 p-4 hidden md:block"></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-lg font-medium text-slate-900">
          AI assists. Clinician decides. <span className="text-sky-600 font-bold">Always.</span>
        </p>
      </div>
    </Section>
  );
}
