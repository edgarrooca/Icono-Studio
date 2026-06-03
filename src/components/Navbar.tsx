import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { mainNavLinks, type NavLink } from '../data/navigation';

interface NavbarProps {
  initialTheme?: 'transparent' | 'dark' | 'light';
  ctaHref?: string;
  ctaLabel?: string;
}

export default function Navbar({ initialTheme = 'transparent', ctaHref, ctaLabel = 'Cuéntanos tu idea' }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if we should show the solid background
  // If initialTheme is dark, it's ALWAYS solid
  const isSolid = initialTheme === 'dark' || isScrolled;
  const isTransparentLight = initialTheme === 'light' && !isScrolled;

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

  const desktopLinkClass = (active: boolean) => {
    if (active) return `transition-colors font-medium ${isTransparentLight ? 'text-brand-blue' : 'text-brand-dark'}`;
    return `transition-colors font-medium ${isTransparentLight ? 'text-brand-dark/78 hover:text-brand-blue' : 'text-brand-dark/70 hover:text-brand-dark'}`;
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isSolid ? 'py-4' : 'py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center rounded-full px-4 sm:px-5 py-3 transition-all duration-300 ${
            isSolid
              ? 'border border-[#dcd3c6] bg-[#fbf7f0]/92 shadow-[0_18px_45px_rgba(37,51,68,0.12)] backdrop-blur-xl text-brand-dark'
              : isTransparentLight
                ? 'border border-[#e8e0d3] bg-white/80 shadow-[0_14px_38px_rgba(37,51,68,0.08)] backdrop-blur-xl text-brand-dark'
                : 'border border-white/35 bg-white/82 shadow-[0_14px_38px_rgba(37,51,68,0.08)] backdrop-blur-xl text-brand-dark'
          }`}>
            
            {/* Logo */}
            <RouterLink to="/" className="flex items-center gap-2 z-50 transition-transform hover:scale-[1.02]">
              <img 
                src="/icono-studio-logo.png" 
                alt="Icono Studio" 
                className="h-8 sm:h-10 w-auto object-contain brightness-0 opacity-90" 
              />
            </RouterLink>
            
            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-7 text-[1rem]">
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
                          className="absolute left-1/2 top-full mt-4 w-72 -translate-x-1/2 rounded-[1.65rem] border border-[#e8e0d3] bg-[#fffaf4] p-3 text-brand-dark shadow-[0_24px_60px_rgba(37,51,68,0.15)]"
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
                                className={`flex items-center justify-between rounded-[1.2rem] px-4 py-3 text-[0.98rem] font-medium transition-colors ${
                                  isHrefActive(child.href)
                                    ? 'bg-brand-dark text-white'
                                    : 'text-brand-dark hover:bg-[#f1eadf]'
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
                ctaHref.startsWith('#') ? (
                  <a 
                    href={ctaHref}
                    id="cta_nav_budget"
                    onClick={(e) => {
                      e.preventDefault();
                      (window as any).dataLayer?.push({
                        'event': 'cta_click',
                        'cta_id': 'nav_budget',
                        'cta_text': `${ctaLabel} (Nav)`,
                        'page_path': window.location.pathname
                      });
                      document.querySelector(ctaHref)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`hidden md:flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.98rem] font-medium transition-all hover:-translate-y-0.5 ${isSolid ? 'bg-brand-dark text-white shadow-[0_14px_28px_rgba(37,51,68,0.16)]' : 'bg-brand-blue text-white shadow-[0_14px_28px_rgba(72,102,200,0.24)]'}`}
                  >
                    {ctaLabel} <ArrowRight size={14} />
                  </a>
                ) : (
                  <RouterLink 
                    to={ctaHref}
                    id="cta_nav_budget"
                    onClick={() => (window as any).dataLayer?.push({
                      'event': 'cta_click',
                      'cta_id': 'nav_budget',
                      'cta_text': `${ctaLabel} (Nav)`,
                      'page_path': window.location.pathname
                    })}
                    className={`hidden md:flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.98rem] font-medium transition-all hover:-translate-y-0.5 ${isSolid ? 'bg-brand-dark text-white shadow-[0_14px_28px_rgba(37,51,68,0.16)]' : 'bg-brand-blue text-white shadow-[0_14px_28px_rgba(72,102,200,0.24)]'}`}
                  >
                    {ctaLabel} <ArrowRight size={14} />
                  </RouterLink>
                )
              ) : (
                <RouterLink 
                  to="/contacto" 
                  id="cta_nav_budget"
                  onClick={() => (window as any).dataLayer?.push({
                    'event': 'cta_click',
                    'cta_id': 'nav_budget',
                    'cta_text': `${ctaLabel} (Nav)`,
                    'page_path': window.location.pathname
                  })}
                  className={`hidden md:flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.98rem] font-medium transition-all hover:-translate-y-0.5 ${isSolid ? 'bg-brand-dark text-white shadow-[0_14px_28px_rgba(37,51,68,0.16)]' : 'bg-brand-blue text-white shadow-[0_14px_28px_rgba(72,102,200,0.24)]'}`}
                >
                  {ctaLabel} <ArrowRight size={14} />
                </RouterLink>
              )}
              
              <button 
                className="lg:hidden p-2 text-brand-dark"
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
              className="fixed inset-0 z-40 bg-brand-dark/24 backdrop-blur-sm lg:hidden"
              aria-label="Cerrar menú"
            />

            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2 }}
              className="fixed left-4 right-4 top-24 sm:top-28 z-40 lg:hidden"
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-[#e3dacd] bg-[#fffaf4] px-5 py-5 text-brand-dark shadow-[0_24px_60px_rgba(37,51,68,0.2)]">
                <div className="absolute top-0 right-0 h-48 w-48 translate-x-1/4 -translate-y-1/3 rounded-full bg-brand-blue/10 blur-3xl pointer-events-none" />

                <div className="relative max-h-[calc(100vh-8.5rem)] overflow-y-auto pr-1">
                  <div className="space-y-2">
                    {mainNavLinks.map((link) => (
                      link.children?.length ? (
                        <div key={link.name} className="rounded-[1.5rem] border border-[#ece3d7] bg-white">
                          <button
                            type="button"
                            onClick={() => setMobileServicesOpen((current) => !current)}
                            className={`flex w-full items-center justify-between px-4 py-4 text-left text-[1.2rem] font-medium transition-colors ${
                              isLinkActive(link) ? 'text-brand-blue' : 'text-brand-dark'
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
                                      className={`block rounded-[1.1rem] px-4 py-3 text-[0.98rem] font-medium transition-colors ${
                                        isHrefActive(child.href)
                                          ? 'bg-brand-dark text-white'
                                          : 'bg-[#f6f0e5] text-brand-dark/78 hover:bg-[#efe7da] hover:text-brand-dark'
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
                          className={`block rounded-[1.5rem] border px-4 py-4 text-[1.2rem] font-medium transition-colors ${
                            isLinkActive(link)
                              ? 'border-brand-blue/20 bg-brand-blue/8 text-brand-blue'
                              : 'border-[#ece3d7] bg-white text-brand-dark hover:bg-[#f7f1e7]'
                          }`}
                        >
                          {link.name}
                        </RouterLink>
                      )
                    ))}
                  </div>

                  <div className="mt-5 border-t border-[#ece3d7] pt-5">
                    {ctaHref ? (
                      <a
                        href={ctaHref}
                        id="cta_mobile_nav_budget"
                        onClick={(e) => {
                          e.preventDefault();
                          (window as any).dataLayer?.push({
                            'event': 'cta_click',
                            'cta_id': 'mobile_nav_budget',
                            'cta_text': `${ctaLabel} (Mobile Nav)`,
                            'page_path': window.location.pathname
                          });
                          setMobileMenuOpen(false);
                          setTimeout(() => document.querySelector(ctaHref)?.scrollIntoView({ behavior: 'smooth' }), 300);
                        }}
                        className="block w-full rounded-2xl bg-brand-dark py-4 text-center text-[1rem] font-medium text-white"
                      >
                        {ctaLabel}
                      </a>
                    ) : (
                      <RouterLink
                        to="/contacto"
                        id="cta_mobile_nav_budget"
                        onClick={() => {
                          (window as any).dataLayer?.push({
                            'event': 'cta_click',
                            'cta_id': 'mobile_nav_budget',
                            'cta_text': `${ctaLabel} (Mobile Nav)`,
                            'page_path': window.location.pathname
                          });
                          setMobileMenuOpen(false);
                        }}
                        className="block w-full rounded-2xl bg-brand-dark py-4 text-center text-[1rem] font-medium text-white"
                      >
                        {ctaLabel}
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
