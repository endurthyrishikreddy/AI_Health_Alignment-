import React, { useState, useEffect } from 'react';
import { Loader2, LogOut, RefreshCw } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  organization: string;
  role: string;
  email: string;
  message: string;
  created_at: string;
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  // Check if already logged in by checking localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      setIsLoggedIn(true);
      setToken(savedToken);
      fetchContacts(savedToken);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Save token to localStorage
      localStorage.setItem('adminToken', data.token);
      setToken(data.token);
      setIsLoggedIn(true);
      setPassword('');
      
      // Fetch contacts after login
      fetchContacts(data.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const fetchContacts = async (authToken: string) => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('/api/contacts', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }

      const data = await response.json();
      setContacts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setToken('');
    setContacts([]);
    setPassword('');
  };

  const handleRefresh = () => {
    if (token) {
      fetchContacts(token);
    }
  };

  const goHome = () => {
    window.location.hash = '#home';
  };

  // Login Page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-slate-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Login</h1>
              <p className="text-slate-600">Enter your password to access the dashboard</p>
            </div>

            {error && (
              <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                  Admin Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  disabled={loading}
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={loading || !password}
                className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
              <button
                onClick={goHome}
                className="w-full text-center px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                ← Back to Home
              </button>
              <p className="text-center text-xs text-slate-500">
                Default password: admin123
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Page
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
              <p className="text-sm text-slate-500">View and manage contact submissions</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
                title="Refresh"
              >
                <RefreshCw className={`w-5 h-5 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && contacts.length === 0 ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
            {error}
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="mb-8">
              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-sky-500">
                <p className="text-sm text-slate-600">Total Submissions</p>
                <p className="text-3xl font-bold text-slate-900">{contacts.length}</p>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow overflow-hidden border border-slate-200">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-6 py-4 text-left font-semibold text-slate-900">Date</th>
                      <th className="px-6 py-4 text-left font-semibold text-slate-900">Name</th>
                      <th className="px-6 py-4 text-left font-semibold text-slate-900">Email</th>
                      <th className="px-6 py-4 text-left font-semibold text-slate-900">Role</th>
                      <th className="px-6 py-4 text-left font-semibold text-slate-900">Organization</th>
                      <th className="px-6 py-4 text-left font-semibold text-slate-900">Message</th>
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
                        <tr key={contact.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4 text-slate-500 whitespace-nowrap text-xs">
                            {new Date(contact.created_at).toLocaleDateString()} {new Date(contact.created_at).toLocaleTimeString()}
                          </td>
                          <td className="px-6 py-4 font-medium text-slate-900">{contact.name}</td>
                          <td className="px-6 py-4 text-slate-600 truncate">
                            <a href={`mailto:${contact.email}`} className="text-sky-600 hover:underline">
                              {contact.email}
                            </a>
                          </td>
                          <td className="px-6 py-4 text-slate-600 text-sm">{contact.role}</td>
                          <td className="px-6 py-4 text-slate-600 text-sm">{contact.organization || '-'}</td>
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
          </>
        )}
      </div>
    </div>
  );
}
