/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Inlead-style Interactive Quiz Funnel Configuration & Personalization Logic for THAI ELITE (es-MX).
 */

export type QuizQuestionId = 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'q6';

export type FunnelStep =
  | 'intro'
  | 'q1'
  | 'q2'
  | 'q3'
  | 'q4'
  | 'midpoint'
  | 'q5'
  | 'q6'
  | 'analyzing'
  | 'result'
  | 'workouts'
  | 'bonuses'
  | 'offer';

export interface QuizOption {
  id: 'A' | 'B' | 'C' | 'D';
  icon: string;
  label: string;
  cleanValue: string;
}

export interface QuizQuestionConfig {
  id: QuizQuestionId;
  stepNumber: number;
  totalSteps: number;
  progressLabel: string;
  headline: string;
  subheadline?: string;
  options: QuizOption[];
}

export type QuizAnswers = Partial<Record<QuizQuestionId, 'A' | 'B' | 'C' | 'D'>>;

export interface PersonalizedDiagnosis {
  seal: string;
  headline: string;
  subheadline: string;
  profileTitle: string;
  nivel: string;
  objetivo: string;
  dificultad: string;
  disponibilidad: string;
  interesPrincipal: string;
  compromiso: string;
  personalizedMessage: string;
  ctaLabel: string;
  recommendedPlan: 'pro' | 'basic';
}

export const SESSION_STORAGE_KEY = 'thai_elite_inlead_quiz_v2';

export const QUIZ_INTRO_CONTENT = {
  logoTitle: 'THAI ELITE',
  topSeal: '🥊 TEST DE ENTRENAMIENTO',
  headline: '¿QUIERES APRENDER MUAY THAI DESDE CASA?',
  subheadline:
    'Responde 6 preguntas rápidas y descubre cómo puedes comenzar, incluso si nunca has entrenado.',
  ctaButton: 'DESCUBRIR MI ENTRENAMIENTO →',
  trustBadges: '✓ Gratis • ✓ Menos de 1 minuto',
};

export const QUIZ_MIDPOINT_TRANSITION = {
  headline: '¡PERFECTO!',
  subheadline:
    'Con THAI ELITE puedes explorar los entrenamientos a tu propio ritmo.',
  durationMs: 1500,
};

export const QUIZ_ANALYZING_CONTENT = {
  headline: 'ANALIZANDO TUS RESPUESTAS...',
  messages: [
    '✓ Revisando tu nivel.',
    '✓ Identificando tus objetivos.',
    '✓ Preparando tu recomendación.',
  ],
  durationMs: 2000,
};

export const QUIZ_QUESTIONS: QuizQuestionConfig[] = [
  {
    id: 'q1',
    stepNumber: 1,
    totalSteps: 6,
    progressLabel: '1/6',
    headline: '¿CUÁL ES TU NIVEL ACTUAL?',
    options: [
      {
        id: 'A',
        icon: '🥊',
        label: '🥊 Nunca he practicado.',
        cleanValue: 'Nunca he practicado',
      },
      {
        id: 'B',
        icon: '🔥',
        label: '🔥 Soy principiante.',
        cleanValue: 'Soy principiante',
      },
      {
        id: 'C',
        icon: '💪',
        label: '💪 Ya tengo experiencia.',
        cleanValue: 'Ya tengo experiencia',
      },
    ],
  },
  {
    id: 'q2',
    stepNumber: 2,
    totalSteps: 6,
    progressLabel: '2/6',
    headline: '¿QUÉ TE GUSTARÍA CONSEGUIR CON EL MUAY THAI?',
    options: [
      {
        id: 'A',
        icon: '🥊',
        label: '🥊 Aprender defensa personal.',
        cleanValue: 'Aprender defensa personal',
      },
      {
        id: 'B',
        icon: '💪',
        label: '💪 Mejorar mi condición física.',
        cleanValue: 'Mejorar mi condición física',
      },
      {
        id: 'C',
        icon: '🔥',
        label: '🔥 Aprender golpes y combinaciones.',
        cleanValue: 'Aprender golpes y combinaciones',
      },
      {
        id: 'D',
        icon: '🏆',
        label: '🏆 Mejorar mis conocimientos técnicos.',
        cleanValue: 'Mejorar mis conocimientos técnicos',
      },
    ],
  },
  {
    id: 'q3',
    stepNumber: 3,
    totalSteps: 6,
    progressLabel: '3/6',
    headline: '¿QUÉ TE IMPIDE COMENZAR?',
    options: [
      {
        id: 'A',
        icon: '⏰',
        label: '⏰ No tengo mucho tiempo.',
        cleanValue: 'No tengo mucho tiempo',
      },
      {
        id: 'B',
        icon: '💰',
        label: '💰 Las clases son caras.',
        cleanValue: 'Las clases son caras',
      },
      {
        id: 'C',
        icon: '🤔',
        label: '🤔 No sé por dónde empezar.',
        cleanValue: 'No sé por dónde empezar',
      },
      {
        id: 'D',
        icon: '🏠',
        label: '🏠 Prefiero aprender desde casa.',
        cleanValue: 'Prefiero aprender desde casa',
      },
    ],
  },
  {
    id: 'q4',
    stepNumber: 4,
    totalSteps: 6,
    progressLabel: '4/6',
    headline: '¿CUÁNTO TIEMPO TIENES PARA ENTRENAR?',
    options: [
      {
        id: 'A',
        icon: '⚡',
        label: '⚡ 10 a 15 minutos.',
        cleanValue: '10 a 15 minutos',
      },
      {
        id: 'B',
        icon: '🔥',
        label: '🔥 20 a 30 minutos.',
        cleanValue: '20 a 30 minutos',
      },
      {
        id: 'C',
        icon: '💪',
        label: '💪 Más de 30 minutos.',
        cleanValue: 'Más de 30 minutos',
      },
      {
        id: 'D',
        icon: '📱',
        label: '📱 Cuando tenga tiempo libre.',
        cleanValue: 'Cuando tenga tiempo libre',
      },
    ],
  },
  {
    id: 'q5',
    stepNumber: 5,
    totalSteps: 6,
    progressLabel: '5/6',
    headline: '¿QUÉ TE GUSTARÍA APRENDER PRIMERO?',
    options: [
      {
        id: 'A',
        icon: '🥊',
        label: '🥊 Puños y patadas.',
        cleanValue: 'Puños y patadas',
      },
      {
        id: 'B',
        icon: '🛡️',
        label: '🛡️ Defensa y contraataque.',
        cleanValue: 'Defensa y contraataque',
      },
      {
        id: 'C',
        icon: '🔥',
        label: '🔥 Combinaciones de ataque.',
        cleanValue: 'Combinaciones de ataque',
      },
      {
        id: 'D',
        icon: '💪',
        label: '💪 Preparación física.',
        cleanValue: 'Preparación física',
      },
    ],
  },
  {
    id: 'q6',
    stepNumber: 6,
    totalSteps: 6,
    progressLabel: '6/6',
    headline: '¿ESTÁS LISTO PARA DAR TU PRIMER PASO?',
    subheadline:
      'Imagina tener una biblioteca de entrenamientos en video disponible desde tu celular.',
    options: [
      {
        id: 'A',
        icon: '🔥',
        label: '🔥 ¡Sí, quiero comenzar!',
        cleanValue: '¡Sí, quiero comenzar!',
      },
      {
        id: 'B',
        icon: '🥊',
        label: '🥊 Quiero conocer los entrenamientos.',
        cleanValue: 'Quiero conocer los entrenamientos',
      },
      {
        id: 'C',
        icon: '🤔',
        label: '🤔 Primero quiero ver qué incluye.',
        cleanValue: 'Primero quiero ver qué incluye',
      },
    ],
  },
];

export function getQuestionById(id: QuizQuestionId): QuizQuestionConfig {
  const found = QUIZ_QUESTIONS.find((q) => q.id === id);
  return found || QUIZ_QUESTIONS[0];
}

export function calculateQuizProgress(stepNumber: number, totalSteps = 6): number {
  if (totalSteps <= 0) return 0;
  const clamped = Math.max(0, Math.min(stepNumber, totalSteps));
  return Math.round((clamped / totalSteps) * 100);
}

export interface StepProgressRange {
  min: number;
  max: number;
  stageLabel: string;
}

export function getStepProgressRange(step: FunnelStep): StepProgressRange {
  const rangeMap: Record<FunnelStep, StepProgressRange> = {
    intro: { min: 8, max: 14, stageLabel: 'Inicio del test' },
    q1: { min: 16, max: 24, stageLabel: 'Pregunta 1 de 6' },
    q2: { min: 26, max: 34, stageLabel: 'Pregunta 2 de 6' },
    q3: { min: 36, max: 44, stageLabel: 'Pregunta 3 de 6' },
    q4: { min: 46, max: 52, stageLabel: 'Pregunta 4 de 6' },
    midpoint: { min: 55, max: 57, stageLabel: 'Avance validado' },
    q5: { min: 58, max: 64, stageLabel: 'Pregunta 5 de 6' },
    q6: { min: 66, max: 72, stageLabel: 'Pregunta 6 de 6' },
    analyzing: { min: 74, max: 77, stageLabel: 'Analizando perfil' },
    result: { min: 78, max: 83, stageLabel: 'Perfil personalizado' },
    workouts: { min: 84, max: 88, stageLabel: 'Demostraciones en video' },
    bonuses: { min: 89, max: 93, stageLabel: '5 Bonos exclusivos' },
    offer: { min: 94, max: 100, stageLabel: 'Tu oferta especial' },
  };
  return rangeMap[step] ?? { min: 10, max: 15, stageLabel: 'En progreso' };
}

export function getOverallFunnelProgress(step: FunnelStep): number {
  return getStepProgressRange(step).min;
}

/**
 * Builds the exact personalized recommendation from the user's answers
 * without inventing technical or physical assessments.
 */
export function buildPersonalizedDiagnosis(
  answers: QuizAnswers
): PersonalizedDiagnosis {
  const findAnswerValue = (qId: QuizQuestionId): string => {
    const q = getQuestionById(qId);
    const chosenId = answers[qId];
    const opt = q.options.find((o) => o.id === chosenId) || q.options[0];
    return opt.cleanValue;
  };

  const nivel = findAnswerValue('q1');
  const objetivo = findAnswerValue('q2');
  const dificultad = findAnswerValue('q3');
  const disponibilidad = findAnswerValue('q4');
  const interesPrincipal = findAnswerValue('q5');
  const compromiso = findAnswerValue('q6');

  const personalizedMessage = `Indicaste que tu nivel actual es "${nivel.toLowerCase()}" y que tu interés principal es "${interesPrincipal.toLowerCase()}". Con sesiones de "${disponibilidad.toLowerCase()}", puedes consultar las demostraciones en video desde tu celular o computadora para trabajar en "${objetivo.toLowerCase()}" a tu propio ritmo.`;

  const recommendedPlan: 'pro' | 'basic' =
    answers.q6 === 'C' ? 'basic' : 'pro';

  return {
    seal: '🥊 TU RECOMENDACIÓN ESTÁ LISTA',
    headline: '¡ENCONTRAMOS UNA FORMA DE COMENZAR TU CAMINO EN EL MUAY THAI!',
    subheadline:
      'Según tus respuestas, THAI ELITE puede ayudarte a conocer las técnicas que te interesan y comenzar desde casa.',
    profileTitle: 'TU PERFIL',
    nivel,
    objetivo,
    dificultad,
    disponibilidad,
    interesPrincipal,
    compromiso,
    personalizedMessage,
    ctaLabel: 'VER MI ENTRENAMIENTO →',
    recommendedPlan,
  };
}

export interface PersistedQuizSession {
  step: FunnelStep;
  answers: QuizAnswers;
}

export function saveQuizSession(session: PersistedQuizSession): void {
  if (typeof window === 'undefined' || !window.sessionStorage) return;
  try {
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Ignore storage quota errors
  }
}

export function loadQuizSession(): PersistedQuizSession | null {
  if (typeof window === 'undefined' || !window.sessionStorage) return null;
  try {
    const raw = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedQuizSession;
    if (parsed && typeof parsed.step === 'string' && parsed.answers) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function clearQuizSession(): void {
  if (typeof window === 'undefined' || !window.sessionStorage) return;
  try {
    window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
  } catch {
    // Ignore
  }
}
