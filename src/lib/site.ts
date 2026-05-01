export const siteConfig = {
  name: 'Icono Studio',
  legalName: 'Icono Studio',
  url: 'https://icono.studio',
  locale: 'es_ES',
  gaMeasurementId: 'G-6SN5WBMG0V',
  city: 'Valencia',
  countryCode: 'ES',
  email: 'holaiconostudio@gmail.com',
  phoneDisplay: '623 783 129',
  phoneHref: 'tel:+34623783129',
  whatsappHref: 'https://wa.me/34623783129',
  defaultOgImage: '/brand-logo.png',
  defaultTitle: 'Diseño Web Valencia y SEO | Icono Studio',
  defaultDescription:
    'Agencia de diseño web en Valencia especializada en páginas rápidas, cuidadas y orientadas a captar clientes.',
} as const;

export const absoluteUrl = (path = '') => {
  if (!path) {
    return siteConfig.url;
  }

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
};

export const footerContactLinks = [
  { name: 'WhatsApp', href: siteConfig.whatsappHref },
  { name: 'Email', href: `mailto:${siteConfig.email}` },
  { name: 'Teléfono', href: siteConfig.phoneHref },
] as const;
