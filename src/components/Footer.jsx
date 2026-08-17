import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, ArrowUp } from 'lucide-react';
import weddingData from '../config/weddingData.json';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShareWhatsApp = () => {
    const shareText = `You are cordially invited to the wedding celebration of ${weddingData.couple.bride} & ${weddingData.couple.groom}! View full details & RSVP here: ${window.location.href}`;
    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappShareUrl, '_blank');
  };

  return (
    <footer className="bg-[#122B1E] text-[#FAF7F2] py-16 px-4 border-t border-[#D4AF37]/30 relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1B3B2B] text-[#D4AF37] border-2 border-[#D4AF37] mb-6 shadow-md"
        >
          <Heart className="w-7 h-7 text-[#D4AF37] fill-[#D4AF37]/30" />
        </motion.div>

        {/* Closing Title */}
        <h3 className="text-3xl sm:text-4xl font-serif text-[#FAF7F2] font-bold mb-3">
          {weddingData.couple.bride} & {weddingData.couple.groom}
        </h3>

        <p className="text-sm font-serif italic text-[#D4AF37] max-w-md mx-auto mb-8">
          "With love and joyful anticipation, we look forward to celebrating our special day with you."
        </p>

        {/* Share Button & Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={handleShareWhatsApp}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#254E3A] hover:bg-[#D4AF37] text-[#FAF7F2] hover:text-[#122B1E] font-semibold text-xs uppercase tracking-wider rounded-full border border-[#D4AF37]/50 transition-all duration-300 shadow-md cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Invitation via WhatsApp</span>
          </button>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-3 bg-transparent hover:bg-white/10 text-[#D4AF37] font-semibold text-xs uppercase tracking-wider rounded-full border border-[#D4AF37]/40 transition-all duration-300 cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
            <span>Back to Top</span>
          </button>
        </div>

        {/* Copyright / Credit */}
        <div className="pt-8 border-t border-[#FAF7F2]/10 text-xs text-[#FAF7F2]/60 font-sans tracking-wide">
          © {new Date().getFullYear()} {weddingData.couple.bride} & {weddingData.couple.groom}'s Wedding. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
