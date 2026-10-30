/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { QUIZ_INTRO_CONTENT } from '../config/quiz.ts';
import { OFFER_CONFIG } from '../config/offer.ts';

interface QuizIntroProps {
  onStart: () => void;
}

export function QuizIntro({ onStart }: QuizIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    vid
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        setIsPlaying(false);
      });
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().catch(() => {});
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
    if (vid.paused) {
      vid.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex-1 flex flex-col justify-between items-center text-center"
    >
      <div className="w-full flex flex-col items-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E50914]/15 border border-[#E50914]/40 text-[#FF3B44] text-[11px] font-extrabold tracking-widest uppercase mb-2 shadow-[0_0_20px_rgba(229,9,20,0.2)]">
          <span>{QUIZ_INTRO_CONTENT.topSeal}</span>
        </div>

        {/* Headline */}
        <h1
          className="font-headline font-extrabold text-[30px] sm:text-5xl text-white leading-[0.95] tracking-tight mb-2 drop-shadow-sm"
          style={{ textWrap: 'balance' }}
        >
          {QUIZ_INTRO_CONTENT.headline}
        </h1>

        {/* Subheadline */}
        <p className="text-xs sm:text-base text-[#B4B4BD] max-w-md leading-snug mb-3">
          {QUIZ_INTRO_CONTENT.subheadline}
        </p>

        {/* Cinema 9:16 Vertical VSL Frame */}
        <div
          onClick={toggleMute}
          className="relative w-full max-w-[228px] sm:max-w-[260px] aspect-[9/16] rounded-2xl overflow-hidden bg-[#121214] ring-1 ring-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_32px_rgba(229,9,20,0.18)] mb-3 cursor-pointer group"
        >
          <video
            ref={videoRef}
            src={OFFER_CONFIG.vslVideoSrc}
            className="w-full h-full object-cover bg-black"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            aria-label="Demostración real de Muay Thai"
          />

          {/* Top Left Live Tag */}
          <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/15 flex items-center gap-1.5 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse" />
            <span className="text-[10px] font-extrabold tracking-wider uppercase text-white">
              MUAY THAI EN CASA
            </span>
          </div>

          {/* Top Right Control Buttons */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
            <button
              type="button"
              onClick={toggleMute}
              className="w-8 h-8 rounded-full bg-black/75 hover:bg-[#E50914] border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
              aria-label={isMuted ? 'Activar sonido del video' : 'Silenciar video'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-[#FF3B44]" />
              ) : (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              )}
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-black/75 hover:bg-[#E50914] border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
              aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 fill-white translate-x-0.5" />
              )}
            </button>
          </div>

          {/* Unmute Prompt Overlay at Bottom */}
          {isMuted && (
            <div className="absolute bottom-2.5 inset-x-2.5 py-1.5 px-3 rounded-xl bg-black/85 backdrop-blur-md border border-white/20 flex items-center justify-center gap-1.5 text-[11px] font-bold text-white shadow-lg">
              <Volume2 className="w-3.5 h-3.5 text-[#E50914]" />
              <span>Toca para escuchar con audio</span>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Easy-Access Primary CTA Button */}
      <div className="w-full max-w-md sticky bottom-0 z-20 bg-gradient-to-t from-[#090909] via-[#090909]/95 to-transparent pt-1.5 pb-2">
        <button
          type="button"
          onClick={onStart}
          className="w-full py-4 px-5 min-h-[56px] btn-crimson-primary active:scale-[0.99] text-white font-extrabold text-sm sm:text-base tracking-wider uppercase rounded-xl transition-all duration-150 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E50914]"
        >
          {QUIZ_INTRO_CONTENT.ctaButton}
        </button>

        {/* Microcopy */}
        <p className="text-xs text-[#A1A1AA] mt-2 font-semibold tracking-wide">
          {QUIZ_INTRO_CONTENT.trustBadges}
        </p>
      </div>
    </motion.section>
  );
}
