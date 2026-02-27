import { useState } from 'react';
import Section from './ui/Section';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    question: "Is this replacing doctors?",
    answer: "No. AI assists clinicians by organizing data and drafting reports, but every output is reviewed and approved by a licensed clinician before reaching the patient. Doctors maintain full control and can override any suggestion."
  },
  {
    question: "How do you protect patient data?",
    answer: "All data transmission and storage meets HIPAA and VA security standards. We use encrypted channels, access controls, and audit logging. De-identified data used for AI training has all personal identifiers removed."
  },
  {
    question: "Which patients are a good fit?",
    answer: "Best candidates are veterans and seniors with known vitamin deficiencies, chronic conditions, or those at risk for metabolic issues. It is not designed for acute emergencies."
  },
  {
    question: "Can this integrate with my existing EHR system?",
    answer: "Yes. We support HL7 and FHIR standards for lab data import, API integration with major EHR platforms (Epic, Cerner, VA VistA), and manual upload options."
  },
  {
    question: "What if the AI makes a mistake?",
    answer: "Multiple safeguards exist: Clinician review of every report, critical value flags, override capabilities, and audit trails. Clinical responsibility remains with the provider."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" className="bg-slate-50">
      <div className="text-center mb-16">
        <h2 className="text-sky-600 font-semibold tracking-wide uppercase text-sm mb-2">FAQ</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
          Frequently Asked Questions
        </h3>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center p-6 text-left hover:bg-slate-50 transition-colors"
            >
              <span className="font-semibold text-slate-900">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              )}
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
}
