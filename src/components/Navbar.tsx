import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { mainNavLinks, type NavLink } from '../data/navigation';

interface NavbarProps {
  initialTheme?: 'transparent' | 'dark';
  ctaHref?: string;
}

export default function Navbar({ initialTheme = 'transparent', ctaHref }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
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

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname, location.hash]);

  const isHrefActive = (href: string) => {
    if (href === '/blog') {
      return location.pathname === '/blog' || location.pathname.startsWith('/blog/');
    }

    if (href.startsWith('/#')) {
      if (location.pathname !== '/') {
        return false;
      }

      const targetHash = href.replace('/', '');
      if (href === '/#inicio') {
        return location.hash === '' || location.hash === '#inicio';
      }

      return location.hash === targetHash;
    }

    return location.pathname === href;
  };

  const isLinkActive = (link: NavLink) => {
    if (link.children?.length) {
      return link.children.some((child) => isHrefActive(child.href));
    }

    return link.href ? isHrefActive(link.href) : false;
  };

  const desktopLinkClass = (active: boolean) =>
    `transition-colors uppercase ${active ? 'text-brand-lime' : 'hover:text-brand-lime text-white/80'}`;

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
            <div className="hidden lg:flex items-center gap-8 text-[11px] xl:text-xs font-black uppercase tracking-[0.2em]">
              {mainNavLinks.map((link) => (
                link.children?.length ? (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setServicesOpen((current) => !current)}
                      className={`${desktopLinkClass(isLinkActive(link))} inline-flex items-center gap-2`}
                    >
                      {link.name}
                      <ChevronDown size={14} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-1/2 top-full mt-4 w-72 -translate-x-1/2 rounded-[1.75rem] border border-gray-100 bg-white p-3 text-brand-dark shadow-[0_24px_60px_rgba(15,23,42,0.16)]"
                        >
                          <div className="space-y-1">
                            {link.children.map((child) => (
                              <RouterLink
                                key={child.href}
                                to={child.href}
                                onClick={() => {
                                  (window as any).dataLayer?.push({
                                    'event': 'nav_click',
                                    'nav_item': child.name,
                                    'page_path': window.location.pathname
                                  });
                                  setServicesOpen(false);
                                }}
                                className={`flex items-center justify-between rounded-[1.25rem] px-4 py-3 text-[11px] font-black uppercase tracking-[0.18em] transition-colors ${
                                  isHrefActive(child.href)
                                    ? 'bg-brand-dark text-brand-lime'
                                    : 'text-brand-dark hover:bg-zinc-50'
                                }`}
                              >
                                <span>{child.name}</span>
                                <ArrowRight size={14} className={isHrefActive(child.href) ? 'text-brand-lime' : 'text-gray-400'} />
                              </RouterLink>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <RouterLink
                    key={link.name}
                    to={link.href!}
                    onClick={() => (window as any).dataLayer?.push({
                      'event': 'nav_click',
                      'nav_item': link.name,
                      'page_path': window.location.pathname
                    })}
                    className={desktopLinkClass(isLinkActive(link))}
                  >
                    {link.name}
                  </RouterLink>
                )
              ))}
            </div>
            
            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4 z-50">
              {ctaHref ? (
                <a 
                  href={ctaHref}
                  id="cta_nav_budget"
                  onClick={(e) => {
                    e.preventDefault();
                    (window as any).dataLayer?.push({
                      'event': 'cta_click',
                      'cta_id': 'nav_budget',
                      'cta_text': 'Presupuesto (Nav)',
                      'page_path': window.location.pathname
                    });
                    document.querySelector(ctaHref)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`hidden md:flex px-6 py-2.5 rounded-full font-black text-[11px] uppercase tracking-widest items-center gap-2 transition-all hover:scale-105 ${isSolid ? 'bg-brand-lime text-brand-dark' : 'bg-brand-blue text-white shadow-xl shadow-brand-blue/20'}`}
                >
                  Presupuesto <ArrowRight size={14} />
                </a>
              ) : (
                <RouterLink 
                  to="/contacto" 
                  id="cta_nav_budget"
                  onClick={() => (window as any).dataLayer?.push({
                    'event': 'cta_click',
                    'cta_id': 'nav_budget',
                    'cta_text': 'Presupuesto (Nav)',
                    'page_path': window.location.pathname
                  })}
                  className={`hidden md:flex px-6 py-2.5 rounded-full font-black text-[11px] uppercase tracking-widest items-center gap-2 transition-all hover:scale-105 ${isSolid ? 'bg-brand-lime text-brand-dark' : 'bg-brand-blue text-white shadow-xl shadow-brand-blue/20'}`}
                >
                  Presupuesto <ArrowRight size={14} />
                </RouterLink>
              )}
              
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
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-brand-dark/70 backdrop-blur-sm lg:hidden"
              aria-label="Cerrar menú"
            />

            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2 }}
              className="fixed left-4 right-4 top-24 sm:top-28 z-40 lg:hidden"
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-brand-dark px-5 py-5 text-white shadow-[0_24px_60px_rgba(15,23,42,0.4)]">
                <div className="absolute top-0 right-0 h-48 w-48 translate-x-1/4 -translate-y-1/3 rounded-full bg-brand-blue/10 blur-3xl pointer-events-none" />

                <div className="relative max-h-[calc(100vh-8.5rem)] overflow-y-auto pr-1">
                  <div className="space-y-2">
                    {mainNavLinks.map((link) => (
                      link.children?.length ? (
                        <div key={link.name} className="rounded-[1.5rem] border border-white/10 bg-white/5">
                          <button
                            type="button"
                            onClick={() => setMobileServicesOpen((current) => !current)}
                            className={`flex w-full items-center justify-between px-4 py-4 text-left text-lg font-display uppercase tracking-tight transition-colors ${
                              isLinkActive(link) ? 'text-brand-lime' : 'text-white'
                            }`}
                          >
                            <span>{link.name}</span>
                            <ChevronDown size={18} className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                          </button>

                          <AnimatePresence initial={false}>
                            {mobileServicesOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="space-y-2 px-3 pb-3">
                                  {link.children.map((child) => (
                                    <RouterLink
                                      key={child.href}
                                      to={child.href}
                                      onClick={() => {
                                        (window as any).dataLayer?.push({
                                          'event': 'nav_click',
                                          'nav_item': child.name,
                                          'page_path': window.location.pathname
                                        });
                                        setMobileMenuOpen(false);
                                      }}
                                      className={`block rounded-[1.1rem] px-4 py-3 text-[11px] font-black uppercase tracking-[0.18em] transition-colors ${
                                        isHrefActive(child.href)
                                          ? 'bg-brand-lime text-brand-dark'
                                          : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white'
                                      }`}
                                    >
                                      {child.name}
                                    </RouterLink>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <RouterLink
                          key={link.name}
                          to={link.href!}
                          onClick={() => {
                            (window as any).dataLayer?.push({
                              'event': 'nav_click',
                              'nav_item': link.name,
                              'page_path': window.location.pathname
                            });
                            setMobileMenuOpen(false);
                          }}
                          className={`block rounded-[1.5rem] border px-4 py-4 font-display text-xl uppercase tracking-tight transition-colors ${
                            isLinkActive(link)
                              ? 'border-brand-lime/40 bg-brand-lime/10 text-brand-lime'
                              : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                          }`}
                        >
                          {link.name}
                        </RouterLink>
                      )
                    ))}
                  </div>

                  <div className="mt-5 border-t border-white/10 pt-5">
                    {ctaHref ? (
                      <a
                        href={ctaHref}
                        id="cta_mobile_nav_budget"
                        onClick={(e) => {
                          e.preventDefault();
                          (window as any).dataLayer?.push({
                            'event': 'cta_click',
                            'cta_id': 'mobile_nav_budget',
                            'cta_text': 'Pedir Presupuesto (Mobile Nav)',
                            'page_path': window.location.pathname
                          });
                          setMobileMenuOpen(false);
                          setTimeout(() => document.querySelector(ctaHref)?.scrollIntoView({ behavior: 'smooth' }), 300);
                        }}
                        className="block w-full rounded-2xl bg-brand-lime py-4 text-center text-[11px] font-black uppercase tracking-[0.24em] text-brand-dark"
                      >
                        Pedir presupuesto
                      </a>
                    ) : (
                      <RouterLink
                        to="/contacto"
                        id="cta_mobile_nav_budget"
                        onClick={() => {
                          (window as any).dataLayer?.push({
                            'event': 'cta_click',
                            'cta_id': 'mobile_nav_budget',
                            'cta_text': 'Pedir Presupuesto (Mobile Nav)',
                            'page_path': window.location.pathname
                          });
                          setMobileMenuOpen(false);
                        }}
                        className="block w-full rounded-2xl bg-brand-lime py-4 text-center text-[11px] font-black uppercase tracking-[0.24em] text-brand-dark"
                      >
                        Pedir presupuesto
                      </RouterLink>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
