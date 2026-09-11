import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Ticket, Sparkles, User, Hash, Mail, Calendar, Copy, Check, Phone, Lock, AlertCircle } from 'lucide-react';

export default function RegistrationModal({ isOpen, onClose, selectedEvent, upcomingEvents = [] }) {
  const [formData, setFormData] = useState(() => ({
    fullName: '',
    regNo: '',
    email: '',
    event: selectedEvent || upcomingEvents[0]?.title || '',
    phone: '',
  }));

  const [errors, setErrors] = useState({});
  const [submittedPass, setSubmittedPass] = useState(null);
  const [copied, setCopied] = useState(false);
  const [prevSelected, setPrevSelected] = useState(selectedEvent);

  if (selectedEvent !== prevSelected) {
    setPrevSelected(selectedEvent);
    setFormData((prev) => ({ ...prev, event: selectedEvent || '' }));
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const selectedEventObj = upcomingEvents.find(
    (ev) => ev.title === formData.event || ev.id === formData.event
  );

  const isDateTBA = !selectedEventObj || !selectedEventObj.date ||
    selectedEventObj.date.toLowerCase().includes('to be announced') ||
    selectedEventObj.date.toLowerCase().includes('tba');

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full name is compulsory';
    }

    if (!formData.regNo.trim()) {
      errs.regNo = 'University Registration No. is compulsory';
    }

    const emailTrimmed = formData.email.trim().toLowerCase();
    if (!emailTrimmed) {
      errs.email = 'Student email ID is compulsory';
    } else if (!emailTrimmed.endsWith('@vitbhopal.ac.in') && !emailTrimmed.endsWith('.vitbhopal.ac.in')) {
      errs.email = 'Student email ID must be in .vitbhopal.ac.in (e.g. student@vitbhopal.ac.in)';
    }

    if (!formData.event) {
      errs.event = 'Event selection is compulsory';
    } else if (isDateTBA) {
      errs.event = 'Cannot register until the event date is announced.';
    }

    const phoneTrimmed = formData.phone.trim();
    if (!phoneTrimmed) {
      errs.phone = 'Phone number is compulsory';
    } else if (!/^[0-9+\s-]{10,15}$/.test(phoneTrimmed)) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const passId = `OTK-${Math.floor(100000 + Math.random() * 900000)}`;
    const timestamp = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const newPass = {
      ...formData,
      passId,
      timestamp,
      status: 'CONFIRMED',
    };

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('anime_club_registrations') || '[]');
      existing.unshift(newPass);
      localStorage.setItem('anime_club_registrations', JSON.stringify(existing));
    } catch {
      // ignore storage errors
    }

    setSubmittedPass(newPass);
  };

  const handleReset = () => {
    setSubmittedPass(null);
    setFormData({
      fullName: '',
      regNo: '',
      email: '',
      event: selectedEvent || (upcomingEvents[0]?.title || ''),
      phone: '',
    });
    setErrors({});
  };

  const handleCopyTicket = () => {
    if (!submittedPass) return;
    const text = `🎟️ OTAKUS CLUB EVENT PASS\nPass ID: ${submittedPass.passId}\nName: ${submittedPass.fullName}\nReg No: ${submittedPass.regNo}\nEmail: ${submittedPass.email}\nPhone: ${submittedPass.phone}\nEvent: ${submittedPass.event}\nStatus: CONFIRMED`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-4 flex min-h-full items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
          className="relative w-full max-w-lg bg-[#121212] border-2 border-[#AFFF00]/40 text-white shadow-[0_0_50px_rgba(175,255,0,0.2)] max-h-[92vh] flex flex-col z-10 my-auto overflow-hidden"
        >
          {/* Header Accent Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#AFFF00] via-cyan-400 to-[#AFFF00] shrink-0" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/60 hover:text-white hover:bg-white/10 p-1.5 transition-colors border border-white/10 z-20"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Scrollable Content Container */}
          <div className="p-4 sm:p-6 overflow-y-auto">
            {!submittedPass ? (
              <>
                {/* Modal Title */}
                <div className="mb-3 sm:mb-4 pr-6">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#AFFF00]/10 border border-[#AFFF00]/30 text-[#AFFF00] text-[10px] font-mono tracking-widest uppercase mb-1.5">
                    <Sparkles className="w-3 h-3" />
                    OTAKUS CLUB · OFFICIAL PORTAL
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                    Register For Event
                  </h2>
                  <p className="text-[11px] sm:text-xs text-white/60 font-mono mt-0.5">
                    Enter your student details to claim your entry pass and secure your slot.
                  </p>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-white/80 mb-1 flex items-center gap-1.5">
                      <User className="w-3 h-3 text-[#AFFF00]" />
                      Full Name <span className="text-[#AFFF00]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Enter your name"
                      className={`w-full bg-[#1c1c1c] border ${
                        errors.fullName ? 'border-red-500' : 'border-white/20 focus:border-[#AFFF00]'
                      } px-3 py-2 text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none transition-colors font-mono`}
                    />
                    {errors.fullName && (
                      <span className="text-[10px] text-red-400 font-mono mt-0.5 block">{errors.fullName}</span>
                    )}
                  </div>

                  {/* Registration Number (Reg No) */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-white/80 mb-1 flex items-center gap-1.5">
                      <Hash className="w-3 h-3 text-[#AFFF00]" />
                      Registration Number (Reg No) <span className="text-[#AFFF00]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.regNo}
                      onChange={(e) => setFormData({ ...formData, regNo: e.target.value.toUpperCase() })}
                      placeholder="e.g. 23BCE10245"
                      className={`w-full bg-[#1c1c1c] border ${
                        errors.regNo ? 'border-red-500' : 'border-white/20 focus:border-[#AFFF00]'
                      } px-3 py-2 text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none transition-colors font-mono uppercase`}
                    />
                    {errors.regNo && (
                      <span className="text-[10px] text-red-400 font-mono mt-0.5 block">{errors.regNo}</span>
                    )}
                  </div>

                  {/* Student Email */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-white/80 mb-1 flex items-center gap-1.5">
                      <Mail className="w-3 h-3 text-[#AFFF00]" />
                      Student Email Address <span className="text-[#AFFF00]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="student@vitbhopal.ac.in"
                      className={`w-full bg-[#1c1c1c] border ${
                        errors.email ? 'border-red-500' : 'border-white/20 focus:border-[#AFFF00]'
                      } px-3 py-2 text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none transition-colors font-mono`}
                    />
                    {errors.email && (
                      <span className="text-[10px] text-red-400 font-mono mt-0.5 block">{errors.email}</span>
                    )}
                  </div>

                  {/* Phone Number (compulsory, replaces discordTag) */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-white/80 mb-1 flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-[#AFFF00]" />
                      Phone Number <span className="text-[#AFFF00]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 9876543210"
                      className={`w-full bg-[#1c1c1c] border ${
                        errors.phone ? 'border-red-500' : 'border-white/20 focus:border-[#AFFF00]'
                      } px-3 py-2 text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none transition-colors font-mono`}
                    />
                    {errors.phone && (
                      <span className="text-[10px] text-red-400 font-mono mt-0.5 block">{errors.phone}</span>
                    )}
                  </div>

                  {/* Select Event */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-white/80 mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-[#AFFF00]" />
                      Select Club Event <span className="text-[#AFFF00]">*</span>
                    </label>
                    <select
                      value={formData.event}
                      onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                      className={`w-full bg-[#1c1c1c] border ${
                        errors.event ? 'border-red-500' : 'border-white/20 focus:border-[#AFFF00]'
                      } px-3 py-2 text-xs sm:text-sm text-white focus:outline-none transition-colors font-mono`}
                    >
                      <option value="">-- Choose an Event --</option>
                      {upcomingEvents.map((ev) => (
                        <option key={ev.id || ev.title} value={ev.title}>
                          {ev.title} ({ev.date})
                        </option>
                      ))}
                      {upcomingEvents.length === 0 && (
                        <>
                          <option value="Campus Anime Cosplay Runway">Campus Anime Cosplay Runway (To Be Announced)</option>
                          <option value="Inter-Branch Anime Quiz Bowl">Inter-Branch Anime Quiz Bowl (To Be Announced)</option>
                          <option value="Campus Anime Movie Screening">Campus Anime Movie Screening (To Be Announced)</option>
                          <option value="Campus Manga Sketch & Art Jam">Campus Manga Sketch & Art Jam (To Be Announced)</option>
                        </>
                      )}
                    </select>
                    {errors.event && (
                      <span className="text-[10px] text-red-400 font-mono mt-0.5 block">{errors.event}</span>
                    )}

                    {/* Date TBA Notice: Candidate cannot register until date is announced */}
                    {isDateTBA && formData.event && (
                      <div className="p-2.5 bg-amber-500/10 border border-amber-500/40 text-amber-300 text-xs font-mono flex items-start gap-2 mt-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                        <div>
                          <span className="font-bold block uppercase tracking-wider text-amber-200 text-[11px]">Registration Locked</span>
                          <span className="text-white/80 leading-relaxed block mt-0.5 text-[10px]">
                            Candidates cannot register until the official event date is announced. Follow our official Instagram{' '}
                            <a href="https://www.instagram.com/otakus.vitb/" target="_blank" rel="noreferrer" className="underline text-[#AFFF00] hover:text-white">
                              @otakus.vitb
                            </a>{' '}
                            for the date announcement and slot opening!
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isDateTBA}
                    className={`w-full font-black tracking-wider py-3 px-4 text-xs sm:text-sm uppercase flex items-center justify-center gap-2 mt-3 sm:mt-4 transition-all ${
                      isDateTBA
                        ? 'bg-[#181818] text-white/40 border border-white/10 cursor-not-allowed'
                        : 'bg-[#AFFF00] text-[#121212] shadow-[0_0_20px_rgba(175,255,0,0.3)] hover:bg-[#bcf92b]'
                    }`}
                  >
                    {isDateTBA ? (
                      <>
                        <Lock className="w-4 h-4 text-amber-400" />
                        <span>Registration Locked · Date To Be Announced</span>
                      </>
                    ) : (
                      <>
                        <Ticket className="w-4 h-4" />
                        <span>Confirm Registration & Issue Pass</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              /* Success / Ticket View */
              <div className="text-center py-2">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-16 h-16 bg-[#AFFF00]/20 border-2 border-[#AFFF00] flex items-center justify-center mx-auto mb-4 text-[#AFFF00]"
                >
                  <CheckCircle2 className="w-8 h-8" />
                </motion.div>

                <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                  Registration Confirmed!
                </h3>
                <p className="text-xs font-mono text-white/70 mt-1">
                  Your entry pass is generated. Please show this at the event verification desk.
                </p>

                {/* Digital Event Pass Card */}
                <div className="mt-6 bg-[#1a1a1a] border-2 border-dashed border-[#AFFF00]/50 p-5 text-left relative overflow-hidden">
                  <div className="flex justify-between items-start border-b border-white/10 pb-3 mb-3">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-[#AFFF00] uppercase block">
                        OTAKUS CLUB ENTRY PASS
                      </span>
                      <h4 className="text-lg font-bold text-white leading-snug">{submittedPass.event}</h4>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 bg-[#AFFF00] text-[#121212] text-[10px] font-mono font-bold uppercase">
                        {submittedPass.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div>
                      <span className="text-white/50 block text-[10px] uppercase">Attendee</span>
                      <span className="text-white font-semibold">{submittedPass.fullName}</span>
                    </div>
                    <div>
                      <span className="text-white/50 block text-[10px] uppercase">Registration No</span>
                      <span className="text-[#AFFF00] font-bold">{submittedPass.regNo}</span>
                    </div>
                    <div>
                      <span className="text-white/50 block text-[10px] uppercase">Student Email</span>
                      <span className="text-white/90 truncate block">{submittedPass.email}</span>
                    </div>
                    <div>
                      <span className="text-white/50 block text-[10px] uppercase">Phone Number</span>
                      <span className="text-white/90">{submittedPass.phone}</span>
                    </div>
                    <div>
                      <span className="text-white/50 block text-[10px] uppercase">Pass ID</span>
                      <span className="text-white font-semibold">{submittedPass.passId}</span>
                    </div>
                    <div>
                      <span className="text-white/50 block text-[10px] uppercase">Issued Date</span>
                      <span className="text-white/80">{submittedPass.timestamp}</span>
                    </div>
                  </div>

                  {/* Aesthetic barcode pattern */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-white/40 font-mono text-[9px]">
                    <span className="tracking-[0.2em]">||| | |||| | ||| || |||| |</span>
                    <span>VERIFY: 2026-CLUB-GATE</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleCopyTicket}
                    className="flex-1 bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white border border-white/20 py-2.5 px-4 text-xs font-mono flex items-center justify-center gap-2 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#AFFF00]" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied Details!' : 'Copy Pass Info'}
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 bg-[#AFFF00] hover:bg-[#bbf629] text-[#121212] py-2.5 px-4 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    Register Another
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
