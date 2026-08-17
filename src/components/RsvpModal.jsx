import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, XCircle, Users, MessageSquare, Heart, X } from 'lucide-react';
import weddingData from '../config/weddingData.json';

export default function RsvpModal({ isModalOpen, onCloseModal }) {
  const [formData, setFormData] = useState({
    name: '',
    attendance: 'attending', // 'attending' | 'declining'
    guests: '1',
    message: ''
  });

  const whatsappNumber = weddingData.rsvp?.whatsappNumber || '15551234567';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const statusText = formData.attendance === 'attending'
      ? '✨ Joyfully Accepts (Will Attend)'
      : '💔 Regretfully Declines';

    const textMessage = [
      `*WEDDING RSVP CONFIRMATION*`,
      `-----------------------------`,
      `*Couple:* ${weddingData.couple.bride} & ${weddingData.couple.groom}`,
      `*Guest Name:* ${formData.name}`,
      `*Status:* ${statusText}`,
      `*Number of Guests:* ${formData.guests}`,
      formData.message ? `*Message/Dietary Notes:* ${formData.message}` : '',
      `-----------------------------`,
      `Sent via Wedding Invitation App`
    ].filter(Boolean).join('\n');

    const encodedText = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');
    if (onCloseModal) onCloseModal();
  };

  const formContent = (
    <div className="bg-[#1B3B2B] border-2 border-[#D4AF37]/50 rounded-2xl p-6 sm:p-10 shadow-[0_25px_50px_rgba(0,0,0,0.5)] text-[#FAF7F2] max-w-xl mx-auto relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] mb-3">
          <Heart className="w-6 h-6 fill-[#D4AF37]/40" />
        </div>
        <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
          Kindly Respond By November 1st
        </p>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF7F2] mt-1">
          R.S.V.P
        </h2>
        <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-3" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-2">
            Your Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Eleanor Vance"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-[#122B1E] border border-[#D4AF37]/40 rounded-xl text-[#FAF7F2] placeholder-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
          />
        </div>

        {/* Attendance Selection */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-2">
            Will You Join Us? *
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, attendance: 'attending' })}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                formData.attendance === 'attending'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#122B1E] border-[#D4AF37] shadow-md'
                  : 'bg-[#122B1E] text-[#FAF7F2]/70 border-[#D4AF37]/30 hover:border-[#D4AF37]/60'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>Joyfully Accept</span>
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, attendance: 'declining' })}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                formData.attendance === 'declining'
                  ? 'bg-[#2B2B2B] text-rose-300 border-rose-400 shadow-md'
                  : 'bg-[#122B1E] text-[#FAF7F2]/70 border-[#D4AF37]/30 hover:border-[#D4AF37]/60'
              }`}
            >
              <XCircle className="w-4 h-4" />
              <span>Regretfully Decline</span>
            </button>
          </div>
        </div>

        {/* Guest Count */}
        {formData.attendance === 'attending' && (
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-2 flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Number of Guests Attending</span>
            </label>
            <select
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              className="w-full px-4 py-3 bg-[#122B1E] border border-[#D4AF37]/40 rounded-xl text-[#FAF7F2] focus:outline-none focus:border-[#D4AF37] transition-colors cursor-pointer"
            >
              <option value="1">1 Person (Just Me)</option>
              <option value="2">2 Persons (Me & Plus One)</option>
              <option value="3">3 Persons</option>
              <option value="4">4 Persons</option>
              <option value="5">5 Persons (Family)</option>
            </select>
          </div>
        )}

        {/* Message / Dietary Notes */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-2 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span>Warm Wishes / Dietary Restrictions</span>
          </label>
          <textarea
            rows="3"
            placeholder="Share a sweet blessing or inform us of dietary allergies..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 bg-[#122B1E] border border-[#D4AF37]/40 rounded-xl text-[#FAF7F2] placeholder-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#122B1E] font-bold text-sm tracking-wider uppercase rounded-xl shadow-[0_10px_25px_rgba(212,175,55,0.3)] hover:shadow-[0_15px_35px_rgba(212,175,55,0.5)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>Confirm & Send via WhatsApp</span>
        </button>
      </form>
    </div>
  );

  if (isModalOpen) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-xl my-8"
          >
            <button
              onClick={onCloseModal}
              className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            {formContent}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Render on-page section
  return (
    <section id="rsvp" className="py-24 px-4 bg-[#122B1E] relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {formContent}
      </div>
    </section>
  );
}
