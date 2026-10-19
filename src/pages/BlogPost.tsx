import React, { useEffect, useState, useRef } from 'react';
import { m } from 'motion/react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { ArrowRight, Calendar, ChevronRight } from 'lucide-react';
import { blogPostsSorted } from '../data/blog';
import { blogContentLoaders } from '../data/blogContentLoaders';
import { blogSummariesSorted } from '../data/blogSummaries';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import { absoluteUrl } from '../lib/site';
import {
  buildBreadcrumbSchema,
  buildOrganizationSchema,
  buildProviderReference,
  parseStructuredDate,
} from '../lib/structuredData';
import { getRelatedBlogEntries } from '../lib/blogUtils';

interface ToCItem {
  id: string;
  text: string;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPostsSorted.find(p => p.slug === slug);
  const [readingProgress, setReadingProgress] = useState(0);
  const [toc, setToc] = useState<ToCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [bodyHtml, setBodyHtml] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Carga el cuerpo del artículo bajo demanda (chunk propio por artículo).
  useEffect(() => {
    if (!post) {
      return;
    }

    let cancelled = false;
    const loader = blogContentLoaders[post.slug];
    const load = loader ? loader() : Promise.resolve({ content: '' });

    load
      .then((module) => {
        if (!cancelled) {
          setBodyHtml(module.content);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setBodyHtml('');
        }
      });

    return () => {
      cancelled = true;
    };
  }, [post]);

  // Genera el índice de contenidos cuando el cuerpo ya está disponible.
  useEffect(() => {
    if (!post || bodyHtml === null) {
      return;
    }

    // Generate ToC and Add IDs to content
    const generateToC = () => {
      const container = document.createElement('div');
      container.innerHTML = bodyHtml;
      const headings = container.querySelectorAll('h2');
      const items: ToCItem[] = [];

      headings.forEach((h, i) => {
        const id = `section-${i}`;
        h.id = id;
        items.push({ id, text: h.innerText });
      });

      setToc(items);
    };

    generateToC();
  }, [post, bodyHtml]);

  useEffect(() => {
    if (!post) {
      return;
    }

    const handleScroll = () => {
      // Reading Progress
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setReadingProgress(Number((currentScroll / scrollHeight).toFixed(2)) * 100);
      }

      // Active Section Tracking
      const headingElements = document.querySelectorAll('.blog-content h2');
      let currentActiveId = '';
      headingElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < 150) {
          currentActiveId = el.id;
        }
      });
      setActiveId(currentActiveId);
    };

    window.addEventListener('scroll', handleScroll);
    window.scrollTo(0, 0);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [post]);


  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <SeoHead
          title="Post no encontrado | Icono Studio"
          description="El artículo que buscas no está disponible."
          path="/blog"
          robots="noindex,nofollow"
        />
        <div className="text-center">
          <h1 className="mb-4 font-display text-3xl font-bold text-[#0B1B63]">Post no encontrado</h1>
          <RouterLink to="/blog" className="text-[#2A6D98] font-bold hover:underline">Volver al blog</RouterLink>
        </div>
      </div>
    );
  }

  const contentWithIds = (bodyHtml ?? '').replace(/<h2>/g, (_match, offset) => {
    const before = (bodyHtml ?? '').substring(0, offset);
    const index = (before.match(/<h2>/g) || []).length;
    return `<h2 id="section-${index}">`;
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120,
        behavior: 'smooth'
      });
    }
  };

  const blogPostSchema = {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationSchema(),
      buildBreadcrumbSchema([
        { name: 'Inicio', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: post.title },
      ]),
      {
        "@type": "BlogPosting",
        "@id": absoluteUrl(`/blog/${post.slug}#article`),
        "headline": post.title,
        "name": post.metaTitle,
        "description": post.metaDescription,
        "image": [absoluteUrl(post.image)],
        "author": [buildProviderReference()],
        "publisher": buildProviderReference(),
        "datePublished": parseStructuredDate(post.date),
        "dateModified": parseStructuredDate(post.modifiedDate || post.date),
        "inLanguage": "es-ES",
        "articleSection": post.tag,
        ...(post.keywords ? { "keywords": post.keywords.join(', ') } : {}),
        "isPartOf": {
          "@id": absoluteUrl('/blog#blog'),
        },
        "mainEntityOfPage": absoluteUrl(`/blog/${post.slug}`),
      },
      ...(post.faqs && post.faqs.length > 0 ? [{
        "@type": "FAQPage",
        "mainEntity": post.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
        })),
      }] : []),
    ],
  };

  const relatedPosts = getRelatedBlogEntries(blogSummariesSorted, post, 3);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F7F9FC] font-sans text-[#0B1B63] selection:bg-[#9ED6F1]/40 selection:text-[#0B1B63]">
      <SeoHead
        title={post.metaTitle}
        description={post.metaDescription}
        path={`/blog/${post.slug}`}
        image={post.image}
        type="article"
        publishedTime={parseStructuredDate(post.date)}
        modifiedTime={parseStructuredDate(post.modifiedDate || post.date)}
        author={post.author}
        section={post.tag}
        schema={blogPostSchema}
      />

      <Navbar initialTheme="light" />

      {/* Progress Bar (Lime for visibility against navbar) */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-[110]">
        <m.div
          className="h-full bg-[#9ED6F1] shadow-[0_0_10px_rgba(158,214,241,0.8)]"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <main className="pb-24 pt-28 sm:pb-32 sm:pt-32">
        <div className="max-w-7xl mx-auto px-6">

          <div className="mx-auto mb-12 flex max-w-5xl items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em]">
            <RouterLink to="/" className="text-[#5F7186] transition-colors hover:text-[#0B1B63]">Inicio</RouterLink>
            <ChevronRight size={10} className="text-gray-300" />
            <RouterLink to="/blog" className="text-[#5F7186] transition-colors hover:text-[#0B1B63]">Blog</RouterLink>
            <ChevronRight size={10} className="text-gray-300" />
            <span className="text-[#2A6D98]">{post.tag}</span>
          </div>

          {/* Title Section (More Elegant) */}
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <m.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-brand-dark tracking-tight leading-[1.1] mb-10 text-balance"
            >
              {post.title}
            </m.h1>

            <div className="flex flex-wrap items-center justify-center gap-y-6 gap-x-8 sm:gap-x-12 w-full">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-[#0B1B63] font-display text-xl text-[#9ED6F1] shadow-sm">
                  I
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Escrito por</p>
                  <p className="text-sm font-bold text-brand-dark">{post.author}</p>
                </div>
              </div>
              <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                  <Calendar size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Publicado el</p>
                  <time dateTime={parseStructuredDate(post.modifiedDate || post.date)} className="text-sm font-bold text-brand-dark">
                    {post.date}
                  </time>
                </div>
              </div>
            </div>
          </div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mb-16 max-w-5xl overflow-hidden rounded-[1.5rem] border border-[#DCE5EE] bg-white shadow-[0_20px_60px_-35px_rgba(11,27,99,0.35)] sm:mb-20 sm:rounded-[2rem]"
          >
            <img src={post.image} alt={post.title} fetchPriority="high" decoding="async" className="w-full aspect-[16/9] lg:aspect-[2/1] object-cover" />
          </m.div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[250px_1fr] xl:gap-20">

            <aside className="hidden text-slate-800 lg:block">
              <div className="toc-sidebar">
                <p className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-dark mb-6">Contenido</p>
                <nav className="flex flex-col">
                  {toc.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`toc-link ${activeId === item.id ? 'active' : ''}`}
                    >
                      <span className="line-clamp-2">{item.text}</span>
                      <div className="dot" />
                    </button>
                  ))}
                  <button
                    onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                    className="toc-link"
                  >
                    <span>FAQs</span>
                    <div className="dot" />
                  </button>
                </nav>

                <div className="mt-10 rounded-2xl border border-[#DCE5EE] bg-[#EEF7FC] p-5">
                   <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#2A6D98]">¿Lanzamos tu web?</p>
                   <p className="mb-5 text-sm leading-relaxed text-[#526477]">Pide tu presupuesto sin compromiso.</p>
                   <RouterLink
                     to="/contacto"
                     onClick={() => (window as any).dataLayer?.push({
                       'event': 'cta_click',
                       'cta_id': 'blog_sidebar_budget',
                       'cta_text': 'Solicitar Presupuesto (Blog Sidebar)',
                       'page_path': window.location.pathname
                     })}
                     className="brand-button brand-button--dark inline-flex w-full items-center justify-center py-3 text-center text-[10px] font-bold uppercase tracking-widest"
                   >
                     Solicitar Presupuesto
                   </RouterLink>
                </div>
              </div>
            </aside>

            <div className="max-w-3xl">
              {bodyHtml === null ? (
                <div className="blog-content" aria-busy="true">
                  <p className="text-sm font-medium text-[#526477]">Cargando artículo…</p>
                </div>
              ) : (
                <div
                  ref={contentRef}
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: contentWithIds }}
                />
              )}

              {post.faqs && (
                <section className="mt-24 border-t border-[#DCE5EE] pt-16">
                  <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-dark">Preguntas <span className="text-[#2A6D98]">frecuentes</span></h2>
                  <div className="grid gap-8">
                    {post.faqs.map((faq, i) => (
                      <div key={i} className="group flex gap-6">
                        <span className="pt-1 font-display text-2xl" style={{ color: '#3E88AE' }}>0{i + 1}.</span>
                        <div>
                          <h3 className="text-xl font-bold text-brand-dark mb-4 group-hover:text-[#2A6D98] transition-colors">{faq.question}</h3>
                          <p className="text-gray-500 font-serif text-lg leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <div className="mt-24 flex flex-col items-center gap-8 rounded-[1.5rem] border border-[#DCE5EE] bg-white p-7 sm:p-10 md:flex-row">
                 <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#0B1B63] font-display text-3xl text-[#9ED6F1]">I</div>
                 <div className="text-center md:text-left">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#2A6D98]">Detrás de la guía</p>
                    <h4 className="mb-3 font-display text-2xl font-extrabold tracking-tight text-brand-dark">Icono Studio</h4>
                    <p className="mb-5 leading-relaxed text-[#526477]">Diseño web estratégico y desarrollo para negocios que quieren crecer.</p>
                    <div className="flex justify-center md:justify-start gap-4">
                       <RouterLink
                          to="/contacto"
                          onClick={() => (window as any).dataLayer?.push({
                            'event': 'cta_click',
                            'cta_id': 'blog_footer_budget',
                            'cta_text': 'Solicitar Presupuesto (Blog Footer)',
                            'page_path': window.location.pathname
                          })}
                          className="text-xs font-bold uppercase tracking-widest text-[#0B1B63] underline decoration-[#9ED6F1] decoration-4 underline-offset-4 transition-colors hover:text-[#2A6D98]"
                        >
                          Solicitar Presupuesto
                        </RouterLink>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <section className="border-t border-[#DCE5EE] bg-white px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-5 px-0 sm:mb-12">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#2A6D98]">Siguiente lectura</p>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#0B1B63] sm:text-4xl">Quizá te <span className="text-[#2A6D98]">interese</span></h2>
            </div>
            <RouterLink to="/blog" className="hidden items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0B1B63] transition-colors hover:text-[#2A6D98] sm:flex">Todos los artículos <ArrowRight size={14} /></RouterLink>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((p) => (
              <RouterLink to={'/blog/' + p.slug} key={p.slug} className="group overflow-hidden rounded-[1.25rem] border border-[#DCE5EE] bg-[#F7F9FC] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[#9ED6F1] hover:bg-white hover:shadow-[0_18px_44px_-28px_rgba(11,27,99,0.35)]">
                <div className="relative aspect-[1.5] overflow-hidden bg-[#D8ECFB]">
                   <img src={p.image} alt={p.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <div className="p-5">
                  <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#2A6D98]">{p.tag}</span>
                  <h3 className="line-clamp-2 font-display text-xl font-extrabold leading-[1.12] tracking-[-0.035em] text-[#0B1B63] transition-colors group-hover:text-[#2A6D98]">{p.title}</h3>
                </div>
              </RouterLink>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
