/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * THAI ELITE — Inlead-Style Interactive Conversion Quiz Funnel (es-MX)
 */

import { useState, useEffect, useCallback } from 'react';
import { OFFER_CONFIG } from './config/offer.ts';
import {
  FunnelStep,
  QuizQuestionId,
  QuizAnswers,
  getQuestionById,
  getStepProgressRange,
  buildPersonalizedDiagnosis,
  loadQuizSession,
  saveQuizSession,
} from './config/quiz.ts';
import {
  initMetaPixel,
  trackMetaEvent,
  trackQuizFunnelEvent,
  buildTrackedCheckoutUrl,
} from './utils/metaPixel.ts';
import { QuizLayout } from './components/QuizLayout.tsx';
import { QuizIntro } from './components/QuizIntro.tsx';
import { QuizQuestion } from './components/QuizQuestion.tsx';
import { QuizTransition } from './components/QuizTransition.tsx';
import { QuizResult } from './components/QuizResult.tsx';
import { WorkoutsCarousel } from './components/WorkoutsCarousel.tsx';
import { InteractiveBonuses } from './components/InteractiveBonuses.tsx';
import { OfferSelection } from './components/OfferSelection.tsx';
import { UpgradeModal } from './components/UpgradeModal.tsx';
import {
  CheckoutNoticeModal,
  CheckoutState,
} from './components/CheckoutNoticeModal.tsx';

const VALID_STEPS: FunnelStep[] = [
  'intro',
  'q1',
  'q2',
  'q3',
  'q4',
  'midpoint',
  'q5',
  'q6',
  'analyzing',
  'result',
  'workouts',
  'bonuses',
  'offer',
];

function getInitialFunnelState(): { step: FunnelStep; answers: QuizAnswers } {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const stepParam = params.get('step') as FunnelStep | null;
    if (stepParam && VALID_STEPS.includes(stepParam)) {
      return {
        step: stepParam,
        answers: {
          q1: 'A',
          q2: 'C',
          q3: 'D',
          q4: 'B',
          q5: 'A',
          q6: 'A',
        },
      };
    }
    if (params.get('autostart') === '1') {
      return { step: 'q1', answers: {} };
    }
  }

  const saved = loadQuizSession();
  if (saved && VALID_STEPS.includes(saved.step)) {
    return saved;
  }

  return { step: 'intro', answers: {} };
}

export default function App() {
  const initialState = getInitialFunnelState();
  const [step, setStep] = useState<FunnelStep>(initialState.step);
  const [answers, setAnswers] = useState<QuizAnswers>(initialState.answers);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [checkoutNotice, setCheckoutNotice] = useState<CheckoutState | null>(
    null
  );

  useEffect(() => {
    initMetaPixel(OFFER_CONFIG.metaPixelId);
  }, []);

  useEffect(() => {
    saveQuizSession({ step, answers });
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step, answers]);

  // Track view events when entering result or offer steps
  useEffect(() => {
    if (step === 'result') {
      trackQuizFunnelEvent('result_viewed', { answers });
    } else if (step === 'offer') {
      trackQuizFunnelEvent('offer_viewed', { answers });
      trackMetaEvent('ViewContent', {
        content_name: 'Thai Elite Offer Step',
        currency: OFFER_CONFIG.currency,
      });
    }
  }, [step, answers]);

  const handleStartQuiz = useCallback(() => {
    trackQuizFunnelEvent('quiz_start');
    setStep('q1');
  }, []);

  const handleSelectOption = useCallback(
    (questionId: QuizQuestionId, optionId: 'A' | 'B' | 'C' | 'D') => {
      const updatedAnswers: QuizAnswers = {
        ...answers,
        [questionId]: optionId,
      };
      setAnswers(updatedAnswers);

      trackQuizFunnelEvent('quiz_step_completed', {
        question_id: questionId,
        option_id: optionId,
      });

      const nextMap: Record<QuizQuestionId, FunnelStep> = {
        q1: 'q2',
        q2: 'q3',
        q3: 'q4',
        q4: 'midpoint',
        q5: 'q6',
        q6: 'analyzing',
      };

      if (questionId === 'q6') {
        trackQuizFunnelEvent('quiz_completed', { answers: updatedAnswers });
      }

      setStep(nextMap[questionId]);
    },
    [answers]
  );

  const handleBack = useCallback(() => {
    const backMap: Partial<Record<FunnelStep, FunnelStep>> = {
      q1: 'intro',
      q2: 'q1',
      q3: 'q2',
      q4: 'q3',
      q5: 'q4',
      q6: 'q5',
      result: 'q6',
      workouts: 'result',
      bonuses: 'workouts',
      offer: 'bonuses',
    };
    const prev = backMap[step];
    if (prev) {
      setStep(prev);
    }
  }, [step]);

  const triggerCheckout = useCallback(
    (
      planId: 'basic' | 'pro' | 'pro-upgrade',
      planName: string,
      price: number,
      rawUrl: string
    ) => {
      const trackedUrl = buildTrackedCheckoutUrl(rawUrl);
      trackQuizFunnelEvent('checkout_clicked', {
        plan_id: planId,
        plan_name: planName,
        value: price,
        currency: OFFER_CONFIG.currency,
      });
      trackMetaEvent('InitiateCheckout', {
        content_name: planName,
        content_ids: [planId],
        value: price,
        currency: OFFER_CONFIG.currency,
      });

      setCheckoutNotice({
        planId,
        planName,
        price,
        url: trackedUrl,
      });
    },
    []
  );

  const handleSelectBasic = useCallback(() => {
    setIsUpgradeModalOpen(true);
  }, []);

  const handleSelectPro = useCallback(() => {
    triggerCheckout(
      'pro',
      'THAI ELITE COMPLETO',
      OFFER_CONFIG.prices.pro,
      OFFER_CONFIG.checkouts.pro
    );
  }, [triggerCheckout]);

  const handleConfirmUpgrade = useCallback(() => {
    setIsUpgradeModalOpen(false);
    triggerCheckout(
      'pro-upgrade',
      'THAI ELITE COMPLETO (UPGRADE)',
      OFFER_CONFIG.prices.upgrade,
      OFFER_CONFIG.checkouts.proUpgrade
    );
  }, [triggerCheckout]);

  const handleDeclineToBasic = useCallback(() => {
    setIsUpgradeModalOpen(false);
    triggerCheckout(
      'basic',
      'THAI ELITE ESENCIAL',
      OFFER_CONFIG.prices.basic,
      OFFER_CONFIG.checkouts.basic
    );
  }, [triggerCheckout]);

  const diagnosis = buildPersonalizedDiagnosis(answers);
  const progressRange = getStepProgressRange(step);

  const stepQuestionLabel =
    step === 'q1' ||
    step === 'q2' ||
    step === 'q3' ||
    step === 'q4' ||
    step === 'q5' ||
    step === 'q6'
      ? getQuestionById(step).progressLabel
      : undefined;

  return (
    <QuizLayout
      progressPercent={progressRange.min}
      maxProgressPercent={progressRange.max}
      stageLabel={progressRange.stageLabel}
      stepLabel={stepQuestionLabel}
    >
      {step === 'intro' && <QuizIntro onStart={handleStartQuiz} />}

      {(step === 'q1' ||
        step === 'q2' ||
        step === 'q3' ||
        step === 'q4' ||
        step === 'q5' ||
        step === 'q6') && (
        <QuizQuestion
          question={getQuestionById(step)}
          selectedOptionId={answers[step]}
          onSelect={handleSelectOption}
        />
      )}

      {step === 'midpoint' && (
        <QuizTransition
          mode="midpoint"
          onComplete={() => setStep('q5')}
        />
      )}

      {step === 'analyzing' && (
        <QuizTransition
          mode="analyzing"
          onComplete={() => setStep('result')}
        />
      )}

      {step === 'result' && (
        <QuizResult
          answers={answers}
          onContinue={() => setStep('workouts')}
        />
      )}

      {step === 'workouts' && (
        <WorkoutsCarousel onContinue={() => setStep('bonuses')} />
      )}

      {step === 'bonuses' && (
        <InteractiveBonuses onContinue={() => setStep('offer')} />
      )}

      {step === 'offer' && (
        <OfferSelection
          recommendedPlan={diagnosis.recommendedPlan}
          onSelectBasic={handleSelectBasic}
          onSelectPro={handleSelectPro}
        />
      )}

      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        onConfirmUpgrade={handleConfirmUpgrade}
        onDeclineToBasic={handleDeclineToBasic}
      />

      <CheckoutNoticeModal
        checkoutState={checkoutNotice}
        onClose={() => setCheckoutNotice(null)}
      />
    </QuizLayout>
  );
}
