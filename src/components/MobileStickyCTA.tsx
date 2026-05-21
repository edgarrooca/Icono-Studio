import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Calculator } from 'lucide-react';

interface MobileStickyCTAProps {
  onOpenCalculator: () => void;
}

export default function MobileStickyCTA({ onOpenCalculator }: MobileStickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar la barra después de hacer un poco de scroll (ej. 200px)
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 sm:hidden bg-gradient-to-t from-white via-white to-transparent pointer-events-none pb-6"
        >
          <button
            onClick={onOpenCalculator}
            className="w-full bg-brand-dark text-white rounded-2xl shadow-xl shadow-brand-dark/20 p-4 flex items-center justify-center gap-3 font-bold text-lg pointer-events-auto active:scale-95 transition-transform"
          >
            <Calculator size={22} className="text-brand-lime" />
            Calcular Presupuesto
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
