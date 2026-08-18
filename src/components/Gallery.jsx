import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera, ZoomIn } from 'lucide-react';
import defaultWeddingData from '../config/weddingData.json';

export default function Gallery({ weddingData = defaultWeddingData }) {
  const data = weddingData || defaultWeddingData;
  const gallery = data.gallery || [];
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="py-24 px-4 relative" style={{ backgroundColor: 'var(--bg-light)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 font-semibold text-xs tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--accent)' }}>
            <Camera className="w-4 h-4" />
            <span>Captured Moments</span>
            <Camera className="w-4 h-4" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold" style={{ color: 'var(--text-dark)' }}>
            Photo Gallery
          </h2>
          <div className="w-20 h-0.5 mx-auto mt-4" style={{ backgroundColor: 'var(--accent)' }} />
        </motion.div>

        {/* Masonry / Grid Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => openLightbox(index)}
              className="relative overflow-hidden rounded-2xl shadow-md border group cursor-pointer aspect-[4/3]"
              style={{ borderColor: 'var(--border-accent)', backgroundColor: 'var(--bg-dark)' }}
            >
              <img
                src={item.url}
                alt={item.caption || `Gallery photo ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
              />
              {/* Dark Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="flex items-center justify-between text-white">
                  <span className="font-serif text-sm italic">{item.caption}</span>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-dark)' }}>
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 sm:left-8 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 sm:right-8 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full flex flex-col items-center"
            >
              <motion.img
                key={lightboxIndex}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={gallery[lightboxIndex]?.url}
                alt={gallery[lightboxIndex]?.caption}
                className="max-h-[80vh] max-w-full rounded-lg shadow-2xl object-contain border"
                style={{ borderColor: 'var(--accent)' }}
              />
              {gallery[lightboxIndex]?.caption && (
                <p className="mt-4 text-white/90 font-serif text-lg text-center tracking-wide">
                  {gallery[lightboxIndex]?.caption}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
