import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import { type ProjectSummary, projectSummaries } from '../data/projectSummaries';
import { absoluteUrl, siteConfig } from '../lib/site';
import { loadMergedProjects } from '../lib/publicProjects';
import { isPrerenderUserAgent, scheduleIdleTask } from '../lib/runtime';
import { buildBreadcrumbSchema, buildOrganizationSchema } from '../lib/structuredData';

const projectFilters = [
  { id: 'all', label: 'Todos' },
  { id: 'visibility', label: 'Visibilidad' },
  { id: 'online', label: 'Negocio online' },
  { id: 'custom', label: 'Soluciones personalizadas' },
  { id: 'brand', label: 'Marca y servicios' },
] as const;

type ProjectFilterId = (typeof projectFilters)[number]['id'];

const projectFilterMap: Record<string, ProjectFilterId[]> = {
  'inktime-tattoo': ['visibility', 'brand'],
  'somnis-d-angels': ['visibility', 'brand'],
  'autocustomgt': ['online', 'custom'],
  'lorenzo-secades-fotografia': ['brand'],
  'instalaciones-torrijos-fontaneria': ['visibility', 'brand'],
  'libreria-garcia-lorca': ['visibility', 'brand', 'custom'],
  'gameshelf-app': ['online', 'custom'],
  'flesh-fest-videojuego-indie': ['online', 'custom', 'visibility'],
  'cuidados-paliativos-hospital-cuautitlan': ['visibility', 'brand'],
  'dogcat': ['visibility', 'brand'],
};

const getProjectSegments = (project: ProjectSummary): ProjectFilterId[] => {
  const mapped = projectFilterMap[project.id.toString()];
  if (mapped) {
    return mapped;
  }

  const haystack = `${project.title} ${project.subtitle} ${project.category}`.toLowerCase();
  const segments = new Set<ProjectFilterId>();

  if (haystack.includes('seo') || haystack.includes('local') || haystack.includes('social') || haystack.includes('healthcare')) {
    segments.add('visibility');
  }

  if (haystack.includes('app') || haystack.includes('product') || haystack.includes('experience') || haystack.includes('digital')) {
    segments.add('online');
    segments.add('custom');
  }

  if (haystack.includes('business') || haystack.includes('corporativa') || haystack.includes('web')) {
    segments.add('brand');
  }

  if (segments.size === 0) {
    segments.add('brand');
  }

  return Array.from(segments);
};

export default function Projects() {
  const [projects, setProjects] = useState<ProjectSummary[]>(projectSummaries);
  const [activeFilter, setActiveFilter] = useState<ProjectFilterId>('all');

  useEffect(() => {
    window.scrollTo(0, 0);

    if (isPrerenderUserAgent()) {
      return;
    }

    return scheduleIdleTask(async () => {
      const mergedProjects = await loadMergedProjects();
      setProjects(mergedProjects);
    }, { delay: 2500, timeout: 2000 });
  }, []);

  const projectsDescription =
    'Casos de estudio y proyectos web de Icono Studio: diseño, desarrollo y experiencias digitales pensadas para transmitir confianza y convertir mejor.';

  const filteredProjects = (activeFilter === 'all'
    ? [...projects]
    : projects.filter((project) => getProjectSegments(project).includes(activeFilter))
  ).sort((a, b) => {
    const aTitle = a.title.toLowerCase();
    const bTitle = b.title.toLowerCase();
    const aIsDogcat = aTitle.includes('dogcat');
    const bIsDogcat = bTitle.includes('dogcat');
    const aIsGameshelf = aTitle.includes('gameshelf');
    const bIsGameshelf = bTitle.includes('gameshelf');

    if (aIsDogcat && !bIsDogcat) return -1;
    if (!aIsDogcat && bIsDogcat) return 1;
    if (aIsGameshelf && !bIsGameshelf) return 1;
    if (!aIsGameshelf && bIsGameshelf) return -1;
    return 0;
  });

  const shouldCenterLastCard = filteredProjects.length > 1 && filteredProjects.length % 2 === 1;

  const projectsSchema = {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationSchema(),
      buildBreadcrumbSchema([
        { name: 'Inicio', path: '/' },
        { name: 'Proyectos' },
      ]),
      {
        "@type": "CollectionPage",
        "@id": absoluteUrl('/proyectos#page'),
        "name": `Proyectos | ${siteConfig.name}`,
        "url": absoluteUrl('/proyectos'),
        "description": projectsDescription,
      },
      {
        "@type": "ItemList",
        "itemListElement": projects.map((project, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "url": `${siteConfig.url}/proyecto/${project.id}`,
          "name": project.title,
          "image": absoluteUrl(project.img || project.imgReto || siteConfig.defaultOgImage),
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] selection:bg-[#9ED6F1]/40 selection:text-[#0B1B63] overflow-x-hidden">
      <SeoHead
        title="Proyectos Web y Casos de Estudio | Icono Studio"
        description={projectsDescription}
        path="/proyectos"
        schema={projectsSchema}
      />

      <Navbar initialTheme="light" />
      <main>

      <section className="relative overflow-hidden bg-[#F7F7F7] px-5 pb-12 pt-28 sm:px-6 sm:pb-14 sm:pt-32 lg:px-8 lg:pb-16">
        <div className="pointer-events-none absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#D8ECFB] blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-44 left-[-6%] h-[24rem] w-[24rem] rounded-full bg-[#EAF5FA] blur-3xl" aria-hidden />

        <div className="relative mx-auto max-w-3xl text-center">
          <div className="inline-block rounded-full bg-[#E6F4FB] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0B1B63]">
            Portfolio web
          </div>
          <m.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-[2.1rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#0B1B63] sm:text-[2.6rem] lg:text-[3rem]"
          >
            Proyectos <span style={{ color: '#3E88AE' }}>reales</span>
          </m.h1>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 relative z-20 -mt-4">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">


          <div className="flex flex-nowrap overflow-x-auto gap-2.5 sm:gap-3 w-[calc(100%+2rem)] -mx-4 px-4 sm:w-[calc(100%+3rem)] sm:-mx-6 sm:px-6 lg:w-full lg:mx-0 lg:px-0 py-2 min-w-0 lg:justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mb-12 md:mb-16">
            {projectFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-xs font-bold transition-colors duration-300 sm:px-5 sm:py-2.5 sm:text-sm ${
                  activeFilter === filter.id
                    ? 'border-[#0B1B63] bg-[#0B1B63] text-white shadow-sm'
                    : 'border-[#DCE5EE] bg-white text-[#526477] hover:border-[#9ED6F1] hover:text-[#0B1B63]'
                }`}
              >
                {filter.label}
              </button>
            ))}
            <div className="w-4 shrink-0 lg:hidden"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {filteredProjects.map((project, index) => (
              <m.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className={shouldCenterLastCard && index === filteredProjects.length - 1 ? 'sm:col-span-2 sm:max-w-[24rem] sm:mx-auto lg:col-span-1 lg:max-w-none lg:mx-0' : ''}
              >
                <Link
                  to={`/proyecto/${project.id}`}
                  onClick={() => (window as any).dataLayer?.push({
                    'event': 'project_click',
                    'project_id': project.id,
                    'project_title': project.title,
                    'page_path': window.location.pathname
                  })}
                  className="group cursor-pointer flex flex-col"
                >
                      <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl bg-[#EAF5FA] shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_20px_42px_-20px_rgba(11,27,99,0.28)] sm:mb-6 lg:mb-8 lg:rounded-3xl">
                        <img
                      src={project.img}
                        alt={project.title}
                      className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { (e.target as HTMLImageElement).src = siteConfig.defaultOgImage; }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                  </div>

                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-[#0B1B63] mb-1 transition-colors duration-300">
                        {project.title}
                      </h2>
                      <p className="text-[9px] font-black text-[#2A6D98] uppercase tracking-widest mb-1.5">
                        {project.category}
                      </p>
                    </div>
                    <div className="w-8 h-8 shrink-0 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-brand-dark group-hover:text-white group-hover:border-brand-dark transition-all duration-300 transform group-hover:rotate-45">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      </main>
    </div>
  );
}
