import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Quote } from 'lucide-react';
import weddingData from '../config/weddingData.json';

export default function LoveStory() {
  const { title, description, image } = weddingData.story;

  return (
    <section id="story" className="py-24 px-4 bg-[#FAF7F2] relative overflow-hidden">
      {/* Decorative Gold Accent Lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-[#D4AF37] font-semibold text-xs tracking-[0.3em] uppercase mb-2">
            <Sparkles className="w-4 h-4" />
            <span>How We Began</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif text-[#1B3B2B] font-bold">
            {title || "Our Love Story"}
          </h2>
          <div className="w-20 h-0.5 bg-[#D4AF37] mx-auto mt-4" />
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          {/* Photo Frame Container */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:col-span-6 relative"
          >
            <div className="relative z-10 p-3 bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-[#D4AF37]/30">
              <div className="overflow-hidden rounded-xl aspect-[4/5] relative group">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#122B1E]/40 via-transparent to-transparent opacity-60" />
              </div>
            </div>
            {/* Background Offset Framing Box */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#D4AF37]/40 rounded-2xl -z-0 pointer-events-none" />
          </motion.div>

          {/* Narrative Text Box */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-6 flex flex-col justify-center"
          >
            <div className="bg-white/80 p-8 sm:p-10 rounded-2xl border border-[#D4AF37]/20 shadow-sm relative">
              <Quote className="w-10 h-10 text-[#D4AF37]/30 mb-4" />
              <p className="text-base sm:text-lg text-[#2B2B2B]/90 font-serif leading-relaxed italic mb-6">
                "{description}"
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-[#D4AF37]/20">
                <div className="w-10 h-10 rounded-full bg-[#1B3B2B] text-[#D4AF37] flex items-center justify-center font-serif text-lg font-bold">
                  {weddingData.couple.bride?.[0]}
                </div>
                <Heart className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                <div className="w-10 h-10 rounded-full bg-[#1B3B2B] text-[#D4AF37] flex items-center justify-center font-serif text-lg font-bold">
                  {weddingData.couple.groom?.[0]}
                </div>
                <div className="ml-auto text-xs uppercase tracking-widest text-[#1B3B2B] font-semibold">
                  Forever & Always
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
