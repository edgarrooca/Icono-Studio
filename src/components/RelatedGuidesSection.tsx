import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { BlogPostSummary } from '../types/blog';
import { parseStructuredDate } from '../lib/structuredData';

interface RelatedGuidesSectionProps {
  title: string;
  description: string;
  posts: BlogPostSummary[];
  eyebrow?: string;
  theme?: 'light' | 'dark';
  ctaLabel?: string;
  ctaTo?: string;
}

export default function RelatedGuidesSection({
  title,
  description,
  posts,
  eyebrow = 'Guías relacionadas',
  theme = 'light',
  ctaLabel = 'Ver blog',
  ctaTo = '/blog',
}: RelatedGuidesSectionProps) {
  if (posts.length === 0) {
    return null;
  }

  const isDark = theme === 'dark';

  return (
    <section
      className={`rounded-[2.5rem] border p-8 sm:p-10 lg:p-12 ${
        isDark
          ? 'border-white/10 bg-white/5 text-white'
          : 'border-gray-100 bg-white text-brand-dark shadow-sm'
      }`}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p
            className={`mb-3 text-[10px] font-black uppercase tracking-[0.22em] ${
              isDark ? 'text-brand-lime' : 'text-brand-blue'
            }`}
          >
            {eyebrow}
          </p>
          <h2 className="font-display text-3xl uppercase tracking-tight sm:text-4xl">{title}</h2>
          <p className={`mt-4 max-w-2xl text-sm leading-relaxed sm:text-base ${isDark ? 'text-white/70' : 'text-gray-500'}`}>
            {description}
          </p>
        </div>

        {ctaTo ? (
          <Link
            to={ctaTo}
            className={`inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] transition-colors ${
              isDark ? 'text-white hover:text-brand-lime' : 'text-brand-dark hover:text-brand-blue'
            }`}
          >
            {ctaLabel} <ArrowRight size={16} />
          </Link>
        ) : null}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className={`group rounded-[2rem] border p-6 transition-all duration-300 ${
              isDark
                ? 'border-white/10 bg-white/[0.03] hover:border-brand-lime/40 hover:bg-white/[0.06]'
                : 'border-gray-100 bg-zinc-50 hover:border-brand-blue/20 hover:bg-white hover:shadow-lg'
            }`}
          >
            <span
              className={`inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${
                isDark ? 'bg-white/10 text-brand-lime' : 'bg-brand-blue/10 text-brand-blue'
              }`}
            >
              {post.tag}
            </span>
            <h3 className="mt-4 font-display text-2xl uppercase leading-[1.05] tracking-tight group-hover:text-brand-blue">
              {post.title}
            </h3>
            <p className={`mt-4 line-clamp-3 text-sm leading-relaxed ${isDark ? 'text-white/65' : 'text-gray-500'}`}>
              {post.subtitle || post.metaDescription}
            </p>
            <div className={`mt-6 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.16em] ${isDark ? 'text-white/45' : 'text-gray-400'}`}>
              <time dateTime={parseStructuredDate(post.modifiedDate || post.date)}>{post.date}</time>
              <span className={isDark ? 'text-white' : 'text-brand-dark'}>
                Leer
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
