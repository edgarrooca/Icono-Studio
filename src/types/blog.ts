export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPostSummary {
  title: string;
  subtitle?: string;
  date: string;
  modifiedDate?: string;
  author: string;
  tag: string;
  image: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords?: string[];
}

export interface BlogPost extends BlogPostSummary {
  content: string; // HTML or Markdown formatted string
  faqs?: FAQItem[];
}
