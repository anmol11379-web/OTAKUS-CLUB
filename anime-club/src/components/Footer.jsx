const footerNavs = [
  {
    title: "Upcoming Events",
    links: [
      { name: "Cosplay Carnival", href: "#events" },
      { name: "Anime Quiz Bowl", href: "#events" },
      { name: "Overnight Screening", href: "#events" },
      { name: "Manga & Art Alley", href: "#events" }
    ]
  },
  {
    title: "Club Navigation",
    links: [
      { name: "Home", href: "#hero" },
      { name: "Upcoming Events", href: "#events" },
      { name: "Past Event Glimpses", href: "#creators" },
      { name: "Socials", href: "#socials" }
    ]
  },
  {
    title: "Official Channel",
    links: [
      { name: "Instagram @otakus.vitb", href: "https://www.instagram.com/otakus.vitb/" },
      { name: "animeclub@vitbhopal.ac.in", href: "mailto:animeclub@vitbhopal.ac.in" },
      { name: "VIT Bhopal University", href: "https://vitbhopal.ac.in" }
    ]
  }
];

export default function Footer({ onOpenRegister }) {
  const handleLinkClick = (href) => {
    if (href.startsWith('#') && href.length > 1) {
      const el = document.querySelector(href);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    } else if (href.startsWith('http') || href.startsWith('mailto:')) {
      window.open(href, '_blank');
    }
  };

  return (
    <footer className="relative bg-[#080808] text-white pt-12 pb-8 overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* 3 Column Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-8">
          {footerNavs.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4 font-mono text-[#AFFF00]">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="text-white/60 hover:text-white font-mono text-xs transition-colors inline-block text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-4">
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-6 h-6 bg-[#AFFF00] text-[#121212] flex items-center justify-center font-black text-xs">
              御
            </div>
            <span className="text-base font-black text-white tracking-wider">
              OTAKUS <span className="text-[#AFFF00]">CLUB</span>
            </span>
          </div>

          <p className="text-white/40 font-mono text-xs text-center md:text-left">
            © 2026 OTAKUS Anime Club · VIT Bhopal. All rights reserved.
          </p>
        </div>
      </div>

      {/* Giant Watermark Logo in Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[12rem] md:text-[22rem] font-black text-white/[0.015] pointer-events-none select-none leading-none tracking-tighter">
        OTAKUS
      </div>
    </footer>
  );
}
