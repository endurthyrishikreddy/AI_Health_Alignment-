export default function Footer() {
  const handleAdminLink = () => {
    window.location.hash = '#admin';
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 text-white font-bold text-xl tracking-tight mb-4">
              <img src="/logo.png" alt="Apogee AI Media Logo" className="h-10 w-auto" />
              <span>APOGEE AI MEDIA</span>
            </div>
            <p className="text-sm leading-relaxed max-w-md mb-4">
              The AI-Enabled Health Alignment Program is designed to help veterans, seniors, and the clinicians who serve them achieve better health outcomes through proactive, personalized care.
            </p>
            <div className="text-sm text-slate-400 space-y-1">
              <p>7050 WEST PALMETTO PARKWAY</p>
              <p>R15 SUITE 382</p>
              <p>BOCA RATON, FLORIDA 33434</p>
              <p>954-669-4300</p>
            </div>
            <p className="mt-4 text-sky-400 font-medium">
              Our Mission: Quality of life, not just length of life.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Program Overview (PDF)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sample Health Report</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Clinical Questions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">VA AI Strategy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
              <li><a href="#" className="hover:text-white transition-colors">HIPAA Compliance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessibility</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2026 APOGEE AI MEDIA. All rights reserved.</p>
          <div className="mt-2 md:mt-0 flex items-center gap-4">
            <p>Designed for Veterans & Seniors</p>
            <button
              onClick={handleAdminLink}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors opacity-50 hover:opacity-100"
              title="Admin Dashboard"
            >
              ⚙
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
