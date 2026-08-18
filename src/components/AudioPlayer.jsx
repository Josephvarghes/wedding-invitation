import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Disc, Music, Volume2, VolumeX, Play } from 'lucide-react';
import defaultWeddingData from '../config/weddingData.json';

export default function AudioPlayer({ isPlaying, setIsPlaying, weddingData = defaultWeddingData }) {
  const data = weddingData || defaultWeddingData;
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);

  const audioUrl = data.audio?.backgroundMusicUrl;
  const audioTitle = data.audio?.title || "Background Music";

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
  }, [isPlaying, setIsPlaying, audioUrl]);

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
        className="relative group flex items-center p-2 pr-4 rounded-full border shadow-2xl backdrop-blur-md"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-accent)', color: 'var(--text-light)' }}
      >
        <button
          onClick={togglePlay}
          aria-label="Toggle Background Music"
          className="relative flex items-center justify-center w-11 h-11 rounded-full shadow-md focus:outline-none cursor-pointer"
          style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-dark)' }}
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
          <span className="text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1" style={{ color: 'var(--accent)' }}>
            <Music className="w-3 h-3 animate-pulse" />
            {isPlaying ? 'Now Playing' : 'Music Paused'}
          </span>
          <span className="text-xs font-serif truncate opacity-90">
            {audioTitle}
          </span>
        </div>

        {/* Mute Toggle Icon */}
        <button
          onClick={toggleMute}
          className="ml-2 opacity-80 hover:opacity-100 p-1 transition-opacity cursor-pointer"
          style={{ color: 'var(--accent)' }}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </motion.div>
    </div>
  );
}
