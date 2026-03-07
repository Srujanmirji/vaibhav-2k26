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
    selectedEvents: [],
    registrationType: 'Solo',
    teamName: '',
    teamMembers: '',
  });

  const selectedEventObjects = React.useMemo(() => {
    return formData.selectedEvents.map(title =>
      EVENTS.find(e => e.title === title)
    ).filter(Boolean);
  }, [formData.selectedEvents]);

  const allowsGroup = React.useMemo(() => {
    return selectedEventObjects.some(event =>
      event && event.teamSize && event.teamSize.toLowerCase().includes('group') ||
      (event && event.teamSize && event.teamSize.toLowerCase().includes('members')) ||
      (event && event.teamSize && event.teamSize.toLowerCase().includes('team'))
    );
  }, [selectedEventObjects]);

  const forceGroup = React.useMemo(() => {
    return selectedEventObjects.some(event =>
      event && event.teamSize && !event.teamSize.toLowerCase().includes('solo') &&
      !event.teamSize.toLowerCase().includes('individual') &&
      (event.teamSize.toLowerCase().includes('team') || event.teamSize.toLowerCase().includes('members'))
    );
  }, [selectedEventObjects]);

  const showRegistrationTypeSelector = allowsGroup && !forceGroup;

  const isGroupRegistration = forceGroup || (allowsGroup && formData.registrationType === 'Group');

  // Auto-set registrationType to 'Group' when forceGroup is true (selector is hidden)
  useEffect(() => {
    if (forceGroup && formData.registrationType !== 'Group') {
      setFormData(prev => ({ ...prev, registrationType: 'Group' }));
    }
  }, [forceGroup]);

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isGoogleSignedIn, setIsGoogleSignedIn] = useState(false);
  const [userProfilePicture, setUserProfilePicture] = useState('');
  const [collegeSelection, setCollegeSelection] = useState<string>('');
  const [generatedRegId, setGeneratedRegId] = useState<string>('');
  const [loadingRegisteredEvents, setLoadingRegisteredEvents] = useState(false);
  const [perEventTeamDetails, setPerEventTeamDetails] = useState<{ [eventId: string]: { teamName: string; teamMembers: string; registrationType?: string } }>({});

  // Group events among selected events (for per-event team fields)
  const groupEventObjects = React.useMemo(() => {
    return selectedEventObjects.filter(event =>
      event && event.teamSize && (
        event.teamSize.toLowerCase().includes('group') ||
        event.teamSize.toLowerCase().includes('members') ||
        event.teamSize.toLowerCase().includes('team')
      )
    );
  }, [selectedEventObjects]);

  const multipleGroupEvents = isGroupRegistration && groupEventObjects.length > 1;
  const [registeredEventKeys, setRegisteredEventKeys] = useState<string[]>([]);
  const registeredEventSet = new Set(registeredEventKeys);
  const availableEvents = EVENTS.filter((event) => !event.registrationClosed && !registeredEventSet.has(normalizeTitleKey(event.title)));

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
    if (!preselectedEvent || preselectedEvent.registrationClosed) {
      return;
    }
    if (registeredEventSet.has(normalizeTitleKey(preselectedEvent.title))) {
      return;
    }

    setFormData((prev) => {
      const alreadySelected = prev.selectedEvents.includes(preselectedEvent.title);
      const alreadyRegistered = registeredEventSet.has(normalizeTitleKey(preselectedEvent.title));

      if (alreadySelected || alreadyRegistered) {
        return prev;
      }

      return {
        ...prev,
        selectedEvents: [preselectedEvent.title],
      };
    });
  }, [location.search, location.state, registeredEventKeys.length]);

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
        email: storedUser.email || '',
        phone: localStorage.getItem('vbhv_phone') || '',
        college: localStorage.getItem('vbhv_college') || '',
        department: localStorage.getItem('vbhv_department') || '',
      }));
      setCollegeSelection(localStorage.getItem('vbhv_college_type') || '');
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

    // Auto-save key profile fields to speed up future registrations
    if (['phone', 'college', 'department'].includes(name)) {
      localStorage.setItem(`vbhv_${name}`, value);
    }
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
      !formData.department ||
      formData.selectedEvents.length === 0
    ) {
      setMessage("Please fill in all required fields and select at least one event.");
      setStatus('error');
      return false;
    }

    // Validate team name(s) for group registrations
    if (isGroupRegistration) {
      if (multipleGroupEvents) {
        const missingTeamNames = groupEventObjects.filter(event => {
          if (!event) return false;
          const det = perEventTeamDetails[event.id];
          const ts = (event.teamSize || '').toLowerCase();
          const eventAllowsSolo = ts.includes('solo') || ts.includes('individual');
          const eventForcesGroup = !eventAllowsSolo;
          const eventRegType = det?.registrationType || (eventForcesGroup ? 'Group' : 'Solo');
          // Only require team name if this event is set to Group
          return eventRegType === 'Group' && !det?.teamName?.trim();
        });
        if (missingTeamNames.length > 0) {
          setMessage(`Please provide team names for: ${missingTeamNames.map(e => e!.title).join(', ')}`);
          setStatus('error');
          return false;
        }
      } else if (!formData.teamName) {
        setMessage("Please provide a Team Name for the selected group event(s).");
        setStatus('error');
        return false;
      }
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
      const isGroup = formData.registrationType === 'Group' || forceGroup;
      const appliedFee = (isGroup && event?.groupFee !== undefined) ? event.groupFee : (event?.fee || 0);
      return total + appliedFee;
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
    // 1. Show SUCCESS IMMEDIATELY (Optimistic UI)
    const uniqueId = `VBHV-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setGeneratedRegId(uniqueId);
    setStatus('success');
    setMessage('Registration confirmed! Check your email.');

    // 2. Clear inputs immediately so user knows it's done
    const payload: any = { ...formData, registrationId: uniqueId };
    if (paymentId) {
      payload.razorpayPaymentId = paymentId;
    }
    // Attach per-event team details if multiple group events
    if (multipleGroupEvents && Object.keys(perEventTeamDetails).length > 0) {
      payload.perEventTeamDetails = perEventTeamDetails;
    }

    setFormData(prev => ({
      ...prev,
      phone: '',
      college: '',
      department: '',
      year: '1',
      selectedEvents: [],
      registrationType: 'Solo',
      teamName: '',
      teamMembers: '',
    }));
    setCollegeSelection('');
    setPerEventTeamDetails({});

    // 3. Background Sync (Crucially non-blocking)
    submitRegistration(payload)
      .then(() => fetchRegisteredEvents(formData.email, true))
      .catch(error => {
        console.error('Background Sync Failed:', error);
      });
  };

  // Events that require payment for ALL students (including JCET)
  const PAID_FOR_ALL_EVENT_IDS = ['e23', 'e25']; // Melody Mania, Dance Mania

  const hasPaidForAllEvent = formData.selectedEvents.some(title => {
    const ev = EVENTS.find(e => e.title === title);
    return ev && PAID_FOR_ALL_EVENT_IDS.includes(ev.id);
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (collegeSelection === 'Other' || hasPaidForAllEvent) {
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
              registrationType: formData.registrationType,
              currency: 'INR',
              email: formData.email,
              phone: formData.phone,
              name: formData.fullName
            })
          });

          const orderText = await orderResponse.text();
          let orderData;
          try {
            orderData = JSON.parse(orderText);
          } catch {
            console.error('API returned non-JSON:', orderText.substring(0, 200));
            throw new Error('Server returned an invalid response. Please try again.');
          }
          if (!orderData.success) {
            throw new Error(orderData.error || "Failed to create secure order on backend.");
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
                  // Instant Success View
                  const uniqueId = `VBHV-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
                  setGeneratedRegId(uniqueId);
                  setStatus('success');
                  setMessage('Payment verified! Registration is live.');

                  const registrationPayload: any = {
                    ...formData,
                    registrationId: uniqueId,
                    razorpayPaymentId: response.razorpay_payment_id
                  };
                  // Attach per-event team details if multiple group events
                  if (multipleGroupEvents && Object.keys(perEventTeamDetails).length > 0) {
                    registrationPayload.perEventTeamDetails = perEventTeamDetails;
                  }

                  // Reset form immediately
                  setFormData(prev => ({
                    ...prev,
                    phone: '',
                    college: '',
                    department: '',
                    year: '1',
                    selectedEvents: [],
                    teamName: '',
                    teamMembers: '',
                  }));
                  setCollegeSelection('');
                  setPerEventTeamDetails({});

                  // Background Sync
                  submitRegistration(registrationPayload)
                    .then(() => fetchRegisteredEvents(registrationPayload.email, true))
                    .catch(err => console.error('Background registration failed:', err));
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

      <div className="w-full max-w-4xl glass-card rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] p-4 sm:p-5 md:p-10 relative z-10">
        <div className="text-center mb-5 md:mb-8">
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
                    selectedEvents: [],
                    teamName: '',
                    teamMembers: '',
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
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-primary/10 border border-primary/30 p-3 rounded-xl mb-4">
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

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-secondary uppercase tracking-wider">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-secondary uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        readOnly
                        className="w-full bg-black/40 border border-white/5 rounded-lg px-4 py-2.5 text-sm text-gray-400 focus:outline-none cursor-not-allowed"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-secondary uppercase tracking-wider">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="1234567890"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
                      />
                    </div>

                    {/* College */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-secondary uppercase tracking-wider">College Name *</label>

                      <div className="relative mb-3">
                        <select
                          value={collegeSelection}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCollegeSelection(val);
                            localStorage.setItem('vbhv_college_type', val);
                            if (val !== 'Other') {
                              const collegeName = val === 'Jain College of Engineering & Technology Hubballi' ? 'JCET Hubballi' : val;
                              setFormData(prev => ({ ...prev, college: collegeName }));
                              localStorage.setItem('vbhv_college', collegeName);
                            } else {
                              setFormData(prev => ({ ...prev, college: '' }));
                            }
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
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
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-secondary uppercase tracking-wider">Course Name *</label>
                      <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        placeholder="Enter your Course Name"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
                      />
                    </div>

                    {/* Year */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-secondary uppercase tracking-wider">Year of Study</label>
                      <div className="relative">
                        <select
                          name="year"
                          value={formData.year}
                          onChange={handleChange}
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
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

                  {/* Registration Mode Selector (Solo or Group) */}
                  {showRegistrationTypeSelector && (
                    <div className="space-y-3 animate-fade-in-up">
                      <label className="text-xs font-bold text-secondary uppercase tracking-wider block">Registration Mode</label>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, registrationType: 'Solo' }))}
                          className={`flex-1 py-3 px-4 rounded-xl border font-bold transition-all flex items-center justify-center gap-2 ${formData.registrationType === 'Solo'
                            ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(255,0,85,0.2)]'
                            : 'bg-black/40 border-white/5 text-gray-400 hover:border-primary/50'
                            }`}
                        >
                          <User className="w-4 h-4" /> SOLO
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, registrationType: 'Group' }))}
                          className={`flex-1 py-3 px-4 rounded-xl border font-bold transition-all flex items-center justify-center gap-2 ${formData.registrationType === 'Group'
                            ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(255,0,85,0.2)]'
                            : 'bg-black/40 border-white/5 text-gray-400 hover:border-primary/50'
                            }`}
                        >
                          <Sparkles className="w-4 h-4" /> GROUP
                        </button>
                      </div>
                      <p className="text-[10px] text-gray-500 italic">This event allows both Solo and Group participation. Choose your preference.</p>
                    </div>
                  )}

                  {/* Team Details (Conditional) */}
                  {isGroupRegistration && (
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl animate-fade-in-up space-y-3">
                      <div>
                        <h3 className="text-primary font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                          <Sparkles className="w-4 h-4" /> {forceGroup ? 'Required' : ''} Team Information
                        </h3>
                        <p className="text-gray-500 text-[10px] mt-1">
                          {multipleGroupEvents
                            ? 'Provide team details for each group event separately.'
                            : forceGroup
                              ? 'One or more selected events require team registration.'
                              : 'You have selected Group mode for this registration.'}
                        </p>
                      </div>

                      {multipleGroupEvents ? (
                        /* Per-event team fields */
                        <div className="space-y-3">
                          {groupEventObjects.map(event => {
                            if (!event) return null;
                            const details = perEventTeamDetails[event.id] || { teamName: '', teamMembers: '', registrationType: '' };
                            // Check if this event allows both Solo and Group
                            const ts = (event.teamSize || '').toLowerCase();
                            const eventAllowsSolo = ts.includes('solo') || ts.includes('individual');
                            const eventForcesGroup = !eventAllowsSolo;
                            // Default to Group for forced-group events, Solo for events that allow both
                            const eventRegType = details.registrationType || (eventForcesGroup ? 'Group' : 'Solo');
                            const showTeamFields = eventRegType === 'Group';

                            return (
                              <div key={event.id} className="p-3 bg-black/30 border border-white/5 rounded-lg space-y-2">
                                <div className="flex items-center justify-between">
                                  <p className="text-xs font-bold text-secondary uppercase tracking-wider">{event.title}</p>
                                  {!eventForcesGroup && (
                                    <div className="flex gap-1">
                                      <button
                                        type="button"
                                        onClick={() => setPerEventTeamDetails(prev => ({
                                          ...prev,
                                          [event.id]: { ...prev[event.id] || { teamName: '', teamMembers: '' }, registrationType: 'Solo' }
                                        }))}
                                        className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-all ${eventRegType === 'Solo' ? 'bg-primary text-white' : 'bg-black/40 border border-white/10 text-gray-400'}`}
                                      >Solo</button>
                                      <button
                                        type="button"
                                        onClick={() => setPerEventTeamDetails(prev => ({
                                          ...prev,
                                          [event.id]: { ...prev[event.id] || { teamName: '', teamMembers: '' }, registrationType: 'Group' }
                                        }))}
                                        className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-all ${eventRegType === 'Group' ? 'bg-primary text-white' : 'bg-black/40 border border-white/10 text-gray-400'}`}
                                      >Group</button>
                                    </div>
                                  )}
                                </div>
                                {showTeamFields && (
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-in-up">
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Team Name *</label>
                                      <input
                                        type="text"
                                        value={details.teamName}
                                        onChange={(e) => setPerEventTeamDetails(prev => ({
                                          ...prev,
                                          [event.id]: { ...prev[event.id] || { teamName: '', teamMembers: '', registrationType: eventRegType }, teamName: e.target.value }
                                        }))}
                                        placeholder={`Team name for ${event.title}`}
                                        required
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600 text-sm"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Member Names</label>
                                      <input
                                        type="text"
                                        value={details.teamMembers}
                                        onChange={(e) => setPerEventTeamDetails(prev => ({
                                          ...prev,
                                          [event.id]: { ...prev[event.id] || { teamName: '', teamMembers: '', registrationType: eventRegType }, teamMembers: e.target.value }
                                        }))}
                                        placeholder="e.g. John, Jane, Mike"
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600 text-sm"
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        /* Single team fields (original) */
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-secondary uppercase tracking-wider">Team Name *</label>
                            <input
                              type="text"
                              name="teamName"
                              value={formData.teamName}
                              onChange={handleChange}
                              placeholder="Enter your team name"
                              required={isGroupRegistration}
                              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-secondary uppercase tracking-wider">Member Names</label>
                            <input
                              type="text"
                              name="teamMembers"
                              value={formData.teamMembers}
                              onChange={handleChange}
                              placeholder="e.g. John, Jane, Mike"
                              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

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
                      ) : EVENTS.map(event => {
                        const isRegistered = registeredEventSet.has(normalizeTitleKey(event.title));
                        const isSelected = formData.selectedEvents.includes(event.title);
                        const isClosed = event.registrationClosed;

                        if (isClosed && !isRegistered) return null;

                        return (
                          <div
                            key={event.id}
                            onClick={() => !isRegistered && !isClosed && handleEventToggle(event.title)}
                            className={`p-4 rounded-lg border transition-all duration-300 flex items-center justify-between group ${isRegistered
                              ? 'bg-green-500/5 border-green-500/20 opacity-80 cursor-default'
                              : isClosed
                                ? 'bg-gray-800/10 border-white/5 opacity-50 cursor-not-allowed'
                                : isSelected
                                  ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(255,0,85,0.2)] cursor-pointer'
                                  : 'bg-black/40 border-white/5 hover:border-primary/50 hover:bg-white/5 cursor-pointer'
                              }`}
                          >
                            <div className="min-w-0 pr-2">
                              <p className={`font-bold text-sm truncate ${isRegistered ? 'text-green-400/80' : isSelected ? 'text-white' : 'text-gray-400 group-hover:text-white'
                                }`}>
                                {event.title}
                              </p>
                              <p className="text-[10px] text-gray-500 uppercase tracking-tighter">
                                {event.category} | {event.date}
                              </p>
                              {isRegistered && (
                                <span className="inline-block mt-1 px-1.5 py-0.5 bg-green-500/20 text-green-400 text-[9px] font-black rounded uppercase border border-green-500/30">
                                  ALREADY REGISTERED
                                </span>
                              )}
                              {isClosed && !isRegistered && (
                                <span className="inline-block mt-1 px-1.5 py-0.5 bg-red-500/20 text-red-400 text-[9px] font-black rounded uppercase border border-red-500/30">
                                  REGISTRATION CLOSED
                                </span>
                              )}
                            </div>
                            <div className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${isRegistered
                              ? 'bg-green-500 border-green-500 text-white'
                              : isSelected
                                ? 'bg-primary border-primary text-white'
                                : 'border-gray-600 group-hover:border-primary/50'
                              }`}>
                              {(isSelected || isRegistered) && <Check className="w-4 h-4" />}
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
                    className="w-full bg-primary hover:bg-white hover:text-primary disabled:bg-gray-800 disabled:text-gray-500 text-white font-black uppercase tracking-widest py-3 rounded-lg transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,0,85,0.4)] hover:shadow-[0_0_30px_rgba(255,0,85,0.6)]"
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
