import React, { useState, useEffect } from 'react';
import EnvelopeOpener from './components/EnvelopeOpener';
import AudioPlayer from './components/AudioPlayer';
import Hero from './components/Hero';
import LoveStory from './components/LoveStory';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import RsvpModal from './components/RsvpModal';
import Footer from './components/Footer';
import ThemeSwitcher from './components/ThemeSwitcher';
import { getInitialTheme, applyThemeCSS, THEMES } from './utils/themeLoader';

export default function App() {
  const [activeTheme, setActiveTheme] = useState(getInitialTheme);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Apply theme CSS variable attribute whenever activeTheme changes
  useEffect(() => {
    applyThemeCSS(activeTheme);
  }, [activeTheme]);

  // Handle body overflow locking/unlocking
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

  const handleSelectTheme = (newThemeId) => {
    setActiveTheme(newThemeId);
  };

  // Get active theme data config
  const currentWeddingData = THEMES[activeTheme]?.config || THEMES['royal-gold'].config;

  return (
    <div className="min-h-screen relative selection:bg-[#D4AF37] selection:text-[#122B1E] transition-colors duration-500">
      {/* Floating Theme Switcher Pill (for demo switching) */}
      <ThemeSwitcher activeTheme={activeTheme} onSelectTheme={handleSelectTheme} />

      {/* Interactive Fullscreen Unlocking Screen */}
      <EnvelopeOpener
        isOpen={isUnlocked}
        onOpen={handleOpenInvitation}
        weddingData={currentWeddingData}
      />

      {/* Floating Audio Controller */}
      <AudioPlayer
        isPlaying={isPlayingAudio}
        setIsPlaying={setIsPlayingAudio}
        weddingData={currentWeddingData}
      />

      {/* Main Website (visible after unlocking) */}
      <main className={`transition-opacity duration-1000 ${isUnlocked ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
        <Hero weddingData={currentWeddingData} />
        <LoveStory weddingData={currentWeddingData} />
        <Timeline weddingData={currentWeddingData} />
        <Gallery weddingData={currentWeddingData} />
        <RsvpModal isModalOpen={false} weddingData={currentWeddingData} />
        <Footer weddingData={currentWeddingData} />
      </main>
    </div>
  );
}
