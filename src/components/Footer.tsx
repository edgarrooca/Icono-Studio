import { ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mainNavLinks } from '../data/navigation';
import { seoLocations } from '../data/seoLocations';
import { footerContactLinks, siteConfig } from '../lib/site';

interface FooterProps {
  hideCTA?: boolean;
}

const contactIcons = {
  WhatsApp: MessageCircle,
  Email: Mail,
  Teléfono: Phone,
} as const;

export default function Footer({ hideCTA: _hideCTA = false }: FooterProps) {
  const footerNavLinks = mainNavLinks.flatMap((link) => {
    if (link.children?.length) {
      return link.children
        .filter((child) => !child.name.startsWith('Diseño Web'))
        .map((child) => ({ name: child.name, href: child.href }));
    }

    return link.href ? [{ name: link.name, href: link.href }] : [];
  });

  return (
    <footer className="relative z-20 border-t border-[#DCE5EE] bg-white px-5 pb-6 pt-9 sm:px-6 sm:pb-7 sm:pt-12 lg:px-8 lg:pt-14">
      <div className="mx-auto max-w-[1380px]">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr] lg:gap-20">
          <div className="md:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex" aria-label="Icono Studio, inicio">
              <img src="/icono-studio-logo.png" alt="Icono Studio" className="h-11 w-auto object-contain" style={{ filter: 'brightness(0)' }} />
            </Link>
            <p className="mt-5 max-w-md text-[0.95rem] leading-[1.7] text-[#526477]">
              Diseño web y SEO para negocios que quieren explicar mejor lo que hacen y recibir más contactos.
            </p>
            <Link
              to="/contacto"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#0B1B63] transition-colors hover:text-[#2A6D98]"
            >
              Hablemos de tu proyecto <ArrowUpRight size={16} strokeWidth={1.8} />
            </Link>
          </div>

          <div>
            <h2 className="text-xs font-bold tracking-[0.16em] text-[#0B1B63]">Navegación</h2>
            <ul className="mt-3 grid gap-2 text-sm font-medium text-[#526477] sm:mt-5 sm:gap-3">
              {footerNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={() => (window as any).dataLayer?.push({
                      event: 'nav_click',
                      nav_item: link.name,
                      page_path: window.location.pathname,
                    })}
                    className="transition-colors hover:text-[#0B1B63]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-bold tracking-[0.16em] text-[#0B1B63]">Contacto</h2>
            <ul className="mt-3 grid gap-2 text-sm font-medium text-[#526477] sm:mt-5 sm:gap-3">
              {footerContactLinks.map((link) => {
                const Icon = contactIcons[link.name];

                return (
                  <li key={link.name}>
                    <a href={link.href} className="inline-flex items-center gap-2.5 transition-colors hover:text-[#0B1B63]">
                      <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="mt-7 max-w-[15rem] text-sm leading-relaxed text-[#526477]">
              Respondemos en menos de 24 horas laborables.
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-[#DCE5EE] pt-7 sm:mt-16">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.16em] text-[#0B1B63]">Diseño web en España</p>
              <div className="mt-3 flex max-w-3xl flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-[#5F7186]">
                {seoLocations.map((loc) => (
                  <Link
                    key={loc.slug}
                    to={`/diseno-web-${loc.slug}`}
                    onClick={() => (window as any).dataLayer?.push({
                      event: 'nav_click',
                      nav_item: `Diseño Web ${loc.name}`,
                      page_path: window.location.pathname,
                    })}
                    className="transition-colors hover:text-[#0B1B63]"
                  >
                    {loc.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-[#5F7186] lg:justify-end">
              <Link to="/aviso-legal" className="transition-colors hover:text-[#0B1B63]">Aviso legal</Link>
              <Link to="/politica-de-privacidad" className="transition-colors hover:text-[#0B1B63]">Privacidad</Link>
            </div>
          </div>

          <p className="mt-8 text-xs font-medium text-[#5F7186]">© 2026 {siteConfig.name}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
