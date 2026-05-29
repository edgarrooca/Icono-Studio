import type { BlogPostSummary } from '../types/blog';
import { parseStructuredDate } from './structuredData';

type BlogDatedEntry = Pick<BlogPostSummary, 'date' | 'modifiedDate'>;
type BlogListEntry = Pick<BlogPostSummary, 'slug' | 'tag' | 'title' | 'keywords' | 'date' | 'modifiedDate'>;

const fallbackDate = '1970-01-01T00:00:00.000Z';

const scoreDate = (entry: BlogDatedEntry) =>
  Date.parse(parseStructuredDate(entry.modifiedDate || entry.date, fallbackDate));

const tokenize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

export const sortBlogEntries = <T extends BlogDatedEntry>(entries: T[]) =>
  [...entries].sort((a, b) => scoreDate(b) - scoreDate(a));

export const getBlogEntriesBySlugs = <T extends Pick<BlogPostSummary, 'slug'>>(
  entries: T[],
  slugs: string[],
) =>
  slugs
    .map((slug) => entries.find((entry) => entry.slug === slug))
    .filter((entry): entry is T => Boolean(entry));

export const getRelatedBlogEntries = <T extends BlogListEntry>(
  entries: T[],
  currentEntry: T,
  limit = 3,
) => {
  const currentKeywords = new Set((currentEntry.keywords || []).map((keyword) => keyword.toLowerCase()));
  const currentTokens = new Set(tokenize(currentEntry.title));

  return entries
    .filter((entry) => entry.slug !== currentEntry.slug)
    .map((entry) => {
      let score = 0;

      if (entry.tag === currentEntry.tag) {
        score += 5;
      }

      const keywordOverlap = (entry.keywords || []).filter((keyword) =>
        currentKeywords.has(keyword.toLowerCase()),
      ).length;
      score += keywordOverlap * 4;

      const sharedTokens = tokenize(entry.title).filter((token) => currentTokens.has(token)).length;
      score += sharedTokens;

      return { entry, score };
    })
    .sort((a, b) => b.score - a.score || scoreDate(b.entry) - scoreDate(a.entry))
    .slice(0, limit)
    .map(({ entry }) => entry);
};
