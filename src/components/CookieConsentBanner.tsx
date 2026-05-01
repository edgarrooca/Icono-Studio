import { useEffect, useState } from 'react';
import { consentStorageKey, getConsentState, trackPageView, updateConsentState } from '../lib/analytics';

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(!window.localStorage.getItem(consentStorageKey));
    } catch {
      setVisible(getConsentState() === null);
    }
  }, []);

  const handleConsent = (state: 'granted' | 'denied') => {
    updateConsentState(state);
    if (state === 'granted') {
      trackPageView({
        page_path: window.location.pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-brand-dark/95 p-5 text-white shadow-[0_24px_60px_rgba(2,8,23,0.35)] backdrop-blur-xl sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="ui-eyebrow text-brand-lime mb-2">Cookies y medicion</p>
            <h2 className="font-display text-2xl uppercase tracking-tight sm:text-3xl">
              Activa analitica para medir bien tus campañas
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
              Usamos Google Analytics para entender que páginas generan más contactos y desde qué campañas llegan los leads.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => handleConsent('denied')}
              className="rounded-full border border-white/15 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white/70 transition-colors hover:border-white/30 hover:text-white"
            >
              Rechazar
            </button>
            <button
              type="button"
              onClick={() => handleConsent('granted')}
              className="rounded-full bg-brand-lime px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-brand-dark transition-transform hover:scale-[1.02]"
            >
              Aceptar y medir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
