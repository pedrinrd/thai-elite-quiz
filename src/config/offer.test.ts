/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Unit tests for Thai Elite Offer & Inlead Interactive Quiz Funnel logic.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  OFFER_CONFIG,
  calculateUpgradeSavings,
  calculateUpgradeDelta,
  formatMXN,
} from './offer.ts';
import {
  QUIZ_INTRO_CONTENT,
  QUIZ_QUESTIONS,
  QUIZ_MIDPOINT_TRANSITION,
  QUIZ_ANALYZING_CONTENT,
  calculateQuizProgress,
  buildPersonalizedDiagnosis,
} from './quiz.ts';

test('OFFER_CONFIG preserves official prices, checkouts, and lightweight 9:16 VSL', () => {
  assert.equal(OFFER_CONFIG.prices.basic, 100);
  assert.equal(OFFER_CONFIG.prices.pro, 219);
  assert.equal(OFFER_CONFIG.prices.upgrade, 149);
  assert.equal(OFFER_CONFIG.prices.bonusTotalValue, 179);

  assert.equal(OFFER_CONFIG.checkouts.basic, 'https://xpag.global/pay/3toN68D3');
  assert.equal(OFFER_CONFIG.checkouts.pro, 'https://xpag.global/pay/mJLWrn52');
  assert.equal(
    OFFER_CONFIG.checkouts.proUpgrade,
    'https://xpag.global/pay/hfsz9Toi'
  );

  assert.equal(
    OFFER_CONFIG.vslVideoSrc,
    '/assets/aistudio/THAI_ELITE_MX_9x16_eb062865.mp4'
  );
  assert.equal(OFFER_CONFIG.drillClips.length, 5);
  assert.equal(OFFER_CONFIG.bonuses.length, 5);
});

test('Upgrade pricing math and MXN formatting work accurately', () => {
  assert.equal(calculateUpgradeSavings(219, 149), 70);
  assert.equal(calculateUpgradeDelta(149, 100), 49);
  assert.equal(formatMXN(100), '$100 MXN');
  assert.equal(formatMXN(219), '$219 MXN');
  assert.equal(formatMXN(179), '$179 MXN');
});

test('Inlead Quiz configuration contains exact 6 steps and Mexican Spanish copy', () => {
  assert.equal(QUIZ_INTRO_CONTENT.logoTitle, 'THAI ELITE');
  assert.equal(QUIZ_INTRO_CONTENT.topSeal, '🥊 TEST DE ENTRENAMIENTO');
  assert.equal(
    QUIZ_INTRO_CONTENT.headline,
    '¿QUIERES APRENDER MUAY THAI DESDE CASA?'
  );
  assert.equal(
    QUIZ_INTRO_CONTENT.ctaButton,
    'DESCUBRIR MI ENTRENAMIENTO →'
  );

  assert.equal(QUIZ_QUESTIONS.length, 6);
  assert.equal(QUIZ_QUESTIONS[0].progressLabel, '1/6');
  assert.equal(QUIZ_QUESTIONS[5].progressLabel, '6/6');
  assert.equal(QUIZ_MIDPOINT_TRANSITION.headline, '¡PERFECTO!');
  assert.equal(QUIZ_MIDPOINT_TRANSITION.durationMs, 1500);
  assert.equal(
    QUIZ_ANALYZING_CONTENT.headline,
    'ANALIZANDO TUS RESPUESTAS...'
  );
  assert.equal(QUIZ_ANALYZING_CONTENT.durationMs, 2000);
});

test('Quiz progress calculation and personalized diagnosis reflect user answers', () => {
  assert.equal(calculateQuizProgress(1, 6), 17);
  assert.equal(calculateQuizProgress(3, 6), 50);
  assert.equal(calculateQuizProgress(6, 6), 100);

  const diagnosis = buildPersonalizedDiagnosis({
    q1: 'A',
    q2: 'C',
    q3: 'D',
    q4: 'B',
    q5: 'B',
    q6: 'A',
  });

  assert.equal(diagnosis.seal, '🥊 TU RECOMENDACIÓN ESTÁ LISTA');
  assert.equal(diagnosis.nivel, 'Nunca he practicado');
  assert.equal(diagnosis.objetivo, 'Aprender golpes y combinaciones');
  assert.equal(diagnosis.disponibilidad, '20 a 30 minutos');
  assert.equal(diagnosis.interesPrincipal, 'Defensa y contraataque');
  assert.equal(diagnosis.ctaLabel, 'VER MI ENTRENAMIENTO →');
  assert.equal(diagnosis.recommendedPlan, 'pro');
});
