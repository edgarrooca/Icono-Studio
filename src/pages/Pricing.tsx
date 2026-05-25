import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';

export default function Pricing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    { q: "¿El precio incluye el hosting y dominio?", a: "No. El dominio no está incluido, aunque podemos recomendarte la mejor opción y ayudarte a configurarlo. El hosting tampoco va incluido en el precio base, pero ofrecemos planes de mantenimiento y hosting para que te despreocupes de todo." },
    { q: "¿Hay algún coste oculto?", a: "No. Nuestros precios son cerrados para las funcionalidades detalladas en el presupuesto. Si a mitad de proyecto decides añadir funciones extra complejas, te informaremos del coste adicional antes de implementarlo." },
    { q: "¿Cómo se realiza el pago?", a: "Generalmente trabajamos con un anticipo del 50% al aceptar el presupuesto para reservar fechas y arrancar el diseño, y el 50% restante a la entrega y publicación final del proyecto." },
    { q: "¿Ofrecéis facilidades de pago o cuotas?", a: "Para proyectos a medida grandes, podemos estudiar dividir el pago en hitos de entrega. También disponemos de nuestro servicio Web Express, donde puedes pagar una cuota mensual por tener la web lista sin gran inversión inicial." }
  ];

  return (
    <div className="min-h-screen bg-brand-dark selection:bg-brand-lime/30 selection:text-brand-lime flex flex-col font-sans">
      <SeoHead 
        title="Precios Diseño Web | Icono Studio"
        description="Descubre nuestros planes de diseño web corporativo, landing pages y tiendas online. Tarifas claras, transparentes y orientadas a resultados para tu negocio."
        path="/precios"
      />
      <Navbar />

      <main className="flex-grow pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* HERO PRICING */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="ui-section-title text-white mb-6">
                Transparencia desde <br />
                <span className="text-brand-lime italic">el primer clic</span>
              </h1>
              <p className="ui-section-copy text-white/70 max-w-2xl mx-auto">
                Sin letra pequeña. Te mostramos nuestras tarifas base para que puedas hacerte una idea real de la inversión necesaria para tu próximo proyecto digital.
              </p>
            </motion.div>
          </div>

          {/* PRICING GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 relative z-10 mb-20 sm:mb-24">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 w-full h-[600px] bg-brand-blue/20 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none z-[-1]"></div>
            
            {/* Tier 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-[1.6rem] sm:rounded-[2rem] p-5 sm:p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col group backdrop-blur-sm"
            >
              <h3 className="font-display text-lg sm:text-xl uppercase mb-2 text-white">Landing Page</h3>
              <p className="text-white/50 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">Ideal para validar ideas, campañas publicitarias o captar leads rápidamente.</p>
              <div className="mb-5 sm:mb-6">
                <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-1 font-bold">Desde</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-display tracking-tight text-white">350</span>
                  <span className="text-xl text-white/50">€ <span className="text-xs uppercase tracking-tighter opacity-50">+ IVA</span></span>
                </div>
              </div>
              <div className="w-full h-px bg-white/10 mb-5 sm:mb-6"></div>
              <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
                {['Página única optimizada', 'Copywriting persuasivo', 'Diseño responsive', 'Formulario de captación'].map((feat, i) => (
                  <li key={i} className={`flex items-start gap-3 text-xs sm:text-sm text-white/80`}>
                    <Check size={16} className="text-white/30 shrink-0 mt-0.5" /> <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <RouterLink 
                to="/contacto"
                className="w-full py-2.5 sm:py-3 rounded-full border border-white/20 font-bold text-white hover:bg-white hover:text-brand-dark transition-all duration-300 uppercase tracking-wide text-center text-xs group-hover:border-white/40"
              >
                Solicitar
              </RouterLink>
            </motion.div>

            {/* Tier 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-b from-white/10 to-white/5 border border-brand-lime/40 rounded-[1.6rem] sm:rounded-[2rem] p-5 sm:p-6 transform xl:-translate-y-2 shadow-[0_0_40px_rgba(204,255,0,0.1)] flex flex-col relative backdrop-blur-sm hover:border-brand-lime/60 transition-all duration-300"
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-lime text-brand-dark text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full shadow-lg whitespace-nowrap">
                Más Popular
              </div>
              <h3 className="font-display text-lg sm:text-xl uppercase mb-2 text-white">Corporativa</h3>
              <p className="text-white/60 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">Para empresas que buscan autoridad, credibilidad y presencia digital sólida.</p>
              <div className="mb-5 sm:mb-6">
                <span className="text-[10px] text-brand-lime/80 uppercase tracking-widest block mb-1 font-bold">Desde</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-display tracking-tight text-brand-lime">500</span>
                  <span className="text-2xl text-brand-lime/50 px-1">–</span>
                  <span className="text-3xl sm:text-4xl font-display tracking-tight text-brand-lime">800</span>
                  <span className="text-xl text-white/50 ml-1">€ <span className="text-xs uppercase tracking-tighter opacity-50">+ IVA</span></span>
                </div>
              </div>
              <div className="w-full h-px bg-white/10 mb-5 sm:mb-6"></div>
              <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
                {['Hasta 5 páginas internas', 'Diseño UX/UI a medida', 'Optimización SEO On-page', 'Panel autogestionable', 'Integración de analítica'].map((feat, i) => (
                  <li key={i} className={`flex items-start gap-3 text-xs sm:text-sm text-white/90`}>
                    <Check size={16} className="text-brand-lime shrink-0 mt-0.5" /> <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <RouterLink 
                to="/contacto"
                className="w-full py-2.5 sm:py-3 rounded-full bg-brand-lime text-brand-dark font-bold hover:bg-white transition-all duration-300 uppercase tracking-wide text-center text-xs shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
              >
                Solicitar
              </RouterLink>
            </motion.div>

            {/* Tier 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/5 border border-white/10 rounded-[1.6rem] sm:rounded-[2rem] p-5 sm:p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col group backdrop-blur-sm"
            >
              <h3 className="font-display text-lg sm:text-xl uppercase mb-2 text-white">E-commerce</h3>
              <p className="text-white/50 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">Tiendas online de alto rendimiento diseñadas para maximizar las ventas.</p>
              <div className="mb-5 sm:mb-6">
                <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-1 font-bold">Desde</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-display tracking-tight text-white">1.300</span>
                  <span className="text-xl text-white/50">€</span>
                </div>
              </div>
              <div className="w-full h-px bg-white/10 mb-5 sm:mb-6"></div>
              <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
                {['Catálogo de productos', 'Pasarelas de pago seguras', 'Gestión de stock y envíos', 'Emails transaccionales', 'Optimización de checkout'].map((feat, i) => (
                  <li key={i} className={`flex items-start gap-3 text-xs sm:text-sm text-white/80`}>
                    <Check size={16} className="text-white/30 shrink-0 mt-0.5" /> <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <RouterLink 
                to="/contacto"
                className="w-full py-2.5 sm:py-3 rounded-full border border-white/20 font-bold text-white hover:bg-white hover:text-brand-dark transition-all duration-300 uppercase tracking-wide text-center text-xs group-hover:border-white/40"
              >
                Solicitar
              </RouterLink>
            </motion.div>

            {/* Tier 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/5 border border-white/10 rounded-[1.6rem] sm:rounded-[2rem] p-5 sm:p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col group backdrop-blur-sm"
            >
              <h3 className="font-display text-lg sm:text-xl uppercase mb-2 text-white">A medida</h3>
              <p className="text-white/50 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">Aplicaciones web complejas, portales personalizados e integraciones.</p>
              <div className="mb-5 sm:mb-6">
                <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-1 font-bold">Desde</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-display tracking-tight text-white">2.000</span>
                  <span className="text-xl text-white/50">€</span>
                </div>
              </div>
              <div className="w-full h-px bg-white/10 mb-5 sm:mb-6"></div>
              <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
                {['Arquitectura escalable', 'Integración de APIs externas', 'Bases de datos complejas', 'Panel de control custom', 'Soporte técnico prioritario'].map((feat, i) => (
                  <li key={i} className={`flex items-start gap-3 text-xs sm:text-sm text-white/80`}>
                    <Check size={16} className="text-white/30 shrink-0 mt-0.5" /> <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <RouterLink 
                to="/contacto"
                className="w-full py-2.5 sm:py-3 rounded-full border border-white/20 font-bold text-white hover:bg-white hover:text-brand-dark transition-all duration-300 uppercase tracking-wide text-center text-xs group-hover:border-white/40"
              >
                Solicitar
              </RouterLink>
            </motion.div>
          </div>

          <div className="text-center mb-24 border-t border-white/10 pt-6">
            <p className="text-white/40 text-[10px] sm:text-xs font-mono uppercase tracking-widest">* Todos los precios son sin IVA. El coste final dependerá de los requisitos exactos de tu proyecto.</p>
          </div>

          {/* FAQs */}
          <div className="max-w-4xl mx-auto mb-20 sm:mb-24">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white text-center mb-10">Dudas habituales sobre presupuestos</h2>
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-brand-lime font-bold mb-3">{faq.q}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA AL FINAL */}
          <div className="bg-gradient-to-r from-brand-blue/20 to-brand-lime/10 border border-white/10 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto relative overflow-hidden backdrop-blur-sm">
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4">¿No tienes claro cuál es para ti?</h2>
              <p className="text-white/70 max-w-2xl mx-auto mb-8">
                Cada proyecto es un mundo. Cuéntanos qué necesitas y te preparamos una propuesta a medida, sin ningún tipo de compromiso.
              </p>
              <RouterLink 
                to="/contacto"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-lime px-8 py-4 text-xs sm:text-sm font-black uppercase tracking-widest text-brand-dark transition-transform hover:scale-[1.02] shadow-[0_0_30px_rgba(204,255,0,0.3)]"
              >
                Cuéntanos tu proyecto <ArrowRight size={18} />
              </RouterLink>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
