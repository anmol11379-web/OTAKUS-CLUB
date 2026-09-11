import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Film, Palette, Gamepad2, ArrowRight } from 'lucide-react';

const domains = [
  {
    icon: Sparkles,
    title: "Cosplay & Prop Guild",
    kanji: "コスプレ",
    description: "Learn prop making with EVA foam, wig styling masterclasses, makeup, and represent the university at national comic conventions.",
    perk: "Access to 3D printers, hot glue stations & prop workshop",
    accent: "#AFFF00"
  },
  {
    icon: Film,
    title: "4K Cinema & Screening",
    kanji: "上映会",
    description: "Weekly high-definition screenings in Dolby Atmos theaters. Curated seasonal anime marathons, movie premieres, and midnight ramen breaks.",
    perk: "Member reserved seats & free theater snacks",
    accent: "#38bdf8"
  },
  {
    icon: Palette,
    title: "Manga & Art Studio",
    kanji: "漫画・美術",
    description: "Digital illustration jams, manga storytelling workshops, sticker printing, and selling student fanart at the annual campus convention.",
    perk: "Free print subsidies & guest mangaka mentoring",
    accent: "#c084fc"
  },
  {
    icon: Gamepad2,
    title: "Otaku Trivia & Gaming",
    kanji: "クイズ・ゲーム",
    description: "High-stakes anime buzzer quiz bowls, fighting game tournaments (Guilty Gear, Smash, Tekken), and voice-actor trivia clashes.",
    perk: "Cash prizes, official manga sets & exclusive badges",
    accent: "#f59e0b"
  }
];

export default function DomainsSection({ onOpenRegister }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="domains" ref={sectionRef} className="py-24 bg-[#0e0e0e] text-white relative overflow-hidden border-t border-white/10">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-[#AFFF00]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#AFFF00]/10 border border-[#AFFF00]/30 text-[#AFFF00] text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            CLUB WINGS & DIVISIONS
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
            EXPLORE OUR <span className="text-[#AFFF00]">DOMAINS</span>
          </h2>
          <p className="text-white/60 font-mono text-sm mt-2">
            Whether you are a veteran cosplayer, digital illustrator, or casual anime watcher, find your home among fellow enthusiasts.
          </p>
        </div>

        {/* Domain Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {domains.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * idx, duration: 0.5 }}
                className="bg-[#141414] border border-white/10 p-6 flex flex-col justify-between group hover:border-[#AFFF00]/60 transition-colors relative shadow-xl"
              >
                {/* Top colored line on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: item.accent }}
                />

                <div>
                  <div className="flex justify-between items-start mb-5">
                    <div
                      className="w-12 h-12 flex items-center justify-center border border-white/15 text-white group-hover:border-[#AFFF00] transition-colors"
                      style={{ backgroundColor: `${item.accent}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: item.accent }} />
                    </div>
                    <span className="text-xl font-black font-mono text-white/20 select-none">
                      {item.kanji}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-[#AFFF00] transition-colors mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-white/65 leading-relaxed font-sans mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="text-[11px] font-mono text-[#AFFF00] bg-white/5 p-2 border border-white/5">
                    <span className="text-white/40 block text-[9px] uppercase">Member Perk</span>
                    {item.perk}
                  </div>

                  <button
                    onClick={onOpenRegister}
                    className="w-full bg-white/5 hover:bg-[#AFFF00] hover:text-[#121212] text-white/80 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Register / Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
