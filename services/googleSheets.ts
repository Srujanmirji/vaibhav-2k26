import { RegistrationFormData, ApiResponse, AdminRegistrationRecord } from '../types';
import { EVENTS, GOOGLE_SCRIPT_URL } from '../constants';

// Simulate a database for demo purposes (in-memory)
const SIMULATED_DB: RegistrationFormData[] = [];

type RawApiResponse = {
  status?: string;
  message?: string;
  error?: string;
};

const normalizeApiResponse = (response: RawApiResponse | null, defaultError: string): ApiResponse => {
  const isSuccess = response?.status === 'success';
  const message = response?.message || response?.error || (isSuccess ? 'Registration successful!' : defaultError);
  return { status: isSuccess ? 'success' : 'error', message };
};

const postRegistrationForEvent = async (data: RegistrationFormData, eventTitle: string): Promise<ApiResponse> => {
  const selectedEvent = EVENTS.find((event) => event.title === eventTitle);
  const payload = {
    ...data,
    selectedEventId: selectedEvent?.id || '',
    selectedEvent: eventTitle,
    selectedEvents: [
      {
        id: selectedEvent?.id || '',
        title: eventTitle,
      },
    ],
    action: 'register',
  };

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    let parsed: RawApiResponse | null = null;

    if (text) {
      try {
        parsed = JSON.parse(text) as RawApiResponse;
      } catch {
        parsed = null;
      }
    }

    if (!response.ok && !parsed) {
      return { status: 'error', message: `${eventTitle}: Registration failed with HTTP ${response.status}.` };
    }

    const normalized = normalizeApiResponse(parsed, 'Registration failed.');
    if (normalized.status === 'error') {
      return { status: 'error', message: `${eventTitle}: ${normalized.message}` };
    }

    return normalized;
  } catch (fetchError) {
    // If CORS blocks response reading but data was sent, try no-cors as fallback.
    console.warn("Retrying registration with no-cors mode...", fetchError);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload),
      });
      // no-cors means we cannot read the response body.
      return { status: 'success', message: `Registration submitted for "${eventTitle}".` };
    } catch (noCorsError: any) {
      return { status: 'error', message: `${eventTitle}: ${noCorsError?.message || 'Failed to submit registration.'}` };
    }
  }
};

export const submitRegistration = async (data: RegistrationFormData): Promise<ApiResponse> => {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes('INSERT_YOUR')) {
    // Simulate success for demo purposes if URL is not set
    console.warn("Google Script URL is not configured. Simulating success.");
    SIMULATED_DB.push(data); // Store in memory for demo
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: 'success', message: 'Registration simulated successfully (API URL not set).' });
      }, 1500);
    });
  }

  try {
    const selectedEvents = [...new Set(data.selectedEvents || [])].filter(Boolean);
    if (selectedEvents.length === 0) {
      return { status: 'error', message: 'Please select at least one event.' };
    }

    const results = await Promise.all(selectedEvents.map((eventTitle) => postRegistrationForEvent(data, eventTitle)));
    const failed = results.filter((result) => result.status === 'error');
    const succeeded = results.length - failed.length;

    if (failed.length === 0) {
      if (results.length === 1) {
        return { status: 'success', message: results[0].message || 'Registration successful!' };
      }
      return { status: 'success', message: `Registration successful for ${results.length} events.` };
    }

    if (succeeded > 0) {
      return {
        status: 'error',
        message: `Registered for ${succeeded}/${results.length} events. ${failed[0].message}`,
      };
    }

    return { status: 'error', message: failed[0].message || 'Registration failed.' };
  } catch (error: any) {
    console.error("Submission error:", error);
    return { status: 'error', message: 'Failed to submit: ' + (error.message || error.toString()) };
  }
};

export const getRegistrations = async (email: string): Promise<{ status: 'success' | 'error', data?: any[], message?: string }> => {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes('INSERT_YOUR')) {
    // Simulate fetching from in-memory DB
    console.warn("Google Script URL is not configured. Simulating fetch.");
    const userRegistrations = SIMULATED_DB.filter(r => r.email === email);
    // Flatten events if they are stored as arrays, or just return the list
    // For the dashboard, we want a list of events.
    // In a real scenario, the backend would return a list of event names or objects.

    // Create a list of all events the user registered for
    const events = userRegistrations.flatMap(r => r.selectedEvents || []);
    const uniqueEvents = [...new Set(events)]; // Remove duplicates if any

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'success',
          data: uniqueEvents.map(e => ({ title: e, date: 'March 27-28, 2026' })) // Mock data structure 
        });
      }, 1000);
    });
  }

  try {
    const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getRegistrations&email=${encodeURIComponent(email)}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    if (result?.status === 'error') {
      return { status: 'error', message: result.message || result.error || 'Failed to fetch registrations.' };
    }

    return result;
  } catch (error) {
    console.error("Fetch error:", error);
    return { status: 'error', message: 'Failed to fetch registrations.' };
  }
};

export const getAllRegistrationsForAdmin = async (
  adminEmail: string
): Promise<{ status: 'success' | 'error'; data?: AdminRegistrationRecord[]; message?: string }> => {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes('INSERT_YOUR')) {
    const rows: AdminRegistrationRecord[] = SIMULATED_DB.flatMap((registration) =>
      (registration.selectedEvents || []).map((eventTitle) => ({
        timestamp: new Date().toISOString(),
        fullName: registration.fullName,
        email: registration.email,
        phone: registration.phone,
        college: registration.college,
        department: registration.department,
        year: registration.year,
        eventTitle,
        eventId: '',
        eventDate: 'March 27-28, 2026',
      }))
    );

    return { status: 'success', data: rows };
  }

  try {
    const response = await fetch(
      `${GOOGLE_SCRIPT_URL}?action=getAllRegistrations&adminEmail=${encodeURIComponent(adminEmail)}`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    if (result?.status === 'error') {
      return { status: 'error', message: result.message || result.error || 'Failed to fetch admin data.' };
    }

    return {
      status: 'success',
      data: (result?.data || []) as AdminRegistrationRecord[],
      message: result?.message,
    };
  } catch (error) {
    console.error('Admin fetch error:', error);
    return { status: 'error', message: 'Failed to fetch all registrations.' };
  }
};
