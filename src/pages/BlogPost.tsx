import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, ChevronRight, Share2, Twitter, Linkedin, Facebook, Copy } from 'lucide-react';
import { blogPosts } from '../data/blog';
import { useEffect, useState, useRef } from 'react';
import Footer from '../components/Footer';

interface ToCItem {
  id: string;
  text: string;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);
  const [readingProgress, setReadingProgress] = useState(0);
  const [toc, setToc] = useState<ToCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!post) return;

    document.title = post.metaTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', post.metaDescription);
    }

    // Generate ToC and Add IDs to content
    const generateToC = () => {
      const container = document.createElement('div');
      container.innerHTML = post.content;
      const headings = container.querySelectorAll('h2');
      const items: ToCItem[] = [];
      
      headings.forEach((h, i) => {
        const id = `section-${i}`;
        h.id = id;
        items.push({ id, text: h.innerText });
      });

      setToc(items);
      
      if (contentRef.current) {
        // We'll use the IDs in the dangerouslySetInnerHTML by searching and replacing
        // This is a bit hacky but works for static-ish content
      }
    };

    generateToC();

    const updateScroll = () => {
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

  // Inject IDs into content HTML for ToC linking
  const contentWithIds = post.content.replace(/<h2>/g, (match, offset) => {
    // Find which index this h2 belongs to
    const before = post.content.substring(0, offset);
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

  return (
    <div className="min-h-screen bg-white selection:bg-brand-lime selection:text-brand-dark font-sans overflow-x-hidden">
      {/* 1. Top Navbar / Breadcrumbs (Minimalist) */}
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
            <Link to="/" className="text-gray-400 hover:text-brand-dark transition-colors">Inicio</Link>
            <ChevronRight size={12} className="text-gray-300" />
            <Link to="/blog" className="text-gray-400 hover:text-brand-dark transition-colors">Blog</Link>
            <ChevronRight size={12} className="text-gray-300" />
            <span className="text-brand-blue">{post.tag}</span>
          </div>
          <div className="flex items-center gap-3">
             <button className="p-2 text-gray-400 hover:text-brand-blue transition-colors"><Twitter size={18} /></button>
             <button className="p-2 text-gray-400 hover:text-brand-blue transition-colors"><Linkedin size={18} /></button>
             <button className="p-2 text-gray-400 hover:text-brand-blue transition-colors"><Share2 size={18} /></button>
          </div>
        </div>
      </nav>

      <main className="pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header Section */}
          <div className="max-w-4xl mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl sm:text-5xl md:text-7xl text-brand-dark uppercase tracking-tighter leading-[0.95] mb-8"
            >
              {post.title}
            </motion.h1>

            <div className="flex flex-wrap items-center gap-y-4 gap-x-12 border-y border-gray-100 py-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center text-brand-lime font-display">I</div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Escrito por</p>
                  <p className="text-sm font-bold text-brand-dark">{post.author}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Publicado el</p>
                <p className="text-sm font-bold text-brand-dark">{post.date}</p>
              </div>
              <div className="ml-auto hidden sm:flex gap-4">
                 <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors">
                    <Copy size={14} /> Copiar enlace
                 </button>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20 rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-100 border border-gray-100"
          >
            <img src={post.image} alt={post.title} className="w-full aspect-[21/9] object-cover" />
          </motion.div>

          {/* Article Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 xl:gap-24">
            
            {/* Left Sidebar: ToC */}
            <aside className="hidden lg:block">
              <div className="toc-sidebar">
                <p className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-dark mb-6">Índice</p>
                <nav className="flex flex-col">
                  {toc.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`toc-link ${activeId === item.id ? 'active' : ''}`}
                    >
                      <span>{item.text}</span>
                      <div className="dot" />
                    </button>
                  ))}
                  <button
                    onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                    className="toc-link"
                  >
                    <span>Preguntas frecuentes</span>
                    <div className="dot" />
                  </button>
                </nav>

                <div className="mt-12 p-6 bg-brand-blue/5 rounded-2xl border border-brand-blue/10">
                   <p className="text-xs font-bold text-brand-blue uppercase tracking-widest mb-3">¿Necesitas ayuda?</p>
                   <p className="text-sm text-gray-600 mb-6 leading-relaxed">Analizamos tu proyecto y te damos un presupuesto a medida.</p>
                   <Link to="/#pricing" className="block text-center bg-brand-dark text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-blue transition-colors">Empezar ahora</Link>
                </div>
              </div>
            </aside>

            {/* Main Content Column */}
            <div className="max-w-3xl">
              <div 
                ref={contentRef}
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: contentWithIds }}
              />

              {/* FAQ Section */}
              {post.faqs && (
                <section className="mt-32 pt-16 border-t border-gray-100">
                  <h2 className="font-display text-3xl uppercase mb-12 tracking-tight">Preguntas <span className="text-brand-blue italic underline decoration-brand-lime/30">frecuentes</span></h2>
                  <div className="space-y-6">
                    {post.faqs.map((faq, i) => (
                      <div key={i} className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                        <h3 className="text-lg font-bold text-brand-dark mb-4">{faq.question}</h3>
                        <p className="text-gray-600 text-lg leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Minimalist Footer Navigation */}
              <div className="mt-24 pt-12 border-t border-gray-100 flex items-center justify-between">
                <Link to="/blog" className="flex items-center gap-3 font-bold text-gray-400 hover:text-brand-blue transition-colors group">
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  Volver al Blog
                </Link>
                <div className="flex gap-4">
                  <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-brand-blue hover:text-white transition-all"><Facebook size={18} /></button>
                  <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-brand-blue hover:text-white transition-all"><Twitter size={18} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simplified Next Articles Section */}
      <section className="py-24 bg-zinc-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-display text-3xl uppercase tracking-tight">Seguir leyendo</h2>
            <Link to="/blog" className="text-brand-blue font-bold uppercase tracking-widest text-xs border-b border-brand-blue pb-1">Ver todos</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(p => p.slug !== slug).map(p => (
              <Link to={`/blog/${p.slug}`} key={p.slug} className="group bg-white rounded-3xl p-4 border border-gray-100 hover:shadow-xl transition-all">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="px-2 pb-2">
                  <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest mb-3 block">{p.tag}</span>
                  <h3 className="font-display text-xl uppercase leading-tight group-hover:text-brand-blue transition-colors line-clamp-2">{p.title}</h3>
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
