import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, XCircle, Users, MessageSquare, Heart, X } from 'lucide-react';
import defaultWeddingData from '../config/weddingData.json';

export default function RsvpModal({ isModalOpen, onCloseModal, weddingData = defaultWeddingData }) {
  const data = weddingData || defaultWeddingData;
  const [formData, setFormData] = useState({
    name: '',
    attendance: 'attending',
    guests: '1',
    message: ''
  });

  const whatsappNumber = data.rsvp?.whatsappNumber || '15551234567';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const statusText = formData.attendance === 'attending'
      ? '✨ Joyfully Accepts (Will Attend)'
      : '💔 Regretfully Declines';

    const textMessage = [
      `*WEDDING RSVP CONFIRMATION*`,
      `-----------------------------`,
      `*Couple:* ${data.couple.bride} & ${data.couple.groom}`,
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
    <div
      className="border-2 rounded-2xl p-6 sm:p-10 shadow-2xl max-w-xl mx-auto relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-accent)', color: 'var(--text-light)' }}
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl pointer-events-none" style={{ backgroundColor: 'var(--theme-glow)' }} />

      {/* Header */}
      <div className="text-center mb-8">
        <div
          className="inline-flex items-center justify-center w-12 h-12 rounded-full border mb-3"
          style={{ backgroundColor: 'var(--bg-dark)', borderColor: 'var(--accent)', color: 'var(--accent)' }}
        >
          <Heart className="w-6 h-6 fill-current" />
        </div>
        <p className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: 'var(--accent)' }}>
          Kindly Respond By November 1st
        </p>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-1" style={{ color: 'var(--text-light)' }}>
          R.S.V.P
        </h2>
        <div className="w-16 h-0.5 mx-auto mt-3" style={{ backgroundColor: 'var(--accent)' }} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: 'var(--accent)' }}>
            Your Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Eleanor Vance"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border rounded-xl placeholder-white/30 focus:outline-none transition-colors"
            style={{ backgroundColor: 'var(--bg-dark)', borderColor: 'var(--border-accent)', color: 'var(--text-light)' }}
          />
        </div>

        {/* Attendance Selection */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: 'var(--accent)' }}>
            Will You Join Us? *
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, attendance: 'attending' })}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                formData.attendance === 'attending'
                  ? 'shadow-md font-bold'
                  : 'opacity-70 hover:opacity-100'
              }`}
              style={{
                backgroundColor: formData.attendance === 'attending' ? 'var(--accent)' : 'var(--bg-dark)',
                color: formData.attendance === 'attending' ? 'var(--bg-dark)' : 'var(--text-light)',
                borderColor: 'var(--accent)'
              }}
            >
              <CheckCircle className="w-4 h-4" />
              <span>Joyfully Accept</span>
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, attendance: 'declining' })}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                formData.attendance === 'declining'
                  ? 'bg-red-950 text-rose-300 border-rose-400 shadow-md'
                  : 'opacity-70 hover:opacity-100'
              }`}
              style={{
                backgroundColor: formData.attendance === 'declining' ? '#450a0a' : 'var(--bg-dark)',
                borderColor: formData.attendance === 'declining' ? '#f87171' : 'var(--border-accent)'
              }}
            >
              <XCircle className="w-4 h-4" />
              <span>Regretfully Decline</span>
            </button>
          </div>
        </div>

        {/* Guest Count */}
        {formData.attendance === 'attending' && (
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--accent)' }}>
              <Users className="w-4 h-4" />
              <span>Number of Guests Attending</span>
            </label>
            <select
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none transition-colors cursor-pointer"
              style={{ backgroundColor: 'var(--bg-dark)', borderColor: 'var(--border-accent)', color: 'var(--text-light)' }}
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
          <label className="block text-xs uppercase tracking-wider font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--accent)' }}>
            <MessageSquare className="w-4 h-4" />
            <span>Warm Wishes / Dietary Restrictions</span>
          </label>
          <textarea
            rows="3"
            placeholder="Share a sweet blessing or inform us of dietary allergies..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 border rounded-xl placeholder-white/30 focus:outline-none transition-colors resize-none"
            style={{ backgroundColor: 'var(--bg-dark)', borderColor: 'var(--border-accent)', color: 'var(--text-light)' }}
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          className="w-full py-4 font-bold text-sm tracking-wider uppercase rounded-xl shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-dark)' }}
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

  return (
    <section id="rsvp" className="py-24 px-4 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-dark)' }}>
      <div className="max-w-4xl mx-auto">
        {formContent}
      </div>
    </section>
  );
}
