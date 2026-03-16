import React from 'react';
import { Link } from 'react-router-dom';
import { EVENTS, DEPARTMENTS } from '../constants';
import { Calendar, MapPin, Users, ArrowUpRight, X, Phone, ShieldCheck, Info, FileText, Download } from 'lucide-react';
import { EventDetails } from '../types';

import { motion } from 'framer-motion';

const Events: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = React.useState('All');
  const [selectedDepartment, setSelectedDepartment] = React.useState('All');

  const departments = DEPARTMENTS;
  const tracks = ['All', 'Cultural', 'Tech'];

  const isTechEvent = (category: string) => {
    return ['AI/Tech', 'Innovation', 'Competition'].includes(category);
  };

  const [selectedEventForModal, setSelectedEventForModal] = React.useState<EventDetails | null>(null);

  const filteredEvents = EVENTS.filter(event => {
    // Hide non-register events
    if (event.registrationClosed) return false;

    const matchesTrack =
      selectedTrack === 'All'
        ? true
        : selectedTrack === 'Cultural'
          ? event.category === 'Cultural'
          : isTechEvent(event.category);

    const matchesDepartment = selectedDepartment === 'All' ? true : event.department === selectedDepartment;

    return matchesTrack && matchesDepartment;
  });

  return (
    <div className="pt-24 min-h-screen bg-darker bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-dark via-darker to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 blur-[80px] rounded-full pointer-events-none"></div>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-4 font-mono tracking-tighter">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">ARENA</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
            Choose your battleground. Compete with the best.
          </p>

          {/* Track Filters */}
          <div className="flex justify-start md:justify-center gap-3 mb-4 overflow-x-auto pb-2 mobile-hide-scrollbar px-1">
            {tracks.map((track) => (
              <button
                key={track}
                onClick={() => setSelectedTrack(track)}
                className={`px-5 py-2 rounded-full font-bold transition-all duration-300 border whitespace-nowrap text-sm ${selectedTrack === track
                  ? 'bg-secondary border-secondary text-darker shadow-[0_0_15px_rgba(0,255,255,0.35)]'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:border-secondary/50 hover:text-white'
                  }`}
              >
                {track}
              </button>
            ))}
          </div>

          {/* Department Filters */}
          <div className="flex justify-start md:justify-center gap-3 mb-8 overflow-x-auto pb-2 mobile-hide-scrollbar px-1">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => {
                  if (dept === 'MBA') {
                    window.open('https://www.ranatantra.online/', '_blank');
                  } else {
                    setSelectedDepartment(dept);
                  }
                }}
                className={`px-5 py-2 rounded-full font-bold transition-all duration-300 border whitespace-nowrap text-sm ${selectedDepartment === dept
                  ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(255,0,85,0.4)]'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:border-primary/50 hover:text-white'
                  }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 group flex flex-col hover:shadow-[0_0_30px_rgba(255,0,85,0.15)] hover:-translate-y-2"
            >
              <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden bg-black/40">
                {/* Blurred backdrop for posters */}
                <div 
                  className="absolute inset-0 bg-cover bg-center blur-2xl opacity-30 scale-110"
                  style={{ backgroundImage: `url(${event.image})` }}
                ></div>
                <img
                  src={event.image}
                  alt={event.title}
                  className="relative w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-700 z-10"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
                  <span className="inline-block px-2 py-0.5 sm:px-3 sm:py-1 bg-black/50 backdrop-blur border border-primary/50 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded">
                    {event.category}
                  </span>
                </div>
              </div>

              <div className="p-3 sm:p-4 flex-1 flex flex-col relative">
                <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-1.5 font-mono group-hover:text-primary transition-colors">{event.title}</h3>
                <p className="text-gray-400 text-[10px] sm:text-xs mb-2 sm:mb-3 flex-1 leading-relaxed line-clamp-2">{event.description}</p>

                <div className="space-y-1 sm:space-y-1.5 mb-3 sm:mb-4 border-t border-white/5 pt-2 sm:pt-3">
                  <div className="flex items-center text-gray-400 text-[10px] sm:text-[11px]">
                    <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1.5 sm:mr-2 text-secondary shrink-0" />
                    {event.date} • {event.time}
                  </div>
                  <div className="flex items-center text-gray-400 text-[10px] sm:text-[11px]">
                    <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1.5 sm:mr-2 text-secondary shrink-0" />
                    <span className="truncate">{event.venue}</span>
                  </div>
                  <div className="flex items-center text-gray-400 text-[10px] sm:text-[11px]">
                    <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1.5 sm:mr-2 text-secondary shrink-0" />
                    {event.teamSize}
                  </div>
                </div>

                <div className="mt-auto space-y-2 sm:space-y-3">
                  <button
                    onClick={() => setSelectedEventForModal(event)}
                    className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white text-[10px] sm:text-xs font-bold py-2.5 sm:py-3 rounded-xl transition-all border border-white/10"
                  >
                    VIEW DETAILS <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>

                  {!event.registrationClosed && (
                    event.tracks && event.tracks.length > 0 ? (
                      <button
                        onClick={() => setSelectedEventForModal(event)}
                        className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-primary hover:text-white text-white text-[10px] sm:text-xs font-bold py-2.5 sm:py-3 rounded-xl transition-all border border-white/10 hover:border-primary group-hover:shadow-[0_0_15px_rgba(255,0,85,0.4)]"
                      >
                        REGISTER <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    ) : event.registrationLink ? (
                      <a
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-primary hover:text-white text-white text-[10px] sm:text-xs font-bold py-2.5 sm:py-3 rounded-xl transition-all border border-white/10 hover:border-primary group-hover:shadow-[0_0_15px_rgba(255,0,85,0.4)]"
                      >
                        REGISTER <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </a>
                    ) : (
                      <Link
                        to={`/register?event=${encodeURIComponent(event.id)}`}
                        state={{ preselectedEventId: event.id }}
                        className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-primary hover:text-white text-white text-[10px] sm:text-xs font-bold py-2.5 sm:py-3 rounded-xl transition-all border border-white/10 hover:border-primary group-hover:shadow-[0_0_15px_rgba(255,0,85,0.4)]"
                      >
                        REGISTER <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </Link>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedEventForModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 md:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEventForModal(null)}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          ></motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-6xl bg-darker/60 backdrop-blur-md border border-white/10 rounded-none sm:rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] h-full sm:h-auto sm:max-h-[90dvh] flex flex-col md:flex-row"
          >
            {/* Left Column: Fixed Image (Desktop) / Header Image (Mobile) */}
            <div className="relative w-full md:w-[45%] lg:w-[40%] shrink-0 overflow-hidden bg-black flex items-center justify-center min-h-[40vh] md:min-h-0">
              {/* High-intensity animated blurred background */}
              <motion.div 
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1.1, opacity: 0.6 }}
                transition={{ duration: 2 }}
                className="absolute inset-0 bg-cover bg-center blur-[100px]"
                style={{ backgroundImage: `url(${selectedEventForModal.image})` }}
              ></motion.div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/20 z-10"></div>
              
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                src={selectedEventForModal.image}
                alt={selectedEventForModal.title}
                className="relative w-full h-full object-contain z-20 drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]"
              />

              {/* Mobile Close Button */}
              <button
                onClick={() => setSelectedEventForModal(null)}
                className="absolute top-4 right-4 p-3 bg-black/60 hover:bg-primary text-white rounded-full transition-all z-50 md:hidden"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Status Badge (Mobile Only) */}
              <div className="absolute top-4 left-4 z-30 md:hidden">
                <span className="px-3 py-1 bg-primary/90 text-white text-[10px] font-bold uppercase tracking-wider rounded backdrop-blur">
                  {selectedEventForModal.category}
                </span>
              </div>
            </div>

            {/* Right Column: Scrollable Content */}
            <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-white/[0.03] to-transparent">
              {/* Header (Desktop Only) */}
              <div className="hidden md:flex items-center justify-between p-8 pb-0 shrink-0">
                <div>
                  <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-block px-3 py-1 bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-3"
                  >
                    {selectedEventForModal.category}
                  </motion.span>
                  <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl lg:text-5xl font-black text-white font-mono tracking-tighter"
                  >
                    {selectedEventForModal.title}
                  </motion.h2>
                </div>
                <button
                  onClick={() => setSelectedEventForModal(null)}
                  className="p-4 bg-white/5 hover:bg-primary text-white rounded-2xl transition-all border border-white/10 group active:scale-95"
                >
                  <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              {/* Mobile Header Title (Inside scroll view) */}
              <div className="md:hidden px-6 pt-6 pb-2 shrink-0">
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="inline-block px-2 py-0.5 bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full mb-2"
                >
                  {selectedEventForModal.category}
                </motion.span>
                <h2 className="text-2xl font-black text-white font-mono tracking-tight leading-tight">
                  {selectedEventForModal.title}
                </h2>
                <div className="w-10 h-1 bg-primary mt-3 rounded-full"></div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 min-h-0 p-6 md:p-8 overflow-y-auto space-y-6 md:space-y-10">
                {/* Description */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-300 text-sm md:text-lg leading-relaxed font-light"
                >
                  {selectedEventForModal.description}
                </motion.p>

                {/* Info Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white/5 p-5 rounded-2xl border border-white/10 hover:border-secondary/50 transition-all flex items-start gap-4"
                  >
                    <div className="p-3 bg-secondary/10 rounded-xl">
                      <Calendar className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">When</p>
                      <p className="text-white text-sm font-bold">{selectedEventForModal.date}</p>
                      <p className="text-gray-400 text-xs">{selectedEventForModal.time}</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white/5 p-5 rounded-2xl border border-white/10 hover:border-secondary/50 transition-all flex items-start gap-4"
                  >
                    <div className="p-3 bg-secondary/10 rounded-xl">
                      <MapPin className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">Where</p>
                      <p className="text-white text-sm font-bold truncate">{selectedEventForModal.venue}</p>
                      <p className="text-gray-400 text-xs">{selectedEventForModal.department} Dept</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white/5 p-5 rounded-2xl border border-white/10 hover:border-secondary/50 transition-all flex items-start gap-4"
                  >
                    <div className="p-3 bg-secondary/10 rounded-xl">
                      <Users className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">Format</p>
                      <p className="text-white text-sm font-bold">{selectedEventForModal.teamSize}</p>
                      <p className="text-gray-400 text-xs">Entry: ₹{selectedEventForModal.fee === 1 ? '100' : selectedEventForModal.fee}</p>
                    </div>
                  </motion.div>
                </div>

                {/* Tracks Section (Enhanced) */}
                {selectedEventForModal.tracks && selectedEventForModal.tracks.length > 0 && (
                  <div className="space-y-6">
                    <h4 className="text-white text-xl font-bold flex items-center gap-3">
                      <ShieldCheck className="w-6 h-6 text-primary" /> Multi-Track Selection
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      {selectedEventForModal.tracks.map((track, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + (i * 0.1) }}
                          className="group relative bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-primary/50 transition-all overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl group-hover:bg-primary/20 transition-all -z-10"></div>
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex-1 space-y-3">
                              <div className="flex items-center gap-3">
                                <h5 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{track.title}</h5>
                                <span className="px-2 py-0.5 bg-white/10 text-[10px] font-bold text-gray-400 rounded-lg">TRACK {i + 1}</span>
                              </div>
                              <p className="text-gray-400 text-sm leading-relaxed max-w-xl">{track.description}</p>
                              <div className="flex flex-wrap gap-4 pt-2">
                                <span className="flex items-center text-gray-300 text-xs font-bold bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                                  <Users className="w-3.5 h-3.5 mr-2 text-secondary" /> {track.teamSize}
                                </span>
                                <span className="flex items-center text-gray-300 text-xs font-bold bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                                  <ShieldCheck className="w-3.5 h-3.5 mr-2 text-secondary" /> ₹{track.fee}
                                </span>
                              </div>
                            </div>
                            <div className="shrink-0">
                              {!track.registrationClosed && (
                                track.registrationLink ? (
                                  <a
                                    href={track.registrationLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-white hover:text-primary transition-all shadow-[0_10px_30px_rgba(255,0,85,0.3)] w-full md:w-auto active:scale-95"
                                  >
                                    REGISTER TRACK <ArrowUpRight className="w-4 h-4" />
                                  </a>
                                ) : (
                                  <Link
                                    to={`/register?event=${encodeURIComponent(track.id)}`}
                                    state={{ preselectedEventId: track.id }}
                                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-secondary text-darker text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-white hover:text-secondary transition-all shadow-[0_10px_30px_rgba(0,255,255,0.2)] w-full md:w-auto active:scale-95"
                                  >
                                    REGISTER TRACK <ArrowUpRight className="w-4 h-4" />
                                  </Link>
                                )
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rules Section (Premium List) */}
                {selectedEventForModal.rules && !selectedEventForModal.tracks && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-white text-xl font-bold flex items-center gap-3">
                        <FileText className="w-6 h-6 text-primary" /> Rules & Regulations
                      </h4>
                      {selectedEventForModal.rulesPdf && (
                        <a 
                          href={selectedEventForModal.rulesPdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-primary hover:text-white transition-colors text-xs font-black uppercase tracking-widest group"
                        >
                          FULL PDF <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                        </a>
                      )}
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {selectedEventForModal.rules.map((rule, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className="flex gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors group"
                        >
                          <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-xs font-black">
                            {i + 1}
                          </span>
                          <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                            {rule}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Coordinators Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Faculty */}
                  {selectedEventForModal.facultyCoordinators && selectedEventForModal.facultyCoordinators.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-white text-lg font-bold flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-primary" /> Faculty Reach
                      </h4>
                      <div className="space-y-3">
                        {selectedEventForModal.facultyCoordinators.map((coord, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-white/[0.03] rounded-2xl border border-white/5 group hover:border-primary/30 transition-all">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                {coord.name.charAt(0)}
                              </div>
                              <div>
                                <p className="text-gray-200 font-bold text-sm tracking-tight">{coord.name}</p>
                                <p className="text-gray-500 text-[9px] uppercase font-black tracking-widest mt-0.5">Faculty Lead</p>
                              </div>
                            </div>
                            {coord.phone !== '-' && coord.phone !== 'Principal' && (
                              <a href={`tel:${coord.phone}`} className="p-3 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-white transition-all active:scale-90">
                                <Phone className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Students */}
                  {selectedEventForModal.studentCoordinators && selectedEventForModal.studentCoordinators.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-white text-lg font-bold flex items-center gap-3">
                        <Users className="w-5 h-5 text-secondary" /> Student Crew
                      </h4>
                      <div className="space-y-3">
                        {selectedEventForModal.studentCoordinators.map((coord, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-white/[0.03] rounded-2xl border border-white/5 group hover:border-secondary/30 transition-all">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold">
                                {coord.name.charAt(0)}
                              </div>
                              <div>
                                <p className="text-gray-200 font-bold text-sm tracking-tight">{coord.name}</p>
                                <p className="text-gray-500 text-[9px] uppercase font-black tracking-widest mt-0.5">Student Lead</p>
                              </div>
                            </div>
                            {coord.phone !== '-' && (
                              <a href={`tel:${coord.phone}`} className="p-3 bg-secondary/10 text-secondary rounded-xl hover:bg-secondary hover:text-darker transition-all active:scale-90">
                                <Phone className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sticky Action Footer */}
              <div className="p-6 md:p-8 pt-0 shrink-0 bg-gradient-to-t from-darker to-transparent">
                {!selectedEventForModal.registrationClosed && !selectedEventForModal.tracks && (
                  <div className="flex flex-col sm:flex-row gap-4">
                    {selectedEventForModal.registrationLink ? (
                      <a
                        href={selectedEventForModal.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-5 bg-primary text-white font-black uppercase tracking-[0.3em] rounded-2xl text-center hover:bg-white hover:text-primary transition-all shadow-[0_15px_40px_rgba(255,0,85,0.4)] active:scale-[0.98] text-sm"
                      >
                        CONFIRM REGISTRATION
                      </a>
                    ) : (
                      <Link
                        to={`/register?event=${encodeURIComponent(selectedEventForModal.id)}`}
                        state={{ preselectedEventId: selectedEventForModal.id }}
                        className="flex-1 py-5 bg-primary text-white font-black uppercase tracking-[0.3em] rounded-2xl text-center hover:bg-white hover:text-primary transition-all shadow-[0_15px_40px_rgba(255,0,85,0.4)] active:scale-[0.98] text-sm"
                      >
                        REGISTER AT ₹{selectedEventForModal.fee === 1 ? '100' : selectedEventForModal.fee}
                      </Link>
                    )}
                    <button
                      onClick={() => setSelectedEventForModal(null)}
                      className="px-8 py-5 bg-white/5 text-gray-400 font-bold uppercase tracking-widest rounded-2xl hover:text-white hover:bg-white/10 transition-all text-xs"
                    >
                      GO BACK
                    </button>
                  </div>
                )}
                
                {(selectedEventForModal.registrationClosed || selectedEventForModal.tracks) && (
                  <button
                    onClick={() => setSelectedEventForModal(null)}
                    className="w-full py-5 bg-white/5 text-gray-400 font-bold uppercase tracking-widest rounded-2xl hover:text-white hover:bg-white/10 transition-all text-xs"
                  >
                    CLOSE PREVIEW
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Events;
