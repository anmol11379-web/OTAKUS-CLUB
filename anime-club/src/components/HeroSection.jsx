import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

const itemVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }
  })
};

const visualVariants = {
  hidden: { opacity: 0, scale: 0.85, rotate: -3 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 90, damping: 20, delay: 0.2 }
  }
};

export default function HeroSection({ onOpenRegister }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const yVisual = useSpring(rawY, springConfig);

  const rawScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const scaleVisual = useSpring(rawScale, springConfig);

  const scrollToEvents = () => {
    const el = document.querySelector('#events');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a] text-white noise-overlay"
    >
      {/* Background Anime Ambient Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(175,255,0,0.12),rgba(255,255,255,0))]" />
      
      {/* Glowing ambient floating orbs */}
      <motion.div
        className="absolute top-20 left-10 w-48 h-48 rounded-full bg-[#AFFF00]/10 blur-[100px] pointer-events-none"
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 right-20 w-64 h-64 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none"
        animate={{ x: [0, -40, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-8 lg:pt-24 lg:pb-8 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Anime Club Typography & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Guild Pill Badge */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2.5 bg-black/60 border border-[#AFFF00]/40 text-white px-4 py-1.5 text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(175,255,0,0.2)]"
            >
              <motion.span
                className="w-2 h-2 bg-[#AFFF00] rounded-full shadow-[0_0_8px_#AFFF00]"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-[#AFFF00] font-bold">OTAKUS</span>
              <span className="text-white/40">|</span>
              <span>OFFICIAL ANIME CLUB</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-1 overflow-hidden">
              <motion.h1
                className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.9] uppercase"
              >
                <motion.span
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                  className="block"
                >
                  UNLEASH YOUR
                </motion.span>
                <motion.span
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                  className="block text-[#AFFF00] drop-shadow-[0_0_35px_rgba(175,255,0,0.5)]"
                >
                  ANIME SOUL
                </motion.span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                custom={3}
                className="text-base sm:text-lg font-mono text-white/70 max-w-xl pt-3 leading-relaxed"
              >
                The biggest otaku community on campus. Experience 4K cinema screenings, cosplay face-offs, manga art jams, and a lot more
              </motion.p>
            </div>

            {/* Rectangular Action Buttons */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              custom={4}
              className="flex flex-wrap gap-4 pt-2"
            >
              <motion.button
                onClick={onOpenRegister}
                className="bg-[#AFFF00] text-[#121212] px-8 py-3.5 rounded-none font-black text-sm uppercase tracking-wider flex items-center gap-2.5 group relative overflow-hidden shadow-[0_0_25px_rgba(175,255,0,0.4)] hover:bg-[#bcf92b] transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Register For Events</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                onClick={scrollToEvents}
                className="border-2 border-white/60 text-white bg-black/40 backdrop-blur-md px-8 py-3.5 rounded-none font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-[#121212] transition-colors shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Upcoming Events
              </motion.button>
            </motion.div>
          </div>

          {/* Right Column: Dynamic Anime Mascot Showcase Card (5 cols) */}
          <motion.div
            style={{ y: yVisual, scale: scaleVisual }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <motion.div
              variants={visualVariants}
              initial="hidden"
              animate="visible"
              className="relative w-full max-w-sm sm:max-w-md lg:max-w-[390px]"
            >
              {/* Backlight Neon Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#AFFF00]/30 via-orange-500/20 to-cyan-500/30 blur-2xl opacity-70" />

              {/* Showcase Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative bg-[#141414] border-2 border-[#AFFF00]/50 overflow-hidden shadow-2xl"
              >
                {/* Visual Header */}
                <div className="bg-[#1a1a1a] border-b border-white/10 px-4 py-2 flex items-center font-mono text-xs">
                  <span className="text-[#AFFF00] font-bold flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 bg-[#AFFF00] rounded-full shrink-0" />
                    FEATURING - MOVIE SCREENING
                  </span>
                </div>

                {/* Main Anime Visual */}
                <div className="relative h-64 sm:h-72 lg:h-[320px] overflow-hidden bg-black">
                  <img
                    src="/images/infinity-castle-poster.jpg"
                    alt="Kimetsu no Yaiba – Infinity Castle Movie Poster"
                    className="w-full h-full object-cover object-[center_45%] transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                </div>

                {/* Card Footer Info */}
                <div className="p-4 space-y-2 bg-[#141414]">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-[#AFFF00] text-[#121212] font-mono text-[9px] font-black uppercase tracking-wider">
                        AB02 · AUDI 1 & 2
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-white uppercase leading-snug">
                      Kimetsu no Yaiba – Infinity Castle Movie
                    </h3>
                  </div>

                  <p className="text-xs text-white/60 font-mono leading-snug">
                    Experience the ultimate anime screening on the massive auditorium screen with spatial surround sound.
                  </p>

                  <div className="w-full bg-amber-500/15 text-amber-400 border border-amber-500/40 py-2 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full shadow-[0_0_8px_#fbbf24]" />
                    <span>Postponed</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
