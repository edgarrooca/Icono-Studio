import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  captureAttribution,
  debugLog,
  getConsentState,
  installAnalyticsTransportDebug,
  trackContactClick,
  trackCtaClick,
  trackEvent,
  trackPageView,
} from '../lib/analytics';

export default function AnalyticsTracker() {
  const location = useLocation();
  const previousUrlRef = useRef<string>('');
  const trackedRouteRef = useRef<string>('');

  useEffect(() => {
    captureAttribution();
    installAnalyticsTransportDebug();
  }, []);

  useEffect(() => {
    debugLog('[Icono Analytics] debug:ready', {
      location: window.location.href,
      consent: getConsentState(),
      gtagReady: typeof window.gtag === 'function',
    });
  }, []);

  useEffect(() => {
    const routeKey = `${location.pathname}${location.search}`;
    if (trackedRouteRef.current === routeKey) {
      return;
    }

    trackedRouteRef.current = routeKey;

    const timer = window.setTimeout(() => {
      const previousUrl = previousUrlRef.current || document.referrer || undefined;
      trackPageView({
        page_path: `${location.pathname}${location.search}`,
        page_location: window.location.href,
        page_referrer: previousUrl,
        page_title: document.title,
      });

      previousUrlRef.current = window.location.href;
    }, 120);

    return () => window.clearTimeout(timer);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }

      const anchor = target.closest('a[href]') as HTMLAnchorElement | null;
      if (anchor) {
        const href = anchor.getAttribute('href') || '';
        const label = anchor.getAttribute('aria-label') || anchor.textContent?.trim() || undefined;

        if (href.startsWith('https://wa.me/')) {
          trackContactClick('whatsapp', href, label);
        } else if (href.startsWith('mailto:')) {
          trackContactClick('email', href, label);
        } else if (href.startsWith('tel:')) {
          trackContactClick('phone', href, label);
        }
      }

      const cta = target.closest('[id^="cta_"]') as HTMLElement | null;
      if (cta?.id) {
        const ctaText = cta.textContent?.trim().replace(/\s+/g, ' ').slice(0, 120);
        trackCtaClick(cta.id.replace(/^cta_/, ''), ctaText);
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  useEffect(() => {
    let hasTrackedScroll = false;

    const handleScroll = () => {
      if (hasTrackedScroll) {
        return;
      }

      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) {
        return;
      }

      const percentage = Math.round((window.scrollY / scrollableHeight) * 100);
      if (percentage >= 75) {
        hasTrackedScroll = true;
        trackEvent('scroll_depth', {
          percent_scrolled: 75,
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, location.search]);

  return null;
}
