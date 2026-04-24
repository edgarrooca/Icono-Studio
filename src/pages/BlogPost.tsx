import { motion, AnimatePresence } from 'motion/react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, User, ChevronRight, Share2, 
  Copy, Menu, X, ArrowRight 
} from 'lucide-react';
import { blogPosts } from '../data/blog';
import { mainNavLinks } from '../data/navigation';
import { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!post) return;

    document.title = post.metaTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', post.metaDescription);
    }

    // Schema.org Structured Data
    const schemaScriptId = 'blog-schema';
    let schemaScript = document.getElementById(schemaScriptId);
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = schemaScriptId;
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }
    
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BlogPosting",
          "headline": post.metaTitle,
          "description": post.metaDescription,
          "image": [
            window.location.origin + post.image
          ],
          "author": [{
            "@type": "Organization",
            "name": post.author,
            "url": window.location.origin
          }]
        },
        ...(post.faqs && post.faqs.length > 0 ? [{
          "@type": "FAQPage",
          "mainEntity": post.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }] : [])
      ]
    };
    schemaScript.textContent = JSON.stringify(schemaData);

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
    };

    generateToC();

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
      const schemaElement = document.getElementById(schemaScriptId);
      if (schemaElement) {
        schemaElement.remove();
      }
    };
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-display mb-4 uppercase text-brand-dark">Post no encontrado</h1>
          <RouterLink to="/blog" className="text-brand-blue font-bold hover:underline">Volver al blog</RouterLink>
        </div>
      </div>
    );
  }

  const contentWithIds = post.content.replace(/<h2>/g, (match, offset) => {
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
      
      <Navbar initialTheme="dark" />

      {/* Progress Bar (Lime for visibility against navbar) */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-[110]">
        <motion.div 
          className="h-full bg-brand-lime shadow-[0_0_10px_rgba(212,255,0,0.8)]" 
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <main className="pt-32 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-5xl mx-auto mb-12 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em]">
            <RouterLink to="/" className="text-gray-400 hover:text-brand-dark transition-colors">Inicio</RouterLink>
            <ChevronRight size={10} className="text-gray-300" />
            <RouterLink to="/blog" className="text-gray-400 hover:text-brand-dark transition-colors">Blog</RouterLink>
            <ChevronRight size={10} className="text-gray-300" />
            <span className="text-brand-blue">{post.tag}</span>
          </div>

          {/* Title Section (Smaller Scale) */}
          <div className="max-w-5xl mx-auto mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-3xl sm:text-5xl md:text-6xl text-brand-dark uppercase tracking-tight leading-tighter mb-12"
            >
              {post.title}
            </motion.h1>

            <div className="flex flex-wrap items-center gap-y-6 gap-x-12 border-y border-gray-100 py-10 w-full">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-dark flex items-center justify-center text-brand-lime font-display text-lg">I</div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-black mb-1">Escrito por</p>
                  <p className="text-base font-bold text-brand-dark">{post.author}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-black mb-1">Publicado el</p>
                <p className="text-base font-bold text-brand-dark">{post.date}</p>
              </div>
              <div className="ml-auto hidden sm:flex gap-4">
                 <button className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors">
                    <Copy size={16} /> Enlace
                 </button>
                 <div className="flex items-center gap-2">
                 </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-5xl mx-auto mb-20 rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-100 border border-gray-50"
          >
            <img src={post.image} alt={post.title} className="w-full aspect-[21/9] object-cover" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 xl:gap-24">
            
            <aside className="hidden lg:block text-slate-800">
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

                <div className="mt-12 p-6 bg-brand-blue/5 rounded-[2rem] border border-brand-blue/10">
                   <p className="text-xs font-bold text-brand-blue uppercase tracking-widest mb-3">¿Lanzamos tu web?</p>
                   <p className="text-sm text-gray-500 mb-6 leading-relaxed">Pide tu presupuesto sin compromiso hoy mismo.</p>
                   <RouterLink 
                     to="/#planes" 
                     onClick={() => (window as any).dataLayer?.push({
                       'event': 'cta_click',
                       'cta_id': 'blog_sidebar_budget',
                       'cta_text': 'Solicitar Presupuesto (Blog Sidebar)',
                       'page_path': window.location.pathname
                     })}
                     className="block text-center bg-brand-dark text-brand-lime py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-blue transition-colors"
                   >
                     Solicitar Presupuesto
                   </RouterLink>
                </div>
              </div>
            </aside>

            <div className="max-w-3xl">
              <div 
                ref={contentRef}
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: contentWithIds }}
              />

              {post.faqs && (
                <section className="mt-32 pt-24 border-t border-gray-100">
                  <h2 className="font-display text-3xl uppercase mb-16 tracking-tight text-brand-dark">Preguntas <span className="text-brand-blue italic underline decoration-brand-lime/30">frecuentes</span></h2>
                  <div className="grid gap-8">
                    {post.faqs.map((faq, i) => (
                      <div key={i} className="group flex gap-6">
                        <span className="text-brand-lime font-display text-2xl pt-1">0{i+1}.</span>
                        <div>
                          <h3 className="text-xl font-bold text-brand-dark mb-4 group-hover:text-brand-blue transition-colors">{faq.question}</h3>
                          <p className="text-gray-500 font-serif text-lg leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <div className="mt-32 p-12 bg-zinc-50 rounded-[3rem] border border-gray-100 flex flex-col md:flex-row items-center gap-10">
                 <div className="w-24 h-24 rounded-3xl bg-brand-dark text-brand-lime font-display flex items-center justify-center text-4xl shrink-0">I</div>
                 <div className="text-center md:text-left">
                    <p className="text-[10px] uppercase font-black tracking-widest text-brand-blue mb-2">Editor en Jefe</p>
                    <h4 className="font-display text-2xl uppercase tracking-tight text-brand-dark mb-4">Icono Studio Team</h4>
                    <p className="text-gray-500 mb-6 leading-relaxed">Especialistas en diseño web estratégico y desarrollo de alto impacto para negocios.</p>
                    <div className="flex justify-center md:justify-start gap-4">
                       <RouterLink 
                          to="/#planes" 
                          onClick={() => (window as any).dataLayer?.push({
                            'event': 'cta_click',
                            'cta_id': 'blog_footer_plans',
                            'cta_text': 'Nuestros Planes (Blog Footer)',
                            'page_path': window.location.pathname
                          })}
                          className="text-xs font-bold uppercase tracking-widest text-brand-dark hover:text-brand-blue underline decoration-brand-lime decoration-4"
                        >
                          Nuestros Planes
                        </RouterLink>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <section className="py-32 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-16 px-4">
            <div>
              <p className="text-brand-blue font-black uppercase tracking-widest text-[10px] mb-2">Siguiente lectura</p>
              <h2 className="font-display text-4xl uppercase tracking-tight">Quizás te <span className="italic text-brand-blue">interese</span></h2>
            </div>
            <RouterLink to="/blog" className="hidden sm:flex items-center gap-2 font-bold uppercase tracking-widest text-xs hover:text-brand-blue transition-colors">Todos los artículos <ArrowRight size={14} /></RouterLink>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(p => p.slug !== slug).slice(0, 3).map(p => (
              <RouterLink to={`/blog/${p.slug}`} key={p.slug} className="group bg-white rounded-[2.5rem] p-5 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div className="aspect-[4/3] rounded-[2rem] overflow-hidden mb-8 relative">
                   <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-transparent transition-colors duration-500" />
                   <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                </div>
                <div className="px-2">
                  <span className="text-[10px] font-bold text-brand-blue uppercase tracking-[0.2em] mb-4 block">{p.tag}</span>
                  <h3 className="font-display text-2xl uppercase leading-[1.1] group-hover:text-brand-blue transition-colors line-clamp-2">{p.title}</h3>
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
