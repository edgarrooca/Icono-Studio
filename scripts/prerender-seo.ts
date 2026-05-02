import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { blogPosts } from '../src/data/blog';
import { portfolioProjects } from '../src/data/projects';
import { absoluteUrl, siteConfig } from '../src/lib/site';

type PageType = 'website' | 'article' | 'service';

interface RouteMeta {
  path: string;
  title: string;
  description: string;
  image?: string;
  type?: PageType;
  robots?: string;
  schema?: Record<string, unknown>;
  priority?: string;
  lastmod?: string;
  includeInSitemap?: boolean;
}

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');
const templatePath = path.join(distDir, 'index.html');
const buildDate = new Date().toISOString();

const valenciaFaqs = [
  { q: '¿Cuánto cuesta una página web?', a: 'Depende del tipo de proyecto, pero una web básica empieza desde 350 € + IVA.' },
  { q: '¿Cuánto tardas en hacerla?', a: 'Una web sencilla suele estar lista en 1–3 semanas, dependiendo del contenido y revisiones.' },
  { q: '¿Tengo que tener textos y fotos?', a: 'No necesariamente. Podemos ayudarte con los textos base y usar imágenes de stock si no tienes material propio.' },
  { q: '¿La web será mía?', a: 'Sí. Te entregamos tu web publicada y organizada.' },
  { q: '¿Incluyes hosting o mantenimiento?', a: 'Sí, podemos encargarnos del hosting y soporte mensual si quieres despreocuparte.' },
  { q: '¿Trabajas solo en Valencia?', a: 'No. Estamos en Valencia, pero trabajamos con clientes de toda España.' },
];

const madridFaqs = [
  ...valenciaFaqs.slice(0, 5),
  { q: '¿Trabajas solo en Madrid?', a: 'No. Trabajamos con clientes de Madrid y de toda España.' },
];

const barcelonaFaqs = [
  ...valenciaFaqs.slice(0, 5),
  { q: '¿Trabajas solo en Barcelona?', a: 'No. Trabajamos con clientes de Barcelona y de toda España.' },
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

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

const upsertTag = (html: string, pattern: RegExp, replacement: string, fallback: string) =>
  pattern.test(html) ? html.replace(pattern, replacement) : html.replace('</head>', `${fallback}\n  </head>`);

const upsertMetaByName = (html: string, name: string, content: string) => {
  const safeContent = escapeHtml(content);
  const tag = `<meta name="${name}" content="${safeContent}" />`;
  return upsertTag(html, new RegExp(`<meta\\s+name=["']${name}["'][^>]*>`, 'i'), tag, tag);
};

const upsertMetaByProperty = (html: string, property: string, content: string) => {
  const safeContent = escapeHtml(content);
  const tag = `<meta property="${property}" content="${safeContent}" />`;
  return upsertTag(html, new RegExp(`<meta\\s+property=["']${property}["'][^>]*>`, 'i'), tag, tag);
};

const upsertCanonical = (html: string, href: string) => {
  const safeHref = escapeHtml(href);
  const tag = `<link rel="canonical" href="${safeHref}" />`;
  return upsertTag(html, /<link\s+rel=["']canonical["'][^>]*>/i, tag, tag);
};

const upsertSchema = (html: string, schema?: Record<string, unknown>) => {
  const withoutSchema = html.replace(/\s*<script id="page-schema" type="application\/ld\+json">[\s\S]*?<\/script>/i, '');

  if (!schema) {
    return withoutSchema;
  }

  const tag = `<script id="page-schema" type="application/ld+json">${JSON.stringify(schema)}</script>`;
  return withoutSchema.replace('</head>', `  ${tag}\n  </head>`);
};

const buildFaqSchema = (faqs: Array<{ q: string; a: string }>) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
});

const buildServiceSchema = (serviceName: string, servicePath: string, description: string, faqs: Array<{ q: string; a: string }>, areaServed: string[]) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      name: `${serviceName} | ${siteConfig.name}`,
      url: absoluteUrl(servicePath),
      description,
      image: absoluteUrl(siteConfig.defaultOgImage),
      areaServed,
      serviceType: ['Diseño web', 'Landing pages', 'SEO inicial', 'Soporte web'],
      telephone: siteConfig.phoneDisplay,
      email: siteConfig.email,
    },
    buildFaqSchema(faqs),
  ],
});

const buildBlogPostSchema = (post: (typeof blogPosts)[number]) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BlogPosting',
      headline: post.metaTitle,
      description: post.metaDescription,
      image: [absoluteUrl(post.image)],
      author: [
        {
          '@type': 'Organization',
          name: post.author,
          url: siteConfig.url,
        },
      ],
      mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    },
    ...(post.faqs && post.faqs.length > 0
      ? [
          {
            '@type': 'FAQPage',
            mainEntity: post.faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          },
        ]
      : []),
  ],
});

const buildProjectSchema = (project: (typeof portfolioProjects)[number]) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: project.title,
  description: project.description || project.clientDescription || project.subtitle,
  url: absoluteUrl(`/proyecto/${project.id}`),
  image: absoluteUrl(project.imgReto || project.img || siteConfig.defaultOgImage),
  creator: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
  },
  about: project.category || 'Diseño web',
});

const parseBlogDate = (rawDate: string) => {
  const monthMap: Record<string, string> = {
    ene: '01',
    feb: '02',
    mar: '03',
    abr: '04',
    may: '05',
    jun: '06',
    jul: '07',
    ago: '08',
    sep: '09',
    oct: '10',
    nov: '11',
    dic: '12',
  };

  const match = rawDate.match(/(\d{1,2})\s+([A-Za-zÁÉÍÓÚáéíóú]{3})\s+(\d{4})/);
  if (!match) {
    return buildDate;
  }

  const [, day, rawMonth, year] = match;
  const month = monthMap[rawMonth.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')];
  if (!month) {
    return buildDate;
  }

  return `${year}-${month}-${day.padStart(2, '0')}T00:00:00+00:00`;
};

const staticRoutes: RouteMeta[] = [
  {
    path: '/',
    title: 'Diseño Web Valencia y SEO | Icono Studio',
    description: 'Diseñamos páginas web en Valencia rápidas, cuidadas y orientadas a captar clientes. Desarrollo web, SEO y soporte continuo para negocios que quieren crecer.',
    priority: '1.00',
    lastmod: buildDate,
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          name: siteConfig.name,
          url: siteConfig.url,
          email: siteConfig.email,
          telephone: siteConfig.phoneDisplay,
          image: absoluteUrl(siteConfig.defaultOgImage),
        },
        {
          '@type': 'ProfessionalService',
          name: `${siteConfig.name} | Diseño web y SEO en Valencia`,
          url: siteConfig.url,
          description: 'Diseño web, SEO y desarrollo a medida para negocios que quieren crecer con una web más clara, rápida y orientada a captar clientes.',
          areaServed: ['Valencia', 'España'],
        },
      ],
    },
  },
  {
    path: '/diseno-web-valencia',
    title: 'Diseño Web Valencia | Páginas Web Profesionales | Icono Studio',
    description: 'Diseñamos páginas web en Valencia rápidas, cuidadas y preparadas para convertir visitas en clientes. SEO inicial, diseño adaptable y trato directo.',
    type: 'service',
    priority: '0.95',
    lastmod: buildDate,
    schema: buildServiceSchema(
      'Diseño Web Valencia',
      '/diseno-web-valencia',
      'Servicio de diseño web en Valencia para negocios que necesitan una web rápida, cuidada y orientada a captar clientes.',
      valenciaFaqs,
      ['Valencia', 'España']
    ),
  },
  {
    path: '/diseno-web-madrid',
    title: 'Diseño Web Madrid | Páginas Web Profesionales | Icono Studio',
    description: 'Diseñamos páginas web en Madrid rápidas, cuidadas y preparadas para convertir visitas en clientes. SEO inicial, diseño adaptable y trato directo.',
    type: 'service',
    priority: '0.95',
    lastmod: buildDate,
    schema: buildServiceSchema(
      'Diseño Web Madrid',
      '/diseno-web-madrid',
      'Servicio de diseño web en Madrid para negocios que necesitan una web rápida, cuidada y orientada a captar clientes.',
      madridFaqs,
      ['Madrid', 'España']
    ),
  },
  {
    path: '/diseno-web-barcelona',
    title: 'Diseño Web Barcelona | Páginas Web Profesionales | Icono Studio',
    description: 'Diseñamos páginas web en Barcelona rápidas, cuidadas y preparadas para convertir visitas en clientes. SEO inicial, diseño adaptable y trato directo.',
    type: 'service',
    priority: '0.95',
    lastmod: buildDate,
    schema: buildServiceSchema(
      'Diseño Web Barcelona',
      '/diseno-web-barcelona',
      'Servicio de diseño web en Barcelona para negocios que necesitan una web rápida, cuidada y orientada a captar clientes.',
      barcelonaFaqs,
      ['Barcelona', 'España']
    ),
  },
  {
    path: '/hosting-mantenimiento-web',
    title: 'Hosting y Mantenimiento Web | Icono Studio',
    description: 'Hosting, mantenimiento y soporte web para que tu proyecto esté siempre rápido, seguro y bien atendido. Planes claros, sin permanencias y con soporte directo.',
    type: 'service',
    priority: '0.80',
    lastmod: buildDate,
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: 'Hosting y mantenimiento web | Icono Studio',
          url: absoluteUrl('/hosting-mantenimiento-web'),
          description: 'Servicio de hosting, mantenimiento y soporte web para mantener tu proyecto rápido, seguro y actualizado.',
          provider: {
            '@type': 'Organization',
            name: siteConfig.name,
            url: siteConfig.url,
          },
          image: absoluteUrl(siteConfig.defaultOgImage),
        },
        buildFaqSchema(supportFaqs),
      ],
    },
  },
  {
    path: '/proyectos',
    title: 'Proyectos Web y Casos de Estudio | Icono Studio',
    description: 'Casos de estudio y proyectos web de Icono Studio: diseño, desarrollo y experiencias digitales pensadas para transmitir confianza y convertir mejor.',
    priority: '0.90',
    lastmod: buildDate,
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          name: `Proyectos | ${siteConfig.name}`,
          url: absoluteUrl('/proyectos'),
          description: 'Casos de estudio y proyectos web de Icono Studio: diseño, desarrollo y experiencias digitales pensadas para transmitir confianza y convertir mejor.',
        },
        {
          '@type': 'ItemList',
          itemListElement: portfolioProjects.map((project, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: absoluteUrl(`/proyecto/${project.id}`),
            name: project.title,
            image: absoluteUrl(project.imgReto || project.img || siteConfig.defaultOgImage),
          })),
        },
      ],
    },
  },
  {
    path: '/blog',
    title: 'Blog de Diseño Web y SEO | Icono Studio',
    description: 'Consejos, estrategia y contenidos sobre diseño web, SEO y presencia digital para negocios que quieren conseguir más contactos.',
    priority: '0.80',
    lastmod: buildDate,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: `Blog | ${siteConfig.name}`,
      url: absoluteUrl('/blog'),
      description: 'Artículos sobre diseño web, SEO y digitalización para negocios que quieren crecer online.',
    },
  },
  {
    path: '/contacto',
    title: 'Presupuesto Web en Valencia | Contacto | Icono Studio',
    description: 'Cuéntanos tu proyecto y te responderemos con una propuesta clara para crear una web profesional, rápida y preparada para captar clientes.',
    type: 'service',
    priority: '0.80',
    lastmod: buildDate,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: `Contacto | ${siteConfig.name}`,
      url: absoluteUrl('/contacto'),
      about: {
        '@type': 'Organization',
        name: siteConfig.name,
        email: siteConfig.email,
        telephone: siteConfig.phoneDisplay,
      },
    },
  },
  {
    path: siteConfig.leadThankYouPath,
    title: 'Gracias por tu solicitud | Icono Studio',
    description: 'Hemos recibido tu solicitud y te responderemos lo antes posible.',
    robots: 'noindex,nofollow',
    includeInSitemap: false,
  },
  {
    path: '/aviso-legal',
    title: 'Aviso Legal | Icono Studio',
    description: 'Información legal provisional de Icono Studio para la web icono.studio.',
    robots: 'noindex,nofollow',
    includeInSitemap: false,
  },
  {
    path: '/politica-de-privacidad',
    title: 'Política de Privacidad | Icono Studio',
    description: 'Información provisional sobre el tratamiento de datos personales en icono.studio.',
    robots: 'noindex,nofollow',
    includeInSitemap: false,
  },
  {
    path: '/dashboard',
    title: 'Dashboard | Icono Studio',
    description: 'Área interna de gestión de proyectos de Icono Studio.',
    robots: 'noindex,nofollow',
    includeInSitemap: false,
  },
];

const blogRoutes: RouteMeta[] = blogPosts.map((post) => ({
  path: `/blog/${post.slug}`,
  title: post.metaTitle,
  description: post.metaDescription,
  image: post.image,
  type: 'article',
  priority: '0.70',
  lastmod: parseBlogDate(post.date),
  schema: buildBlogPostSchema(post),
}));

const projectRoutes: RouteMeta[] = portfolioProjects.map((project) => ({
  path: `/proyecto/${project.id}`,
  title: `${project.title} | Proyecto Web | Icono Studio`,
  description: project.description || project.clientDescription || project.subtitle || 'Caso de estudio de diseño y desarrollo web.',
  image: project.imgReto || project.img || siteConfig.defaultOgImage,
  priority: '0.70',
  lastmod: buildDate,
  schema: buildProjectSchema(project),
}));

const allRoutes = [...staticRoutes, ...blogRoutes, ...projectRoutes];

async function writeRouteHtml(templateHtml: string, route: RouteMeta) {
  const canonicalUrl = absoluteUrl(route.path);
  const imageUrl = absoluteUrl(route.image || siteConfig.defaultOgImage);
  const ogType = route.type === 'article' ? 'article' : 'website';

  let html = templateHtml;

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);
  html = upsertMetaByName(html, 'description', route.description);
  html = upsertMetaByName(html, 'robots', route.robots || 'index,follow');
  html = upsertMetaByName(html, 'theme-color', '#0A36E8');
  html = upsertMetaByProperty(html, 'og:locale', siteConfig.locale);
  html = upsertMetaByProperty(html, 'og:site_name', siteConfig.name);
  html = upsertMetaByProperty(html, 'og:title', route.title);
  html = upsertMetaByProperty(html, 'og:description', route.description);
  html = upsertMetaByProperty(html, 'og:type', ogType);
  html = upsertMetaByProperty(html, 'og:url', canonicalUrl);
  html = upsertMetaByProperty(html, 'og:image', imageUrl);
  html = upsertMetaByName(html, 'twitter:card', 'summary_large_image');
  html = upsertMetaByName(html, 'twitter:title', route.title);
  html = upsertMetaByName(html, 'twitter:description', route.description);
  html = upsertMetaByName(html, 'twitter:image', imageUrl);
  html = upsertCanonical(html, canonicalUrl);
  html = upsertSchema(html, route.schema);

  const outputPath =
    route.path === '/'
      ? path.join(distDir, 'index.html')
      : path.join(distDir, route.path.replace(/^\//, ''), 'index.html');

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, 'utf8');
}

function buildSitemapXml(routes: RouteMeta[]) {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset',
    '      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
    '      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9',
    '            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">',
    '',
  ];

  routes
    .filter((route) => route.includeInSitemap !== false && route.robots !== 'noindex,nofollow')
    .forEach((route) => {
      lines.push('<url>');
      lines.push(`  <loc>${absoluteUrl(route.path)}</loc>`);
      lines.push(`  <lastmod>${route.lastmod || buildDate}</lastmod>`);
      lines.push(`  <priority>${route.priority || '0.70'}</priority>`);
      lines.push('</url>');
      lines.push('');
    });

  lines.push('</urlset>');
  return lines.join('\n');
}

async function main() {
  const templateHtml = await readFile(templatePath, 'utf8');

  for (const route of allRoutes) {
    await writeRouteHtml(templateHtml, route);
  }

  const sitemapXml = buildSitemapXml(allRoutes);
  await writeFile(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
  await writeFile(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
}

main().catch((error) => {
  console.error('Error prerendering SEO pages:', error);
  process.exit(1);
});
