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
    "time": "10:30 AM",
    "venue": "Seminar Hall",
    "image": "https://loremflickr.com/800/600/electric,car,ai",
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
    "time": "10:00 AM",
    "venue": "A112",
    "image": "https://loremflickr.com/800/600/artificial-intelligence,robot",
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
      "Bouquet: Assembled from scratch on-spot, 60m."
    ],
    "facultyCoordinators": [
      {
        "name": "Dr. Bhadramma",
        "phone": "-"
      },
      {
        "name": "Prof. Anita P G",
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
    "time": "03:00 PM",
    "venue": "Library",
    "image": "https://loremflickr.com/800/600/art,gallery",
    "teamSize": "Individual",
    "department": "BS",
    "fee": 100,
    "rulesPdf": "/rules/Rules of art gallery and minute master.pdf"
  },
  {
    "id": "e5",
    "title": "Blind Fold Taste Test",
    "category": "Fun",
    "description": "Test your taste buds and identify ingredients while blindfolded.",
    "rules": [
      "Individual or Team of 2 members.",
      "Participants will be blindfolded throughout the round.",
      "Food items will be safe & vegetarian.",
      "Must guess the food item within given time limit.",
      "No removing blindfold; no assistance from audience."
    ],
    "facultyCoordinators": [
      {
        "name": "Prof. Sucheet M. Gogeri",
        "phone": "-"
      }
    ],
    "studentCoordinators": [
      {
        "name": "Sanjay",
        "phone": "6360185670"
      },
      {
        "name": "Gopi Jadhav",
        "phone": "9108222438"
      },
      {
        "name": "Priya Irkal",
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
    "image": "https://loremflickr.com/800/600/tasting,food",
    "teamSize": "Solo or Team of 2",
    "department": "ME",
    "fee": 100,
    "rulesPdf": "/rules/Blind Fold Taste.pdf"
  },
  {
    "id": "e15",
    "title": "Buildathon",
    "category": "Tech",
    "description": "A hands-on building challenge where creativity meets engineering.",
    "rules": [
      "Project must be based on Arduino.",
      "Unique, working model must be built on-spot.",
      "Max 3 members per team or solo.",
      "No internet/AI applications allowed.",
      "Bring your own laptops; copy-paste of code allowed."
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
        "name": "Mr. Md. Anas Khan (ME)",
        "phone": "8217589739"
      },
      {
        "name": "Mr. Kishan Bharade (ME)",
        "phone": "6362928359"
      },
      {
        "name": "Mr. Satvik Pandurangi (ECE)",
        "phone": "8073623745"
      }
    ],
    "date": "March 28, 2026",
    "time": "10:30 AM",
    "venue": "Electrical Lab",
    "image": "https://loremflickr.com/800/600/engineering,tools",
    "teamSize": "2-4 Members",
    "department": "ME",
    "fee": 250,
    "rulesPdf": "/rules/Buildathon_2k26.pdf"
  },
  {
    "id": "e19",
    "title": "Circuit Mania",
    "category": "Tech",
    "description": "Test your skills in circuit design and debugging in this electrifying event.",
    "rules": [
      "Individual participation.",
      "Round 1: Theory-based MCQ screening.",
      "Round 2: Identify & rectify faults in given circuit.",
      "No mobile phones or personal materials allowed.",
      "Decision of judges is final and binding."
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
    "date": "March 28, 2026",
    "time": "02:00 PM",
    "venue": "Electrical Lab",
    "image": "https://loremflickr.com/800/600/electronics,circuit",
    "teamSize": "Individual",
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
    "time": "11:30 AM",
    "venue": "Electrical Lab",
    "image": "https://loremflickr.com/800/600/cooking,chef",
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
        "name": "Shivakant. M",
        "phone": "-"
      }
    ],
    "studentCoordinators": [
      {
        "name": "Omprakash T",
        "phone": "8296893297"
      },
      {
        "name": "Basavaraj K",
        "phone": "9535725483"
      },
      {
        "name": "Bhagyalaxmi K",
        "phone": "9019247397"
      },
      {
        "name": "Khushi C",
        "phone": "8660968316"
      }
    ],
    "date": "March 28, 2026",
    "time": "03:00 PM",
    "venue": "Seminar Hall",
    "image": "https://loremflickr.com/800/600/cinema,actor",
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
    "date": "March 28, 2026",
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
    "date": "March 28, 2026",
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
    "title": "Graduation Day Magazine Launch",
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
        "name": "Dr. V. G. Kasabegoudar",
        "phone": "Principal"
      }
    ],
    "studentCoordinators": [
      {
        "name": "General Support Team",
        "phone": "-"
      }
    ],
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
      "4 members per team.",
      "Round 1: Code Breaker sequence (Logic screening).",
      "Round 2: Campus Quest (Puzzle solving & movement).",
      "Round 3: Meme Challenge (College-themed, clean content).",
      "Round 4: Treasure Vault (Digital unlock + physical prize)."
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
      }
    ],
    "date": "March 27, 2026",
    "time": "03:00 PM",
    "venue": "A208",
    "image": "https://loremflickr.com/800/600/standup,comedy",
    "teamSize": "Team of 4",
    "department": "CSE",
    "fee": 200,
    "rulesPdf": "/rules/laugh-logic-loot VAIBHAV 2K26.pdf"
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
      "No hazardous props allowed on stage."
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
    "studentCoordinators": [
      {
        "name": "Satvik (CSE)",
        "phone": "9743045805"
      },
      {
        "name": "Anush (CSE)",
        "phone": "7619266419"
      }
    ],
    "date": "March 28, 2026",
    "time": "05:30 PM",
    "venue": "Quadrangle",
    "image": "https://loremflickr.com/800/600/singing,music",
    "teamSize": "Solo or Group",
    "department": "General",
    "fee": 350,
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
      "No hazardous props allowed on stage."
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
    "image": "https://loremflickr.com/800/600/dance,stage",
    "teamSize": "Solo or Group",
    "department": "General",
    "fee": 350,
    "rulesPdf": "/rules/dance jcet.pdf"
  },
  {
    "id": "e17",
    "title": "Meme Challenge",
    "category": "Fun",
    "description": "Create the funniest memes related to college life and technology.",
    "rules": [
      "Individual participation.",
      "Theme: College life, technology, or current trends.",
      "Offensive or inappropriate content will lead to disqualification.",
      "Max 2 entries per person."
    ],
    "facultyCoordinators": [
      {
        "name": "Mr. Girish G",
        "phone": "-"
      },
      {
        "name": "Mr. Santosh Patil",
        "phone": "-"
      },
      {
        "name": "Ms. Saroja",
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
    "time": "12:00 PM",
    "venue": "Skill Lab",
    "image": "https://loremflickr.com/800/600/computer,funny",
    "teamSize": "Individual",
    "department": "CSE",
    "fee": 100,
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
      "Disqualification for rule violation."
    ],
    "facultyCoordinators": [
      {
        "name": "Dr. Bhadramma",
        "phone": "-"
      },
      {
        "name": "Prof. Anita P G",
        "phone": "-"
      },
      {
        "name": "Dr. Devi G",
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
    "time": "03:30 PM",
    "venue": "Seminar Hall",
    "image": "https://loremflickr.com/800/600/stopwatch,clock",
    "teamSize": "Team of 2",
    "department": "BS",
    "fee": 100,
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
    "studentCoordinators": [
      {
        "name": "Srushti Inamdar",
        "phone": "8431063097"
      },
      {
        "name": "Drushti",
        "phone": "7483480781"
      }
    ],
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
    "title": "Project Pitch Day",
    "category": "Innovation",
    "description": "Showcase your ground-breaking ideas and projects to a panel of industry experts and investors.",
    "rules": [
      "Max 2-3 members per team.",
      "Paper must be in IEEE format (4-5 pages).",
      "Presentation duration: 6-10 minutes + 2-3m Q&A.",
      "Topic: Current tech or AI in EV.",
      "Participants must bring their own PowerPoint (PPT).",
      "Maximum 8-10 slides recommended."
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
    "time": "10:30 AM",
    "venue": "A208",
    "image": "https://loremflickr.com/800/600/business,meeting",
    "teamSize": "2-4 Members",
    "department": "CSE",
    "fee": 100
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
    "title": "Awareness In Cinematic Campus Video (Social Cause)",
    "category": "Competition",
    "description": "Create a short cinematic social awareness video on a real-world challenge. Inspire positive change through digital storytelling.",
    "rules": [
      "Team of 2-4 members.",
      "Topics: Road Safety, Environment, Mental Health, Cyber Security, etc.",
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
    "date": "March 28, 2026",
    "time": "11:30 AM",
    "venue": "Seminar Hall",
    "image": "https://loremflickr.com/800/600/filmmaking,camera",
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
        "name": "Prof. Venkangoud H",
        "phone": "-"
      }
    ],
    "studentCoordinators": [
      {
        "name": "Bhagyalaxmi K",
        "phone": "9019247397"
      },
      {
        "name": "Khushi C",
        "phone": "8660968316"
      }
    ],
    "date": "March 27, 2026",
    "time": "03:00 PM",
    "venue": "Seminar Hall",
    "image": "https://loremflickr.com/800/600/theatre,drama",
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
    "image": "https://loremflickr.com/800/600/map,search",
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
        "name": "Raveena T B",
        "phone": "-"
      },
      {
        "name": "Pushpavathi B S",
        "phone": "-"
      },
      {
        "name": "Darshan Patil",
        "phone": "-"
      },
      {
        "name": "Raja Hussain G",
        "phone": "-"
      }
    ],
    "date": "March 28, 2026",
    "time": "10:30 AM",
    "venue": "A118",
    "image": "https://loremflickr.com/800/600/building-blocks,tower",
    "teamSize": "Team of 3",
    "department": "CVE",
    "fee": 100,
    "rulesPdf": "/rules/Tallest Tower challenge Technical Event Details.pdf"
  },
  {
    "id": "e22",
    "title": "Valedictory",
    "category": "General",
    "description": "The closing ceremony of Vaibhav 2K26, celebrating the achievements of all participants.",
    "rules": [
      "Closing ceremony and prize distribution.",
      "Attendance encouraged for all.",
      "Reflection on event highlights."
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
    "date": "March 28, 2026",
    "time": "05:00 PM",
    "venue": "Quadrangle",
    "image": "https://loremflickr.com/800/600/celebration,award",
    "teamSize": "Individual",
    "department": "General",
    "fee": 0,
    "registrationClosed": true
  }
];

export const SCHEDULE = [
  {
    day: 'Day 1 - March 27',
    events: [
      { time: '10:00 AM - 10:30 AM', title: 'Inauguration along with Banner Launch' },
      { time: '10:30 AM - 11:30 AM', title: 'Project Pitch Day' },
      { time: '10:30 AM - 11:30 AM', title: 'AI in EV' },
      { time: '11:30 AM - 12:30 PM', title: 'Cooking Without Fire' },
      { time: '12:30 PM - 01:00 PM', title: 'Blind Fold Taste Test' },
      { time: '01:00 PM - 02:00 PM', title: 'Lunch Break' },
      { time: '02:00 PM - 03:00 PM', title: 'Survey Hunt' },
      { time: '03:00 PM - 04:00 PM', title: 'Art Gallery' },
      { time: '03:00 PM - 03:30 PM', title: 'Spot Acting Battle' },
      { time: '03:00 PM - 04:00 PM', title: 'Laugh Logic Loot' },
      { time: '04:00 PM - 05:00 PM', title: 'Performances by Kala Sangam Team' },
      { time: '05:00 PM - 07:00 PM', title: 'Graduation Day Magazine Launch' },
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
      { time: '05:00 PM - 05:30 PM', title: 'Valedictory' },
      { time: '05:30 PM - 06:30 PM', title: 'Melody Mania' },
      { time: '06:30 PM - 07:30 PM', title: 'Dance Mania' },
      { time: '07:30 PM - 08:30 PM', title: 'DJ Night' },
    ]
  }
];
