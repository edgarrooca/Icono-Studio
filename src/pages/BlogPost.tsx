import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, ChevronRight, Share2, Twitter, Linkedin } from 'lucide-react';
import { blogPosts } from '../data/blog';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    if (!post) return;

    document.title = post.metaTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', post.metaDescription);
    }

    const updateScroll = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setReadingProgress(Number((currentScroll / scrollHeight).toFixed(2)) * 100);
      }
    };

    window.addEventListener('scroll', updateScroll);
    window.scrollTo(0, 0);

    return () => window.removeEventListener('scroll', updateScroll);
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-display mb-4 uppercase text-brand-dark">Post no encontrado</h1>
          <Link to="/blog" className="text-brand-blue font-bold hover:underline">Volver al blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white selection:bg-brand-lime selection:text-brand-dark font-sans overflow-x-hidden">
      {/* Subtle Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-50 z-[100]">
        <motion.div 
          className="h-full bg-brand-blue/30" 
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* 1. Header Navigation (Clean) */}
      <nav className="pt-8 pb-4 px-6 border-b border-gray-50 bg-white">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/blog" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-brand-blue transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Blog
          </Link>
          <div className="flex items-center gap-4">
             <button className="text-gray-400 hover:text-brand-blue transition-colors"><Share2 size={18} /></button>
          </div>
        </div>
      </nav>

      <article className="pt-16 pb-24">
        {/* 2. Top Title Section (Centered, Clean) */}
        <header className="max-w-3xl mx-auto px-6 text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3 py-1 bg-brand-blue/5 text-brand-blue text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-8"
          >
            {post.tag}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl text-brand-dark uppercase tracking-tighter leading-none mb-10"
          >
            {post.title}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-400 font-mono"
          >
            <div className="flex items-center gap-2">
              <Calendar size={12} />
              <span>{post.date}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-200"></div>
            <div className="flex items-center gap-2">
              <User size={12} />
              <span>{post.author}</span>
            </div>
          </motion.div>
        </header>

        {/* 3. Contained Featured Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto px-6 mb-20"
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl shadow-gray-200 border border-gray-100">
            <img src={post.image} alt={post.title} className="w-full aspect-[21/9] object-cover" />
          </div>
        </motion.div>

        {/* 4. Article Body (Pleasant column) */}
        <div className="max-w-2xl mx-auto px-6">
          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Simple FAQ Section */}
          {post.faqs && (
            <section className="mt-24 pt-16 border-t border-gray-100">
              <h2 className="font-display text-2xl uppercase mb-10 tracking-tight text-brand-dark">Preguntas frecuente</h2>
              <div className="space-y-10">
                {post.faqs.map((faq, i) => (
                  <div key={i} className="group">
                    <h3 className="text-xl font-bold text-brand-dark mb-4 group-hover:text-brand-blue transition-colors">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 font-serif text-lg leading-relaxed italic border-l-2 border-brand-lime pl-6">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Minimalist Bio */}
          <div className="mt-24 pt-16 border-t border-gray-100 flex items-center gap-8">
            <div className="w-16 h-16 rounded-2xl bg-brand-dark flex items-center justify-center shrink-0">
              <span className="text-brand-lime font-display text-xl">I</span>
            </div>
            <div>
              <h4 className="font-bold text-brand-dark mb-1 uppercase tracking-tight">Escrito por Icono Studio</h4>
              <p className="text-gray-500 text-sm">Agencia de diseño estratégico centrada en resultados digitales.</p>
            </div>
          </div>
        </div>
      </article>

      {/* Simple Next Up */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-2xl uppercase mb-12 text-center tracking-tight">Siguiente artículo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.filter(p => p.slug !== slug).slice(0, 2).map(p => (
              <Link 
                to={`/blog/${p.slug}`} 
                key={p.slug} 
                className="group flex items-center gap-6 p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest mb-1 block">{p.tag}</span>
                  <h3 className="font-display text-base uppercase leading-tight group-hover:text-brand-blue transition-colors line-clamp-2">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
