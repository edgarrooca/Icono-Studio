import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { mainNavLinks } from '../data/navigation';

interface NavbarProps {
  initialTheme?: 'transparent' | 'dark';
}

export default function Navbar({ initialTheme = 'transparent' }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if we should show the solid background
  // If initialTheme is dark, it's ALWAYS solid
  const isSolid = initialTheme === 'dark' || isScrolled;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isSolid ? 'py-4' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center rounded-full px-6 py-3 transition-all duration-300 ${isSolid ? 'bg-brand-dark/95 backdrop-blur-md shadow-lg text-white border border-white/5' : 'bg-transparent text-white'}`}>
            
            {/* Logo */}
            <RouterLink to="/" className="flex items-center gap-2 z-50 transition-transform hover:scale-105">
              <img 
                src="/icono-studio-logo.png" 
                alt="Icono Studio" 
                className="h-8 sm:h-10 w-auto object-contain brightness-0 invert" 
              />
            </RouterLink>
            
            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em]">
              {mainNavLinks.map((link) => (
                <RouterLink 
                  key={link.name} 
                  to={link.href} 
                  className={`transition-colors ${location.pathname === link.href ? 'text-brand-lime' : 'hover:text-brand-lime text-white/80'}`}
                >
                  {link.name}
                </RouterLink>
              ))}
            </div>
            
            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4 z-50">
              <RouterLink 
                to="/contacto" 
                className={`hidden md:flex px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest items-center gap-2 transition-all hover:scale-105 ${isSolid ? 'bg-brand-lime text-brand-dark' : 'bg-brand-blue text-white shadow-xl shadow-brand-blue/20'}`}
              >
                Presupuesto <ArrowRight size={14} />
              </RouterLink>
              
              <button 
                className="lg:hidden p-2 text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-brand-dark text-white pt-32 px-10 flex flex-col gap-8 lg:hidden overflow-hidden"
          >
            {/* Decorative background elements for mobile menu */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            
            {mainNavLinks.map((link) => (
              <RouterLink 
                key={link.name} 
                to={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-5xl uppercase tracking-tighter hover:text-brand-lime transition-colors"
              >
                {link.name}
              </RouterLink>
            ))}

            <div className="mt-auto pb-12">
              <RouterLink 
                to="/contacto" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-brand-lime text-brand-dark py-5 rounded-2xl font-black uppercase tracking-widest text-center block text-[12px]"
              >
                Pedir Presupuesto
              </RouterLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
