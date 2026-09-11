import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Ticket } from 'lucide-react';

export default function Navigation({ onOpenRegister }) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Upcoming Events", href: "#events" },
    { label: "Past Glimpses", href: "#creators" },
    { label: "Socials", href: "#socials" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0d0d0d]/95 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/50 to-transparent backdrop-blur-xs border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Anime Club Brand Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-[#AFFF00] text-[#121212] flex items-center justify-center font-black text-base shadow-[0_0_12px_rgba(175,255,0,0.5)]">
            御
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-xl font-black tracking-wider text-white">OTAKUS</span>
              <span className="text-xs px-1.5 py-0.5 bg-[#AFFF00] text-[#121212] font-black tracking-tighter">
                CLUB
              </span>
            </div>
            <span className="text-[9px] font-mono text-white/50 tracking-widest uppercase mt-0.5">
              OFFICIAL VITB CLUB
            </span>
          </div>
        </a>

        {/* Desktop Menu Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-xs uppercase font-mono tracking-wider transition-colors relative text-white/80 hover:text-[#AFFF00]"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Register Now CTA Button */}
        <div className="hidden sm:flex items-center gap-4">
          <motion.button
            onClick={onOpenRegister}
            className="bg-[#AFFF00] text-[#121212] px-6 py-2.5 rounded-none font-black text-xs uppercase tracking-wider relative overflow-hidden shadow-[0_0_20px_rgba(175,255,0,0.3)] hover:bg-[#bbf629] transition-all flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Register Now</span>
          </motion.button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="lg:hidden p-2 text-white hover:text-[#AFFF00] border border-white/10"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#121212] border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="block w-full text-left py-2 font-mono text-sm uppercase text-white/80 hover:text-[#AFFF00] border-b border-white/5"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenRegister();
                }}
                className="w-full bg-[#AFFF00] text-[#121212] px-6 py-3 rounded-none font-black text-xs uppercase tracking-wider mt-4 flex items-center justify-center gap-2"
              >
                <Ticket className="w-4 h-4" />
                <span>Register For Events</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
