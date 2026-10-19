import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, Clock3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogSummariesSorted } from '../data/blogSummaries';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import { absoluteUrl, siteConfig } from '../lib/site';
import { buildBreadcrumbSchema, buildOrganizationSchema, parseStructuredDate } from '../lib/structuredData';

const blogTags = ['Todos', ...Array.from(new Set(blogSummariesSorted.map((post) => post.tag)))];

export default function Blog() {
  const [activeTag, setActiveTag] = useState('Todos');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredPosts = useMemo(
    () => activeTag === 'Todos' ? blogSummariesSorted : blogSummariesSorted.filter((post) => post.tag === activeTag),
    [activeTag],
  );
  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  const blogSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationSchema(),
      buildBreadcrumbSchema([
        { name: 'Inicio', path: '/' },
        { name: 'Blog' },
      ]),
      {
        '@type': 'Blog',
        '@id': absoluteUrl('/blog#blog'),
        name: 'Blog | ' + siteConfig.name,
        url: absoluteUrl('/blog'),
        description: 'Artículos sobre diseño web, SEO y digitalización para negocios que quieren crecer online.',
        inLanguage: 'es-ES',
        publisher: { '@id': absoluteUrl('/#organization') },
      },
      {
        '@type': 'ItemList',
        itemListElement: blogSummariesSorted.map((post, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: absoluteUrl('/blog/' + post.slug),
          name: post.title,
          image: absoluteUrl(post.image),
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F7F9FC] font-sans text-[#0B1B63] selection:bg-[#9ED6F1]/40 selection:text-[#0B1B63]">
      <SeoHead
        title="Blog de Diseño Web y SEO | Icono Studio"
        description="Consejos, estrategia y contenidos sobre diseño web, SEO y presencia digital para negocios que quieren conseguir más contactos."
        path="/blog"
        image="/blog-hero-conversion.webp"
        schema={blogSchema}
      />

      <Navbar initialTheme="light" />

      <main>
        <section className="relative overflow-hidden bg-[#F7F7F7] px-5 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24">
          <div className="pointer-events-none absolute -right-28 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#D8ECFB] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 left-[30%] h-[20rem] w-[28rem] rounded-full bg-[#9ED6F1]/25 blur-3xl" />

          <div className="relative mx-auto grid w-full max-w-[1380px] items-center gap-12 lg:grid-cols-[1fr_0.86fr] lg:gap-20">
            <div className="max-w-[41rem]">
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#2A6D98]">
                <BookOpen size={15} strokeWidth={1.8} />
                Ideas para tu negocio
              </div>
              <h1 className="mt-5 font-display text-[2.85rem] font-extrabold leading-[1.01] tracking-[-0.06em] text-[#0B1B63] sm:text-[4rem] lg:text-[5rem]">
                Claridad para
                <span className="block text-[#2A6D98]">crecer online.</span>
              </h1>
              <p className="mt-6 max-w-[38rem] text-[1.02rem] font-medium leading-[1.75] text-[#526477] sm:text-[1.1rem]">
                Guías sencillas sobre web, SEO y captación para que puedas tomar mejores decisiones sin perderte en tecnicismos.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-bold text-[#0B1B63]">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#2A6D98]" />
                  Contenido práctico
                </span>
                <span className="inline-flex items-center gap-2 text-[#526477]">
                  <Clock3 size={16} strokeWidth={1.8} />
                  Lecturas de 5 minutos
                </span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[30rem]">
              <div className="absolute -inset-4 rounded-[2rem] bg-white/80 blur-xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white bg-white p-3 shadow-[0_24px_70px_rgba(11,27,99,0.1)] sm:p-4">
                <div className="relative aspect-[1.18] overflow-hidden rounded-[1.2rem] bg-[#D8ECFB]">
                  <img
                    src="/blog-hero-conversion.webp"
                    alt="Cuaderno visual sobre conversión web"
                    className="h-full w-full object-cover"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <div className="absolute bottom-4 left-4 rounded-full bg-[#0B1B63] px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white">
                    Web + SEO
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-4">
                  <p className="text-sm font-bold text-[#0B1B63]">Ideas que puedes aplicar</p>
                  <ArrowUpRight size={18} className="text-[#2A6D98]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto w-full max-w-[1260px]">
            <div className="flex flex-col gap-5 border-b border-[#DCE5EE] pb-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2A6D98]">Biblioteca</p>
                <h2 className="mt-2 font-display text-2xl font-extrabold tracking-[-0.045em] text-[#0B1B63] sm:text-3xl">
                  Elige por dónde empezar
                </h2>
              </div>
              <div className="flex max-w-full gap-2 overflow-x-auto pb-1 scrollbar-hide" aria-label="Filtrar artículos por temática">
                {blogTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    aria-pressed={activeTag === tag}
                    onClick={() => setActiveTag(tag)}
                    className={'shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition-colors ' + (
                      activeTag === tag
                        ? 'border-[#0B1B63] bg-[#0B1B63] text-white'
                        : 'border-[#DCE5EE] bg-white text-[#526477] hover:border-[#9ED6F1] hover:text-[#0B1B63]'
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {featuredPost ? (
              <article className="mt-10 grid overflow-hidden rounded-[1.75rem] border border-[#DCE5EE] bg-[#F7F9FC] lg:grid-cols-[1.05fr_0.95fr]">
                <Link
                  to={'/blog/' + featuredPost.slug}
                  className="group relative min-h-[18rem] overflow-hidden bg-[#D8ECFB] lg:min-h-[28rem]"
                  onClick={() => (window as any).dataLayer?.push({ event: 'nav_click', nav_item: 'Blog featured: ' + featuredPost.title, page_path: window.location.pathname })}
                >
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#0B1B63]">
                    Artículo destacado
                  </span>
                </Link>
                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
                    <span className="text-[#2A6D98]">{featuredPost.tag}</span>
                    <span className="h-1 w-1 rounded-full bg-[#9ED6F1]" aria-hidden="true" />
                    <time className="text-[#5F7186]" dateTime={parseStructuredDate(featuredPost.modifiedDate || featuredPost.date)}>
                      {featuredPost.date}
                    </time>
                  </div>
                  <h3 className="mt-5 font-display text-[1.75rem] font-extrabold leading-[1.08] tracking-[-0.045em] text-[#0B1B63] sm:text-[2.2rem]">
                    {featuredPost.title}
                  </h3>
                  <p className="mt-5 text-[0.98rem] leading-[1.7] text-[#526477]">
                    {featuredPost.subtitle || featuredPost.metaDescription}
                  </p>
                  <Link
                    to={'/blog/' + featuredPost.slug}
                    className="brand-button brand-button--dark mt-7 inline-flex w-fit items-center gap-2 px-5 py-3 text-sm font-bold"
                  >
                    Leer artículo <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ) : null}

            {remainingPosts.length > 0 ? (
              <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {remainingPosts.map((post) => (
                  <article key={post.slug} className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-[#DCE5EE] bg-white transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[#9ED6F1] hover:shadow-[0_18px_44px_-28px_rgba(11,27,99,0.35)]">
                    <Link
                      to={'/blog/' + post.slug}
                      className="relative block aspect-[1.5] overflow-hidden bg-[#D8ECFB]"
                      onClick={() => (window as any).dataLayer?.push({ event: 'nav_click', nav_item: 'Blog card: ' + post.title, page_path: window.location.pathname })}
                    >
                      <img src={post.image} alt={post.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                    </Link>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="flex items-center justify-between gap-3 text-xs font-bold">
                        <span className="text-[#2A6D98]">{post.tag}</span>
                        <time className="text-[#5F7186]" dateTime={parseStructuredDate(post.modifiedDate || post.date)}>{post.date}</time>
                      </div>
                      <h3 className="mt-4 line-clamp-3 font-display text-[1.18rem] font-extrabold leading-[1.18] tracking-[-0.035em] text-[#0B1B63]">
                        {post.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-[1.65] text-[#526477]">{post.subtitle || post.metaDescription}</p>
                      <Link to={'/blog/' + post.slug} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0B1B63] transition-colors hover:text-[#2A6D98]">
                        Leer guía <ArrowUpRight size={16} strokeWidth={1.8} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}

            <p className="mt-8 text-sm font-medium text-[#5F7186]">
              Mostrando {filteredPosts.length} {filteredPosts.length === 1 ? 'artículo' : 'artículos'}.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
