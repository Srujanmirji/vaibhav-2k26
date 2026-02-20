import React, { useState, useEffect } from 'react';
import { EVENTS, GOOGLE_CLIENT_ID, DEPARTMENTS } from '../constants';
import { useLocation } from 'react-router-dom';

import { getRegistrations, submitRegistration } from '../services/googleSheets';
import { clearAuthToken, getAuthUserFromToken, getStoredAuthUser, persistAuthToken } from '../services/authSession';
import { RegistrationFormData } from '../types';
import { CheckCircle, AlertCircle, Loader2, Sparkles, User, LogOut, Check } from 'lucide-react';

// Declare google global for TypeScript
declare const google: any;
const normalizeTitleKey = (value: string) => value.trim().toLowerCase();

const Register: React.FC = () => {
  const location = useLocation();
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    department: '',
    year: '1',
    selectedEvents: [] // Changed from selectedEvent string to array
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isGoogleSignedIn, setIsGoogleSignedIn] = useState(false);
  const [userProfilePicture, setUserProfilePicture] = useState('');
  const [loadingRegisteredEvents, setLoadingRegisteredEvents] = useState(false);
  const [registeredEventKeys, setRegisteredEventKeys] = useState<string[]>([]);
  const registeredEventSet = new Set(registeredEventKeys);
  const availableEvents = EVENTS.filter((event) => !registeredEventSet.has(normalizeTitleKey(event.title)));

  const fetchRegisteredEvents = async (email: string, forceRefresh = false) => {
    if (!email) {
      setRegisteredEventKeys([]);
      return;
    }

    setLoadingRegisteredEvents(true);
    const response = await getRegistrations(email, forceRefresh);
    setLoadingRegisteredEvents(false);

    if (response.status !== 'success') {
      console.warn('Failed to fetch registered events for filtering:', response.message);
      return;
    }

    const keys = [...new Set(
      (response.data || [])
        .map((event: any) => normalizeTitleKey(String(event?.title || '')))
        .filter(Boolean)
    )];
    setRegisteredEventKeys(keys);
  };

  useEffect(() => {
    const stateEventId = (location.state as { preselectedEventId?: string } | null)?.preselectedEventId;
    const queryEventId = new URLSearchParams(location.search).get('event');
    const eventId = stateEventId || queryEventId;

    if (!eventId) {
      return;
    }

    const preselectedEvent = EVENTS.find((event) => event.id === eventId);
    if (!preselectedEvent) {
      return;
    }
    if (registeredEventSet.has(normalizeTitleKey(preselectedEvent.title))) {
      return;
    }

    setFormData((prev) => {
      if (prev.selectedEvents.includes(preselectedEvent.title)) {
        return prev;
      }

      return {
        ...prev,
        selectedEvents: [preselectedEvent.title],
      };
    });
  }, [location.search, location.state, registeredEventKeys]);

  const handleCredentialResponse = (response: any) => {
    const authUser = getAuthUserFromToken(response.credential);
    if (authUser) {
      setFormData(prev => ({
        ...prev,
        fullName: authUser.name || '',
        email: authUser.email || ''
      }));
      setIsGoogleSignedIn(true);
      if (authUser.picture) {
        setUserProfilePicture(authUser.picture);
      }
      setMessage(""); // Clear any previous messages
      persistAuthToken(response.credential);
      fetchRegisteredEvents(authUser.email);
    }
  };

  const handleSignOut = () => {
    setIsGoogleSignedIn(false);
    setFormData(prev => ({ ...prev, fullName: '', email: '' }));
    setUserProfilePicture('');
    setMessage('');
    setRegisteredEventKeys([]);
    setLoadingRegisteredEvents(false);
    clearAuthToken();
  };

  useEffect(() => {
    const storedUser = getStoredAuthUser();
    if (storedUser) {
      setFormData(prev => ({
        ...prev,
        fullName: storedUser.name || '',
        email: storedUser.email || ''
      }));
      setIsGoogleSignedIn(true);
      if (storedUser.picture) {
        setUserProfilePicture(storedUser.picture);
      }
      fetchRegisteredEvents(storedUser.email);
    }
  }, []);

  useEffect(() => {
    if (registeredEventKeys.length === 0) {
      return;
    }

    setFormData((prev) => {
      const filteredSelections = (prev.selectedEvents || []).filter(
        (title) => !registeredEventSet.has(normalizeTitleKey(title))
      );

      if (filteredSelections.length === prev.selectedEvents.length) {
        return prev;
      }

      return {
        ...prev,
        selectedEvents: filteredSelections
      };
    });
  }, [registeredEventKeys]);

  useEffect(() => {
    const renderGoogleButton = () => {
      const buttonContainer = document.getElementById("googleSignInDiv");
      if (typeof google !== 'undefined' && buttonContainer) {
        try {
          const buttonWidth = Math.min(Math.max(buttonContainer.clientWidth || 250, 220), 400);
          buttonContainer.innerHTML = '';

          google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse
          });
          google.accounts.id.renderButton(
            buttonContainer,
            { theme: "filled_black", size: "large", width: buttonWidth, text: "continue_with" }
          );
        } catch (e) {
          console.error("Google Sign In Error:", e);
        }
      }
    };

    if (!isGoogleSignedIn) {
      // If google script is already loaded
      if (typeof google !== 'undefined') {
        renderGoogleButton();
      } else {
        // Wait for script to load
        const interval = setInterval(() => {
          if (typeof google !== 'undefined') {
            renderGoogleButton();
            clearInterval(interval);
          }
        }, 500);
        return () => clearInterval(interval);
      }
    }
  }, [isGoogleSignedIn]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEventToggle = (eventTitle: string) => {
    setFormData(prev => {
      const currentEvents = prev.selectedEvents || [];
      if (currentEvents.includes(eventTitle)) {
        return { ...prev, selectedEvents: currentEvents.filter(e => e !== eventTitle) };
      } else {
        return { ...prev, selectedEvents: [...currentEvents, eventTitle] };
      }
    });
  };

  const validateForm = () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.college ||
      !formData.department ||
      formData.selectedEvents.length === 0
    ) {
      setMessage("Please fill in all required fields and select at least one event.");
      setStatus('error');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage("Please enter a valid email address.");
      setStatus('error');
      return false;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      setMessage("Please enter a valid 10-digit phone number.");
      setStatus('error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('submitting');
    setMessage('');

    try {
      const response = await submitRegistration(formData);
      if (response.status === 'success') {
        setStatus('success');
        setMessage(response.message || 'Registration successful! Check your email.');
        // Don't reset full name/email as they are from Google
        setFormData(prev => ({
          ...prev,
          phone: '',
          college: '',
          department: '',
          year: '1',
          selectedEvents: []
        }));
        fetchRegisteredEvents(formData.email, true);
      } else {
        setStatus('error');
        setMessage(response.message || 'Registration failed.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-darker flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-4xl bg-card/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] p-6 md:p-10 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white mb-2 font-mono tracking-tighter uppercase">
            Secure Your <span className="text-primary">Spot</span>
          </h1>
          <p className="text-gray-400">Join the elite at Vaibhav 2K26</p>
        </div>

        {status === 'success' ? (
          <div className="bg-green-500/10 border border-green-500/50 rounded-xl p-8 text-center animate-pulse-slow">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Registration Successful!</h2>
            <p className="text-gray-300">{message}</p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-6 px-6 py-2 bg-darker hover:bg-black text-white border border-green-500/50 rounded-lg transition-colors"
            >
              Register Another
            </button>
          </div>
        ) : (
          <div className="space-y-6">

            {/* Login Enforcement Section */}
            {!isGoogleSignedIn && (
              <div className="bg-black/40 border border-primary/20 rounded-xl p-8 text-center space-y-6 animate-fade-in-up">
                <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(255,0,85,0.2)]">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Authentication Required</h2>
                  <p className="text-gray-400 text-sm max-w-xs mx-auto">Please sign in with your Google account to verify your identity and access the registration form.</p>
                </div>
                <div id="googleSignInDiv" className="h-[44px] w-full max-w-[250px] mx-auto"></div>
              </div>
            )}

            {isGoogleSignedIn && (
              <div className="animate-fade-in-up">
                <div className="flex items-center justify-between gap-4 bg-primary/10 border border-primary/30 p-4 rounded-xl mb-6">
                  <div className="flex items-center gap-4">
                    {userProfilePicture ? (
                      <img src={userProfilePicture} alt="Profile" referrerPolicy="no-referrer" className="w-12 h-12 rounded-full border-2 border-primary" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <User className="w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Signed in as</p>
                      <p className="text-white font-bold">{formData.fullName}</p>
                      <p className="text-xs text-secondary">{formData.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-secondary uppercase tracking-wider">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-secondary uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        readOnly
                        className="w-full bg-black/40 border border-white/5 rounded-lg px-4 py-3 text-gray-400 focus:outline-none cursor-not-allowed"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-secondary uppercase tracking-wider">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="1234567890"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
                      />
                    </div>

                    {/* College */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-secondary uppercase tracking-wider">College Name *</label>
                      <input
                        type="text"
                        name="college"
                        value={formData.college}
                        onChange={handleChange}
                        placeholder="Institute Name"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
                      />
                    </div>

                    {/* Department (Branch) */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-secondary uppercase tracking-wider">BRANCH</label>
                      <div className="relative">
                        <select
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                        >
                          <option value="" className="bg-darker text-gray-400">Select Branch</option>
                          {DEPARTMENTS.filter(d => !['All', 'General', 'BS'].includes(d)).map(dept => (
                            <option key={dept} value={dept} className="bg-darker text-white">
                              {dept}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    </div>

                    {/* Year */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-secondary uppercase tracking-wider">Year of Study</label>
                      <div className="relative">
                        <select
                          name="year"
                          value={formData.year}
                          onChange={handleChange}
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                        >
                          <option value="1" className="bg-darker text-white">1st Year</option>
                          <option value="2" className="bg-darker text-white">2nd Year</option>
                          <option value="3" className="bg-darker text-white">3rd Year</option>
                          <option value="4" className="bg-darker text-white">4th Year</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Event Selection - Multi-select */}
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-secondary uppercase tracking-wider block">
                      Select Events <span className="text-gray-500 text-[10px] lowercase font-normal">(choose at least one)</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto p-2 bg-black/20 rounded-xl border border-white/5 custom-scrollbar">
                      {loadingRegisteredEvents ? (
                        <div className="col-span-full flex items-center justify-center py-8 text-gray-400">
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Loading available events...
                        </div>
                      ) : availableEvents.length === 0 ? (
                        <div className="col-span-full text-center py-8 text-gray-400">
                          You are already registered for all events.
                        </div>
                      ) : availableEvents.map(event => {
                        const isSelected = formData.selectedEvents.includes(event.title);
                        return (
                          <div
                            key={event.id}
                            onClick={() => handleEventToggle(event.title)}
                            className={`cursor-pointer p-4 rounded-lg border transition-all duration-300 flex items-center justify-between group ${isSelected
                              ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(255,0,85,0.2)]'
                              : 'bg-black/40 border-white/5 hover:border-primary/50 hover:bg-white/5'
                              }`}
                          >
                            <div>
                              <p className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                {event.title}
                              </p>
                              <p className="text-xs text-gray-500">{event.category} | {event.date}</p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${isSelected
                              ? 'bg-primary border-primary text-white'
                              : 'border-gray-600 group-hover:border-primary/50'
                              }`}>
                              {isSelected && <Check className="w-4 h-4" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-xs text-gray-400 text-right">
                      Selected: <span className="text-primary font-bold">{formData.selectedEvents.length}</span> events
                    </p>
                  </div>

                  {/* Error Message */}
                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-lg border border-red-500/20">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <p className="text-sm">{message}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'submitting' || loadingRegisteredEvents || availableEvents.length === 0}
                    className="w-full bg-primary hover:bg-white hover:text-primary disabled:bg-gray-800 disabled:text-gray-500 text-white font-black uppercase tracking-widest py-4 rounded-lg transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,0,85,0.4)] hover:shadow-[0_0_30px_rgba(255,0,85,0.6)]"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        INITIALIZING...
                      </>
                    ) : (
                      <>
                        CONFIRM REGISTRATION <Sparkles className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
