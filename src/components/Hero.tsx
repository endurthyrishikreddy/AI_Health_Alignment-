import { motion } from 'motion/react';
import { ArrowRight, FileText } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden pt-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 z-0" />
      
      {/* Abstract Shapes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-sky-900/30 border border-sky-700/50 text-sky-400 text-sm font-medium mb-6">
            Pilot Program Launching Q2 2026
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
            AI-Enabled Health Alignment for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
              Veterans and Seniors
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Turning routine lab results into clear, clinician-approved health roadmaps — improving quality of life, not just length of life.
            <br className="hidden md:block" /> Designed for veterans, seniors, and the clinicians who care for them.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#how-it-works" 
              className="w-full sm:w-auto px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"
            >
              View How It Works
              <ArrowRight className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="w-full sm:w-auto px-8 py-4 bg-slate-800/80 hover:bg-slate-800 text-white border border-slate-700 hover:border-sky-400 hover:text-sky-400 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <FileText className="h-5 w-5 text-slate-400 group-hover:text-sky-400 transition-colors" />
              Download Overview (PDF)
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-sky-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
