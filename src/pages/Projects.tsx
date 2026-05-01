import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import { portfolioProjects, Project } from '../data/projects';
import { absoluteUrl, siteConfig } from '../lib/site';
import { mergeAndDedupeProjects } from '../lib/projectUtils';

const projectFilters = [
  { id: 'all', label: 'Todos' },
  { id: 'visibility', label: 'Visibilidad' },
  { id: 'online', label: 'Negocio online' },
  { id: 'custom', label: 'Soluciones personalizadas' },
  { id: 'brand', label: 'Marca y servicios' },
] as const;

type ProjectFilterId = (typeof projectFilters)[number]['id'];

const projectFilterMap: Record<string, ProjectFilterId[]> = {
  'instalaciones-torrijos-fontaneria': ['visibility', 'brand'],
  'libreria-garcia-lorca': ['visibility', 'brand', 'custom'],
  'gameshelf-app': ['online', 'custom'],
  'flesh-fest-videojuego-indie': ['online', 'custom', 'visibility'],
  'cuidados-paliativos-hospital-cuautitlan': ['visibility', 'brand'],
  'dogcat': ['visibility', 'brand'],
};

const getProjectSegments = (project: Project): ProjectFilterId[] => {
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
  const [projects, setProjects] = useState<Project[]>(portfolioProjects);
  const [activeFilter, setActiveFilter] = useState<ProjectFilterId>('all');

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProjects = async () => {
      try {
        const projectsSnapshot = await getDocs(collection(db, 'projects'));
        if (projectsSnapshot.empty) {
          return;
        }

        const fetchedProjects = projectsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Project));
        setProjects(mergeAndDedupeProjects(portfolioProjects, fetchedProjects));
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const projectsDescription =
    'Casos de estudio y proyectos web de Icono Studio: diseño, desarrollo y experiencias digitales pensadas para transmitir confianza y convertir mejor.';

  const filteredProjects = (activeFilter === 'all'
    ? projects
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
      {
        "@type": "CollectionPage",
        "name": `Proyectos | ${siteConfig.name}`,
        "url": `${siteConfig.url}/proyectos`,
        "description": projectsDescription,
      },
      {
        "@type": "ItemList",
        "itemListElement": projects.map((project, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "url": `${siteConfig.url}/proyecto/${project.id}`,
          "name": project.title,
          "image": absoluteUrl(project.imgReto || project.img || siteConfig.defaultOgImage),
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] selection:bg-brand-lime selection:text-brand-dark overflow-x-hidden">
      <SeoHead
        title="Proyectos Web y Casos de Estudio | Icono Studio"
        description={projectsDescription}
        path="/proyectos"
        schema={projectsSchema}
      />

      <Navbar initialTheme="dark" />

      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-12 md:pb-14 overflow-hidden bg-brand-dark text-white">
        <div className="absolute inset-0 opacity-[0.12] bg-blueprint"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[320px] h-[320px] bg-brand-lime/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block ui-eyebrow text-brand-lime mb-5">Portfolio web</span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter leading-[0.95]"
          >
            Proyectos <span className="text-brand-lime italic font-normal">reales</span>
          </motion.h1>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 relative z-20 -mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


          <div className="flex flex-nowrap overflow-x-auto gap-2.5 sm:gap-3 w-[calc(100%+2rem)] -mx-4 px-4 sm:w-[calc(100%+3rem)] sm:-mx-6 sm:px-6 lg:w-full lg:mx-0 lg:px-0 py-2 min-w-0 lg:justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mb-12 md:mb-16">
            {projectFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm sm:text-base font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-brand-dark text-white shadow-md'
                    : 'bg-gray-200/60 text-gray-600 hover:bg-gray-200 hover:text-brand-dark'
                }`}
              >
                {filter.label}
              </button>
            ))}
            <div className="w-4 shrink-0 lg:hidden"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {filteredProjects.map((project, index) => (
              <motion.div
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
                  <div className="overflow-hidden rounded-2xl lg:rounded-3xl aspect-[4/5] mb-5 sm:mb-6 lg:mb-8 bg-gray-100 relative shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                    <img
                      src={project.imgReto || project.img}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-all duration-[5s] ease-in-out group-hover:object-bottom"
                      referrerPolicy="no-referrer"
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${project.id}/1200/800`; }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                  </div>

                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-brand-dark mb-1 group-hover:text-brand-dark transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-[9px] font-black text-brand-blue uppercase tracking-widest mb-1.5">
                        {project.category}
                      </p>
                    </div>
                    <div className="w-8 h-8 shrink-0 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-brand-dark group-hover:text-white group-hover:border-brand-dark transition-all duration-300 transform group-hover:rotate-45">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
