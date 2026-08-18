import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Sparkles,
  Church,
  GlassWater,
  PartyPopper,
  Shirt
} from 'lucide-react';
import defaultWeddingData from '../config/weddingData.json';

const iconMap = {
  Sparkles: Sparkles,
  Church: Church,
  GlassWater: GlassWater,
  PartyPopper: PartyPopper,
  Calendar: Calendar
};

export default function Timeline({ weddingData = defaultWeddingData }) {
  const data = weddingData || defaultWeddingData;
  const events = data.events || [];

  const generateGoogleCalendarUrl = (event) => {
    const title = encodeURIComponent(`${data.couple.bride} & ${data.couple.groom} - ${event.title}`);
    const details = encodeURIComponent(`Dress Code: ${event.dressCode}\nVenue: ${event.venue}\nAddress: ${event.address}`);
    const location = encodeURIComponent(`${event.venue}, ${event.address}`);
    const dateStr = event.date.replace(/-/g, '');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dateStr}T160000Z/${dateStr}T220000Z`;
  };

  return (
    <section id="events" className="py-24 px-4 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-dark)', color: 'var(--text-light)' }}>
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none" style={{ backgroundColor: 'var(--theme-glow)' }} />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-2" style={{ color: 'var(--accent)' }}>
            Wedding Itinerary
          </p>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold" style={{ color: 'var(--text-light)' }}>
            Celebration Schedule
          </h2>
          <div className="w-20 h-0.5 mx-auto mt-4" style={{ backgroundColor: 'var(--accent)' }} />
        </motion.div>

        {/* Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => {
            const IconComponent = iconMap[event.icon] || Calendar;

            return (
              <motion.div
                key={event.id || index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="border rounded-2xl p-6 sm:p-8 flex flex-col justify-between backdrop-blur-md shadow-xl hover:border-current transition-all duration-300 group"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-accent)' }}
              >
                <div>
                  {/* Top Icon Badge */}
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-dark)' }}>
                    <IconComponent className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-serif font-semibold mb-4 leading-tight" style={{ color: 'var(--text-light)' }}>
                    {event.title}
                  </h3>

                  {/* Event Details List */}
                  <div className="space-y-3 text-sm mb-6 opacity-90">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 shrink-0" style={{ color: 'var(--accent)' }} />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 shrink-0" style={{ color: 'var(--accent)' }} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 shrink-0 mt-1" style={{ color: 'var(--accent)' }} />
                      <div>
                        <div className="font-semibold" style={{ color: 'var(--text-light)' }}>{event.venue}</div>
                        <div className="text-xs opacity-70">{event.address}</div>
                      </div>
                    </div>
                    {event.dressCode && (
                      <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                        <Shirt className="w-4 h-4 shrink-0" style={{ color: 'var(--accent)' }} />
                        <span className="text-xs italic" style={{ color: 'var(--accent)' }}>
                          Dress Code: {event.dressCode}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-white/10 mt-4">
                  <a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors border cursor-pointer"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-dark)', borderColor: 'var(--accent)' }}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={() => window.open(generateGoogleCalendarUrl(event), '_blank')}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors border cursor-pointer"
                    style={{ backgroundColor: 'transparent', color: 'var(--accent)', borderColor: 'var(--border-accent)' }}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Add Calendar</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
