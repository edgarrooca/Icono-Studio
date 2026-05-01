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
    <div className="fixed inset-x-0 bottom-0 z-[70] px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="mx-auto max-w-4xl rounded-[1.5rem] border border-white/10 bg-brand-dark/92 px-4 py-3 text-white shadow-[0_18px_50px_rgba(2,8,23,0.28)] backdrop-blur-xl sm:px-5 sm:py-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-brand-lime/90 mb-1">
              Cookies
            </p>
            <p className="text-xs leading-relaxed text-white/72 sm:text-sm">
              Usamos cookies para mejorar tu experiencia y recordar tus preferencias. Puedes aceptar las cookies opcionales o seguir solo con las necesarias.
              {' '}
              <Link to="/politica-de-privacidad" className="text-white hover:text-brand-lime transition-colors underline underline-offset-4">
                Más info
              </Link>
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={() => handleConsent('denied')}
              className="rounded-full border border-white/15 px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.18em] text-white/70 transition-colors hover:border-white/30 hover:text-white"
            >
              Solo necesarias
            </button>
            <button
              type="button"
              onClick={() => handleConsent('granted')}
              className="rounded-full bg-brand-lime px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.18em] text-brand-dark transition-transform hover:scale-[1.02]"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
