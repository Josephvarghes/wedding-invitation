import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Disc, Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import weddingData from '../config/weddingData.json';

export default function AudioPlayer({ isPlaying, setIsPlaying }) {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);

  const audioUrl = weddingData.audio?.backgroundMusicUrl;
  const audioTitle = weddingData.audio?.title || "Background Music";

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.warn("Audio play prevented or deferred:", err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, setIsPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setHasError(false);
      }).catch(err => {
        console.error("Audio error:", err);
        setHasError(true);
      });
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Hidden Audio Tag */}
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        preload="auto"
        onError={() => setHasError(true)}
      />

      {/* Floating Vinyl Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="relative group flex items-center bg-[#1B3B2B]/95 text-[#FAF7F2] p-2 pr-4 rounded-full border border-[#D4AF37]/50 shadow-[0_10px_25px_rgba(0,0,0,0.3)] backdrop-blur-md"
      >
        <button
          onClick={togglePlay}
          aria-label="Toggle Background Music"
          className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] text-[#1B3B2B] shadow-md focus:outline-none cursor-pointer"
        >
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="flex items-center justify-center"
          >
            <Disc className="w-6 h-6" />
          </motion.div>
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
              <Play className="w-4 h-4 text-white fill-white ml-0.5" />
            </div>
          )}
        </button>

        {/* Music Title Info */}
        <div className="ml-3 hidden sm:flex flex-col text-left pr-1 max-w-[130px]">
          <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-1">
            <Music className="w-3 h-3 animate-pulse" />
            {isPlaying ? 'Now Playing' : 'Music Paused'}
          </span>
          <span className="text-xs font-serif truncate text-[#FAF7F2]/90">
            {audioTitle}
          </span>
        </div>

        {/* Mute Toggle Icon */}
        <button
          onClick={toggleMute}
          className="ml-2 text-[#D4AF37]/80 hover:text-[#D4AF37] p-1 transition-colors cursor-pointer"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </motion.div>
    </div>
  );
}
