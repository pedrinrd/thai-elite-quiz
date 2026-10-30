/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import {
  QUIZ_MIDPOINT_TRANSITION,
  QUIZ_ANALYZING_CONTENT,
} from '../config/quiz.ts';

interface QuizTransitionProps {
  mode: 'midpoint' | 'analyzing';
  onComplete: () => void;
}

export function QuizTransition({ mode, onComplete }: QuizTransitionProps) {
  const [visibleChecks, setVisibleChecks] = useState(1);

  useEffect(() => {
    if (mode === 'midpoint') {
      const timer = setTimeout(() => {
        onComplete();
      }, QUIZ_MIDPOINT_TRANSITION.durationMs);
      return () => clearTimeout(timer);
    }

    const t1 = setTimeout(() => setVisibleChecks(2), 550);
    const t2 = setTimeout(() => setVisibleChecks(3), 1100);
    const t3 = setTimeout(() => {
      onComplete();
    }, QUIZ_ANALYZING_CONTENT.durationMs);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [mode, onComplete]);

  if (mode === 'midpoint') {
    return (
      <motion.section
        key="transition-midpoint"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        onClick={onComplete}
        className="w-full bg-[#171717] border border-[#262626] rounded-2xl p-8 sm:p-10 text-center shadow-2xl cursor-pointer"
      >
        <div className="w-14 h-14 rounded-full bg-[#E50914]/15 border border-[#E50914]/40 text-[#E50914] flex items-center justify-center mx-auto mb-4">
          <Check className="w-7 h-7 stroke-[3]" />
        </div>

        <h2 className="font-headline font-extrabold text-4xl sm:text-5xl text-white tracking-tight mb-3">
          {QUIZ_MIDPOINT_TRANSITION.headline}
        </h2>

        <p className="text-sm sm:text-base text-[#A1A1AA] max-w-sm mx-auto leading-relaxed">
          {QUIZ_MIDPOINT_TRANSITION.subheadline}
        </p>
      </motion.section>
    );
  }

  return (
    <motion.section
      key="transition-analyzing"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-[#171717] border border-[#262626] rounded-2xl p-7 sm:p-9 text-center shadow-2xl"
    >
      <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-4">
        {QUIZ_ANALYZING_CONTENT.headline}
      </h2>

      {/* Animated Progress Bar */}
      <div
        className="w-full h-2.5 bg-[#090909] rounded-full overflow-hidden border border-[#262626] mb-6"
        role="progressbar"
        aria-label="Analizando tus respuestas"
      >
        <motion.div
          initial={{ width: '15%' }}
          animate={{ width: '100%' }}
          transition={{
            duration: QUIZ_ANALYZING_CONTENT.durationMs / 1000,
            ease: 'easeInOut',
          }}
          className="h-full bg-[#E50914] rounded-full"
        />
      </div>

      {/* Checklist Messages */}
      <div className="space-y-3 text-left max-w-xs mx-auto">
        {QUIZ_ANALYZING_CONTENT.messages.map((msg, idx) => {
          const active = visibleChecks > idx;
          return (
            <motion.div
              key={msg}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: active ? 1 : 0.35, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`p-3 rounded-xl border text-xs sm:text-sm font-medium transition-colors ${
                active
                  ? 'bg-[#090909] border-[#E50914]/40 text-white'
                  : 'bg-[#090909]/40 border-[#262626] text-[#A1A1AA]'
              }`}
            >
              {msg}
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
