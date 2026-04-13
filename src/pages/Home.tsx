import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, Menu, X, Star, TrendingUp, Users, Zap, MonitorSmartphone, ShoppingCart, Search, ChevronDown, ChevronUp, Mail, Download, Code, Layers, Cpu, Clock, Rocket, ShieldCheck, LayoutTemplate, FileText, Video, Layout, Calendar, LineChart } from 'lucide-react';
import { portfolioProjects, Project } from '../data/projects';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const faqs = [
  { q: "¿El precio incluye el hosting y dominio?", a: "No, el hosting y dominio son servicios de terceros. Sin embargo, te asesoramos y ayudamos a contratarlos con los mejores proveedores del mercado para asegurar el máximo rendimiento." },
  { q: "¿Cuánto tardáis en hacer una web?", a: "Depende de la complejidad del proyecto. Una Landing Page suele estar lista en 1-2 semanas, mientras que una web corporativa o e-commerce puede llevar entre 4 y 8 semanas." },
  { q: "¿Podré modificar la web yo mismo?", a: "¡Por supuesto! Desarrollamos nuestras webs con paneles de control autogestionables (como WordPress o Shopify) y te damos una formación básica para que puedas cambiar textos, imágenes o productos sin depender de nosotros." },
  { q: "¿Hacéis mantenimiento web?", a: "Sí, ofrecemos planes de mantenimiento mensual para asegurar que tu web esté siempre actualizada, segura y funcionando al 100% de su capacidad." }
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
    iconBg: "bg-blue-50",
    hoverBorder: "group-hover:border-blue-200",
    gradient: "from-blue-500/5"
  },
  { 
    step: "02", 
    title: "Reunión", 
    subtitle: "Videollamada o Presencial",
    desc: "Nos cuentas tu proyecto en detalle. Nos conocemos y empezamos a dar forma a tu idea, ya sea desde cero o mejorando tu web actual.",
    features: ["Toma de requisitos", "Definición de objetivos", "Alineación de ideas"],
    icon: Video,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-50",
    hoverBorder: "group-hover:border-purple-200",
    gradient: "from-purple-500/5"
  },
  { 
    step: "03", 
    title: "Diseño", 
    subtitle: "Estructura y UX/UI",
    desc: "Te proponemos diseños orientados a conversión y estructuramos la web a nivel interno para que Google te posicione mejor.",
    features: ["Prototipos visuales", "Arquitectura web", "Diseño SEO-Friendly"],
    icon: Layout,
    iconColor: "text-pink-500",
    iconBg: "bg-pink-50",
    hoverBorder: "group-hover:border-pink-200",
    gradient: "from-pink-500/5"
  },
  { 
    step: "04", 
    title: "Desarrollo", 
    subtitle: "Tiempos y Programación",
    desc: "Con el diseño validado, organizamos un calendario de entregas por semanas para programar tu web y cumplir plazos sin sorpresas.",
    features: ["Código optimizado", "Calendario cerrado", "Entregas puntuales"],
    icon: Calendar,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
    hoverBorder: "group-hover:border-emerald-200",
    gradient: "from-emerald-500/5"
  },
  { 
    step: "05", 
    title: "SEO On-Page", 
    subtitle: "Buscadores y Analítica",
    desc: "Le decimos a Google que existes. Enviamos tu web a Search Console, instalamos Analytics y optimizamos tus páginas internas.",
    features: ["Google Search Console", "Google Analytics", "Optimización de metas"],
    icon: LineChart,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
    hoverBorder: "group-hover:border-orange-200",
    gradient: "from-orange-500/5"
  },
  { 
    step: "06", 
    title: "Entrega", 
    subtitle: "Lanzamiento y Soporte",
    desc: "Instalamos las páginas legales y publicamos. Te damos formación para que la controles tú mismo y ofrecemos mantenimiento opcional.",
    features: ["Textos legales", "Formación de uso", "Mantenimiento mensual"],
    icon: ShieldCheck,
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-50",
    hoverBorder: "group-hover:border-indigo-200",
    gradient: "from-indigo-500/5"
  }
];

const techStack = [
  { name: "React", slug: "react" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "WordPress", slug: "wordpress" },
  { name: "Astro", slug: "astro" },
  { name: "Figma", slug: "figma" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Vercel", slug: "vercel" },
  { name: "Webflow", slug: "webflow" }
];
const platformLogos = [
  { name: "Google", slug: "google" },
  { name: "Meta", slug: "meta" },
  { name: "Stripe", slug: "stripe" },
  { name: "Shopify", slug: "shopify" },
  { name: "WhatsApp", slug: "whatsapp" },
  { name: "Mailchimp", slug: "mailchimp" },
  { name: "AWS", isCustom: true },
  { name: "Zapier", slug: "zapier" }
];

const reviews = [
  { name: "TALLER LORIGUILLA S.L.", date: "Hace 3 semanas", text: "Muy amables y rápidos!!!", source: "Google", rating: 5 },
  { name: "Cristian", date: "Hace 3 semanas", text: "Excelente servicio, rapidez y profesionalidad. Inmejorable precio.", source: "Google", rating: 5 },
  { name: "Yolanda Aldeguer", date: "Hace un año", text: "Han sido muy educados y amables, en cuanto a la página web han cuidado mucho el detalle y han sido fieles a lo que hemos pedido, estamos muy contentos con el resultado.", source: "Google", rating: 5 },
  { name: "Ruth Sauri Carrasco", date: "Hace un año", text: "Rápido, comunicación fácil y resultado espectacular.", source: "Google", rating: 5 },
  { name: "Gerrit winkler vazquez", date: "Hace un año", text: "Estoy muy contenta con el equipo, ¡son unos grandes profesionales! Necesitaba una página web a modo de portfolio para mis trabajos y proyectos como fotógrafa y me puse en contacto con ellos. Sin duda volvería a repetir y además no tardaron mucho en hacerlo. Recomendado 100%.", source: "Google", rating: 5 },
  { name: "Akunaee", date: "Hace un año", text: "Me hicieron una web para mi proyecto personal y quedó genial, rápidos y profesionales. ¡Recomendados!", source: "Google", rating: 5 },
  { name: "Allegra Traver", date: "Hace un año", text: "Son unos profesionales de cabeza a pies. Para mi empresa necesitaba una web con altas expectativas y las cumplieron todas de forma eficaz.", source: "Google", rating: 5 },
  { name: "Carlos Martínez", date: "Hace 2 meses", text: "Un trato excepcional. Captaron la idea de mi negocio desde el primer momento y la plasmaron en una web moderna y muy rápida.", source: "Google", rating: 5 },
  { name: "Laura Gómez", date: "Hace 4 meses", text: "Trabajar con el estudio ha sido un acierto. Cumplieron con los plazos y el diseño superó mis expectativas.", source: "Google", rating: 5 },
  { name: "David Ruiz", date: "Hace 5 meses", text: "Grandes profesionales. Resolvieron todas mis dudas y me asesoraron sobre la mejor estrategia para mi tienda online.", source: "Google", rating: 5 },
  { name: "Marta López", date: "Hace 6 meses", text: "La web ha quedado preciosa y muy intuitiva. Mis clientes me felicitan constantemente por el nuevo diseño.", source: "Google", rating: 5 },
  { name: "Javier Fernández", date: "Hace 7 meses", text: "Servicio impecable. Muy atentos a los detalles y siempre dispuestos a hacer cambios hasta que quedó perfecta.", source: "Google", rating: 5 },
  { name: "Elena Navarro", date: "Hace 8 meses", text: "Son unos cracks. Me ayudaron a modernizar la imagen de mi empresa con una web súper profesional y adaptada a móviles.", source: "Google", rating: 5 },
  { name: "Pablo Sánchez", date: "Hace 9 meses", text: "Totalmente recomendables. Precio competitivo y un resultado de muchísima calidad. ¡Gracias!", source: "Google", rating: 5 },
  { name: "Ana Morales", date: "Hace 10 meses", text: "Buscaba a un equipo de confianza para rehacer mi web y lo encontré. Comunicación fluida y trabajo de 10.", source: "Google", rating: 5 },
  { name: "Sergio Romero", date: "Hace 11 meses", text: "Muy perfeccionistas. Se nota que les apasiona su trabajo. La web carga rapidísimo y el diseño es espectacular.", source: "Google", rating: 5 },
  { name: "Lucía Torres", date: "Hace 11 meses", text: "Me hicieron el portfolio perfecto. Minimalista, elegante y justo lo que necesitaba para mostrar mis proyectos.", source: "Google", rating: 5 },
  { name: "Raúl Gil", date: "Hace 1 año", text: "Atención al cliente inmejorable. El equipo te acompaña en todo el proceso y te explica todo de forma sencilla.", source: "Google", rating: 5 },
  { name: "Carmen Vargas", date: "Hace 1 año", text: "La mejor inversión para mi negocio. Desde que lanzamos la nueva web, he notado un aumento en los contactos.", source: "Google", rating: 5 },
  { name: "Diego Castro", date: "Hace 1 año", text: "Rápidos, eficientes y con mucho gusto para el diseño. Sin duda volveré a contar con ellos para futuros proyectos.", source: "Google", rating: 5 }
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Todo');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  const [projects, setProjects] = useState<any[]>(portfolioProjects);
  const [siteSettings, setSiteSettings] = useState<any>({});

  useEffect(() => {
    const fetchFirebaseData = async () => {
      try {
        const projectsSnapshot = await getDocs(collection(db, 'projects'));
        if (!projectsSnapshot.empty) {
          const fetchedProjects = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
          
          // Merge local and Firebase projects, avoiding duplicates by ID
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

        const settingsDoc = await getDoc(doc(db, 'settings', 'site'));
        if (settingsDoc.exists()) {
          setSiteSettings(settingsDoc.data());
        }
      } catch (error) {
        console.error("Error fetching data from Firebase:", error);
      }
    };
    fetchFirebaseData();
  }, []);

  const projectCategories = ['Todo', 'E-commerce', 'Web Corporativa', 'SEO & CRO', 'Desarrollo a medida', 'Marketing Digital'];
  const filteredProjects = activeFilter === 'Todo' ? projects : projects.filter(p => p.category === activeFilter);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Proyectos', href: '/#proyectos' },
    { name: 'Servicios', href: '/#servicios' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Blog', href: '/#blog' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-brand-dark selection:bg-brand-lime selection:text-brand-dark overflow-x-hidden">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center rounded-full px-6 py-3 transition-all duration-300 ${isScrolled ? 'bg-brand-dark/90 backdrop-blur-md shadow-lg text-white' : 'bg-transparent text-white'}`}>
            
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 z-50">
              <img src="/icono-studio-logo.png" alt="Icono Studio Logo" className="h-8 sm:h-10 w-auto object-contain" />
            </a>
            
            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="hover:text-brand-lime transition-colors">
                  {link.name}
                </a>
              ))}
            </div>
            
            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4 z-50">
              <a href="#pricing" className={`hidden md:flex px-6 py-2.5 rounded-full font-bold text-sm items-center gap-2 transition-transform hover:scale-105 ${isScrolled ? 'bg-brand-lime text-brand-dark' : 'bg-white text-brand-blue'}`}>
                Presupuesto <ArrowRight size={16} />
              </a>
              <button 
                className="lg:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} className={isScrolled ? 'text-white' : 'text-white'} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-0 left-0 right-0 h-screen bg-brand-dark text-white pt-32 px-6 flex flex-col gap-6 lg:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-4xl uppercase hover:text-brand-lime transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </nav>

      {/* 1. HERO SECTION */}
      <section id="inicio" className="relative pt-28 pb-10 sm:pt-32 sm:pb-12 md:pt-32 md:pb-16 lg:pt-36 lg:pb-16 xl:pt-40 xl:pb-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center overflow-hidden bg-brand-blue text-white z-20 rounded-b-[2.5rem] sm:rounded-b-[3rem] md:rounded-b-[4rem] shadow-2xl">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-20 bg-blueprint"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center w-full max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white font-bold text-xs sm:text-sm uppercase tracking-wider mb-6 md:mb-8 border border-white/20 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-pulse"></span>
            Agencia Creativa Digital en Valencia
          </motion.div>
          
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[6rem] leading-[0.9] md:leading-[0.85] tracking-tighter uppercase mb-6"
          >
            Hacemos webs <br/>
            <span className="text-brand-lime italic">que venden</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="text-lg md:text-xl max-w-2xl text-white/80 font-medium mb-8"
          >
            Elevamos marcas a través de diseño estratégico y desarrollo de alto rendimiento.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a href="#pricing" className="bg-brand-lime text-brand-dark px-6 py-3 sm:px-8 sm:py-3.5 rounded-full font-bold text-base hover:scale-105 transition-transform flex items-center justify-center gap-2 w-full sm:w-auto">
              Pedir presupuesto <ArrowRight size={20} />
            </a>
            <a href="#proyectos" className="bg-transparent border-2 border-white/30 text-white px-6 py-3 sm:px-8 sm:py-3.5 rounded-full font-bold text-base hover:bg-white hover:text-brand-dark transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
              Ver proyectos
            </a>
          </motion.div>
        </div>
      </section>

      {/* 1.5 INTEGRATIONS / OPTIMIZED FOR */}
      <section className="pt-16 pb-10 bg-zinc-50 overflow-hidden z-10 relative -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tecnologías y plataformas con las que trabajamos</p>
        </div>
        
        <div className="relative flex flex-col gap-6 overflow-hidden">
          <style>{`
            @keyframes scroll-left {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes scroll-right {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
            .animate-scroll-left { animation: scroll-left 80s linear infinite; }
            .animate-scroll-right { animation: scroll-right 80s linear infinite; }
            .pause-on-hover:hover { animation-play-state: paused; }
          `}</style>
          
          {/* Row 1: Platforms (Scroll Left) */}
          <div className="flex w-max animate-scroll-left">
            {[1, 2].map((group) => (
              <div key={`platforms-${group}`} className="flex gap-12 sm:gap-20 px-6 sm:px-10 items-center">
                {platformLogos.map((logo, i) => (
                  <div key={`logo-${i}`} className="flex items-center gap-2 sm:gap-3 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-default">
                    {logo.isCustom ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 333334 199332" className="h-8 sm:h-10 w-auto fill-[#a1a1aa]">
                        <path d="M93937 72393c0 4102 443 7428 1219 9867 887 2439 1996 5100 3548 7982 554 887 776 1774 776 2550 0 1109-665 2217-2106 3326l-6985 4656c-998 665-1995 998-2882 998-1109 0-2217-554-3326-1552-1552-1663-2882-3437-3991-5211-1109-1885-2217-3991-3437-6541-8648 10200-19512 15299-32594 15299-9312 0-16740-2661-22172-7982-5432-5322-8204-12417-8204-21286 0-9424 3326-17073 10089-22838s15743-8647 27161-8647c3769 0 7650 332 11752 887 4102 554 8315 1441 12749 2439v-8093c0-8426-1774-14301-5211-17738-3548-3437-9534-5100-18071-5100-3880 0-7871 443-11973 1441s-8093 2217-11973 3769c-1774 776-3104 1219-3880 1441s-1330 332-1774 332c-1552 0-2328-1109-2328-3437v-5432c0-1774 222-3104 776-3880s1552-1552 3104-2328c3880-1996 8537-3659 13969-4989C43606 885 49370 220 55468 220c13193 0 22838 2993 29046 8980 6098 5987 9202 15077 9202 27272v35920h222zM48926 89244c3659 0 7428-665 11419-1995s7539-3769 10532-7095c1774-2106 3104-4435 3770-7095 665-2661 1108-5876 1108-9645v-4656c-3215-776-6652-1441-10199-1885-3548-443-6984-665-10421-665-7428 0-12860 1441-16519 4435-3659 2993-5432 7206-5432 12749 0 5211 1330 9091 4102 11751 2661 2772 6541 4102 11641 4102zm89023 11973c-1996 0-3326-332-4213-1109-887-665-1663-2217-2328-4324l-26053-85697c-665-2217-998-3658-998-4434 0-1774 887-2772 2661-2772h10865c2106 0 3548 333 4324 1109 887 665 1552 2217 2217 4324l18625 73391 17295-73391c554-2217 1219-3659 2106-4324s2439-1109 4435-1109h8869c2106 0 3548 333 4435 1109 887 665 1663 2217 2106 4324l17516 74278 19180-74278c665-2217 1441-3659 2217-4324 887-665 2328-1109 4324-1109h10310c1774 0 2772 887 2772 2772 0 554-111 1109-222 1774s-333 1552-776 2772l-26718 85697c-665 2217-1441 3658-2328 4324-887 665-2328 1109-4213 1109h-9534c-2107 0-3548-333-4435-1109s-1663-2217-2106-4435l-17184-71507-17073 71396c-554 2217-1220 3658-2107 4434s-2439 1109-4434 1109h-9534zm142459 2993c-5765 0-11530-665-17073-1995s-9867-2772-12749-4435c-1774-998-2993-2106-3437-3104-443-998-665-2106-665-3104v-5654c0-2328 887-3437 2550-3437 665 0 1330 111 1995 333s1663 665 2772 1109c3769 1663 7871 2993 12195 3880 4435 887 8758 1330 13193 1330 6984 0 12417-1220 16186-3659s5765-5987 5765-10532c0-3104-998-5654-2993-7760-1996-2107-5765-3991-11197-5765l-16075-4989c-8093-2550-14080-6319-17738-11308-3658-4878-5543-10310-5543-16075 0-4656 998-8758 2993-12306s4656-6652 7982-9091c3326-2550 7095-4434 11530-5765S279190-2 284068-2c2439 0 4989 111 7428 443 2550 333 4878 776 7206 1219 2217 554 4324 1109 6319 1774s3548 1330 4656 1996c1552 887 2661 1774 3326 2771 665 887 998 2107 998 3659v5211c0 2328-887 3548-2550 3548-887 0-2328-444-4213-1331-6319-2882-13415-4324-21286-4324-6319 0-11308 998-14745 3104s-5211 5321-5211 9867c0 3104 1109 5765 3326 7871s6319 4213 12195 6097l15743 4989c7982 2550 13747 6098 17184 10643s5100 9756 5100 15521c0 4767-998 9091-2882 12860-1996 3770-4656 7095-8093 9756-3437 2771-7539 4767-12306 6208-4989 1552-10199 2328-15854 2328z" />
                        <path d="M301362 158091c-36474 26940-89467 41241-135031 41241-63858 0-121395-23614-164854-62859-3437-3104-332-7317 3770-4878 47006 27272 104988 43791 164964 43791 40465 0 84921-8426 125830-25721 6097-2772 11308 3991 5321 8426z" />
                        <path d="M316550 140796c-4656-5987-30820-2883-42682-1441-3548 443-4102-2661-887-4989 20842-14634 55099-10421 59090-5543 3991 4989-1109 39246-20620 55653-2993 2550-5876 1220-4545-2106 4435-10976 14301-35698 9645-41574z" />
                      </svg>
                    ) : (
                      <>
                        <img 
                          src={`https://cdn.simpleicons.org/${logo.slug}/a1a1aa`} 
                          alt={`${logo.name} icon`} 
                          className="h-7 sm:h-8 w-auto object-contain"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-xl sm:text-2xl font-bold text-zinc-400 tracking-tight">{logo.name}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Row 2: Tech Stack (Scroll Right) */}
          <div className="flex w-max animate-scroll-right">
            {[1, 2].map((group) => (
              <div key={`tech-${group}`} className="flex gap-12 sm:gap-20 px-6 sm:px-10 items-center">
                {techStack.map((tech, i) => (
                  <div key={`tech-logo-${i}`} className="flex items-center gap-2 sm:gap-3 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-default">
                    <img 
                      src={`https://cdn.simpleicons.org/${tech.slug}/a1a1aa`} 
                      alt={`${tech.name} icon`} 
                      className="h-7 sm:h-8 w-auto object-contain"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-xl sm:text-2xl font-bold text-zinc-400 tracking-tight">{tech.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Gradients */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-zinc-50 to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-zinc-50 to-transparent pointer-events-none"></div>
        </div>
      </section>

      {/* 2. SERVICIOS PRINCIPALES (SEO) */}
      <section id="servicios" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12 mb-12 md:mb-16">
          <div className="md:w-3/5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue font-bold text-xs sm:text-sm uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse"></span>
              Nuestros Servicios
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-6xl uppercase tracking-tight leading-[1.1]">
              Diseño premium <br className="hidden lg:block" />
              <span className="text-brand-blue">optimizado para SEO</span>
            </h2>
          </div>
          <div className="md:w-2/5 md:pb-2">
            <p className="text-gray-600 text-base lg:text-lg leading-relaxed border-l-2 border-brand-blue/20 pl-6">
              No hacemos webs de plantilla. Creamos activos digitales a medida diseñados para dominar Google y convertir visitas en clientes reales.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Card 1 */}
          <div className="group bg-white rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl border border-gray-100 hover:border-brand-blue/30 transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-dark leading-tight flex-1 min-w-0 break-words">
                Diseño Web Valencia
              </h3>
              <img 
                src="/lapiz.svg" 
                alt="Diseño Web Valencia" 
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300 shrink-0"
              />
            </div>
            <p className="text-gray-600 mb-6 flex-grow leading-relaxed text-sm sm:text-base">
              Diseñamos tu página web paso a paso, a medida y centrada en crear una experiencia de usuario (UX/UI) única que represente tu marca.
            </p>
            <a href="/#servicios" className="inline-flex items-center gap-2 font-bold text-brand-blue hover:text-brand-dark transition-colors mt-auto text-sm tracking-wide uppercase">
              Ver servicio <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Card 2 */}
          <div className="group bg-white rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl border border-gray-100 hover:border-brand-lime/50 transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-dark leading-tight flex-1 min-w-0 break-words">
                Tienda Online
              </h3>
              <img 
                src="/Teclado.svg" 
                alt="Tienda Online" 
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300 shrink-0"
              />
            </div>
            <p className="text-gray-600 mb-6 flex-grow leading-relaxed text-sm sm:text-base">
              Desarrollamos e-commerce escalables. Gestiona tu tienda online fácilmente: catálogo, envíos y pagos.
            </p>
            <a href="/#servicios" className="inline-flex items-center gap-2 font-bold text-brand-blue hover:text-brand-dark transition-colors mt-auto text-sm tracking-wide uppercase">
              Ver servicio <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Card 3 */}
          <div className="group bg-white rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl border border-gray-100 hover:border-gray-300 transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-dark leading-tight flex-1 min-w-0 break-words">
                Posicionamiento SEO
              </h3>
              <img 
                src="/seo.svg" 
                alt="Posicionamiento SEO" 
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300 shrink-0"
              />
            </div>
            <p className="text-gray-600 mb-6 flex-grow leading-relaxed text-sm sm:text-base">
              Utilizamos las técnicas SEO más avanzadas para mejorar la visibilidad de tu web en Google y superar a tu competencia.
            </p>
            <a href="/#servicios" className="inline-flex items-center gap-2 font-bold text-brand-blue hover:text-brand-dark transition-colors mt-auto text-sm tracking-wide uppercase">
              Ver servicio <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
        </div>
      </section>

      {/* 3. PROYECTOS */}
      <section id="proyectos" className="py-16 md:py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Filtros */}
          <div className="flex flex-col border-b border-gray-200 pb-6 sm:pb-8 mb-12 md:mb-16 gap-6 sm:gap-8">
            <div className="max-w-2xl shrink-0">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue font-bold text-xs sm:text-sm uppercase tracking-wider mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse"></span>
                Selected Works
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-brand-dark leading-none">
                Proyectos Destacados
              </h2>
            </div>
          
          {/* Filtros */}
          <div className="flex flex-nowrap overflow-x-auto gap-2 sm:gap-3 w-[calc(100%+2rem)] -mx-4 px-4 sm:w-[calc(100%+3rem)] sm:-mx-6 sm:px-6 lg:w-[calc(100%+4rem)] lg:-mx-8 lg:px-8 py-2 min-w-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {projectCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`shrink-0 whitespace-nowrap text-sm sm:text-base font-medium transition-all duration-300 px-5 py-2.5 rounded-full ${
                  activeFilter === cat 
                    ? 'bg-brand-dark text-white shadow-md' 
                    : 'bg-gray-200/60 text-gray-600 hover:bg-gray-200 hover:text-brand-dark'
                }`}
              >
                {cat}
              </button>
            ))}
            {/* Spacer invisible para asegurar que el último botón no se corte al hacer scroll */}
            <div className="w-4 shrink-0"></div>
          </div>
        </div>

        {/* Grid de Proyectos */}
        <div className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            <AnimatePresence mode="wait">
              {filteredProjects.slice(0, 6).map((project) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <RouterLink to={`/proyecto/${project.id}`} className="group cursor-pointer flex flex-col">
                    <div className="overflow-hidden rounded-2xl lg:rounded-3xl aspect-[3/4] mb-5 sm:mb-6 lg:mb-8 bg-gray-100 relative shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                      <img 
                        src={project.imgReto || project.img} 
                        alt={project.title} 
                        className="w-full h-full object-cover object-top transition-all duration-[5s] ease-in-out group-hover:object-bottom" 
                        referrerPolicy="no-referrer"
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${project.id}/1200/800`; }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                    </div>
                    
                    <div className="flex justify-between items-start gap-3 sm:gap-4">
                      <div>
                        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-brand-dark mb-1 lg:mb-2 group-hover:text-brand-blue transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-medium text-gray-400 mb-1 lg:mb-2 uppercase tracking-wider text-[10px] lg:text-xs">
                          {project.category}
                        </p>
                        <p className="text-sm lg:text-base text-gray-600 line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 shrink-0 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-brand-dark group-hover:text-white group-hover:border-brand-dark transition-all duration-300 transform group-hover:rotate-45">
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                      </div>
                    </div>
                  </RouterLink>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        </div>
      </section>

      {/* 4. PROCESO DE TRABAJO */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
            <div className="md:w-3/5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue font-bold text-xs sm:text-sm uppercase tracking-wider mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse"></span>
                Metodología
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-brand-dark leading-none">
                Cómo trabajamos <br className="hidden md:block" />
                <span className="text-brand-blue">tu proyecto</span>
              </h2>
            </div>
            <div className="md:w-2/5 md:pl-8 md:border-l border-gray-200">
              <p className="text-gray-600 text-lg leading-relaxed">
                No creemos en las plantillas genéricas ni en la improvisación. Aplicamos un proceso estructurado en 6 fases para garantizar que tu web no solo sea visualmente impactante, sino que esté optimizada para convertir y posicionar en Google.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {workProcess.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className={`bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-200 ${item.hoverBorder} hover:shadow-xl transition-all duration-300 group relative overflow-hidden`}>
                  {/* Subtle unified gradient on hover */}
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${item.gradient} to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -mr-20 -mt-20`}></div>
                  
                  {/* Watermark Number */}
                  <span className="absolute -bottom-4 -right-4 text-9xl font-display font-bold text-zinc-50 opacity-50 transition-colors duration-500 select-none pointer-events-none">
                    {item.step}
                  </span>

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform duration-300 ${item.iconColor}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Fase {item.step}</p>
                          <h3 className="font-display text-2xl sm:text-3xl uppercase text-brand-dark">{item.title}</h3>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h4 className="font-bold text-gray-900 mb-2">{item.subtitle}</h4>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>

                    <div className="space-y-3">
                      {item.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full ${item.iconBg} border border-white flex items-center justify-center flex-shrink-0`}>
                            <Check className={`w-3 h-3 ${item.iconColor}`} />
                          </div>
                          <span className="text-sm font-medium text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. OPINIONES */}
      <section id="opiniones" className="py-16 md:py-20 bg-zinc-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
            <div className="md:w-2/3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue font-bold text-xs sm:text-sm uppercase tracking-wider mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse"></span>
                Testimonios
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase text-brand-dark tracking-tight leading-none">
                Lo que dicen <br className="hidden sm:block" />
                <span className="text-gray-400">nuestros clientes</span>
              </h2>
            </div>
            <div className="md:w-1/3 flex md:justify-end pb-2">
              <div className="flex items-center gap-5 bg-white px-6 py-4 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-display text-brand-dark leading-none">5.0</span>
                </div>
                <div className="w-px h-12 bg-gray-200"></div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Valoración media</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col gap-4 sm:gap-6">
          {/* Fila única: Hacia la izquierda */}
          <div className="flex w-max animate-scroll-left pause-on-hover">
            {[1, 2].map((group) => (
              <div key={group} className="flex gap-4 sm:gap-6 px-2 sm:px-3">
                {reviews.map((review, idx) => (
                  <div key={idx} className="w-[280px] sm:w-[320px] bg-white p-5 rounded-2xl border border-gray-100 shadow-sm shrink-0 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold text-sm shrink-0">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-brand-dark text-sm leading-none">{review.name}</h4>
                          <p className="text-[11px] text-gray-400 mt-1">{review.date}</p>
                        </div>
                      </div>
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </div>
                    <div className="flex text-yellow-400 mb-2">
                      {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      "{review.text}"
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          
          {/* Gradientes laterales para suavizar la entrada/salida */}
          <div className="absolute inset-y-0 left-0 w-12 sm:w-32 bg-gradient-to-r from-zinc-50 to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-12 sm:w-32 bg-gradient-to-l from-zinc-50 to-transparent pointer-events-none"></div>
        </div>
      </section>

      {/* 7. PRICING */}
      <section id="pricing" className="py-16 md:py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-brand-dark rounded-[2.5rem] md:rounded-[3.5rem] p-8 sm:p-10 md:p-12 text-white relative overflow-hidden shadow-2xl">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-lime/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
          
          <div className="relative z-10 mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight mb-4 leading-[1.1] text-balance">
                Precios <span className="text-brand-lime">claros</span>, sin sorpresas.
              </h2>
            </div>
            <div className="md:w-1/3 md:pb-2">
              <p className="text-base sm:text-lg text-white/70 font-light border-l-2 border-brand-lime/30 pl-6">
                Tarifas transparentes para proyectos de alto rendimiento. Selecciona el plan que mejor se adapte a la fase de tu negocio.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 relative z-10">
            {/* Tier 1 */}
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col group backdrop-blur-sm">
              <h3 className="font-display text-xl uppercase mb-2 text-white">Landing Page</h3>
              <p className="text-white/50 text-xs mb-6 min-h-[40px] leading-relaxed">Ideal para validar ideas, campañas publicitarias o captar leads rápidamente.</p>
              <div className="mb-6">
                <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-1 font-bold">Desde</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-display tracking-tight">300</span>
                  <span className="text-xl text-white/50">€</span>
                </div>
              </div>
              <div className="w-full h-px bg-white/10 mb-6"></div>
              <ul className="space-y-3 mb-8 flex-grow">
                {['Página única optimizada', 'Copywriting persuasivo', 'Diseño responsive', 'Formulario de captación'].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-white/80">
                    <Check size={16} className="text-white/30 shrink-0 mt-0.5" /> <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-full border border-white/20 font-bold text-white hover:bg-white hover:text-brand-dark transition-all duration-300 uppercase tracking-wide text-xs group-hover:border-white/40">
                Solicitar
              </button>
            </div>

            {/* Tier 2 */}
            <div className="bg-gradient-to-b from-white/10 to-white/5 border border-brand-lime/40 rounded-[2rem] p-6 transform xl:-translate-y-2 shadow-[0_0_40px_rgba(204,255,0,0.1)] flex flex-col relative backdrop-blur-sm hover:border-brand-lime/60 transition-all duration-300">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-lime text-brand-dark text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full shadow-lg whitespace-nowrap">
                Más Popular
              </div>
              <h3 className="font-display text-xl uppercase mb-2 text-white">Corporativa</h3>
              <p className="text-white/60 text-xs mb-6 min-h-[40px] leading-relaxed">Para empresas que buscan autoridad, credibilidad y presencia digital sólida.</p>
              <div className="mb-6">
                <span className="text-[10px] text-brand-lime/80 uppercase tracking-widest block mb-1 font-bold">Desde</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-display tracking-tight">800</span>
                  <span className="text-xl text-white/50">€</span>
                </div>
              </div>
              <div className="w-full h-px bg-white/10 mb-6"></div>
              <ul className="space-y-3 mb-8 flex-grow">
                {['Hasta 5 páginas internas', 'Diseño UX/UI a medida', 'Optimización SEO On-page', 'Panel autogestionable', 'Integración de analítica'].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-white/90">
                    <Check size={16} className="text-brand-lime shrink-0 mt-0.5" /> <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-full bg-brand-lime text-brand-dark font-bold hover:bg-white transition-all duration-300 uppercase tracking-wide text-xs shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                Solicitar
              </button>
            </div>

            {/* Tier 3 */}
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col group backdrop-blur-sm">
              <h3 className="font-display text-xl uppercase mb-2 text-white">E-commerce</h3>
              <p className="text-white/50 text-xs mb-6 min-h-[40px] leading-relaxed">Tiendas online de alto rendimiento diseñadas para maximizar las ventas.</p>
              <div className="mb-6">
                <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-1 font-bold">Desde</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-display tracking-tight">1.300</span>
                  <span className="text-xl text-white/50">€</span>
                </div>
              </div>
              <div className="w-full h-px bg-white/10 mb-6"></div>
              <ul className="space-y-3 mb-8 flex-grow">
                {['Catálogo de productos', 'Pasarelas de pago seguras', 'Gestión de stock y envíos', 'Emails transaccionales', 'Optimización de checkout'].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-white/80">
                    <Check size={16} className="text-white/30 shrink-0 mt-0.5" /> <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-full border border-white/20 font-bold text-white hover:bg-white hover:text-brand-dark transition-all duration-300 uppercase tracking-wide text-xs group-hover:border-white/40">
                Solicitar
              </button>
            </div>

            {/* Tier 4 */}
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col group backdrop-blur-sm">
              <h3 className="font-display text-xl uppercase mb-2 text-white">A medida</h3>
              <p className="text-white/50 text-xs mb-6 min-h-[40px] leading-relaxed">Aplicaciones web complejas, portales personalizados e integraciones.</p>
              <div className="mb-6">
                <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-1 font-bold">Desde</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-display tracking-tight">2.000</span>
                  <span className="text-xl text-white/50">€</span>
                </div>
              </div>
              <div className="w-full h-px bg-white/10 mb-6"></div>
              <ul className="space-y-3 mb-8 flex-grow">
                {['Arquitectura escalable', 'Integración de APIs externas', 'Bases de datos complejas', 'Panel de control custom', 'Soporte técnico prioritario'].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-white/80">
                    <Check size={16} className="text-white/30 shrink-0 mt-0.5" /> <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-full border border-white/20 font-bold text-white hover:bg-white hover:text-brand-dark transition-all duration-300 uppercase tracking-wide text-xs group-hover:border-white/40">
                Solicitar
              </button>
            </div>

          </div>
          
          <div className="mt-10 text-center relative z-10 border-t border-white/10 pt-6">
             <p className="text-white/40 text-[10px] sm:text-xs font-mono uppercase tracking-widest">* Todos los precios son sin IVA. El coste final dependerá de los requisitos exactos del proyecto.</p>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-16 md:py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue font-bold text-xs sm:text-sm uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse"></span>
              Dudas Resueltas
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-brand-dark leading-none mb-6">
              Preguntas <span className="text-brand-blue">Frecuentes</span>
            </h2>
            <p className="text-lg text-gray-600">Resolvemos tus dudas antes de empezar.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${activeFaq === i ? 'border-brand-blue shadow-md' : 'border-gray-200'}`}
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-bold text-lg text-brand-dark pr-4">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${activeFaq === i ? 'bg-brand-blue text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {activeFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

      {/* 10. LEAD MAGNET */}
      <section className="py-16 md:py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-brand-lime rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="md:w-1/2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-dark/10 text-brand-dark font-bold text-xs sm:text-sm uppercase tracking-wider mb-6">
              <Download size={14} />
              Recurso Gratuito
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-brand-dark leading-none mb-4">
              10 errores que arruinan tu conversión
            </h2>
            <p className="text-brand-dark/80 text-lg mb-0">
              Descarga nuestra checklist gratuita y descubre por qué tu web actual no está consiguiendo clientes.
            </p>
          </div>
          
          <div className="md:w-1/2 w-full relative z-10">
            <form className="flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-2xl sm:rounded-full shadow-xl">
              <div className="flex-grow flex items-center pl-4">
                <Mail className="text-gray-400 mr-3 shrink-0" size={20} />
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  className="w-full py-3 outline-none text-brand-dark bg-transparent"
                  required
                />
              </div>
              <button type="submit" className="bg-brand-dark text-white px-8 py-4 rounded-xl sm:rounded-full font-bold hover:bg-black transition-colors whitespace-nowrap">
                Descargar PDF
              </button>
            </form>
            <p className="text-xs text-brand-dark/60 mt-4 text-center sm:text-left pl-4">
              * 100% libre de spam. Date de baja cuando quieras.
            </p>
          </div>
        </div>
      </section>

      {/* 11. BLOG */}
      <section id="blog" className="py-16 md:py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12 md:mb-16 border-b-2 border-brand-dark pb-6 sm:pb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue font-bold text-xs sm:text-sm uppercase tracking-wider mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse"></span>
                Novedades
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-brand-dark leading-none">Blog</h2>
            </div>
          <a href="#" className="flex items-center gap-2 font-bold text-lg sm:text-xl hover:text-brand-blue transition-colors">
            Ver todos <ArrowRight size={20} className="sm:w-6 sm:h-6" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Tendencias de Diseño Web para 2026', tag: 'Diseño', date: '12 Mar 2026', img: 'https://picsum.photos/seed/blog1/800/800' },
            { title: 'Por qué tu web necesita ser más rápida', tag: 'Desarrollo', date: '05 Mar 2026', img: 'https://picsum.photos/seed/blog2/800/800' },
            { title: 'Guía básica de SEO para empresas locales', tag: 'Marketing', date: '28 Feb 2026', img: 'https://picsum.photos/seed/blog3/800/800' }
          ].map((post, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="overflow-hidden rounded-[2rem] mb-4 sm:mb-6 relative">
                <img src={post.img} alt={post.title} className="w-full aspect-square object-cover transform group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute top-4 left-4 bg-white text-brand-dark text-xs font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full uppercase tracking-wider">
                  {post.tag}
                </div>
              </div>
              <div className="flex items-center gap-4 mb-2 sm:mb-3">
                <span className="text-xs sm:text-sm text-gray-500 font-mono">{post.date}</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl uppercase leading-tight group-hover:text-brand-blue transition-colors">{post.title}</h3>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* 8. FOOTER / BIG CTA */}
      <footer className="bg-brand-dark text-white pt-16 sm:pt-20 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8 rounded-t-[2.5rem] sm:rounded-t-[3rem] md:rounded-t-[4rem] mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
            <h2 className="font-display text-[18vw] sm:text-[16vw] md:text-[14vw] leading-[0.8] uppercase tracking-tighter mb-8 sm:mb-12 text-brand-lime">
              ¿Hablamos?
            </h2>
            <a href="mailto:hola@iconostudio.com" className="inline-flex items-center justify-center gap-3 sm:gap-4 bg-white text-brand-dark px-8 sm:px-12 py-4 sm:py-6 rounded-full font-display text-xl sm:text-2xl uppercase hover:bg-brand-lime transition-colors w-full sm:w-auto">
              Pedir Presupuesto <ArrowUpRight size={24} className="sm:w-7 sm:h-7" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 border-t border-white/20 pt-10 sm:pt-12">
            <div className="sm:col-span-2">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <img src="/2026-02-18 (1).png" alt="Icono Studio Logo" className="h-10 sm:h-12 w-auto object-contain" />
              </div>
              <p className="text-white/60 max-w-sm text-base sm:text-lg">
                Agencia de diseño y desarrollo web en Valencia. Creando experiencias digitales que marcan la diferencia.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold uppercase tracking-wider mb-4 sm:mb-6 text-brand-lime">Navegación</h4>
              <ul className="space-y-3 sm:space-y-4 text-white/70 font-medium text-sm sm:text-base">
                {navLinks.map(link => (
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
