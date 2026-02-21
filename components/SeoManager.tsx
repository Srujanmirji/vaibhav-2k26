import React from 'react';
import { useLocation } from 'react-router-dom';

type PageMeta = {
  title: string;
  description: string;
  keywords: string;
  robots: string;
};

const SITE_NAME = 'Vaibhav 2K26';
const DEFAULT_DESCRIPTION =
  'Official website of Vaibhav 2K26, the flagship fest of JCET (Jain College of Engineering and Technology), Hubballi, Karnataka.';
const DEFAULT_KEYWORDS =
  'Vaibhav 2K26, JCET, JCET Hubballi, JCET Hubli, Jain College of Engineering and Technology, Jain College Hubballi, tech fest, college events';
const COLLEGE_NAME = 'Jain College of Engineering and Technology, Hubballi';
const COLLEGE_ALIASES = ['JCET', 'JCET Hubballi', 'JCET Hubli'];

const PAGE_METADATA: Record<string, PageMeta> = {
  '/': {
    title: 'Vaibhav 2K26 | JCET Hubballi Official Fest Website',
    description:
      'Discover Vaibhav 2K26, the official fest website of JCET Hubballi (Jain College of Engineering and Technology). Explore events and register online.',
    keywords: `${DEFAULT_KEYWORDS}, Vaibhav official website, JCET event, JCET fest, register for tech fest`,
    robots: 'index, follow',
  },
  '/gallery': {
    title: 'Gallery | Vaibhav 2K26 at JCET Hubballi',
    description:
      'Explore Vaibhav gallery moments from past editions at JCET Hubballi, including stage highlights, student participation, and celebrations.',
    keywords: `${DEFAULT_KEYWORDS}, vaibhav gallery, past events photos, event highlights`,
    robots: 'index, follow',
  },
  '/events': {
    title: 'Events at Vaibhav 2K26 | JCET Hubballi',
    description:
      'Browse all Vaibhav 2K26 events by department and category. Find schedules, venues, and register for your favorite competitions.',
    keywords: `${DEFAULT_KEYWORDS}, vaibhav events, event list, technical competitions`,
    robots: 'index, follow',
  },
  '/schedule': {
    title: 'Schedule | Vaibhav 2K26 at JCET Hubballi',
    description:
      'Check the complete Vaibhav 2K26 timeline for day-wise sessions, competitions, and event timings at JCET Hubballi.',
    keywords: `${DEFAULT_KEYWORDS}, vaibhav schedule, event timeline`,
    robots: 'index, follow',
  },
  '/register': {
    title: 'Register for Vaibhav 2K26 | JCET Hubballi',
    description:
      'Complete your official Vaibhav 2K26 registration and reserve your seat for technical events and student competitions.',
    keywords: `${DEFAULT_KEYWORDS}, vaibhav registration, register now`,
    robots: 'index, follow',
  },
  '/contact': {
    title: 'Contact Vaibhav 2K26 | JCET Hubballi Support',
    description:
      'Get support, phone, email, and venue details for Vaibhav 2K26 at Jain College of Engineering & Technology Hubballi.',
    keywords: `${DEFAULT_KEYWORDS}, vaibhav contact, venue details`,
    robots: 'index, follow',
  },
  '/dashboard': {
    title: 'Participant Dashboard | Vaibhav 2K26',
    description: 'Participant dashboard for managing your Vaibhav 2K26 registrations.',
    keywords: `${DEFAULT_KEYWORDS}, participant dashboard`,
    robots: 'noindex, nofollow',
  },
  '/admin': {
    title: 'Admin Panel | Vaibhav 2K26',
    description: 'Admin panel for Vaibhav 2K26 organizers.',
    keywords: `${DEFAULT_KEYWORDS}, admin panel`,
    robots: 'noindex, nofollow',
  },
};

const upsertMetaTag = (selector: string, attributes: Record<string, string>, content: string) => {
  let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    Object.entries(attributes).forEach(([key, value]) => tag?.setAttribute(key, value));
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const upsertCanonical = (href: string) => {
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
};

const upsertStructuredData = (origin: string) => {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${origin}/#organization`,
        name: 'Vaibhav 2K26 Organizing Team',
        alternateName: [SITE_NAME, ...COLLEGE_ALIASES.map((name) => `${name} Vaibhav`)],
        url: `${origin}/`,
        email: 'contactus@jcethbl.edu.in',
        logo: `${origin}/logo.png`,
      },
      {
        '@type': 'CollegeOrUniversity',
        '@id': `${origin}/#college`,
        name: COLLEGE_NAME,
        alternateName: COLLEGE_ALIASES,
        url: `${origin}/`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Hubballi',
          addressRegion: 'Karnataka',
          addressCountry: 'IN',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        name: `${SITE_NAME} - JCET Hubballi`,
        url: `${origin}/`,
        inLanguage: 'en-IN',
        publisher: {
          '@id': `${origin}/#organization`,
        },
        about: {
          '@id': `${origin}/#college`,
        },
      },
      {
        '@type': 'Event',
        '@id': `${origin}/#event`,
        name: `${SITE_NAME} at JCET Hubballi`,
        description: DEFAULT_DESCRIPTION,
        startDate: '2026-03-27T09:00:00+05:30',
        endDate: '2026-03-28T18:00:00+05:30',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        url: `${origin}/#/register`,
        image: [`${origin}/logo.png`],
        organizer: {
          '@id': `${origin}/#organization`,
        },
        about: {
          '@id': `${origin}/#college`,
        },
        location: {
          '@type': 'Place',
          name: COLLEGE_NAME,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Hubballi',
            addressRegion: 'Karnataka',
            addressCountry: 'IN',
          },
        },
      },
    ],
  };

  const scriptId = 'vaibhav-structured-data';
  let script = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
};

const SeoManager: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    const metadata = PAGE_METADATA[pathname] ?? {
      title: `${SITE_NAME} | Tech Fest`,
      description: DEFAULT_DESCRIPTION,
      keywords: DEFAULT_KEYWORDS,
      robots: 'index, follow',
    };

    const origin = window.location.origin;
    const canonicalUrl = pathname === '/' ? `${origin}/` : `${origin}/#${pathname}`;
    const imageUrl = `${origin}/logo.png`;

    document.title = metadata.title;
    document.documentElement.setAttribute('lang', 'en');

    upsertMetaTag('meta[name="description"]', { name: 'description' }, metadata.description);
    upsertMetaTag('meta[name="keywords"]', { name: 'keywords' }, metadata.keywords);
    upsertMetaTag('meta[name="robots"]', { name: 'robots' }, metadata.robots);
    upsertMetaTag('meta[name="author"]', { name: 'author' }, 'Vaibhav 2K26 Organizing Team, JCET Hubballi');

    upsertMetaTag('meta[property="og:title"]', { property: 'og:title' }, metadata.title);
    upsertMetaTag('meta[property="og:description"]', { property: 'og:description' }, metadata.description);
    upsertMetaTag('meta[property="og:type"]', { property: 'og:type' }, 'website');
    upsertMetaTag('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl);
    upsertMetaTag('meta[property="og:image"]', { property: 'og:image' }, imageUrl);
    upsertMetaTag('meta[property="og:image:alt"]', { property: 'og:image:alt' }, 'Vaibhav 2K26 official logo at JCET Hubballi');
    upsertMetaTag('meta[property="og:locale"]', { property: 'og:locale' }, 'en_IN');
    upsertMetaTag('meta[property="og:site_name"]', { property: 'og:site_name' }, SITE_NAME);

    upsertMetaTag('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image');
    upsertMetaTag('meta[name="twitter:title"]', { name: 'twitter:title' }, metadata.title);
    upsertMetaTag('meta[name="twitter:description"]', { name: 'twitter:description' }, metadata.description);
    upsertMetaTag('meta[name="twitter:image"]', { name: 'twitter:image' }, imageUrl);
    upsertMetaTag('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt' }, 'Vaibhav 2K26 official logo at JCET Hubballi');

    upsertCanonical(canonicalUrl);
    upsertStructuredData(origin);
  }, [pathname]);

  return null;
};

export default SeoManager;
