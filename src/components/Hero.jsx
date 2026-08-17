import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, ChevronDown, Sparkles } from 'lucide-react';
import weddingData from '../config/weddingData.json';

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const targetDateStr = weddingData.couple.date;
  const targetDate = new Date(targetDateStr).getTime();

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const formattedWeddingDate = new Date(targetDateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 pb-24 px-4 overflow-hidden bg-[#122B1E]">
      {/* Hero Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={weddingData.couple.heroImage}
          alt={`${weddingData.couple.bride} & ${weddingData.couple.groom}`}
          className="w-full h-full object-cover object-center opacity-35 scale-105 filter brightness-90 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#122B1E] via-[#122B1E]/70 to-[#122B1E]/80" />
      </div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-[#D4AF37] bg-[#1B3B2B]/80 backdrop-blur-md mb-8 shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
            WE ARE GETTING MARRIED
          </span>
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
        </motion.div>

        {/* Couple Names - High Contrast & Large Serif */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif text-[#FAF7F2] font-bold tracking-tight mb-2 drop-shadow-xl">
            {weddingData.couple.bride}
          </h1>
          <div className="flex items-center justify-center gap-4 my-3">
            <span className="h-[2px] w-20 sm:w-32 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="font-serif italic text-3xl sm:text-5xl text-[#D4AF37] font-bold">&</span>
            <span className="h-[2px] w-20 sm:w-32 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif text-[#FAF7F2] font-bold tracking-tight mb-8 drop-shadow-xl">
            {weddingData.couple.groom}
          </h1>
        </motion.div>

        {/* Date Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="inline-flex items-center justify-center gap-3 text-lg sm:text-2xl font-serif text-[#D4AF37] mb-12 tracking-widest uppercase bg-[#1B3B2B]/70 px-8 py-3 rounded-full border border-[#D4AF37]/50 shadow-md backdrop-blur-md"
        >
          <Calendar className="w-6 h-6 text-[#D4AF37]" />
          <span className="font-semibold">{formattedWeddingDate}</span>
        </motion.div>

        {/* High-Contrast Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-4 gap-3 sm:gap-6 max-w-xl mx-auto mb-12"
        >
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#1B3B2B] border-2 border-[#D4AF37]/60 rounded-2xl p-4 sm:p-5 text-center backdrop-blur-md shadow-xl"
            >
              <div className="text-3xl sm:text-5xl font-serif font-bold text-[#FAF7F2]">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-xs sm:text-sm uppercase tracking-widest text-[#D4AF37] font-bold mt-2">
                {item.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Large Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#rsvp"
            className="px-10 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#122B1E] font-bold text-base uppercase tracking-wider rounded-full shadow-[0_12px_30px_rgba(212,175,55,0.4)] hover:shadow-[0_18px_40px_rgba(212,175,55,0.6)] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            RSVP Now
          </a>
          <a
            href="#events"
            className="px-10 py-4 bg-[#1B3B2B] border-2 border-[#D4AF37] text-[#FAF7F2] hover:bg-[#D4AF37]/20 font-bold text-base uppercase tracking-wider rounded-full transition-all duration-300 shadow-md"
          >
            View Schedule
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-16 inline-flex flex-col items-center gap-2 text-[#D4AF37] text-xs sm:text-sm font-semibold tracking-widest uppercase"
        >
          <span>Scroll to explore</span>
          <ChevronDown className="w-5 h-5 text-[#D4AF37]" />
        </motion.div>
      </div>
    </section>
  );
}
