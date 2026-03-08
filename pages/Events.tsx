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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 group flex flex-col hover:shadow-[0_0_30px_rgba(255,0,85,0.15)] hover:-translate-y-2"
            >
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-darker to-transparent z-10 opacity-80"></div>
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
                  <span className="inline-block px-2 py-0.5 sm:px-3 sm:py-1 bg-black/50 backdrop-blur border border-primary/50 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded">
                    {event.category}
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col relative">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 sm:mb-2 font-mono group-hover:text-primary transition-colors">{event.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 flex-1 leading-relaxed line-clamp-3 sm:line-clamp-none">{event.description}</p>

                <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 border-t border-white/5 pt-3 sm:pt-4">
                  <div className="flex items-center text-gray-400 text-[11px] sm:text-xs">
                    <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-2 sm:mr-3 text-secondary shrink-0" />
                    {event.date} • {event.time}
                  </div>
                  <div className="flex items-center text-gray-400 text-[11px] sm:text-xs">
                    <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-2 sm:mr-3 text-secondary shrink-0" />
                    <span className="truncate">{event.venue}</span>
                  </div>
                  <div className="flex items-center text-gray-400 text-[11px] sm:text-xs">
                    <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-2 sm:mr-3 text-secondary shrink-0" />
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
                    <Link
                      to={`/register?event=${encodeURIComponent(event.id)}`}
                      state={{ preselectedEventId: event.id }}
                      className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-primary hover:text-white text-white text-[10px] sm:text-xs font-bold py-2.5 sm:py-3 rounded-xl transition-all border border-white/10 hover:border-primary group-hover:shadow-[0_0_15px_rgba(255,0,85,0.4)]"
                    >
                      REGISTER <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedEventForModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEventForModal(null)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          ></motion.div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="relative w-full max-w-2xl bg-card border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] max-h-[95dvh] md:max-h-[90dvh] flex flex-col mt-4 md:mt-0"
          >
            {/* Modal Header/Image */}
            <div className="relative h-40 sm:h-64 shrink-0">
              <img
                src={selectedEventForModal.image}
                alt={selectedEventForModal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent"></div>
              <button
                onClick={() => setSelectedEventForModal(null)}
                className="absolute top-2 right-2 md:top-4 md:right-4 p-2 bg-black/50 hover:bg-primary text-white rounded-full transition-colors z-20"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <div className="absolute bottom-2 left-4 md:bottom-4 md:left-6 z-10 w-[90%]">
                <span className="px-2 py-0.5 md:px-3 md:py-1 bg-primary text-white text-[10px] md:text-xs font-bold uppercase rounded mb-1 md:mb-2 inline-block">
                  {selectedEventForModal.category}
                </span>
                <h2 className="text-xl md:text-3xl font-black text-white font-mono truncate">{selectedEventForModal.title}</h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 md:p-6 overflow-y-auto custom-scrollbar space-y-6 md:space-y-8">
              {/* Core Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4">
                <div className="bg-white/5 p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/5">
                  <p className="text-secondary text-[9px] md:text-[10px] uppercase font-bold tracking-widest mb-1">Schedule</p>
                  <p className="text-white text-xs md:text-sm font-semibold">{selectedEventForModal.date}</p>
                  <p className="text-gray-400 text-[10px] md:text-xs">{selectedEventForModal.time}</p>
                </div>
                <div className="bg-white/5 p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/5">
                  <p className="text-secondary text-[9px] md:text-[10px] uppercase font-bold tracking-widest mb-1">Location</p>
                  <p className="text-white text-xs md:text-sm font-semibold truncate">{selectedEventForModal.venue}</p>
                  <p className="text-gray-400 text-[10px] md:text-xs truncate">{selectedEventForModal.department} Dept</p>
                </div>
                {selectedEventForModal.rulesPdf && (
                  <a
                    href={selectedEventForModal.rulesPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary/10 p-3 md:p-4 rounded-xl md:rounded-2xl border border-primary/20 flex flex-col items-center justify-center group hover:bg-primary/20 transition-all text-center col-span-2 sm:col-span-1"
                  >
                    <p className="text-primary text-[9px] md:text-[10px] uppercase font-bold tracking-widest mb-1">Event Rules</p>
                    <div className="flex items-center gap-1 md:gap-2 text-white">
                      <FileText className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      <span className="text-xs md:text-sm font-semibold group-hover:text-primary transition-colors">VIEW PDF</span>
                    </div>
                  </a>
                )}
              </div>

              {/* Rules Section */}
              {selectedEventForModal.rules && (
                <div className="space-y-4">
                  <h4 className="text-white font-bold flex items-center gap-2 text-lg">
                    <ShieldCheck className="w-5 h-5 text-primary" /> Rules & Regulations
                  </h4>
                  <ul className="grid grid-cols-1 gap-3">
                    {selectedEventForModal.rules.map((rule, i) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-400 bg-white/5 p-3 rounded-xl border border-white/5">
                        <span className="text-primary font-bold">0{i + 1}</span>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Faculty Coordinators Section */}
              {selectedEventForModal.facultyCoordinators && selectedEventForModal.facultyCoordinators.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-white font-bold flex items-center gap-2 text-lg">
                    <ShieldCheck className="w-5 h-5 text-primary" /> Faculty Coordinators
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedEventForModal.facultyCoordinators.map((coord, i) => (
                      <div key={i} className="bg-primary/5 p-4 rounded-2xl border border-primary/10 flex items-center justify-between group hover:border-primary/50 transition-colors">
                        <div>
                          <p className="text-white font-bold text-sm">{coord.name}</p>
                          <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider mt-1">FACULTY</p>
                          {coord.phone !== '-' && <p className="text-gray-400 text-xs mt-0.5">{coord.phone}</p>}
                        </div>
                        {coord.phone !== '-' && coord.phone !== 'Principal' && (
                          <a href={`tel:${coord.phone}`} className="p-2 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-all">
                            <Phone className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Student Coordinators Section */}
              {selectedEventForModal.studentCoordinators && selectedEventForModal.studentCoordinators.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-white font-bold flex items-center gap-2 text-lg">
                    <Users className="w-5 h-5 text-secondary" /> Student Coordinators
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedEventForModal.studentCoordinators.map((coord, i) => (
                      <div key={i} className="bg-secondary/5 p-4 rounded-2xl border border-secondary/10 flex items-center justify-between group hover:border-secondary/50 transition-colors">
                        <div>
                          <p className="text-white font-bold text-sm">{coord.name}</p>
                          <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider mt-1">STUDENT</p>
                          {coord.phone !== '-' && <p className="text-gray-400 text-xs mt-0.5">{coord.phone}</p>}
                        </div>
                        {coord.phone !== '-' && (
                          <a href={`tel:${coord.phone}`} className="p-2 bg-secondary/10 text-secondary rounded-full hover:bg-secondary hover:text-darker transition-all">
                            <Phone className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons in Modal */}
              <div className="pt-4 flex flex-col gap-3">
                {!selectedEventForModal.registrationClosed && (
                  <Link
                    to={`/register?event=${encodeURIComponent(selectedEventForModal.id)}`}
                    state={{ preselectedEventId: selectedEventForModal.id }}
                    className="w-full py-4 bg-primary text-white font-black uppercase tracking-widest rounded-2xl text-center hover:bg-white hover:text-primary transition-all shadow-[0_0_20px_rgba(255,0,85,0.4)]"
                  >
                    REGISTER FOR ₹{selectedEventForModal.fee === 1 ? '100' : selectedEventForModal.fee}
                  </Link>
                )}
                <button
                  onClick={() => setSelectedEventForModal(null)}
                  className="w-full py-4 bg-white/5 text-gray-400 font-bold uppercase tracking-widest rounded-2xl hover:text-white hover:bg-white/10 transition-all"
                >
                  CLOSE PREVIEW
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Events;
