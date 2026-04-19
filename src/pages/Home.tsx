import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  ArrowRight, ArrowUpRight, Check, Star, FileText, 
  ChevronRight 
} from 'lucide-react';
import { portfolioProjects, Project } from '../data/projects';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { blogPosts } from '../data/blog';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const reviews = [
  { name: "Carlos M.", text: "Icono Studio superó mis expectativas. El diseño es brutal y la atención impecable.", date: "hace 2 meses", rating: 5 },
  { name: "Lucía G.", text: "Profesionales, rápidos y con una visión estratégica que no había encontrado en otras agencias.", date: "hace 1 mes", rating: 5 },
  { name: "Javier R.", text: "Nuestra web ahora carga en menos de un segundo. Brutal el cambio.", date: "hace 3 semanas", rating: 5 },
  { name: "Elena P.", text: "Gran equipo, entendieron mi marca a la perfección.", date: "hace 2 meses", rating: 5 },
  { name: "Marcos T.", text: "La mejor inversión para mi negocio este año sin duda alguna.", date: "hace 1 mes", rating: 4 },
];

const workProcess = [
  { 
    step: "01", 
    title: "Presupuesto", 
    subtitle: "Solicitud y Análisis",
    desc: "Todo comienza con tu solicitud. Analizamos tu proyecto a fondo y te preparamos una propuesta a medida si podemos ayudarte.",
    features: ["Estudio de viabilidad", "Propuesta personalizada", "Transparencia total"],
    icon: FileText,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50"
  },
  { 
    step: "02", 
    title: "Diseño", 
    subtitle: "UX / UI Design",
    desc: "Damos vida a la idea con estructuras claras y un diseño visual de impacto que respire los valores de tu marca.",
    features: ["Prototipado", "Diseño visual único", "Enfoque en conversión"],
    icon: Star,
    iconColor: "text-brand-lime",
    iconBg: "bg-brand-lime/10"
  },
  { 
    step: "03", 
    title: "Lanzamiento", 
    subtitle: "Go-Live & soporte",
    desc: "Desarrollamos, probamos y lanzamos. Y después, nos aseguramos de que todo siga funcionando como un reloj suizo.",
    features: ["Optimización SEO", "Formación", "Soporte incluido"],
    icon: ArrowRight,
    iconColor: "text-brand-blue",
    iconBg: "bg-brand-blue/10"
  }
];

export default function Home() {
  const [projects, setProjects] = useState<Project[]>(portfolioProjects as Project[]);
  const [activeFilter, setActiveFilter] = useState('Todo');
  const projectCategories = ['Todo', 'E-commerce', 'Web Corporativa', 'SEO & CRO', 'Desarrollo a medida', 'Marketing Digital'];

  useEffect(() => {
    const fetchFirebaseData = async () => {
      try {
        const projectsSnapshot = await getDocs(collection(db, 'projects'));
        if (!projectsSnapshot.empty) {
          const fetchedProjects = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
          
          // Merge local and Firebase projects
          const combined = [...portfolioProjects] as Project[];
          fetchedProjects.forEach(fp => {
            const index = combined.findIndex(p => p.id.toString() === fp.id.toString());
            if (index !== -1) {
              combined[index] = { ...combined[index], ...fp };
            } else {
              combined.push(fp);
            }
          });
          setProjects(combined);
        }
      } catch (error) {
        console.error("Error fetching data from Firebase:", error);
      }
    };
    fetchFirebaseData();
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = activeFilter === 'Todo' ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-brand-dark selection:bg-brand-lime selection:text-brand-dark overflow-x-hidden">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section id="inicio" className="relative pt-28 pb-10 sm:pt-32 sm:pb-12 md:pt-32 md:pb-16 lg:pt-36 lg:pb-16 xl:pt-40 xl:pb-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center overflow-hidden bg-brand-blue text-white z-20 rounded-b-[2.5rem] sm:rounded-b-[3rem] md:rounded-b-[4rem] shadow-2xl">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:40px_40px]"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center w-full max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white font-black text-[10px] uppercase tracking-widest mb-6 md:mb-8 border border-white/20 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-pulse"></span>
            Agencia Creativa Digital en Valencia
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl uppercase leading-[0.9] tracking-tighter mb-8 md:mb-12"
          >
            Hacemos webs <br />
            <span className="text-white/40 italic">que venden</span>
          </motion.h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 max-w-2xl mb-10 md:mb-14 leading-relaxed px-4">
            No diseñamos solo para que se vea bien. Diseñamos para que tu negocio crezca, transmita confianza y convierta visitas en clientes de verdad.
          </p>

          <div className="flex flex-col xs:flex-row items-center gap-4 sm:gap-6 w-full xs:w-auto px-4">
            <RouterLink to="/contacto" className="w-full xs:w-auto bg-brand-lime text-brand-dark px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs sm:text-sm hover:bg-white transition-all transform hover:scale-105 shadow-xl shadow-brand-lime/10">
              Empezar mi proyecto
            </RouterLink>
            <RouterLink to="/#proyectos" className="w-full xs:w-auto bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs sm:text-sm hover:bg-white/20 transition-all">
              Ver trabajos
            </RouterLink>
          </div>
        </div>
      </section>

      {/* 2. PROYECTOS */}
      <section id="proyectos" className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
            <div className="max-w-2xl">
              <p className="text-brand-blue font-black uppercase tracking-widest text-[10px] mb-4">Portafolio</p>
              <h2 className="font-display text-5xl sm:text-6xl md:text-7xl uppercase leading-none tracking-tighter">Proyectos que <br /><span className="text-gray-300">marcan la diferencia</span></h2>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {projectCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === cat ? 'bg-brand-dark text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <AnimatePresence mode="wait">
              {filteredProjects.slice(0, 6).map((project) => (
                <motion.div 
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group"
                >
                  <RouterLink to={`/proyecto/${project.id}`} className="block">
                    <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-100 mb-8 relative shadow-2xl shadow-gray-100">
                      <img src={project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue mb-2 block">{project.category}</span>
                        <h3 className="font-display text-3xl uppercase tracking-tight group-hover:text-brand-blue transition-colors">{project.title}</h3>
                      </div>
                      <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-brand-dark group-hover:text-white transition-all transform group-hover:rotate-45">
                        <ArrowUpRight size={24} />
                      </div>
                    </div>
                  </RouterLink>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 3. PROCESO (workProcess) */}
      <section className="py-24 sm:py-32 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {workProcess.map((item, idx) => (
                <div key={idx} className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl transition-shadow">
                  <div className={`w-16 h-16 rounded-2xl ${item.iconBg} flex items-center justify-center mb-8`}>
                    <item.icon className={item.iconColor} size={32} />
                  </div>
                  <span className="text-4xl font-display text-gray-200 block mb-4">{item.step}</span>
                  <h3 className="font-display text-3xl uppercase tracking-tighter mb-4">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed mb-8">{item.desc}</p>
                  <ul className="space-y-3">
                    {item.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-brand-dark/60">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-lime" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 4. BLOG PREVIEW */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-20">
            <div>
              <p className="text-brand-blue font-black uppercase tracking-widest text-[10px] mb-4">Pensamientos</p>
              <h2 className="font-display text-5xl sm:text-6xl md:text-7xl uppercase leading-none tracking-tighter">Nuestro <br /><span className="text-gray-300">Blog</span></h2>
            </div>
            <RouterLink to="/blog" className="font-black uppercase tracking-widest text-xs hover:text-brand-blue transition-colors flex items-center gap-2">Explorar todo <ArrowRight size={14} /></RouterLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {blogPosts.slice(0, 3).map((post, idx) => (
              <RouterLink to={`/blog/${post.slug}`} key={idx} className="group">
                <div className="aspect-square rounded-[2.5rem] overflow-hidden mb-8 relative">
                   <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                   <div className="absolute top-6 left-6 bg-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">{post.tag}</div>
                </div>
                <h3 className="font-display text-3xl uppercase tracking-tighter group-hover:text-brand-blue transition-colors leading-tight">{post.title}</h3>
              </RouterLink>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
