/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Dynamic Scroll-Coupled & Step-Aware Animated Progress Bar
 */

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface QuizProgressProps {
  minPercent: number;
  maxPercent: number;
  stageLabel?: string;
  stepLabel?: string;
}

export function QuizProgress({
  minPercent,
  maxPercent,
  stageLabel,
  stepLabel,
}: QuizProgressProps) {
  const [scrollRatio, setScrollRatio] = useState(0);

  useEffect(() => {
    const computeScrollRatio = () => {
      if (typeof window === 'undefined') return;
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop || 0;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      const winHeight = window.innerHeight || 1;
      const maxScrollable = docHeight - winHeight;

      if (maxScrollable <= 16) {
        setScrollRatio(0);
      } else {
        const ratio = Math.max(0, Math.min(1, scrollTop / maxScrollable));
        setScrollRatio(ratio);
      }
    };

    computeScrollRatio();
    window.addEventListener('scroll', computeScrollRatio, { passive: true });
    window.addEventListener('resize', computeScrollRatio, { passive: true });

    return () => {
      window.removeEventListener('scroll', computeScrollRatio);
      window.removeEventListener('resize', computeScrollRatio);
    };
  }, [minPercent, maxPercent]);

  const dynamicPercent = Math.round(
    minPercent + (maxPercent - minPercent) * scrollRatio
  );
  const clamped = Math.max(8, Math.min(100, dynamicPercent));

  return (
    <div className="w-full">
      {/* Top Edge Continuous Laser Progress Line */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] bg-white/[0.04] z-50 pointer-events-none overflow-hidden"
      >
        <motion.div
          initial={false}
          animate={{ width: `${clamped}%` }}
          transition={{ type: 'spring', stiffness: 140, damping: 24, mass: 0.6 }}
          className="h-full bg-gradient-to-r from-[#E50914] via-[#FF3B44] to-[#D4AF37] shadow-[0_0_10px_rgba(229,9,20,0.9)]"
        />
      </div>

      {/* Micro Stage + Live Percentage Row */}
      <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-widest mb-1 px-0.5">
        <span className="text-[#A1A1AA] flex items-center gap-1.5 truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-pulse shrink-0" />
          <span className="truncate">{stageLabel || 'Progreso'}</span>
        </span>
        <span className="text-[#D4AF37] tabular-nums font-mono">
          {stepLabel ? `${stepLabel} • ${clamped}%` : `${clamped}%`}
        </span>
      </div>

      {/* Main Dynamic Animated Progress Track */}
      <div
        className="relative w-full h-2.5 bg-[#151518] rounded-full overflow-hidden border border-white/10 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={stageLabel || stepLabel || 'Progreso del test'}
      >
        <motion.div
          initial={false}
          animate={{ width: `${clamped}%` }}
          transition={{
            type: 'spring',
            stiffness: 130,
            damping: 22,
            mass: 0.65,
          }}
          className="relative h-full bg-gradient-to-r from-[#9E050C] via-[#E50914] to-[#FF3842] rounded-full shadow-[0_0_16px_rgba(229,9,20,0.85)] overflow-hidden"
        >
          {/* Continuous Animated Shimmer Wave */}
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent animate-progress-shimmer pointer-events-none" />

          {/* Glowing Leading Tip */}
          <span className="absolute right-0 top-0 bottom-0 w-3.5 bg-gradient-to-l from-white/70 via-[#D4AF37]/50 to-transparent blur-[1px] rounded-full" />
        </motion.div>
      </div>
    </div>
  );
}
