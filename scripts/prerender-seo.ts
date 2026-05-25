import express from 'express';
import { constants } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { access } from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer';
import { blogPosts } from '../src/data/blog';
import { portfolioProjects } from '../src/data/projects';
import { seoLocations } from '../src/data/seoLocations';
import { absoluteUrl, siteConfig } from '../src/lib/site';
import { buildOrganizationSchema, buildProviderReference, parseStructuredDate } from '../src/lib/structuredData';

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
const prerenderUserAgent = 'IconoPrerender/1.0';
const isVercel = process.env.VERCEL === '1';
const puppeteerCacheDir = process.env.PUPPETEER_CACHE_DIR || path.join(rootDir, '.cache', 'puppeteer');
const useHeadlessShell = process.env.PUPPETEER_HEADLESS_MODE === 'shell';

process.env.PUPPETEER_CACHE_DIR = puppeteerCacheDir;

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

const webExpressFaqs = [
  {
    q: '¿La web es mía?',
    a: 'Tus textos, imágenes, logo y dominio son tuyos. Web Express funciona como un servicio alojado y gestionado por Icono Studio, por lo que la web permanece activa mientras el plan esté contratado.',
  },
  {
    q: '¿Puedo cancelar cuando quiera?',
    a: 'Sí. El plan mensual no tiene permanencia. Si cancelas o no renuevas, la web deja de estar publicada.',
  },
  {
    q: '¿Puedo llevarme la web a otro hosting?',
    a: 'Web Express no incluye entrega del código ni migración. Si más adelante necesitas exportar o mover la web, podemos valorarlo como servicio aparte.',
  },
  {
    q: '¿Cuánto tarda en estar lista?',
    a: 'Cuando recibimos la información básica del negocio, solemos preparar la web en pocos días laborables.',
  },
  {
    q: '¿Incluye dominio?',
    a: 'El hosting y el SSL sí están incluidos. El dominio es opcional y lo gestionamos aparte por 20 € + IVA al año para extensiones estándar como .es o .com.',
  },
  {
    q: '¿Y si necesito algo más completo?',
    a: 'Si tu proyecto necesita una web personalizada, varias páginas, tienda online o funcionalidades específicas, podemos prepararte una propuesta a medida.',
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
    buildOrganizationSchema(),
    {
      '@type': 'ProfessionalService',
      '@id': absoluteUrl(`${servicePath}#service`),
      name: `${serviceName} | ${siteConfig.name}`,
      url: absoluteUrl(servicePath),
      description,
      image: absoluteUrl(siteConfig.defaultOgImage),
      areaServed,
      serviceType: ['Diseño web', 'Landing pages', 'SEO inicial', 'Soporte web'],
      telephone: siteConfig.phoneDisplay,
      email: siteConfig.email,
      availableLanguage: ['es'],
      provider: buildProviderReference(),
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
      author: [buildProviderReference()],
      publisher: buildProviderReference(),
      datePublished: parseStructuredDate(post.date, buildDate),
      dateModified: parseStructuredDate(post.date, buildDate),
      inLanguage: 'es-ES',
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
  creator: buildProviderReference(),
  about: project.category || 'Diseño web',
});

const locationRoutes: RouteMeta[] = seoLocations.map(loc => ({
  path: `/diseno-web-${loc.slug}`,
  title: `Diseño Web ${loc.name} | Páginas Web Profesionales | Icono Studio`,
  description: `Diseñamos páginas web en ${loc.name} rápidas, cuidadas y preparadas para convertir visitas en clientes. SEO inicial, diseño adaptable y trato directo.`,
  type: 'service',
  priority: '0.95',
  lastmod: buildDate,
  schema: buildServiceSchema(
    `Diseño Web ${loc.name}`,
    `/diseno-web-${loc.slug}`,
    `Servicio de diseño web en ${loc.name} para negocios que necesitan una web rápida, cuidada y orientada a captar clientes.`,
    loc.faqs,
    [loc.name, 'España']
  ),
}));

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
        buildOrganizationSchema(),
        {
          '@type': 'ProfessionalService',
          '@id': absoluteUrl('/#service'),
          name: `${siteConfig.name} | Diseño web y SEO en Valencia`,
          url: siteConfig.url,
          description: 'Diseño web, SEO y desarrollo a medida para negocios que quieren crecer con una web más clara, rápida y orientada a captar clientes.',
          areaServed: ['Valencia', 'España'],
          serviceType: ['Diseño web', 'Desarrollo web', 'SEO', 'Mantenimiento web'],
          provider: buildProviderReference(),
        },
      ],
    },
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
        buildOrganizationSchema(),
        {
          '@type': 'Service',
          '@id': absoluteUrl('/hosting-mantenimiento-web#service'),
          name: 'Hosting y mantenimiento web | Icono Studio',
          url: absoluteUrl('/hosting-mantenimiento-web'),
          description: 'Servicio de hosting, mantenimiento y soporte web para mantener tu proyecto rápido, seguro y actualizado.',
          provider: buildProviderReference(),
          serviceType: ['Hosting web', 'Mantenimiento web', 'Soporte técnico'],
          areaServed: ['España'],
          image: absoluteUrl(siteConfig.defaultOgImage),
        },
        buildFaqSchema(supportFaqs),
      ],
    },
  },
  {
    path: '/precios',
    title: 'Precios Diseño Web | Icono Studio',
    description: 'Descubre nuestros planes de diseño web corporativo, landing pages y tiendas online. Tarifas claras, transparentes y orientadas a resultados para tu negocio.',
    priority: '0.90',
    lastmod: buildDate,
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        buildOrganizationSchema(),
        {
          '@type': 'Service',
          name: 'Planes y Precios de Diseño Web | Icono Studio',
          url: absoluteUrl('/precios'),
          description: 'Tarifas claras para Landing Pages, Webs Corporativas y Tiendas Online.',
          provider: buildProviderReference(),
          image: absoluteUrl(siteConfig.defaultOgImage),
        },
      ],
    },
  },
  {
    path: '/pagina-web-gratis',
    title: 'Página web profesional desde 8 €/mes | Web Express | Icono Studio',
    description: 'Web Express es una página web profesional para negocios, autónomos y marcas locales desde 8 €/mes, con hosting, SSL, versión móvil y gestión de dominio disponible.',
    type: 'service',
    priority: '0.92',
    lastmod: buildDate,
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        buildOrganizationSchema(),
        {
          '@type': 'Service',
          '@id': absoluteUrl('/pagina-web-gratis#service'),
          name: 'Web Express | Icono Studio',
          url: absoluteUrl('/pagina-web-gratis'),
          description:
            'Página web profesional para negocios, autónomos y marcas locales desde 8 €/mes, con hosting, SSL, versión móvil y gestión de dominio disponible.',
          image: absoluteUrl(siteConfig.defaultOgImage),
          areaServed: ['España'],
          serviceType: [
            'Página web profesional',
            'Web para autónomos',
            'Web para negocios locales',
          ],
          provider: buildProviderReference(),
          offers: [
            {
              '@type': 'Offer',
              name: 'Web Express anual',
              priceCurrency: 'EUR',
              price: '96',
              description: 'Pago anual de 96 € + IVA. Equivale a 8 € al mes.',
              url: absoluteUrl('/pagina-web-gratis#planes'),
            },
            {
              '@type': 'Offer',
              name: 'Web Express mensual',
              priceCurrency: 'EUR',
              price: '12',
              description: 'Pago mensual de 12 € + IVA sin permanencia.',
              url: absoluteUrl('/pagina-web-gratis#planes'),
            },
            {
              '@type': 'Offer',
              name: 'Dominio gestionado',
              priceCurrency: 'EUR',
              price: '20',
              description: 'Registro, renovación y conexión del dominio para extensiones estándar.',
              url: absoluteUrl('/pagina-web-gratis#dominio'),
            },
          ],
        },
        buildFaqSchema(webExpressFaqs),
      ],
    },
  },
  {
    path: '/contratar-web-express',
    title: 'Contratar Web Express | Icono Studio',
    description: 'Completa tus datos y continúa al pago seguro de Web Express.',
    robots: 'noindex,nofollow',
    includeInSitemap: false,
  },
  {
    path: '/gracias-web-express',
    title: 'Pago de Web Express | Icono Studio',
    description: 'Confirmación del pago y activación de Web Express.',
    robots: 'noindex,nofollow',
    includeInSitemap: false,
  },
  {
    path: '/condiciones-web-express',
    title: 'Condiciones del servicio Web Express | Icono Studio',
    description: 'Condiciones del servicio Web Express de Icono Studio.',
    robots: 'noindex,nofollow',
    includeInSitemap: false,
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
            image: absoluteUrl(project.img || project.imgReto || siteConfig.defaultOgImage),
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
  lastmod: parseStructuredDate(post.date, buildDate),
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

const allRoutes = [...locationRoutes, ...staticRoutes, ...blogRoutes, ...projectRoutes];

const resolveOutputPath = (routePath: string) =>
  routePath === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, routePath.replace(/^\//, ''), 'index.html');

const ensureDoctype = (html: string) =>
  html.toLowerCase().startsWith('<!doctype html>') ? html : `<!DOCTYPE html>\n${html}`;

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

  const outputPath = resolveOutputPath(route.path);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, ensureDoctype(html), 'utf8');
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

async function resolveChromeExecutablePath() {
  const executablePath = await (useHeadlessShell
    ? puppeteer.executablePath({ headless: 'shell' })
    : puppeteer.executablePath());
  await access(executablePath, constants.X_OK);
  return executablePath;
}

async function renderRoutesWithBrowser(routes: RouteMeta[]) {
  const app = express();

  app.use(express.static(distDir, { index: false }));

  app.get('*', (req, res) => {
    const normalizedPath = req.path === '/' ? '/' : `/${req.path.replace(/^\/+|\/+$/g, '')}`;
    const outputPath = resolveOutputPath(normalizedPath);

    res.sendFile(outputPath, (error) => {
      if (!error) {
        return;
      }

      res.sendFile(path.join(distDir, 'index.html'));
    });
  });

  const server = await new Promise<ReturnType<typeof app.listen>>((resolve) => {
    const nextServer = app.listen(0, '127.0.0.1', () => resolve(nextServer));
  });

  try {
    const address = server.address();
    if (!address || typeof address === 'string') {
      throw new Error('No se pudo resolver el puerto del servidor de prerender.');
    }

    let browser;
    
    if (isVercel) {
      const { default: chromium } = (await import('@sparticuz/chromium')) as any;
      const { default: puppeteerCore } = await import('puppeteer-core');
      
      browser = await puppeteerCore.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });
    } else {
      browser = await puppeteer.launch({
        headless: useHeadlessShell ? 'shell' : true,
        executablePath: await resolveChromeExecutablePath(),
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      });
    }

    try {
      const page = await browser.newPage();
      await page.setUserAgent(prerenderUserAgent);
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
      await page.setCacheEnabled(false);
      await page.setRequestInterception(true);
      page.on('request', (request) => {
        const resourceType = request.resourceType();

        if (resourceType === 'media' || resourceType === 'font') {
          request.abort();
          return;
        }

        request.continue();
      });

      for (const route of routes) {
        console.log(`Prerender SEO: ${route.path}`);
        const targetUrl = `http://127.0.0.1:${address.port}${route.path}`;
        const response = await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });

        if (response && !response.ok()) {
          console.warn(`Prerender con respuesta ${response.status()} en ${route.path}`);
        }

        await page.waitForFunction(
          (requirePrimaryContent) => {
            const root = document.getElementById('root');
            if (!root || root.children.length === 0) {
              return false;
            }

            const normalizedText = (root.textContent || '').replace(/\s+/g, ' ').trim();
            const hasPrimaryContent = Boolean(root.querySelector('main, article, h1, [role="main"]'));

            if (!requirePrimaryContent) {
              return normalizedText.length > 40;
            }

            return hasPrimaryContent && normalizedText.length > 120;
          },
          { timeout: 15000 },
          route.robots !== 'noindex,nofollow'
        );

        await new Promise((resolve) => setTimeout(resolve, 400));

        const html = ensureDoctype(await page.content());
        await writeFile(resolveOutputPath(route.path), html, 'utf8');
      }
    } finally {
      await browser.close();
    }
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }
}

async function main() {
  const templateHtml = await readFile(templatePath, 'utf8');

  for (const route of allRoutes) {
    await writeRouteHtml(templateHtml, route);
  }

  const sitemapXml = buildSitemapXml(allRoutes);
  await writeFile(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
  await writeFile(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
  await renderRoutesWithBrowser(allRoutes);
}

main().catch((error) => {
  console.error('Error prerendering SEO pages:', error);
  process.exit(1);
});
