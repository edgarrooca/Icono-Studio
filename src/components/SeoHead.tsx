import { useEffect } from 'react';
import { absoluteUrl, siteConfig } from '../lib/site';

type SchemaValue = Record<string, unknown> | Array<Record<string, unknown>>;

interface SeoHeadProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article' | 'service';
  robots?: string;
  schema?: SchemaValue;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}

const upsertMeta = (attribute: 'name' | 'property', key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const removeMeta = (attribute: 'name' | 'property', key: string) => {
  document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)?.remove();
};

const upsertLink = (rel: string, href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
};

export default function SeoHead({
  title,
  description,
  path,
  image = siteConfig.defaultOgImage,
  type = 'website',
  robots = 'index,follow',
  schema,
  publishedTime,
  modifiedTime,
  author,
  section,
}: SeoHeadProps) {
  useEffect(() => {
    const canonicalUrl = absoluteUrl(path || window.location.pathname);
    const imageUrl = absoluteUrl(image);
    const schemaScriptId = 'page-schema';
    const ogType = type === 'article' ? 'article' : 'website';

    document.title = title;
    document.documentElement.lang = 'es';

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', robots);
    upsertMeta('name', 'theme-color', '#0A36E8');

    upsertMeta('property', 'og:locale', siteConfig.locale);
    upsertMeta('property', 'og:site_name', siteConfig.name);
    upsertMeta('property', 'og:type', ogType);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', imageUrl);

    if (type === 'article') {
      if (publishedTime) upsertMeta('property', 'article:published_time', publishedTime);
      if (modifiedTime) upsertMeta('property', 'article:modified_time', modifiedTime);
      if (author) upsertMeta('property', 'article:author', author);
      if (section) upsertMeta('property', 'article:section', section);
    } else {
      removeMeta('property', 'article:published_time');
      removeMeta('property', 'article:modified_time');
      removeMeta('property', 'article:author');
      removeMeta('property', 'article:section');
    }

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', imageUrl);

    upsertLink('canonical', canonicalUrl);

    if (schema) {
      let schemaScript = document.getElementById(schemaScriptId);

      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = schemaScriptId;
        (schemaScript as HTMLScriptElement).type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }

      schemaScript.textContent = JSON.stringify(schema);
    } else {
      document.getElementById(schemaScriptId)?.remove();
    }

    return () => {
      if (schema) {
        document.getElementById(schemaScriptId)?.remove();
      }
    };
  }, [author, description, image, modifiedTime, path, publishedTime, robots, schema, section, title, type]);

  return null;
}
