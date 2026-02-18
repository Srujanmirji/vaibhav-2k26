import { EventDetails } from './types';

// Replace this with your deployed Google Apps Script Web App URL
export const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz75RMIlcRIeoYisVngBp4Z3XRkx-iwBJ8RN-ceIMVBYEOLGX33yEb3BnpsDAC6PwWk/exec';

// Replace with your Google Cloud Client ID (for Google Sign-In)
// Replace with your Google Cloud Client ID (for Google Sign-In)
export const GOOGLE_CLIENT_ID = '693447204709-ja2segvloojfgru7u7u20n35a85h1bc3.apps.googleusercontent.com';

// Only these Google accounts can access the Admin page.
export const ADMIN_ALLOWED_EMAILS = [
  'vaibhav2k26jcet@gmail.com',
];

export const DEPARTMENTS = ['All', 'CSE', 'ECE', 'CVE', 'ME', 'BS', 'General'];

export const EVENTS: EventDetails[] = [
  {
    id: 'e1',
    title: 'Project Pitch Day',
    category: 'Innovation',
    description: 'Showcase your ground-breaking ideas and projects to a panel of industry experts and investors.',
    date: 'March 27, 2026',
    time: '10:30 AM',
    venue: 'Main Auditorium',
    image: 'https://loremflickr.com/800/600/business,meeting',
    teamSize: '2-4 Members',
    department: 'General'
  },
  {
    id: 'e2',
    title: 'AI Prompt Battle',
    category: 'AI/Tech',
    description: 'Master the art of prompt engineering. Compete to generate the best AI outputs under pressure.',
    date: 'March 28, 2026',
    time: '10:00 AM',
    venue: 'Lab Complex A',
    image: 'https://loremflickr.com/800/600/artificial-intelligence,robot',
    teamSize: 'Individual',
    department: 'CSE'
  },
  {
    id: 'e3',
    title: 'Melody Mania & Dance Infusion',
    category: 'Cultural',
    description: 'A spectacular showcase of vocal talent and rhythmic dance performances, both solo and group.',
    date: 'March 28, 2026',
    time: '05:30 PM',
    venue: 'Main Stage',
    image: 'https://loremflickr.com/800/600/dance,music',
    teamSize: 'Solo or Group',
    department: 'General'
  },
  {
    id: 'e4',
    title: 'Cooking Without Fire',
    category: 'Competition',
    description: 'Show off your culinary skills without using any fire or heat source.',
    date: 'March 27, 2026',
    time: '11:30 AM',
    venue: 'ECE Department',
    image: 'https://loremflickr.com/800/600/cooking,chef',
    teamSize: '2 Members',
    department: 'ECE'
  },
  {
    id: 'e5',
    title: 'Blind Fold Taste Test',
    category: 'Fun',
    description: 'Test your taste buds and identify ingredients while blindfolded.',
    date: 'March 27, 2026',
    time: '12:30 PM',
    venue: 'ME Department',
    image: 'https://loremflickr.com/800/600/tasting,food',
    teamSize: 'Individual',
    department: 'ME'
  },
  {
    id: 'e6',
    title: 'Survey Hunt',
    category: 'Fun',
    description: 'A scavenger hunt with a twist. Solve clues and complete the survey.',
    date: 'March 27, 2026',
    time: '02:00 PM',
    venue: 'CVE Department',
    image: 'https://loremflickr.com/800/600/map,search',
    teamSize: 'Team of 4',
    department: 'CVE'
  },
  {
    id: 'e7',
    title: 'Art Gallery',
    category: 'Cultural',
    description: 'Display your artistic creations and admire the work of fellow students.',
    date: 'March 27, 2026',
    time: '03:00 PM',
    venue: 'BS Department',
    image: 'https://loremflickr.com/800/600/art,gallery',
    teamSize: 'Individual',
    department: 'BS'
  },
  {
    id: 'e8',
    title: 'Spot Acting Battle',
    category: 'Cultural',
    description: 'Improvise and act out scenes on the spot. Show your spontaneity!',
    date: 'March 27, 2026',
    time: '03:00 PM',
    venue: 'ME Department',
    image: 'https://loremflickr.com/800/600/theatre,drama',
    teamSize: 'Individual',
    department: 'ME'
  },
  {
    id: 'e9',
    title: 'Game Zone',
    category: 'Gaming',
    description: 'Relax and have fun with a variety of indoor games and activities.',
    date: 'March 27, 2026',
    time: '04:00 PM',
    venue: 'CSE Department',
    image: 'https://loremflickr.com/800/600/gaming,videogame',
    teamSize: 'Open for All',
    department: 'CSE'
  },
  {
    id: 'e10',
    title: 'Tallest Tower Challenge',
    category: 'Competition',
    description: 'Build the tallest stable tower using limited materials within the time limit.',
    date: 'March 28, 2026',
    time: '10:30 AM',
    venue: 'CVE Department',
    image: 'https://loremflickr.com/800/600/building-blocks,tower',
    teamSize: 'Team of 3',
    department: 'CVE'
  },
  {
    id: 'e11',
    title: 'Cinematic Campus Video',
    category: 'Competition',
    description: 'Create a cinematic video showcasing the campus and raising awareness on a social cause.',
    date: 'March 28, 2026',
    time: '11:30 AM',
    venue: 'ME Department',
    image: 'https://loremflickr.com/800/600/filmmaking,camera',
    teamSize: 'Team of 2-4',
    department: 'ME'
  },
  {
    id: 'e12',
    title: 'Meme Challenge',
    category: 'Fun',
    description: 'Create the funniest memes related to college life and technology.',
    date: 'March 28, 2026',
    time: '12:00 PM',
    venue: 'CSE Department',
    image: 'https://loremflickr.com/800/600/computer,funny',
    teamSize: 'Individual',
    department: 'CSE'
  },
  {
    id: 'e13',
    title: 'Laugh Logic Loot',
    category: 'Fun',
    description: 'A stand-up comedy competition. Make the audience roar with laughter.',
    date: 'March 28, 2026',
    time: '02:00 PM',
    venue: 'CSE Department',
    image: 'https://loremflickr.com/800/600/standup,comedy',
    teamSize: 'Individual',
    department: 'CSE'
  },
  {
    id: 'e14',
    title: 'Dialogue Delivery Battle',
    category: 'Cultural',
    description: 'Deliver iconic movie dialogues with your own twist and style.',
    date: 'March 28, 2026',
    time: '03:00 PM',
    venue: 'ME Department',
    image: 'https://loremflickr.com/800/600/cinema,actor',
    teamSize: 'Individual',
    department: 'ME'
  },
  {
    id: 'e15',
    title: 'Minute Master',
    category: 'Fun',
    description: 'Complete simple tasks within one minute to win exciting prizes.',
    date: 'March 28, 2026',
    time: '03:30 PM',
    venue: 'BS Department',
    image: 'https://loremflickr.com/800/600/stopwatch,clock',
    teamSize: 'Individual',
    department: 'BS'
  }
];

export const SCHEDULE = [
  {
    day: 'Day 1 - March 27',
    events: [
      { time: '10:00 AM - 10:30 AM', title: 'Inauguration along with Banner Launch' },
      { time: '10:30 AM - 11:30 AM', title: 'Project Pitch Day' },
      { time: '11:30 AM - 12:30 PM', title: 'Cooking Without Fire' },
      { time: '12:30 PM - 01:00 PM', title: 'Blind Fold Taste Test' },
      { time: '01:00 PM - 02:00 PM', title: 'Lunch Break' },
      { time: '02:00 PM - 03:00 PM', title: 'Survey Hunt' },
      { time: '03:00 PM - 04:00 PM', title: 'Art Gallery' },
      { time: '03:00 PM - 03:30 PM', title: 'Spot Acting Battle' },
      { time: '04:00 PM - 05:00 PM', title: 'Game Zone' },
      { time: '05:00 PM - 07:00 PM', title: 'Graduation Day' },
      { time: '07:00 PM - 07:30 PM', title: 'Short Break' },
      { time: '07:30 PM - 08:30 PM', title: 'JCET Rock Band' },
    ]
  },
  {
    day: 'Day 2 - March 28',
    events: [
      { time: '10:00 AM - 10:30 AM', title: 'AI Prompt Battle' },
      { time: '10:30 AM - 11:30 AM', title: 'Tallest Tower Challenge' },
      { time: '11:30 AM - 12:00 PM', title: 'Awareness In Cinematic Campus Video' },
      { time: '12:00 PM - 01:00 PM', title: 'Meme Challenge' },
      { time: '01:00 PM - 02:00 PM', title: 'Lunch Break' },
      { time: '02:00 PM - 03:00 PM', title: 'Laugh Logic Loot' },
      { time: '03:00 PM - 03:30 PM', title: 'Dialogue Delivery Battle' },
      { time: '03:30 PM - 04:30 PM', title: 'Minute Master' },
      { time: '04:30 PM - 05:00 PM', title: 'Short Break' },
      { time: '05:00 PM - 05:30 PM', title: 'Valedictory' },
      { time: '05:30 PM - 07:30 PM', title: 'Melody Mania & Dance Infusion' },
      { time: '07:30 PM - 08:30 PM', title: 'DJ Night' },
    ]
  }
];
