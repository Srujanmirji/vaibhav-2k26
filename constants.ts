import { EventDetails } from './types';

// Replace this with your deployed Google Apps Script Web App URL
export const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyj0GWc2pGQcLkmQdHE-8aWSXt1u-wRFlfvv0JHHA_0eL9ZpFWj995GVQ3VPgwSQLIobg/exec';

// Replace with your Google Cloud Client ID (for Google Sign-In)
export const GOOGLE_CLIENT_ID = '258766307307-4o43namsrf53p4rc9o8shlm75sb483l9.apps.googleusercontent.com';

// Only these Google accounts can access the Admin page.
export const DEFAULT_KEYWORDS =
  'Vaibhav 2K26, tech fest, JCET, JCET Hubballi, Jain College of Engineering and Technology, Jain College Hubli, college events, hackathon, Hubli';
export const ADMIN_ALLOWED_EMAILS = [
  'vaibhav2k26jcet@gmail.com',
  'srujanmirji10@gmail.com',
  'jcetvaibhav@gmail.com',
  'prajwaljinagi63@gmail.com',
  'dharwadzishan@gmail.com',
  'sachitsarangamath44@gmail.com'
];

// Razorpay Keys (Frontend Checkout)
export const RAZORPAY_KEY_ID = 'rzp_live_SMPLH5DFYeMquJ';

export const DEPARTMENTS = ['All', 'CSE', 'ECE', 'CVE', 'ME', 'BS', 'MBA'];
export const EVENTS: EventDetails[] = [
  {
    "id": "e3",
    "title": "AI in EV",
    "category": "Tech",
    "description": "Explore the intersection of Artificial Intelligence and Electric Vehicles in this insightful session.",
    "rules": [
      "Maximum 2-3 students per team (interdisciplinary allowed).",
      "Paper in IEEE format (4-5 pages).",
      "Presentation: 6-10 minutes + Q&A.",
      "Topics: AI for EV Range Prediction, Smart Charging, Forward Detection, etc.",
      "PPT Presentation required (8-10 slides)."
    ],
    "facultyCoordinators": [
      {
        "name": "Mr. Deviprasad N Mirashi",
        "phone": "9916095029"
      }
    ],
    "studentCoordinators": [
      {
        "name": "Priyadarshini (Civil)",
        "phone": "8618382331"
      },
      {
        "name": "Ganga (Civil)",
        "phone": "7760206244"
      },
      {
        "name": "Chetan Badiger (ME)",
        "phone": "8867342344"
      },
      {
        "name": "Omprakash (ME)",
        "phone": "8296893297"
      }
    ],
    "date": "March 27, 2026",
    "time": "10:30 AM to 11:30 AM",
    "venue": "Visvesvaraya seminar Hall",
    "image": "/eventsposters/WhatsApp Image 2026-03-16 at 2.52.20 PM.jpeg",
    "teamSize": "Individual",
    "department": "ME",
    "fee": 100,
    "rulesPdf": "/rules/Paper Presentation on AI IN EV RULES.pdf"
  },
  {
    "id": "e13",
    "title": "AI Prompt Battle",
    "category": "AI/Tech",
    "description": "Master the art of prompt engineering. Compete to generate the best AI outputs under pressure.",
    "rules": [
      "Team of 4 members.",
      "Fee: 200 per team.",
      "Rounds: Accurate Prompt (Text/Code), Image Generation Prompt.",
      "Only one Gmail account per team allowed.",
      "No AI-generated prompts for the challenge itself.",
      "No mobile usage."
    ],
    "facultyCoordinators": [
      {
        "name": "Prof. Vishwanath H",
        "phone": "-"
      },
      {
        "name": "Prof. Praveen Hongal",
        "phone": "-"
      },
      {
        "name": "Prof. Saroja",
        "phone": "-"
      },
      {
        "name": "Prof. Harshala",
        "phone": "-"
      },
      {
        "name": "Mrs. Anjana",
        "phone": "-"
      }
    ],
    "studentCoordinators": [
      {
        "name": "Gurukiran J",
        "phone": "9014636477"
      }
    ],
    "date": "March 28, 2026",
    "time": "10:00 AM Onwards",
    "venue": "A117, Microcontrollers Lab",
    "image": "/eventsposters/WhatsApp Image 2026-03-16 at 2.58.26 PM.jpeg",
    "teamSize": "Team of 4",
    "department": "CSE",
    "fee": 200,
    "rulesPdf": "/rules/VAIBHAV 2K26(AI PROMPT BATTLE).pdf"
  },
  {
    "id": "e7",
    "title": "Art Gallery",
    "category": "Cultural",
    "description": "Display your artistic creations and admire the work of fellow students.",
    "rules": [
      "Mehendi: Intricate designs, 60m, hand one side.",
      "Model Making: Theme \"Save the Environment\", 60m, on-spot.",
      "Pencil Sketching: Graphite only, theme-based, 60m.",
      "Bouquet: Assembled from scratch on-spot, 60m.",
      "Registration Fee: ₹50."
    ],
    "facultyCoordinators": [
      {
        "name": "Dr. Bhadramma",
        "phone": "-"
      },
      {
        "name": "Dr. Devi G",
        "phone": "-"
      }
    ],
    "studentCoordinators": [
      {
        "name": "Sanika",
        "phone": "6363286188"
      },
      {
        "name": "Anjali R Uppin",
        "phone": "7019253914"
      },
      {
        "name": "Rekha",
        "phone": "7676999638"
      },
      {
        "name": "Harshita",
        "phone": "9113914185"
      }
    ],
    "date": "March 27, 2026",
    "time": "03:00 PM to 04:00 PM",
    "venue": "Library",
    "image": "/eventsposters/ART GALLERY_page-0001.jpg",
    "teamSize": "Individual",
    "department": "BS",
    "fee": 50,
    "groupFee": 50,
    "rulesPdf": "/rules/Rules of art gallery and minute master.pdf"
  },
  {
    "id": "e5",
    "title": "Blind Taste Challenge",
    "category": "Fun",
    "description": "Test your taste buds and identify ingredients while blindfolded in this exciting challenge.",
    "rules": [
      "Individual or Team of 2 members.",
      "Participants will be blindfolded throughout the round.",
      "Food items will be safe & vegetarian.",
      "Must guess the food item within given time limit.",
      "No removing blindfold; no assistance from audience."
    ],
    "facultyCoordinators": [
      {
        "name": "Prof. Sucheet M G",
        "phone": "-"
      }
    ],
    "studentCoordinators": [
      {
        "name": "Sanjay Jalli",
        "phone": "6360185670"
      },
      {
        "name": "Gopi Jadhav",
        "phone": "9108222438"
      },
      {
        "name": "Priyanka M",
        "phone": "9164013889"
      },
      {
        "name": "Bhagya K",
        "phone": "9019247397"
      }
    ],
    "date": "March 27, 2026",
    "time": "12:30 PM",
    "venue": "Electrical Lab",
    "image": "/eventsposters/WhatsApp Image 2026-03-16 at 2.51.14 PM.jpeg",
    "teamSize": "Solo or Team of 2",
    "department": "ME",
    "fee": 100,
    "rulesPdf": "/rules/Blind Fold Taste.pdf"
  },
  {
    "id": "e15_track1_direct",
    "title": "BUILDATHON Track 1",
    "category": "Tech",
    "description": "Prototype Proposal Challenge: An idea-driven innovation challenge. Submit a proposal, get shortlisted, and build your prototype in 6 hours.",
    "rules": [
      "Submit a proposal for a hardware prototype.",
      "Shortlisted teams build and demonstrate the project in a 6-hour offline round.",
      "Evaluation based on innovation, technical feasibility, and real-world impact.",
      "Inter-disciplinary and inter-college teams are encouraged.",
      "Registration Fee: ₹250 per team."
    ],
    "facultyCoordinators": [
      {
        "name": "Prof. Prabhudev Mallapur",
        "phone": "7083403465"
      }
    ],
    "studentCoordinators": [
      {
        "name": "Ms. Madiha Mannangi (6th Sem, ECE)",
        "phone": "8105669846"
      },
      {
        "name": "Ms. Sinchana Kulkarni (6th Sem, ECE)",
        "phone": "9483270923"
      }
    ],
    "date": "March 28, 2026",
    "time": "10:30 AM",
    "venue": "Electrical Lab",
    "image": "/eventsposters/WhatsApp Image 2026-03-16 at 2.53.41 PM.jpeg",
    "teamSize": "2-4 Members",
    "department": "ME",
    "fee": 250,
    "rulesPdf": "/rules/Buildathon_2k26.pdf",
    "registrationLink": "https://unstop.com/o/bmV1HCT?utm_medium=Share&utm_source=jcetclu22944&utm_campaign=Online_coding_challenge"
  },
  {
    "id": "e15",
    "title": "BUILDATHON 2026",
    "category": "Tech",
    "description": "Buildathon 2026 is a 6-hour hardware hackathon organized by the Robotics Club of JCET. Choose Between Prototype Proposal (Track 1) or Rapid Hardware Build (Track 2).",
    "rules": [
      "Track 1 (Innovation Challenge): Submit a proposal for a hardware prototype. Shortlisted teams build and demonstrate the project in a 6-hour offline round.",
      "Track 2 (Rapid Build Challenge): An on-spot 6-hour hardware build competition using components provided by coordinators.",
      "Evaluation based on innovation, technical feasibility, and real-world impact.",
      "Inter-disciplinary and inter-college teams are encouraged.",
      "Registration Fee: ₹250 per team."
    ],
    "facultyCoordinators": [
      {
        "name": "Prof. Prabhudev Mallapur",
        "phone": "7083403465"
      }
    ],
    "studentCoordinators": [
      {
        "name": "Ms. Madiha Mannangi (ECE)",
        "phone": "8105669846"
      },
      {
        "name": "Ms. Sinchana Kulkarni (ECE)",
        "phone": "9483270923"
      },
      {
        "name": "Mr. Varun Raval (ECE)",
        "phone": "9380246979"
      },
      {
        "name": "Mr. Md. Anas Khan (ME)",
        "phone": "8217589739"
      },
      {
        "name": "Mr. Kishan Bharade (ME)",
        "phone": "6362928359"
      }
    ],
    "date": "March 28, 2026",
    "time": "10:30 AM",
    "venue": "Electrical Lab",
    "image": "/eventsposters/WhatsApp Image 2026-03-16 at 2.53.41 PM.jpeg",
    "teamSize": "Multiple Tracks",
    "department": "ME",
    "fee": 250,
    "rulesPdf": "/rules/Buildathon_2k26.pdf",
    "tracks": [
      {
        "id": "e15_track1",
        "title": "Track 1: Prototype Proposal Challenge",
        "description": "An idea-driven innovation challenge. Submit a proposal, get shortlisted, and build your prototype in 6 hours.",
        "teamSize": "2-4 Members",
        "fee": 250,
        "registrationLink": "https://unstop.com/o/bmV1HCT?utm_medium=Share&utm_source=jcetclu22944&utm_campaign=Online_coding_challenge"
      },
      {
        "id": "e15_track2",
        "title": "Track 2: Rapid Hardware Build Challenge",
        "description": "An on-spot 6-hour rapid hardware build competition using provided Arduino and components.",
        "teamSize": "Solo or Max 3",
        "fee": 250
      }
    ]
  },
  {
    "id": "e19",
    "title": "Circuit Mania",
    "category": "Tech",
    "description": "Circuit Mania is a technical event focusing on basic electronics and problem-solving skills. Participants will work through simple challenges that involve identifying and correcting faults in electronic setups. The event encourages logical thinking, attention to detail, and practical knowledge of electronic components. It’s a great opportunity to apply what you’ve learned and experience real-world troubleshooting.",
    "rules": [
      "Number of participants per team: 1 or 2.",
      "The event will be conducted in three rounds: a quiz round, a schematic-based debugging round and a physical circuit debugging final round.",
      "Teams must advance to qualify.",
      "Participants must strictly follow the time limits and follow all instructions given by the organizers.",
      "Only the materials and equipment provided by the organizers may be used during the event.",
      "Any form of rule violation or misconduct will result in disqualification.",
      "Results will be announced on the same day, all participants will receive a participation certificate."
    ],
    "facultyCoordinators": [
      {
        "name": "Prof. Mahesh Hiremath",
        "phone": "-"
      },
      {
        "name": "Prof. Sachin Shetty",
        "phone": "-"
      }
    ],
    "studentCoordinators": [
      {
        "name": "Shristi Dasannavar (ECE)",
        "phone": "-"
      },
      {
        "name": "Meghana Bangari (ECE)",
        "phone": "-"
      }
    ],
    "date": "March 27, 2026",
    "time": "02:00 PM",
    "venue": "Electrical Lab",
    "image": "/eventsposters/WhatsApp Image 2026-03-16 at 2.49.51 PM.jpeg",
    "teamSize": "Solo or Team of 2",
    "department": "ECE",
    "fee": 100,
    "rulesPdf": "/rules/Circuitmania.pdf"
  },
  {
    "id": "e4",
    "title": "Cooking Without Fire",
    "category": "Fun",
    "description": "Show off your culinary skills without using any fire or heat source.",
    "rules": [
      "Max 2 members per team.",
      "No fire/heating devices; no pre-cooked items.",
      "Strictly vegetarian; no pre-cut/chopped raw materials.",
      "Time limit: 60 minutes.",
      "Judged on Taste, Cleanliness, Presentation, and Unique name."
    ],
    "facultyCoordinators": [
      {
        "name": "Prof. Kaveri Talawar",
        "phone": "-"
      },
      {
        "name": "Prof. Joyce Francis",
        "phone": "-"
      }
    ],
    "studentCoordinators": [
      {
        "name": "Rebecca (ECE)",
        "phone": "-"
      },
      {
        "name": "Malvika (ECE)",
        "phone": "-"
      }
    ],
    "date": "March 27, 2026",
    "time": "11:30 AM to 12.30 PM",
    "venue": "Electrical Lab",
    "image": "/eventsposters/WhatsApp Image 2026-03-16 at 2.51.32 PM.jpeg",
    "teamSize": "2 Members",
    "department": "ECE",
    "fee": 100,
    "rulesPdf": "/rules/cooking without fire.pdf"
  },
  {
    "id": "e20",
    "title": "Dialogue Delivery Battle",
    "category": "Cultural",
    "description": "Deliver iconic movie dialogues with your own twist and style.",
    "rules": [
      "Individual participation.",
      "Any language permitted.",
      "Time limit: 2-4 minutes.",
      "Movie, drama, or self-written dialogues allowed.",
      "Background music allowed (participant responsibility)."
    ],
    "facultyCoordinators": [
      {
        "name": "Prof. Shivakanth M",
        "phone": "-"
      }
    ],
    "studentCoordinators": [
      {
        "name": "Karthik",
        "phone": "-"
      },
      {
        "name": "Ramanagouda",
        "phone": "-"
      }
    ],
    "date": "March 28, 2026",
    "time": "03:00 PM to 3:30 PM",
    "venue": "Seminar Hall",
    "image": "/eventsposters/WhatsApp Image 2026-03-16 at 2.51.12 PM.jpeg",
    "teamSize": "Individual",
    "department": "ME",
    "fee": 100,
    "rulesPdf": "/rules/Dialogue Delivery Battle.pdf"
  },
  {
    "id": "e24",
    "title": "DJ Night",
    "category": "Cultural",
    "description": "Dance the night away with the most energetic tracks at our grand DJ Night.",
    "rules": [
      "Open floor for dancing.",
      "Professional DJ setup.",
      "Maintained security and discipline mandatory."
    ],
    "facultyCoordinators": [
      {
        "name": "General Co-ordinators",
        "phone": "-"
      }
    ],
    "studentCoordinators": [
      {
        "name": "Team Vaibhav",
        "phone": "-"
      }
    ],
    "date": "March 27, 2026",
    "time": "07:30 PM",
    "venue": "Quadrangle",
    "image": "https://loremflickr.com/800/600/dj,party",
    "teamSize": "Individual",
    "department": "General",
    "fee": 0,
    "registrationClosed": true
  },
  {
    "id": "e18",
    "title": "Game Zone",
    "category": "Gaming",
    "description": "Relax and have fun with a variety of indoor games and activities.",
    "rules": [
      "Team: 2 or 4 members.",
      "Fee: 200 per team.",
      "Games: BGMI, Free Fire, Valorant, etc.",
      "Bring your own peripherals (mouse, headphones, etc.).",
      "No personal mobile/peripherals use once match starts.",
      "Damage to lab material is team responsibility."
    ],
    "facultyCoordinators": [
      {
        "name": "Prof. Raghunathsingh Rajput",
        "phone": "-"
      },
      {
        "name": "Prof. Archana M",
        "phone": "-"
      },
      {
        "name": "Prof. Rakesh A",
        "phone": "-"
      }
    ],
    "studentCoordinators": [
      {
        "name": "Mr. Tejasvi V D",
        "phone": "7338615066"
      }
    ],
    "date": "March 27, 2026",
    "time": "02:00 PM",
    "venue": "CAED Lab",
    "image": "https://loremflickr.com/800/600/gaming,videogame",
    "teamSize": "Open for All",
    "department": "CSE",
    "fee": 200,
    "rulesPdf": "/rules/RULES_FOR_Game Zone.pdf"
  },
  {
    "id": "e11",
    "title": "Graduation Day Magzine Launch & Kreeda Vaibhav Certificate Distribution",
    "category": "General",
    "description": "Magazine launch and Kreeda Vaibhav certificate distribution ceremony.",
    "rules": [
      "Official launch of the college magazine.",
      "Certificate distribution for Kreeda Vaibhav winners.",
      "Formal dress code recommended."
    ],
    "facultyCoordinators": [
      {
        "name": "General Co-ordinators",
        "phone": "-"
      }
    ],
    "studentCoordinators": [
      {
        "name": "Team Vaibhav",
        "phone": "-"
      }
    ],
    "date": "March 27, 2026",
    "time": "05:00 PM",
    "venue": "Quadrangle",
    "image": "https://loremflickr.com/800/600/graduation,magazine",
    "teamSize": "Individual",
    "department": "General",
    "fee": 0,
    "registrationClosed": true
  },
  {
    "id": "e1",
    "title": "Inauguration along with Banner Launch",
    "category": "General",
    "description": "Kickstart Vaibhav 2K26 with our grand inauguration and the official banner launch.",
    "rules": [
      "Official ceremony for Vaibhav 2K26",
      "Presence of all students and faculty is mandatory",
      "Followed by the official banner launch"
    ],
    "facultyCoordinators": [
      {
        "name": "Prof. Mahendra M K",
        "phone": "-"
      },
      {
        "name": "Prof. Pooja Patil",
        "phone": "-"
      }
    ],
    "studentCoordinators": [],
    "date": "March 27, 2026",
    "time": "10:00 AM",
    "venue": "Quadrangle",
    "image": "https://loremflickr.com/800/600/celebration,ceremony",
    "teamSize": "Individual",
    "department": "General",
    "fee": 0,
    "registrationClosed": true
  },
  {
    "id": "e9",
    "title": "Laugh Logic Loot",
    "category": "Tech",
    "description": "A multi-round quest involving Coding, Campus Treasure Hunt, and Meme making.",
    "rules": [
      "ROUND 1: CODE BREAKER GATEWAY - Coding & Logic Relay. Each member must complete one task in sequence. The next member can begin only after the previous member finishes.",
      "ROUND 2: CAMPUS QUEST - Exploration & Puzzle solving. Includes a Creative Disruption (Meme Challenge) where teams create original, clean, and respectful college-themed memes.",
      "ROUND 3: IDENTITY MATCH QUEST - Locate mentors to scan QR codes. Faculty Card verification is required; the card ID must match the Team ID for a successful scan.",
      "ROUND 4: FINAL TREASURE VAULT - Solve digital challenges to obtain a final code and unlock the physical treasure box.",
      "WINNER SELECTION: The first team to correctly unlock the physical treasure box wins the cash prize. organizers' decisions are final and binding."
    ],
    "facultyCoordinators": [
      {
        "name": "Prof. Harshita C K",
        "phone": "-"
      },
      {
        "name": "Prof. Vinod A",
        "phone": "-"
      },
      {
        "name": "Prof. Pooja S",
        "phone": "-"
      },
      {
        "name": "Prof. Shobha H",
        "phone": "-"
      },
      {
        "name": "Mrs. Suprita",
        "phone": "-"
      }
    ],
    "studentCoordinators": [
      {
        "name": "Abdul Muqeet Kazi",
        "phone": "8296093149"
      },
      {
        "name": "Uzma Savnur",
        "phone": "9845736315"
      },
      {
        "name": "Veda Manohar",
        "phone": "7204758126"
      },
      {
        "name": "Mohammad Haris",
        "phone": "9353499105"
      },
      {
        "name": "Mehseen",
        "phone": "6360357659"
      },
      {
        "name": "Almas",
        "phone": "7019112892"
      }
    ],
    "date": "March 26 & 27, 2026",
    "time": "03:00 PM",
    "venue": "A208",
    "image": "/eventsposters/WhatsApp Image 2026-03-16 at 2.59.23 PM.jpeg",
    "teamSize": "Team of 4",
    "department": "CSE",
    "fee": 200,
    "rulesPdf": "/rules/Laugh,logic,loot.pdf",
    "registrationLink": "https://sites.google.com/view/laugh-logic-loot-2026"
  },
  {
    "id": "e23",
    "title": "Melody Mania",
    "category": "Cultural",
    "description": "A spectacular showcase of vocal talent. Compete in solo or group singing categories.",
    "rules": [
      "Solo Singing: 3-6 mins.",
      "Group Singing: 4-7 mins.",
      "Tracks must be in mp3 format.",
      "No hazardous props allowed on stage.",
      "Registration Fee: Solo - ₹100, Group - ₹200."
    ],
    "facultyCoordinators": [
      {
        "name": "Prof. Shwetha G C",
        "phone": "-"
      },
      {
        "name": "Prof. Anitha U",
        "phone": "-"
      },
      {
        "name": "Prof. Harshitha C K",
        "phone": "-"
      },
      {
        "name": "Prof. Pooja Patil",
        "phone": "-"
      }
    ],
    "studentCoordinators": [
      {
        "name": "Satvik (CSE-2nd Sem)",
        "phone": "9743045805"
      },
      {
        "name": "Anush (CSE-2nd Sem)",
        "phone": "7619266419"
      },
      {
        "name": "Arpitha M Udoji",
        "phone": "8105262158"
      },
      {
        "name": "Alfiya",
        "phone": "9019512055"
      },
      {
        "name": "Srushti Inamdar",
        "phone": "8431063097"
      },
      {
        "name": "Drushti",
        "phone": "7483480781"
      }
    ],
    "date": "March 28, 2026",
    "time": "05:30 PM",
    "venue": "Quadrangle",
    "image": "/eventsposters/WhatsApp Image 2026-03-16 at 2.51.05 PM.jpeg",
    "teamSize": "Solo or Group",
    "department": "General",
    "fee": 100,
    "groupFee": 200,
    "rulesPdf": "/rules/dance jcet.pdf"
  },
  {
    "id": "e25",
    "title": "Dance Mania",
    "category": "Cultural",
    "description": "Rhythmic dance performances. Show your moves in solo or group dance categories.",
    "rules": [
      "Solo Dance: 3-6 mins.",
      "Group Dance: 3-6 mins, max 8 people.",
      "Tracks must be in mp3 format.",
      "No hazardous props allowed on stage.",
      "Registration Fee: Solo - ₹100, Group - ₹200."
    ],
    "facultyCoordinators": [
      {
        "name": "Prof. Pooja Patil",
        "phone": "-"
      },
      {
        "name": "Prof. Harshita C K",
        "phone": "-"
      }
    ],
    "studentCoordinators": [
      {
        "name": "Arpitha M Udoji",
        "phone": "8105262158"
      },
      {
        "name": "Alfiya",
        "phone": "9019512055"
      }
    ],
    "date": "March 28, 2026",
    "time": "06:30 PM",
    "venue": "Quadrangle",
    "image": "/eventsposters/WhatsApp Image 2026-03-16 at 2.51.06 PM.jpeg",
    "teamSize": "Solo or Group",
    "department": "General",
    "fee": 100,
    "groupFee": 200,
    "rulesPdf": "/rules/dance jcet.pdf"
  },
  {
    "id": "e17",
    "title": "Meme Challenge",
    "category": "Fun",
    "description": "Create the funniest memes related to college life and technology.",
    "rules": [
      "Individual or Team participation permitted.",
      "Theme: College life, technology, or current trends.",
      "Offensive or inappropriate content will lead to disqualification.",
      "Max 2 entries per person/team."
    ],
    "facultyCoordinators": [
      {
        "name": "Prof. Padma D (CSE)",
        "phone": "-"
      },
      {
        "name": "Prof. Amrutha P (CSE)",
        "phone": "-"
      },
      {
        "name": "Prof. Tejashwini (CSE)",
        "phone": "-"
      },
      {
        "name": "Miss Anusha (CSE)",
        "phone": "-"
      }
    ],
    "studentCoordinators": [
      {
        "name": "Omkar Hegde (CSE 6th SEM)",
        "phone": "8618866208"
      },
      {
        "name": "Darshan A (CSE 6th SEM)",
        "phone": "9449309595"
      },
      {
        "name": "B Akshya (CSE 6th SEM)",
        "phone": "9036637697"
      }
    ],
    "date": "March 28, 2026",
    "time": "12:00 PM",
    "venue": "Skill Lab",
    "image": "/eventsposters/WhatsApp Image 2026-03-16 at 3.02.36 PM.jpeg",
    "teamSize": "Individual or Team",
    "department": "CSE",
    "fee": 50,
    "groupFee": 100,
    "rulesPdf": "/rules/Rules for Meme (1).pdf"
  },
  {
    "id": "e21",
    "title": "Minute Master",
    "category": "Fun",
    "description": "Complete simple tasks within one minute to win exciting prizes.",
    "rules": [
      "Team: 2 members.",
      "Multiple rounds with 60s challenges.",
      "On-spot rules announcement.",
      "Disqualification for rule violation.",
      "Registration Fee: ₹50 per team."
    ],
    "facultyCoordinators": [
      {
        "name": "Prof. Chaithanya",
        "phone": "-"
      },
      {
        "name": "Prof. Anita P G",
        "phone": "-"
      }
    ],
    "studentCoordinators": [
      {
        "name": "Shrinidhi",
        "phone": "7019827684"
      },
      {
        "name": "Srujan H",
        "phone": "9663058411"
      },
      {
        "name": "Mandar S",
        "phone": "9448589221"
      }
    ],
    "date": "March 28, 2026",
    "time": "03:30 PM to 4:30 PM",
    "venue": "Seminar Hall",
    "image": "/eventsposters/minute master(1)_page-0001.jpg",
    "teamSize": "Team of 2",
    "department": "BS",
    "fee": 50,
    "groupFee": 50,
    "rulesPdf": "/rules/Rules of art gallery and minute master.pdf"
  },
  {
    "id": "e10",
    "title": "Performances by Kala Sangam Team",
    "category": "Cultural",
    "description": "Vibrant cultural performances by the talented Kala Sangam team.",
    "rules": [
      "Performance by the official college team.",
      "Showcase of various dance and musical forms.",
      "Audience must maintain decorum."
    ],
    "facultyCoordinators": [
      {
        "name": "Prof. Shwetha G C",
        "phone": "-"
      },
      {
        "name": "Prof. Anitha U",
        "phone": "-"
      }
    ],
    "studentCoordinators": [],
    "date": "March 27, 2026",
    "time": "04:00 PM",
    "venue": "Quadrangle",
    "image": "https://loremflickr.com/800/600/dance,culture",
    "teamSize": "Group",
    "department": "General",
    "fee": 0,
    "registrationClosed": true
  },
  {
    "id": "e2",
    "title": "JCET SHARK TANK",
    "category": "Innovation",
    "description": "Showcase your ground-breaking ideas and present a Pitch Deck solving a niche problem in this Shark Tank style event.",
    "rules": [
      "Team Size: 3 to 5 members (Cross-departmental teams encouraged).",
      "Pre-registration required by 25th March 2026.",
      "Submit a PPT covering: Problem statement, Proposed Solution, Technical Feasibility, Market & Social Impact, Scalability.",
      "Presentation: 8 mins Pitch + 2 mins Q&A (Strict timing).",
      "Registration Fee: ₹200 per Team."
    ],
    "facultyCoordinators": [
      {
        "name": "Prof. Trupti Thite",
        "phone": "-"
      },
      {
        "name": "Prof. Megha Saunshi",
        "phone": "-"
      },
      {
        "name": "Prof. Vanita",
        "phone": "-"
      },
      {
        "name": "Mr. Narayan D",
        "phone": "-"
      }
    ],
    "studentCoordinators": [
      {
        "name": "Vadiraj",
        "phone": "9686540253"
      },
      {
        "name": "Gagan",
        "phone": "9148785898"
      },
      {
        "name": "Tejaswini",
        "phone": "7483574498"
      },
      {
        "name": "V. Sahana",
        "phone": "9591737753"
      }
    ],
    "date": "March 27, 2026",
    "time": "10:30 AM to 11:30 AM",
    "venue": "208, CSE Department",
    "image": "/eventsposters/WhatsApp Image 2026-03-16 at 3.04.58 PM.jpeg",
    "teamSize": "3-5 Members",
    "department": "CSE",
    "fee": 200,
    "rulesPdf": "/rules/Project Pitch.pdf"
  },
  {
    "id": "e12",
    "title": "Rock Band",
    "category": "Cultural",
    "description": "End the day with an energetic performance by the JCET Rock Band.",
    "rules": [
      "Live musical performance.",
      "High energy rock and pop music.",
      "Open to all registered attendees."
    ],
    "facultyCoordinators": [
      {
        "name": "Prof. CVE Dept",
        "phone": "-"
      }
    ],
    "studentCoordinators": [
      {
        "name": "Team JCET",
        "phone": "-"
      }
    ],
    "date": "March 27, 2026",
    "time": "07:30 PM",
    "venue": "Quadrangle",
    "image": "https://loremflickr.com/800/600/rock,band",
    "teamSize": "Group",
    "department": "General",
    "fee": 0,
    "registrationClosed": true
  },
  {
    "id": "e16",
    "title": "Cinematic Awareness Video Contest",
    "category": "Competition",
    "description": "Create a short cinematic social awareness video on a real-world challenge. Inspire positive change through digital storytelling.",
    "rules": [
      "Themes: Environmental Protection, Road Safety, Mental Health, Digital Addiction, Women Safety, Cyber Security, etc.",
      "Video must clearly communicate a social message.",
      "Judging on Creativity, Clarity of Message, Story & Presentation."
    ],
    "facultyCoordinators": [
      {
        "name": "Dr. Sathyanarayana A",
        "phone": "-"
      }
    ],
    "studentCoordinators": [
      {
        "name": "Levi",
        "phone": "8123817233"
      },
      {
        "name": "Abhinav",
        "phone": "8660439712"
      },
      {
        "name": "Gourav",
        "phone": "8088384282"
      },
      {
        "name": "Akash",
        "phone": "8792055904"
      }
    ],
    "date": "March 27, 2026",
    "time": "11:30 AM",
    "venue": "Seminar Hall",
    "image": "/eventsposters/WhatsApp Image 2026-03-16 at 2.51.13 PM.jpeg",
    "teamSize": "Team of 2-4",
    "department": "ME",
    "fee": 100,
    "rulesPdf": "/rules/Social Awareness Video Contest.pdf"
  },
  {
    "id": "e8",
    "title": "Spot Acting Battle",
    "category": "Cultural",
    "description": "Improvise and act out scenes on the spot. Show your spontaneity!",
    "rules": [
      "Individual participation.",
      "Topic/situation given on the spot.",
      "Preparation time: 2-3 minutes.",
      "Performance time: 3-5 minutes.",
      "No vulgar, offensive, or political content."
    ],
    "facultyCoordinators": [
      {
        "name": "Prof. Venkanagouda H",
        "phone": "7795731359"
      }
    ],
    "studentCoordinators": [
      {
        "name": "Manikanta S K",
        "phone": "7411310976"
      },
      {
        "name": "Shreyas J S",
        "phone": "9611014516"
      },
      {
        "name": "Miss Priyanka",
        "phone": "-"
      },
      {
        "name": "Miss Khushi",
        "phone": "-"
      }
    ],
    "date": "March 27, 2026",
    "time": "03:00 PM to 3:30 PM",
    "venue": "Mechanical Seminar Hall",
    "image": "/eventsposters/WhatsApp Image 2026-03-16 at 2.51.08 PM.jpeg",
    "teamSize": "Individual",
    "department": "ME",
    "fee": 100,
    "rulesPdf": "/rules/Spot Acting Battle.pdf"
  },
  {
    "id": "e6",
    "title": "Survey Hunt",
    "category": "Fun",
    "description": "A scavenger hunt with a twist. Solve clues and complete the survey.",
    "rules": [
      "Team of 3-4 members (Min 1 from Civil).",
      "Round 1: Technical Quiz (20 MCQs); Round 2: Field Hunt.",
      "No mobile usage during field round.",
      "Time limit: 60-90 minutes.",
      "Scientific calculator allowed."
    ],
    "facultyCoordinators": [
      {
        "name": "Mr. Prashanth S P",
        "phone": "7406932383"
      }
    ],
    "studentCoordinators": [
      {
        "name": "Abuzar Sagar",
        "phone": "9731617630"
      },
      {
        "name": "Suraj",
        "phone": "9663074795"
      }
    ],
    "date": "March 27, 2026",
    "time": "02:00 PM",
    "venue": "A118",
    "image": "/eventsposters/survey hunt.jpeg",
    "teamSize": "Team of 4",
    "department": "CVE",
    "fee": 100,
    "rulesPdf": "/rules/Survey Hunt.pdf"
  },
  {
    "id": "e14",
    "title": "Tallest Tower Challenge",
    "category": "Competition",
    "description": "Build the tallest stable tower using limited materials within the time limit.",
    "rules": [
      "Team of 4 members.",
      "Materials: 100 sticks, glue, thread, A3 base.",
      "Tower must be free-standing (stable for 60s).",
      "Construction time: 60 minutes.",
      "Max base size: 20x20cm."
    ],
    "facultyCoordinators": [
      {
        "name": "Prof. Sunil U",
        "phone": "-"
      },
      {
        "name": "Prof. Shwetha G C",
        "phone": "-"
      },
      {
        "name": "Dr. Shruti S K",
        "phone": "-"
      }
    ],
    "studentCoordinators": [
      {
        "name": "Raveena",
        "phone": "-"
      },
      {
        "name": "Pushpavathi",
        "phone": "-"
      }
    ],
    "date": "March 28, 2026",
    "time": "10:30 AM",
    "venue": "A118",
    "image": "/eventsposters/WhatsApp Image 2026-03-16 at 2.50.07 PM.jpeg",
    "teamSize": "Team of 4",
    "department": "CVE",
    "fee": 200,
    "rulesPdf": "/rules/Tallest Tower challenge Technical Event Details.pdf"
  },

  {
    "id": "e26",
    "title": "Traditional Day",
    "category": "General",
    "description": "Celebrate Culture & Heritage. Dress in your traditional best and celebrate the spirit of culture!",
    "rules": [
      "Traditional Skit",
      "Folk Songs",
      "Oggattu",
      "Passing the Message",
      "Ramp Walk"
    ],
    "facultyCoordinators": [
      {
        "name": "General Co-ordinators",
        "phone": "-"
      }
    ],
    "studentCoordinators": [
      {
        "name": "Team Vaibhav",
        "phone": "-"
      }
    ],
    "date": "March 25, 2026",
    "time": "11:00 AM to 04:00 PM",
    "venue": "JCET Campus, Hubballi",
    "image": "/eventsposters/traditional day .jpeg",
    "teamSize": "Individual/Group",
    "department": "General",
    "fee": 0,
    "registrationClosed": true
  },
  {
    "id": "e27",
    "title": "Mismatch Day",
    "category": "General",
    "description": "A day of fun, colors, and creativity! Show off your most mismatched and quirky outfits.",
    "rules": [
      "Madact",
      "Painting",
      "Twin Telepathy",
      "Dance",
      "Ramp Walk"
    ],
    "facultyCoordinators": [
      {
        "name": "General Co-ordinators",
        "phone": "-"
      }
    ],
    "studentCoordinators": [
      {
        "name": "Team Vaibhav",
        "phone": "-"
      }
    ],
    "date": "March 26, 2026",
    "time": "11:00 AM to 04:00 PM",
    "venue": "JCET Campus, Hubballi",
    "image": "/eventsposters/traditional day .jpeg",
    "teamSize": "Individual/Group",
    "department": "General",
    "fee": 0,
    "registrationClosed": true
  }
];

export const SCHEDULE = [
  {
    day: 'Pre-Event - March 25',
    events: [
      { time: '11:00 AM - 04:00 PM', title: 'Traditional Day' },
    ]
  },
  {
    day: 'Pre-Event - March 26',
    events: [
      { time: '11:00 AM - 04:00 PM', title: 'Mismatch Day' },
    ]
  },
  {
    day: 'Day 1 - March 27',
    events: [
      { time: '10:00 AM - 10:30 AM', title: 'Inauguration along with Banner Launch' },
      { time: '10:30 AM - 11:30 AM', title: 'Project Pitch Day' },
      { time: '10:30 AM - 11:30 AM', title: 'AI in EV' },
      { time: '11:30 AM - 12:30 PM', title: 'Cooking Without Fire' },
      { time: '12:30 PM - 01:00 PM', title: 'Blind Fold Taste' },
      { time: '01:00 PM - 02:00 PM', title: 'Lunch Break' },
      { time: '02:00 PM - 03:00 PM', title: 'Survey Hunt' },
      { time: '03:00 PM - 04:00 PM', title: 'Art Gallery' },
      { time: '03:00 PM - 03:30 PM', title: 'Spot Acting Battle' },
      { time: '03:00 PM - 04:00 PM', title: 'Laugh Logic Loot' },
      { time: '04:00 PM - 05:00 PM', title: 'Performances by Kala Sangam Team' },
      { time: '05:00 PM - 07:00 PM', title: 'Graduation Day Magzine Launch & Kreeda Vaibhav Certificate Distribution' },
      { time: '07:00 PM - 07:30 PM', title: 'Short Break' },
      { time: '07:30 PM - 08:30 PM', title: 'Rock Band' },
    ]
  },
  {
    day: 'Day 2 - March 28',
    events: [
      { time: '10:00 AM - 10:30 AM', title: 'AI Prompt Battle' },
      { time: '10:30 AM - 11:30 AM', title: 'Tallest Tower Challenge' },
      { time: '10:30 AM - 11:30 AM', title: 'Buildathon' },
      { time: '11:30 AM - 12:00 PM', title: 'Awareness In Cinematic Campus Video (Social Cause)' },
      { time: '12:00 PM - 01:00 PM', title: 'Meme Challenge' },
      { time: '01:00 PM - 02:00 PM', title: 'Lunch Break' },
      { time: '02:00 PM - 03:00 PM', title: 'Game Zone' },
      { time: '02:00 PM - 03:00 PM', title: 'Circuit Mania' },
      { time: '03:00 PM - 03:30 PM', title: 'Dialogue Delivery Battle' },
      { time: '03:30 PM - 04:30 PM', title: 'Minute Master' },
      { time: '04:30 PM - 05:00 PM', title: 'Short Break' },
      { time: '05:30 PM - 07:30 PM', title: 'Melody Mania' },
      { time: '07:30 PM - 08:30 PM', title: 'DJ Night' },
    ]
  }
];