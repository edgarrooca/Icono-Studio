import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Check, ArrowRight } from 'lucide-react';
import { portfolioProjects } from '../data/projects';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = portfolioProjects.find(p => p.id === Number(id));
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] text-brand-dark">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Proyecto no encontrado</h1>
          <Link to="/" className="text-brand-blue hover:underline font-bold">Volver al inicio</Link>
        </div>
      </div>
    );
  }

  const relatedProjects = portfolioProjects.filter(p => p.id !== project.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-brand-dark selection:bg-brand-lime selection:text-brand-dark overflow-x-hidden">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className={`flex justify-between items-center rounded-full px-6 py-3 transition-all duration-300 ${isScrolled ? 'bg-brand-dark/90 backdrop-blur-md shadow-lg text-white' : 'bg-transparent text-white'}`}>
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 z-50">
              <img src="/2026-02-18 (1).png" alt="Icono Studio Logo" className="h-8 sm:h-10 w-auto object-contain" />
            </Link>
            
            {/* CTA */}
            <div className="flex items-center gap-4 z-50">
              <Link to="/" className={`flex px-5 py-2 sm:px-6 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm items-center gap-2 transition-transform hover:scale-105 ${isScrolled ? 'bg-brand-lime text-brand-dark' : 'bg-white text-brand-blue'}`}>
                <ArrowLeft size={16} /> <span className="hidden sm:inline">Volver al portfolio</span><span className="sm:hidden">Volver</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* 1. HERO SECTION & MAIN IMAGE */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-4 sm:px-6 overflow-hidden bg-brand-dark text-white z-20 rounded-b-[2.5rem] sm:rounded-b-[3rem] md:rounded-b-[4rem] shadow-2xl">
          {/* Atmospheric Background */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-lime/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-[85rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Typography */}
            <div className="lg:col-span-5 flex flex-col items-start text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white font-medium text-xs sm:text-sm uppercase tracking-widest mb-8 border border-white/10 backdrop-blur-md"
              >
                <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse"></span>
                {project.category}
              </motion.div>
              
              <motion.h1 
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.85] tracking-tighter mb-8"
              >
                {project.title}
              </motion.h1>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="pl-6 border-l-2 border-brand-lime/30"
              >
                <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
                  {project.subtitle}
                </p>
              </motion.div>
            </div>

            {/* Right: Editorial Image */}
            <div className="lg:col-span-7 relative mt-8 lg:mt-0">
              <motion.div 
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] aspect-[4/3] lg:aspect-[16/11] bg-gray-900 group"
              >
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem] pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.div>
              
              {/* Floating Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
                className="absolute -bottom-6 -left-6 lg:-bottom-8 lg:-left-8 w-20 h-20 lg:w-28 lg:h-28 bg-brand-lime rounded-full flex items-center justify-center text-brand-dark shadow-[0_0_40px_rgba(204,255,0,0.3)] z-20 border-4 border-brand-dark"
              >
                <ArrowRight size={32} className="transform rotate-90" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. PROJECT META */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 relative z-30 mt-16 md:mt-24 mb-20 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
          >
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Cliente</p>
              <p className="font-medium text-brand-dark text-lg">{project.title}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Servicios</p>
              <p className="font-medium text-brand-dark text-lg">{project.category}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Año</p>
              <p className="font-medium text-brand-dark text-lg">2026</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Website</p>
              <a href="#" className="font-medium text-brand-blue hover:text-brand-dark flex items-center gap-1 transition-colors text-lg group">
                Visitar sitio <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </section>

        {/* 3. THE CHALLENGE */}
        <section className="py-20 md:py-32 bg-[#F8F9FA]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-12 md:gap-24">
              <div className="md:w-1/3">
                <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-brand-dark mb-4">
                  El Reto
                </h2>
                <div className="w-12 h-1 bg-brand-lime mb-8"></div>
              </div>
              <div className="md:w-2/3">
                <div className="prose prose-lg text-gray-600 max-w-none font-light leading-relaxed">
                  {project.challenge.split('\n\n').map((p, i) => (
                    <p key={i} className="mb-6 text-lg md:text-xl">{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. OBJECTIVES & RESULTS */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-brand-dark mb-4">
                Objetivos & Resultados
              </h2>
              <div className="w-12 h-1 bg-brand-lime mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                {project.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-full bg-brand-blue/5 flex items-center justify-center text-brand-blue font-display text-xl shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                      0{i + 1}
                    </div>
                    <p className="text-gray-600 leading-relaxed text-lg pt-2">{obj}</p>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Rendimiento', score: '98%' },
                  { label: 'Accesibilidad', score: '100%' },
                  { label: 'Prácticas', score: '100%' },
                  { label: 'SEO', score: '100%' }
                ].map(stat => (
                  <div key={stat.label} className="bg-[#F8F9FA] rounded-3xl p-8 flex flex-col items-center justify-center aspect-square hover:bg-brand-dark hover:text-white transition-colors duration-500 group">
                    <span className="text-4xl md:text-5xl font-display text-brand-dark group-hover:text-brand-lime mb-3 transition-colors">{stat.score}</span>
                    <span className="text-xs font-bold text-gray-400 group-hover:text-gray-300 uppercase tracking-widest text-center transition-colors">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. CONCEPT & PHILOSOPHY */}
        <section className="py-24 md:py-40 bg-brand-dark text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-white mb-4">
                Concepto & Filosofía
              </h2>
              <div className="w-12 h-1 bg-brand-lime mx-auto"></div>
            </div>
            
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.2] mb-16 text-center text-balance font-light">
              "{project.concept}"
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-white/70 text-lg font-light leading-relaxed">
              {project.philosophy.split('\n\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* 6. IMAGE GRID */}
        <section className="py-20 md:py-32 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            <div className="md:col-span-8 rounded-3xl overflow-hidden bg-gray-100 aspect-[4/3] shadow-lg">
              <img 
                src={`https://picsum.photos/seed/${project.id}grid1/1200/900`} 
                alt="Detail 1" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="md:col-span-4 rounded-3xl overflow-hidden bg-gray-100 aspect-[3/4] md:aspect-auto shadow-lg">
              <img 
                src={`https://picsum.photos/seed/${project.id}grid2/600/800`} 
                alt="Detail 2" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        {/* 7. TECHNICAL EXECUTION */}
        <section className="py-20 md:py-32 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-12 md:gap-24">
              <div className="md:w-1/3">
                <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-brand-dark mb-4">
                  Ejecución Técnica
                </h2>
                <div className="w-12 h-1 bg-brand-lime mb-8"></div>
              </div>
              <div className="md:w-2/3">
                <div className="prose prose-lg text-gray-600 max-w-none font-light leading-relaxed">
                  {project.technicalDetails.split('\n\n').map((p, i) => (
                    <p key={i} className="mb-6 text-lg md:text-xl">{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. NEXT PROJECTS */}
        <section className="py-20 md:py-32 bg-[#F8F9FA]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex justify-between items-end mb-16 border-b border-gray-200 pb-8">
              <div>
                <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-brand-dark">
                  Siguientes Proyectos
                </h2>
              </div>
              <Link to="/" className="hidden md:flex items-center gap-2 text-brand-blue font-bold hover:text-brand-dark transition-colors">
                Ver todos <ArrowRight size={20} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
              {relatedProjects.map(rp => (
                <Link key={rp.id} to={`/proyecto/${rp.id}`} className="group cursor-pointer flex flex-col">
                  <div className="overflow-hidden rounded-3xl aspect-[4/3] mb-6 bg-gray-100 relative shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2">
                    <img 
                      src={rp.img} 
                      alt={rp.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/10 transition-colors duration-500"></div>
                  </div>
                  <div className="flex justify-between items-start gap-4 px-2">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        {rp.category}
                      </p>
                      <h3 className="text-2xl font-display text-brand-dark group-hover:text-brand-blue transition-colors">
                        {rp.title}
                      </h3>
                    </div>
                    <div className="w-12 h-12 shrink-0 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-brand-lime group-hover:text-brand-dark group-hover:border-brand-lime transition-all duration-300 transform group-hover:rotate-45">
                      <ArrowUpRight size={24} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-12 text-center md:hidden">
              <Link to="/" className="inline-flex items-center gap-2 text-brand-blue font-bold hover:text-brand-dark transition-colors">
                Ver todos <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

