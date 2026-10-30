/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Section 9 — Oferta Final Interativa (Esencial $100 MXN vs Completo $219 MXN + Scroll Fade-in Up)
 */

import { motion } from 'motion/react';
import { Check, Gift } from 'lucide-react';
import { OFFER_CONFIG, formatMXN } from '../config/offer.ts';
import { GuaranteeFAQ } from './GuaranteeFAQ.tsx';

interface OfferSelectionProps {
  recommendedPlan?: 'pro' | 'basic';
  onSelectBasic: () => void;
  onSelectPro: () => void;
}

const ESENCIAL_FEATURES = [
  'Biblioteca de entrenamientos en video.',
  'Técnicas y combinaciones.',
  'Acceso digital inmediato.',
  'Aprende a tu ritmo.',
  'Garantía de 7 días.',
];

const COMPLETO_FEATURES = [
  'Todo lo incluido en Esencial.',
  '20 combinaciones de ataque.',
  '50 entrenamientos físicos.',
  '50 técnicas de defensa y contraataque.',
  'Guía de fundamentos.',
  'Guía de recuperación muscular.',
  'Garantía de 7 días.',
];

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function OfferSelection({
  onSelectBasic,
  onSelectPro,
}: OfferSelectionProps) {
  return (
    <div className="w-full flex flex-col items-center text-center pb-4">
      {/* Offer Header — Smooth Fade-in Up */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.48, ease: EASE_OUT_EXPO }}
        className="w-full flex flex-col items-center"
      >
        <h1 className="font-headline font-extrabold text-[28px] sm:text-4xl uppercase leading-[0.98] tracking-tight text-white mb-1.5">
          🥊 ¡TU PRIMER PASO EN EL MUAY THAI COMIENZA AQUÍ!
        </h1>

        <p className="text-xs sm:text-sm text-[#B4B4BD] leading-snug max-w-md mb-4">
          Elige cómo quieres comenzar a conocer los fundamentos del Muay Thai.
        </p>
      </motion.div>

      {/* Two Plan Cards Stack (Completo VIP highlighted + Esencial) */}
      <div className="w-full space-y-4">
        {/* CARD 02 — THAI ELITE COMPLETO (Fade-in Up on Scroll) */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.52, delay: 0.08, ease: EASE_OUT_EXPO }}
          className="relative w-full card-surface border-2 border-[#E50914] rounded-2xl p-4 sm:p-5 text-left shadow-[0_16px_45px_rgba(229,9,20,0.22)] overflow-hidden"
        >
          {/* Subtle top right crimson glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-12 -right-12 w-36 h-36 bg-[#E50914]/20 rounded-full blur-2xl"
          />

          {/* Top Seal */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-gradient-to-r from-[#D4AF37] to-[#F3CF55] text-black text-[11px] font-extrabold uppercase tracking-wider mb-3 shadow-sm">
            <span>★ MÁS COMPLETO</span>
          </div>

          <div className="flex items-baseline justify-between gap-2 mb-3 pb-3 border-b border-white/10">
            <div>
              <h2 className="font-headline font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-wide leading-none">
                THAI ELITE COMPLETO
              </h2>
              <span className="text-xs text-[#A1A1AA] font-medium block mt-1">
                Pago único.
              </span>
            </div>
            <div className="text-right">
              <span className="font-headline font-extrabold text-3xl sm:text-4xl text-white tabular-nums leading-none">
                {formatMXN(OFFER_CONFIG.prices.pro)}
              </span>
            </div>
          </div>

          <ul className="space-y-2 mb-4">
            {COMPLETO_FEATURES.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.35,
                  delay: 0.12 + idx * 0.04,
                  ease: EASE_OUT_EXPO,
                }}
                className="flex items-center gap-2.5 text-xs sm:text-sm text-[#F4F4F5] font-medium"
              >
                <span className="w-4 h-4 rounded-full bg-[#E50914]/25 border border-[#E50914]/60 flex items-center justify-center text-[#FF3B44] shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>

          <button
            type="button"
            onClick={onSelectPro}
            className="w-full py-4 px-5 min-h-[54px] btn-crimson-primary active:scale-[0.99] text-white font-extrabold text-base sm:text-lg uppercase tracking-wider rounded-xl transition-all duration-150 cursor-pointer"
          >
            QUIERO EL COMPLETO →
          </button>
        </motion.div>

        {/* CARD 01 — THAI ELITE ESENCIAL (Fade-in Up on Scroll) */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.52, delay: 0.14, ease: EASE_OUT_EXPO }}
          className="w-full card-surface border border-white/15 rounded-2xl p-4 sm:p-5 text-left"
        >
          <div className="flex items-baseline justify-between gap-2 mb-3 pb-3 border-b border-white/10">
            <div>
              <h2 className="font-headline font-extrabold text-xl sm:text-2xl text-white uppercase tracking-wide leading-none">
                THAI ELITE ESENCIAL
              </h2>
              <span className="text-xs text-[#A1A1AA] font-medium block mt-1">
                Pago único.
              </span>
            </div>
            <div className="text-right">
              <span className="font-headline font-extrabold text-2xl sm:text-3xl text-white tabular-nums leading-none">
                {formatMXN(OFFER_CONFIG.prices.basic)}
              </span>
            </div>
          </div>

          <ul className="space-y-2 mb-4">
            {ESENCIAL_FEATURES.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.35,
                  delay: 0.08 + idx * 0.04,
                  ease: EASE_OUT_EXPO,
                }}
                className="flex items-center gap-2.5 text-xs sm:text-sm text-[#D4D4D8]"
              >
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>

          <button
            type="button"
            onClick={onSelectBasic}
            className="w-full py-3.5 px-5 min-h-[50px] bg-[#222226] hover:bg-[#2c2c32] active:scale-[0.99] text-white font-extrabold text-sm sm:text-base uppercase tracking-wider rounded-xl border border-white/15 transition-all duration-150 cursor-pointer"
          >
            ELEGIR ESENCIAL →
          </button>
        </motion.div>
      </div>

      {/* Scroll-Triggered Bonus Cards Summary Strip inside Offer Page */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        className="w-full mt-5 text-left"
      >
        <div className="flex items-center justify-between gap-2 mb-2.5 px-1">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
            <Gift className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
            <span>5 BONOS INCLUIDOS EN EL PLAN COMPLETO</span>
          </span>
          <span className="text-[11px] font-bold text-[#A1A1AA] whitespace-nowrap shrink-0">
            Valor: {formatMXN(OFFER_CONFIG.prices.bonusTotalValue)}
          </span>
        </div>

        <div className="space-y-2">
          {OFFER_CONFIG.bonuses.map((bonus, idx) => (
            <motion.div
              key={bonus.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.42,
                delay: idx * 0.06,
                ease: EASE_OUT_EXPO,
              }}
              className="w-full card-surface border border-white/10 rounded-xl p-2.5 flex items-center gap-3"
            >
              <img
                src={bonus.imageSrc}
                alt={bonus.title}
                className="w-12 h-12 rounded-lg object-cover shrink-0 border border-white/10"
                loading="lazy"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-[#E50914]/20 border border-[#E50914]/40 text-[#FF3B44] text-[10px] font-extrabold uppercase whitespace-nowrap shrink-0">
                    {bonus.badge}
                  </span>
                  <h4 className="font-headline font-extrabold text-sm sm:text-base text-white uppercase truncate">
                    {bonus.title}
                  </h4>
                </div>
                <p className="text-[11px] text-[#A1A1AA] truncate mt-0.5">
                  {bonus.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Section 10: Compact Guarantee + FAQ (with Scroll Fade-in Up) */}
      <GuaranteeFAQ />

      {/* Sticky Bottom Action Bar for Quick Plan Selection Anywhere on the Offer Page */}
      <div className="w-full sticky bottom-0 z-20 bg-[#090909]/95 backdrop-blur-md border-t border-white/10 pt-2.5 pb-2.5 mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={onSelectBasic}
          className="flex-1 py-3 px-2 rounded-xl bg-[#202024] hover:bg-[#2a2a30] active:scale-[0.99] text-white text-xs font-bold uppercase tracking-wide border border-white/15 cursor-pointer"
        >
          Esencial ({formatMXN(OFFER_CONFIG.prices.basic)})
        </button>
        <button
          type="button"
          onClick={onSelectPro}
          className="flex-[1.35] py-3 px-3 rounded-xl btn-crimson-primary active:scale-[0.99] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wide cursor-pointer"
        >
          Completo ({formatMXN(OFFER_CONFIG.prices.pro)}) →
        </button>
      </div>
    </div>
  );
}
