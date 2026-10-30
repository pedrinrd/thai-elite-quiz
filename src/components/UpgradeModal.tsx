/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ArrowRight, Gift } from 'lucide-react';
import {
  OFFER_CONFIG,
  calculateUpgradeSavings,
  calculateUpgradeDelta,
  formatMXN,
} from '../config/offer.ts';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmUpgrade: () => void;
  onDeclineToBasic: () => void;
}

export function UpgradeModal({
  isOpen,
  onClose,
  onConfirmUpgrade,
  onDeclineToBasic,
}: UpgradeModalProps) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const savings = calculateUpgradeSavings(
    OFFER_CONFIG.prices.pro,
    OFFER_CONFIG.prices.upgrade
  );
  const delta = calculateUpgradeDelta(
    OFFER_CONFIG.prices.upgrade,
    OFFER_CONFIG.prices.basic
  );

  const bonusList = [
    'Bono 01: 20 Combinaciones de Ataque Profesionales',
    'Bono 02: 50 Entrenamientos Físicos para Muay Thai',
    'Bono 03: 50 Técnicas de Defensa y Contraataque',
    'Bono 04: Guía de Fundamentos del Muay Thai',
    'Bono 05: Guía de Recuperación Muscular',
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
        {/* Darkened backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Modal Container */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="upgrade-modal-title"
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-[#090909] border-2 border-[#E50914] rounded-2xl shadow-2xl shadow-black p-5 sm:p-7 z-10 text-center"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-2 text-[#A1A1AA] hover:text-white hover:bg-[#1a1a1a] rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label="Cerrar ventana de oferta especial"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E50914]/15 border border-[#E50914]/40 rounded-md text-[#E50914] text-[11px] font-bold tracking-widest uppercase mb-3">
            <span>OFERTA ESPECIAL DE UPGRADE</span>
          </div>

          {/* Headline */}
          <h2
            id="upgrade-modal-title"
            className="font-headline font-black text-2xl sm:text-3xl text-white tracking-tight uppercase leading-tight mb-2"
          >
            ¡ESPERA! LLÉVATE EL PLAN PRO COMPLETO POR MUCHO MENOS
          </h2>

          {/* Visual Highlight for "¡POR SOLO $50 MXN MÁS!" */}
          <div className="my-3">
            <span className="inline-block px-4 py-1.5 bg-[#E50914] text-white font-headline font-black text-xl sm:text-2xl tracking-wide uppercase rounded-lg shadow-lg shadow-[#E50914]/30 border border-white/20">
              ¡POR SOLO {formatMXN(delta)} MÁS!
            </span>
          </div>

          {/* Subheadline clarifying total price */}
          <p className="text-xs sm:text-sm text-[#D4D4D8] leading-relaxed mb-4">
            En lugar de pagar {formatMXN(OFFER_CONFIG.prices.basic)} por el Plan Esencial, actualiza tu pedido ahora y llévate el{' '}
            <strong className="text-white font-semibold">Plan Pro Completo</strong> por un pago único total de{' '}
            <strong className="text-white font-semibold">{formatMXN(OFFER_CONFIG.prices.upgrade)}</strong>.
          </p>

          {/* Price Highlight & Comparison Card */}
          <div className="bg-[#121212] border border-[#262626] rounded-xl p-4 mb-4 text-left">
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#222222]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#E50914] block">
                  THAI ELITE PRO COMPLETO
                </span>
                <span className="text-xs text-[#A1A1AA] block mt-0.5">
                  Precio regular:{' '}
                  <span className="line-through text-[#71717A]">
                    {formatMXN(OFFER_CONFIG.prices.pro)}
                  </span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#A1A1AA] block">
                  Precio Total Hoy
                </span>
                <span className="font-headline font-black text-3xl sm:text-4xl text-white tabular-nums leading-none">
                  {formatMXN(OFFER_CONFIG.prices.upgrade)}
                </span>
              </div>
            </div>

            <div className="pt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-[#A1A1AA]">
                Pago único total (no es un cobro adicional)
              </span>
              <span className="font-bold text-white bg-[#E50914]/20 border border-[#E50914]/40 px-2.5 py-0.5 rounded">
                Ahorras {formatMXN(savings)}
              </span>
            </div>
          </div>

          {/* 5 Exclusive Bonuses Visible & Organized */}
          <div className="bg-[#111111] border border-[#222222] rounded-xl p-4 mb-5 text-left">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white mb-2.5">
              <Gift className="w-4 h-4 text-[#E50914] shrink-0" />
              <span>INCLUYE LOS 500 ENTRENAMIENTOS + 5 BONOS EXCLUSIVOS:</span>
            </div>
            <ul className="space-y-2">
              {bonusList.map((bonus, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2.5 text-xs text-[#E4E4E7]"
                >
                  <span className="w-4 h-4 rounded-full bg-[#E50914]/20 border border-[#E50914]/40 flex items-center justify-center text-[#E50914] shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span>{bonus}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={onConfirmUpgrade}
              className="w-full py-4 px-4 min-h-[52px] bg-[#E50914] hover:bg-[#C40812] active:scale-[0.99] text-white text-base sm:text-lg font-headline font-bold uppercase tracking-wider rounded-lg shadow-lg shadow-[#E50914]/30 border border-white/20 transition-all duration-200 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E50914]"
            >
              <span>
                ¡SÍ, QUIERO EL PLAN PRO POR {formatMXN(OFFER_CONFIG.prices.upgrade)}!
              </span>
              <ArrowRight className="w-5 h-5 shrink-0" />
            </button>

            {/* Secondary Link */}
            <button
              type="button"
              onClick={onDeclineToBasic}
              className="text-xs text-[#A1A1AA] hover:text-white underline underline-offset-4 py-2 transition-colors block w-full focus-visible:outline-none"
            >
              No, continuar con el Plan Esencial por{' '}
              {formatMXN(OFFER_CONFIG.prices.basic)}.
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
