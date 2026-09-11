import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, CheckCircle2, MessageCircle, Mail, MapPin, Sparkles, ExternalLink } from 'lucide-react';

function DiscordIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.894a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  );
}

function InstagramIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

export default function SocialSection() {
  const [formData, setFormData] = useState({
    name: '',
    regNo: '',
    email: '',
    topic: 'General Inquiry',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Your name is required';
    }
    if (!formData.regNo.trim()) {
      newErrors.regNo = 'Registration number is required';
    }
    const emailTrimmed = formData.email.trim().toLowerCase();
    if (!emailTrimmed) {
      newErrors.email = 'University email is required';
    } else if (!emailTrimmed.endsWith('@vitbhopal.ac.in') && !emailTrimmed.endsWith('.vitbhopal.ac.in')) {
      newErrors.email = 'Email must end with @vitbhopal.ac.in';
    }
    if (!formData.topic.trim()) {
      newErrors.topic = 'Please choose an inquiry topic';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setFormData({ name: '', regNo: '', email: '', topic: 'General Inquiry', message: '' });
      }, 4000);
    }, 600);
  };

  const socials = [
    {
      name: "Instagram",
      handle: "@otakus.vitb",
      desc: "Live convention announcements, cosplay reels, event registrations, stage glimpses, and anime club stories.",
      icon: InstagramIcon,
      accent: "#E1306C",
      link: "https://www.instagram.com/otakus.vitb/",
      action: "Visit @otakus.vitb",
      badge: "OFFICIAL INSTAGRAM"
    },
    {
      name: "Club Email Desk",
      handle: "animeclub@vitbhopal.ac.in",
      desc: "Reach out directly for student inquiries, university collaborations, event sponsorships, and club communications.",
      icon: Mail,
      accent: "#AFFF00",
      link: "mailto:animeclub@vitbhopal.ac.in",
      action: "Send Direct Email",
      badge: "OFFICIAL INBOX"
    }
  ];

  return (
    <section id="socials" className="py-24 bg-[#0a0a0a] text-white relative overflow-hidden border-t border-white/10">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#AFFF00]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#AFFF00]/10 border border-[#AFFF00]/30 text-[#AFFF00] text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            ANIME COMMUNITY & CONTACT HUB
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
            CONNECT WITH <span className="text-[#AFFF00]">OTAKUS</span>
          </h2>
          <p className="text-white/60 font-mono text-sm mt-2">
            Have questions regarding upcoming event slots, club recruitment, or collaborative screenings? Reach out to our official desk or follow us on Instagram.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Social Hub Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xl font-bold uppercase tracking-wider text-white flex items-center gap-2 mb-4 font-mono">
              <span className="w-2 h-2 bg-[#AFFF00]" />
              Official Anime Club Channels
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.name}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className="p-5 bg-[#121212] border border-white/10 hover:border-[#AFFF00]/50 transition-all flex flex-col justify-between group shadow-lg"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div
                          className="w-10 h-10 flex items-center justify-center text-white"
                          style={{ backgroundColor: `${s.accent}20`, border: `1px solid ${s.accent}50` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: s.accent }} />
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-white/5 border border-white/10 text-[#AFFF00] uppercase">
                          {s.badge}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-white uppercase group-hover:text-[#AFFF00] transition-colors flex items-center gap-1.5">
                        {s.name}
                        <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-xs font-mono text-[#AFFF00] mb-2">{s.handle}</p>
                      <p className="text-xs text-white/60 leading-relaxed font-sans">{s.desc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/80 group-hover:text-white">
                      <span>{s.action}</span>
                      <span className="text-[#AFFF00]">→</span>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Club Office Location Card */}
            <div className="p-4 bg-[#141414] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-white/70">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#AFFF00]" />
                <span>VIT Bhopal University Campus</span>
              </div>
              <a
                href="mailto:animeclub@vitbhopal.ac.in"
                className="flex items-center gap-2 text-[#AFFF00] hover:underline"
              >
                <Mail className="w-4 h-4" />
                <span>animeclub@vitbhopal.ac.in</span>
              </a>
            </div>
          </div>

          {/* Right Column: Transmission / Contact Form (5 cols) */}
          <div className="lg:col-span-5 bg-[#121212] border border-white/10 p-6 sm:p-8 shadow-2xl relative">
            <div className="h-1 w-full bg-gradient-to-r from-[#AFFF00] via-cyan-400 to-[#AFFF00] absolute top-0 left-0 right-0" />

            <div className="mb-6">
              <h3 className="text-xl font-bold uppercase tracking-tight text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#AFFF00]" />
                Send Club Message
              </h3>
              <p className="text-xs font-mono text-white/60 mt-1">
                Got a suggestion, collaboration inquiry, or question for the anime club board? Drop a message.
              </p>
            </div>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-3"
              >
                <div className="w-12 h-12 bg-[#AFFF00]/20 border border-[#AFFF00] flex items-center justify-center mx-auto text-[#AFFF00]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white uppercase">Message Dispatched!</h4>
                <p className="text-xs font-mono text-white/70">
                  Our core anime committee will respond to your university email within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/80 mb-1">
                    Your Name <span className="text-[#AFFF00]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder="Enter your name"
                    className={`w-full bg-[#181818] border ${
                      errors.name ? 'border-red-500' : 'border-white/15 focus:border-[#AFFF00]'
                    } px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none font-mono`}
                  />
                  {errors.name && (
                    <span className="text-[11px] text-red-400 font-mono mt-1 block">{errors.name}</span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/80 mb-1">
                      Reg No <span className="text-[#AFFF00]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.regNo}
                      onChange={(e) => {
                        setFormData({ ...formData, regNo: e.target.value.toUpperCase() });
                        if (errors.regNo) setErrors({ ...errors, regNo: '' });
                      }}
                      placeholder="23BCE..."
                      className={`w-full bg-[#181818] border ${
                        errors.regNo ? 'border-red-500' : 'border-white/15 focus:border-[#AFFF00]'
                      } px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none font-mono uppercase`}
                    />
                    {errors.regNo && (
                      <span className="text-[11px] text-red-400 font-mono mt-1 block">{errors.regNo}</span>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/80 mb-1">
                      Email <span className="text-[#AFFF00]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      placeholder="student@vitbhopal.ac.in"
                      className={`w-full bg-[#181818] border ${
                        errors.email ? 'border-red-500' : 'border-white/15 focus:border-[#AFFF00]'
                      } px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none font-mono`}
                    />
                    {errors.email && (
                      <span className="text-[11px] text-red-400 font-mono mt-1 block">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/80 mb-1">
                    Inquiry Topic <span className="text-[#AFFF00]">*</span>
                  </label>
                  <select
                    required
                    value={formData.topic}
                    onChange={(e) => {
                      setFormData({ ...formData, topic: e.target.value });
                      if (errors.topic) setErrors({ ...errors, topic: '' });
                    }}
                    className={`w-full bg-[#181818] border ${
                      errors.topic ? 'border-red-500' : 'border-white/15 focus:border-[#AFFF00]'
                    } px-3.5 py-2.5 text-xs text-white focus:outline-none font-mono`}
                  >
                    <option value="General Inquiry">General Club Inquiry</option>
                    <option value="Event Registration Issue">Event Registration / Slot Query</option>
                    <option value="Club Recruitment">Auditions & Core Committee Recruitment</option>
                    <option value="Screening Suggestion">Suggest an Anime Screening</option>
                    <option value="Sponsorship & Stalls">Sponsorship & Fanart Stall</option>
                  </select>
                  {errors.topic && (
                    <span className="text-[11px] text-red-400 font-mono mt-1 block">{errors.topic}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/80 mb-1">
                    Message <span className="text-[#AFFF00]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    placeholder="Tell us what anime you want to screen or your question..."
                    className={`w-full bg-[#181818] border ${
                      errors.message ? 'border-red-500' : 'border-white/15 focus:border-[#AFFF00]'
                    } px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none font-mono`}
                  />
                  {errors.message && (
                    <span className="text-[11px] text-red-400 font-mono mt-1 block">{errors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#AFFF00] hover:bg-[#bcf92b] text-[#121212] font-black tracking-wider py-3 text-xs uppercase flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  {loading ? "Transmitting..." : "Send Transmission"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
