import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, Menu, X, ChevronDown, ChevronUp, ShieldCheck, Rocket, LineChart, Zap } from 'lucide-react';
import { mainNavLinks } from '../data/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const supportHeroPills = [
  {
    title: 'Hosting resuelto',
    description: 'Alojamiento, SSL y puesta a punto.',
    icon: Rocket,
  },
  {
    title: 'Mantenimiento claro',
    description: 'Revisiones, actualizaciones y seguimiento.',
    icon: ShieldCheck,
  },
  {
    title: 'Soporte cercano',
    description: 'Ayuda real cuando la web lo pida.',
    icon: LineChart,
  },
];

const pricingViews = [
  { key: 'hosting', label: 'Solo hosting' },
  { key: 'maintenance', label: 'Solo mantenimiento' },
  { key: 'bundle', label: 'Hosting + mantenimiento' },
] as const;

const serviceBlocks = [
  {
    title: 'Hosting Profesional',
    text: 'Nos encargamos del alojamiento, el certificado de seguridad SSL y la configuración técnica para que tu web esté siempre online y rápida.',
    features: ['Servidores de alta velocidad', 'Seguridad SSL incluida', 'Copias de seguridad', 'Monitorización 24/7'],
    icon: Rocket,
    tone: 'from-brand-blue/10 to-transparent',
  },
  {
    title: 'Mantenimiento Mensual',
    text: 'Revisamos tu web periódicamente para asegurar que todo funciona como el primer día, evitando errores y actualizando lo que sea necesario.',
    features: ['Actualizaciones de seguridad', 'Revisiones de funcionamiento', 'Soporte técnico directo', 'Tranquilidad total'],
    icon: ShieldCheck,
    tone: 'from-brand-lime/20 to-transparent',
  },
  {
    title: 'Mejoras y Evolución',
    text: '¿Necesitas cambiar un texto o añadir una sección? Nos ocupamos de que tu web crezca al ritmo de tu negocio sin complicaciones para ti.',
    features: ['Pequeños ajustes visuales', 'Añadir nuevos contenidos', 'Prioridad en cambios', 'Asesoramiento cercano'],
    icon: LineChart,
    tone: 'from-brand-dark/10 to-transparent',
  },
];

const maintenancePlans = [
  {
    name: 'Básico',
    maintenancePrice: '30€',
    bundlePrice: '35€',
    maintenanceLink: 'https://buy.stripe.com/5kQdRbeGDeqm3kr2xIew801',
    bundleLink: 'https://buy.stripe.com/fZu7sN9mjgyu6wDgoyew804',
    label: 'Lo esencial',
    description: 'Perfecto para tener la seguridad de que alguien vigila tu web y resuelve dudas básicas.',
    idealFor: 'Webs que no cambian mucho pero necesitan estar seguras y actualizadas.',
    features: ['Revisión mensual de seguridad', 'Actualizaciones del sistema', 'Resolución de errores menores', 'Soporte por email'],
    featured: false,
  },
  {
    name: 'Estándar',
    maintenancePrice: '50€',
    bundlePrice: '55€',
    maintenanceLink: 'https://buy.stripe.com/28E9AVaqn5TQf392xIew802',
    bundleLink: 'https://buy.stripe.com/eVqaEZ1TRaa6g7d3BMew805',
    label: 'El más elegido',
    description: 'La opción ideal para negocios que quieren despreocuparse por completo y tener soporte prioritario.',
    idealFor: 'Empresas que quieren un apoyo técnico constante y pequeñas mejoras cada mes.',
    features: ['Revisión quincenal técnica', 'Soporte prioritario WhatsApp/Email', 'Pequeños cambios y ajustes', 'Informe mensual de estado', 'Cuidado post-lanzamiento'],
    featured: true,
  },
  {
    name: 'Profesional',
    maintenancePrice: '80€',
    bundlePrice: '85€',
    maintenanceLink: 'https://buy.stripe.com/28EdRb2XV81Y3kr3BMew803',
    bundleLink: 'https://buy.stripe.com/28E4gBgOL5TQ3kra0aew806',
    label: 'Crecimiento',
    description: 'Para proyectos que necesitan un ritmo mayor de cambios, mejoras constantes y horas reservadas.',
    idealFor: 'Negocios con mucho movimiento que necesitan evolucionar su web mes a mes.',
    features: ['Horas de desarrollo incluidas', 'Plan de mejoras continuas', 'Ajustes de diseño y funciones', 'Soporte 24/7 reactivo'],
    featured: false,
  },
];

const supportFaqs = [
  {
    q: '¿Está incluido el nombre del dominio?',
    a: 'El dominio no suele estar incluido en el precio base. Si ya tienes uno, nos encargamos de conectarlo. Si no, te ayudamos a comprar el más adecuado para ti.',
  },
  {
    q: '¿Puedo contratar solo el hosting?',
    a: 'Sí, por supuesto. Si solo necesitas que alojemos tu web en nuestros servidores seguros con mantenimiento técnico base, puedes hacerlo sin contratar planes extra.',
  },
  {
    q: '¿Qué pasa si ya tengo un hosting contratado?',
    a: 'No hay problema. Podemos encargarnos solo del mantenimiento de tu web trabajando sobre tu servidor actual si cumple con los requisitos mínimos de seguridad.',
  },
  {
    q: '¿Cómo funciona el pack de Hosting + Mantenimiento?',
    a: 'Si decides delegarnos ambas cosas, ajustamos el precio para que te salga más rentable que contratarlos por separado. Tienes toda la gestión unificada en una sola cuota.',
  },
  {
    q: '¿Trabajáis con webs que no habéis hecho vosotros?',
    a: 'Sí, pero primero necesitamos hacer una pequeña auditoría para ver cómo está construida la web y asegurarnos de que podemos darte el servicio de calidad que te mereces.',
  },
];

export default function HostingMaintenance() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [pricingView, setPricingView] = useState<(typeof pricingViews)[number]['key']>('bundle');

  useEffect(() => {
    if (window.innerWidth < 768) {
      setPricingView('hosting');
    }
  }, []);
  const [activeService, setActiveService] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveService((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const [activePricingIndex, setActivePricingIndex] = useState(0);

  const handlePricingScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollPosition = e.currentTarget.scrollLeft;
    // Calculate index based on card width (85vw) + gap (1.5rem/24px)
    const cardWidth = window.innerWidth * 0.85;
    const gap = 24; 
    const newIndex = Math.round(scrollPosition / (cardWidth + gap));
    if (newIndex !== activePricingIndex) {
      setActivePricingIndex(newIndex);
    }
  };


  // Memoize star positions to prevent jitter on re-renders (scroll)
  const starData = useMemo(() => {
    return [...Array(40)].map(() => ({
      top: `${Math.pow(Math.random(), 1.5) * 85}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 2 + 1}px`,
      delay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.7 + 0.3
    }));
  }, []);

  const shootingStarData = useMemo(() => {
    return [...Array(6)].map((_, i) => ({
      top: `${Math.random() * 40}%`,
      left: `${Math.random() * 80}%`,
      delay: `${i * 2 + Math.random() * 12}s`,
      duration: `${7 + Math.random() * 4}s`
    }));
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-brand-dark selection:bg-brand-lime selection:text-brand-dark overflow-x-hidden">
      
      <Navbar />

      {/* STRATOSPHERE TRANSITION - CLEAN & DYNAMIC */}
      <div 
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(to bottom, #0A36E8 0%, #4F6FF2 25%, #F0F5FF 50%, #ffffff 65%)' }}
      > 
        {/* Real Flickering Stars Layer - Moved to parent for better visibility */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {starData.map((star, i) => (
            <div 
              key={i}
              className="absolute bg-white transition-all animate-twinkle rotate-45"
              style={{
                top: star.top,
                left: star.left,
                width: star.width,
                height: star.height,
                animationDelay: star.delay,
                opacity: star.opacity,
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.4)'
              }}
            />
          ))}
          
          {/* Shooting Stars - CSS Optimized - Top to Bottom trajectories */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {shootingStarData.map((star, i) => (
              <div
                key={`shooting-${i}`}
                className="absolute w-[120px] h-[1px] bg-gradient-to-r from-transparent via-white/80 to-white opacity-0 animate-shooting-star"
                style={{ 
                  top: star.top,
                  left: star.left,
                  animationDelay: star.delay,
                  animationDuration: star.duration,
                  transformOrigin: 'left center'
                }}
              />
            ))}
          </div>
        </div>

        <section className="relative pt-28 pb-32 sm:pt-32 sm:pb-36 md:pt-40 md:pb-44 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-white z-20">

          {/* Blueprint pattern - more subtle */}
          <div 
            className="absolute inset-0 opacity-[0.07] bg-blueprint pointer-events-none" 
            style={{ maskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)', WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)' }}
          ></div>
          
          <div className="relative z-10 flex flex-col items-center text-center w-full max-w-5xl mx-auto">
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="font-display text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.95] md:leading-[0.85] tracking-tighter uppercase mb-6"
            >
              Soporte web <br/>
              <span className="text-brand-lime italic">para crecer</span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="text-lg md:text-xl max-w-2xl text-white/80 font-medium mb-12"
            >
              Cuidamos tu proyecto tecnológico para que tú solo tengas que centrarte en tu negocio. Sin sustos ni complicaciones.
            </motion.p>
            
              <motion.a
                href="/contacto"
                whileHover="hover"
                className="group relative bg-brand-lime text-brand-dark px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(212,255,0,0.2)] overflow-hidden"
              >
                {/* HIGH-CONTRAST SIMPLE SHINE */}
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-full font-normal">
                  <motion.div 
                    whileHover={{ 
                      x: '200%',
                      transition: { duration: 0.8, ease: "easeInOut" }
                    }}
                    initial={{ x: '-200%', skewX: -35 }}
                    transition={{ duration: 0 }}
                    className="absolute inset-0 w-full h-full"
                    style={{
                      background: 'linear-gradient(90deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 70%)',
                    }}
                  />
                </div>
                
                <span className="relative z-20 font-bold">Ver planes</span>
                <ArrowRight size={20} className="relative z-20 group-hover:translate-x-1 transition-transform" />
              </motion.a>
          </div>
        </section>

        {/* 2. MÉTRICAS - Transparente */}
        <section className="relative z-30 -mt-16 md:-mt-24 px-4 pb-24 bg-transparent">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                { label: 'Servicio online', value: '99.9%', sub: 'Funcionamiento' },
                { label: 'Seguridad', value: 'Máxima', sub: 'Certificado SSL' },
                { label: 'Respuesta', value: '< 4h', sub: 'Tiempo medio' },
                { label: 'Copias', value: 'Auto', sub: 'Mensuales' },
              ].map((metric, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-gray-100 p-6 sm:p-8 rounded-[2rem] text-center shadow-xl shadow-gray-200/40"
                >
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">{metric.label}</p>
                  <p className="font-display text-2xl sm:text-4xl text-brand-blue mb-1 leading-none">{metric.value}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium tracking-wide uppercase">{metric.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. SERVICIOS - SIMPLIFIED HEADER */}
        <section className="py-24 sm:py-32 relative overflow-hidden bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center mb-24">
              <div className="flex flex-col items-center">
                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-brand-dark leading-[1.1] mb-8 max-w-3xl">
                  Tu web, en las <br />
                  <span className="text-brand-blue italic">mejores manos.</span>
                </h2>
                <div className="w-12 h-[2px] bg-brand-blue/20 mb-10"></div>
                <p className="text-gray-500 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
                  Elevamos el estándar de cuidado digital. Soporte proactivo y humano diseñado para que tu presencia online sea siempre el activo más rentable de tu negocio.
                </p>
              </div>
            </div>

            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {[
                {
                  id: 'ICN-01',
                  title: 'Cuidado y Seguridad',
                  desc: 'Vigilancia constante y actualizaciones invisibles. Tu web siempre protegida sin que lo notes.',
                  icon: ShieldCheck,
                  features: ['Blindaje Anti-Malware', 'Actualizaciones Seguras', 'Copias Diarias']
                },
                {
                  id: 'ICN-02',
                  title: 'Soporte y Evolución',
                  desc: 'A un WhatsApp de distancia. Pequeños cambios o mejoras estratégicas en tiempo récord.',
                  icon: Zap,
                  features: ['Soporte Directo', 'Pequeños Ajustes', 'Prioridad de Respuesta']
                },
                {
                  id: 'ICN-03',
                  title: 'Potencia y Velocidad',
                  desc: 'Alojamiento premium en servidores de última generación para que tu web vuele.',
                  icon: Rocket,
                  features: ['Velocidad NVMe', 'SSL Business Pro', 'Optimización Continua']
                }
              ].map((service, i) => {
                const Icon = service.icon;
                const effectiveActive = hoveredIndex !== null ? hoveredIndex : activeService;
                const isActive = i === effectiveActive;

                return (
                  <motion.div 
                    key={service.title}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    animate={{
                      y: isActive ? -12 : 0,
                      scale: isActive ? 1.02 : 1,
                    }}
                    className={`group relative bg-white/40 backdrop-blur-3xl border border-white/50 rounded-tl-[3.5rem] md:rounded-tl-[5rem] rounded-tr-2xl md:rounded-tr-3xl rounded-br-[3.5rem] md:rounded-br-[5rem] rounded-bl-2xl md:rounded-bl-3xl p-7 md:p-14 overflow-hidden transition-all duration-700 hover:-translate-y-3 flex flex-col items-center text-center ${isActive ? 'shadow-xl shadow-brand-blue/10 bg-white/60' : 'shadow-2xl shadow-brand-blue/5'}`}
                    style={{
                      boxShadow: isActive ? 'inset 0 0 40px rgba(255,255,255,0.8), 0 20px 40px rgba(10, 54, 232, 0.1)' : 'inset 0 0 40px rgba(255,255,255,0.6), 0 20px 40px rgba(10, 54, 232, 0.05)'
                    }}
                  >
                    {/* HIGH-CONTRAST SIMPLE SHINE */}
                    <motion.div 
                      className="absolute inset-0 z-10 pointer-events-none"
                      animate={{
                        x: isActive ? ['-100%', '150%'] : ['-150%', '-150%'],
                      }}
                      transition={{
                        duration: 1.2,
                        ease: "easeInOut",
                        repeat: isActive ? Infinity : 0,
                        repeatDelay: 4.8
                      }}
                      style={{
                        background: 'linear-gradient(90deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 70%)',
                        width: '100%',
                        skewX: -35
                      }}
                    />

                    <div className="absolute inset-0 opacity-[0.03] bg-blueprint pointer-events-none group-hover:opacity-[0.08] transition-opacity"></div>
                    
                    {/* Icon ORB */}
                    <div className="relative z-20 mb-10">
                      <div className={`absolute inset-0 rounded-full bg-brand-blue/10 blur-xl scale-150 transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                      <motion.div 
                        animate={{
                          rotate: isActive ? (i === 0 ? -5 : i === 1 ? 5 : 0) : 0,
                          scale: isActive ? 1.1 : 1
                        }}
                        whileHover={{ scale: 1.1, rotate: i === 0 ? -5 : i === 1 ? 5 : 0 }}
                        className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/50 backdrop-blur-md border border-white flex items-center justify-center shadow-lg group-hover:shadow-brand-blue/20 transition-all duration-500 overflow-hidden relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/10 to-transparent"></div>
                        <motion.div
                          animate={isActive || i === 1 ? { 
                            opacity: [1, 0.7, 1],
                            scale: isActive ? [1, 1.1, 1] : 1,
                            rotate: isActive ? [0, -5, 5, 0] : 0
                          } : {}}
                          transition={{ repeat: Infinity, duration: 2 }}
                          whileHover={
                            i === 0 ? { rotate: [0, -10, 10, 0] } : 
                            i === 1 ? { scale: 1.2, filter: 'drop-shadow(0 0 8px rgba(10, 54, 232, 0.4))' } : 
                            { y: [-2, 2, -2], x: [1, -1, 1] }
                          }
                        >
                          <Icon className="w-10 h-10 text-brand-blue relative z-10" />
                        </motion.div>
                      </motion.div>
                    </div>

                    <h3 className="relative z-20 font-display text-2xl md:text-3xl uppercase text-brand-dark mb-4 md:mb-6 tracking-tighter leading-none italic">{service.title}</h3>
                    <p className="relative z-20 text-gray-500/80 text-base md:text-lg leading-relaxed mb-8 md:mb-10 flex-grow font-medium italic">
                      {service.desc}
                    </p>

                    <div className="relative z-20 w-full space-y-4 pt-10 border-t border-brand-blue/10">
                      {service.features.map(f => (
                        <div key={f} className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest text-brand-blue/60 group-hover:text-brand-blue transition-colors">
                          <Check size={14} className="text-brand-blue" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* 4. PLANES - Bloque Oscuro Estilo Home.tsx */}
      <section id="planes" className="py-12 sm:py-20 bg-white px-0 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-brand-dark rounded-none sm:rounded-[3.5rem] p-0 py-16 sm:p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          
          <div className="relative z-10 mb-10 sm:mb-16 flex flex-col md:flex-row items-center md:items-end text-center md:text-left justify-between gap-8 px-6 md:px-0">
            <div className="max-w-2xl">
              <div className="mx-auto md:mx-0 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-brand-lime font-bold text-[10px] uppercase tracking-widest mb-6 border border-white/10">
                NUESTROS PLANES
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight leading-[1.05] mb-6">
                Planes de <br />
                <span className="text-brand-lime italic">crecimiento</span>
              </h2>
              <p className="text-white/60 text-lg max-w-xl">
                Sin permanencias. Gestión unificada de hosting y mantenimiento para que no tengas que preocuparte de nada.
              </p>
            </div>

            <div className="relative w-full md:w-auto max-w-md md:max-w-none">
              {/* Left Fade */}
              <div className="absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-brand-dark to-transparent pointer-events-none md:hidden" />
              {/* Right Fade */}
              <div className="absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-brand-dark to-transparent pointer-events-none md:hidden" />
              
              <div className="flex flex-col gap-4 overflow-x-auto pb-4 md:pb-0 scrollbar-hide snap-x">
                <div className="inline-flex p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm w-fit whitespace-nowrap mx-auto md:mx-0">
                  {pricingViews.map((view) => (
                    <button
                      key={view.key}
                      onClick={() => setPricingView(view.key)}
                      className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all snap-center ${
                        pricingView === view.key ? 'bg-brand-lime text-brand-dark' : 'text-white/40 hover:text-white'
                      }`}
                    >
                      {view.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div 
            onScroll={handlePricingScroll}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory py-10 md:py-0 scrollbar-hide px-6 md:px-0"
          >
            <AnimatePresence mode="wait">
              {pricingView === 'hosting' ? (
                <motion.div 
                  key="hosting-only"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="w-[85vw] md:w-auto shrink-0 snap-center lg:col-start-2 bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-10 flex flex-col group backdrop-blur-sm"
                >
                  <h3 className="font-display text-2xl uppercase mb-2 text-white">Solo Hosting</h3>
                  <p className="text-white/50 text-sm mb-8">Servidor optimizado y seguridad técnica base.</p>
                  <div className="mb-8">
                    <span className="text-[10px] text-brand-lime uppercase tracking-widest block mb-1 font-bold">Cuota mensual</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-display tracking-tight text-white">8</span>
                      <span className="text-2xl text-white/40">€/mes <span className="text-xs font-bold ml-1.5">+ IVA</span></span>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-10 flex-grow">
                    {['Servidor NVMe Alta Velocidad', 'Certificado SSL Incluido', 'Copias de seguridad', 'Monitorización 24/7'].map(f => (
                      <li key={f} className="flex items-center gap-3 text-sm text-white/70 font-semibold">
                        <Check size={16} className="text-brand-lime shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <motion.a 
                    href="https://buy.stripe.com/aFaeVf0PNdmig7d0pAew800"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover="hover"
                    initial="initial"
                    className="group relative w-full py-4 rounded-full bg-brand-lime text-brand-dark font-bold uppercase tracking-widest text-xs overflow-hidden transition-transform hover:scale-105 flex items-center justify-center"
                  >
                    {/* HIGH-VISIBILITY CRYSTAL SHINE - ENTER ONLY */}
                    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-full font-normal">
                      <motion.div 
                        whileHover={{ 
                          x: '200%',
                          transition: { duration: 0.8, ease: "easeInOut" }
                        }}
                        initial={{ x: '-200%', skewX: -35 }}
                        transition={{ duration: 0 }}
                        className="absolute inset-0 w-full h-full"
                        style={{
                          background: 'linear-gradient(90deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 70%)',
                        }}
                      />
                    </div>
                    <span className="relative z-20">Contratar ahora</span>
                  </motion.a>
                </motion.div>
              ) : (
                maintenancePlans.map((plan, i) => (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`relative w-[85vw] md:w-auto shrink-0 snap-center rounded-[2rem] p-7 sm:p-10 flex flex-col border transition-all duration-300 ${
                      plan.featured 
                        ? 'bg-gradient-to-b from-white/10 to-white/5 border-brand-lime/50 shadow-[0_0_40px_rgba(212,255,0,0.1)] md:-translate-y-2' 
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {plan.featured && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-lime text-brand-dark text-[10px] font-bold uppercase py-1 px-4 rounded-full shadow-lg">Más Recomendado</div>
                    )}
                    <h3 className="font-display text-2xl uppercase mb-2 text-white">{plan.name}</h3>
                    <p className="text-white/40 text-sm mb-8 leading-relaxed">{plan.description}</p>
                    
                    <div className="mb-8">
                      <span className={`text-[10px] uppercase tracking-widest block mb-1 font-bold ${plan.featured ? 'text-brand-lime' : 'text-white/40'}`}>Desde</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-display tracking-tight text-white">
                          {pricingView === 'bundle' ? plan.bundlePrice.replace('€', '') : plan.maintenancePrice.replace('€', '')}
                        </span>
                        <span className="text-2xl text-white/40">€/mes <span className="text-xs font-bold ml-1.5">+ IVA</span></span>
                      </div>
                    </div>

                    <div className="w-full h-px bg-white/10 mb-8"></div>

                    <ul className="space-y-4 mb-10 flex-grow">
                      {plan.features.map((feature, idx) => (
                        <li key={feature} className={`flex items-start gap-3 text-sm ${idx > 3 ? 'text-white/30' : 'text-white/70'} font-semibold`}>
                          <Check size={16} className={plan.featured ? 'text-brand-lime' : 'text-white/20'} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <motion.a 
                      href={pricingView === 'bundle' ? plan.bundleLink : plan.maintenanceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover="hover"
                      initial="initial"
                      className={`group relative w-full py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all overflow-hidden flex items-center justify-center ${
                        plan.featured ? 'bg-brand-lime text-brand-dark' : 'bg-white/10 text-white border border-white/10 hover:bg-white/20'
                      }`}
                    >
                      {/* HIGH-VISIBILITY CRYSTAL SHINE - ENTER ONLY */}
                      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-full">
                        <motion.div 
                          whileHover={{ 
                            x: '200%',
                            transition: { duration: 0.8, ease: "easeInOut" }
                          }}
                          initial={{ x: '-200%', skewX: -35 }}
                          transition={{ duration: 0 }}
                          className="absolute inset-0 w-full h-full"
                          style={{
                            background: 'linear-gradient(90deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 70%)',
                          }}
                        />
                      </div>
                      <span className="relative z-20">Elegir plan</span>
                    </motion.a>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* CUSTOM SLIDER INDICATOR - PREMIUM WHITE STYLE */}
          <div className="flex justify-center gap-2.5 mt-10 md:hidden relative z-20 px-6">
            {(pricingView === 'hosting' ? [1] : maintenancePlans).map((_, idx) => (
              <motion.div 
                key={idx}
                animate={{
                  width: activePricingIndex === idx ? 32 : 8,
                  backgroundColor: activePricingIndex === idx ? '#D4FF00' : 'rgba(255, 255, 255, 0.15)',
                  boxShadow: activePricingIndex === idx ? '0 0 12px rgba(212, 255, 0, 0.4)' : 'none'
                }}
                className="h-1.5 rounded-full transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#F8F9FA] overflow-hidden border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/5 text-brand-blue font-bold text-xs uppercase tracking-wider mb-6">
              Soporte & FAQ
            </div>
            <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-brand-dark leading-none mb-6">
              ¿Tienes dudas? <br /> <span className="text-brand-blue italic">Te ayudamos</span>
            </h2>
            <p className="text-lg text-gray-500">Respuestas directas para que no tengas que preocuparte por nada.</p>
          </div>

          <div className="space-y-4">
            {supportFaqs.map((faq, index) => (
              <div
                key={faq.q}
                className={`bg-white border rounded-[1.5rem] overflow-hidden transition-all duration-300 ${activeFaq === index ? 'border-brand-blue shadow-lg' : 'border-gray-100 hover:border-gray-200'}`}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-8 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className={`font-bold text-base sm:text-lg transition-colors ${activeFaq === index ? 'text-brand-blue' : 'text-brand-dark'}`}>{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${activeFaq === index ? 'bg-brand-blue text-white rotate-180' : 'bg-gray-50 text-gray-400'}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-8 pb-6 text-gray-500 text-base leading-relaxed border-t border-gray-50 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
