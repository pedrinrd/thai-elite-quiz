/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { QuizAnswers, buildPersonalizedDiagnosis } from '../config/quiz.ts';

interface QuizResultProps {
  answers: QuizAnswers;
  onContinue: () => void;
}

export function QuizResult({ answers, onContinue }: QuizResultProps) {
  const diagnosis = buildPersonalizedDiagnosis(answers);

  return (
    <motion.section
      key="quiz-result"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex-1 flex flex-col justify-between items-center text-center"
    >
      <div className="w-full flex flex-col items-center">
        {/* Top Seal */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E50914]/15 border border-[#E50914]/40 text-[#FF3B44] text-[11px] font-extrabold tracking-widest uppercase mb-2">
          <span>{diagnosis.seal}</span>
        </div>

        {/* Headline */}
        <h1
          className="font-headline font-extrabold text-[28px] sm:text-5xl text-white leading-[0.95] tracking-tight mb-2"
          style={{ textWrap: 'balance' }}
        >
          {diagnosis.headline}
        </h1>

        {/* Subheadline */}
        <p className="text-xs sm:text-base text-[#B4B4BD] max-w-md leading-snug mb-3.5">
          {diagnosis.subheadline}
        </p>

        {/* Dossier Card: TU PERFIL (2x2 Bento Grid + Personalized Callout) */}
        <div className="w-full card-surface border border-white/15 rounded-2xl overflow-hidden text-left shadow-2xl mb-4">
          {/* Card Header Bar */}
          <div className="px-4 py-3 bg-gradient-to-r from-[#1E1E24] via-[#18181C] to-[#1E1E24] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-5 rounded-full bg-[#E50914]" />
              <h2 className="font-headline font-extrabold text-xl sm:text-2xl text-white tracking-wider uppercase">
                {diagnosis.profileTitle}
              </h2>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider">
              ✓ Personalizado
            </span>
          </div>

          <div className="p-4 sm:p-5">
            {/* 2x2 Bento Metrics Grid */}
            <div className="grid grid-cols-2 gap-2.5 mb-3.5">
              <div className="bg-[#0E0E11] border border-white/[0.08] rounded-xl p-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E50914] block mb-0.5">
                  ✓ Nivel
                </span>
                <span className="text-xs sm:text-sm font-bold text-white leading-snug block">
                  {diagnosis.nivel}
                </span>
              </div>

              <div className="bg-[#0E0E11] border border-white/[0.08] rounded-xl p-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E50914] block mb-0.5">
                  ✓ Disponibilidad
                </span>
                <span className="text-xs sm:text-sm font-bold text-white leading-snug block">
                  {diagnosis.disponibilidad}
                </span>
              </div>

              <div className="bg-[#0E0E11] border border-white/[0.08] rounded-xl p-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37] block mb-0.5">
                  ✓ Objetivo
                </span>
                <span className="text-xs sm:text-sm font-bold text-white leading-snug block">
                  {diagnosis.objetivo}
                </span>
              </div>

              <div className="bg-[#0E0E11] border border-white/[0.08] rounded-xl p-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37] block mb-0.5">
                  ✓ Interés principal
                </span>
                <span className="text-xs sm:text-sm font-bold text-white leading-snug block">
                  {diagnosis.interesPrincipal}
                </span>
              </div>
            </div>

            {/* Personalized Summary Callout */}
            <div className="bg-[#0E0E11]/90 border-l-2 border-[#E50914] rounded-r-xl p-3">
              <p className="text-xs sm:text-sm text-[#D4D4D8] leading-relaxed">
                {diagnosis.personalizedMessage}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Easy-Access CTA Button */}
      <div className="w-full sticky bottom-0 z-20 bg-gradient-to-t from-[#090909] via-[#090909]/95 to-transparent pt-1.5 pb-2">
        <button
          type="button"
          onClick={onContinue}
          className="w-full py-4 px-6 min-h-[56px] btn-crimson-primary active:scale-[0.99] text-white font-extrabold text-sm sm:text-base tracking-wider uppercase rounded-xl transition-all duration-150 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E50914]"
        >
          {diagnosis.ctaLabel}
        </button>
      </div>
    </motion.section>
  );
}
