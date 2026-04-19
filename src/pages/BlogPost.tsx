import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Share2, ChevronRight } from 'lucide-react';
import { blogPosts } from '../data/blog';
import { useEffect, useState } from 'react';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    if (!post) return;

    // SEO Optimization
    document.title = post.metaTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', post.metaDescription);
    }

    // Scroll tracking
    const updateScroll = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setReadingProgress(Number((currentScroll / scrollHeight).toFixed(2)) * 100);
      }
    };

    window.addEventListener('scroll', updateScroll);
    window.scrollTo(0, 0);

    // FAQ Schema Injection
    if (post.faqs) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": post.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      };
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
      return () => {
        window.removeEventListener('scroll', updateScroll);
        document.head.removeChild(script);
      };
    }

    return () => window.removeEventListener('scroll', updateScroll);
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
        <div className="text-center">
          <h1 className="text-4xl font-display mb-4 uppercase">Post no encontrado</h1>
          <Link to="/blog" className="text-brand-blue font-bold hover:underline">Volver al blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white selection:bg-brand-lime selection:text-brand-dark">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-[100]">
        <motion.div 
          className="h-full bg-brand-blue" 
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-brand-dark overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 mb-8 sm:mb-12">
            <Link to="/" className="hover:text-brand-lime transition-colors">Inicio</Link>
            <ChevronRight size={12} />
            <Link to="/blog" className="hover:text-brand-lime transition-colors">Blog</Link>
            <ChevronRight size={12} />
            <span className="text-brand-lime truncate max-w-[200px]">{post.tag}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white uppercase tracking-tighter leading-[1.05] mb-8">
              {post.title}
            </h1>
            
            <p className="text-xl sm:text-2xl text-white/60 font-medium max-w-2xl mx-auto mb-10 italic">
              {post.subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-y-4 gap-x-8 text-xs font-bold text-white/40 uppercase tracking-[0.2em] font-mono">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-brand-lime" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={14} className="text-brand-lime" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-brand-lime">
                <Tag size={12} />
                <span>{post.tag}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Featured Image Block */}
      <section className="relative z-20 -mt-16 md:-mt-24 px-6 mb-20 md:mb-32">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden shadow-2xl shadow-brand-blue/10 border-8 border-white/10 backdrop-blur-3xl"
          >
            <img src={post.image} alt={post.title} className="w-full aspect-video object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-6 pb-24">
        <div 
          className="prose prose-xl prose-brand max-w-none 
            prose-headings:font-display prose-headings:uppercase prose-headings:tracking-tight
            prose-h2:text-4xl prose-h2:md:text-5xl prose-h2:italic prose-h2:text-brand-dark
            prose-p:text-lg prose-p:md:text-xl prose-p:text-gray-600 prose-p:leading-relaxed
            prose-li:text-gray-600 prose-li:text-lg
            prose-strong:text-brand-dark prose-strong:font-bold
            prose-blockquote:border-l-4 prose-blockquote:border-brand-lime prose-blockquote:bg-brand-lime/5 prose-blockquote:p-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-2xl prose-blockquote:font-display
            "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* FAQ Section (Visible for users) */}
        {post.faqs && (
          <section className="mt-20 pt-20 border-t border-gray-100">
            <h2 className="font-display text-4xl uppercase mb-12 italic">Preguntas frecuente</h2>
            <div className="space-y-6">
              {post.faqs.map((faq, i) => (
                <div key={i} className="bg-[#F8F9FA] rounded-2xl p-8 border border-gray-100">
                  <h3 className="text-xl font-bold text-brand-dark mb-4">{faq.question}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Share & Back */}
        <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-8">
          <Link to="/blog" className="flex items-center gap-3 font-bold text-brand-dark group">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-brand-dark group-hover:text-white transition-colors">
              <ArrowLeft size={18} />
            </div>
            <span>Volver al Blog</span>
          </Link>
          
          <div className="flex items-center gap-6 text-gray-400">
            <span className="text-xs uppercase font-bold tracking-widest font-mono">Compartir</span>
            <div className="flex items-center gap-4">
              {[Share2].map((Icon, i) => (
                <button key={i} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-brand-dark hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all cursor-pointer">
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Recommended Reading - Quick Teaser */}
      <section className="py-24 bg-zinc-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-4xl uppercase mb-12">Seguir <span className="text-brand-blue italic">leyendo</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.filter(p => p.slug !== slug).slice(0, 2).map(p => (
              <Link to={`/blog/${p.slug}`} key={p.slug} className="group relative bg-white p-8 rounded-[2rem] border border-gray-100 flex items-center gap-6 overflow-hidden">
                <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-2xl overflow-hidden shadow-lg">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest mb-2 block">{p.tag}</span>
                  <h3 className="font-display text-lg sm:text-xl uppercase leading-tight group-hover:text-brand-blue transition-colors line-clamp-2">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
