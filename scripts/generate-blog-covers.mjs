import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const rootDir = path.resolve(new URL('..', import.meta.url).pathname);
const outputDir = path.join(rootDir, 'public', 'blog');
const magick = '/Applications/ServBay/bin/magick';
const fontPath = '/System/Library/Fonts/Helvetica.ttc';

const covers = [
  {
    output: 'gemini-sheets-formulas-2026-pymes.webp',
    tag: 'PRODUCTIVIDAD',
    titleLines: ['Gemini corrige', 'formulas en', 'Google Sheets'],
    subtitle: 'Menos errores y menos dependencia de formulas avanzadas',
    accent: [29, 182, 197],
  },
  {
    output: 'ask-gemini-drive-gmail-2026-pymes.webp',
    tag: 'HERRAMIENTAS',
    titleLines: ['Ask Gemini en', 'Drive ya lee', 'Gmail'],
    subtitle: 'Correos, archivos y contexto en una sola consulta',
    accent: [70, 211, 154],
  },
  {
    output: 'content-pruning-seo-ia-2026-pymes.webp',
    tag: 'SEO & IA',
    titleLines: ['Poda de', 'contenido para', 'SEO e IA'],
    subtitle: 'Cuando conviene borrar, unir o redirigir paginas',
    accent: [245, 166, 35],
  },
  {
    output: 'auditoria-google-business-profile-2026-pymes.webp',
    tag: 'SEO LOCAL',
    titleLines: ['Auditoria', 'Google Business', 'Profile 2026'],
    subtitle: 'Resenas, categorias y fotos antes de tocar la web',
    accent: [114, 209, 92],
  },
  {
    output: 'anuncios-ai-search-landings-2026.webp',
    tag: 'ADS & IA',
    titleLines: ['Anuncios para', 'la era AI', 'Search'],
    subtitle: 'Campanas y landings listas para respuestas con IA',
    accent: [255, 125, 102],
  },
  {
    output: 'agent-readiness-2026-web-agentes-pyme.webp',
    tag: 'AGENTES WEB',
    titleLines: ['Agent', 'Readiness', 'para pymes'],
    subtitle: 'Como revisar si tu web esta lista para asistentes y agentes',
    accent: [81, 160, 255],
  },
  {
    output: 'workspace-intelligence-2026-pyme-contexto.webp',
    tag: 'WORKSPACE',
    titleLines: ['Workspace', 'Intelligence', 'util'],
    subtitle: 'Menos tiempo reuniendo contexto, mas tiempo trabajando',
    accent: [86, 214, 132],
  },
  {
    output: 'search-console-branded-queries-2026-marca.webp',
    tag: 'SEARCH DATA',
    titleLines: ['Marca o no', 'marca en', 'Search Console'],
    subtitle: 'Separa demanda existente y descubrimiento nuevo',
    accent: [247, 182, 62],
  },
  {
    output: 'google-vids-ai-avatars-2026-web-servicios.webp',
    tag: 'VIDEO IA',
    titleLines: ['Avatares IA', 'para vender', 'servicios'],
    subtitle: 'Donde un video breve ayuda y donde solo estorba',
    accent: [255, 124, 160],
  },
  {
    output: 'ia-local-inventa-datos-negocio-2026-checklist.webp',
    tag: 'SEO LOCAL',
    titleLines: ['La IA puede', 'contar mal', 'tu negocio'],
    subtitle: 'Checklist para corregir hechos antes de perder leads',
    accent: [121, 224, 112],
  },
];

const rgba = ([r, g, b], alpha) => `rgba(${r},${g},${b},${alpha})`;
const escapeText = (value) => value.replaceAll('"', '\\"');

mkdirSync(outputDir, { recursive: true });

for (const cover of covers) {
  const labelWidth = Math.max(150, cover.tag.length * 16);
  const webpPath = path.join(outputDir, cover.output);
  const args = [
    '-size',
    '1600x900',
    'xc:#091523',
    '-fill',
    '#102845',
    '-draw',
    'rectangle 0,520 1600,900',
    '-fill',
    rgba(cover.accent, 0.16),
    '-draw',
    'rectangle 72,40 1528,830',
    '-fill',
    rgba([255, 255, 255], 0.02),
    '-draw',
    'rectangle 72,40 1528,830',
    '-fill',
    rgba([255, 255, 255], 0.03),
    '-draw',
    'rectangle 72,490 1528,830',
    '-fill',
    rgba([255, 255, 255], 0.04),
    '-draw',
    'rectangle 72,140 1528,141',
    '-fill',
    rgba(cover.accent, 0.4),
    '-draw',
    'circle 1320,170 1470,170',
    '-fill',
    rgba(cover.accent, 0.22),
    '-draw',
    'circle 1480,770 1662,770',
    '-fill',
    rgba([255, 255, 255], 0.08),
    '-draw',
    'rectangle 108,744 278,782',
    '-fill',
    '#f7f7f7',
    '-draw',
    `rectangle 80,80 ${80 + labelWidth},118`,
    '-font',
    fontPath,
    '-pointsize',
    '24',
    '-fill',
    '#071321',
    '-draw',
    `text 98,107 "${escapeText(cover.tag)}"`,
    '-pointsize',
    '82',
    '-fill',
    '#f8fafc',
    '-draw',
    `text 96,260 "${escapeText(cover.titleLines[0])}"`,
    '-draw',
    `text 96,378 "${escapeText(cover.titleLines[1])}"`,
    '-draw',
    `text 96,496 "${escapeText(cover.titleLines[2])}"`,
    '-pointsize',
    '34',
    '-fill',
    '#e5e7eb',
    '-draw',
    `text 96,578 "${escapeText(cover.subtitle)}"`,
    '-pointsize',
    '26',
    '-fill',
    'rgba(229,231,235,0.88)',
    '-draw',
    'text 96,814 "ICONO STUDIO  ·  BLOG 2026"',
    '-quality',
    '82',
    webpPath,
  ];

  execFileSync(magick, args, { stdio: 'inherit' });
}
