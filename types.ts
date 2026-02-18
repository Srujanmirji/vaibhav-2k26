export interface EventDetails {
  id: string;
  title: string;
  category: 'Coding' | 'Gaming' | 'Quiz' | 'Workshop' | 'Presentation' | 'Innovation' | 'AI/Tech' | 'Cultural' | 'Ceremony' | 'Fun' | 'Competition';
  description: string;
  date: string;
  time: string;
  venue: string;
  image: string;
  teamSize: string;
  department?: 'CSE' | 'ECE' | 'CVE' | 'ME' | 'BS' | 'General';
}

export interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  year: string;
  selectedEvents: string[];
}

export interface ApiResponse {
  status: 'success' | 'error';
  message: string;
}

export interface AdminRegistrationRecord {
  timestamp: string;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  year: string;
  eventTitle: string;
  eventId: string;
  eventDate: string;
}
