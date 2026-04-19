import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Check, ArrowRight, Menu, X, Mouse, ChevronDown, Download, Mail, Plus } from 'lucide-react';
import { portfolioProjects, Project } from '../data/projects';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { mainNavLinks } from '../data/navigation';
import Navbar from '../components/Navbar';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [relatedProjects, setRelatedProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMockup, setActiveMockup] = useState<1 | 2>(2);

  useEffect(() => {
    window.scrollTo(0, 0);
    let isMounted = true;

    const localProject = id ? portfolioProjects.find((p) => p.id.toString() === id) ?? null : null;
    const localRelatedProjects = portfolioProjects.filter((p) => p.id.toString() !== id).slice(0, 3);

    if (localProject) {
      setProject(localProject);
      setLoading(false);
    }

    const withTimeout = async <T,>(promise: Promise<T>, ms = 3500): Promise<T | null> => (
      Promise.race([
        promise,
        new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
      ])
    );
    
    const fetchProject = async () => {
      if (!id) {
        if (isMounted) {
          setRelatedProjects(localRelatedProjects);
          setLoading(false);
        }
        return;
      }
      
      try {
        // Try to fetch from Firebase first
        const docRef = doc(db, 'projects', id);
        const docSnap = await withTimeout(getDoc(docRef));
        
        let currentProject = null;
        
        if (docSnap && docSnap.exists()) {
          currentProject = { id: docSnap.id, ...docSnap.data() };
        } else {
          // Fallback to static data if not found in Firebase (for backwards compatibility)
          currentProject = localProject;
        }
        
        if (isMounted && currentProject) {
          setProject(currentProject);
        }

        // Fetch related projects
        const projectsSnapshot = await withTimeout(getDocs(collection(db, 'projects')));
        let allProjects = localRelatedProjects;

        if (projectsSnapshot) {
          const fetchedProjects = projectsSnapshot.docs.map(d => ({ id: d.id, ...d.data() } as Project));
          allProjects = fetchedProjects.length > 0 ? fetchedProjects.filter(p => p.id.toString() !== id).slice(0, 3) : localRelatedProjects;
        }

        if (isMounted) {
          setRelatedProjects(allProjects);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        if (isMounted) {
          if (localProject) {
            setProject(localProject);
          }
          setRelatedProjects(localRelatedProjects);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProject();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      isMounted = false;
      window.removeEventListener('scroll', handleScroll);
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
        <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

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

  const mobileImages = [
    project.imgMobile1,
    project.imgMobile2,
    project.imgMobile3,
    project.imgMobile4,
    project.imgMobile5
  ].filter(img => img && img.trim() !== '');

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-brand-dark selection:bg-brand-lime selection:text-brand-dark overflow-x-hidden">
      
      <Navbar />

      <main>
        {/* 1. HERO SECTION */}
        <section className="relative pt-22 sm:pt-24 pb-10 sm:pb-12 md:pt-32 md:pb-16 px-4 sm:px-6 overflow-hidden bg-brand-dark text-white z-20 rounded-b-[2rem] md:rounded-b-[4rem] shadow-2xl">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 opacity-[0.15] bg-blueprint"></div>

          <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            
            {/* Left: Text Content */}
            <div className="flex flex-col items-start text-left relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm"
              >
                <span className="w-2 h-2 rounded-full bg-brand-lime"></span>
                {project.category || 'Estudio'}
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-5 sm:mb-6"
              >
                {project.title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-medium mb-3 sm:mb-4 leading-relaxed max-w-xl"
              >
                {project.subtitle}
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-sm sm:text-base text-white/60 font-light mb-8 sm:mb-10 leading-relaxed max-w-xl"
              >
                {project.clientDescription}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4"
              >
                <a 
                  href={project.link || '#'} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-lime text-brand-dark px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:scale-105 transition-transform inline-flex items-center gap-2 text-sm"
                >
                  Ver sitio web <ArrowUpRight size={18} />
                </a>
              </motion.div>
            </div>

            {/* Right: Mockups */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-full h-[240px] sm:h-[300px] md:h-[350px] lg:h-[450px] mt-4 sm:mt-12 lg:mt-0"
            >
              <div className="sm:hidden relative mx-auto w-full max-w-[20rem] aspect-[16/10] rounded-[1.4rem] border-[6px] border-brand-dark shadow-2xl overflow-hidden bg-brand-dark">
                <img 
                  src={project.img}
                  alt={`${project.title} preview`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${project.id}mobilepreview/1200/800`; }}
                />
              </div>

              {/* PC Mockup 1 (Back/Left) */}
              <motion.div 
                onClick={() => setActiveMockup(1)}
                animate={{
                  zIndex: activeMockup === 1 ? 20 : 0,
                  scale: activeMockup === 1 ? 1.05 : 0.95,
                  rotate: activeMockup === 1 ? 0 : -3,
                  x: activeMockup === 1 ? '5%' : '0%',
                  y: activeMockup === 1 ? '5%' : '0%',
                  opacity: activeMockup === 1 ? 1 : 0.6
                }}
                whileHover={{ scale: activeMockup === 1 ? 1.08 : 0.98, rotate: activeMockup === 1 ? 0 : -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="hidden sm:block absolute left-0 md:left-[5%] top-[10%] md:top-[15%] w-[75%] md:w-[70%] aspect-[16/10] rounded-xl md:rounded-2xl border-[4px] md:border-[6px] border-brand-dark shadow-2xl overflow-hidden bg-brand-dark cursor-pointer"
              >
                <img 
                  src={project.imgPc1 || `https://picsum.photos/seed/${project.id}pc1/1200/800`} 
                  alt="PC mockup 1" 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer" 
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${project.id}pc1/1200/800`; }}
                />
              </motion.div>

              {/* PC Mockup 2 (Front/Right) */}
              <motion.div 
                onClick={() => setActiveMockup(2)}
                animate={{
                  zIndex: activeMockup === 2 ? 20 : 0,
                  scale: activeMockup === 2 ? 1.05 : 0.95,
                  rotate: activeMockup === 2 ? 2 : 5,
                  x: activeMockup === 2 ? '-5%' : '0%',
                  y: activeMockup === 2 ? '-5%' : '0%',
                  opacity: activeMockup === 2 ? 1 : 0.6
                }}
                whileHover={{ scale: activeMockup === 2 ? 1.08 : 0.98, rotate: activeMockup === 2 ? 2 : 7 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="hidden sm:block absolute right-0 md:right-[5%] bottom-[10%] md:bottom-[15%] w-[75%] md:w-[70%] aspect-[16/10] rounded-xl md:rounded-2xl border-[4px] md:border-[6px] border-brand-dark shadow-2xl overflow-hidden bg-brand-dark cursor-pointer"
              >
                <img 
                  src={project.img} 
                  alt="PC mockup 2" 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer" 
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${project.id}pc2/1200/800`; }}
                />
              </motion.div>
            </motion.div>

          </div>
        </section>

        {/* 2. EL RETO */}
        <section className="relative py-14 sm:py-20 md:py-32 bg-white text-brand-dark overflow-hidden">
          {/* Decorative Dot Pattern Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0F172A 2px, transparent 2px)', backgroundSize: '32px 32px' }}></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-8 h-[2px] bg-brand-dark"></span>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">El Reto</p>
              </div>
              
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 sm:mb-8 leading-tight">
                Diseño web estratégico para un referente
              </h2>
              <div className="prose prose-lg text-gray-600 font-light leading-relaxed mb-10">
                {project.challenge?.split('\n\n').map((p: string, i: number) => (
                  <p key={i} className="mb-4">{p}</p>
                ))}
              </div>
              <a href={project.link || '#'} className="inline-flex items-center gap-2 text-brand-blue font-bold hover:text-brand-dark transition-colors group px-6 py-3 rounded-full border-2 border-brand-blue hover:border-brand-dark">
                Ver web de {project.title}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <div className="relative order-1 lg:order-2 group cursor-pointer flex justify-center lg:justify-end">
              <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 aspect-[4/5] relative lg:translate-x-4 transition-transform duration-500 group-hover:-translate-y-2">
                {/* Indicator */}
                <motion.div 
                  className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 bg-brand-dark/90 backdrop-blur-md text-brand-lime w-16 h-16 rounded-full shadow-2xl items-center justify-center pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-500 border border-white/10 flex-col"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <Mouse size={24} className="mb-0.5" />
                  <motion.div
                    animate={{ y: [0, 5, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    <ChevronDown size={18} strokeWidth={3} />
                  </motion.div>
                </motion.div>
                
                <img 
                  src={project.imgReto || `https://picsum.photos/seed/${project.id}reto/800/2400`} 
                  alt="Mockup" 
                  className="w-full h-full object-cover object-top transition-all duration-[5s] ease-in-out group-hover:object-bottom" 
                  referrerPolicy="no-referrer" 
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${project.id}reto/800/2400`; }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3. SHOWCASE BAND */}
        {mobileImages.length > 0 && (
          <section className="py-14 sm:py-20 md:py-32 bg-[#fffafa] relative flex items-center justify-center overflow-x-hidden">
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black to-transparent"></div>
            <div className="max-w-[100vw] mx-auto relative z-10 w-full">
              <div className="overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex justify-start sm:justify-center gap-4 md:gap-12 w-max sm:mx-auto px-4 sm:px-10 min-w-full sm:min-w-0">
                {mobileImages.map((img, index) => (
                  <motion.div 
                    key={index} 
                    whileHover={{ y: -15, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`relative w-[160px] sm:w-[200px] md:w-[260px] aspect-[9/19.5] rounded-[1.7rem] md:rounded-[2.5rem] border-[7px] sm:border-[8px] md:border-[12px] border-brand-dark shadow-2xl bg-brand-dark overflow-hidden flex-shrink-0 cursor-pointer ${index % 2 === 0 ? 'translate-y-2 sm:translate-y-4 md:translate-y-8' : '-translate-y-2 sm:-translate-y-4 md:-translate-y-8'}`}
                  >
                    {/* iPhone Dynamic Island */}
                    <div className="absolute top-2 md:top-3 inset-x-0 flex justify-center z-20">
                      <div className="w-[30%] h-5 md:h-6 bg-brand-dark rounded-full"></div>
                    </div>
                    <img 
                      src={img} 
                      alt={`Screen ${index + 1}`} 
                      className="w-full h-full object-cover rounded-[1.5rem] md:rounded-[1.8rem]" 
                      referrerPolicy="no-referrer" 
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${project.id}showcase${index}/600/1300`; }}
                    />
                  </motion.div>
                ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 4. OBJETIVOS & RESULTADOS */}
        <section className="relative py-14 sm:py-20 md:py-32 bg-[#F8F9FA] text-brand-dark overflow-hidden">
          <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 ${project.imgObj1 || project.imgObj2 ? 'lg:grid-cols-2' : ''} gap-10 sm:gap-16 items-center`}>
            {(project.imgObj1 || project.imgObj2) && (
              <div className={`grid ${project.imgObj1 && project.imgObj2 ? 'grid-cols-2' : 'grid-cols-1'} gap-4 md:gap-6 relative`}>
                {/* Decorative dots behind images */}
                <div className="absolute -top-8 -left-8 w-32 h-32 opacity-20 pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(#0F172A 2px, transparent 2px)', backgroundSize: '16px 16px' }}></div>
                
                {project.imgObj1 && (
                  <div className={`relative z-10 rounded-2xl overflow-hidden shadow-xl aspect-[3/4] ${project.imgObj2 ? 'mt-12' : ''} transition-transform duration-500 hover:-translate-y-2`}>
                    <img 
                      src={project.imgObj1} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer" 
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${project.id}obj1/600/800`; }}
                    />
                  </div>
                )}
                {project.imgObj2 && (
                  <div className={`relative z-10 rounded-2xl overflow-hidden shadow-xl aspect-[3/4] ${project.imgObj1 ? 'mb-12' : ''} transition-transform duration-500 hover:-translate-y-2`}>
                    <img 
                      src={project.imgObj2} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer" 
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${project.id}obj2/600/800`; }}
                    />
                  </div>
                )}
              </div>
            )}
            <div className={!(project.imgObj1 || project.imgObj2) ? 'max-w-3xl mx-auto text-center' : ''}>
              <div className={`inline-flex items-center gap-2 mb-6 ${!(project.imgObj1 || project.imgObj2) ? 'justify-center w-full' : ''}`}>
                <span className="w-8 h-[2px] bg-brand-dark"></span>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Objetivos & Resultados</p>
                <span className={`w-8 h-[2px] bg-brand-dark ${!(project.imgObj1 || project.imgObj2) ? 'block' : 'hidden'}`}></span>
              </div>
              
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 sm:mb-8 leading-tight">
                Objetivos de la nueva web
              </h2>
              <ul className={`space-y-4 sm:space-y-5 mb-10 sm:mb-14 ${!(project.imgObj1 || project.imgObj2) ? 'text-left max-w-2xl mx-auto' : ''}`}>
                {project.objectives?.map((obj: string, i: number) => (
                  <li key={i} className="flex items-start gap-4 text-gray-600 text-base sm:text-lg group">
                    <div className="mt-1 bg-white border border-gray-200 shadow-sm p-1.5 rounded-full flex-shrink-0 group-hover:bg-brand-lime group-hover:border-brand-lime transition-colors">
                      <Check size={16} className="text-brand-dark" />
                    </div>
                    <span className="leading-relaxed">{obj}</span>
                  </li>
                ))}
              </ul>
              
              <div className={`flex flex-wrap gap-5 sm:gap-6 md:gap-10 ${!(project.imgObj1 || project.imgObj2) ? 'justify-center' : ''}`}>
                {[
                  { label: 'Rendimiento', score: '92%' },
                  { label: 'Accesibilidad', score: '100%' },
                  { label: 'Prácticas', score: '98%' },
                  { label: 'SEO', score: '100%' }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 group">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-brand-lime flex items-center justify-center text-xl md:text-2xl font-display text-brand-dark bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300">
                      {stat.score}
                    </div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest text-center">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. LEAD MAGNET / NEWSLETTER */}
        <section className="py-14 sm:py-20 md:py-32 bg-brand-lime relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 relative z-10">
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-dark/10 text-brand-dark font-bold text-xs sm:text-sm uppercase tracking-wider mb-4">
                <Download size={14} />
                Recurso Gratuito
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-brand-dark leading-none mb-3">
                10 errores que arruinan tu conversión
              </h2>
              <p className="text-brand-dark/80 text-sm sm:text-base md:text-lg mb-0">
                Descarga nuestra checklist gratuita y descubre por qué tu web actual no está consiguiendo clientes.
              </p>
            </div>
            
            <div className="md:w-1/2 w-full">
              <form className="flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-2xl sm:rounded-full shadow-xl">
                <div className="flex-grow flex items-center pl-4">
                  <Mail className="text-gray-400 mr-3 shrink-0" size={20} />
                  <input 
                    type="email" 
                    placeholder="Tu correo electrónico" 
                    className="w-full py-2.5 outline-none text-brand-dark bg-transparent"
                    required
                  />
                </div>
                <button type="submit" className="bg-brand-dark text-white px-6 py-3 rounded-xl sm:rounded-full font-bold hover:bg-black transition-colors whitespace-nowrap">
                  Descargar PDF
                </button>
              </form>
              <p className="text-xs text-brand-dark/60 mt-3 text-center sm:text-left pl-4">
                * 100% libre de spam. Date de baja cuando quieras.
              </p>
            </div>
          </div>
        </section>

        {/* 6. PROYECTOS RELACIONADOS */}
        <section className="py-14 sm:py-20 md:py-32 bg-[#F8F9FA]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-brand-dark">
                  Proyectos relacionados
                </h2>
              </div>
              <Link to="/#proyectos" className="hidden md:flex items-center gap-2 text-brand-blue font-bold hover:text-brand-dark transition-colors">
                Ver todos <ArrowRight size={18} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {relatedProjects.map((rp, i) => (
                <motion.div
                  key={rp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link to={`/proyecto/${rp.id}`} className="group cursor-pointer flex flex-col h-full">
                    <div className="overflow-hidden rounded-2xl aspect-[4/3] mb-4 bg-gray-100 relative shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:-translate-y-1">
                      <img 
                        src={rp.img} 
                        alt={rp.title} 
                        className="w-full h-full object-cover object-top transition-all duration-[5s] ease-in-out group-hover:object-bottom" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/5 transition-colors duration-500"></div>
                    </div>
                    <div className="flex justify-between items-start gap-4 px-1">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                          {rp.category}
                        </p>
                        <h3 className="text-xl font-display text-brand-dark group-hover:text-brand-blue transition-colors">
                          {rp.title}
                        </h3>
                      </div>
                      <div className="w-10 h-10 shrink-0 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-brand-lime group-hover:text-brand-dark group-hover:border-brand-lime transition-all duration-300 transform group-hover:rotate-45">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-10 text-center md:hidden">
              <Link to="/#proyectos" className="inline-flex items-center gap-2 text-brand-blue font-bold hover:text-brand-dark transition-colors">
                Ver todos <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER / BIG CTA */}
      <footer className="bg-brand-dark text-white pt-16 sm:pt-20 pb-10 sm:pb-12 px-4 sm:px-6 rounded-t-[2.5rem] sm:rounded-t-[3rem] md:rounded-t-[4rem] mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
            <h2 className="font-display text-[18vw] sm:text-[16vw] md:text-[14vw] leading-[0.8] uppercase tracking-tighter mb-8 sm:mb-12 text-brand-lime">
              ¿Hablamos?
            </h2>
            <a href="mailto:holaiconostudio@gmail.com" className="inline-flex items-center justify-center gap-3 sm:gap-4 bg-white text-brand-dark px-8 sm:px-12 py-4 sm:py-6 rounded-full font-display text-xl sm:text-2xl uppercase hover:bg-brand-lime transition-colors w-full sm:w-auto">
              Pedir Presupuesto <ArrowUpRight size={24} className="sm:w-7 sm:h-7" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 border-t border-white/20 pt-10 sm:pt-12">
            <div className="sm:col-span-2">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <img src="/icono-studio-logo.png" alt="Icono Studio Logo" className="h-10 sm:h-12 w-auto object-contain" />
              </div>
              <p className="text-white/60 max-w-sm text-base sm:text-lg">
                Agencia de diseño y desarrollo web en Valencia. Creando experiencias digitales que marcan la diferencia.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold uppercase tracking-wider mb-4 sm:mb-6 text-brand-lime">Navegación</h4>
              <ul className="space-y-3 sm:space-y-4 text-white/70 font-medium text-sm sm:text-base">
                {mainNavLinks.map(link => (
                  <li key={link.name}><a href={link.href} className="hover:text-white transition-colors">{link.name}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-wider mb-4 sm:mb-6 text-brand-lime">Social</h4>
              <ul className="space-y-3 sm:space-y-4 text-white/70 font-medium text-sm sm:text-base">
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter / X</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dribbble</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 border-t border-white/20 pt-8 mt-10 sm:mt-12 text-xs sm:text-sm text-white/50 font-mono text-center md:text-left">
            <p>© 2026 Icono Studio. Todos los derechos reservados.</p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a href="#" className="hover:text-white transition-colors">Aviso Legal</a>
              <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
