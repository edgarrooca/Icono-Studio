import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mainNavLinks } from '../data/navigation';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-16 sm:pt-20 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8 rounded-t-[2.5rem] sm:rounded-t-[3rem] md:rounded-t-[4rem] mt-8 sm:mt-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <h2 className="font-display text-[18vw] sm:text-[16vw] md:text-[14vw] leading-[0.8] uppercase tracking-tighter mb-8 sm:mb-12 text-brand-lime">
            ¿Hablamos?
          </h2>
          <motion.a 
            href="mailto:hola@iconostudio.com"
            whileHover="hover"
            initial="initial"
            className="group relative inline-flex items-center justify-center gap-3 sm:gap-4 bg-white text-brand-dark px-8 sm:px-12 py-4 sm:py-6 rounded-full font-display text-xl sm:text-2xl uppercase overflow-hidden transition-all duration-300 w-full sm:w-auto"
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
                  background: 'linear-gradient(90deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 70%)',
                }}
              />
            </div>
            <span className="relative z-20">Pedir Presupuesto</span> 
            <ArrowUpRight size={24} className="sm:w-7 sm:h-7 relative z-20 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 border-t border-white/20 pt-10 sm:pt-12">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <img 
                src="/icono-studio-logo.png" 
                alt="Icono Studio Logo" 
                className="h-10 sm:h-12 w-auto object-contain filter brightness-0 invert mx-auto md:mx-0" 
              />
            </div>
            <p className="text-white/60 max-w-sm text-base sm:text-lg mx-auto md:mx-0">
              Agencia de diseño y desarrollo web en Valencia. Creando experiencias digitales que marcan la diferencia con un servicio cercano y profesional.
            </p>
          </div>
          
          <div className="text-center md:text-left">
            <h4 className="font-bold uppercase tracking-wider mb-4 sm:mb-6 text-brand-lime">Navegación</h4>
            <ul className="space-y-3 sm:space-y-4 text-white/70 font-medium text-sm sm:text-base">
              {mainNavLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.href} className="hover:text-white transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-bold uppercase tracking-wider mb-4 sm:mb-6 text-brand-lime">Social</h4>
            <ul className="space-y-3 sm:space-y-4 text-white/70 font-medium text-sm sm:text-base">
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dribbble</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 border-t border-white/20 pt-8 mt-10 sm:mt-12 text-xs sm:text-sm text-white/50 font-mono text-center md:text-left">
          <p>© 2026 Icono-Studio. Todos los derechos reservados.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href="#" className="hover:text-white transition-colors">Aviso Legal</a>
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
