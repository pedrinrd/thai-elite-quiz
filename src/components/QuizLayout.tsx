/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from 'react';
import { QuizProgress } from './QuizProgress.tsx';
import { OFFER_CONFIG } from '../config/offer.ts';

interface QuizLayoutProps {
  children: ReactNode;
  progressPercent: number;
  maxProgressPercent?: number;
  stageLabel?: string;
  stepLabel?: string;
  showProgress?: boolean;
  wide?: boolean;
}

export function QuizLayout({
  children,
  progressPercent,
  maxProgressPercent,
  stageLabel,
  stepLabel,
  showProgress = true,
  wide = false,
}: QuizLayoutProps) {
  return (
    <div className="min-h-[100dvh] w-full max-w-full bg-[#090909] bg-athletic-grid text-white flex flex-col justify-between relative overflow-x-clip selection:bg-[#E50914] selection:text-white">
      {/* Top atmospheric crimson spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-[-80px] left-1/2 -translate-x-1/2 w-[520px] h-[260px] bg-[radial-gradient(ellipse_at_center,rgba(229,9,20,0.18)_0%,rgba(229,9,20,0.04)_55%,transparent_80%)] blur-2xl z-0"
      />

      {/* Sticky Glassmorphic Inlead Header with Logo & Dynamic Scroll-Coupled Progress Bar */}
      <header className="sticky top-0 w-full pt-2.5 sm:pt-3 pb-2 px-4 sm:px-6 z-30 bg-[#090909]/88 backdrop-blur-md border-b border-white/[0.07] shrink-0">
        <div className="max-w-xl mx-auto flex flex-col gap-1.5">
          {/* Centered Brand Mark */}
          <div className="flex items-center justify-center gap-2">
            <img
              src={OFFER_CONFIG.logoSrc}
              alt="Thai Elite"
              referrerPolicy="no-referrer"
              className="w-5 h-5 sm:w-6 sm:h-6 object-contain drop-shadow-[0_0_8px_rgba(229,9,20,0.5)]"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="font-headline font-extrabold text-xl sm:text-2xl tracking-wider uppercase text-white leading-none">
              THAI <span className="text-[#E50914]">ELITE</span>
            </span>
          </div>

          {showProgress && (
            <QuizProgress
              minPercent={progressPercent}
              maxPercent={maxProgressPercent ?? progressPercent}
              stageLabel={stageLabel}
              stepLabel={stepLabel}
            />
          )}
        </div>
      </header>

      {/* Main Funnel Stage */}
      <main
        className={`flex-1 flex flex-col justify-between sm:justify-center w-full ${
          wide ? 'max-w-3xl' : 'max-w-xl'
        } mx-auto px-4 sm:px-6 py-3 sm:py-5 z-10`}
      >
        {children}
      </main>
    </div>
  );
}
