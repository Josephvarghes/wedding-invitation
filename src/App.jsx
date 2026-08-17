import React, { useState, useEffect } from 'react';
import EnvelopeOpener from './components/EnvelopeOpener';
import AudioPlayer from './components/AudioPlayer';
import Hero from './components/Hero';
import LoveStory from './components/LoveStory';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import RsvpModal from './components/RsvpModal';
import Footer from './components/Footer';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Handle locking/unlocking body scroll
  useEffect(() => {
    if (!isUnlocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isUnlocked]);

  const handleOpenInvitation = () => {
    setIsUnlocked(true);
    setIsPlayingAudio(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B2B2B] relative selection:bg-[#D4AF37] selection:text-[#122B1E]">
      {/* Interactive Fullscreen Unlocking Screen */}
      <EnvelopeOpener isOpen={isUnlocked} onOpen={handleOpenInvitation} />

      {/* Floating Audio Controller */}
      <AudioPlayer isPlaying={isPlayingAudio} setIsPlaying={setIsPlayingAudio} />

      {/* Main Website (visible after unlocking) */}
      <main className={`transition-opacity duration-1000 ${isUnlocked ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
        <Hero />
        <LoveStory />
        <Timeline />
        <Gallery />
        <RsvpModal isModalOpen={false} />
        <Footer />
      </main>
    </div>
  );
}
