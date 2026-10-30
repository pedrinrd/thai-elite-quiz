/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Section 10 — Garantia e Segurança + FAQ Compacto (Scroll Fade-in Up)
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { OFFER_CONFIG } from '../config/offer.ts';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function GuaranteeFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="w-full mt-5 space-y-4 text-left">
      {/* Compact Guarantee Block (Section 10) — Fade-in Up on Scroll */}
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.48, ease: EASE_OUT_EXPO }}
        className="w-full bg-gradient-to-r from-[#161512] via-[#1E1A11] to-[#161512] border border-[#D4AF37]/45 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-lg"
      >
        <div className="w-11 h-11 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/45 flex items-center justify-center text-xl shrink-0">
          🛡️
        </div>
        <div>
          <h3 className="font-headline font-extrabold text-lg sm:text-xl text-[#D4AF37] uppercase tracking-wide mb-1">
            🛡️ GARANTÍA DE {OFFER_CONFIG.guaranteeDays} DÍAS
          </h3>
          <p className="text-xs sm:text-sm text-[#D4D4D8] leading-relaxed">
            {OFFER_CONFIG.guaranteeText}
          </p>
        </div>
      </motion.div>

      {/* Compact FAQ Accordion — Fade-in Up on Scroll */}
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, delay: 0.06, ease: EASE_OUT_EXPO }}
        className="w-full card-surface border border-white/10 rounded-2xl p-4 sm:p-5"
      >
        <h3 className="font-headline font-extrabold text-lg sm:text-xl text-white uppercase tracking-wide mb-3 text-center">
          PREGUNTAS FRECUENTES
        </h3>
        <div className="divide-y divide-white/10">
          {OFFER_CONFIG.faq.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.36,
                  delay: idx * 0.04,
                  ease: EASE_OUT_EXPO,
                }}
                className="py-2.5 first:pt-0 last:pb-0"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  className="w-full flex items-center justify-between gap-3 text-left py-1.5 text-xs sm:text-sm font-bold text-white hover:text-[#FF3B44] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#A1A1AA] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#E50914]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="text-xs text-[#B4B4BD] leading-relaxed pt-1.5 pb-1">
                    {item.answer}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
