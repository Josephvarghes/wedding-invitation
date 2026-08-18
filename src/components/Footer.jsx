import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, ArrowUp } from 'lucide-react';
import defaultWeddingData from '../config/weddingData.json';

export default function Footer({ weddingData = defaultWeddingData }) {
  const data = weddingData || defaultWeddingData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShareWhatsApp = () => {
    const shareText = `You are cordially invited to the wedding celebration of ${data.couple.bride} & ${data.couple.groom}! View full details & RSVP here: ${window.location.href}`;
    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappShareUrl, '_blank');
  };

  return (
    <footer className="py-16 px-4 border-t relative overflow-hidden" style={{ backgroundColor: 'var(--bg-dark)', color: 'var(--text-light)', borderColor: 'var(--border-accent)' }}>
      {/* Glow background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: 'var(--theme-glow)' }} />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 mb-6 shadow-md"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--accent)', color: 'var(--accent)' }}
        >
          <Heart className="w-7 h-7 fill-current" />
        </motion.div>

        {/* Closing Title */}
        <h3 className="text-3xl sm:text-4xl font-serif font-bold mb-3" style={{ color: 'var(--text-light)' }}>
          {data.couple.bride} & {data.couple.groom}
        </h3>

        <p className="text-sm font-serif italic max-w-md mx-auto mb-8" style={{ color: 'var(--accent)' }}>
          "With love and joyful anticipation, we look forward to celebrating our special day with you."
        </p>

        {/* Share Button & Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={handleShareWhatsApp}
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-xs uppercase tracking-wider rounded-full border transition-all duration-300 shadow-md cursor-pointer"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-dark)', borderColor: 'var(--accent)' }}
          >
            <Share2 className="w-4 h-4" />
            <span>Share Invitation via WhatsApp</span>
          </button>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-3 bg-transparent font-semibold text-xs uppercase tracking-wider rounded-full border transition-all duration-300 cursor-pointer"
            style={{ color: 'var(--accent)', borderColor: 'var(--border-accent)' }}
          >
            <ArrowUp className="w-4 h-4" />
            <span>Back to Top</span>
          </button>
        </div>

        {/* Copyright / Credit */}
        <div className="pt-8 border-t border-white/10 text-xs font-sans tracking-wide opacity-60">
          © {new Date().getFullYear()} {data.couple.bride} & {data.couple.groom}'s Wedding. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
