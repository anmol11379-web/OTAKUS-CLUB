import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import ClickSpark from './components/ClickSpark';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import EventsSection from './components/EventsSection';
import { upcomingEventsData } from './data/events';
import BentoGrid from './components/BentoGrid';
import SocialSection from './components/SocialSection';
import Footer from './components/Footer';
import RegistrationModal from './components/RegistrationModal';

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedEventTitle, setSelectedEventTitle] = useState('');

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const handleOpenRegister = (eventTitle = '') => {
    setSelectedEventTitle(eventTitle || upcomingEventsData[0]?.title || '');
    setIsRegisterOpen(true);
  };

  const handleCloseRegister = () => {
    setIsRegisterOpen(false);
  };

  return (
    <ClickSpark sparkColor="#AFFF00" sparkSize={10} sparkRadius={16} sparkCount={8}>
      <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#AFFF00] selection:text-[#121212]">
        <Navigation onOpenRegister={() => handleOpenRegister()} />
        <HeroSection onOpenRegister={() => handleOpenRegister()} />
        <EventsSection onRegisterEvent={(title) => handleOpenRegister(title)} />
        <BentoGrid />
        <SocialSection />
        <Footer onOpenRegister={() => handleOpenRegister()} />

        {/* Global Registration Modal for Name & Reg No */}
        <RegistrationModal
          isOpen={isRegisterOpen}
          onClose={handleCloseRegister}
          selectedEvent={selectedEventTitle}
          upcomingEvents={upcomingEventsData}
        />
      </main>
    </ClickSpark>
  );
}
