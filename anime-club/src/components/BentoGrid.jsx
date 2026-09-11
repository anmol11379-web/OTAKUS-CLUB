import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Users, Calendar, X, ZoomIn } from 'lucide-react';

const hyougenSlides = [
  "/images/hyougen-poster.jpg",
  "/images/hyougen-stage.jpg",
  "/images/hyougen-cosplay.jpg",
  "/images/hyougen-memories.jpg"
];

const courtroomSlides = [
  "/images/anime-courtroom-poster.jpg",
  "/images/anime-courtroom-stage.jpg"
];

const edekiyouSlides = [
  "/images/e-de-kiyou-poster.jpg",
  "/images/e-de-kiyou-stage.jpg"
];

const workshopSlides = [
  "/images/ghibli-edekiyou-poster.jpg",
  "/images/ghibli-edekiyou-workshop.jpg"
];

const monarchSlides = [
  "/images/monarch-treasure-poster.jpg",
  "/images/monarch-treasure-sword.jpg",
  "/images/monarch-treasure-crew.jpg"
];

const pastEvents = [
  {
    id: 1,
    title: "Hyougen Anime Con",
    category: "Cosplay",
    date: "Advitya 2K26",
    attendees: "VIT Bhopal",
    description: "Our flagship campus anime convention featuring cosplay championship, arcade arena, and live student performances in front of a packed auditorium.",
    image: "/images/hyougen-poster.jpg",
    span: "col-span-1 md:col-span-2 row-span-2",
    badge: "ADVITYA 2K26"
  },
  {
    id: 2,
    title: "Anime Courtroom: The State vs. Delusion",
    category: "Mock Trial",
    date: "Campus Special",
    attendees: "VIT Bhopal",
    description: "Defend your side, challenge the opposition, and win over the jury in an intense Ace Attorney style mock courtroom debate showdown.",
    image: "/images/anime-courtroom-poster.jpg",
    span: "col-span-1 md:col-span-2 row-span-2",
    badge: "COURT IN SESSION"
  },
  {
    id: 3,
    title: "E De Kiyou! Let's Wear Art",
    category: "T-Shirt Painting",
    date: "Campus Special",
    attendees: "VIT Bhopal",
    description: "The Anime Club's signature t-shirt painting fiesta where students bring their anime passion and favorite characters to life on canvas tees.",
    image: "/images/e-de-kiyou-poster.jpg",
    span: "col-span-1 md:col-span-2 row-span-1",
    badge: "ART FIESTA"
  },
  {
    id: 4,
    title: "Anime T-Shirt Art Studio",
    category: "Workshop",
    date: "Campus Studio",
    attendees: "VIT Bhopal",
    description: "Hands-on live workshop where members craft custom hand-painted anime tees featuring Ghibli, dragons, and iconic manga illustrations.",
    image: "/images/ghibli-edekiyou-poster.jpg",
    span: "col-span-1 md:col-span-1 row-span-1",
    badge: "ART WORKSHOP"
  },
  {
    id: 5,
    title: "Monarch Treasure Hunt",
    category: "Treasure Hunt",
    date: "Advitya 2025",
    attendees: "VIT Bhopal",
    description: "An adrenaline-fueled Solo Leveling themed campus treasure hunt featuring clue cracking, ranking boards, and monarch trials.",
    image: "/images/monarch-treasure-poster.jpg",
    span: "col-span-1 md:col-span-1 row-span-1",
    badge: "TREASURE HUNT"
  }
];

export default function BentoGrid() {
  const [activePhoto, setActivePhoto] = useState(null);
  const [hyougenSlideIdx, setHyougenSlideIdx] = useState(0);
  const [courtroomSlideIdx, setCourtroomSlideIdx] = useState(0);
  const [edekiyouSlideIdx, setEdekiyouSlideIdx] = useState(0);
  const [workshopSlideIdx, setWorkshopSlideIdx] = useState(0);
  const [monarchSlideIdx, setMonarchSlideIdx] = useState(0);

  useEffect(() => {
    const hyougenInterval = setInterval(() => {
      setHyougenSlideIdx((prev) => (prev + 1) % hyougenSlides.length);
    }, 2500);
    return () => clearInterval(hyougenInterval);
  }, []);

  useEffect(() => {
    const courtroomInterval = setInterval(() => {
      setCourtroomSlideIdx((prev) => (prev + 1) % courtroomSlides.length);
    }, 2500);
    return () => clearInterval(courtroomInterval);
  }, []);

  useEffect(() => {
    const edekiyouInterval = setInterval(() => {
      setEdekiyouSlideIdx((prev) => (prev + 1) % edekiyouSlides.length);
    }, 2500);
    return () => clearInterval(edekiyouInterval);
  }, []);

  useEffect(() => {
    const workshopInterval = setInterval(() => {
      setWorkshopSlideIdx((prev) => (prev + 1) % workshopSlides.length);
    }, 2500);
    return () => clearInterval(workshopInterval);
  }, []);

  useEffect(() => {
    const monarchInterval = setInterval(() => {
      setMonarchSlideIdx((prev) => (prev + 1) % monarchSlides.length);
    }, 2500);
    return () => clearInterval(monarchInterval);
  }, []);

  return (
    <section id="creators" className="py-24 bg-[#0d0d0d] text-white relative overflow-hidden">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#AFFF00]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#AFFF00]/10 border border-[#AFFF00]/30 text-[#AFFF00] text-xs font-mono tracking-widest uppercase mb-3">
              <Camera className="w-3.5 h-3.5" />
              ARCHIVES & EVENT MEMORIES
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">
              PAST EVENT <span className="text-[#AFFF00]">GLIMPSES</span>
            </h2>
            <p className="text-white/60 font-mono text-sm max-w-xl mt-2">
              Explore photo highlights from our past conventions, mock courtroom trials, and spirited anime tournaments.
            </p>
          </div>
        </div>

        {/* Bento Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[280px]">
          {pastEvents.map((item, idx) => {
            const isHyougen = item.id === 1;
            const isCourtroom = item.id === 2;
            const isEdekiyou = item.id === 3;
            const isWorkshop = item.id === 4;
            const isMonarch = item.id === 5;
            const isSlideshow = isHyougen || isCourtroom || isEdekiyou || isWorkshop || isMonarch;
            const slides = isHyougen ? hyougenSlides : isCourtroom ? courtroomSlides : isEdekiyou ? edekiyouSlides : isWorkshop ? workshopSlides : isMonarch ? monarchSlides : null;
            const currentIdx = isHyougen ? hyougenSlideIdx : isCourtroom ? courtroomSlideIdx : isEdekiyou ? edekiyouSlideIdx : isWorkshop ? workshopSlideIdx : isMonarch ? monarchSlideIdx : 0;
            const currentPhoto = isSlideshow ? slides[currentIdx] : item.image;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={() => setActivePhoto({ ...item, image: currentPhoto })}
                className={`group relative overflow-hidden bg-[#161616] border border-white/10 hover:border-[#AFFF00]/70 cursor-pointer shadow-lg hover:shadow-[0_16px_36px_rgba(0,0,0,0.8),0_0_24px_rgba(175,255,0,0.25)] transition-all duration-300 z-10 hover:z-20 ${item.span}`}
              >
                {/* Photo Image */}
                {isSlideshow ? (
                  <div className="w-full h-full relative overflow-hidden bg-black transition-transform duration-500 ease-out group-hover:scale-105">
                    {slides.map((imgSrc, i) => (
                      <motion.img
                        key={imgSrc}
                        src={imgSrc}
                        alt={item.title}
                        initial={false}
                        animate={{
                          opacity: i === currentIdx ? 1 : 0,
                          scale: i === currentIdx ? 1.02 : 1
                        }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full object-cover brightness-[0.88] group-hover:brightness-100"
                      />
                    ))}
                  </div>
                ) : (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 brightness-[0.85] group-hover:brightness-100"
                  />
                )}

                {/* Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                {/* Badges Top */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#AFFF00] text-[#121212] font-mono text-[10px] font-bold uppercase tracking-wider">
                      {item.badge}
                    </span>
                    {isSlideshow && (
                      <div className="flex items-center gap-1 bg-black/70 backdrop-blur-md px-2 py-1 border border-white/20">
                        {slides.map((_, i) => (
                          <span
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              i === currentIdx ? 'w-4 bg-[#AFFF00]' : 'w-1.5 bg-white/40'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="w-8 h-8 rounded-none bg-black/60 border border-white/20 flex items-center justify-center text-white/70 group-hover:text-[#AFFF00] group-hover:border-[#AFFF00] transition-colors">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </div>

              {/* Caption Bottom */}
              <div className="absolute bottom-0 inset-x-0 p-5 space-y-1.5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <div className="flex items-center gap-3 text-[11px] font-mono text-[#AFFF00]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {item.attendees}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight text-white leading-snug group-hover:text-[#AFFF00] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-white/60 font-sans line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activePhoto && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActivePhoto(null)}
                className="fixed inset-0 bg-black/90 backdrop-blur-md"
              />

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-4xl w-full bg-[#121212] border-2 border-[#AFFF00]/40 overflow-hidden z-10 shadow-2xl"
              >
                <div className="relative aspect-video max-h-[65vh] w-full bg-black">
                  <img
                    src={activePhoto.image}
                    alt={activePhoto.title}
                    className="w-full h-full object-contain"
                  />
                  <button
                    onClick={() => setActivePhoto(null)}
                    className="absolute top-4 right-4 bg-black/80 hover:bg-white text-white hover:text-black p-2 border border-white/20 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 bg-[#161616] border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#AFFF00] mb-1">
                      <span>{activePhoto.date}</span>
                      <span>•</span>
                      <span>{activePhoto.attendees}</span>
                    </div>
                    <h4 className="text-xl font-bold text-white uppercase">{activePhoto.title}</h4>
                    <p className="text-xs text-white/60 font-sans mt-1 max-w-2xl">{activePhoto.description}</p>
                  </div>
                  <span className="px-3 py-1 bg-[#AFFF00] text-[#121212] font-mono text-xs font-bold uppercase whitespace-nowrap">
                    {activePhoto.category}
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
