import type { Project } from '../data/projects';
import { absoluteUrl, siteConfig } from './site';

interface BreadcrumbItem {
  name: string;
  path?: string;
}

const monthMap: Record<string, string> = {
  ene: '01',
  enero: '01',
  jan: '01',
  january: '01',
  feb: '02',
  febrero: '02',
  february: '02',
  mar: '03',
  marzo: '03',
  march: '03',
  abr: '04',
  abril: '04',
  apr: '04',
  april: '04',
  may: '05',
  mayo: '05',
  jun: '06',
  junio: '06',
  june: '06',
  jul: '07',
  julio: '07',
  july: '07',
  ago: '08',
  agosto: '08',
  aug: '08',
  august: '08',
  sep: '09',
  sept: '09',
  septiembre: '09',
  september: '09',
  oct: '10',
  octubre: '10',
  october: '10',
  nov: '11',
  noviembre: '11',
  november: '11',
  dic: '12',
  diciembre: '12',
  dec: '12',
  december: '12',
};

export const organizationSchemaId = absoluteUrl('/#organization');

const normalizeMonthKey = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export const parseStructuredDate = (rawDate: string, fallback = new Date().toISOString()) => {
  const parsedDate = new Date(rawDate);
  if (!Number.isNaN(parsedDate.getTime())) {
    return parsedDate.toISOString();
  }

  const match = rawDate.match(/(\d{1,2})\s+([A-Za-zÁÉÍÓÚáéíóú]+)\s+(\d{4})/);
  if (!match) {
    return fallback;
  }

  const [, day, rawMonth, year] = match;
  const month = monthMap[normalizeMonthKey(rawMonth)];
  if (!month) {
    return fallback;
  }

  return `${year}-${month}-${day.padStart(2, '0')}T00:00:00.000Z`;
};

export const buildOrganizationSchema = () => ({
  '@type': 'Organization',
  '@id': organizationSchemaId,
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  email: siteConfig.email,
  telephone: siteConfig.phoneDisplay,
  image: absoluteUrl(siteConfig.defaultOgImage),
  logo: {
    '@type': 'ImageObject',
    url: absoluteUrl(siteConfig.defaultOgImage),
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: siteConfig.city,
    addressCountry: siteConfig.countryCode,
  },
  areaServed: ['España'],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: siteConfig.email,
      telephone: siteConfig.phoneDisplay,
      areaServed: 'ES',
      availableLanguage: ['es'],
      url: absoluteUrl('/contacto'),
    },
  ],
});

export const buildProviderReference = () => ({
  '@type': 'Organization',
  '@id': organizationSchemaId,
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  telephone: siteConfig.phoneDisplay,
});

export const buildBreadcrumbSchema = (items: BreadcrumbItem[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    ...(item.path ? { item: absoluteUrl(item.path) } : {}),
  })),
});

type ProjectSchemaSource = Pick<
  Project,
  'id' | 'title' | 'subtitle' | 'description' | 'clientDescription' | 'category' | 'img' | 'imgReto' | 'link'
>;

export const buildProjectCaseStudySchema = (project: ProjectSchemaSource) => {
  const description =
    project.description ||
    project.clientDescription ||
    project.subtitle ||
    'Caso de estudio de diseño y desarrollo web.';
  const projectPath = `/proyecto/${project.id}`;
  const imageUrl = absoluteUrl(project.imgReto || project.img || siteConfig.defaultOgImage);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationSchema(),
      buildBreadcrumbSchema([
        { name: 'Inicio', path: '/' },
        { name: 'Proyectos', path: '/proyectos' },
        { name: project.title },
      ]),
      {
        '@type': 'WebPage',
        '@id': absoluteUrl(`${projectPath}#page`),
        name: `${project.title} | Proyecto Web | ${siteConfig.name}`,
        url: absoluteUrl(projectPath),
        description,
        isPartOf: {
          '@id': absoluteUrl('/proyectos#page'),
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: imageUrl,
        },
        about: {
          '@id': absoluteUrl(`${projectPath}#work`),
        },
      },
      {
        '@type': 'CreativeWork',
        '@id': absoluteUrl(`${projectPath}#work`),
        name: project.title,
        headline: project.subtitle || project.title,
        description,
        image: imageUrl,
        creator: buildProviderReference(),
        publisher: buildProviderReference(),
        genre: project.category || 'Diseño web',
        keywords: [project.category, project.title, project.subtitle].filter(Boolean).join(', '),
        mainEntityOfPage: absoluteUrl(projectPath),
        ...(typeof project.link === 'string' && project.link.trim() !== ''
          ? { mentions: [{ '@type': 'WebSite', url: project.link.trim() }] }
          : {}),
      },
    ],
  };
};
