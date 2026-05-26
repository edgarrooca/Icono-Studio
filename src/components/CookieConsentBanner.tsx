import { useEffect, useState } from 'react';
import { Cookie } from 'lucide-react';
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
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[95] px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] sm:px-4 sm:pb-4 lg:px-6 lg:pb-6">
      <div className="pointer-events-auto mx-auto w-full max-w-5xl overflow-hidden rounded-[1.45rem] border border-white/12 bg-brand-dark/94 text-white shadow-[0_26px_68px_rgba(2,8,23,0.38)] backdrop-blur-xl">
        <div className="relative">
          <div className="pointer-events-none absolute -top-16 left-1/2 h-28 w-56 -translate-x-1/2 rounded-full bg-brand-blue/28 blur-2xl" />
          <div className="relative grid gap-4 p-4 sm:p-5 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-6 lg:p-6">
            <div className="flex items-start gap-3.5 lg:min-w-0">
              <span className="mt-0.5 shrink-0 rounded-2xl border border-brand-lime/25 bg-white/6 p-2.5 text-brand-lime">
                <Cookie size={18} strokeWidth={2.3} />
              </span>

              <div className="min-w-0">
                <p className="text-[12px] font-black uppercase tracking-[0.16em] text-white sm:text-[12.5px]">
                  Privacidad y medición
                </p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-white/78 sm:text-[13px]">
                  Usamos cookies para medir visitas y mejorar la web. Puedes aceptar o usar solo las necesarias.
                  {' '}
                  <Link to="/politica-de-privacidad" className="text-white underline underline-offset-4 transition-colors hover:text-brand-lime">
                    Más info
                  </Link>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:min-w-[21rem]">
              <button
                type="button"
                onClick={() => handleConsent('denied')}
                className="h-11 rounded-full border border-white/32 bg-white/6 px-4 text-[10px] font-black uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/12"
              >
                Solo necesarias
              </button>
              <button
                type="button"
                onClick={() => handleConsent('granted')}
                className="h-11 rounded-full border border-brand-lime/60 bg-brand-lime px-4 text-[10px] font-black uppercase tracking-[0.18em] text-brand-dark transition-all hover:brightness-95"
              >
                Aceptar todo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
