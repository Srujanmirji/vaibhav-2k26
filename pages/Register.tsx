import React, { useState, useEffect } from 'react';
import { EVENTS, GOOGLE_CLIENT_ID, DEPARTMENTS, RAZORPAY_KEY_ID } from '../constants';
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
  const [collegeSelection, setCollegeSelection] = useState<string>('');
  const [generatedRegId, setGeneratedRegId] = useState<string>('');
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

  const calculateTotalFee = () => {
    return formData.selectedEvents.reduce((total, title) => {
      const event = EVENTS.find(e => e.title === title);
      return total + (event?.fee || 0);
    }, 0);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      // Check if it's already loaded
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const processRegistration = async (paymentId?: string) => {
    setStatus('submitting');
    setMessage('');

    try {
      // Generate a unique registration ID (e.g., VBHV-A1B2C3)
      const uniqueId = `VBHV-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      const payload: any = { ...formData, registrationId: uniqueId };
      if (paymentId) {
        payload.razorpayPaymentId = paymentId;
      }

      const response = await submitRegistration(payload);
      if (response.status === 'success') {
        setStatus('success');
        setGeneratedRegId(uniqueId);
        setMessage(response.message || 'Registration successful!');
        // Don't reset full name/email as they are from Google
        setFormData(prev => ({
          ...prev,
          phone: '',
          college: '',
          department: '',
          year: '1',
          selectedEvents: []
        }));
        setCollegeSelection('');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (collegeSelection === 'Other') {
      const totalFee = calculateTotalFee();
      if (totalFee > 0) {
        setStatus('submitting');
        setMessage('Initializing secure payment gateway...');

        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
          setStatus('error');
          setMessage('Failed to load payment gateway. Please check your connection or disable AdBlockers.');
          return;
        }

        try {
          // 1. Hit the new Node.js Backend to create a secure Order ID lock
          const orderResponse = await fetch('/api/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              selectedEventIds: formData.selectedEvents.map(title => {
                const ev = EVENTS.find(e => e.title === title);
                return ev?.id || '';
              }).filter(Boolean),
              currency: 'INR',
              email: formData.email,
              phone: formData.phone,
              name: formData.fullName
            })
          });

          const orderData = await orderResponse.json();
          if (!orderData.success) {
            throw new Error("Failed to create secure order on backend.");
          }

          // 2. Open Razorpay Checkbox locked to the Backend Order ID
          const options = {
            key: RAZORPAY_KEY_ID,
            amount: orderData.amount, // Secured amount from backend
            currency: orderData.currency,
            name: 'Vaibhav 2K26',
            description: 'Event Registration Fee',
            order_id: orderData.order_id, // THIS is the crucial security update
            handler: async function (response: any) {
              try {
                setStatus('submitting');
                setMessage('Verifying payment...');

                // 3. Send the signature to the backend for cryptographic verification
                const verifyResponse = await fetch('/api/verify-payment', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature
                  })
                });

                const verificationData = await verifyResponse.json();

                if (verificationData.success) {
                  // 4. Show success INSTANTLY after verification
                  const uniqueId = `VBHV-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
                  setGeneratedRegId(uniqueId);
                  setStatus('success');
                  setMessage('Payment verified & registration confirmed!');

                  // Capture current form data before resetting
                  const registrationPayload: any = {
                    ...formData,
                    registrationId: uniqueId,
                    razorpayPaymentId: response.razorpay_payment_id
                  };

                  // Reset form immediately
                  setFormData(prev => ({
                    ...prev,
                    phone: '',
                    college: '',
                    department: '',
                    year: '1',
                    selectedEvents: []
                  }));
                  setCollegeSelection('');

                  // Save to Google Sheets in background (non-blocking)
                  submitRegistration(registrationPayload)
                    .then(() => fetchRegisteredEvents(formData.email, true))
                    .catch(err => console.error('Background registration save failed:', err));
                } else {
                  setStatus('error');
                  setMessage('Payment verification failed! Potential tampering detected.');
                }
              } catch (verifyError) {
                setStatus('error');
                setMessage('Network error during verification. Payment is safe, please contact support.');
              }
            },
            prefill: {
              name: formData.fullName,
              email: formData.email,
              contact: `+91${formData.phone.replace(/\D/g, '')}`
            },
            readonly: {
              email: true,
              contact: true
            },
            theme: {
              color: '#ff0055' // primary color matching the UI
            },
            modal: {
              animation: false,
              ondismiss: function () {
                setStatus('idle');
                setMessage('Payment was cancelled. You can try again when ready.');
              }
            }
          };

          const paymentObject = new (window as any).Razorpay(options);
          paymentObject.on('payment.failed', function (response: any) {
            setStatus('error');
            setMessage('Payment failed: ' + response.error.description + '. You can retry safely.');
          });

          // Intercept Razorpay's native alert which occurs on fatal init errors without firing events
          const originalAlert = window.alert;
          let alertTriggered = false;
          window.alert = function (msg: any) {
            if (typeof msg === 'string' && (msg.toLowerCase().includes('failed') || msg.toLowerCase().includes('wrong'))) {
              alertTriggered = true;
              setStatus('error');
              setMessage(msg + ' Please wait a moment and try again.');
            }
            originalAlert(msg);
          };

          try {
            paymentObject.open();
          } finally {
            // Restore window.alert after synchronous execution
            window.alert = originalAlert;
            if (alertTriggered) {
              return; // Halt flow if init failed
            }
          }

          return; // Return here so we don't process registration until payment is done

        } catch (backendError: any) {
          console.error('Backend error:', backendError);
          setStatus('error');
          setMessage('Payment error: ' + (backendError?.message || 'Could not connect to payment server. Please try again.'));
          return;
        }
      }
    }

    // Default flow for JCET students or events with 0 fee
    await processRegistration();
  };

  return (
    <div className="pt-24 min-h-screen bg-darker flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-4xl bg-card/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] p-4 sm:p-6 md:p-10 relative z-10">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 font-mono tracking-tighter uppercase">
            Secure Your <span className="text-primary">Spot</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base">Join the elite at Vaibhav 2K26</p>
        </div>

        {status === 'success' ? (
          <div className="bg-green-500/10 border border-green-500/50 rounded-xl p-8 text-center animate-pulse-slow">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Registration Successful!</h2>
            <p className="text-gray-300 mb-6">{message}</p>

            {generatedRegId && (
              <div className="bg-black/60 border border-primary/50 shadow-[0_0_20px_rgba(255,0,85,0.3)] rounded-xl py-6 px-4 mb-8 inline-block max-w-sm w-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-cyan-500"></div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                  <Sparkles className="w-3 h-3 text-primary" />
                  Your Registration ID
                  <Sparkles className="w-3 h-3 text-primary" />
                </p>
                <div className="bg-darker/80 border border-white/5 py-4 rounded-lg my-3">
                  <p className="text-3xl md:text-4xl font-black tracking-widest font-mono select-all flex justify-center items-center">
                    <span className="text-white">{generatedRegId.split('-')[0]}</span>
                    <span className="text-primary mx-2">-</span>
                    <span className="text-primary">{generatedRegId.split('-')[1]}</span>
                  </p>
                </div>
                <p className="text-xs text-secondary mt-3">Please save or screenshot this ID.</p>
              </div>
            )}

            <div>
              <button
                onClick={() => {
                  setStatus('idle');
                  setGeneratedRegId('');
                  setFormData(prev => ({
                    ...prev,
                    phone: '',
                    college: '',
                    department: '',
                    year: '1',
                    selectedEvents: []
                  }));
                  setCollegeSelection('');
                }}
                className="mt-2 px-8 py-3 bg-darker hover:bg-black text-white border border-green-500/50 hover:border-green-400 rounded-lg transition-all font-bold tracking-wider"
              >
                REGISTER ANOTHER EVENT
              </button>
            </div>
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
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-primary/10 border border-primary/30 p-4 rounded-xl mb-6">
                  <div className="flex items-center gap-4 min-w-0">
                    {userProfilePicture ? (
                      <img src={userProfilePicture} alt="Profile" referrerPolicy="no-referrer" className="w-12 h-12 rounded-full border-2 border-primary" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <User className="w-6 h-6" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Signed in as</p>
                      <p className="text-white font-bold break-words">{formData.fullName}</p>
                      <p className="text-xs text-secondary break-all">{formData.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="self-end sm:self-auto p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
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

                      <div className="relative mb-3">
                        <select
                          value={collegeSelection}
                          onChange={(e) => {
                            setCollegeSelection(e.target.value);
                            if (e.target.value !== 'Other') {
                              setFormData(prev => ({ ...prev, college: e.target.value }));
                            } else {
                              setFormData(prev => ({ ...prev, college: '' }));
                            }
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                        >
                          <option value="" className="bg-darker text-gray-400">Select College</option>
                          <option value="Jain College of Engineering & Technology Hubballi" className="bg-darker text-white">Jain College of Engineering & Technology Hubballi</option>
                          <option value="Other" className="bg-darker text-white">Other</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>

                      {collegeSelection === 'Other' && (
                        <input
                          type="text"
                          name="college"
                          value={formData.college}
                          onChange={handleChange}
                          placeholder="Institute Name"
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600 animate-fade-in-up"
                        />
                      )}
                    </div>

                    {/* Department (Courses) */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-secondary uppercase tracking-wider">Course Name *</label>
                      <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        placeholder="Enter your Course Name"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
                      />
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
