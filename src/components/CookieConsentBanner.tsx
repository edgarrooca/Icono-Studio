import { useEffect, useState } from 'react';
import { Cookie } from 'lucide-react';
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
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] flex justify-center px-3 pb-3 sm:px-4 sm:pb-4 lg:px-6 lg:pb-6">
      <div className="pointer-events-auto w-full max-w-[21rem] rounded-[1.25rem] border border-white/8 bg-brand-dark/88 px-3.5 py-3 text-white shadow-[0_16px_40px_rgba(2,8,23,0.22)] backdrop-blur-xl sm:max-w-[28rem] sm:rounded-[1.35rem] sm:px-4 sm:py-3.5 md:max-w-[34rem] lg:max-w-[46rem] lg:rounded-full lg:px-5 lg:py-3">
        <div className="flex flex-col gap-2.5 sm:gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3 lg:min-w-0 lg:flex-1 lg:items-center">
            <span className="mt-0.5 shrink-0 rounded-full bg-white/6 p-2.5 text-brand-lime/90 lg:mt-0 lg:p-3">
              <Cookie size={18} strokeWidth={2.25} className="lg:h-5 lg:w-5" />
            </span>
            <p className="max-w-xl text-[11px] leading-relaxed text-white/72 sm:text-[12px] lg:max-w-none lg:flex-1 lg:text-[13px]">
              Usamos cookies para mejorar tu experiencia y recordar tus preferencias.
              {' '}
              <Link to="/politica-de-privacidad" className="text-white hover:text-brand-lime transition-colors underline underline-offset-4">
                Más info
              </Link>
            </p>
          </div>

          <div className="flex items-center gap-3 pl-[3.25rem] md:pl-[3.5rem] lg:shrink-0 lg:pl-0">
            <button
              type="button"
              onClick={() => handleConsent('denied')}
              className="text-[9px] font-black uppercase tracking-[0.18em] text-white/48 transition-colors hover:text-white lg:text-[10px]"
            >
              Solo necesarias
            </button>
            <button
              type="button"
              onClick={() => handleConsent('granted')}
              className="rounded-full bg-brand-lime px-4 py-2 text-[9px] font-black uppercase tracking-[0.18em] text-brand-dark transition-transform hover:scale-[1.02] lg:px-[18px] lg:text-[10px]"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
