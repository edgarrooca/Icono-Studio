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
  /**
   * Cuerpo del artículo. Ya no viaja en `blog.ts`: se carga bajo demanda por artículo
   * vía `blogContentLoaders` (ver src/data/blogContentLoaders.ts).
   */
  content?: string;
  faqs?: FAQItem[];
}
