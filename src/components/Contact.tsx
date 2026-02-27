import { useState } from 'react';
import Section from './ui/Section';
import { Mail, MapPin, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    role: 'Clinician (MD, DO, NP, PA)',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      setFormData({
        name: '',
        organization: '',
        role: 'Clinician (MD, DO, NP, PA)',
        email: '',
        message: ''
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
    }
  };

  return (
    <Section id="contact" className="bg-white">
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-sky-600 font-semibold tracking-wide uppercase text-sm mb-2">Get Involved</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Interested in piloting the program?
          </h3>
          <p className="text-lg text-slate-600 mb-8">
            We're actively seeking clinical partners for our 2026 pilot program. 
            Reach out to discuss partnership opportunities.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-sky-50 p-3 rounded-lg text-sky-600">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Contact Us</h4>
                <p className="text-slate-600">954-669-4300</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-sky-50 p-3 rounded-lg text-sky-600">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Location</h4>
                <p className="text-slate-600">
                  7050 WEST PALMETTO PARKWAY<br />
                  R15 SUITE 382<br />
                  BOCA RATON, FLORIDA 33434
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100">
              <h4 className="font-bold text-slate-900 mb-2">Program Lead</h4>
              <p className="text-slate-800 font-medium">Bernard Butler</p>
              <p className="text-slate-500 text-sm">Health Alignment Program</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
              <p className="text-slate-600 mb-6">Thank you for your interest. We'll be in touch shortly.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="text-sky-600 font-medium hover:text-sky-700 underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              {status === 'error' && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-start gap-3 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>{errorMessage}</p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none" 
                  placeholder="Dr. Jane Doe" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Organization</label>
                <input 
                  type="text" 
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none" 
                  placeholder="VA Medical Center" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                <select 
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none bg-white"
                >
                  <option>Clinician (MD, DO, NP, PA)</option>
                  <option>Administrator / Program Director</option>
                  <option>Researcher / Academic</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none" 
                  placeholder="jane@example.com" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4} 
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none" 
                  placeholder="I'm interested in the pilot program..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-sky-600/20 flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
