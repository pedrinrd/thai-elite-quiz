/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Section 6 — Vitrine Interativa de Treinos (9:16 Reels Carousel)
 */

import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { OFFER_CONFIG } from '../config/offer.ts';

interface WorkoutsCarouselProps {
  onContinue: () => void;
}

const SHORT_PILL_LABELS = [
  'VIDEO 01',
  'VIDEO 02',
  'VIDEO 03',
  'VIDEO 04',
  'VIDEO 05',
];

export function WorkoutsCarousel({ onContinue }: WorkoutsCarouselProps) {
  const clips = OFFER_CONFIG.drillClips;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const activeClip = clips[activeIndex] || clips[0];

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = isMuted;
    vid.currentTime = 0;
    if (!isPaused) {
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          vid.muted = true;
          setIsMuted(true);
          vid.play().catch(() => {});
        });
      }
    }
  }, [activeIndex]);

  const handleToggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    const nextMuted = !isMuted;
    vid.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && vid.paused) {
      vid.play().catch(() => {});
      setIsPaused(false);
    }
  };

  const handleTogglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().catch(() => {});
      setIsPaused(false);
    } else {
      vid.pause();
      setIsPaused(true);
    }
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + clips.length) % clips.length);
    setIsPaused(false);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % clips.length);
    setIsPaused(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex-1 flex flex-col justify-between items-center text-center"
    >
      <div className="w-full flex flex-col items-center">
        {/* Headline */}
        <h1 className="font-headline font-extrabold text-[28px] sm:text-4xl uppercase leading-[0.98] tracking-tight text-white mb-1.5">
          MIRA LO QUE PUEDES APRENDER
        </h1>

        <p className="text-xs sm:text-sm text-[#B4B4BD] max-w-md mb-2.5">
          Explora demostraciones reales en video 9:16 incluidas en la biblioteca.
        </p>

        {/* Single-Row Selector Tabs (1-5) */}
        <div className="grid grid-cols-5 gap-1 w-full max-w-md mb-2.5">
          {clips.map((clip, idx) => (
            <button
              key={clip.id}
              type="button"
              onClick={() => {
                setActiveIndex(idx);
                setIsPaused(false);
              }}
              className={`py-1.5 px-1 rounded-lg text-[10px] sm:text-[11px] font-extrabold uppercase tracking-tight transition-all cursor-pointer truncate ${
                idx === activeIndex
                  ? 'bg-[#E50914] text-white border border-[#E50914] shadow-[0_0_14px_rgba(229,9,20,0.4)]'
                  : 'bg-[#161618] text-[#A1A1AA] border border-white/10 hover:text-white'
              }`}
            >
              {SHORT_PILL_LABELS[idx] || clip.numberLabel}
            </button>
          ))}
        </div>

        {/* Swipeable 9:16 Vertical Video Card */}
        <div className="relative w-full max-w-[275px] sm:max-w-[300px] mx-auto mb-3">
          <motion.div
            key={activeClip.id}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_e, info) => {
              if (info.offset.x < -40) {
                goNext();
              } else if (info.offset.x > 40) {
                goPrev();
              }
            }}
            className="relative aspect-[9/16] max-h-[380px] sm:max-h-[420px] w-full mx-auto rounded-2xl overflow-hidden bg-[#121214] ring-1 ring-white/15 shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(229,9,20,0.15)] touch-pan-y select-none"
          >
            <video
              ref={videoRef}
              src={activeClip.videoSrc}
              className="w-full h-full object-cover"
              playsInline
              muted={isMuted}
              loop
              autoPlay
              preload="metadata"
              onClick={handleTogglePlay}
            />

            {/* Top Overlay: Technique Tag & Counter */}
            <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-2 pointer-events-none">
              <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-[#E50914]/50 text-[10px] font-extrabold uppercase tracking-wider text-white">
                {activeClip.category}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-black/80 text-[11px] font-extrabold text-[#D4AF37] border border-[#D4AF37]/40 tabular-nums">
                {activeIndex + 1}/{clips.length}
              </span>
            </div>

            {/* Bottom Gradient & Technique Info + Controls */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent p-3.5 pt-10 text-left">
              <div className="flex items-end justify-between gap-2">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF3B44] block mb-0.5">
                    {activeClip.numberLabel}
                  </span>
                  <h2 className="font-headline font-extrabold text-lg sm:text-xl text-white uppercase leading-tight">
                    {activeClip.title}
                  </h2>
                  <p className="text-[11px] text-[#D4D4D8] line-clamp-2 mt-0.5 leading-snug">
                    {activeClip.subtitle}
                  </p>
                </div>

                {/* Sound & Pause Controls */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={handleToggleMute}
                    className="p-2 rounded-xl bg-black/85 hover:bg-[#E50914] text-white border border-white/20 transition-colors cursor-pointer"
                    aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-[#FF3B44]" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-emerald-400" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleTogglePlay}
                    className="p-2 rounded-xl bg-black/85 hover:bg-[#E50914] text-white border border-white/20 transition-colors cursor-pointer"
                    aria-label={isPaused ? 'Reproducir' : 'Pausar'}
                  >
                    {isPaused ? (
                      <Play className="w-4 h-4 fill-current" />
                    ) : (
                      <Pause className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Left / Right Navigation Buttons */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Entrenamiento anterior"
            className="absolute left-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/85 hover:bg-[#E50914] text-white border border-white/20 flex items-center justify-center shadow-lg transition-colors cursor-pointer z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Siguiente entrenamiento"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/85 hover:bg-[#E50914] text-white border border-white/20 flex items-center justify-center shadow-lg transition-colors cursor-pointer z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sticky Bottom CTA Button */}
      <div className="w-full max-w-md sticky bottom-0 z-20 bg-gradient-to-t from-[#090909] via-[#090909]/95 to-transparent pt-1.5 pb-2">
        <button
          type="button"
          onClick={onContinue}
          className="w-full py-4 px-6 min-h-[56px] btn-crimson-primary active:scale-[0.99] text-white font-extrabold text-base sm:text-lg uppercase tracking-wider rounded-xl transition-all duration-150 cursor-pointer"
        >
          CONTINUAR →
        </button>
      </div>
    </motion.div>
  );
}
