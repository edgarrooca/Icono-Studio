import { useEffect, useLayoutEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { ChevronRight, Send, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { siteConfig } from '../lib/site';
import { useScrollLock } from '../hooks/useScrollLock';

type ChatbotLauncherProps = {
  isHome?: boolean;
};

type ChatRole = 'assistant' | 'user';
type Intent = 'create' | 'prices' | 'hosting' | 'improve' | 'projects' | 'faq' | 'contact' | 'unknown';
type ProjectType = 'landing' | 'corporate' | 'store' | 'custom';
type ContactChannel = 'whatsapp' | 'email';
type CaptureKind = 'estimate' | 'contact';
type ChatStep =
  | 'root'
  | 'createType'
  | 'createGoal'
  | 'improveGoal'
  | 'nextAction'
  | 'priceType'
  | 'priceAction'
  | 'hostingPlan'
  | 'captureName'
  | 'captureBusiness'
  | 'captureChannel'
  | 'captureContact'
  | 'afterLead';

type ChatMessage = {
  id: number;
  role: ChatRole;
  text: string;
};

type ChatOption = {
  id: string;
  label: string;
};

type ChatData = {
  captureKind?: CaptureKind;
  projectType?: ProjectType;
  projectLabel?: string;
  startingPoint?: string;
  goal?: string;
  improvement?: string;
  hostingPlan?: string;
  name?: string;
  business?: string;
  channel?: ContactChannel;
  contact?: string;
};

const CHAT_PREFILL_KEY = 'icono_chat_prefill_v1';

// Keep this UI self-contained: other page components own the shared stylesheet.
const chatbotStyles = `
  .chatbot-start-marker { position: absolute; top: 0; left: 0; width: 1px; height: 1px; pointer-events: none; }
  .chatbot-backdrop { position: fixed; inset: 0; z-index: 84; background: rgb(11 27 99 / .12); touch-action: none; }
  .chatbot-widget {
    --chatbot-viewport-height: 100dvh;
    --chatbot-keyboard-inset: 0px;
    position: fixed; right: max(16px, env(safe-area-inset-right));
    bottom: calc(16px + env(safe-area-inset-bottom));
    z-index: 75; pointer-events: none;
    font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
    color: #0b1b63;
  }
  .chatbot-widget[data-open='true'] { z-index: 85; bottom: calc(12px + env(safe-area-inset-bottom) + var(--chatbot-keyboard-inset)); }
  .chatbot-widget:not([data-home='true']):not([data-open='true']) { bottom: calc(104px + env(safe-area-inset-bottom)); }
  .chatbot-widget button { touch-action: manipulation; cursor: pointer; }
  .chatbot-widget button:disabled { cursor: not-allowed; opacity: .5; }
  .chatbot-widget :focus-visible { outline: 3px solid #287ba3; outline-offset: 3px; }
  .chatbot-widget .chatbot-launcher {
    pointer-events: auto; display: flex; flex-direction: column; align-items: center;
    width: 72px; padding: 0; border: 0; background: transparent; border-radius: 18px;
  }
  .chatbot-launcher[hidden] { display: none; }
  .chatbot-launcher-character { display: block; width: 100%; height: 88px; object-fit: contain; }
  .chatbot-launcher-mobile { display: none; }
  .chatbot-widget .chatbot-launcher-bubble {
    position: relative; flex-shrink: 0; min-height: 44px; display: flex; align-items: center;
    justify-content: center; width: 100%; padding: 8px 4px; margin-bottom: 4px;
    border: 1.5px solid #0b1b63; border-radius: 999px; background: #fafdff;
    color: #0b1b63; font-size: 11px; font-weight: 800; white-space: nowrap;
    box-shadow: 0 5px 14px rgb(11 27 99 / .1);
  }
  .chatbot-launcher-bubble::after {
    content: ''; position: absolute; bottom: -5px; right: 27px; width: 8px; height: 8px;
    background: #fafdff; border-right: 1.5px solid #0b1b63; border-bottom: 1.5px solid #0b1b63; transform: rotate(45deg);
  }
  @media (max-width: 1023px) {
    .chatbot-widget .chatbot-launcher {
      position: relative; display: block; width: 60px; height: 60px;
      overflow: visible; border-radius: 50%; isolation: isolate;
    }
    .chatbot-widget .chatbot-launcher::before {
      content: ''; position: absolute; inset: 0; border-radius: inherit;
      border: 1.5px solid #9ed6f1; background: #d8ecfb;
      box-shadow: 0 5px 18px rgb(11 27 99 / .16); pointer-events: none;
    }
    .chatbot-widget .chatbot-launcher[hidden],
    .chatbot-widget .chatbot-launcher .chatbot-launcher-character { display: none; }
    /* Clip only the lower silhouette; leave room above the circle for the hair. */
    .chatbot-launcher-mobile {
      display: block; position: absolute; left: -6px; bottom: 0; width: 72px; height: 84px;
      pointer-events: none;
      -webkit-mask: linear-gradient(#000 0 0) top / 100% calc(100% - 30px) no-repeat, radial-gradient(circle 30px at 50% 0, #000 99%, transparent 100%) bottom / 100% 30px no-repeat;
      mask: linear-gradient(#000 0 0) top / 100% calc(100% - 30px) no-repeat, radial-gradient(circle 30px at 50% 0, #000 99%, transparent 100%) bottom / 100% 30px no-repeat;
    }
    .chatbot-launcher-mobile img {
      position: absolute; left: 0; bottom: -3px; width: 72px; height: 72px;
      max-width: none; object-fit: contain;
    }
    .chatbot-widget .chatbot-launcher-bubble {
      position: absolute; right: calc(100% + 12px); bottom: 12px;
      width: auto; min-height: 36px; margin: 0; padding: 7px 12px;
      font-size: 12px; line-height: 1.5;
    }
    .chatbot-launcher-bubble::after { right: -5px; bottom: 12px; transform: rotate(-45deg); }
    .chatbot-launcher:active .chatbot-launcher-mobile { transform: translateY(1px); }
  }
  .chatbot-widget .chatbot-panel {
    pointer-events: auto; display: flex; flex-direction: column; overflow: hidden;
    width: min(24rem, calc(100vw - 32px - env(safe-area-inset-left) - env(safe-area-inset-right)));
    height: min(38rem, calc(var(--chatbot-viewport-height) - 24px - env(safe-area-inset-top) - env(safe-area-inset-bottom)));
    max-height: calc(var(--chatbot-viewport-height) - 24px - env(safe-area-inset-top) - env(safe-area-inset-bottom));
    border: 1px solid #dce8f5; border-radius: 24px; background: #fafdff;
    box-shadow: 0 18px 60px rgb(11 27 99 / .18);
  }
  .chatbot-header { display: flex; flex-shrink: 0; align-items: center; gap: 12px; padding: 16px; border-bottom: 1px solid #dce8f5; background: #eef6fc; }
  .chatbot-avatar { width: 44px; height: 44px; flex-shrink: 0; border-radius: 50%; background: #d8ecfb; overflow: hidden; }
  .chatbot-avatar img { width: 100%; height: 100%; object-fit: contain; }
  .chatbot-heading { flex: 1; min-width: 0; }
  .chatbot-heading h2 { margin: 0; font-size: 16px; line-height: 1.3; font-weight: 800; letter-spacing: -.03em; }
  .chatbot-heading p { margin: 3px 0 0; font-size: 12px; line-height: 1.4; color: #496189; font-weight: 600; }
  .chatbot-close { display: grid; place-items: center; flex-shrink: 0; width: 44px; height: 44px; padding: 0; border-radius: 50%; color: #0b1b63; background: transparent; border: 1px solid #c9ddec; }
  .chatbot-scroll { min-height: 0; flex: 1; overflow-y: auto; overscroll-behavior: contain; padding: 16px; scrollbar-width: thin; scrollbar-color: #9eb8ce transparent; -webkit-overflow-scrolling: touch; }
  .chatbot-scroll:focus-visible { outline-offset: -4px; }
  .chatbot-log { display: grid; gap: 12px; }
  .chatbot-message-row { display: flex; justify-content: flex-start; }
  .chatbot-message-row--user { justify-content: flex-end; }
  .chatbot-message { margin: 0; max-width: 94%; padding: 12px 14px; border-radius: 16px 16px 16px 5px; background: #eef4fb; font-size: 14px; line-height: 1.6; font-weight: 500; overflow-wrap: anywhere; white-space: pre-wrap; }
  .chatbot-message-row--user .chatbot-message { max-width: 88%; border-radius: 16px 16px 5px 16px; background: #0b1b63; color: #fafdff; }
  .chatbot-options { display: grid; gap: 8px; margin-top: 12px; }
  .chatbot-option { display: flex; align-items: center; gap: 10px; width: 100%; min-height: 48px; padding: 10px 12px; border: 1px solid #c9ddec; border-radius: 14px; background: #fafdff; color: #17367d; text-align: left; font-size: 14px; line-height: 1.45; font-weight: 700; transition: background-color 160ms, border-color 160ms; }
  .chatbot-option span { min-width: 0; flex: 1; overflow-wrap: anywhere; }
  .chatbot-option img { width: 28px; height: 28px; flex-shrink: 0; object-fit: contain; }
  .chatbot-option svg { flex-shrink: 0; color: #496189; }
  .chatbot-typing { display: flex; align-items: center; gap: 5px; margin-top: 12px; padding: 14px; width: fit-content; border-radius: 16px 16px 16px 5px; background: #eef4fb; }
  .chatbot-composer { flex-shrink: 0; padding: 12px 16px 16px; border-top: 1px solid #dce8f5; background: #fafdff; }
  .chatbot-input-label { display: block; margin-bottom: 6px; font-size: 12px; line-height: 1.4; color: #496189; font-weight: 700; }
  .chatbot-input-row { display: flex; align-items: center; gap: 8px; border: 1px solid #7b91ad; border-radius: 16px; padding: 4px; background: #fafdff; }
  .chatbot-input-row:focus-within { border-color: #287ba3; box-shadow: 0 0 0 2px rgb(40 123 163 / .18); }
  .chatbot-input-row input { width: 100%; min-width: 0; flex: 1; border: 0; outline: none; padding: 10px 8px; background: transparent; color: #0b1b63; font: inherit; font-size: 16px; line-height: 1.5; }
  .chatbot-input-row input::placeholder { color: #536b90; opacity: 1; }
  .chatbot-widget .chatbot-input-row input:focus-visible { outline: none; }
  .chatbot-widget .chatbot-send-button { display: grid; place-items: center; width: 44px; height: 44px; flex-shrink: 0; border: 0; border-radius: 12px; color: #0b1b63; background: #9ed6f1; box-shadow: none; }
  .chatbot-widget .chatbot-send-button:disabled { transform: none; filter: none; }
  .chatbot-helper { margin: 8px 0 0; font-size: 11px; line-height: 1.4; color: #496189; }
  .chatbot-widget[data-compact='true'] .chatbot-header { padding: 8px 12px; }
  .chatbot-widget[data-compact='true'] .chatbot-scroll { padding: 12px; }
  .chatbot-widget[data-compact='true'] .chatbot-composer { padding: 8px 12px; }
  .chatbot-widget[data-compact='true'] .chatbot-input-label,
  .chatbot-widget[data-compact='true'] .chatbot-helper { display: none; }
  @media (hover: hover) {
    .chatbot-close:hover, .chatbot-option:hover { background: #e8f4fc; border-color: #8fbdd5; }
    .chatbot-launcher:hover .chatbot-launcher-bubble { background: #e8f4fc; }
  }
  @media (min-width: 1024px) {
    .chatbot-widget { right: max(24px, env(safe-area-inset-right)); }
    .chatbot-widget[data-home='true']:not([data-open='true']) { bottom: -6px; }
    .chatbot-widget:not([data-home='true']):not([data-open='true']) { bottom: calc(88px + env(safe-area-inset-bottom)); }
    .chatbot-widget .chatbot-launcher { width: 112px; }
    .chatbot-launcher-character { height: 128px; }
    .chatbot-widget[data-home='true'] .chatbot-launcher-character { object-position: center bottom; }
    .chatbot-widget .chatbot-launcher-bubble { width: auto; padding-inline: 12px; font-size: 13px; }
  }
  @media (max-height: 480px) {
    .chatbot-header { padding: 8px 12px; }
    .chatbot-scroll { padding: 12px; }
    .chatbot-composer { padding: 8px 12px; }
    .chatbot-input-label, .chatbot-helper { display: none; }
  }
  @media (prefers-reduced-motion: reduce) {
    .chatbot-widget *, .chatbot-widget *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
  }
`;

const quickActions: Array<ChatOption & { iconSrc: string }> = [
  { id: 'create', label: 'Crear una web', iconSrc: '/chat/icons/create-web.png' },
  { id: 'prices', label: 'Orientar mi proyecto', iconSrc: '/chat/icons/prices.png' },
  { id: 'improve', label: 'Mejorar mi web', iconSrc: '/chat/icons/improve-web.png' },
  { id: 'hosting', label: 'Hosting y mantenimiento', iconSrc: '/chat/icons/hosting.png' },
];

const quickActionOptions: ChatOption[] = quickActions.map(({ id, label }) => ({ id, label }));

const createTypeOptions: ChatOption[] = [
  { id: 'from-scratch', label: 'Parto de cero' },
  { id: 'existing-web', label: 'Ya tengo una web' },
];

const createGoalOptions: ChatOption[] = [
  { id: 'be-found', label: 'Que me encuentren y contacten' },
  { id: 'explain', label: 'Explicar mejor lo que hago' },
  { id: 'sell', label: 'Vender mis productos o servicios' },
];

const priceTypeOptions: ChatOption[] = [
  { id: 'landing', label: 'Una landing page' },
  { id: 'corporate', label: 'Una web corporativa' },
  { id: 'store', label: 'Una tienda online' },
  { id: 'custom', label: 'Algo a medida' },
];

const improveOptions: ChatOption[] = [
  { id: 'design', label: 'Que se vea más profesional' },
  { id: 'leads', label: 'Conseguir más contactos' },
  { id: 'seo', label: 'Salir mejor en Google' },
  { id: 'unsure', label: 'No estoy seguro, necesito orientación' },
];

const hostingOptions: ChatOption[] = [
  { id: 'hosting-only', label: 'Solo hosting' },
  { id: 'maintenance', label: 'Mantenimiento' },
  { id: 'bundle', label: 'Hosting + mantenimiento' },
  { id: 'hosting-unsure', label: 'No sé qué necesito' },
];

const channelOptions: ChatOption[] = [
  { id: 'whatsapp', label: 'Por WhatsApp' },
  { id: 'email', label: 'Por email' },
];

const nextActionOptions: ChatOption[] = [
  { id: 'contact', label: 'Pedir orientación' },
  { id: 'whatsapp', label: 'Hablar por WhatsApp' },
  { id: 'projects', label: 'Ver proyectos' },
];

const priceActionOptions: ChatOption[] = [
  { id: 'contact', label: 'Quiero una orientación' },
  { id: 'whatsapp', label: 'Hablar por WhatsApp' },
  { id: 'projects', label: 'Ver proyectos' },
  { id: 'another-price', label: 'Ver otra opción' },
];

const afterLeadOptions: ChatOption[] = [
  { id: 'contact-form', label: 'Completar formulario' },
  { id: 'whatsapp', label: 'Hablar por WhatsApp' },
  { id: 'restart', label: 'Empezar de nuevo' },
];

const priceDetails: Record<ProjectType, { label: string }> = {
  landing: { label: 'una landing page' },
  corporate: { label: 'una web corporativa' },
  store: { label: 'una tienda online' },
  custom: { label: 'un proyecto a medida' },
};

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: 'assistant',
    text: '¡Hola! Te ayudo a encontrar lo que necesita tu negocio.',
  },
];

const normalizeText = (value: string) =>
  value
    .toLocaleLowerCase('es')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[¿?¡!.,;:()[\]{}"']/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\bxq\b/g, 'porque')
    .replace(/\bpq\b/g, 'porque')
    .replace(/\b(?:q|k)\b/g, 'que')
    .replace(/\bpa\b/g, 'para')
    .replace(/\b(?:tb|tmb)\b/g, 'tambien')
    .trim();

const editDistance = (left: string, right: string) => {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);

  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    let diagonal = previous[0];
    previous[0] = leftIndex;

    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const saved = previous[rightIndex];
      previous[rightIndex] = left[leftIndex - 1] === right[rightIndex - 1]
        ? diagonal
        : Math.min(diagonal, previous[rightIndex], previous[rightIndex - 1]) + 1;
      diagonal = saved;
    }
  }

  return previous[right.length];
};

const includesAny = (value: string, terms: string[]) => terms.some((term) => {
  const normalizedTerm = normalizeText(term);
  if (value.includes(normalizedTerm)) return true;

  const termWords = normalizedTerm.split(' ');
  if (termWords.length > 1) {
    const valueWords = value.split(' ');
    return valueWords.some((_, startIndex) => termWords.every((termWord, offset) => {
      const valueWord = valueWords[startIndex + offset];
      if (!valueWord) return false;
      if (valueWord === termWord) return true;
      const maxDistance = termWord.length >= 9 ? 2 : 1;
      return termWord.length >= 5
        && valueWord.length >= termWord.length - maxDistance
        && editDistance(valueWord, termWord) <= maxDistance;
    }));
  }

  if (normalizedTerm.length < 5) return false;

  return value.split(' ').some((word) =>
    word.length >= normalizedTerm.length - (normalizedTerm.length >= 9 ? 2 : 1)
      && editDistance(word, normalizedTerm) <= (normalizedTerm.length >= 9 ? 2 : 1),
  );
});

const isGreeting = (text: string) => /^(hola|buenas|buenos dias|buenas tardes|hey|ey)( |$)/.test(text);

const isThanks = (text: string) => includesAny(text, ['gracias', 'muchas gracias', 'te lo agradezco']) && text.length < 80;

const isRestartRequest = (text: string) => includesAny(text, [
  'empezar de nuevo', 'empezar otra vez', 'reiniciar', 'volver al inicio',
  'volver atras', 'empezar desde el principio', 'otra cosa',
]);

const isOrientationRequest = (text: string) => includesAny(text, [
  'puedes ayudarme', 'me puedes ayudar', 'me podeis ayudar', 'necesito ayuda',
  'ayudame', 'echame una mano', 'me echas una mano', 'orientacion',
  'asesoramiento', 'no se que hacer', 'no se por donde empezar',
  'no se por donde tirar', 'no tengo claro por donde', 'estoy perdido',
  'estoy perdida', 'no se que necesito', 'ayudame a elegir', 'orientame',
  'que me recomiendas', 'que me conviene', 'cual me conviene', 'cual seria mejor',
  'que opcion me va mejor', 'que deberia hacer', 'por donde empiezo', 'no se que web',
  'no se', 'ni idea',
]);

const isStrongOrientationRequest = (text: string) => includesAny(text, [
  'no se que hacer', 'no se por donde empezar', 'no se por donde tirar',
  'no tengo claro por donde', 'estoy perdido', 'estoy perdida',
  'no se que necesito', 'ayudame a elegir', 'orientame', 'que me recomiendas',
  'que me conviene', 'cual me conviene', 'cual seria mejor', 'por donde empiezo',
]);

const isQuestionLike = (value: string) => /[?¿]/.test(value) || includesAny(normalizeText(value), [
  'que ', 'como ', 'cuanto ', 'cual ', 'puedo ', 'podeis ', 'podeis', 'teneis ',
  'hay ', 'donde ', 'cuando ', 'por que ', 'para que ',
]);

const detectIntent = (value: string): Intent => {
  const text = normalizeText(value);

  // Se puntúan varias señales en vez de devolver la primera coincidencia.
  // Así una frase real como "quiero una web para vender y que me encuentren
  // en Google" sigue entendiendo que el punto de partida es crear una web.
  const scores: Record<Intent, number> = {
    create: 0,
    prices: 0,
    hosting: 0,
    improve: 0,
    projects: 0,
    faq: 0,
    contact: 0,
    unknown: 0,
  };
  const addScore = (intent: Intent, terms: string[], points: number) => {
    if (includesAny(text, terms)) scores[intent] += points;
  };

  // Preguntas definitorias: conviene responderlas, no mandar al usuario a un
  // formulario o a un flujo comercial.
  addScore('faq', [
    'que es el hosting', 'para que sirve el hosting', 'que significa seo', 'que es seo',
    'que es una landing', 'diferencia entre landing y corporativa', 'diferencia entre tipos de web',
    'que es un chatbot', 'como funciona este asistente', 'como funciona el asistente',
  ], 10);
  addScore('faq', [
    'cuanto tarda', 'cuanto tiempo', 'plazo', 'tarda', 'cuando estaria', 'cuando estaria lista',
    'pago', 'pagar', 'forma de pago', 'incluye', 'incluido', 'que lleva', 'como trabajais',
    'como funciona', 'proceso', 'pasos', 'que necesito para empezar', 'que necesitais',
    'tengo una duda', 'tengo dudas', 'una pregunta sobre', 'garantia', 'seguro',
    'wordpress', 'plataforma', 'tecnologia', 'con quien trabajais', 'donde trabajais',
    'trabajais online', 'que servicios teneis', 'que ofreceis', 'como os organizais',
    'puedo editar', 'puedo modificar', 'cambiar textos', 'subir fotos', 'yo mismo',
    'autogestionar', 'responsive', 'adaptada al movil', 'funciona en movil', 'tablet',
    'ordenador', 'que tengo que preparar', 'que tengo que enviar', 'contenido', 'materiales',
    'fotos', 'textos', 'logo', 'videollamada', 'reunion online',
  ], 6);

  addScore('hosting', [
    'hosting', 'alojamiento', 'mantenimiento', 'dominio', 'servidor', 'copias',
    'copias de seguridad', 'backup', 'actualizar', 'actualizacion', 'actualizaciones',
    'soporte tecnico', 'soporte', 'seguridad ssl', 'certificado ssl',
    'web online', 'publicar la web', 'web caida', 'se ha caido la web',
  ], 5);
  addScore('improve', [
    'quiero mejorar', 'necesito mejorar', 'mejorar mi web', 'redisenar', 'rediseño',
    'analizar mi web', 'auditar mi web', 'revisar mi web', 'arreglar mi web',
    'cambiar mi web', 'se ve mal', 'no funciona mi web', 'no me gusta mi web',
  ], 8);
  addScore('create', [
    'quiero crear', 'quiero una web', 'necesito una web', 'hacerme una web',
    'crear una pagina', 'hacer una pagina', 'montar una web', 'web nueva', 'desde cero',
    'me hagais una web', 'hagais una pagina', 'hacerme una pagina', 'tener una web',
  ], 8);
  addScore('contact', [
    'pedir presupuesto', 'presupuesto gratis', 'solicitar presupuesto', 'quiero presupuesto',
    'me gustaria presupuesto', 'necesito presupuesto', 'quiero una orientacion',
    'contactar', 'contacto', 'que me contacteis', 'que me escribais', 'hablar con vosotros',
    'hablar con una persona', 'hablar por whatsapp', 'me gustaria hablar', 'whatsapp', 'wasap', 'wsp',
    'correo', 'email', 'e mail', 'mandar un mensaje', 'llamadme', 'llamar', 'contratar',
    'empezar con vosotros',
  ], 8);
  addScore('projects', [
    'ver proyectos', 'ver ejemplos', 'portfolio', 'portafolio', 'trabajos', 'casos reales',
    'trabajos realizados', 'proyectos realizados', 'webs hechas', 'vuestras webs', 'muestras',
    'que proyectos', 'proyectos teneis', 'proyectos habeis', 'que habeis hecho', 'ensename webs',
    'muestrame webs', 'muéstrame', 'quiero ver webs', 'referencias', 'casos de estudio',
  ], 8);
  addScore('prices', [
    'precio', 'precios', 'cuanto cuesta', 'cuanto vale', 'coste', 'tarifa', 'euros',
    'presupuesto aproximado', 'presupuesto orientativo', 'que vale', 'cuanto sale',
    'que tipo de web', 'que web me recomiendas', 'me recomiendas', 'recomendais', 'no se que web',
    'no se que pagina', 'que pagina necesito', 'que me aconsejais', 'necesito consejo',
    'orientarme', 'asesorarme', 'me orientas', 'que me conviene', 'cual me conviene',
  ], 6);
  addScore('improve', [
    'mejorar', 'redise', 'optimizar', 'seo', 'google', 'posicion', 'posicionamiento',
    'cambiar mi web', 'arreglar mi web', 'mi pagina', 'mi web', 'web antigua',
    'web vieja', 'no funciona', 'va lenta', 'lenta', 'no me encuentran', 'no salgo en google',
    'no aparece en google', 'no posiciona', 'no me gusta', 'se ve mal', 'poco profesional',
    'se ve fea', 'feo', 'quiero cambiar', 'movil', 'responsive', 'no convierte',
    'no recibo contactos', 'no me escribe nadie', 'no vendo', 'auditoria', 'auditar',
    'conversiones', 'formularios', 'consultas', 'carga lenta', 'mas rapida',
    'renovar la web', 'modernizar la web', 'poner bonita la web', 'hacerla mas actual',
    'que se vea mejor', 'darle un cambio',
  ], 3);
  addScore('improve', [
    'tengo una web', 'ya tengo web', 'ya tengo una pagina', 'tengo una pagina',
  ], 2);
  addScore('create', [
    'crear', 'hacer una web', 'hacer web', 'montar una web', 'diseno web', 'disenais', 'diseno',
    'hacer paginas', 'pagina web', 'pagina nueva', 'web nueva', 'necesito una pagina',
    'quiero una pagina', 'tienda online', 'ecommerce', 'landing page', 'web corporativa',
    'sitio web', 'presencia online', 'presencia digital', 'que me encuentren', 'atraer clientes',
    'conseguir clientes', 'captar clientes', 'explicar mi negocio', 'mostrar mis servicios',
    'mostrar mis trabajos', 'ensenar mis trabajos', 'presentar mi negocio', 'mi portfolio',
    'tienda', 'tiendas', 'vender por internet', 'vender online', 'reservas', 'citas',
    'reservas online', 'citas online', 'catalogo', 'catalogo online', 'paginas web', 'webs para',
    'web para mi negocio', 'web para mi empresa', 'web para mi marca', 'web para mi proyecto',
    'crear un sitio', 'sitio para mi negocio', 'presencia en internet',
    'me gustaria tener una web', 'me gustaria una web', 'quiero que me hagais',
    'quiero que me hagan', 'que me hagais una pagina', 'que me hagan una pagina',
    'me hagan una web', 'me monten una web', 'me diseñen una web', 'me preparen una web',
  ], 3);

  const ranked = (Object.entries(scores) as Array<[Intent, number]>)
    .filter(([intent]) => intent !== 'unknown')
    .sort(([, leftScore], [, rightScore]) => rightScore - leftScore);
  const [bestIntent, bestScore] = ranked[0] || ['unknown', 0];
  return bestScore > 0 ? bestIntent : 'unknown';
};

const detectProjectType = (value: string): ProjectType | undefined => {
  const text = normalizeText(value);

  if (includesAny(text, ['tienda', 'ecommerce', 'e commerce', 'catalogo', 'productos', 'vender online', 'vender'])) return 'store';
  if (includesAny(text, ['landing', 'promocional', 'una sola pagina', 'campana', 'captacion', 'servicio concreto'])) return 'landing';
  if (includesAny(text, ['medida', 'personalizada', 'grande', 'app', 'aplicacion', 'plataforma', 'reservas', 'citas', 'funcionalidad'])) return 'custom';
  if (includesAny(text, ['corporativa', 'empresa', 'servicios', 'negocio', 'presentacion'])) return 'corporate';

  return undefined;
};

const detectChannel = (value: string): ContactChannel | undefined => {
  const text = normalizeText(value);

  if (includesAny(text, ['whatsapp', 'wasap', 'wsp', 'whats'])) return 'whatsapp';
  if (includesAny(text, ['email', 'e mail', 'correo', 'mail', '@', 'gmail', 'outlook'])) return 'email';
  return undefined;
};

const getOptionById = (options: ChatOption[], id: string) => options.find((option) => option.id === id);

const cleanCapturedName = (value: string) =>
  value.trim().replace(/^(?:me llamo|soy|mi nombre es)\s+/i, '');

const cleanCapturedBusiness = (value: string) =>
  value.trim().replace(/^(?:mi negocio se llama|mi empresa se llama|se llama)\s+/i, '');

const cleanCapturedContact = (value: string, channel?: ContactChannel) => {
  if (channel === 'email') {
    const email = value.match(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i)?.[0];
    return email || value.trim();
  }

  const phone = value.match(/[+\d][\d\s().-]{5,}/)?.[0];
  return phone ? phone.trim() : value.trim();
};

const isValidContact = (value: string, channel?: ContactChannel) =>
  channel === 'email'
    ? /^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/i.test(value)
    : /\d[\d\s().-]{5,}/.test(value);

export default function ChatbotLauncher({ isHome = false }: ChatbotLauncherProps) {
  const navigate = useNavigate();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const startMarkerRef = useRef<HTMLSpanElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const shouldRestoreFocusRef = useRef(false);
  const stickToBottomRef = useRef(true);
  const isComposingRef = useRef(false);
  const closeTimerRef = useRef<number | null>(null);
  const messageIdRef = useRef(2);
  const dataRef = useRef<ChatData>({});
  const responseTimerRef = useRef<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [step, setStep] = useState<ChatStep>('root');
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [currentOptions, setCurrentOptions] = useState<ChatOption[]>([]);
  const [data, setData] = useState<ChatData>({});
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAtPageStart, setIsAtPageStart] = useState(false);
  useScrollLock(isOpen);

  const updateChatData = (nextData: ChatData) => {
    dataRef.current = nextData;
    setData(nextData);
  };

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('icono-chat-state', { detail: { open: isOpen } }));
  }, [isOpen]);

  useLayoutEffect(() => {
    if (!isOpen && shouldRestoreFocusRef.current) {
      shouldRestoreFocusRef.current = false;
      const target = returnFocusRef.current;
      (target?.isConnected ? target : launcherRef.current)?.focus({ preventScroll: true });
    }
  }, [isOpen]);

  useEffect(() => {
    const marker = startMarkerRef.current;
    if (!isHome || !marker) return;
    const observer = new IntersectionObserver(([entry]) => setIsAtPageStart(entry.isIntersecting));
    observer.observe(marker);
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => () => {
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    if (responseTimerRef.current !== null) window.clearTimeout(responseTimerRef.current);
    window.dispatchEvent(new CustomEvent('icono-chat-state', { detail: { open: false } }));
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !event.defaultPrevented) {
        event.preventDefault();
        closeChat();
      }
      if (event.key === 'Tab' && panelRef.current) {
        const controls = Array.from<HTMLElement>(panelRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), a[href], [tabindex="0"]'))
          .filter(control => control.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && (document.activeElement === first || !panelRef.current.contains(document.activeElement))) {
          event.preventDefault();
          last?.focus({ preventScroll: true });
        } else if (!event.shiftKey && (document.activeElement === last || !panelRef.current.contains(document.activeElement))) {
          event.preventDefault();
          first?.focus({ preventScroll: true });
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Focus a control without summoning the virtual keyboard on opening.
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus({ preventScroll: true }));

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.cancelAnimationFrame(focusFrame);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && stickToBottomRef.current && scrollRef.current) {
      // Scroll only this region, never the page or an ancestor container.
      scrollRef.current.scrollTop = messages.length <= 2 && step === 'root' ? 0 : scrollRef.current.scrollHeight;
    }
  }, [currentOptions, isOpen, isTyping, messages, step]);

  useEffect(() => {
    if (!isOpen) return;
    const viewport = window.visualViewport;
    let frame = 0;
    const updateViewport = () => {
      const widget = widgetRef.current;
      if (!widget) return;
      const height = viewport?.height ?? window.innerHeight;
      const inset = Math.max(0, window.innerHeight - height - (viewport?.offsetTop ?? 0));
      widget.style.setProperty('--chatbot-viewport-height', height + 'px');
      widget.style.setProperty('--chatbot-keyboard-inset', inset + 'px');
      widget.dataset.compact = String(height <= 480);
      if (stickToBottomRef.current && scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    };
    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateViewport);
    };
    updateViewport();
    window.addEventListener('resize', scheduleUpdate);
    viewport?.addEventListener('resize', scheduleUpdate);
    viewport?.addEventListener('scroll', scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', scheduleUpdate);
      viewport?.removeEventListener('resize', scheduleUpdate);
      viewport?.removeEventListener('scroll', scheduleUpdate);
      widgetRef.current?.style.removeProperty('--chatbot-viewport-height');
      widgetRef.current?.style.removeProperty('--chatbot-keyboard-inset');
      widgetRef.current?.removeAttribute('data-compact');
    };
  }, [isOpen]);

  const addMessage = (role: ChatRole, text: string) => {
    const message: ChatMessage = { id: messageIdRef.current, role, text };
    messageIdRef.current += 1;
    setMessages((previous) => [...previous, message]);
  };

  const offerQuickActions = () => {
    setStep('root');
    setCurrentOptions(quickActionOptions);
  };

  const respond = (callback: () => void, delay = 1100) => {
    if (responseTimerRef.current !== null) window.clearTimeout(responseTimerRef.current);
    setCurrentOptions([]);
    setIsTyping(true);
    responseTimerRef.current = window.setTimeout(() => {
      setIsTyping(false);
      responseTimerRef.current = null;
      callback();
    }, delay);
  };

  const ask = (text: string, nextStep: ChatStep, options: ChatOption[] = []) => {
    addMessage('assistant', text);
    setStep(nextStep);
    setCurrentOptions(options);
  };

  const resetConversation = () => {
    if (responseTimerRef.current !== null) window.clearTimeout(responseTimerRef.current);
    responseTimerRef.current = null;
    setIsTyping(false);
    messageIdRef.current = 2;
    setMessages(initialMessages);
    setCurrentOptions([]);
    updateChatData({});
    setStep('root');
    setInputValue('');
    isComposingRef.current = false;
  };

  const closeChat = () => {
    if (closeTimerRef.current !== null) return;
    if (responseTimerRef.current !== null) window.clearTimeout(responseTimerRef.current);
    responseTimerRef.current = null;
    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      shouldRestoreFocusRef.current = true;
      setIsOpen(false);
      setIsClosing(false);
      closeTimerRef.current = null;
      resetConversation();
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 260);
  };

  const openChat = () => {
    if (isOpen) return;
    // Touch browsers may keep an unrelated page control as activeElement.
    // This button is the actual opener, regardless of the browser's focus policy.
    returnFocusRef.current = launcherRef.current;
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
    stickToBottomRef.current = true;
    setIsClosing(false);
    setIsOpen(true);
    respond(() => {
      addMessage('assistant', initialMessages[0].text);
      offerQuickActions();
    });
  };

  const openWhatsApp = (chatData = dataRef.current) => {
    const context = [
      chatData.projectLabel ? 'Me interesa ' + chatData.projectLabel : '',
      chatData.goal ? 'Objetivo: ' + chatData.goal : '',
      chatData.improvement ? 'Quiero mejorar: ' + chatData.improvement : '',
      chatData.hostingPlan ? 'Necesito: ' + chatData.hostingPlan : '',
    ].filter(Boolean).join('. ');
    const message = context
      ? 'Hola, vengo del asistente de Icono Studio. ' + context
      : 'Hola, vengo del asistente de Icono Studio y me gustaría pedir información.';

    window.open(siteConfig.whatsappHref + '?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
  };

  const savePrefillAndGoToContact = (chatData = dataRef.current) => {
    const needValue = chatData.projectType === 'store'
      ? 'tienda'
      : chatData.projectType === 'landing'
        ? 'landing'
        : chatData.improvement
          ? 'rediseño'
          : chatData.projectType === 'corporate'
            ? 'corporativa'
            : chatData.projectType === 'custom'
              ? 'no-claro'
              : 'corporativa';
    const needs = [
      chatData.projectLabel ? 'Interés: ' + chatData.projectLabel : '',
      chatData.startingPoint ? 'Punto de partida: ' + chatData.startingPoint : '',
      chatData.goal ? 'Objetivo: ' + chatData.goal : '',
      chatData.improvement ? 'Mejora que busca: ' + chatData.improvement : '',
      chatData.hostingPlan ? 'Servicio: ' + chatData.hostingPlan : '',
    ].filter(Boolean).join('. ');

    window.sessionStorage.setItem(CHAT_PREFILL_KEY, JSON.stringify({
      nombre: chatData.name || '',
      whatsapp: chatData.channel === 'whatsapp' ? chatData.contact || '' : '',
      email: chatData.channel === 'email' ? chatData.contact || '' : '',
      negocio: chatData.business || '',
      ciudad: '',
      necesidad: needValue,
      presupuesto: 'orientacion',
      mensaje: [needs, 'Solicitud iniciada desde el asistente web de Icono Studio.'].filter(Boolean).join(' '),
      privacidad: false,
    }));
    closeChat();
    navigate('/contacto');
  };

  const beginLeadCapture = (kind: CaptureKind, seed: ChatData = data) => {
    const nextData = { ...seed, captureKind: kind };
    updateChatData(nextData);
    setInputValue('');
    setCurrentOptions([]);
    ask(
      kind === 'estimate'
        ? 'Perfecto. Para preparar una orientación más útil, ¿cómo te llamas?'
        : 'Perfecto. Para orientarte bien, ¿cómo te llamas?',
      'captureName',
    );
  };

  const beginFlow = (intent: Intent) => {
    if (intent === 'create') {
      updateChatData({ captureKind: 'contact' });
      ask('Genial. Antes de nada: ¿partes de cero o ya tienes una web?', 'createType', createTypeOptions);
      return;
    }

    if (intent === 'prices') {
      updateChatData({});
      ask('Claro. ¿Qué tipo de página tienes en mente?', 'priceType', priceTypeOptions);
      return;
    }

    if (intent === 'improve') {
      updateChatData({ captureKind: 'contact' });
      ask('Vamos a localizar el punto clave. ¿Qué te gustaría mejorar primero?', 'improveGoal', improveOptions);
      return;
    }

    if (intent === 'hosting') {
      updateChatData({ captureKind: 'contact' });
      ask('Te lo resumo fácil. ¿Qué necesitas exactamente?', 'hostingPlan', hostingOptions);
      return;
    }

    if (intent === 'contact') {
      beginLeadCapture('contact', {});
    }
  };

  const getFaqReply = (value: string) => {
    const text = normalizeText(value);

    if (includesAny(text, ['que es un chatbot', 'como funciona este asistente', 'como funciona el asistente'])) {
      return 'Soy un asistente local de Icono Studio: entiendo distintas formas de pedir lo mismo, tolero erratas y te guío según lo que me cuentes. No necesitas aprender comandos ni escribir una frase exacta.';
    } else if (includesAny(text, ['que es el hosting', 'para que sirve el hosting'])) {
      return 'El hosting es el espacio donde vive tu web para que pueda abrirse online. Nos ocupamos de dejarlo configurado y cuidado para que tú no tengas que pelearte con la parte técnica.';
    } else if (includesAny(text, ['que significa seo', 'que es seo'])) {
      return 'SEO es el trabajo que ayuda a que tu web se entienda mejor y tenga más posibilidades de aparecer cuando alguien busca tus servicios. No es solo añadir palabras: también importan la estructura, la velocidad y la claridad.';
    } else if (includesAny(text, ['que es una landing', 'diferencia entre landing y corporativa', 'diferencia entre tipos de web'])) {
      return 'Una landing concentra toda la atención en una oferta o servicio concreto. Una web corporativa explica mejor quién eres, qué haces y cómo contactarte. Si vendes varios productos o servicios, una tienda o una estructura más completa puede encajar mejor.';
    } else if (includesAny(text, ['tiempo', 'plazo', 'tarda', 'cuando estaria', 'dias', 'semanas', 'entrega'])) {
      return 'El plazo depende del tipo de página y de lo clara que esté la información. Lo vemos contigo al principio y te damos un plan sencillo, sin sorpresas.';
    } else if (includesAny(text, ['pago', 'pagar', 'forma de pago', 'financiar'])) {
      return 'Te explicamos el alcance y la forma de trabajo antes de empezar. Si quieres, puedo orientarte o llevarte directamente a contacto.';
    } else if (includesAny(text, ['hosting', 'alojamiento']) && includesAny(text, ['incluye', 'incluido', 'que lleva', 'que viene'])) {
      return 'El hosting cubre el alojamiento para que tu web esté online, protegida y disponible. Te ayudamos a dejarlo configurado. El mantenimiento se ocupa de los cambios y revisiones habituales; podemos orientarte sobre si necesitas solo hosting o la opción conjunta.';
    } else if (includesAny(text, ['incluye', 'incluido', 'que lleva', 'que viene'])) {
      return 'Incluimos estructura, diseño, versión móvil y la puesta a punto para que tu negocio se entienda y sea fácil contactar contigo. Cada proyecto se ajusta a lo que necesitas.';
    } else if (includesAny(text, ['como trabajais', 'como funciona', 'proceso', 'pasos', 'empezar'])) {
      return 'Primero entendemos tu negocio y lo que quieres conseguir. Después te proponemos una estructura clara, la diseñamos contigo y dejamos todo preparado para que puedas recibir contactos.';
    } else if (includesAny(text, ['garantia', 'seguro', 'confianza'])) {
      return 'Trabajamos contigo con un alcance claro y próximos pasos concretos. Antes de empezar podrás resolver tus dudas y saber exactamente qué vamos a preparar.';
    } else if (includesAny(text, ['wordpress', 'plataforma', 'tecnologia'])) {
      return 'No tienes que decidir la parte técnica por tu cuenta. Te recomendamos la solución que encaje mejor con tu proyecto y te explicamos cómo quedará para que puedas usarla con tranquilidad.';
    } else if (includesAny(text, ['donde trabajais', 'trabajais online'])) {
      return 'Trabajamos online con negocios de toda España. Podemos conocer tu proyecto, enseñarte ejemplos y avanzar contigo aunque no estés en Valencia.';
    } else if (includesAny(text, ['que servicios teneis', 'que ofreceis'])) {
      return 'Creamos webs nuevas, mejoramos páginas que ya existen y ayudamos con SEO, hosting y mantenimiento. Si me cuentas qué necesitas, te digo por dónde empezaría yo.';
    } else if (includesAny(text, ['puedo editar', 'puedo modificar', 'cambiar textos', 'subir fotos', 'yo mismo', 'autogestionar'])) {
      return 'Te explicamos cómo quedará todo para que puedas usarlo con tranquilidad. Si necesitas que nos ocupemos de los cambios habituales, también podemos ayudarte con el mantenimiento.';
    } else if (includesAny(text, ['responsive', 'adaptada al movil', 'funciona en movil', 'tablet', 'ordenador', 'version movil'])) {
      return 'Sí, pensamos la web para que se entienda y funcione bien en móvil, tablet y ordenador. Revisamos especialmente los textos, los botones y el formulario para que contactar sea sencillo.';
    } else if (includesAny(text, ['contenido', 'materiales', 'fotos', 'textos', 'logo', 'que tengo que preparar', 'que tengo que enviar'])) {
      return 'Al principio te pedimos solo lo necesario para entender tu negocio. Te ayudamos a ordenar los textos, servicios e imágenes para que la web no se haga pesada ni difícil de preparar.';
    } else if (includesAny(text, ['videollamada', 'reunion online', 'reuniones', 'desde otra ciudad'])) {
      return 'Podemos conocer tu proyecto online y avanzar contigo aunque estés en otra ciudad. Lo importante es entender bien tu negocio y dejar claros los siguientes pasos.';
    }

    return 'Claro, cuéntame qué necesitas con tus palabras. También puedo ayudarte con una web nueva, una mejora, proyectos o el cuidado de tu web.';
  };

  const answerFaq = (value: string) => {
    addMessage('assistant', getFaqReply(value));
    offerQuickActions();
  };

  const handleCaptureQuestion = (value: string) => {
    const captureStep = step;
    const intent = detectIntent(value);
    const reply = intent === 'faq'
      ? getFaqReply(value)
      : intent === 'projects'
        ? 'Sí, también puedo enseñarte ejemplos reales de nuestro trabajo.'
        : 'Claro, te respondo encantado y seguimos con lo que estábamos preparando.';
    const prompt = captureStep === 'captureName'
      ? 'Y para seguir, ¿cómo te llamas?'
      : captureStep === 'captureBusiness'
        ? 'Y para preparar la orientación, ¿cómo se llama tu negocio o proyecto?'
        : data.channel === 'email'
          ? 'Cuando quieras, dime el email al que te escribimos.'
          : 'Cuando quieras, dime tu número de WhatsApp.';

    addMessage('user', value);
    respond(() => ask(reply + ' ' + prompt, captureStep));
  };

  const handleQuickAction = (action: ChatOption) => {
    if (isTyping) return;
    addMessage('user', action.label);
    respond(() => beginFlow(action.id as Intent));
  };

  const applyOption = (option: ChatOption) => {
    if (step === 'createType') {
      const nextData = { ...data, startingPoint: option.label };
      updateChatData(nextData);
      ask(
        option.id === 'existing-web'
          ? 'Perfecto, entonces podemos mejorar lo que ya tienes sin empezar de nuevo. ¿Qué te gustaría conseguir principalmente con la web?'
          : 'Genial, partimos de cero. ¿Qué te gustaría conseguir principalmente con la web?',
        'createGoal',
        createGoalOptions,
      );
      return;
    }

    if (step === 'createGoal') {
      const nextData = { ...data, goal: option.label };
      updateChatData(nextData);
      ask(
        'Entendido. Entonces buscas ' + option.label.toLocaleLowerCase('es') + '. Con eso ya puedo orientarte sin marearte. ¿Qué prefieres hacer ahora?',
        'nextAction',
        nextActionOptions,
      );
      return;
    }

    if (step === 'improveGoal') {
      const nextData = { ...data, improvement: option.label };
      updateChatData(nextData);
      ask(
        option.id === 'unsure'
          ? 'No pasa nada. Lo revisamos juntos y encontramos el punto que más puede ayudarte. ¿Qué prefieres hacer ahora?'
          : 'Entendido. Vamos a centrarnos en que ' + option.label.toLocaleLowerCase('es') + '. ¿Qué prefieres hacer ahora?',
        'nextAction',
        nextActionOptions,
      );
      return;
    }

    if (step === 'priceType') {
      const projectType = option.id as ProjectType;
      const price = priceDetails[projectType];
      const nextData = { ...data, captureKind: 'estimate' as CaptureKind, projectType, projectLabel: price.label };
      updateChatData(nextData);
      ask(
        'Para ' + price.label + ', la propuesta depende del alcance y de lo que necesite tu negocio. Puedo recoger unos datos y te lo explicamos sin compromiso. ¿Quieres que lo hablemos?',
        'priceAction',
        priceActionOptions,
      );
      return;
    }

    if (step === 'priceAction') {
      if (option.id === 'contact') {
        beginLeadCapture('estimate', data);
      } else if (option.id === 'whatsapp') {
        addMessage('assistant', 'Te abro WhatsApp para que puedas hablar con nosotros directamente.');
        openWhatsApp(data);
      } else if (option.id === 'projects') {
        addMessage('assistant', 'Te llevo a los proyectos para que puedas ver ejemplos reales.');
        navigate('/proyectos');
      } else {
        ask('Claro. ¿Qué tipo de página quieres comparar?', 'priceType', priceTypeOptions);
      }
      return;
    }

    if (step === 'hostingPlan') {
      const hostingText: Record<string, string> = {
        'hosting-only': 'El hosting es la base para que tu web esté online, protegida y disponible. Te ayudamos a dejarlo configurado.',
        maintenance: 'Con el mantenimiento nos ocupamos de cambios y revisiones para que no tengas que estar pendiente de la parte técnica.',
        bundle: 'La opción conjunta deja cubiertos el alojamiento y el cuidado habitual de la web, sin complicarte con gestiones técnicas.',
        'hosting-unsure': 'Podemos recomendarte la opción adecuada después de conocer tu web y lo que quieres delegar.',
      };
      const nextData = { ...data, hostingPlan: option.label };
      updateChatData(nextData);
      ask(hostingText[option.id], 'nextAction', nextActionOptions);
      return;
    }

    if (step === 'nextAction') {
      if (option.id === 'contact') {
        beginLeadCapture(data.captureKind || 'contact', data);
      } else if (option.id === 'whatsapp') {
        addMessage('assistant', 'Te abro WhatsApp para que puedas hablar con nosotros directamente.');
        openWhatsApp(data);
      } else {
        addMessage('assistant', 'Te llevo a los proyectos para que puedas ver ejemplos reales.');
        navigate('/proyectos');
      }
      return;
    }

    if (step === 'captureChannel') {
      const channel = option.id as ContactChannel;
      const nextData = { ...data, channel };
      updateChatData(nextData);
      ask(
        channel === 'whatsapp'
          ? '¿Cuál es tu número de WhatsApp?'
          : '¿A qué email te escribimos?',
        'captureContact',
      );
      return;
    }

    if (step === 'afterLead') {
      if (option.id === 'contact-form') {
        addMessage('assistant', 'Te llevo al formulario con lo que ya me has contado para que no tengas que repetirlo.');
        savePrefillAndGoToContact(data);
      } else if (option.id === 'whatsapp') {
        addMessage('assistant', 'Te abro WhatsApp con el contexto de lo que hemos hablado.');
        openWhatsApp(data);
      }
    }
  };

  const handleOption = (option: ChatOption) => {
    if (isTyping) return;
    if (option.id === 'restart') {
      resetConversation();
      return;
    }

    addMessage('user', option.label);
    if (step === 'root' && ['create', 'prices', 'improve', 'hosting'].includes(option.id)) {
      respond(() => beginFlow(option.id as Intent));
      return;
    }

    respond(() => applyOption(option));
  };

  const finishCapture = (value: string) => {
    const nextData = { ...dataRef.current, contact: value };
    updateChatData(nextData);
    addMessage('assistant', 'Listo, lo tengo. ¿Quieres completar el formulario o prefieres hablar directamente con nosotros?');
    setStep('afterLead');
    setCurrentOptions(afterLeadOptions);
  };

  const handleExpectedText = (value: string) => {
    const text = normalizeText(value);

    if (step !== 'root' && isRestartRequest(text)) {
      addMessage('user', value);
      respond(() => {
        resetConversation();
        addMessage('assistant', 'Claro, borrón y cuenta nueva. ¿Qué te gustaría hacer?');
        offerQuickActions();
      });
      return true;
    }

    if (['captureName', 'captureBusiness', 'captureContact'].includes(step) && isQuestionLike(value)) {
      handleCaptureQuestion(value);
      return true;
    }

    if (step === 'createType') {
      const optionId = includesAny(text, [
        'ya tengo', 'tengo una web', 'web actual', 'web existente', 'pagina actual',
        'mejorar la que tengo', 'ya esta hecha', 'ya esta montada',
      ])
        ? 'existing-web'
        : includesAny(text, [
          'cero', 'nueva', 'desde el principio', 'desde cero', 'no tengo web',
          'no tengo pagina', 'empezar', 'partir de cero', 'todavia no', 'aun no',
          'quiero una web', 'necesito una web', 'hacer una web', 'crear una web',
          'hacerme una web', 'montar una web', 'una web nueva', 'no se',
          'no estoy seguro', 'no estoy segura', 'no lo tengo claro',
        ])
          ? 'from-scratch'
          : undefined;
      const option = optionId ? getOptionById(createTypeOptions, optionId) : undefined;
      if (option) {
        handleOption(option);
        return true;
      }
    }

    if (step === 'createGoal') {
      const optionId = includesAny(text, [
        'vender', 'venta', 'comprar', 'producto', 'tienda', 'pedido', 'pedidos',
        'reservar', 'reservas', 'cita', 'citas', 'servicios online',
      ])
        ? 'sell'
        : includesAny(text, [
          'encontr', 'visib', 'google', 'contact', 'clientes', 'llamad', 'whatsapp',
          'llamen', 'que me contacten', 'recibir contactos', 'captar', 'atraer',
          'conseguir', 'reservar', 'que me conozcan',
        ])
          ? 'be-found'
          : includesAny(text, [
            'explicar', 'presentar', 'contar', 'mostrar', 'informar', 'que entiendan',
            'dar a conocer', 'quien soy', 'mis servicios',
          ])
            ? 'explain'
            : undefined;
      const option = optionId ? getOptionById(createGoalOptions, optionId) : undefined;
      if (option) {
        handleOption(option);
        return true;
      }
    }

    if (step === 'improveGoal') {
      const optionId = includesAny(text, ['google', 'seo', 'aparecer'])
        ? 'seo'
        : includesAny(text, ['contact', 'clientes', 'conseguir', 'captar', 'ventas', 'llamad', 'whatsapp', 'conversion', 'mas clientes', 'reservas', 'citas', 'mensajes', 'formularios', 'consultas'])
          ? 'leads'
          : includesAny(text, ['diseno', 'bonita', 'profesional', 'aspecto', 'estetica', 'visual', 'fea', 'cutre', 'colores', 'movil', 'responsive', 'rapida', 'lenta', 'carga', 'estructura', 'textos', 'contenido', 'moderna'])
            ? 'design'
            : includesAny(text, ['no se', 'no tengo claro', 'no estoy seguro', 'no estoy segura', 'ni idea', 'orientar', 'todo', 'ayuda'])
              ? 'unsure'
            : undefined;
      const option = optionId ? getOptionById(improveOptions, optionId) : undefined;
      if (option) {
        handleOption(option);
        return true;
      }
    }

    if (step === 'hostingPlan') {
      const optionId = includesAny(text, ['no se', 'no tengo claro', 'no estoy seguro', 'no tengo ni idea', 'ni idea', 'orientar', 'recomienda', 'que necesito'])
        ? 'hosting-unsure'
        : includesAny(text, ['hosting y mantenimiento', 'alojamiento y mantenimiento', 'pack', 'junto', 'ambos', 'las dos', 'todo incluido'])
          ? 'bundle'
          : includesAny(text, ['solo hosting', 'solo alojamiento', 'alojamiento', 'dominio', 'servidor'])
            ? 'hosting-only'
            : includesAny(text, ['mantenimiento', 'cambios', 'actualizar', 'revisiones', 'soporte'])
              ? 'maintenance'
              : undefined;
      const option = optionId ? getOptionById(hostingOptions, optionId) : undefined;
      if (option) {
        handleOption(option);
        return true;
      }
    }

    if (step === 'nextAction' || step === 'priceAction') {
  const optionId = includesAny(text, ['whatsapp', 'wasap', 'wsp', 'whats'])
        ? 'whatsapp'
        : includesAny(text, ['proyecto', 'ver web', 'ver webs', 'ejemplo', 'portfolio', 'portafolio', 'muestra', 'trabajos'])
          ? 'projects'
          : includesAny(text, ['presupuesto', 'contact', 'formulario', 'contratar', 'quiero hacerlo', 'adelante', 'hablar'])
            ? 'contact'
            : step === 'priceAction' && includesAny(text, ['otra', 'comparar', 'diferente', 'distinta'])
              ? 'another-price'
            : undefined;
      const option = optionId ? getOptionById(step === 'priceAction' ? priceActionOptions : nextActionOptions, optionId) : undefined;
      if (option) {
        handleOption(option);
        return true;
      }
    }

    if (step === 'captureName') {
      const nextData = { ...data, name: cleanCapturedName(value) };
      updateChatData(nextData);
      addMessage('user', value);
      respond(() => ask('Encantado, ' + nextData.name + '. ¿Cómo se llama tu negocio o proyecto?', 'captureBusiness'));
      return true;
    }

    if (step === 'captureBusiness') {
      const nextData = { ...data, business: cleanCapturedBusiness(value) };
      updateChatData(nextData);
      addMessage('user', value);
      respond(() => ask(
        'Perfecto, ya tengo lo básico para orientarte. ¿Qué te viene mejor ahora: completar el formulario o hablar por WhatsApp?',
        'afterLead',
        afterLeadOptions,
      ));
      return true;
    }

    if (step === 'captureContact') {
      const contact = cleanCapturedContact(value, data.channel);
      if (!isValidContact(contact, data.channel)) {
        addMessage('user', value);
        respond(() => ask(
          data.channel === 'email'
            ? 'Creo que el email se ha quedado a medias. Escríbelo con un formato parecido a nombre@dominio.com y seguimos.'
            : 'Para no equivocarnos, dime un número de WhatsApp con al menos seis cifras y seguimos.',
          'captureContact',
        ));
        return true;
      }
      addMessage('user', value);
      respond(() => finishCapture(contact));
      return true;
    }

    if (step === 'afterLead') {
      const optionId = includesAny(text, ['whatsapp', 'wasap', 'wsp', 'whats'])
        ? 'whatsapp'
        : includesAny(text, ['formulario', 'rellenar', 'completar', 'enviar datos', 'seguir'])
          ? 'contact-form'
          : includesAny(text, ['empezar de nuevo', 'reiniciar', 'otra pregunta'])
            ? 'restart'
            : undefined;
      const option = optionId ? getOptionById(afterLeadOptions, optionId) : undefined;
      if (option) {
        handleOption(option);
        return true;
      }
    }

    if (step === 'priceType') {
      const projectType = detectProjectType(value);
      if (projectType) {
        const option = getOptionById(priceTypeOptions, projectType);
        if (option) {
          handleOption(option);
          return true;
        }
      }
    }

    if (step === 'captureChannel') {
      const channel = detectChannel(value);
      if (channel) {
        const option = getOptionById(channelOptions, channel);
        if (option) {
          handleOption(option);
          return true;
        }
      }
    }

    return false;
  };

  const processFreeText = (value: string) => {
    const text = normalizeText(value);
    const intent = detectIntent(value);

    // Una frase de desorientación debe abrir una conversación guiada, aunque
    // también mencione "mi página" y eso pueda parecer una mejora.
    if (isStrongOrientationRequest(text) && intent !== 'hosting' && intent !== 'faq') {
      addMessage('assistant', 'Claro. No hace falta que sepas el nombre de lo que necesitas: cuéntame qué te gustaría conseguir y te propongo el camino más sencillo.');
      setStep('createType');
      setCurrentOptions(createTypeOptions);
      return;
    }

    if (intent === 'faq') {
      answerFaq(value);
      return;
    }

    if (intent === 'unknown' && isGreeting(text)) {
      addMessage('assistant', '¡Hola! Qué bien verte por aquí. Cuéntame qué te gustaría conseguir con tu web y lo vemos juntos.');
      offerQuickActions();
      return;
    }

    if (intent === 'unknown' && isThanks(text)) {
      addMessage('assistant', '¡A ti! Cuando quieras, seguimos. Puedo ayudarte a crear, mejorar o cuidar tu web.');
      offerQuickActions();
      return;
    }

    if (intent === 'unknown' && isOrientationRequest(text)) {
      addMessage('assistant', 'Claro. No hace falta que sepas el nombre de lo que necesitas: cuéntame qué te gustaría conseguir y te propongo el camino más sencillo.');
      setStep('createType');
      setCurrentOptions(createTypeOptions);
      return;
    }

    if (intent === 'unknown' && includesAny(text, [
      'quien eres', 'quien sois', 'que haces', 'que haceis', 'que ofreceis',
      'en que podeis ayudar', 'para que sirve', 'como me podeis ayudar',
    ])) {
      addMessage('assistant', 'Soy el asistente web de Icono Studio. Te ayudo a aclarar qué necesita tu negocio, enseñarte ejemplos y poner en marcha el siguiente paso sin tecnicismos.');
      offerQuickActions();
      return;
    }

    if (intent === 'unknown' && includesAny(text, [
      'no se por donde empezar', 'no tengo ni idea', 'estoy perdido', 'estoy perdida',
      'no lo tengo claro', 'no se que necesito', 'no se que hacer', 'no se que pagina',
      'ayudame a elegir', 'orientame', 'que me recomendais', 'que me aconsejais',
    ])) {
      addMessage('assistant', 'No pasa nada, para eso estoy. Cuéntame primero si quieres una web nueva o si ya tienes una que quieras mejorar, y te voy guiando paso a paso.');
      setStep('createType');
      setCurrentOptions(createTypeOptions);
      return;
    }

    if (intent === 'unknown' && includesAny(text, [
      'tengo un negocio', 'tengo una', 'tengo un', 'mi negocio', 'soy ',
      'trabajo como', 'me dedico a', 'ofrezco ',
    ])) {
      addMessage('assistant', 'Perfecto, eso me ayuda a situarme. ¿Qué te gustaría conseguir principalmente con tu web?');
      setStep('createGoal');
      setCurrentOptions(createGoalOptions);
      return;
    }

    if (intent === 'unknown' && includesAny(text, ['vale', 'perfecto', 'genial', 'ok', 'okay'])) {
      addMessage('assistant', 'Perfecto. Cuando quieras, cuéntame qué necesitas y lo vamos aterrizando juntos.');
      offerQuickActions();
      return;
    }

    if (intent === 'unknown' && includesAny(text, [
      'no me entiendes', 'no entiendes', 'no me reconoce', 'no reconoce',
      'no sabes responder', 'no sabes', 'no funciona el chat', 'no funciona esto',
    ])) {
      addMessage('assistant', 'Tienes razón, vamos a hacerlo más sencillo. Escríbeme qué quieres conseguir, aunque sea con tus palabras, por ejemplo: “quiero que me encuentren”, “ya tengo web y va lenta” o “necesito vender online”.');
      offerQuickActions();
      return;
    }

    if (intent === 'unknown') {
      addMessage('assistant', 'Te entiendo. Para no darte una respuesta genérica, dime qué quieres conseguir: ¿una web nueva, mejorar la que ya tienes, ver ejemplos o ayuda con el mantenimiento?');
      offerQuickActions();
    } else if (intent === 'projects') {
      addMessage('assistant', 'Te llevo a los proyectos para que puedas ver ejemplos reales.');
      navigate('/proyectos');
    } else {
      beginFlow(intent);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isTyping || isClosing || isComposingRef.current) return;
    const value = inputValue.trim();
    if (!value) return;

    setInputValue('');
    stickToBottomRef.current = true;
    inputRef.current?.focus({ preventScroll: true });

    if (handleExpectedText(value)) return;

    addMessage('user', value);
    respond(() => processFreeText(value));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const inputPlaceholder = step === 'captureName'
    ? 'Tu nombre...'
    : step === 'captureBusiness'
      ? 'Nombre de tu negocio...'
      : step === 'captureContact'
        ? data.channel === 'email'
          ? 'Tu email...'
          : 'Tu WhatsApp...'
        : 'Escribe tu mensaje...';
  const showConversation = messages.length > 1 || isTyping || currentOptions.length > 0;
  const inputLabel = step === 'captureName'
    ? 'Tu nombre'
    : step === 'captureBusiness'
      ? 'Tu negocio o proyecto'
      : step === 'captureContact'
        ? data.channel === 'email' ? 'Tu email' : 'Tu número de WhatsApp'
        : 'Tu mensaje';
  const selectOption = (option: ChatOption, quick = false) => {
    if (isTyping || isClosing) return;
    stickToBottomRef.current = true;
    // Options disappear while responding: retain keyboard focus in the panel.
    scrollRef.current?.focus({ preventScroll: true });
    if (quick) handleQuickAction(option);
    else handleOption(option);
  };

  return (
    <>
    <style>{chatbotStyles}</style>
    {isOpen && <div className="chatbot-backdrop" aria-hidden="true" onClick={closeChat} />}
    {isHome && <span ref={startMarkerRef} className="chatbot-start-marker" aria-hidden="true" />}
    <div ref={widgetRef} className="chatbot-widget" data-open={isOpen} data-home={isHome}>
      {isOpen && (
        <div
          ref={panelRef}
          id="icono-chat-panel"
          className={'chatbot-panel ' + (isClosing ? 'chatbot-panel-exit' : 'chatbot-panel-enter')}
          role="dialog"
          aria-modal="true"
          aria-labelledby="icono-chat-title"
          aria-describedby="icono-chat-helper"
          onPointerDown={(event) => event.stopPropagation()}
        >
          <div className="chatbot-header">
            <div className="chatbot-avatar">
              <img src="/chat/personaje-avatar.png" alt="" width={44} height={44} />
            </div>
            <div className="chatbot-heading">
              <h2 id="icono-chat-title">Icono Studio</h2>
              <p>Tu asistente web</p>
            </div>
            <button ref={closeButtonRef} type="button" onClick={closeChat} className="chatbot-close" aria-label="Cerrar asistente">
              <X size={20} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="chatbot-scroll"
            tabIndex={0}
            role="region"
            aria-label="Historial y opciones del asistente"
            onScroll={(event) => {
              const region = event.currentTarget;
              stickToBottomRef.current = region.scrollHeight - region.scrollTop - region.clientHeight < 80;
            }}
          >
            {!showConversation ? (
              <>
                <p className="chatbot-message">{initialMessages[0].text}</p>
                <div className="chatbot-options" role="group" aria-label="Acciones rápidas">
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      type="button"
                      onClick={() => selectOption(action, true)}
                      disabled={isTyping || isClosing}
                      className="chatbot-option"
                    >
                      <img src={action.iconSrc} alt="" width={28} height={28} />
                      <span>{action.label}</span>
                      <ChevronRight size={18} strokeWidth={1.8} aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
              <div className="chatbot-log" role="log" aria-live="polite" aria-relevant="additions text" aria-label="Conversación con el asistente">
                {messages.slice(1).map((message) => (
                  <div key={message.id} className={'chatbot-message-row chatbot-message-row--' + message.role + ' chatbot-message-in chatbot-message-in--' + message.role}>
                    <p className="chatbot-message">
                      <span className="sr-only">{message.role === 'user' ? 'Tú: ' : 'Icono Studio: '}</span>
                      {message.text}
                    </p>
                  </div>
                ))}
              </div>
                {currentOptions.length > 0 && (
                  <div className="chatbot-options" role="group" aria-label="Opciones para continuar">
                    {currentOptions.map((option, index) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => selectOption(option)}
                        disabled={isTyping || isClosing}
                        style={{ animationDelay: `${index * 70}ms` }}
                        className="chatbot-option chatbot-option-in"
                      >
                        {step === 'root' && quickActions.find((action) => action.id === option.id) && (
                          <img src={quickActions.find((action) => action.id === option.id)!.iconSrc} alt="" width={28} height={28} />
                        )}
                        <span>{option.label}</span>
                        <ChevronRight size={18} strokeWidth={1.8} aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                )}
                {isTyping && (
                  <div className="chatbot-typing" aria-hidden="true">
                    <span className="chatbot-typing-dot" />
                    <span className="chatbot-typing-dot chatbot-typing-dot--delay-1" />
                    <span className="chatbot-typing-dot chatbot-typing-dot--delay-2" />
                  </div>
                )}
              </>
            )}
            <span className="sr-only" role="status">{isTyping ? 'El asistente está escribiendo.' : ''}</span>
          </div>

          <form onSubmit={handleSubmit} className="chatbot-composer" noValidate>
            <label htmlFor="icono-chat-input" className="chatbot-input-label">{inputLabel}</label>
            <div className="chatbot-input-row">
            <input
              ref={inputRef}
              id="icono-chat-input"
              value={inputValue}
              onChange={handleInputChange}
              onCompositionStart={() => { isComposingRef.current = true; }}
              onCompositionEnd={() => { isComposingRef.current = false; }}
              placeholder={inputPlaceholder}
              type={step === 'captureContact' ? data.channel === 'email' ? 'email' : 'tel' : 'text'}
              inputMode={step === 'captureContact' ? data.channel === 'email' ? 'email' : 'tel' : 'text'}
              autoComplete={step === 'captureName' ? 'given-name' : step === 'captureBusiness' ? 'organization' : step === 'captureContact' ? data.channel === 'email' ? 'email' : 'tel' : 'off'}
              enterKeyHint="send"
              maxLength={2000}
              aria-describedby="icono-chat-helper"
            />
            <button
              type="submit"
              disabled={isTyping || isClosing || !inputValue.trim()}
              className="chatbot-send-button"
              aria-label="Enviar mensaje"
            >
              <Send size={18} strokeWidth={1.8} className="chatbot-send-icon" aria-hidden="true" />
            </button>
            </div>
            <p id="icono-chat-helper" className="chatbot-helper">Asistente guiado. Elige una opción o escribe tu consulta.</p>
          </form>

        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={openChat}
        hidden={isOpen}
        className="chatbot-launcher"
        aria-label="Abrir asistente web"
        aria-expanded={isOpen}
        aria-controls={isOpen ? 'icono-chat-panel' : undefined}
        aria-haspopup="dialog"
      >
        {isHome && isAtPageStart && <span className="chatbot-launcher-bubble" aria-hidden="true">¿Hablamos?</span>}
        <img src="/chat/personaje.png" alt="" loading="eager" decoding="async" width={112} height={128} className="chatbot-character-enter chatbot-launcher-character" />
        <span className="chatbot-launcher-mobile" aria-hidden="true">
          <img src="/chat/personaje-avatar.png" alt="" width={72} height={72} decoding="async" />
        </span>
      </button>
    </div>
    </>
  );
}
