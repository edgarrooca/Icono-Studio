import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Share2, ChevronRight, Facebook, Twitter, Linkedin, MessageSquare } from 'lucide-react';
import { blogPosts } from '../data/blog';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';

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
          <h1 className="text-4xl font-display mb-4 uppercase text-brand-dark">Post no encontrado</h1>
          <Link to="/blog" className="text-brand-blue font-bold hover:underline">Volver al blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white selection:bg-brand-lime selection:text-brand-dark">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-100 z-[100]">
        <motion.div 
          className="h-full bg-brand-blue shadow-[0_0_10px_rgba(10,54,232,0.5)]" 
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Modern Hero Section */}
      <header className="relative pt-32 pb-40 md:pt-48 md:pb-60 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 bg-support-mesh opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-dark/50 to-brand-dark"></div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-brand-lime mb-10"
          >
            <span className="w-12 h-[1px] bg-brand-lime/30"></span>
            <span>{post.tag}</span>
            <span className="w-12 h-[1px] bg-brand-lime/30"></span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white text-center uppercase tracking-tighter leading-[0.95] mb-12"
          >
            {post.title}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 text-[10px] sm:text-xs font-bold text-white/40 uppercase tracking-widest font-mono"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
              <Calendar size={14} className="text-brand-lime" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
              <User size={14} className="text-brand-lime" />
              <span>{post.author}</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-md text-white/60">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-pulse"></span>
              <span>5 min de lectura</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Content Wrapper */}
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Side: Sticky Metadata/Share */}
          <aside className="hidden lg:block w-24 pt-20">
            <div className="sticky top-32 flex flex-col items-center gap-8">
              <div className="flex flex-col gap-4">
                {[Twitter, Linkedin, Facebook, MessageSquare].map((Icon, i) => (
                  <button key={i} className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all duration-300 cursor-pointer shadow-sm">
                    <Icon size={18} />
                  </button>
                ))}
              </div>
              <div className="w-[1px] h-20 bg-gray-100"></div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 rotate-90 whitespace-nowrap mb-8">Compartir</span>
            </div>
          </aside>

          {/* Center: Main Article */}
          <main className="flex-1 -mt-32 md:-mt-48 relative z-20 pb-24">
            {/* Featured Image */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] mb-20 aspect-video relative group"
            >
              <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors duration-500"></div>
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </motion.div>

            {/* Article Body */}
            <div className="max-w-3xl mx-auto">
              <div 
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* FAQ Section */}
              {post.faqs && (
                <section className="mt-24 pt-24 border-t border-gray-100">
                  <h2 className="font-display text-4xl uppercase mb-12 tracking-tight text-brand-dark">
                    Preguntas <span className="text-brand-blue italic underline decoration-brand-lime/30">frecuentes</span>
                  </h2>
                  <div className="space-y-6">
                    {post.faqs.map((faq, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        key={i} 
                        className="bg-brand-blue/5 rounded-3xl p-8 sm:p-10 border border-brand-blue/10 hover:border-brand-blue/30 transition-all group"
                      >
                        <h3 className="text-xl font-bold text-brand-dark mb-4 flex items-start gap-3">
                          <span className="text-brand-blue font-mono">0{i+1}.</span>
                          {faq.question}
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed pl-10 border-l-2 border-brand-lime/40">
                          {faq.answer}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {/* Author Bio */}
              <div className="mt-24 bg-brand-dark text-white p-10 md:p-14 rounded-[3rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-60 h-60 bg-brand-blue/20 rounded-full blur-[80px]"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                  <div className="w-24 h-24 rounded-2xl bg-brand-lime flex items-center justify-center shrink-0">
                    <span className="text-brand-dark font-display text-4xl">IS</span>
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="font-display text-2xl uppercase tracking-tight mb-2">Escrito por Icono Studio</h4>
                    <p className="text-white/60 text-lg leading-relaxed mb-6">
                      Agencia creativa especializada en diseño web de alto rendimiento y estrategias digitales para negocios que buscan liderar su sector.
                    </p>
                    <div className="flex justify-center md:justify-start gap-4">
                      <Link to="/" className="text-brand-lime font-bold uppercase tracking-widest text-xs hover:underline decoration-white/20">Visitar Web</Link>
                      <span className="text-white/20">•</span>
                      <Link to="/#servicios" className="text-brand-lime font-bold uppercase tracking-widest text-xs hover:underline decoration-white/20">Servicios</Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Actions */}
              <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-8">
                <Link to="/blog" className="flex items-center gap-3 font-bold text-brand-dark group">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-brand-dark group-hover:text-white transition-all transform group-hover:-translate-x-2">
                    <ArrowLeft size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Atrás</span>
                    <span className="uppercase text-sm tracking-tight font-display">Volver al Blog</span>
                  </div>
                </Link>
                
                <div className="flex items-center gap-4">
                   <span className="text-xs uppercase font-bold tracking-widest text-gray-400 hidden sm:block">Compartir</span>
                   <div className="flex gap-2">
                      {[Twitter, Linkedin].map((Icon, i) => (
                        <button key={i} className="w-10 h-10 rounded-full bg-brand-blue/5 text-brand-blue flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all cursor-pointer">
                          <Icon size={16} />
                        </button>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Next Reads Section */}
      <section className="py-32 bg-zinc-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-tighter mb-4">Seguir <span className="text-brand-blue italic">explorando</span></h2>
            <div className="w-20 h-1.5 bg-brand-lime mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {blogPosts.filter(p => p.slug !== slug).map(p => (
              <motion.div 
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative bg-white p-8 sm:p-10 rounded-[3rem] border border-gray-100 flex flex-col sm:flex-row items-center gap-8 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-brand-blue/5 transition-all duration-500"
              >
                <div className="w-full sm:w-40 h-40 shrink-0 rounded-2xl overflow-hidden shadow-lg relative">
                  <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-transparent transition-colors duration-500"></div>
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest mb-4 block">{p.tag}</span>
                  <h3 className="font-display text-xl sm:text-2xl uppercase leading-tight group-hover:text-brand-blue transition-colors mb-6 line-clamp-2">{p.title}</h3>
                  <Link to={`/blog/${p.slug}`} className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-brand-dark group-hover:translate-x-2 transition-transform">
                    Leer artículo <ChevronRight size={14} className="text-brand-lime" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
