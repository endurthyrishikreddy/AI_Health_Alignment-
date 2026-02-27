import { useState, useEffect } from 'react';
import Section from './ui/Section';
import { Loader2, Table, X } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  organization: string;
  role: string;
  email: string;
  message: string;
  created_at: string;
}

interface AdminDashboardProps {
  onClose: () => void;
}

export default function AdminDashboard({ onClose }: AdminDashboardProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contacts');
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setContacts(data);
    } catch (err) {
      setError('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Admin Dashboard</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            {error}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-slate-900">Date</th>
                    <th className="px-6 py-4 font-semibold text-slate-900">Name</th>
                    <th className="px-6 py-4 font-semibold text-slate-900">Role</th>
                    <th className="px-6 py-4 font-semibold text-slate-900">Organization</th>
                    <th className="px-6 py-4 font-semibold text-slate-900">Email</th>
                    <th className="px-6 py-4 font-semibold text-slate-900">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {contacts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                        No submissions yet.
                      </td>
                    </tr>
                  ) : (
                    contacts.map((contact) => (
                      <tr key={contact.id} className="hover:bg-slate-50/50">
                        <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                          {new Date(contact.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-900">{contact.name}</td>
                        <td className="px-6 py-4 text-slate-600">{contact.role}</td>
                        <td className="px-6 py-4 text-slate-600">{contact.organization || '-'}</td>
                        <td className="px-6 py-4 text-slate-600">{contact.email}</td>
                        <td className="px-6 py-4 text-slate-600 max-w-xs truncate" title={contact.message}>
                          {contact.message}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
