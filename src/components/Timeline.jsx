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
import weddingData from '../config/weddingData.json';

const iconMap = {
  Sparkles: Sparkles,
  Church: Church,
  GlassWater: GlassWater,
  PartyPopper: PartyPopper,
  Calendar: Calendar
};

export default function Timeline() {
  const events = weddingData.events || [];

  // Helper to generate Google Calendar link
  const generateGoogleCalendarUrl = (event) => {
    const title = encodeURIComponent(`${weddingData.couple.bride} & ${weddingData.couple.groom} - ${event.title}`);
    const details = encodeURIComponent(`Dress Code: ${event.dressCode}\nVenue: ${event.venue}\nAddress: ${event.address}`);
    const location = encodeURIComponent(`${event.venue}, ${event.address}`);
    
    // Parse date & time string roughly for calendar ISO
    const dateStr = event.date.replace(/-/g, '');
    const startTime = '160000Z'; // fallback default
    const endTime = '220000Z';

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dateStr}T${startTime}/${dateStr}T${endTime}`;
  };

  // Helper to trigger .ics file download for Apple / Outlook calendar
  const downloadIcs = (event) => {
    const title = `${weddingData.couple.bride} & ${weddingData.couple.groom} - ${event.title}`;
    const description = `Dress Code: ${event.dressCode}\\nVenue: ${event.venue}\\nAddress: ${event.address}`;
    const location = `${event.venue}, ${event.address}`;
    const dateFormatted = event.date.replace(/-/g, '');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Luxury Wedding Invitation//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      `DTSTART:${dateFormatted}T160000Z`,
      `DTEND:${dateFormatted}T220000Z`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.title.toLowerCase().replace(/\s+/g, '-')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="events" className="py-24 px-4 bg-[#122B1E] text-[#FAF7F2] relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-2">
            Wedding Itinerary
          </p>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#FAF7F2]">
            Celebration Schedule
          </h2>
          <div className="w-20 h-0.5 bg-[#D4AF37] mx-auto mt-4" />
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
                className="bg-[#1B3B2B]/90 border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between backdrop-blur-md shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:border-[#D4AF37] transition-all duration-300 group"
              >
                <div>
                  {/* Top Icon Badge */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] text-[#122B1E] flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-serif text-[#FAF7F2] font-semibold mb-4 leading-tight">
                    {event.title}
                  </h3>

                  {/* Event Details List */}
                  <div className="space-y-3 text-sm text-[#FAF7F2]/80 mb-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                      <div>
                        <div className="font-semibold text-[#FAF7F2]">{event.venue}</div>
                        <div className="text-xs text-[#FAF7F2]/60">{event.address}</div>
                      </div>
                    </div>
                    {event.dressCode && (
                      <div className="flex items-center gap-3 pt-2 border-t border-[#D4AF37]/20">
                        <Shirt className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span className="text-xs italic text-[#D4AF37]">
                          Dress Code: {event.dressCode}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions: Map & Calendar */}
                <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-[#D4AF37]/30 mt-4">
                  <a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#D4AF37]/20 hover:bg-[#D4AF37] text-[#FAF7F2] hover:text-[#122B1E] text-xs font-semibold rounded-lg transition-colors border border-[#D4AF37]/40 cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={() => window.open(generateGoogleCalendarUrl(event), '_blank')}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-transparent hover:bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold rounded-lg transition-colors border border-[#D4AF37]/40 cursor-pointer"
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
