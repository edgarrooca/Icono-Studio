import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mainNavLinks } from '../data/navigation';
import { footerContactLinks, siteConfig } from '../lib/site';

interface FooterProps {
  hideCTA?: boolean;
}

export default function Footer({ hideCTA = false }: FooterProps) {
  return (
    <footer className={`bg-brand-dark text-white ${hideCTA ? 'pt-8' : 'pt-16 sm:pt-20'} pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden w-full`}>
      {/* TRULY Edge-to-edge separator line - Forces width beyond parent containers */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-px bg-white/30 z-50 pointer-events-none"></div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {!hideCTA && (
          <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
            <h2 className="font-display text-[14vw] sm:text-[16vw] md:text-[14vw] leading-[0.8] uppercase tracking-tighter mb-8 sm:mb-12 text-brand-lime">
              ¿Hablamos?
            </h2>
            <motion.a 
              href="/contacto"
              id="cta_footer_contact"
              onClick={() => (window as any).dataLayer?.push({
                'event': 'cta_click',
                'cta_id': 'footer_contact',
                'cta_text': 'Pedir Presupuesto (Footer)',
                'page_path': window.location.pathname
              })}
              whileHover="hover"
              initial="initial"
              className="group relative inline-flex items-center justify-center gap-3 sm:gap-4 bg-white text-brand-dark px-8 sm:px-12 py-4 sm:py-6 rounded-full font-display text-xl sm:text-2xl uppercase overflow-hidden transition-all duration-300 w-full sm:w-auto"
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
              <span className="relative z-20">Pedir Presupuesto</span> 
              <ArrowUpRight size={24} className="sm:w-7 sm:h-7 relative z-20 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <img 
                src="/icono-studio-logo.png" 
                alt="Icono Studio Logo" 
                className="h-10 sm:h-12 w-auto object-contain filter brightness-0 invert mx-auto md:mx-0" 
              />
            </div>
            <p className="text-white/60 max-w-sm text-base sm:text-lg mx-auto md:mx-0">
              Agencia de diseño y desarrollo web en Valencia. Creamos webs rápidas, cuidadas y pensadas para convertir visitas en contactos.
            </p>
          </div>
          
          <div className="text-center md:text-left">
            <h4 className="font-bold uppercase tracking-wider mb-4 sm:mb-6 text-brand-lime">Navegación</h4>
            <ul className="space-y-3 sm:space-y-4 text-white/70 font-medium text-sm sm:text-base">
              {mainNavLinks.map(link => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    onClick={() => (window as any).dataLayer?.push({
                      'event': 'nav_click',
                      'nav_item': link.name,
                      'page_path': window.location.pathname
                    })}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-bold uppercase tracking-wider mb-4 sm:mb-6 text-brand-lime">Contacto</h4>
            <ul className="space-y-3 sm:space-y-4 text-white/70 font-medium text-sm sm:text-base">
              {footerContactLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 border-t border-white/20 pt-8 mt-10 sm:mt-12 text-xs sm:text-sm text-white/50 font-mono text-center md:text-left">
          <p>© 2026 {siteConfig.name}. Todos los derechos reservados.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link to="/aviso-legal" className="hover:text-white transition-colors">Aviso Legal</Link>
            <Link to="/politica-de-privacidad" className="hover:text-white transition-colors">Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
