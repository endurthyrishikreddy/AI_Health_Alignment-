import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import VideoModal from './components/VideoModal';
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
import AdminPage from './pages/AdminPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    // Listen to hash changes
    const handleHashChange = () => {
      let hash = window.location.hash.slice(1) || 'home';
      // Remove leading slash if present (e.g., "/admin" -> "admin")
      hash = hash.replace(/^\//, '');
      setCurrentPage(hash);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentPage === 'admin') {
    return <AdminPage />;
  }

  return (
    <div className="font-sans text-slate-900 bg-white selection:bg-sky-200 selection:text-sky-900">
      <Navbar onVideoClick={() => setIsVideoOpen(true)} />
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
      <Hero onVideoClick={() => setIsVideoOpen(true)} />
      <Problem />
      <Solution />
      <HowItWorks />
      <AIRole />
      <Benefits />
      <Pilot />
      <Needs />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
