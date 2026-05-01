import { siteConfig } from './site';

export type ConsentState = 'granted' | 'denied';

type Primitive = string | number | boolean;
type EventParams = Record<string, Primitive | undefined>;
type LeadFormValues = Record<string, string | boolean | undefined>;

interface AttributionState {
  firstLandingPath: string;
  firstLandingUrl: string;
  firstReferrer: string;
  firstSeenAt: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmId: string;
  utmTerm: string;
  utmContent: string;
  gclid: string;
  gbraid: string;
  wbraid: string;
  fbclid: string;
  msclkid: string;
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const consentStorageKey = 'icono_cookie_consent_v1';
const attributionStorageKey = 'icono_attribution_v1';

const attributionQueryMap = {
  utmSource: 'utm_source',
  utmMedium: 'utm_medium',
  utmCampaign: 'utm_campaign',
  utmId: 'utm_id',
  utmTerm: 'utm_term',
  utmContent: 'utm_content',
  gclid: 'gclid',
  gbraid: 'gbraid',
  wbraid: 'wbraid',
  fbclid: 'fbclid',
  msclkid: 'msclkid',
} as const;

const isBrowser = () => typeof window !== 'undefined';

const ensureDataLayer = () => {
  if (!isBrowser()) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
};

const sanitizeParams = (params: EventParams = {}) =>
  Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== '')
  );

const pushDataLayer = (event: string, params: EventParams = {}) => {
  if (!isBrowser()) {
    return;
  }

  ensureDataLayer();
  window.dataLayer.push({
    event,
    ...sanitizeParams(params),
  });
};

const sendGtagEvent = (eventName: string, params: EventParams = {}) => {
  if (!isBrowser() || typeof window.gtag !== 'function' || !hasMeasurementConsent()) {
    return;
  }

  window.gtag('event', eventName, sanitizeParams(params));
};

const readJsonStorage = <T,>(key: string): T | null => {
  if (!isBrowser()) {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};

const writeJsonStorage = (key: string, value: unknown) => {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors silently.
  }
};

const getConsentPayload = (state: ConsentState) => ({
  ad_storage: state,
  analytics_storage: state,
  ad_user_data: state,
  ad_personalization: state,
});

const getDefaultAttributionState = (): AttributionState => ({
  firstLandingPath: '',
  firstLandingUrl: '',
  firstReferrer: '',
  firstSeenAt: '',
  utmSource: '',
  utmMedium: '',
  utmCampaign: '',
  utmId: '',
  utmTerm: '',
  utmContent: '',
  gclid: '',
  gbraid: '',
  wbraid: '',
  fbclid: '',
  msclkid: '',
});

export const getConsentState = (): ConsentState | null => {
  if (!isBrowser()) {
    return null;
  }

  try {
    const storedValue = window.localStorage.getItem(consentStorageKey);
    if (storedValue === 'granted' || storedValue === 'denied') {
      return storedValue;
    }
  } catch {
    return null;
  }

  return null;
};

export const hasMeasurementConsent = () => getConsentState() === 'granted';

export const updateConsentState = (state: ConsentState) => {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.setItem(consentStorageKey, state);
  } catch {
    // Ignore storage errors silently.
  }

  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', getConsentPayload(state));
  }

  pushDataLayer('icono_consent_update', {
    consent_state: state,
  });
};

export const captureAttribution = () => {
  if (!isBrowser()) {
    return getDefaultAttributionState();
  }

  const url = new URL(window.location.href);
  const query = url.searchParams;
  const currentPath = `${url.pathname}${url.search}${url.hash}`;
  const stored = readJsonStorage<AttributionState>(attributionStorageKey);
  const hasCampaignParams = Object.values(attributionQueryMap).some((key) => query.get(key));
  const nextState =
    stored && !hasCampaignParams ? { ...stored } : getDefaultAttributionState();

  if (!nextState.firstSeenAt) {
    nextState.firstSeenAt = new Date().toISOString();
    nextState.firstLandingPath = currentPath;
    nextState.firstLandingUrl = url.href;
    nextState.firstReferrer = document.referrer || '';
  }

  Object.entries(attributionQueryMap).forEach(([stateKey, queryKey]) => {
    const value = query.get(queryKey);
    if (value) {
      nextState[stateKey as keyof AttributionState] = value;
    }
  });

  writeJsonStorage(attributionStorageKey, nextState);
  return nextState;
};

export const getAttributionState = () => readJsonStorage<AttributionState>(attributionStorageKey);

const getEventContext = () => {
  const attribution = captureAttribution();

  return sanitizeParams({
    page_path: isBrowser() ? window.location.pathname : undefined,
    page_location: isBrowser() ? window.location.href : undefined,
    page_title: isBrowser() ? document.title : undefined,
    page_hostname: siteConfig.url.replace(/^https?:\/\//, ''),
    landing_path: attribution.firstLandingPath,
    landing_url: attribution.firstLandingUrl,
    first_referrer: attribution.firstReferrer,
    utm_source: attribution.utmSource,
    utm_medium: attribution.utmMedium,
    utm_campaign: attribution.utmCampaign,
    utm_id: attribution.utmId,
    utm_term: attribution.utmTerm,
    utm_content: attribution.utmContent,
    gclid: attribution.gclid,
    gbraid: attribution.gbraid,
    wbraid: attribution.wbraid,
    fbclid: attribution.fbclid,
    msclkid: attribution.msclkid,
  });
};

export const trackPageView = (params: EventParams = {}) => {
  const finalParams = {
    ...getEventContext(),
    ...sanitizeParams(params),
  };

  pushDataLayer('icono_page_view', finalParams);
  sendGtagEvent('page_view', finalParams);
};

export const trackEvent = (eventName: string, params: EventParams = {}) => {
  const finalParams = {
    ...getEventContext(),
    ...sanitizeParams(params),
  };

  pushDataLayer(`icono_${eventName}`, finalParams);
  sendGtagEvent(eventName, finalParams);
};

export const trackLeadSubmission = (formId: string, values: LeadFormValues = {}) => {
  trackEvent('generate_lead', {
    form_id: formId,
    lead_type: typeof values.necesidad === 'string' ? values.necesidad : undefined,
    budget_range: typeof values.presupuesto === 'string' ? values.presupuesto : undefined,
    city: typeof values.ciudad === 'string' ? values.ciudad : undefined,
  });
};

export const trackContactClick = (method: 'whatsapp' | 'email' | 'phone', href: string, label?: string) => {
  trackEvent('contact_click', {
    contact_method: method,
    contact_target: href,
    contact_label: label,
  });
};

export const trackCtaClick = (ctaId: string, ctaText?: string) => {
  trackEvent('cta_click', {
    cta_id: ctaId,
    cta_text: ctaText,
  });
};

export const buildLeadPayload = (formId: string, values: LeadFormValues) => {
  const attribution = captureAttribution();
  const normalizedValues = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [
      key,
      typeof value === 'boolean' ? (value ? 'Si' : 'No') : value ?? '',
    ])
  );

  return {
    ...normalizedValues,
    origen_formulario: formId,
    pagina_actual: isBrowser() ? window.location.href : '',
    path_actual: isBrowser() ? window.location.pathname : '',
    titulo_pagina: isBrowser() ? document.title : '',
    consentimiento_medicion: getConsentState() || 'sin_respuesta',
    fecha_envio: new Date().toISOString(),
    tracking_landing_url: attribution.firstLandingUrl,
    tracking_landing_path: attribution.firstLandingPath,
    tracking_referrer: attribution.firstReferrer,
    tracking_utm_source: attribution.utmSource,
    tracking_utm_medium: attribution.utmMedium,
    tracking_utm_campaign: attribution.utmCampaign,
    tracking_utm_id: attribution.utmId,
    tracking_utm_term: attribution.utmTerm,
    tracking_utm_content: attribution.utmContent,
    tracking_gclid: attribution.gclid,
    tracking_gbraid: attribution.gbraid,
    tracking_wbraid: attribution.wbraid,
    tracking_fbclid: attribution.fbclid,
    tracking_msclkid: attribution.msclkid,
  };
};

export const submitLeadForm = async (formId: string, values: LeadFormValues) => {
  const response = await fetch(`https://formsubmit.co/ajax/${siteConfig.email}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(buildLeadPayload(formId, values)),
  });

  if (response.ok) {
    trackLeadSubmission(formId, values);
  }

  return response;
};
