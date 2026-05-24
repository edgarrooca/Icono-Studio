import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';

const names = ['María', 'Carlos', 'Elena', 'Javier', 'Laura', 'David', 'Sofía', 'Alejandro', 'Carmen', 'Daniel', 'Marta', 'Pablo', 'Ana', 'Hugo', 'Lucía', 'Diego', 'Paula'];
const locations = ['Madrid', 'Valencia', 'Barcelona', 'Sevilla', 'Bilbao', 'Alicante', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Vigo', 'Gijón', 'Granada', 'A Coruña'];
const actions = [
  'acaba de contratar el Plan Corporativo',
  'ha solicitado presupuesto a medida',
  'acaba de contratar una Landing Page',
  'está diseñando su nueva Tienda Online',
  'acaba de renovar su plan de Mantenimiento',
  'ha contratado el Plan Landing',
  'ha reservado una consultoría web',
  'está empezando su proyecto web con nosotros',
  'ha contratado el servicio Web Express',
  'acaba de empezar su e-commerce'
];

interface Notification {
  name: string;
  location: string;
  action: string;
}

export default function SalesNotification() {
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  useEffect(() => {
    if (hasDismissed) return;

    let showTimeout: NodeJS.Timeout;
    let hideTimeout: NodeJS.Timeout;
    let lastGeneratedName = '';

    const getRandomNotification = (): Notification => {
      let randomName = '';
      do {
        randomName = names[Math.floor(Math.random() * names.length)];
      } while (randomName === lastGeneratedName);
      
      lastGeneratedName = randomName;
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      
      return { name: randomName, location: randomLocation, action: randomAction };
    };

    const scheduleNext = () => {
      const delay = Math.floor(Math.random() * (15000 - 8000 + 1)) + 8000; // 8 to 15 seconds
      showTimeout = setTimeout(() => {
        setCurrentNotification(getRandomNotification());
        setIsVisible(true);

        hideTimeout = setTimeout(() => {
          setIsVisible(false);
          scheduleNext();
        }, 5000);
      }, delay);
    };

    // First notification after 3 seconds
    showTimeout = setTimeout(() => {
      setCurrentNotification(getRandomNotification());
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
            {/* Left border indicator */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-blue"></div>
            
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-blue rounded-full flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(10,54,232,0.4)] relative">
              <CheckCircle2 size={22} className="text-white" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
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
