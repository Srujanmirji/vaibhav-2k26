import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, ChevronDown, MapPin, Users, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import About from '../components/About';
import CyberpunkTerrain from '../components/CyberpunkTerrain';

const EVENT_START_TIME = new Date('2026-03-27T10:00:00+05:30').getTime();

const getCountdown = () => {
  const diff = EVENT_START_TIME - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, isLive: false };
};

const Home: React.FC = () => {
  const [countdown, setCountdown] = useState(getCountdown);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const navbarOffset = 24;
      const targetTop = aboutSection.getBoundingClientRect().top + window.scrollY - navbarOffset;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-[100dvh] bg-darker">
      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-24 pb-4 md:pt-0 md:pb-0">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-darker">
          <CyberpunkTerrain />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[100px] animate-pulse-slow mix-blend-screen pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-[100px] animate-pulse-slow mix-blend-screen pointer-events-none" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(18,0,36,0)_0%,rgba(5,0,10,1)_100%)] pointer-events-none"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">

          {/* Animated Logo */}
          <div className="mb-2 md:mb-6 mt-2 md:mt-12 relative group">
            <div className="absolute inset-0 bg-tertiary/10 blur-[50px] rounded-full animate-pulse-slow"></div>
            <img
              src="/LOGO.png"
              alt="Vaibhav 2K26 official logo"
              className="relative w-60 sm:w-80 md:w-[28rem] lg:w-[36rem] h-auto animate-float drop-shadow-[0_0_25px_rgba(255,215,0,0.5)] transition-transform duration-500 hover:scale-105"
              fetchPriority="high"
              decoding="async"
            />
          </div>

          <div className="inline-block mb-2 md:mb-3 px-4 py-1.5 rounded-full border border-secondary/50 bg-secondary/10 text-secondary text-xs md:text-sm font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(0,255,255,0.3)] backdrop-blur-sm">
            March 27-28, 2026
          </div>

          <h1 className="sr-only">Vaibhav 2K26</h1>

          <p className="text-sm md:text-base text-gray-300 mt-1 md:mt-4 mb-3 md:mb-6 max-w-2xl mx-auto font-light border-l-2 border-primary pl-4 text-left md:text-center md:border-none md:pl-0 bg-black/20 md:bg-transparent p-2 md:p-0 rounded-r-lg">
            The ultimate convergence of code, creativity, and chaos.
            <br className="hidden md:block" /> Join the revolution at Vaibhav 2K26.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center w-full sm:w-auto px-4 sm:px-0">
            <Link
              to="/register"
              className="min-h-[44px] min-w-[44px] w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-primary hover:bg-white hover:text-primary text-white font-bold text-base md:text-lg rounded-none skew-x-[-10deg] transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,0,85,0.4)] hover:shadow-[0_0_30px_rgba(255,0,85,0.6)]"
            >
              <span className="skew-x-[10deg] flex items-center gap-2">
                Register Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              to="/events"
              className="min-h-[44px] min-w-[44px] w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-transparent border border-secondary text-secondary hover:bg-secondary hover:text-darker font-bold text-base md:text-lg rounded-none skew-x-[-10deg] transition-all duration-300 flex items-center justify-center shadow-[0_0_10px_rgba(0,255,255,0.2)] hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]"
            >
              <span className="skew-x-[10deg]">Explore Events</span>
            </Link>
          </div>

          <div className="mt-3 md:mt-6 flex flex-wrap justify-center gap-2 md:gap-3">
            {countdown.isLive ? (
              <div className="px-5 py-3 rounded-xl border border-emerald-400/60 bg-emerald-400/10 text-emerald-300 text-sm md:text-base font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(52,211,153,0.35)]">
                Event Is Live
              </div>
            ) : (
              <>
                {[
                  { label: 'Days', value: countdown.days },
                  { label: 'Hours', value: countdown.hours },
                  { label: 'Minutes', value: countdown.minutes },
                  { label: 'Seconds', value: countdown.seconds },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="min-w-[70px] md:min-w-[92px] px-2 py-2 md:px-3 rounded-xl border border-white/15 bg-card/40 backdrop-blur-sm text-center shadow-[0_0_15px_rgba(0,255,255,0.15)] hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-shadow duration-300"
                  >
                    <p className="text-xl md:text-2xl font-black text-white font-mono leading-none drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
                      {String(item.value).padStart(2, '0')}
                    </p>
                    <p className="mt-1 text-[9px] md:text-xs tracking-widest uppercase text-secondary font-semibold drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="mt-2 md:mt-3 inline-flex items-center gap-2 md:gap-3 px-3 md:px-5 py-2 md:py-2.5 rounded-full border border-primary/50 bg-primary/10 backdrop-blur-sm shadow-[0_0_18px_rgba(255,0,85,0.35)] animate-pulse">
            <span className="relative flex h-2 w-2 md:h-3 md:w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 md:h-3 md:w-3 rounded-full bg-primary" />
            </span>
            <p className="text-[10px] md:text-sm font-extrabold uppercase tracking-wider text-white">
              Hurry up. Seats are filling fast.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-1 text-[10px] md:text-sm font-black uppercase tracking-wider text-secondary hover:text-white transition-colors"
            >
              Register Now
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 animate-bounce" />
            </Link>
          </div>

          <button
            type="button"
            onClick={handleScrollDown}
            className="mt-4 md:mt-8 min-h-[44px] min-w-[44px] inline-flex flex-col items-center text-gray-400 hover:text-secondary transition-colors duration-300 group pb-16 md:pb-0"
            aria-label="Scroll down to next section"
          >
            <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase">Scroll</span>
            <span className="mt-2 h-10 w-6 md:h-12 md:w-7 rounded-full border border-secondary/60 bg-secondary/5 p-1 flex justify-center">
              <span className="h-2.5 w-2.5 rounded-full bg-secondary animate-bounce shadow-[0_0_8px_rgba(0,255,255,0.7)]" />
            </span>
            <ChevronDown className="w-5 h-5 mt-2 text-secondary animate-bounce [animation-delay:180ms]" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <About />
      </motion.div>

      {/* Gallery Preview (Home Only) */}
      <motion.section
        id="home-gallery"
        className="scroll-mt-36 py-20 bg-darker border-t border-primary/10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/50 bg-secondary/10 text-secondary text-xs md:text-sm font-bold tracking-widest uppercase">
                Past Events Gallery
              </div>
              <h2 className="mt-4 text-fluid-h2 font-black text-white font-mono leading-tight">
                Frames From <span className="text-primary">Previous Vaibhav</span>
              </h2>
              <p className="mt-3 text-fluid-p text-gray-300 max-w-3xl">
                Glimpses of past events capturing the vibrant energy and cultural heritage of our previous editions.
              </p>
            </div>
            <Link
              to="/gallery"
              className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-secondary text-secondary hover:bg-secondary hover:text-darker font-bold rounded-lg transition-all duration-300 shadow-[0_0_10px_rgba(0,255,255,0.2)] hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]"
            >
              Open Full Gallery
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Opening Ceremony Poses', tag: '2025', src: '/Gallery/_DSC1051.JPG.jpeg' },
              { title: 'Grand Entrance 2025', tag: '2025', src: '/Gallery/_DSC1050.JPG.jpeg' },
              { title: 'Vibrant Colors of Vaibhav', tag: '2025', src: '/Gallery/_DSC0042.JPG.jpeg' },
            ].map((photo) => (
              <article
                key={photo.title}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-card/40 backdrop-blur-sm group"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <p className="text-white font-bold">{photo.title}</p>
                  <p className="text-secondary text-xs font-semibold uppercase tracking-wider mt-1">{photo.tag}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* MBA Event Banner */}
      <motion.section
        className="py-12 bg-darker border-t border-secondary/10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href="https://www.ranatantra.online/"
            target="_blank"
            rel="noopener noreferrer"
            className="block group relative overflow-hidden rounded-2xl border border-secondary/30 bg-gradient-to-r from-[#0a0020] via-[#0f0025] to-[#0a0020] p-6 md:p-8 hover:border-secondary/60 transition-all duration-500 hover:-translate-y-1 shadow-[0_0_20px_rgba(0,255,255,0.08)] hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] group-hover:bg-secondary/10 transition-all duration-500 pointer-events-none" />
            <div className="relative flex flex-col items-center text-center md:flex-row md:items-center md:text-left md:justify-between gap-5">
              <div className="flex flex-col items-center md:flex-row md:items-center gap-4 md:gap-5">
                <img src="/MBA_LOGO.png" alt="Ranatantra MBA Logo" className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-contain shrink-0 drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]" />
                <div>
                  <div className="inline-block px-3 py-1 rounded-full border border-secondary/40 bg-secondary/10 text-secondary text-[10px] font-bold tracking-widest uppercase mb-2">
                    MBA Department Events
                  </div>
                  <h3 className="text-lg md:text-2xl font-black text-white">
                    Explore <span className="text-secondary">Ranatantra</span> — MBA Fest
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm mt-1 max-w-lg">
                    Check out exclusive events organized by the MBA department. Register and compete in business, management & leadership challenges.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 text-secondary font-bold text-sm uppercase tracking-wider group-hover:gap-3 transition-all whitespace-nowrap mt-1 md:mt-0">
                Visit Site
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>
        </div>
      </motion.section>

      {/* Stats/Highlights */}
      <motion.section
        className="py-20 bg-dark border-t border-primary/20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 bg-card/50 backdrop-blur-sm border border-white/5 hover:border-primary/50 transition-all duration-500 group hover:-translate-y-2 rounded-xl">
              <Calendar className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(255,0,85,0.8)]" />
              <h3 className="text-fluid-h3 font-bold text-white mb-2 font-mono">2 Days</h3>
              <p className="text-gray-400">Non-stop technical action</p>
            </div>
            <div className="p-8 bg-card/50 backdrop-blur-sm border border-white/5 hover:border-secondary/50 transition-all duration-500 group hover:-translate-y-2 rounded-xl">
              <Users className="w-12 h-12 text-secondary mx-auto mb-4 group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
              <h3 className="text-fluid-h3 font-bold text-white mb-2 font-mono">500+ Students</h3>
              <p className="text-gray-400">Elite participants only</p>
            </div>
            <div className="p-8 bg-card/50 backdrop-blur-sm border border-white/5 hover:border-tertiary/50 transition-all duration-500 group hover:-translate-y-2 rounded-xl">
              <Trophy className="w-12 h-12 text-tertiary mx-auto mb-4 group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(255,211,0,0.8)]" />
              <h3 className="text-fluid-h3 font-bold text-white mb-2 font-mono">15+ Events</h3>
              <p className="text-gray-400">Technical & Cultural Battles</p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
