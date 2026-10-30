/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, ChevronRight } from 'lucide-react';
import { QuizQuestionConfig, QuizQuestionId } from '../config/quiz.ts';

interface QuizQuestionProps {
  question: QuizQuestionConfig;
  selectedOptionId?: 'A' | 'B' | 'C' | 'D';
  onSelect: (questionId: QuizQuestionId, optionId: 'A' | 'B' | 'C' | 'D') => void;
}

export function QuizQuestion({
  question,
  selectedOptionId,
  onSelect,
}: QuizQuestionProps) {
  const [activeSelection, setActiveSelection] = useState<
    'A' | 'B' | 'C' | 'D' | null
  >(null);

  useEffect(() => {
    setActiveSelection(null);
  }, [question.id]);

  const handleChoose = (optionId: 'A' | 'B' | 'C' | 'D') => {
    if (activeSelection) return;
    setActiveSelection(optionId);
    setTimeout(() => {
      onSelect(question.id, optionId);
    }, 210);
  };

  return (
    <motion.section
      key={question.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex-1 flex flex-col justify-between py-2"
    >
      <div className="my-auto w-full">
        {/* Step Counter Pill */}
        <div className="flex justify-center mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161618] border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#E50914]" />
            <span className="text-[11px] font-extrabold tracking-widest uppercase text-[#E4E4E7] tabular-nums">
              PREGUNTA {question.progressLabel}
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1
          className="font-headline font-extrabold text-[30px] sm:text-5xl text-white text-center leading-[0.97] tracking-tight mb-3"
          style={{ textWrap: 'balance' }}
        >
          {question.headline}
        </h1>

        {/* Optional Subheadline */}
        {question.subheadline && (
          <p className="text-xs sm:text-sm text-[#B4B4BD] text-center max-w-md mx-auto leading-relaxed mb-5">
            {question.subheadline}
          </p>
        )}

        {/* Selectable Option Cards with Dedicated Icon Box */}
        <div className={`space-y-3 ${question.subheadline ? '' : 'mt-5'}`}>
          {question.options.map((opt, idx) => {
            const isSelected =
              activeSelection === opt.id ||
              (!activeSelection && selectedOptionId === opt.id);

            const cleanText = opt.label.replace(opt.icon, '').trim();

            return (
              <motion.button
                key={opt.id}
                type="button"
                initial={{ opacity: 0, scale: 0.97, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  delay: idx * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => handleChoose(opt.id)}
                className={`w-full text-left p-3.5 sm:p-4 min-h-[66px] rounded-2xl border transition-all duration-150 flex items-center justify-between gap-3.5 cursor-pointer group ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#E50914]/25 via-[#E50914]/15 to-[#171717] border-[#E50914] text-white shadow-[0_8px_30px_rgba(229,9,20,0.28)] scale-[1.01]'
                    : 'card-surface border-white/10 hover:border-[#E50914]/60 text-white'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Dedicated Icon Box */}
                  <span
                    className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 border transition-all ${
                      isSelected
                        ? 'bg-[#E50914] border-white/30 shadow-[0_0_16px_rgba(229,9,20,0.6)]'
                        : 'bg-[#202024] border-white/10 group-hover:border-[#E50914]/40 group-hover:bg-[#E50914]/15'
                    }`}
                  >
                    {opt.icon}
                  </span>

                  <span className="text-[15px] sm:text-base font-bold leading-snug text-white">
                    {cleanText}
                  </span>
                </div>

                {/* Right Selection Indicator */}
                <span
                  className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                    isSelected
                      ? 'bg-[#E50914] border-white/40 text-white shadow-[0_0_12px_rgba(229,9,20,0.8)]'
                      : 'bg-[#121214] border-white/15 group-hover:border-[#E50914]'
                  }`}
                >
                  {isSelected ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#A1A1AA] group-hover:text-white" />
                  )}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Subtle Bottom Helper */}
      <p className="text-[11px] text-[#71717A] text-center pt-4 pb-1 font-medium">
        Toca una opción para continuar automáticamente
      </p>
    </motion.section>
  );
}
