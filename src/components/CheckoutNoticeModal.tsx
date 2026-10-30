/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, ShieldCheck, CheckCircle2, Lock, Smartphone } from 'lucide-react';
import { formatMXN } from '../config/offer.ts';

export interface CheckoutState {
  planId: 'basic' | 'pro' | 'pro-upgrade';
  planName: string;
  price: number;
  url: string;
}

interface CheckoutNoticeModalProps {
  checkoutState: CheckoutState | null;
  onClose: () => void;
}

export function CheckoutNoticeModal({
  checkoutState,
  onClose,
}: CheckoutNoticeModalProps) {
  if (!checkoutState) return null;

  const isUpgrade = checkoutState.planId === 'pro-upgrade';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          aria-hidden="true"
        />

        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-[#111111] border border-[#2a2a2a] rounded-2xl shadow-2xl p-6 sm:p-8 z-10 text-center"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#A1A1AA] hover:text-white hover:bg-[#1f1f1f] rounded-full transition-colors"
            aria-label="Cerrar ventana de pago"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>Entorno de Pago Seguro</span>
          </div>

          <h3 className="font-headline font-bold text-2xl text-white uppercase mb-1">
            {checkoutState.planName}
          </h3>

          {isUpgrade && (
            <span className="text-xs text-[#D4AF37] font-semibold block mb-2">
              ¡Descuento Especial de Upgrade Aplicado!
            </span>
          )}

          {/* Price Tag */}
          <div className="py-4 my-4 bg-[#181818] border border-[#262626] rounded-xl">
            <span className="text-xs text-[#A1A1AA] block">Total final a pagar:</span>
            <span className="font-headline font-black text-4xl text-white tabular-nums">
              {formatMXN(checkoutState.price)}
            </span>
            <span className="text-[11px] text-[#71717A] block mt-1">
              Pago único • Acceso inmediato por WhatsApp y Correo
            </span>
          </div>

          {/* Checkout URL info */}
          <div className="text-left bg-[#0c0c0c] p-3 rounded-lg border border-[#222222] mb-5 text-xs text-[#A1A1AA]">
            <p className="font-medium text-white mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Enlace Oficial de Pago Seguro:
            </p>
            <p className="font-mono text-[10px] text-[#888] break-all select-all bg-[#141414] p-1.5 rounded border border-[#222]">
              {checkoutState.url}
            </p>
          </div>

          {/* Action button */}
          <a
            href={checkoutState.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full py-3.5 px-4 bg-[#E50914] hover:bg-[#C40812] active:scale-[0.99] text-white font-headline font-bold uppercase tracking-wider rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all focus:outline-none"
          >
            <span>COMPRAR AHORA</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-[#71717A]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> 7 Días de Garantía
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5" /> Pago Seguro y Acceso Inmediato
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
