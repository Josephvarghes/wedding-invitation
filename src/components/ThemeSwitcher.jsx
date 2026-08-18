import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, ChevronDown, Check, Sparkles } from 'lucide-react';
import { THEMES } from '../utils/themeLoader';

export default function ThemeSwitcher({ activeTheme, onSelectTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  const currentTheme = THEMES[activeTheme] || THEMES['royal-gold'];

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
      {/* Main Floating Pill Button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#171717]/90 text-white border border-[#D4AF37]/60 shadow-[0_10px_25px_rgba(0,0,0,0.4)] backdrop-blur-md cursor-pointer transition-all text-xs sm:text-sm font-semibold tracking-wide"
      >
        <Palette className="w-4 h-4 text-[#D4AF37] animate-pulse" />
        <span className="text-[#D4AF37] hidden sm:inline">Theme Demo:</span>
        <span className="font-bold">{currentTheme.badge}</span>
        <ChevronDown className={`w-4 h-4 text-white/70 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      {/* Expanded Theme Selection Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 8, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-[#171717]/95 border border-[#D4AF37]/50 rounded-2xl p-3 shadow-2xl backdrop-blur-xl w-72 text-white overflow-hidden"
          >
            <div className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-extrabold px-3 py-1.5 border-b border-white/10 mb-2 flex items-center justify-between">
              <span>Select Design Vibe</span>
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            </div>

            <div className="space-y-1.5">
              {Object.values(THEMES).map((theme) => {
                const isSelected = activeTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      onSelectTheme(theme.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/60'
                        : 'hover:bg-white/10 text-white/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/40 shrink-0"
                        style={{ backgroundColor: theme.accentColor }}
                      />
                      <span className="text-left font-serif text-sm">{theme.name}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#D4AF37]" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 pt-2 border-t border-white/10 px-2 text-[10px] text-white/50 text-center font-sans">
              Pro Tip: Host on subdomains e.g. <code className="text-[#D4AF37]">pastel-floral.yourbrand.com</code>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
