import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, ChevronDown, MailOpen } from 'lucide-react';
import defaultWeddingData from '../config/weddingData.json';

export default function EnvelopeOpener({ isOpen, onOpen, weddingData = defaultWeddingData }) {
  const [isOpening, setIsOpening] = useState(false);
  const data = weddingData || defaultWeddingData;

  const triggerOpen = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

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

  useEffect(() => {
    if (isOpen) return;

    const handleScrollOrSwipe = (e) => {
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
          backgroundColor: 'var(--bg-dark)',
          overflow: 'hidden',
          padding: '16px'
        }}
      >
        {/* Background Radial Glow */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, var(--theme-glow) 0%, transparent 75%)', pointerEvents: 'none' }} />

        {/* Envelope Main Card Container */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', maxWidth: '620px', margin: 'auto' }}
        >
          <div
            className="relative rounded-3xl p-6 sm:p-12 text-center shadow-[0_30px_90px_rgba(0,0,0,0.7)] border-4 border-[#D4AF37]/60 overflow-hidden"
            style={{ width: '100%', backgroundColor: 'var(--bg-light)', borderColor: 'var(--accent)' }}
          >
            {/* Shimmer Border Accent Frame */}
            <div className="absolute inset-3 border-2 rounded-2xl pointer-events-none" style={{ borderColor: 'var(--border-accent)' }} />

            {/* Corner Decorative Icons */}
            <div className="absolute top-4 left-4 text-sm font-serif" style={{ color: 'var(--accent)' }}>✦</div>
            <div className="absolute top-4 right-4 text-sm font-serif" style={{ color: 'var(--accent)' }}>✦</div>
            <div className="absolute bottom-4 left-4 text-sm font-serif" style={{ color: 'var(--accent)' }}>✦</div>
            <div className="absolute bottom-4 right-4 text-sm font-serif" style={{ color: 'var(--accent)' }}>✦</div>

            {/* Top Monogram Emblem */}
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 shadow-xl border-3"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--accent)', color: 'var(--accent)' }}
            >
              <Heart className="w-9 h-9 fill-current" />
            </div>

            {/* Header Text */}
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] font-extrabold mb-3" style={{ color: 'var(--text-dark)' }}>
              YOU ARE CORDIALLY INVITED TO THE WEDDING OF
            </p>

            {/* Couple Names */}
            <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight mb-1" style={{ color: 'var(--text-dark)' }}>
              {data.couple.bride}
            </h1>

            <div className="flex items-center justify-center gap-4 my-2">
              <span className="h-[2px] w-12 sm:w-20" style={{ backgroundColor: 'var(--accent)' }} />
              <span className="font-serif italic text-2xl sm:text-3xl font-bold" style={{ color: 'var(--accent)' }}>&</span>
              <span className="h-[2px] w-12 sm:w-20" style={{ backgroundColor: 'var(--accent)' }} />
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight mb-6" style={{ color: 'var(--text-dark)' }}>
              {data.couple.groom}
            </h1>

            <p className="text-base sm:text-xl font-serif italic mb-8 font-medium max-w-md mx-auto" style={{ color: 'var(--text-dark)' }}>
              "{data.couple.tagline}"
            </p>

            {/* Wax Seal Button */}
            <div className="my-4 flex flex-col items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={triggerOpen}
                disabled={isOpening}
                className="relative group w-full max-w-md min-h-[64px] px-8 py-4 text-white font-bold tracking-widest text-base sm:text-lg uppercase rounded-2xl shadow-xl border-2 hover:border-white transition-all duration-300 cursor-pointer flex items-center justify-center gap-3 overflow-hidden"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--accent)' }}
              >
                <Sparkles className="w-6 h-6 animate-pulse shrink-0" style={{ color: 'var(--accent)' }} />
                <span className="truncate">
                  {isOpening ? 'UNVEILING INVITATION...' : 'TAP HERE TO OPEN INVITATION'}
                </span>
                <MailOpen className="w-6 h-6 shrink-0" style={{ color: 'var(--accent)' }} />
              </motion.button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-wide" style={{ color: 'var(--text-dark)' }}>
                <span>Touch button or scroll / swipe up to open</span>
                <ChevronDown className="w-4 h-4 animate-bounce" style={{ color: 'var(--accent)' }} />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
