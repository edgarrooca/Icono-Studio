import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, Check, ArrowRight, Mouse, ChevronDown } from 'lucide-react';
import { portfolioProjects, Project } from '../data/projects';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RelatedGuidesSection from '../components/RelatedGuidesSection';
import SeoHead from '../components/SeoHead';
import { siteConfig } from '../lib/site';
import { blogSummariesSorted } from '../data/blogSummaries';
import { getBlogEntriesBySlugs } from '../lib/blogUtils';
import { loadMergedProjects } from '../lib/publicProjects';
import { isPrerenderUserAgent, scheduleIdleTask } from '../lib/runtime';
import { buildProjectCaseStudySchema } from '../lib/structuredData';

const tokenize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

const getRelatedProjects = (projects: Project[], currentProject: Project | null, currentId?: string) => {
  const currentTokens = new Set(
    tokenize(
      `${currentProject?.title || ''} ${currentProject?.subtitle || ''} ${currentProject?.category || ''}`,
    ),
  );

  return projects
    .filter((candidate) => candidate.id.toString() !== currentId)
    .map((candidate) => {
      let score = 0;
      const candidateTokens = tokenize(`${candidate.title} ${candidate.subtitle} ${candidate.category}`);

      if (
        currentProject?.category &&
        candidate.category &&
        candidate.category.toLowerCase() === currentProject.category.toLowerCase()
      ) {
        score += 6;
      }

      score += candidateTokens.filter((token) => currentTokens.has(token)).length;

      return { candidate, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ candidate }) => candidate);
};

const getGuideSlugsForProject = (project: Project) => {
  const haystack = `${project.title} ${project.subtitle} ${project.category} ${project.description}`.toLowerCase();

  if (haystack.includes('seo') || haystack.includes('local') || haystack.includes('valencia') || haystack.includes('negocio')) {
    return [
      'google-business-profile-google-my-business-checklist-maps',
      'keyword-research-negocios-locales-palabras-clave-clientes',
      'como-conseguir-resenas-google-y-responderlas-bien',
    ];
  }

  if (haystack.includes('app') || haystack.includes('producto') || haystack.includes('ux') || haystack.includes('experiencia')) {
    return [
      'redisenar-migrar-web-sin-perder-seo-checklist',
      'que-es-google-search-console-guia-basica',
      'landing-page-o-pagina-web-completa-diferencias',
    ];
  }

  return [
    'redisenar-migrar-web-sin-perder-seo-checklist',
    'keyword-research-negocios-locales-palabras-clave-clientes',
    'landing-page-o-pagina-web-completa-diferencias',
  ];
};

const renderParagraphs = (content?: string) =>
  content
    ?.split('\n\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean) || [];

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMockup, setActiveMockup] = useState<1 | 2>(2);

  useEffect(() => {
    window.scrollTo(0, 0);
    let isMounted = true;
    let cancelScheduledSync = () => {};

    const localProject = id ? portfolioProjects.find((p) => p.id.toString() === id) ?? null : null;
    const localRelatedProjects = getRelatedProjects(portfolioProjects, localProject, id);

    if (localProject) {
      setProject(localProject);
      setRelatedProjects(localRelatedProjects);
      setLoading(false);
    }

    const syncRemoteProjects = async () => {
      if (!id) {
        if (isMounted) {
          setRelatedProjects(localRelatedProjects);
          setLoading(false);
        }
        return;
      }
      
      try {
        const mergedProjects = await loadMergedProjects();
        const currentProject = mergedProjects.find((candidate) => candidate.id.toString() === id) ?? localProject;
        const nextRelatedProjects = getRelatedProjects(mergedProjects, currentProject, id);

        if (!isMounted) {
          return;
        }

        if (currentProject) {
          setProject(currentProject);
        }

        setRelatedProjects(nextRelatedProjects.length > 0 ? nextRelatedProjects : localRelatedProjects);
      } catch (error) {
        console.error('Error syncing project catalog:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (!localProject && !isPrerenderUserAgent()) {
      void syncRemoteProjects();
    } else if (!isPrerenderUserAgent()) {
      cancelScheduledSync = scheduleIdleTask(syncRemoteProjects, { delay: 3000, timeout: 2000 });
    } else {
      setRelatedProjects(localRelatedProjects);
    }

    return () => {
      isMounted = false;
      cancelScheduledSync();
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
        <SeoHead
          title="Cargando proyecto | Icono Studio"
          description="Cargando caso de estudio."
          path="/"
          robots="noindex,nofollow"
        />
        <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] text-brand-dark">
        <SeoHead
          title="Proyecto no encontrado | Icono Studio"
          description="El proyecto que buscas no está disponible."
          path="/"
          robots="noindex,nofollow"
        />
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

  const projectDescription =
    project.description ||
    project.clientDescription ||
    project.subtitle ||
    'Caso de estudio de diseño y desarrollo web.';
  const hasPublicLink = typeof project.link === 'string' && project.link.trim() !== '';
  const projectSchema = buildProjectCaseStudySchema(project);
  const strategyBlocks = [
    {
      eyebrow: 'Concepto',
      title: 'Dirección del proyecto',
      content: project.concept,
    },
    {
      eyebrow: 'Enfoque',
      title: 'Cómo planteamos la experiencia',
      content: project.philosophy,
    },
    {
      eyebrow: 'Base técnica',
      title: 'Rendimiento, semántica y publicación',
      content: project.technicalDetails,
    },
  ].filter((block) => typeof block.content === 'string' && block.content.trim() !== '');
  const relatedGuides = getBlogEntriesBySlugs(blogSummariesSorted, getGuideSlugsForProject(project));

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-brand-dark selection:bg-brand-lime selection:text-brand-dark overflow-x-hidden">
      <SeoHead
        title={`${project.title} | Proyecto Web | Icono Studio`}
        description={projectDescription}
        path={`/proyecto/${project.id}`}
        image={project.imgReto || project.img || siteConfig.defaultOgImage}
        schema={projectSchema}
      />
      
      <Navbar />

      <main>
        {/* 1. HERO SECTION */}
        <section className="relative pt-22 sm:pt-24 pb-10 sm:pb-12 md:pt-32 md:pb-16 px-4 sm:px-6 overflow-hidden bg-brand-dark text-white z-20 rounded-b-[2rem] md:rounded-b-[4rem] shadow-2xl">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 opacity-[0.15] bg-blueprint"></div>

          <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            
            {/* Left: Text Content */}
            <div className="flex flex-col items-start text-left relative">
              <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/55">
                  <li>
                    <Link to="/" className="transition-colors hover:text-white">
                      Inicio
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link to="/proyectos" className="transition-colors hover:text-white">
                      Proyectos
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-white/82">{project.title}</li>
                </ol>
              </nav>

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
                {hasPublicLink ? (
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => (window as any).dataLayer?.push({
                      'event': 'cta_click',
                      'cta_id': 'project_external_link',
                      'cta_text': `Ver sitio web: ${project.title}`,
                      'page_path': window.location.pathname
                    })}
                    className="bg-brand-lime text-brand-dark px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:scale-105 transition-transform inline-flex items-center gap-2 text-sm"
                  >
                    Ver sitio web <ArrowUpRight size={18} />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 sm:px-8 py-3 sm:py-4 text-sm font-bold text-white/80">
                    Proyecto no publico
                  </span>
                )}
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
                  fetchpriority="high"
                  decoding="async"
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
                  fetchpriority="high"
                  decoding="async"
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
                  fetchpriority="high"
                  decoding="async"
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
                {renderParagraphs(project.challenge).map((paragraph, i) => (
                  <p key={i} className="mb-4">{paragraph}</p>
                ))}
              </div>
              {hasPublicLink ? (
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => (window as any).dataLayer?.push({
                    'event': 'cta_click',
                    'cta_id': 'project_challenge_link',
                    'cta_text': `Ver web de ${project.title}`,
                    'page_path': window.location.pathname
                  })}
                  className="inline-flex items-center gap-2 text-brand-blue font-bold hover:text-brand-dark transition-colors group px-6 py-3 rounded-full border-2 border-brand-blue hover:border-brand-dark"
                >
                  Ver web de {project.title}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full border-2 border-gray-200 px-6 py-3 font-bold text-gray-400">
                  Demo no disponible
                </span>
              )}
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
                  loading="lazy"
                  decoding="async"
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
                <div className="flex justify-start sm:justify-center gap-4 md:gap-12 w-max sm:mx-auto px-4 sm:px-10 min-w-full sm:min-w-0 py-12 md:py-20">
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
                      className="w-full h-full object-cover object-top rounded-[1.2rem] md:rounded-[1.5rem]" 
                      referrerPolicy="no-referrer" 
                      loading="lazy"
                      decoding="async"
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
                      loading="lazy"
                      decoding="async"
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
                      loading="lazy"
                      decoding="async"
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

        {strategyBlocks.length > 0 && (
          <section className="relative bg-white py-14 text-brand-dark sm:py-20 md:py-28">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0F172A 2px, transparent 2px)', backgroundSize: '32px 32px' }}></div>
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
              <div className="max-w-3xl">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-brand-blue">Caso de estudio</p>
                <h2 className="font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
                  Estrategia, ejecución y base técnica del proyecto
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">
                  No nos quedamos en la parte visual. Cada proyecto se plantea para sostener mejor la conversión, la claridad del mensaje y una publicación limpia a nivel técnico.
                </p>
              </div>

              <div className="mt-10 grid gap-5 lg:grid-cols-3">
                {strategyBlocks.map((block) => (
                  <article key={block.title} className="rounded-[2rem] border border-gray-100 bg-[#F8F9FA] p-6 shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-brand-blue">{block.eyebrow}</p>
                    <h3 className="mt-4 font-display text-2xl uppercase leading-[1.02] tracking-tight text-brand-dark">
                      {block.title}
                    </h3>
                    <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-600 sm:text-[15px]">
                      {renderParagraphs(block.content).map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-3 rounded-[2rem] border border-brand-dark/10 bg-brand-dark p-6 text-white shadow-[0_18px_45px_rgba(15,23,42,0.14)] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-8">
                <div className="max-w-2xl">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-brand-lime">Quieres algo parecido</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/74 sm:text-base">
                    Si buscas una web con esta misma mezcla de claridad visual, enfoque comercial y base SEO limpia, podemos preparar una propuesta adaptada a tu negocio.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/contacto"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-lime px-6 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-brand-dark transition-transform hover:scale-[1.02]"
                  >
                    Pedir propuesta
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    to="/precios"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-brand-dark"
                  >
                    Ver precios
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="bg-[#F8F9FA] px-4 py-0 sm:px-6">
          <div className="mx-auto max-w-7xl pb-14 sm:pb-20 md:pb-24">
            <RelatedGuidesSection
              eyebrow="Guías que refuerzan este tipo de proyecto"
              title="Contenido útil para mejorar visibilidad y conversión"
              description="Si te interesa este caso, estas guías te ayudan a entender mejor la parte de SEO, estructura y captación que hay detrás de una web bien planteada."
              posts={relatedGuides}
              ctaLabel="Ir al blog"
              ctaTo="/blog"
            />
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
              <Link to="/proyectos" className="hidden md:flex items-center gap-2 text-brand-blue font-bold hover:text-brand-dark transition-colors">
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
                  <Link 
                    to={`/proyecto/${rp.id}`} 
                    onClick={() => (window as any).dataLayer?.push({
                      'event': 'project_click',
                      'project_id': rp.id,
                      'project_title': rp.title,
                      'page_path': window.location.pathname
                    })}
                    className="group cursor-pointer flex flex-col h-full"
                  >
                    <div className="overflow-hidden rounded-2xl aspect-[4/3] mb-4 bg-gray-100 relative shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:-translate-y-1">
                      <img 
                        src={rp.img} 
                        alt={rp.title} 
                        className="w-full h-full object-cover object-top transition-all duration-[5s] ease-in-out group-hover:object-bottom" 
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
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
              <Link to="/proyectos" className="inline-flex items-center gap-2 text-brand-blue font-bold hover:text-brand-dark transition-colors">
                Ver todos <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
