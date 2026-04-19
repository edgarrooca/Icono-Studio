export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  title: string;
  subtitle?: string;
  content: string; // HTML or Markdown formatted string
  date: string;
  author: string;
  tag: string;
  image: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  faqs?: FAQItem[];
}
