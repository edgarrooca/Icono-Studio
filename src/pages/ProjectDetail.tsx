import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { m } from 'motion/react';
import { ArrowUpRight, Check, ArrowRight } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center bg-white">
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
      <div className="min-h-screen flex items-center justify-center bg-white text-[#0B1B63]">
        <SeoHead
          title="Proyecto no encontrado | Icono Studio"
          description="El proyecto que buscas no está disponible."
          path="/"
          robots="noindex,nofollow"
        />
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Proyecto no encontrado</h1>
          <Link to="/" className="text-[#2A6D98] hover:underline font-bold">Volver al inicio</Link>
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

  return <ProjectDetailExperience project={project} relatedProjects={relatedProjects} />;

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-[#0B1B63] selection:bg-[#9ED6F1]/40 selection:text-[#0B1B63]">
      <SeoHead
        title={`${project.title} | Proyecto Web | Icono Studio`}
        description={projectDescription}
        path={`/proyecto/${project.id}`}
        image={project.img || project.imgReto || siteConfig.defaultOgImage}
        schema={projectSchema}
      />

      <Navbar />

      <main>
        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden bg-[#F7F7F7] px-5 pb-12 pt-28 sm:px-6 sm:pb-14 sm:pt-32 lg:px-8 lg:pb-16">
          <div className="pointer-events-none absolute -right-32 -top-40 h-[32rem] w-[32rem] rounded-full bg-[#D8ECFB] blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-44 left-[-6%] h-[24rem] w-[24rem] rounded-full bg-[#EAF5FA] blur-3xl" aria-hidden />

          <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">

            {/* Left: Text Content */}
            <div className="flex flex-col items-start text-left relative">
              <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#526477]">
                  <li>
                    <Link to="/" className="transition-colors hover:text-[#0B1B63]">
                      Inicio
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link to="/proyectos" className="transition-colors hover:text-[#0B1B63]">
                      Proyectos
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-[#0B1B63]">{project.title}</li>
                </ol>
              </nav>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block rounded-full bg-[#E6F4FB] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0B1B63]"
              >
                {project.category || 'Estudio'}
              </m.div>

              <m.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-5 font-display text-[2.1rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#0B1B63] sm:text-[2.6rem] lg:text-[3rem]"
              >
                {project.title}
              </m.h1>
              <m.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-3 max-w-xl text-base font-medium leading-relaxed text-[#1F3572] sm:mb-4 sm:text-lg"
              >
                {project.subtitle}
              </m.p>
              <m.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="mb-8 max-w-xl text-sm leading-relaxed text-[#526477] sm:mb-10 sm:text-base"
              >
                {project.clientDescription}
              </m.p>

              <m.div
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
                    className="brand-button brand-button--outline inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold"
                  >
                    Ver sitio web <ArrowUpRight size={18} />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-[1rem] border-2 border-[#DCE5EE] bg-white px-7 py-3.5 text-sm font-semibold text-[#5F7186]">
                    Proyecto no publico
                  </span>
                )}
              </m.div>
            </div>

            {/* Right: real project preview with a gentle top-to-bottom reveal on hover */}
            <m.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative mt-4 w-full sm:mt-12 lg:mt-0"
            >
              <div className="mx-auto w-full max-w-[42rem] overflow-hidden rounded-[1.65rem] border border-[#DCE5EE] bg-white p-2 shadow-[0_24px_70px_-30px_rgba(11,27,99,0.35)] sm:p-3">
                <div className="flex items-center gap-2 border-b border-[#EDF1F7] px-2 pb-2 sm:px-3 sm:pb-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F5B7B1]" aria-hidden="true" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F7D58A]" aria-hidden="true" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#A9DCC1]" aria-hidden="true" />
                  <span className="ml-2 truncate text-[10px] font-semibold text-[#8291A3] sm:text-[11px]">Vista previa del proyecto</span>
                  <span className="ml-auto hidden text-[10px] font-semibold text-[#2A6D98] sm:block">Pasa por encima para recorrerla</span>
                </div>
                <div
                  className="project-scroll-frame group relative mt-2 aspect-[16/10] overflow-hidden rounded-[1.1rem] bg-[#F1F8FD] sm:mt-3 sm:rounded-[1.25rem]"
                  tabIndex={0}
                  aria-label={`Recorrer la página de ${project.title}`}
                >
                <img
                  src={project.imgPreview || project.imgReto || project.imgPc1 || project.img}
                  alt={`${project.title}, vista previa del sitio web`}
                  className="project-scroll-image"
                  referrerPolicy="no-referrer"
                  fetchPriority="high"
                  decoding="async"
                  onError={(e) => { (e.target as HTMLImageElement).src = siteConfig.defaultOgImage; }}
                />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#0B1B63]/70 to-transparent px-4 pb-3 pt-12 text-center text-[10px] font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100 sm:text-[11px]">
                    Desliza visualmente la página al mover el cursor
                  </span>
                </div>
              </div>
            </m.div>

          </div>
        </section>

        {/* 2. EL RETO */}
        <section className="relative overflow-hidden bg-white py-14 text-[#0B1B63] sm:py-20 md:py-32">
          {/* Decorative Dot Pattern Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0F172A 2px, transparent 2px)', backgroundSize: '32px 32px' }}></div>

          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="mb-6 inline-block rounded-full bg-[#E6F4FB] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0B1B63]">El reto</div>

              <h2 className="mb-6 font-display text-[1.85rem] font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-[2.15rem] sm:mb-8 lg:text-[2.32rem]">
                Diseño web estratégico para un referente
              </h2>
              <div className="prose prose-lg mb-10 font-medium leading-relaxed text-[#34465D]">
                {renderParagraphs(project.challenge).map((paragraph, i) => (
                  <p key={i} className="mb-4">{paragraph}</p>
                ))}
              </div>
              <p className="max-w-xl text-sm font-medium leading-relaxed text-[#526477] sm:text-base">
                La página se planteó para que esta idea se entienda rápido y el siguiente paso resulte sencillo.
              </p>
            </div>
            <div className="relative order-1 flex justify-center lg:order-2 lg:justify-end">
              <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-[0_20px_50px_rgba(11,27,99,0.12)] lg:translate-x-4">
                <img
                  src={project.imgReto || project.img || siteConfig.defaultOgImage}
                  alt={`${project.title}, vista destacada del proyecto web`}
                  className="h-full w-full object-cover object-top"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { (e.target as HTMLImageElement).src = siteConfig.defaultOgImage; }}
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
                  <m.div
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
                      alt={`${project.title}, vista móvil ${index + 1}`}
                      className="w-full h-full object-cover object-top rounded-[1.2rem] md:rounded-[1.5rem]"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { (e.target as HTMLImageElement).src = siteConfig.defaultOgImage; }}
                    />
                  </m.div>
                ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 4. OBJETIVOS & RESULTADOS */}
        <section className="relative overflow-hidden bg-[#F7F9FC] py-14 text-[#0B1B63] sm:py-20 md:py-32">
          <div className={`relative z-10 max-w-7xl mx-auto px-5 sm:px-6 grid grid-cols-1 ${project.imgObj1 || project.imgObj2 ? 'lg:grid-cols-2' : ''} gap-10 sm:gap-16 items-center`}>
            {(project.imgObj1 || project.imgObj2) && (
              <div className={`grid ${project.imgObj1 && project.imgObj2 ? 'grid-cols-2' : 'grid-cols-1'} gap-4 md:gap-6 relative`}>
                {/* Decorative dots behind images */}
                <div className="absolute -top-8 -left-8 w-32 h-32 opacity-20 pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(#0F172A 2px, transparent 2px)', backgroundSize: '16px 16px' }}></div>

                {project.imgObj1 && (
                  <div className={`relative z-10 rounded-2xl overflow-hidden shadow-xl aspect-[3/4] ${project.imgObj2 ? 'mt-12' : ''} transition-transform duration-500 hover:-translate-y-2`}>
                    <img
                      src={project.imgObj1}
                      alt={`${project.title}, objetivo de la nueva web`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { (e.target as HTMLImageElement).src = siteConfig.defaultOgImage; }}
                    />
                  </div>
                )}
                {project.imgObj2 && (
                  <div className={`relative z-10 rounded-2xl overflow-hidden shadow-xl aspect-[3/4] ${project.imgObj1 ? 'mb-12' : ''} transition-transform duration-500 hover:-translate-y-2`}>
                    <img
                      src={project.imgObj2}
                      alt={`${project.title}, resultados de la nueva web`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { (e.target as HTMLImageElement).src = siteConfig.defaultOgImage; }}
                    />
                  </div>
                )}
              </div>
            )}
            <div className={!(project.imgObj1 || project.imgObj2) ? 'max-w-3xl mx-auto text-center' : ''}>
              <div className={`mb-6 inline-block rounded-full bg-[#E6F4FB] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0B1B63] ${!(project.imgObj1 || project.imgObj2) ? 'mx-auto block' : ''}`}>
                Objetivos y resultados
              </div>

              <h2 className="mb-6 font-display text-[1.85rem] font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-[2.15rem] sm:mb-8 lg:text-[2.32rem]">
                Objetivos de la nueva web
              </h2>
              <ul className={`space-y-4 sm:space-y-5 mb-10 sm:mb-14 ${!(project.imgObj1 || project.imgObj2) ? 'text-left max-w-2xl mx-auto' : ''}`}>
                {project.objectives?.map((obj: string, i: number) => (
                  <li key={i} className="flex items-start gap-4 text-gray-600 text-base sm:text-lg group">
                    <div className="mt-1 flex-shrink-0 rounded-full border border-[#C8DCF5] bg-[#E6F4FB] p-1.5 shadow-sm transition-colors group-hover:bg-[#9ED6F1] group-hover:border-[#9ED6F1]">
                      <Check size={16} className="text-[#0B1B63]" />
                    </div>
                    <span className="leading-relaxed">{obj}</span>
                  </li>
                ))}
              </ul>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: 'Tipo de proyecto', value: project.category.split('/')[0].trim() },
                  { label: 'Experiencia', value: 'Adaptada a móvil' },
                  { label: 'Estado', value: hasPublicLink ? 'Publicado' : 'Caso de estudio' },
                ].map((detail) => (
                  <div key={detail.label} className="rounded-2xl border border-[#DCE5EE] bg-white/75 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#5F7186]">{detail.label}</p>
                    <p className="mt-2 font-display text-base font-extrabold text-[#0B1B63]">{detail.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {strategyBlocks.length > 0 && (
          <section className="relative bg-white py-14 text-[#0B1B63] sm:py-20 md:py-28">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0F172A 2px, transparent 2px)', backgroundSize: '32px 32px' }}></div>
            <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
              <div className="max-w-3xl">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#2A6D98]">Caso de estudio</p>
                <h2 className="font-display text-[1.85rem] font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-[2.15rem] lg:text-[2.32rem]">
                  Estrategia, ejecución y base técnica del proyecto
                </h2>
                <p className="mt-5 max-w-2xl text-sm font-medium leading-relaxed text-[#526477] sm:text-base">
                  No nos quedamos en la parte visual. Cada proyecto se plantea para sostener mejor la conversión, la claridad del mensaje y una publicación limpia a nivel técnico.
                </p>
              </div>

              <div className="mt-10 grid gap-5 lg:grid-cols-3">
                {strategyBlocks.map((block) => (
                  <article key={block.title} className="rounded-2xl border border-[#E4E9F2] bg-white p-6 shadow-[0_8px_24px_-12px_rgba(11,27,99,0.06)] sm:p-7">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2A6D98]">{block.eyebrow}</p>
                    <h3 className="mt-3.5 font-display text-[1.2rem] font-extrabold leading-[1.2] tracking-[-0.02em] text-[#0B1B63]">
                      {block.title}
                    </h3>
                    <div className="mt-4 space-y-4 text-sm font-medium leading-relaxed text-[#34465D] sm:text-[15px]">
                      {renderParagraphs(block.content).map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-5 rounded-[1.75rem] bg-[#0B1B63] p-6 text-white shadow-[0_18px_45px_rgba(15,23,42,0.18)] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-8">
                <div className="max-w-2xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9ED6F1]">¿Quieres algo parecido?</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/78 sm:text-base">
                    Si buscas una web con esta misma mezcla de claridad visual, enfoque comercial y base SEO limpia, podemos preparar una propuesta adaptada a tu negocio.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/contacto"
                    className="inline-flex items-center justify-center gap-2 rounded-[0.9rem] bg-white px-6 py-3 text-sm font-semibold text-[#0B1B63] transition-colors hover:bg-[#D8ECFB]"
                  >
                    Pedir propuesta
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    to="/precios"
                    className="inline-flex items-center justify-center gap-2 rounded-[0.9rem] border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#0B1B63]"
                  >
                    Ver precios
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="bg-[#F8F9FA] px-5 py-0 sm:px-6">
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
        <section className="bg-[#F7F9FC] py-14 sm:py-20 md:py-32">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <h2 className="font-display text-[1.85rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#0B1B63] sm:text-[2.15rem]">
                  Proyectos relacionados
                </h2>
              </div>
              <Link to="/proyectos" className="hidden md:flex items-center gap-2 text-[#2A6D98] font-bold hover:text-brand-dark transition-colors">
                Ver todos <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {relatedProjects.map((rp, i) => (
                <m.div
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
                        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-[#0B1B63]/0 transition-colors duration-500 group-hover:bg-[#0B1B63]/5"></div>
                    </div>
                    <div className="flex justify-between items-start gap-4 px-1">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                          {rp.category}
                        </p>
                        <h3 className="font-display text-xl text-[#0B1B63] transition-colors group-hover:text-[#2A6D98]">
                          {rp.title}
                        </h3>
                      </div>
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-all duration-300 group-hover:rotate-45 group-hover:border-[#9ED6F1] group-hover:bg-[#9ED6F1] group-hover:text-[#0B1B63]">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                  </Link>
                </m.div>
              ))}
            </div>

            <div className="mt-10 text-center md:hidden">
              <Link to="/proyectos" className="inline-flex items-center gap-2 text-[#2A6D98] font-bold hover:text-brand-dark transition-colors">
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

type ProjectDetailExperienceProps = {
  project: Project;
  relatedProjects: Project[];
};

function ProjectDetailExperience({ project, relatedProjects }: ProjectDetailExperienceProps) {
  const mobileImages = [
    project.imgMobile1,
    project.imgMobile2,
    project.imgMobile3,
    project.imgMobile4,
    project.imgMobile5,
  ].filter((img): img is string => Boolean(img && img.trim()));
  const projectDescription =
    project.description || project.clientDescription || project.subtitle || 'Caso de estudio de diseño y desarrollo web.';
  const hasPublicLink = typeof project.link === 'string' && project.link.trim() !== '';
  const heroImage = project.imgPreview || project.imgReto || project.imgPc1 || project.img;
  const challengeImage = project.imgReto || project.imgPc1 || project.img || siteConfig.defaultOgImage;
  const strategyBlocks = [
    { eyebrow: 'Concepto', title: 'Dirección del proyecto', content: project.concept },
    { eyebrow: 'Enfoque', title: 'Cómo planteamos la experiencia', content: project.philosophy },
    { eyebrow: 'Base técnica', title: 'Rendimiento, semántica y publicación', content: project.technicalDetails },
  ].filter((block) => typeof block.content === 'string' && block.content.trim() !== '');
  const relatedGuides = getBlogEntriesBySlugs(blogSummariesSorted, getGuideSlugsForProject(project));
  const projectMeta = [
    { label: 'Tipo', value: project.category.split('/')[0].trim() },
    { label: 'Enfoque', value: 'Claro y adaptable' },
    { label: 'Estado', value: hasPublicLink ? 'Publicado' : 'Caso de estudio' },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F7F7F7] font-sans text-[#0B1B63] selection:bg-[#9ED6F1]/40 selection:text-[#0B1B63]">
      <SeoHead
        title={`${project.title} | Proyecto Web | Icono Studio`}
        description={projectDescription}
        path={`/proyecto/${project.id}`}
        image={project.img || project.imgReto || siteConfig.defaultOgImage}
        schema={buildProjectCaseStudySchema(project)}
      />

      <Navbar />

      <main>
        <section className="relative overflow-hidden bg-[#F7F7F7] px-5 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24">
          <div className="pointer-events-none absolute -right-40 -top-48 h-[38rem] w-[38rem] rounded-full bg-[#D8ECFB]/80 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-52 left-[-8%] h-[28rem] w-[28rem] rounded-full bg-[#EAF5FA] blur-3xl" aria-hidden="true" />

          <div className="relative z-10 mx-auto max-w-7xl">
            <nav aria-label="Breadcrumb" className="mb-10 sm:mb-12">
              <ol className="flex flex-wrap items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#526477] sm:text-[11px]">
                <li><Link to="/" className="transition-colors hover:text-[#0B1B63]">Inicio</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link to="/proyectos" className="transition-colors hover:text-[#0B1B63]">Proyectos</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-[#0B1B63]">{project.title}</li>
              </ol>
            </nav>

            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16 xl:gap-20">
              <m.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[37rem]"
              >
                <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#3E88AE]">
                  Caso de estudio · {project.category}
                </p>
                <h1 className="mt-5 max-w-[36rem] font-display text-[2.55rem] font-extrabold leading-[1.02] tracking-[-0.055em] text-[#0B1B63] sm:text-[3.55rem] lg:text-[4.15rem]">
                  {project.title}
                </h1>
                <p className="mt-5 max-w-[34rem] font-display text-[1.18rem] font-extrabold leading-[1.2] tracking-[-0.025em] text-[#1F3572] sm:text-[1.35rem]">
                  {project.subtitle}
                </p>
                <p className="mt-5 max-w-[34rem] text-[0.98rem] font-medium leading-[1.7] text-[#526477] sm:text-[1.04rem]">
                  {project.clientDescription}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
                  <Link to="/contacto" className="brand-button brand-button--dark inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold">
                    Hablemos de tu proyecto <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                  {hasPublicLink && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => (window as any).dataLayer?.push({
                        event: 'cta_click',
                        cta_id: 'project_external_link',
                        cta_text: `Ver sitio web: ${project.title}`,
                        page_path: window.location.pathname,
                      })}
                      className="brand-button brand-button--outline inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold"
                    >
                      Ver sitio web <ArrowUpRight size={17} aria-hidden="true" />
                    </a>
                  )}
                </div>

                <dl className="mt-10 grid max-w-[35rem] grid-cols-3 border-y border-[#DCE5EE] py-4 sm:mt-12 sm:py-5">
                  {projectMeta.map((item, index) => (
                    <div key={item.label} className={`${index > 0 ? 'border-l border-[#DCE5EE] pl-3 sm:pl-5' : ''} pr-2 sm:pr-5`}>
                      <dt className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-[#6D7C8C] sm:text-[10px]">{item.label}</dt>
                      <dd className="mt-1.5 text-[11px] font-bold leading-[1.3] text-[#0B1B63] sm:text-[13px]">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </m.div>

              <m.div
                initial={{ opacity: 0, x: 22 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="relative rounded-[2rem] border border-[#DCE5EE] bg-white p-2 shadow-[0_26px_70px_-30px_rgba(11,27,99,0.34)] sm:p-3">
                  <div className="flex items-center justify-between gap-3 px-2 pb-2 sm:px-3 sm:pb-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#9ED6F1]" aria-hidden="true" />
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#526477] sm:text-[11px]">Vista del proyecto</span>
                    </div>
                    <span className="hidden text-[10px] font-bold text-[#3E88AE] sm:block">Mueve el cursor para explorar</span>
                  </div>
                  <div className="project-scroll-frame group relative aspect-[16/10] overflow-hidden rounded-[1.45rem] bg-[#D8ECFB]" tabIndex={0} aria-label={`Recorrer la página de ${project.title}`}>
                    <img
                      src={heroImage}
                      alt={`${project.title}, vista previa de la página web`}
                      className="project-scroll-image"
                      referrerPolicy="no-referrer"
                      fetchPriority="high"
                      decoding="async"
                      onError={(event) => { event.currentTarget.src = siteConfig.defaultOgImage; }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1B63]/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus:opacity-100" aria-hidden="true" />
                    <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/35 bg-[#0B1B63]/75 px-3 py-1.5 text-[10px] font-bold text-white opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100 group-focus:opacity-100">
                      Explorar la página
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-center text-[11px] font-semibold text-[#6D7C8C]">Una primera impresión clara, visual y fácil de recorrer.</p>
              </m.div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white px-5 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(to_bottom,#F7F7F7,transparent)]" aria-hidden="true" />
          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-20">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -left-4 -top-4 h-20 w-20 rounded-[1.5rem] bg-[#D8ECFB] sm:-left-7 sm:-top-7 sm:h-28 sm:w-28" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-[#DCE5EE] bg-[#F7F9FC] shadow-[0_22px_55px_-30px_rgba(11,27,99,0.32)] sm:rounded-[2rem]">
                <img
                  src={challengeImage}
                  alt={`${project.title}, imagen destacada del proyecto`}
                  className="aspect-[4/3] h-full w-full object-cover object-top sm:aspect-[5/4]"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  onError={(event) => { event.currentTarget.src = siteConfig.defaultOgImage; }}
                />
              </div>
              <div className="absolute -bottom-4 right-5 rounded-full border border-[#DCE5EE] bg-white px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#3E88AE] shadow-[0_12px_30px_-18px_rgba(11,27,99,0.35)] sm:right-8">
                El punto de partida
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#3E88AE]">El reto</p>
              <h2 className="mt-4 max-w-[38rem] font-display text-[2rem] font-extrabold leading-[1.06] tracking-[-0.045em] text-[#0B1B63] sm:text-[2.75rem]">
                Una web que se entiende a la primera.
              </h2>
              <div className="mt-6 max-w-[38rem] space-y-4 text-[0.98rem] font-medium leading-[1.75] text-[#526477] sm:text-[1.04rem]">
                {renderParagraphs(project.challenge).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <p className="mt-7 max-w-[35rem] border-l-2 border-[#9ED6F1] pl-4 text-[0.94rem] font-bold leading-[1.6] text-[#1F3572]">
                {projectDescription}
              </p>
            </div>
          </div>
        </section>

        {mobileImages.length > 0 && (
          <section className="relative overflow-hidden bg-[#163A70] px-5 py-16 text-white sm:px-6 sm:py-24 lg:px-8 lg:py-28">
            <div className="pointer-events-none absolute -right-36 -top-36 h-[28rem] w-[28rem] rounded-full bg-[#2C6598]/70 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-48 left-[12%] h-[24rem] w-[32rem] rounded-full bg-[#2479A8]/30 blur-3xl" aria-hidden="true" />
            <div className="relative z-10 mx-auto max-w-7xl">
              <div className="max-w-[39rem]">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#9ED6F1]">También en móvil</p>
                <h2 className="mt-4 font-display text-[2rem] font-extrabold leading-[1.06] tracking-[-0.045em] sm:text-[2.75rem]">La experiencia sigue funcionando en cualquier pantalla.</h2>
                <p className="mt-5 max-w-[34rem] text-[0.98rem] font-medium leading-[1.7] text-white/75 sm:text-[1.04rem]">
                  La estructura, las imágenes y las llamadas a la acción se adaptan para que la visita resulte igual de clara desde el móvil.
                </p>
              </div>

              <div className="scrollbar-hide mt-10 overflow-x-auto pb-4">
                <div className="flex min-w-max items-end gap-4 px-1 py-5 sm:justify-center sm:gap-6">
                  {mobileImages.map((img, index) => (
                    <m.div
                      key={img}
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className={`relative w-[11.5rem] shrink-0 overflow-hidden rounded-[1.65rem] border-[7px] border-white/15 bg-[#0B1B63] p-1 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.65)] sm:w-[13.25rem] ${index % 2 === 0 ? 'translate-y-3' : '-translate-y-3'}`}
                    >
                      <div className="overflow-hidden rounded-[1.15rem] bg-white">
                        <img
                          src={img}
                          alt={`${project.title}, vista móvil ${index + 1}`}
                          className="aspect-[9/18.5] h-full w-full object-cover object-top"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                          onError={(event) => { event.currentTarget.src = siteConfig.defaultOgImage; }}
                        />
                      </div>
                    </m.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="relative overflow-hidden bg-[#F7F9FC] px-5 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-20">
            {(project.imgObj1 || project.imgObj2) ? (
              <div className={`grid gap-4 sm:gap-5 ${project.imgObj1 && project.imgObj2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {project.imgObj1 && (
                  <div className={`overflow-hidden rounded-[1.5rem] border border-[#DCE5EE] bg-white shadow-[0_18px_45px_-28px_rgba(11,27,99,0.35)] ${project.imgObj2 ? 'mt-7 sm:mt-10' : ''}`}>
                    <img src={project.imgObj1} alt={`${project.title}, objetivo de la nueva web`} className="aspect-[4/5] h-full w-full object-cover object-top" referrerPolicy="no-referrer" loading="lazy" decoding="async" onError={(event) => { event.currentTarget.src = siteConfig.defaultOgImage; }} />
                  </div>
                )}
                {project.imgObj2 && (
                  <div className={`overflow-hidden rounded-[1.5rem] border border-[#DCE5EE] bg-white shadow-[0_18px_45px_-28px_rgba(11,27,99,0.35)] ${project.imgObj1 ? 'mb-7 sm:mb-10' : ''}`}>
                    <img src={project.imgObj2} alt={`${project.title}, resultado de la nueva web`} className="aspect-[4/5] h-full w-full object-cover object-top" referrerPolicy="no-referrer" loading="lazy" decoding="async" onError={(event) => { event.currentTarget.src = siteConfig.defaultOgImage; }} />
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:block" aria-hidden="true" />
            )}

            <div className={!(project.imgObj1 || project.imgObj2) ? 'mx-auto max-w-3xl lg:col-span-2' : ''}>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#3E88AE]">Lo que tenía que conseguir</p>
              <h2 className="mt-4 font-display text-[2rem] font-extrabold leading-[1.06] tracking-[-0.045em] text-[#0B1B63] sm:text-[2.75rem]">Claridad para que el proyecto trabaje cada día.</h2>
              <ul className="mt-7 space-y-4 sm:mt-9 sm:space-y-5">
                {project.objectives?.map((objective) => (
                  <li key={objective} className="flex items-start gap-3 text-[0.98rem] font-medium leading-[1.55] text-[#526477] sm:text-[1.04rem]">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D8ECFB] text-[#0B1B63]" aria-hidden="true"><Check size={14} strokeWidth={2.5} /></span>
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>

              <dl className="mt-9 grid grid-cols-3 border-y border-[#DCE5EE] py-4 sm:mt-11 sm:py-5">
                {projectMeta.map((item, index) => (
                  <div key={item.label} className={`${index > 0 ? 'border-l border-[#DCE5EE] pl-3 sm:pl-5' : ''} pr-2 sm:pr-5`}>
                    <dt className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#6D7C8C] sm:text-[10px]">{item.label}</dt>
                    <dd className="mt-1.5 text-[11px] font-bold leading-[1.3] text-[#0B1B63] sm:text-[13px]">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {strategyBlocks.length > 0 && (
          <section className="relative overflow-hidden bg-white px-5 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
            <div className="relative z-10 mx-auto max-w-7xl">
              <div className="max-w-[42rem]">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#3E88AE]">Cómo se construyó</p>
                <h2 className="mt-4 font-display text-[2rem] font-extrabold leading-[1.06] tracking-[-0.045em] text-[#0B1B63] sm:text-[2.75rem]">Una base clara para que el proyecto siga funcionando.</h2>
              </div>

              <div className="mt-10 grid border-y border-[#DCE5EE] lg:grid-cols-3 lg:divide-x lg:divide-[#DCE5EE]">
                {strategyBlocks.map((block) => (
                  <article key={block.title} className="py-6 lg:px-8 lg:py-8 first:lg:pl-0 last:lg:pr-0">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#3E88AE]">{block.eyebrow}</p>
                    <h3 className="mt-3 font-display text-[1.2rem] font-extrabold leading-[1.2] tracking-[-0.02em] text-[#0B1B63]">{block.title}</h3>
                    <div className="mt-4 space-y-3 text-[0.92rem] font-medium leading-[1.7] text-[#526477]">
                      {renderParagraphs(block.content).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-6 rounded-[1.75rem] bg-[#0B1B63] p-6 text-white shadow-[0_24px_55px_-28px_rgba(11,27,99,0.5)] sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-[42rem]">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#9ED6F1]">¿Te gustaría algo parecido?</p>
                  <p className="mt-3 text-[0.96rem] font-medium leading-[1.65] text-white/75 sm:text-base">Podemos convertir una idea parecida en una web clara, cuidada y pensada para tu negocio.</p>
                </div>
                <Link to="/contacto" className="brand-button inline-flex shrink-0 items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold">Pedir presupuesto <ArrowRight size={17} aria-hidden="true" /></Link>
              </div>
            </div>
          </section>
        )}

        <section className="bg-[#F7F7F7] px-5 py-0 sm:px-6">
          <div className="mx-auto max-w-7xl pb-14 sm:pb-20 md:pb-24">
            <RelatedGuidesSection
              eyebrow="Si quieres profundizar"
              title="Ideas útiles para construir una web que funcione"
              description="Algunas guías sencillas para entender mejor la estructura, el SEO y las decisiones que hay detrás de un proyecto como este."
              posts={relatedGuides}
              ctaLabel="Ir al blog"
              ctaTo="/blog"
            />
          </div>
        </section>

        <section className="border-t border-[#DCE5EE] bg-[#F7F7F7] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#3E88AE]">Más proyectos</p>
                <h2 className="mt-3 font-display text-[2rem] font-extrabold leading-[1.06] tracking-[-0.045em] text-[#0B1B63] sm:text-[2.75rem]">Otras webs que hablan por sus negocios.</h2>
              </div>
              <Link to="/proyectos" className="hidden items-center gap-2 text-sm font-extrabold text-[#2A6D98] transition-colors hover:text-[#0B1B63] sm:inline-flex">Ver todos <ArrowRight size={17} aria-hidden="true" /></Link>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((relatedProject, index) => (
                <m.div key={relatedProject.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: index * 0.06 }}>
                  <Link
                    to={`/proyecto/${relatedProject.id}`}
                    onClick={() => (window as any).dataLayer?.push({ event: 'project_click', project_id: relatedProject.id, project_title: relatedProject.title, page_path: window.location.pathname })}
                    className="group block"
                  >
                    <div className="relative overflow-hidden rounded-[1.35rem] border border-[#DCE5EE] bg-white p-1 shadow-[0_18px_42px_-28px_rgba(11,27,99,0.32)] transition-transform duration-500 group-hover:-translate-y-1.5">
                      <div className="aspect-[4/3] overflow-hidden rounded-[1.05rem] bg-[#D8ECFB]">
                        <img src={relatedProject.img} alt={`${relatedProject.title}, proyecto web`} className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.035]" loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={(event) => { event.currentTarget.src = siteConfig.defaultOgImage; }} />
                      </div>
                    </div>
                    <div className="mt-4 flex items-start justify-between gap-4 px-1">
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#3E88AE]">{relatedProject.category}</p>
                        <h3 className="mt-1 font-display text-[1.15rem] font-extrabold tracking-[-0.02em] text-[#0B1B63] transition-colors group-hover:text-[#2A6D98]">{relatedProject.title}</h3>
                      </div>
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C6DDE9] text-[#2A6D98] transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#9ED6F1] group-hover:text-[#0B1B63]" aria-hidden="true"><ArrowUpRight size={17} /></span>
                    </div>
                  </Link>
                </m.div>
              ))}
            </div>

            <div className="mt-9 text-center sm:hidden">
              <Link to="/proyectos" className="inline-flex items-center gap-2 text-sm font-extrabold text-[#2A6D98]">Ver todos <ArrowRight size={17} aria-hidden="true" /></Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
