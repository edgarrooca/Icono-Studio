import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { blogPosts } from '../data/blog';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function Blog() {
  useEffect(() => {
    document.title = 'Blog | Icono Studio - Diseño Web y Estrategia Digital';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] selection:bg-brand-lime selection:text-brand-dark">
      <Navbar initialTheme="dark" />
      {/* Premium Header */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-brand-dark text-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-lime/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 mb-8">
            <Link to="/" className="hover:text-brand-lime transition-colors">Inicio</Link>
            <ChevronRight size={12} />
            <span className="text-brand-lime">Blog</span>
          </nav>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-none mb-6"
          >
            Ideas para <br />
            <span className="text-brand-lime italic">crecer online</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-white/60 max-w-2xl font-medium"
          >
            Estrategias, consejos y tendencias sobre diseño web, SEO y digitalización para negocios que no se conforman.
          </motion.p>
        </div>
      </section>

      {/* Blog Feed */}
      <section className="py-24 relative z-20 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col h-full bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-brand-blue/5 transition-all duration-500"
              >
                <Link to={`/blog/${post.slug}`} className="block overflow-hidden aspect-[4/3] relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-brand-dark text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                      {post.tag}
                    </span>
                  </div>
                </Link>

                <div className="p-8 sm:p-10 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 font-mono">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                    <span>{post.author}</span>
                  </div>
                  
                  <Link to={`/blog/${post.slug}`} className="block group/link mb-6">
                    <h2 className="font-display text-2xl sm:text-3xl uppercase leading-[1.1] tracking-tight group-hover/link:text-brand-blue transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  
                  <p className="text-gray-500 text-base leading-relaxed mb-8 line-clamp-3">
                    {post.subtitle || "Explora las claves para mejorar tu presencia digital y conseguir resultados reales."}
                  </p>

                  <div className="mt-auto">
                    <Link 
                      to={`/blog/${post.slug}`} 
                      className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-widest text-brand-dark group-hover:text-brand-blue transition-colors"
                    >
                      Leer más <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Newsletter / Lead Magnet Catcher */}
          <div className="mt-32 bg-brand-lime rounded-[3rem] p-10 md:p-20 text-brand-dark relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/20 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="md:w-3/5 text-center md:text-left relative z-10">
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tighter leading-none mb-6">
                ¿Quieres más <br />
                <span className="italic text-brand-dark/60">estrategia?</span>
              </h2>
              <p className="text-lg sm:text-xl font-medium max-w-xl opacity-80">
                Suscríbete para recibir consejos directos sobre cómo convertir tu web en una máquina de captar clientes.
              </p>
            </div>

            <div className="md:w-2/5 w-full relative z-10">
              <form className="flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-2xl sm:rounded-full">
                <input 
                  type="email" 
                  placeholder="Tu email" 
                  className="flex-grow px-6 py-3 outline-none rounded-full font-medium"
                />
                <button className="bg-brand-dark text-white px-8 py-4 rounded-xl sm:rounded-full font-bold hover:bg-black transition-colors whitespace-nowrap uppercase text-xs tracking-widest">
                  Unirme
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
