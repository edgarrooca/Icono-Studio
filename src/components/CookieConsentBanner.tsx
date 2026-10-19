import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  consentStorageKey,
  getConsentState,
  trackLeadThankYouPageConversion,
  trackPageView,
  updateConsentState,
} from '../lib/analytics';
import { isPrerenderUserAgent } from '../lib/runtime';

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isPrerenderUserAgent()) {
      setVisible(false);
      return;
    }

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
      trackLeadThankYouPageConversion();
    }
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed bottom-[max(env(safe-area-inset-bottom),0.75rem)] left-3 z-[95] sm:bottom-6 sm:left-6">
      <div
        role="dialog"
        aria-label="Aviso de cookies"
        className="pointer-events-auto w-[calc(100vw-1.5rem)] max-w-[27rem] rounded-[1.25rem] border border-[#E2E7EF] bg-white p-4 text-[#0B1B63] shadow-[0_18px_50px_-18px_rgba(11,27,99,0.34)] sm:w-[27rem] sm:p-5"
      >
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#0B1B63] sm:text-[12px]">
          Privacidad y medición
        </p>
        <p className="mt-2 text-[12px] leading-[1.6] text-[#526477] sm:text-[13px]">
          Usamos cookies para medir visitas y mejorar la web. Puedes aceptar o usar solo las necesarias.
          {' '}
          <Link to="/politica-de-privacidad" className="font-semibold text-[#0B1B63] underline decoration-[#9ED6F1] decoration-2 underline-offset-4 transition-colors hover:text-[#2A6D98]">
            Más info
          </Link>
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => handleConsent('denied')}
            className="h-11 rounded-xl border border-[#E2E7EF] bg-[#F3F5F8] px-2 text-[10px] font-black uppercase tracking-[0.12em] text-[#0B1B63] transition-colors hover:bg-[#E9EDF3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A6D98] focus-visible:ring-offset-2"
          >
            Solo necesarias
          </button>
          <button
            type="button"
            onClick={() => handleConsent('granted')}
            className="h-11 rounded-xl border border-[#9ED6F1] bg-[#9ED6F1] px-2 text-[10px] font-black uppercase tracking-[0.12em] text-[#0B1B63] transition-colors hover:bg-[#8FCFEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A6D98] focus-visible:ring-offset-2"
          >
            Aceptar todo
          </button>
        </div>
      </div>
    </div>
  );
}
