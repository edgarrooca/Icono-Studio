import { ArrowUpRight } from 'lucide-react';
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
  eyebrow = 'También te puede ayudar',
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
      className={`rounded-2xl border p-6 sm:p-8 lg:p-10 ${
        isDark
          ? 'border-white/15 bg-[#0B1B63] text-white'
          : 'border-[#DCE5EE] bg-white text-[#0B1B63]'
      }`}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className={`text-xs font-bold tracking-[0.14em] ${isDark ? 'text-[#9ED6F1]' : 'text-[#2A6D98]'}`}>
            {eyebrow}
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-[-0.035em] sm:text-3xl">{title}</h2>
          <p className={`mt-3 max-w-xl text-sm leading-[1.7] sm:text-base ${isDark ? 'text-white/72' : 'text-[#526477]'}`}>
            {description}
          </p>
        </div>

        {ctaTo ? (
          <Link
            to={ctaTo}
            className={`inline-flex shrink-0 items-center gap-2 text-sm font-bold transition-colors ${
              isDark ? 'text-white hover:text-[#9ED6F1]' : 'text-[#0B1B63] hover:text-[#2A6D98]'
            }`}
          >
            {ctaLabel} <ArrowUpRight size={16} strokeWidth={1.8} />
          </Link>
        ) : null}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className={`group rounded-xl border p-5 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 ${
              isDark
                ? 'border-white/12 bg-white/[0.04] hover:border-[#9ED6F1]/50 hover:bg-white/[0.08]'
                : 'border-[#DCE5EE] bg-[#F7F9FC] hover:border-[#9ED6F1] hover:bg-white hover:shadow-[0_14px_34px_-22px_rgba(11,27,99,0.3)]'
            }`}
          >
            <div className={`relative mb-5 aspect-[1.7] overflow-hidden rounded-lg ${isDark ? 'bg-white/10' : 'bg-[#D8ECFB]'}`}>
              <img
                src={post.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex items-center justify-between gap-3 text-xs font-semibold">
              <span className={isDark ? 'text-[#9ED6F1]' : 'text-[#2A6D98]'}>{post.tag}</span>
              <time className={isDark ? 'text-white/45' : 'text-[#5F7186]'} dateTime={parseStructuredDate(post.modifiedDate || post.date)}>
                {post.date}
              </time>
            </div>
            <h3 className="mt-4 line-clamp-3 font-display text-lg font-bold leading-[1.2] tracking-[-0.025em] group-hover:text-[#2A6D98]">
              {post.title}
            </h3>
            <p className={`mt-3 line-clamp-3 text-sm leading-[1.6] ${isDark ? 'text-white/65' : 'text-[#526477]'}`}>
              {post.subtitle || post.metaDescription}
            </p>
            <span className={`mt-5 inline-flex items-center gap-1.5 text-sm font-bold ${isDark ? 'text-white' : 'text-[#0B1B63]'}`}>
              Leer guía <ArrowUpRight size={15} strokeWidth={1.8} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
