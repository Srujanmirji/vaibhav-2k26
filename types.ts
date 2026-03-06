export interface EventDetails {
  id: string;
  title: string;
  category: 'Coding' | 'Gaming' | 'Quiz' | 'Workshop' | 'Presentation' | 'Innovation' | 'AI/Tech' | 'Tech' | 'Cultural' | 'Ceremony' | 'Fun' | 'Competition' | 'General';
  description: string;
  longDescription?: string;
  rules?: string[];
  facultyCoordinators?: { name: string; phone: string }[];
  studentCoordinators?: { name: string; phone: string }[];
  date: string;
  time: string;
  venue: string;
  image: string;
  teamSize: string;
  department?: 'CSE' | 'ECE' | 'CVE' | 'ME' | 'BS' | 'General' | 'All';
  fee?: number; // Fee in INR
  groupFee?: number; // Fee in INR for group registration
  registrationClosed?: boolean;
  rulesPdf?: string;
}

export interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  year: string;
  selectedEvents: string[];
  registrationType: 'Solo' | 'Group';
  teamName?: string;
  teamMembers?: string;
  razorpayPaymentId?: string; // Optional field for payment ID
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
  registrationType: 'Solo' | 'Group';
  teamName?: string;
  teamMembers?: string;
  registrationId?: string;
  razorpayPaymentId?: string;
}
