import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';

const notifications = [
  { name: 'María', location: 'Madrid', action: 'acaba de contratar el Plan Corporativo' },
  { name: 'Carlos', location: 'Valencia', action: 'ha solicitado presupuesto a medida' },
  { name: 'Elena', location: 'Barcelona', action: 'acaba de contratar una Landing Page' },
  { name: 'Javier', location: 'Sevilla', action: 'está diseñando su nueva Tienda Online' },
  { name: 'Laura', location: 'Bilbao', action: 'acaba de renovar su plan de Mantenimiento' },
  { name: 'David', location: 'Alicante', action: 'ha contratado el Plan Corporativo' },
  { name: 'Sofía', location: 'Zaragoza', action: 'ha solicitado presupuesto a medida' },
];

export default function SalesNotification() {
  const [currentNotification, setCurrentNotification] = useState<typeof notifications[0] | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  useEffect(() => {
    if (hasDismissed) return;

    let showTimeout: NodeJS.Timeout;
    let hideTimeout: NodeJS.Timeout;

    const scheduleNext = () => {
      const delay = Math.floor(Math.random() * (15000 - 8000 + 1)) + 8000; // 8 to 15 seconds
      showTimeout = setTimeout(() => {
        const randomNotif = notifications[Math.floor(Math.random() * notifications.length)];
        setCurrentNotification(randomNotif);
        setIsVisible(true);

        hideTimeout = setTimeout(() => {
          setIsVisible(false);
          scheduleNext();
        }, 5000);
      }, delay);
    };

    // First notification after 3 seconds
    showTimeout = setTimeout(() => {
      const randomNotif = notifications[Math.floor(Math.random() * notifications.length)];
      setCurrentNotification(randomNotif);
      setIsVisible(true);

      hideTimeout = setTimeout(() => {
        setIsVisible(false);
        scheduleNext();
      }, 5000);
    }, 3000);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, [hasDismissed]);

  if (hasDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && currentNotification && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 pointer-events-auto"
        >
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-3 sm:p-4 pr-10 flex items-center gap-3 sm:gap-4 max-w-[320px] sm:max-w-sm relative overflow-hidden group">
            {/* Pulsing indicator */}
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-lime"></div>
            
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F2F6F7] rounded-full flex items-center justify-center shrink-0 border border-brand-lime/20 relative">
              <CheckCircle2 size={20} className="text-brand-blue" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-xs sm:text-sm text-gray-900 leading-tight">
                <span className="font-bold">{currentNotification.name}</span> de {currentNotification.location}
              </p>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-snug">
                {currentNotification.action}
              </p>
              <p className="text-[9px] text-gray-400 mt-1 uppercase tracking-wider font-bold">Hace unos minutos</p>
            </div>

            <button
              onClick={() => {
                setIsVisible(false);
                setHasDismissed(true);
              }}
              className="absolute top-2 right-2 text-gray-300 hover:text-gray-500 transition-colors p-1 opacity-0 group-hover:opacity-100 focus:opacity-100 sm:opacity-100"
              aria-label="Cerrar notificación"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
