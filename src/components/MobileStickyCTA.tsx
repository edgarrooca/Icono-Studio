import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { Calculator } from 'lucide-react';

interface MobileStickyCTAProps {
  onOpenCalculator: () => void;
  hideWhenId?: string;
}

export default function MobileStickyCTA({ onOpenCalculator, hideWhenId }: MobileStickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleChatState = (event: Event) => {
      setIsChatOpen(Boolean((event as CustomEvent<{ open: boolean }>).detail?.open));
    };
    window.addEventListener('icono-chat-state', handleChatState);
    return () => window.removeEventListener('icono-chat-state', handleChatState);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const excludedSection = hideWhenId ? document.getElementById(hideWhenId) : null;
      const excludedRect = excludedSection?.getBoundingClientRect();
      const isInsideExcludedSection = excludedRect
        ? excludedRect.top < window.innerHeight && excludedRect.bottom > 0
        : false;
      const footerRect = document.querySelector('footer')?.getBoundingClientRect();
      const isInsideFooter = footerRect ? footerRect.top < window.innerHeight : false;
      const galleryRect = document.getElementById('proyectos')?.getBoundingClientRect();
      const isInsideGallery = galleryRect ? galleryRect.top < window.innerHeight && galleryRect.bottom > 0 : false;

      // Keep the shortcut out of the contact form so it never covers the submit action.
      setIsVisible(window.scrollY > 200 && !isInsideExcludedSection && !isInsideFooter && !isInsideGallery);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [hideWhenId]);

  return (
    <AnimatePresence>
      {isVisible && !isChatOpen && (
        <m.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="pointer-events-none fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-4 z-40 w-[calc(100%-7rem)] sm:hidden"
        >
          <button
            onClick={onOpenCalculator}
            className="brand-button brand-button--dark pointer-events-auto flex min-h-12 w-full items-center justify-center gap-2 px-3 py-3 text-[0.85rem] font-semibold active:scale-95"
            aria-label="Pedir presupuesto: abrir calculadora"
          >
            <Calculator size={18} className="shrink-0 text-[#9ED6F1]" aria-hidden="true" />
            <span className="whitespace-nowrap">Pedir presupuesto</span>
          </button>
        </m.div>
      )}
    </AnimatePresence>
  );
}
