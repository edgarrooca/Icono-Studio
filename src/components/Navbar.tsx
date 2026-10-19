import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  Globe2,
  Megaphone,
  Menu,
  ShieldCheck,
  ShoppingBag,
  X,
} from 'lucide-react';
import { mainNavLinks, type NavLink } from '../data/navigation';
import { useScrollLock } from '../hooks/useScrollLock';

interface NavbarProps {
  initialTheme?: 'transparent' | 'dark' | 'light';
  ctaHref?: string;
  ctaLabel?: string;
  linksOverride?: NavLink[];
}

const EASE = [0.22, 1, 0.36, 1] as const;

type DesktopMenu = 'servicios' | null;

const serviceMenuItems = [
  {
    title: 'Diseño web',
    description: 'Una web clara y a medida para presentar tu negocio.',
    href: '/#servicios',
    icon: Globe2,
  },
  {
    title: 'Página promocional',
    description: 'Una página directa para promocionar una oferta o servicio.',
    href: '/#servicios',
    icon: Megaphone,
  },
  {
    title: 'Tienda online',
    description: 'Vende tus productos por internet con una experiencia sencilla.',
    href: '/#servicios',
    icon: ShoppingBag,
  },
  {
    title: 'Hosting y soporte',
    description: 'Mantenemos tu web online, actualizada y bajo control.',
    href: '/hosting-mantenimiento-web',
    icon: ShieldCheck,
  },
] as const;

export default function Navbar({
  initialTheme = 'transparent',
  ctaHref,
  ctaLabel = 'Pedir presupuesto',
  linksOverride,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState<DesktopMenu>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const navLinks = linksOverride ?? mainNavLinks;

  // Keep Icono Studio's labels and destinations while borrowing the exact
  // compact proportions and interaction language from the supplied reference.
  const headerLinkNames = linksOverride
    ? ['Servicios', 'Proyectos', 'Recursos', 'Contacto']
    : ['Servicios', 'Proyectos', 'Precios', 'Contacto'];
  const headerLinkFallbacks: Record<string, string> = {
    Servicios: '/#servicios',
    Proyectos: '/proyectos',
    Recursos: '/precios',
    Precios: '/precios',
    Contacto: '/contacto',
  };
  const headerLinks = headerLinkNames.map((name) => {
    const sourceLink = navLinks.find((link) => link.name === name);
    return {
      name,
      href: sourceLink?.href ?? headerLinkFallbacks[name],
    };
  });
  const headerCtaHref = ctaHref ?? '/contacto';

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setDesktopMenuOpen(null);
  }, [location.pathname, location.hash]);

  // Lock body scroll when mobile menu is open
  useScrollLock(mobileMenuOpen);
  useEffect(() => {
    if (mobileMenuOpen) {
      const frame = requestAnimationFrame(() => {
        headerRef.current?.querySelector<HTMLElement>('#mobile-menu-panel a, #mobile-menu-panel button')?.focus();
      });
      const trapFocus = (event: KeyboardEvent) => {
        if (event.key !== 'Tab' || !headerRef.current) return;
        const controls = Array.from<HTMLElement>(headerRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
          .filter((element) => element.getClientRects().length > 0 && !element.closest('[inert]'));
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && (document.activeElement === first || !headerRef.current.contains(document.activeElement))) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      };
      window.addEventListener('keydown', trapFocus);
      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener('keydown', trapFocus);
        mobileToggleRef.current?.focus({ preventScroll: true });
      };
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeMenus = () => {
      setMobileMenuOpen(false);
      setMobileServicesOpen(false);
      setDesktopMenuOpen(null);
    };
    desktop.addEventListener('change', closeMenus);
    return () => desktop.removeEventListener('change', closeMenus);
  }, []);

  // Cerrar los menús con Escape
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        setDesktopMenuOpen(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // --------------------------------------------------------------------
  // Color tokens
  // --------------------------------------------------------------------
  const textClass = 'text-[#4D585F]';
  const mobileToggleHover = 'hover:bg-[#0000EE]/[0.06]';

  // --------------------------------------------------------------------
  // Active helpers
  // --------------------------------------------------------------------
  const isHrefActive = (href: string) => {
    if (href === '/blog') {
      return location.pathname === '/blog' || location.pathname.startsWith('/blog/');
    }
    if (href.startsWith('/#')) {
      if (location.pathname !== '/') return false;
      const targetHash = href.replace('/', '');
      if (href === '/#inicio') return location.hash === '' || location.hash === '#inicio';
      return location.hash === targetHash;
    }
    return location.pathname === href;
  };

  const isLinkActive = (link: NavLink) => {
    if (link.children?.length) return link.children.some((c) => isHrefActive(c.href));
    return link.href ? isHrefActive(link.href) : false;
  };

  const getDesktopMenu = (name: string): Exclude<DesktopMenu, null> | null => {
    if (name === 'Servicios') return 'servicios';
    return null;
  };

  const pushNav = (item: string) => {
    (window as any).dataLayer?.push({
      event: 'nav_click',
      nav_item: item,
      page_path: window.location.pathname,
    });
  };
  const pushCta = (id: string, text: string) => {
    (window as any).dataLayer?.push({
      event: 'cta_click',
      cta_id: id,
      cta_text: text,
      page_path: window.location.pathname,
    });
  };

  const handleHeaderCtaClick = (event: MouseEvent<HTMLAnchorElement>) => {
    pushCta('nav_budget', `${ctaLabel} (Nav)`);
    if (!headerCtaHref.startsWith('#')) return;
    event.preventDefault();
    document.querySelector(headerCtaHref)?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderHeaderCta = () => {
    const content = (
      <div
        className="group/header-cta relative flex h-[38.2031px] w-max min-w-[124.25px] shrink-0 items-center justify-center gap-2 overflow-clip rounded-full border border-[#9ED6F1] bg-[#9ED6F1] px-3 py-[10px] text-[#0B1B63] transition-[background-color,filter,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/header-cta:-translate-y-[1px] group-hover/header-cta:scale-[1.02] group-hover/header-cta:bg-[#8FCFEF] group-hover/header-cta:brightness-[1.03]"
        style={{
          boxShadow:
            'rgba(255, 255, 255, 0.5) 4px 4px 8px 0 inset, rgba(42, 109, 152, 0.16) -4px -4px 8px 0 inset, rgba(11, 27, 99, 0.18) 0 4px 16px 0',
        }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-[-25%] left-[-45%] z-0 w-1/3 -skew-x-[18deg] bg-white/40 opacity-0 blur-[1px] transition-[left,opacity] duration-700 ease-out group-hover/header-cta:left-[125%] group-hover/header-cta:opacity-100"
        />
        <span className="relative z-10 whitespace-nowrap font-sans text-[14px] font-semibold leading-[18.2px] text-[#0B1B63]">
          {ctaLabel}
        </span>
        <ArrowRight
          aria-hidden="true"
          size={16}
          strokeWidth={2}
          className="relative z-10 shrink-0 transition-transform duration-300 group-hover/header-cta:translate-x-1"
        />
      </div>
    );

    if (headerCtaHref.startsWith('#')) {
      return (
        <a
          href={headerCtaHref}
          id="cta_nav_budget"
          onClick={handleHeaderCtaClick}
          className="group/header-cta flex h-[38.2031px] w-max items-center justify-center rounded-full text-[#0000EE]"
        >
          {content}
        </a>
      );
    }

    return (
      <RouterLink
        to={headerCtaHref}
        id="cta_nav_budget"
        onClick={() => pushCta('nav_budget', `${ctaLabel} (Nav)`)}
        className="group/header-cta flex h-[38.2031px] w-max items-center justify-center rounded-full text-[#0000EE]"
      >
        {content}
      </RouterLink>
    );
  };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-5 z-50 flex justify-center">
        <div
          ref={headerRef}
          className="pointer-events-auto relative box-border flex h-auto min-h-[58.2031px] w-[860px] max-w-full flex-col items-center justify-start gap-y-[10px] px-[30px]"
          onMouseLeave={() => setDesktopMenuOpen(null)}
        >
          {/* Desktop header: Icono Studio content using the supplied reference geometry. */}
          <div
            className="relative hidden h-[58.2031px] w-[800px] max-w-full shrink-0 items-center gap-x-5 overflow-hidden rounded-[10px] bg-white p-[10px] lg:flex"
            style={{ boxShadow: 'rgba(221, 229, 237, 0.7) 0px 0px 0px 4px' }}
          >
            <div className="flex h-[38.2031px] w-[77px] shrink-0 flex-col items-start gap-y-0">
              <RouterLink
                to="/"
                aria-label="Icono Studio - Inicio"
                className="block h-[38.2031px] w-[77px] shrink-0 text-[#0000EE]"
              >
                <img
                  src="/icono-studio-logo.png"
                  alt="Icono Studio"
                  className="block h-[38px] w-auto max-w-[77px] object-contain object-left brightness-0"
                />
              </RouterLink>
            </div>

            <nav className="flex h-[36.7969px] w-[411.109px] grow shrink-0 items-center justify-center gap-x-1">
              {headerLinks.map((link) => {
                const menu = getDesktopMenu(link.name);
                const label = (
                  <p className="m-0 h-[20.7969px] whitespace-nowrap font-sans text-[16px] font-semibold leading-[20.7969px] text-[#4D585F]">
                    {link.name}
                  </p>
                );

                return (
                  <div
                    key={link.name}
                    className="h-[36.7969px] shrink-0"
                    onMouseEnter={() => setDesktopMenuOpen(menu)}
                  >
                    {menu ? (
                      <button
                        type="button"
                        aria-expanded={desktopMenuOpen === menu}
                        aria-controls="desktop-mega-menu"
                        onFocus={() => setDesktopMenuOpen(menu)}
                        onClick={() => setDesktopMenuOpen(menu)}
                        className="flex h-[36.7969px] w-max items-center justify-center gap-x-[8px] overflow-clip rounded-full bg-white px-4 py-2 text-[#0000EE] transition-colors duration-200 hover:bg-[#F4F6F8]"
                      >
                        <span className="flex h-[20.7969px] shrink-0 flex-col justify-start">
                          {label}
                        </span>
                        <ChevronDown
                          aria-hidden="true"
                          size={15}
                          strokeWidth={1.8}
                          className={`shrink-0 text-[#71808A] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            desktopMenuOpen === menu ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    ) : (
                      <RouterLink
                        to={link.href}
                        onClick={() => pushNav(link.name)}
                        className="flex h-[36.7969px] w-max items-center justify-center gap-x-[10px] overflow-clip rounded-full bg-white px-4 py-2 text-[#0000EE] transition-colors duration-200 hover:bg-[#F4F6F8]"
                      >
                        <span className="flex h-[20.7969px] shrink-0 flex-col justify-start">
                          {label}
                        </span>
                      </RouterLink>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="flex h-[38.2031px] min-w-[164.438px] shrink-0 items-center justify-end gap-x-[10px]">
              <div className="h-[38.2031px] w-max shrink-0">
                {renderHeaderCta()}
              </div>
            </div>
          </div>

          <m.div
            id="desktop-mega-menu"
            role="region"
            aria-label="Servicios"
            aria-hidden={desktopMenuOpen !== 'servicios'}
            inert={desktopMenuOpen !== 'servicios'}
            initial={false}
            animate={
              desktopMenuOpen === 'servicios'
                ? { height: 'auto', opacity: 1, y: 0, scale: 1 }
                : { height: 0, opacity: 0, y: -6, scale: 0.99 }
            }
            transition={{ duration: 0.34, ease: EASE }}
            style={{ transformOrigin: 'top center' }}
            className={`relative hidden w-[800px] max-w-full overflow-hidden rounded-[10px] lg:block ${
              desktopMenuOpen === 'servicios' ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
          >
            <div
              className="rounded-[10px] bg-white p-[6px]"
              style={{ boxShadow: 'rgba(221, 229, 237, 0.7) 0px 0px 0px 4px' }}
            >
              <div className="grid grid-cols-[1.32fr_0.88fr] gap-3">
                <div className="grid grid-cols-2 gap-2 rounded-[14px] bg-[#F7F9FC] p-2">
                      {serviceMenuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <RouterLink
                            key={item.title}
                            to={item.href}
                            onClick={() => {
                              pushNav(item.title);
                              setDesktopMenuOpen(null);
                            }}
                            className="group flex min-h-[94px] flex-col items-start rounded-[12px] bg-white px-3.5 py-3 transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-[#F1F8FD] hover:shadow-[0_8px_24px_rgba(42,109,152,0.09)]"
                          >
                            <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#EAF6FC] text-[#2A6D98] transition-colors duration-300 group-hover:bg-[#9ED6F1] group-hover:text-[#0B1B63]">
                              <Icon aria-hidden="true" size={16} strokeWidth={1.8} />
                            </span>
                            <span className="font-sans text-[14px] font-semibold leading-[18px] text-[#0B1B63]">
                              {item.title}
                            </span>
                            <span className="mt-1 max-w-[220px] font-sans text-[12px] leading-[16px] text-[#71808A]">
                              {item.description}
                            </span>
                          </RouterLink>
                        );
                      })}
                    </div>

                    <div className="flex min-h-[204px] flex-col justify-between rounded-[14px] bg-[#0B1B63] p-5 text-white">
                      <div>
                        <p className="m-0 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9ED6F1]">
                          Para empezar
                        </p>
                        <h2 className="mb-0 mt-3 max-w-[230px] font-sans text-[22px] font-semibold leading-[26px] tracking-[-0.03em]">
                          ¿No sabes qué web necesita tu negocio?
                        </h2>
                        <p className="mb-0 mt-3 max-w-[240px] font-sans text-[13px] leading-[19px] text-white/70">
                          Te ayudamos a encontrar una opción clara, útil y ajustada a lo que necesitas.
                        </p>
                      </div>
                      <RouterLink
                        to="/contacto"
                        onClick={() => {
                          pushNav('Hablar sobre mi proyecto');
                          setDesktopMenuOpen(null);
                        }}
                        className="mt-5 inline-flex w-max items-center gap-2 rounded-full bg-[#9ED6F1] px-3.5 py-2.5 font-sans text-[13px] font-semibold text-[#0B1B63] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-white"
                      >
                        Hablamos de tu proyecto
                        <ArrowUpRight aria-hidden="true" size={15} strokeWidth={2} />
                      </RouterLink>
                    </div>
              </div>
            </div>
          </m.div>

          {/* Compact fallback for phones; the supplied spec has no mobile override. */}
          <div
            className="relative flex h-[58.2031px] w-full max-w-[800px] shrink-0 items-center justify-between overflow-hidden rounded-[10px] bg-white p-[10px] lg:hidden"
            style={{ boxShadow: 'rgba(221, 229, 237, 0.7) 0px 0px 0px 4px' }}
          >
            <RouterLink
              to="/"
              aria-label="Icono Studio - Inicio"
              className="block h-[38.2031px] w-[130.125px] shrink-0 text-[#0000EE]"
            >
              <img
                src="/icono-studio-logo.png"
                alt="Icono Studio"
                className="block h-[38px] w-auto max-w-[130.125px] object-contain object-left brightness-0"
              />
            </RouterLink>
            <button
              ref={mobileToggleRef}
              type="button"
              className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 ${textClass} ${mobileToggleHover}`}
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu-panel"
            >
              <AnimatePresence mode="wait" initial={false}>
                <m.span
                  key={mobileMenuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </m.span>
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile menu sheet inside the header so it always sits just below it */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <m.div
                initial={{ opacity: 0, y: -8, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.985 }}
                transition={{ duration: 0.28, ease: EASE }}
                id="mobile-menu-panel"
                className="absolute inset-x-3 top-full z-50 mt-2 max-h-[calc(100dvh-7rem)] overflow-hidden rounded-3xl border border-white/10 bg-brand-dark shadow-[0_30px_80px_rgba(15,23,42,0.55)] sm:inset-x-4 lg:hidden"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-brand-blue/15 blur-3xl" />
                <div className="relative max-h-[calc(100dvh-9rem)] space-y-2 overflow-y-auto px-4 py-5 text-white sm:px-5 sm:py-6">
                  <nav className="space-y-2">
                    {navLinks.map((link) =>
                      link.children?.length ? (
                        <div
                          key={link.name}
                          className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                        >
                          <button
                            type="button"
                            onClick={() => setMobileServicesOpen((v) => !v)}
                            aria-expanded={mobileServicesOpen}
                            className="flex w-full items-center justify-between px-4 py-4 text-left text-base font-medium tracking-tight sm:text-lg"
                          >
                            <span>{link.name}</span>
                            <ChevronDown
                              size={18}
                              className={`transition-transform duration-300 ${
                                mobileServicesOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          <AnimatePresence initial={false}>
                            {mobileServicesOpen && (
                              <m.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: EASE }}
                                className="overflow-hidden"
                              >
                                <div className="space-y-1.5 px-3 pb-3">
                                  {link.children.map((child) => {
                                    const active = isHrefActive(child.href);
                                    return (
                                      <RouterLink
                                        key={child.href}
                                        to={child.href}
                                        onClick={() => {
                                          pushNav(child.name);
                                          setMobileMenuOpen(false);
                                          setMobileServicesOpen(false);
                                        }}
                                        className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                                          active
                                            ? 'bg-[#9ED6F1] text-[#0B1B63]'
                                            : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white'
                                        }`}
                                      >
                                        {child.name}
                                      </RouterLink>
                                    );
                                  })}
                                </div>
                              </m.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <RouterLink
                          key={link.name}
                          to={link.href!}
                          onClick={() => {
                            pushNav(link.name);
                            setMobileMenuOpen(false);
                          }}
                          className={`block rounded-2xl border px-4 py-4 text-base font-medium tracking-tight transition-colors sm:text-lg ${
                            isLinkActive(link)
                              ? 'border-[#9ED6F1]/40 bg-[#9ED6F1]/10 text-[#9ED6F1]'
                              : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                          }`}
                        >
                          {link.name}
                        </RouterLink>
                      )
                    )}
                  </nav>

                  <div className="mt-4 border-t border-white/10 pt-4 sm:mt-5 sm:pt-5">
                    {ctaHref ? (
                      <a
                        href={ctaHref}
                        onClick={(e) => {
                          pushCta('mobile_nav_budget', `${ctaLabel} (Mobile Nav)`);
                          setMobileMenuOpen(false);
                          if (!ctaHref.startsWith('#')) return;
                          e.preventDefault();
                          setTimeout(
                            () =>
                              document
                                .querySelector(ctaHref)
                                ?.scrollIntoView({ behavior: 'smooth' }),
                            300
                          );
                        }}
                        className="block w-full rounded-full bg-[#9ED6F1] py-3.5 text-center text-[0.98rem] font-semibold text-[#0B1B63] transition-colors hover:bg-white sm:py-4 sm:text-base"
                      >
                        {ctaLabel}
                      </a>
                    ) : (
                      <RouterLink
                        to="/contacto"
                        onClick={() => {
                          pushCta('mobile_nav_budget', 'Presupuesto (Mobile Nav)');
                          setMobileMenuOpen(false);
                        }}
                        className="block w-full rounded-full bg-[#9ED6F1] py-3.5 text-center text-[0.98rem] font-semibold text-[#0B1B63] transition-colors hover:bg-white sm:py-4 sm:text-base"
                      >
                        {ctaLabel}
                      </RouterLink>
                    )}
                  </div>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Backdrop outside the header, below it in stacking order, covers whole viewport */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setMobileMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-brand-dark/60 backdrop-blur-md lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
