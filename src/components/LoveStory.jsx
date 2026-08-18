import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Quote } from 'lucide-react';
import defaultWeddingData from '../config/weddingData.json';

export default function LoveStory({ weddingData = defaultWeddingData }) {
  const data = weddingData || defaultWeddingData;
  const { title, description, image } = data.story;

  return (
    <section id="story" className="py-24 px-4 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-light)' }}>
      {/* Decorative Gold Accent Lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-40" style={{ color: 'var(--accent)' }} />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 font-semibold text-xs tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--accent)' }}>
            <Sparkles className="w-4 h-4" />
            <span>How We Began</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold" style={{ color: 'var(--text-dark)' }}>
            {title || "Our Love Story"}
          </h2>
          <div className="w-20 h-0.5 mx-auto mt-4" style={{ backgroundColor: 'var(--accent)' }} />
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
            <div className="relative z-10 p-3 rounded-2xl shadow-lg border" style={{ backgroundColor: 'var(--bg-light)', borderColor: 'var(--border-accent)' }}>
              <div className="overflow-hidden rounded-xl aspect-[4/5] relative group">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
              </div>
            </div>
            {/* Background Offset Framing Box */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 rounded-2xl -z-0 pointer-events-none" style={{ borderColor: 'var(--accent)' }} />
          </motion.div>

          {/* Narrative Text Box */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-6 flex flex-col justify-center"
          >
            <div className="p-8 sm:p-10 rounded-2xl border shadow-sm relative glass-card">
              <Quote className="w-10 h-10 mb-4 opacity-40" style={{ color: 'var(--accent)' }} />
              <p className="text-base sm:text-lg font-serif leading-relaxed italic mb-6" style={{ color: 'var(--text-dark)' }}>
                "{description}"
              </p>

              <div className="flex items-center gap-4 pt-4 border-t" style={{ borderColor: 'var(--border-accent)' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg font-bold" style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--accent)' }}>
                  {data.couple.bride?.[0]}
                </div>
                <Heart className="w-4 h-4 fill-current" style={{ color: 'var(--accent)' }} />
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg font-bold" style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--accent)' }}>
                  {data.couple.groom?.[0]}
                </div>
                <div className="ml-auto text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--text-dark)' }}>
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
