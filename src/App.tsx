import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import HowItWorks from './components/HowItWorks';
import AIRole from './components/AIRole';
import Benefits from './components/Benefits';
import Pilot from './components/Pilot';
import Needs from './components/Needs';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="font-sans text-slate-900 bg-white selection:bg-sky-200 selection:text-sky-900">
      {showAdmin ? (
        <AdminDashboard onClose={() => setShowAdmin(false)} />
      ) : (
        <>
          <Navbar />
          <Hero />
          <Problem />
          <Solution />
          <HowItWorks />
          <AIRole />
          <Benefits />
          <Pilot />
          <Needs />
          <FAQ />
          <Contact />
          <Footer onAdminClick={() => setShowAdmin(true)} />
        </>
      )}
    </div>
  );
}
