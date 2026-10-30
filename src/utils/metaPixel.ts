/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Pixel & Funnel Analytics helper supporting UTMify Pixel (6abf39dabeae388a564376b3),
 * LowTrack Pixel, Meta Pixel (fbq), custom Inlead funnel events, and UTM forwarding.
 */

import { OFFER_CONFIG } from '../config/offer.ts';

export type QuizFunnelEventName =
  | 'quiz_start'
  | 'quiz_step_completed'
  | 'quiz_completed'
  | 'result_viewed'
  | 'offer_viewed'
  | 'checkout_clicked';

declare global {
  interface Window {
    pixelId?: string;
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    dataLayer?: Record<string, unknown>[];
    __thaiEliteEvents?: Array<{
      event: string;
      payload?: Record<string, unknown>;
      timestamp: number;
    }>;
  }
}

export const UTMIFY_PIXEL_ID = '6abf39dabeae388a564376b3';
export const UTMIFY_SCRIPT_SRC = 'https://cdn.utmify.com.br/scripts/pixel/pixel.js';
export const LOWTRACK_PIXEL_ID = 'lt_px_97899de67751';
export const LOWTRACK_SCRIPT_SRC = 'https://lowtrack.com.br/pixel.js';

export function initMetaPixel(rawConfig = OFFER_CONFIG.metaPixelId): void {
  if (typeof window === 'undefined') return;

  // 1. Ensure LowTrack Pixel is initialized if not already loaded by index.html
  if (!window.pixelId) {
    window.pixelId = LOWTRACK_PIXEL_ID;
  }
  const existingLowTrack = document.querySelector(
    `script[src="${LOWTRACK_SCRIPT_SRC}"]`
  );
  if (!existingLowTrack) {
    const a = document.createElement('script');
    a.setAttribute('async', '');
    a.setAttribute('defer', '');
    a.setAttribute('src', LOWTRACK_SCRIPT_SRC);
    document.head.appendChild(a);
  }

  // Ensure UTMify Pixel is also present if not already loaded by index.html
  const existingUtmify = document.querySelector(
    `script[src="${UTMIFY_SCRIPT_SRC}"]`
  );
  if (!existingUtmify) {
    const u = document.createElement('script');
    u.async = true;
    u.defer = true;
    u.src = UTMIFY_SCRIPT_SRC;
    (document.head || document.documentElement).appendChild(u);
  }

  // 2. If a numeric Meta Pixel ID is also provided, initialize fbq
  const numericMatch = rawConfig ? rawConfig.match(/^\d{10,20}$/) : null;
  if (numericMatch) {
    const cleanId = numericMatch[0];
    if (!window.fbq) {
      const n: any = (window.fbq = function (...args: unknown[]) {
        if (n.callMethod) {
          n.callMethod.apply(n, args);
        } else {
          n.queue.push(args);
        }
      });
      if (!window._fbq) window._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(script);
    }

    window.fbq('init', cleanId);
    window.fbq('track', 'PageView');
  }
}

export function trackMetaEvent(
  eventName: 'PageView' | 'ViewContent' | 'InitiateCheckout' | 'Lead',
  params?: Record<string, unknown>
): void {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', eventName, params);
  }
}

/**
 * Tracks custom Inlead funnel events (quiz_start, quiz_step_completed,
 * quiz_completed, result_viewed, offer_viewed, checkout_clicked)
 * across window.dataLayer, window.fbq, and CustomEvent listeners.
 */
export function trackQuizFunnelEvent(
  eventName: QuizFunnelEventName,
  payload: Record<string, unknown> = {}
): void {
  if (typeof window === 'undefined') return;

  if (!window.__thaiEliteEvents) {
    window.__thaiEliteEvents = [];
  }
  window.__thaiEliteEvents.push({
    event: eventName,
    payload,
    timestamp: Date.now(),
  });

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName, ...payload });
  }

  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', eventName, payload);
  }

  try {
    window.dispatchEvent(
      new CustomEvent(eventName, { detail: payload })
    );
  } catch {
    // Ignore in older environments
  }
}

/**
 * Appends current page query parameters (UTMs, fbclid, LowTrack params)
 * to the target checkout URL so tracking is never lost.
 */
export function buildTrackedCheckoutUrl(baseUrl: string): string {
  if (typeof window === 'undefined' || !window.location.search) {
    return baseUrl;
  }
  try {
    const targetUrl = new URL(baseUrl);
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.forEach((value, key) => {
      if (!targetUrl.searchParams.has(key)) {
        targetUrl.searchParams.set(key, value);
      }
    });
    return targetUrl.toString();
  } catch {
    return baseUrl;
  }
}
