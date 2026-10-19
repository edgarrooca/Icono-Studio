import { sortBlogEntries } from '../lib/blogUtils';
import { blogPosts } from './blog';
import type { BlogPostSummary } from '../types/blog';

export const blogSummaries: BlogPostSummary[] = blogPosts.map(({ content, faqs, ...summary }) => summary);

export const blogSummariesSorted = sortBlogEntries(blogSummaries);
