import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, ChevronDown, MailOpen } from 'lucide-react';
import weddingData from '../config/weddingData.json';

export default function EnvelopeOpener({ isOpen, onOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const triggerOpen = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    // Fire luxurious golden confetti explosion
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#D4AF37', '#F3E5AB', '#FAF7F2', '#AA820A', '#FFFFFF'],
      disableForReducedMotion: true,
    });

    setTimeout(() => {
      onOpen();
    }, 1000);
  };

  // Dual-trigger: Listen for user wheel or touch swipe up on cover
  useEffect(() => {
    if (isOpen) return;

    const handleScrollOrSwipe = (e) => {
      // If user scrolls down or swipes up on overlay, auto trigger envelope open
      if (e.deltaY > 5 || e.type === 'touchmove') {
        triggerOpen();
      }
    };

    window.addEventListener('wheel', handleScrollOrSwipe, { passive: true });
    window.addEventListener('touchmove', handleScrollOrSwipe, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleScrollOrSwipe);
      window.removeEventListener('touchmove', handleScrollOrSwipe);
    };
  }, [isOpen, isOpening]);

  if (isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8, ease: "easeInOut" } }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#122B1E',
          overflow: 'hidden',
          padding: '16px'
        }}
      >
        {/* Background Radial Glow & Ambient Shimmer */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(212,175,55,0.2) 0%, transparent 75%)', pointerEvents: 'none' }} />
        
        {/* Envelope Main Card Container */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', maxWidth: '620px', margin: 'auto' }}
        >
          <div
            className="relative bg-[#FAF7F2] rounded-3xl p-6 sm:p-12 text-center shadow-[0_30px_90px_rgba(0,0,0,0.7)] border-4 border-[#D4AF37]/60 overflow-hidden"
            style={{ width: '100%' }}
          >
            {/* Shimmer Border Accent Frame */}
            <div className="absolute inset-3 border-2 border-[#D4AF37]/40 rounded-2xl pointer-events-none" />

            {/* Corner Decorative Icons */}
            <div className="absolute top-4 left-4 text-[#D4AF37] text-sm font-serif">✦</div>
            <div className="absolute top-4 right-4 text-[#D4AF37] text-sm font-serif">✦</div>
            <div className="absolute bottom-4 left-4 text-[#D4AF37] text-sm font-serif">✦</div>
            <div className="absolute bottom-4 right-4 text-[#D4AF37] text-sm font-serif">✦</div>

            {/* Top Monogram Emblem */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#1B3B2B] text-[#D4AF37] border-3 border-[#D4AF37] mb-6 shadow-xl">
              <Heart className="w-9 h-9 text-[#D4AF37] fill-[#D4AF37]/30" />
            </div>

            {/* Accessible Header Text for All Ages */}
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#1B3B2B] font-extrabold mb-3">
              YOU ARE CORDIALLY INVITED TO THE WEDDING OF
            </p>

            {/* Large Couple Names in Serif */}
            <h1 className="text-4xl sm:text-6xl font-serif text-[#1B3B2B] font-bold tracking-tight mb-1">
              {weddingData.couple.bride}
            </h1>

            <div className="flex items-center justify-center gap-4 my-2">
              <span className="h-[2px] w-12 sm:w-20 bg-[#D4AF37]" />
              <span className="font-serif italic text-2xl sm:text-3xl text-[#D4AF37] font-bold">&</span>
              <span className="h-[2px] w-12 sm:w-20 bg-[#D4AF37]" />
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif text-[#1B3B2B] font-bold tracking-tight mb-6">
              {weddingData.couple.groom}
            </h1>

            <p className="text-base sm:text-xl font-serif italic text-[#2B2B2B] mb-8 font-medium max-w-md mx-auto">
              "{weddingData.couple.tagline}"
            </p>

            {/* Grand Interactive Wax Seal Button (Extra Large for Elders) */}
            <div className="my-4 flex flex-col items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={triggerOpen}
                disabled={isOpening}
                className="relative group w-full max-w-md min-h-[64px] px-8 py-4 bg-gradient-to-r from-[#1B3B2B] via-[#254E3A] to-[#1B3B2B] text-[#FAF7F2] font-bold tracking-widest text-base sm:text-lg uppercase rounded-2xl shadow-[0_15px_35px_rgba(27,59,43,0.4)] border-2 border-[#D4AF37] hover:border-white transition-all duration-300 cursor-pointer flex items-center justify-center gap-3 overflow-hidden"
              >
                {/* Glowing animation background */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <Sparkles className="w-6 h-6 text-[#D4AF37] animate-pulse shrink-0" />
                <span className="truncate">
                  {isOpening ? 'UNVEILING INVITATION...' : 'TAP HERE TO OPEN INVITATION'}
                </span>
                <MailOpen className="w-6 h-6 text-[#D4AF37] shrink-0" />
              </motion.button>

              {/* Bouncing Prompt & Scroll Indicator */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-[#1B3B2B] tracking-wide">
                <span>Touch button or scroll / swipe up to open</span>
                <ChevronDown className="w-4 h-4 text-[#D4AF37] animate-bounce" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
