import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  dark?: boolean;
}

export default function Section({ id, className = "", children, dark = false }: SectionProps) {
  return (
    <section 
      id={id} 
      className={`py-20 px-4 sm:px-6 lg:px-8 ${dark ? 'bg-slate-50' : 'bg-white'} ${className}`}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  );
}
