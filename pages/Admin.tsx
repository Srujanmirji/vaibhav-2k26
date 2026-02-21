import React, { useEffect, useMemo, useState } from 'react';
import { GOOGLE_CLIENT_ID, ADMIN_ALLOWED_EMAILS } from '../constants';
import { getAllRegistrationsForAdmin } from '../services/googleSheets';
import { clearAuthToken, getAuthUserFromToken, getStoredAuthUser, persistAuthToken, type AuthUser } from '../services/authSession';
import { AlertCircle, Loader2, LogOut, Shield, Users, RefreshCcw } from 'lucide-react';
import type { AdminRegistrationRecord } from '../types';

declare const google: any;

const normalizedAllowedEmails = ADMIN_ALLOWED_EMAILS.map((email) => email.trim().toLowerCase());

const Admin: React.FC = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [rows, setRows] = useState<AdminRegistrationRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');

  const isAuthorized = !!user && normalizedAllowedEmails.includes((user.email || '').toLowerCase());

  const handleCredentialResponse = (response: any) => {
    const authUser = getAuthUserFromToken(response.credential);
    if (!authUser) {
      return;
    }

    persistAuthToken(response.credential);
    setUser(authUser);
    setMessage('');
  };

  const handleSignOut = () => {
    clearAuthToken();
    setUser(null);
    setRows([]);
    setMessage('');
  };

  const fetchAllRegistrations = async (adminEmail: string, forceRefresh = false) => {
    setLoading(true);
    setMessage('');

    const response = await getAllRegistrationsForAdmin(adminEmail, forceRefresh);
    setLoading(false);

    if (response.status === 'success') {
      setRows(response.data || []);
      if (!response.data || response.data.length === 0) {
        setMessage('No registrations found.');
      }
      return;
    }

    setRows([]);
    setMessage(response.message || 'Failed to load registrations.');
  };

  const handleRefresh = () => {
    if (user && isAuthorized) {
      fetchAllRegistrations(user.email, true);
    }
  };

  useEffect(() => {
    const storedUser = getStoredAuthUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    const renderGoogleButton = () => {
      const buttonContainer = document.getElementById('googleSignInDivAdmin');
      if (typeof google === 'undefined' || !buttonContainer) {
        return;
      }

      try {
        const buttonWidth = Math.min(Math.max(buttonContainer.clientWidth || 260, 220), 420);
        buttonContainer.innerHTML = '';
        google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });
        google.accounts.id.renderButton(buttonContainer, {
          theme: 'filled_black',
          size: 'large',
          width: buttonWidth,
          text: 'continue_with',
        });
      } catch (error) {
        console.error('Google Sign In Error:', error);
      }
    };

    if (user) {
      return;
    }

    if (typeof google !== 'undefined') {
      renderGoogleButton();
      return;
    }

    const interval = setInterval(() => {
      if (typeof google !== 'undefined') {
        renderGoogleButton();
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    if (!user || !isAuthorized) {
      return;
    }
    fetchAllRegistrations(user.email);
  }, [user, isAuthorized]);

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return rows;
    }

    return rows.filter((row) =>
      [row.fullName, row.email, row.eventTitle, row.college, row.department]
        .join(' ')
        .toLowerCase()
        .includes(query)
    );
  }, [rows, search]);

  return (
    <div className="pt-24 min-h-screen bg-darker px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white font-mono tracking-tighter uppercase flex items-center gap-3">
              <Shield className="w-9 h-9 text-primary" /> Admin Panel
            </h1>
            <p className="text-gray-400 mt-2">View all registered users across events.</p>
          </div>
          {user && (
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:border-primary/40 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          )}
        </div>

        {!user && (
          <div className="bg-card/60 border border-white/10 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Admin Login Required</h2>
            <p className="text-gray-400 mb-6">Sign in with an allowed admin Google account.</p>
            <div id="googleSignInDivAdmin" className="h-[44px] w-full max-w-[280px] mx-auto" />
          </div>
        )}

        {user && !isAuthorized && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8">
            <div className="flex items-center gap-3 text-red-300">
              <AlertCircle className="w-5 h-5" />
              <p className="font-semibold">Access denied for `{user.email}`.</p>
            </div>
            <p className="text-red-200/80 mt-3 text-sm">This page is restricted to allowed admin emails only.</p>
          </div>
        )}

        {user && isAuthorized && (
          <div className="bg-card/40 border border-white/10 rounded-2xl p-4 sm:p-6">
            <div className="mb-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2 text-white">
                  <Users className="w-5 h-5 text-secondary" />
                  <span className="font-bold">Total Records: {filteredRows.length}</span>
                </div>
                <button
                  onClick={handleRefresh}
                  disabled={loading}
                  className="inline-flex items-center justify-center w-fit p-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
                  title="Refresh Data"
                >
                  <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, event..."
                className="w-full lg:w-80 bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary"
              />
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : (
              <>
                <div className="space-y-4 md:hidden">
                  {filteredRows.map((row, index) => {
                    const details = [
                      { label: 'Phone', value: row.phone },
                      { label: 'College', value: row.college },
                      { label: 'Branch', value: row.department },
                      { label: 'Year', value: row.year },
                      { label: 'Event Date', value: row.eventDate },
                      { label: 'Timestamp', value: row.timestamp },
                    ];

                    return (
                      <article
                        key={`${row.email}-${row.eventId}-${index}`}
                        className="rounded-xl border border-white/10 bg-black/30 p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-white">{row.fullName || '-'}</p>
                            <p className="text-xs text-secondary break-all">{row.email || '-'}</p>
                          </div>
                          <span className="shrink-0 rounded-md border border-primary/40 bg-primary/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary text-right">
                            {row.eventTitle || '-'}
                          </span>
                        </div>
                        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                          {details.map((detail) => (
                            <div key={detail.label} className="min-w-0">
                              <dt className="text-gray-500 uppercase tracking-wide">{detail.label}</dt>
                              <dd className="text-gray-200 break-words">{detail.value || '-'}</dd>
                            </div>
                          ))}
                        </dl>
                      </article>
                    );
                  })}
                </div>

                <div className="hidden md:block overflow-x-auto border border-white/10 rounded-xl">
                  <table className="min-w-full text-sm">
                    <thead className="bg-black/40">
                      <tr className="text-left text-gray-300">
                        <th className="px-4 py-3">Timestamp</th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">Phone</th>
                        <th className="px-4 py-3">College</th>
                        <th className="px-4 py-3">Department</th>
                        <th className="px-4 py-3">Year</th>
                        <th className="px-4 py-3">Event</th>
                        <th className="px-4 py-3">Event Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRows.map((row, index) => (
                        <tr key={`${row.email}-${row.eventId}-${index}`} className="border-t border-white/5 text-gray-200">
                          <td className="px-4 py-3 whitespace-nowrap">{row.timestamp || '-'}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{row.fullName || '-'}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{row.email || '-'}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{row.phone || '-'}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{row.college || '-'}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{row.department || '-'}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{row.year || '-'}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{row.eventTitle || '-'}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{row.eventDate || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {message && (
              <div className="mt-5 flex items-center gap-2 text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <AlertCircle className="w-4 h-4" />
                <p>{message}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
