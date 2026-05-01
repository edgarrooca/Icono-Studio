import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="pointer-events-auto mr-[5.25rem] w-auto rounded-[1.25rem] border border-white/8 bg-brand-dark/88 px-3.5 py-3 text-white shadow-[0_16px_40px_rgba(2,8,23,0.22)] backdrop-blur-xl sm:mx-auto sm:max-w-3xl sm:rounded-[1.35rem] sm:px-4 sm:py-3.5">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 shrink-0 rounded-full bg-white/6 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-brand-lime/90">
              Cookies
            </span>
            <p className="max-w-xl text-[11px] leading-relaxed text-white/72 sm:text-[12px]">
              Usamos cookies para mejorar tu experiencia y recordar tus preferencias.
              {' '}
              <Link to="/politica-de-privacidad" className="text-white hover:text-brand-lime transition-colors underline underline-offset-4">
                Más info
              </Link>
            </p>
          </div>

          <div className="flex items-center gap-3 pl-[3.25rem] sm:pl-0">
            <button
              type="button"
              onClick={() => handleConsent('denied')}
              className="text-[9px] font-black uppercase tracking-[0.18em] text-white/52 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
            >
              Solo necesarias
            </button>
            <button
              type="button"
              onClick={() => handleConsent('granted')}
              className="rounded-full bg-brand-lime px-4 py-2 text-[9px] font-black uppercase tracking-[0.18em] text-brand-dark transition-transform hover:scale-[1.02]"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
