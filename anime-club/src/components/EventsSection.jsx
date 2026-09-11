import { useState } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Trophy, Users, Sparkles, ArrowRight, Tag } from 'lucide-react';
import { upcomingEventsData } from '../data/events';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 250 : -250,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 28 }
  },
  exit: (direction) => ({
    x: direction > 0 ? -250 : 250,
    opacity: 0,
    scale: 0.95,
    transition: { type: "spring", stiffness: 300, damping: 28 }
  })
};

export default function EventsSection({ onRegisterEvent }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);

  const currentEvent = upcomingEventsData[currentIndex];

  const rotateX = useSpring(0, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 });

  const paginate = (newDirection) => {
    const nextIndex = (currentIndex + newDirection + upcomingEventsData.length) % upcomingEventsData.length;
    setCurrentIndex(nextIndex);
    setPage([page + newDirection, newDirection]);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);
    rotateY.set(4 * normX);
    rotateX.set(-4 * normY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section id="events" className="py-24 bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#AFFF00]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#AFFF00]/10 border border-[#AFFF00]/30 text-[#AFFF00] text-xs font-mono tracking-widest uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              UPCOMING EVENTS
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">
              EXPERIENCE THE <span className="text-[#AFFF00]">HYPE</span>
            </h2>
            <p className="text-white/60 font-mono text-sm max-w-xl mt-2">
              From campus cosplay championships to anime movie marathons. Register now to claim your seat.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => paginate(-1)}
              className="w-12 h-12 border border-white/20 hover:border-[#AFFF00] hover:text-[#AFFF00] flex items-center justify-center transition-colors bg-white/5"
              aria-label="Previous event"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-mono text-sm text-white/50 px-2">
              0{currentIndex + 1} / 0{upcomingEventsData.length}
            </span>
            <button
              onClick={() => paginate(1)}
              className="w-12 h-12 border border-white/20 hover:border-[#AFFF00] hover:text-[#AFFF00] flex items-center justify-center transition-colors bg-white/5"
              aria-label="Next event"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Event Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
          {upcomingEventsData.map((ev, idx) => (
            <button
              key={ev.id}
              onClick={() => {
                const diff = idx - currentIndex;
                if (diff !== 0) {
                  setCurrentIndex(idx);
                  setPage([page + diff, diff]);
                }
              }}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all border ${
                idx === currentIndex
                  ? 'bg-[#AFFF00] text-[#121212] border-[#AFFF00] font-bold shadow-[0_0_15px_rgba(175,255,0,0.3)]'
                  : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {ev.title}
            </button>
          ))}
        </div>

        {/* Carousel Showcase Card */}
        <div
          className="relative min-h-[460px] bg-[#121212] border border-white/10 p-6 md:p-10 overflow-hidden shadow-2xl"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Top colored accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-1 transition-colors duration-500"
            style={{ backgroundColor: currentEvent.accentColor }}
          />

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Event Details (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="px-2.5 py-0.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#121212]"
                    style={{ backgroundColor: currentEvent.accentColor }}
                  >
                    {currentEvent.badge}
                  </span>
                  <span className="text-xs font-mono text-white/50 tracking-wider">
                    {currentEvent.tagline}
                  </span>
                </div>

                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-[1.05]">
                  {currentEvent.title}
                </h3>

                <p className="text-white/70 text-sm md:text-base leading-relaxed font-sans max-w-xl">
                  {currentEvent.description}
                </p>

                {/* Event Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2">
                  <div className="flex items-center gap-2.5 text-xs font-mono text-white/80 bg-white/5 p-2.5 border border-white/5">
                    <Calendar className="w-4 h-4 text-[#AFFF00]" />
                    <span>{currentEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-mono text-white/80 bg-white/5 p-2.5 border border-white/5">
                    <MapPin className="w-4 h-4 text-[#AFFF00]" />
                    <span className="truncate">{currentEvent.venue}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-mono text-white/80 bg-white/5 p-2.5 border border-white/5">
                    <Trophy className="w-4 h-4 text-[#AFFF00]" />
                    <span>{currentEvent.prize}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-mono text-white/80 bg-white/5 p-2.5 border border-white/5">
                    <Users className="w-4 h-4 text-[#AFFF00]" />
                    <span>{currentEvent.category}</span>
                  </div>
                </div>

                {/* Tag pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {currentEvent.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 bg-white/5 border border-white/10 text-white/70"
                    >
                      <Tag className="w-3 h-3 text-[#AFFF00]" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Register CTA Button */}
                <div className="pt-4 flex flex-wrap gap-4 items-center">
                  <motion.button
                    onClick={() => onRegisterEvent && onRegisterEvent(currentEvent.title)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#AFFF00] text-[#121212] px-8 py-3.5 font-black text-sm uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(175,255,0,0.35)] hover:bg-[#baf92a] transition-colors"
                  >
                    <span>Register For This Event</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>

                  <span className="text-xs font-mono text-white/50">
                    * Instant pass with Name & Reg No
                  </span>
                </div>
              </div>

              {/* Right Column: Visual Showcase (5 cols) */}
              <div className="lg:col-span-5 relative">
                <motion.div
                  style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                  className="relative aspect-video lg:aspect-[4/3] overflow-hidden border-2 border-white/15 group shadow-2xl"
                >
                  <img
                    src={currentEvent.image}
                    alt={currentEvent.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <span className="text-xs font-mono uppercase text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 border border-white/15">
                      {currentEvent.venue}
                    </span>
                    <span
                      className="text-xs font-mono font-bold px-2 py-1 text-[#121212]"
                      style={{ backgroundColor: currentEvent.accentColor }}
                    >
                      {currentEvent.date.split('·')[0]}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
