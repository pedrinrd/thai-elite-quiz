/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Section 8 — Etapa dos 5 Bônus Exclusivos (Compact Mobile-First Interactive Carousel + Scroll Reveal)
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Gift } from 'lucide-react';
import { OFFER_CONFIG, formatMXN } from '../config/offer.ts';

interface InteractiveBonusesProps {
  onContinue: () => void;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function InteractiveBonuses({ onContinue }: InteractiveBonusesProps) {
  const bonuses = OFFER_CONFIG.bonuses;
  const [activeIndex, setActiveIndex] = useState(0);

  const currentBonus = bonuses[activeIndex] || bonuses[0];

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + bonuses.length) % bonuses.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % bonuses.length);
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between items-center text-center">
      <div className="w-full flex flex-col items-center">
        {/* Headline & Subheadline — Fade-in Up */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
          className="w-full flex flex-col items-center"
        >
          <h1 className="font-headline font-extrabold text-[28px] sm:text-4xl uppercase leading-[0.98] tracking-tight text-white mb-1.5">
            🎁 DESBLOQUEA 5 BONOS EXCLUSIVOS
          </h1>

          <p className="text-xs sm:text-sm text-[#B4B4BD] leading-snug max-w-md mb-3">
            Con THAI ELITE COMPLETO también puedes acceder a materiales adicionales para complementar tu aprendizaje.
          </p>
        </motion.div>

        {/* Quick 1-5 Selector Pills — Staggered Fade-in Up */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: 0.08, ease: EASE_OUT_EXPO }}
          className="grid grid-cols-5 gap-1.5 w-full max-w-md mb-3"
        >
          {bonuses.map((bonus, idx) => (
            <motion.button
              key={bonus.id}
              type="button"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.35,
                delay: 0.08 + idx * 0.05,
                ease: EASE_OUT_EXPO,
              }}
              onClick={() => setActiveIndex(idx)}
              className={`py-2 px-1 rounded-xl text-[11px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                idx === activeIndex
                  ? 'bg-[#E50914] text-white border border-white/25 shadow-[0_0_16px_rgba(229,9,20,0.45)]'
                  : 'bg-[#161618] text-[#A1A1AA] border border-white/10 hover:text-white'
              }`}
            >
              {bonus.badge}
            </motion.button>
          ))}
        </motion.div>

        {/* Clean, Minimalist Swipeable Bonus Card — Scroll Reveal + Smooth Card Transition */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.16, ease: EASE_OUT_EXPO }}
          className="relative w-full max-w-md mx-auto mb-3"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBonus.id}
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.985 }}
              transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
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
              className="w-full card-surface border border-[#D4AF37]/45 rounded-2xl overflow-hidden text-left select-none"
            >
              {/* Realistic Muay Thai Image */}
              <div className="relative w-full h-44 sm:h-48 bg-[#0c0c0c] overflow-hidden">
                <img
                  src={currentBonus.imageSrc}
                  alt={currentBonus.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-[#141416]/20 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#E50914] text-white text-xs font-extrabold uppercase tracking-wider shadow-lg border border-white/20">
                    <Gift className="w-3.5 h-3.5" />
                    {currentBonus.badge}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md border border-[#D4AF37]/50 text-[#D4AF37] text-[11px] font-extrabold uppercase">
                    ✓ {activeIndex + 1} DE {bonuses.length}
                  </span>
                </div>
              </div>

              {/* Minimalist Card Body: Title + Short Description + Easy Carousel Controls */}
              <div className="p-4">
                <h2 className="font-headline font-extrabold text-2xl sm:text-3xl text-white uppercase leading-tight mb-1">
                  {currentBonus.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#D4D4D8] leading-snug mb-3.5">
                  {currentBonus.description}
                </p>

                {/* Easy-Access Carousel Navigation Bar inside Card */}
                <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#202024] hover:bg-[#2a2a30] active:scale-[0.98] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-white/10 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 text-[#E50914]" />
                    <span>Bono anterior</span>
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#202024] hover:bg-[#2a2a30] active:scale-[0.98] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-white/10 transition-all cursor-pointer"
                  >
                    <span>Siguiente bono</span>
                    <ChevronRight className="w-4 h-4 text-[#E50914]" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Declared Bonus Value Box ($179 MXN) — Fade-in Up on Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.48, delay: 0.24, ease: EASE_OUT_EXPO }}
          className="w-full max-w-md bg-gradient-to-r from-[#161512] via-[#241E11] to-[#161512] border border-[#D4AF37]/55 rounded-2xl p-3.5 mb-3 text-center shadow-[0_8px_24px_rgba(212,175,55,0.12)]"
        >
          <p className="font-headline font-extrabold text-lg sm:text-xl text-[#D4AF37] uppercase tracking-wide leading-tight">
            🎁 VALOR DECLARADO DE LOS BONOS: {formatMXN(OFFER_CONFIG.prices.bonusTotalValue)}
          </p>
          <p className="text-[11px] font-bold text-white uppercase tracking-wider mt-0.5">
            INCLUIDOS SIN COSTO ADICIONAL EN THAI ELITE COMPLETO
          </p>
        </motion.div>
      </div>

      {/* Sticky Easy-Access Bottom CTA Button — Fade-in Up */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.3, ease: EASE_OUT_EXPO }}
        className="w-full max-w-md sticky bottom-0 z-20 bg-gradient-to-t from-[#090909] via-[#090909]/95 to-transparent pt-1.5 pb-2"
      >
        <button
          type="button"
          onClick={onContinue}
          className="w-full py-4 px-6 min-h-[56px] btn-crimson-primary active:scale-[0.99] text-white font-extrabold text-base sm:text-lg uppercase tracking-wider rounded-xl transition-all duration-150 cursor-pointer"
        >
          VER MI OFERTA ESPECIAL →
        </button>
      </motion.div>
    </div>
  );
}
