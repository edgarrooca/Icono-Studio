import React, { Suspense, lazy, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, Menu, X, Star, TrendingUp, Users, Zap, MonitorSmartphone, ShoppingCart, Search, ChevronDown, ChevronUp, Download, Code, Layers, Cpu, Clock, Rocket, ShieldCheck, LayoutTemplate, FileText, Video, Layout, Calendar, LineChart, Send, Heart } from 'lucide-react';
import { blogSummariesSorted } from '../data/blogSummaries';
import { projectSummaries, type ProjectSummary } from '../data/projectSummaries';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import { debugLeadFormButtonClick, debugLeadFormInvalid, debugLeadFormSubmitCapture, redirectToLeadThankYouPage, submitLeadForm } from '../lib/analytics';
import { absoluteUrl, siteConfig } from '../lib/site';
import { buildOrganizationSchema, buildProviderReference, parseStructuredDate } from '../lib/structuredData';
import MobileStickyCTA from '../components/MobileStickyCTA';
import { loadMergedProjects } from '../lib/publicProjects';
import { isPrerenderUserAgent, scheduleIdleTask } from '../lib/runtime';
import { getBlogEntriesBySlugs } from '../lib/blogUtils';

const BudgetCalculator = lazy(() => import('../components/BudgetCalculator'));

// Gradient Blob Component for Hero
const GradientBlob = ({ color, className, delay = 0 }: { color: string, className: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ 
      opacity: [0.4, 0.8, 0.4],
      scale: [1, 1.4, 1],
      x: [0, 100, 0],
      y: [0, 60, 0],
    }}
    transition={{ 
      duration: 12, 
      repeat: Infinity, 
      ease: "easeInOut",
      delay 
    }}
    className={`absolute rounded-full blur-[100px] pointer-events-none ${color} ${className}`}
  />
);

const faqs = [
  { q: "¿El precio incluye el hosting y dominio?", a: "No. El dominio no está incluido, aunque podemos recomendarte la mejor opción y ayudarte a dejarlo configurado. El hosting tampoco va incluido en el precio base de la web, pero si quieres podemos gestionarlo nosotros como un servicio aparte." },
  { q: "¿Cuánto tardáis en hacer una web?", a: "Depende de la complejidad del proyecto. Una Landing Page suele estar lista en 1-2 semanas, mientras que una web corporativa o e-commerce puede llevar entre 4 y 8 semanas." },
  { q: "¿Podré modificar la web yo mismo?", a: "¡Por supuesto! Desarrollamos nuestras webs con paneles de control autogestionables (como WordPress o Shopify) y te damos una formación básica para que puedas cambiar textos, imágenes o productos sin depender de nosotros." },
  { q: "¿Hacéis mantenimiento web?", a: "Sí, ofrecemos planes de mantenimiento mensual para asegurar que tu web esté siempre actualizada, segura y funcionando al 100% de su capacidad." }
];

const heroAssurances = [
  "Te explicamos todo con palabras normales",
  "Presupuesto claro antes de empezar",
  "Tu web pensada para transmitir confianza",
];

const friendlyHighlights = [
  {
    title: "Te guiamos desde cero",
    description: "Si no tienes claro qué tipo de web necesita tu negocio, te ayudamos a decidirlo sin tecnicismos ni prisas.",
    icon: Heart,
    iconClassName: "bg-[#fff0e6] text-[#b46b39]",
  },
  {
    title: "Todo se entiende",
    description: "Te proponemos una estructura simple, textos claros y un diseño que tus clientes puedan recorrer sin perderse.",
    icon: Check,
    iconClassName: "bg-[#eef3ff] text-brand-blue",
  },
  {
    title: "Acompañamiento real",
    description: "No te dejamos solo al publicar. Resolvemos dudas, hacemos ajustes y te enseñamos lo importante para que la web sea útil de verdad.",
    icon: ShieldCheck,
    iconClassName: "bg-[#eef7ef] text-[#497353]",
  },
];

const workProcess = [
  { 
    step: "01", 
    title: "Primera toma de contacto", 
    subtitle: "Qué necesitas y cómo podemos ayudarte",
    desc: "Nos cuentas tu situación, lo que te preocupa y el tipo de cliente al que quieres llegar. A partir de ahí te orientamos con honestidad.",
    features: ["Escuchamos tu idea", "Aterrizamos prioridades", "Te decimos por dónde empezar"],
    icon: FileText,
    iconColor: "text-brand-blue",
    iconBg: "bg-[#eef3ff]",
    hoverBorder: "group-hover:border-[#cfdaf6]",
    gradient: "from-brand-blue/8"
  },
  { 
    step: "02", 
    title: "Reunión de enfoque", 
    subtitle: "Sin palabras raras y con objetivos claros",
    desc: "Ordenamos la información importante para que la web explique bien lo que haces y haga más fácil que te contacten.",
    features: ["Objetivos realistas", "Mensaje principal claro", "Decisiones compartidas"],
    icon: Video,
    iconColor: "text-[#7a5eb2]",
    iconBg: "bg-[#f3eefb]",
    hoverBorder: "group-hover:border-[#ddd0f0]",
    gradient: "from-[#7a5eb2]/7"
  },
  { 
    step: "03", 
    title: "Diseño de la experiencia", 
    subtitle: "Orden, claridad y buena presencia",
    desc: "Diseñamos una web agradable, fácil de recorrer y alineada con la personalidad de tu negocio para que cause una buena impresión.",
    features: ["Jerarquía visual clara", "Diseño a medida", "Estructura pensada para vender mejor"],
    icon: Layout,
    iconColor: "text-[#bf6f8d]",
    iconBg: "bg-[#fff0f5]",
    hoverBorder: "group-hover:border-[#efd0dc]",
    gradient: "from-[#bf6f8d]/7"
  },
  { 
    step: "04", 
    title: "Construcción de la web", 
    subtitle: "Con orden y sin sorpresas",
    desc: "Montamos la web respetando el diseño, cuidando la velocidad y manteniéndote al tanto de lo importante en cada fase.",
    features: ["Calendario claro", "Web rápida y cuidada", "Seguimiento cercano"],
    icon: Calendar,
    iconColor: "text-[#47745b]",
    iconBg: "bg-[#edf7ef]",
    hoverBorder: "group-hover:border-[#cfe6d4]",
    gradient: "from-[#47745b]/7"
  },
  { 
    step: "05", 
    title: "Visibilidad inicial", 
    subtitle: "Para que tu web empiece bien",
    desc: "Dejamos la base preparada para que Google entienda tu web y para que tú puedas medir si está generando contactos.",
    features: ["SEO básico bien planteado", "Analítica configurada", "Páginas preparadas para captar"],
    icon: LineChart,
    iconColor: "text-[#b67533]",
    iconBg: "bg-[#fff3e8]",
    hoverBorder: "group-hover:border-[#f0d9bf]",
    gradient: "from-[#b67533]/7"
  },
  { 
    step: "06", 
    title: "Entrega y acompañamiento", 
    subtitle: "Publicamos y te enseñamos a usarla",
    desc: "Lanzamos la web, dejamos lo importante configurado y te explicamos cómo manejarla para que no dependas de nadie para lo básico.",
    features: ["Publicación cuidada", "Pequeña formación", "Soporte opcional después"],
    icon: ShieldCheck,
    iconColor: "text-[#5d6db2]",
    iconBg: "bg-[#eef0fb]",
    hoverBorder: "group-hover:border-[#d6dcf6]",
    gradient: "from-[#5d6db2]/7"
  }
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

const supportTeaserItems = [
  {
    title: "Hosting",
    description: "Alojamiento, SSL y configuración inicial.",
    icon: Rocket,
    iconClassName: "bg-brand-blue/10 text-brand-blue",
  },
  {
    title: "Cuidado mensual",
    description: "Revisiones, actualizaciones y seguimiento.",
    icon: ShieldCheck,
    iconClassName: "bg-slate-100 text-slate-700",
  },
  {
    title: "Soporte cercano",
    description: "Dudas, pequeños ajustes y ayuda cuando la necesites.",
    icon: Check,
    iconClassName: "bg-brand-lime/35 text-brand-dark",
  },
];

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  
  const [projects, setProjects] = useState<ProjectSummary[]>(projectSummaries);
  const [activeStep, setActiveStep] = useState(0);
  const metodologiaRef = useRef<HTMLDivElement>(null);

  const handleMetodologiaScroll = () => {
    if (metodologiaRef.current) {
      const scrollPosition = metodologiaRef.current.scrollLeft;
      const cardWidth = metodologiaRef.current.offsetWidth * 0.85;
      const index = Math.round(scrollPosition / cardWidth);
      setActiveStep(index);
    }
  };

  const [formData, setFormData] = useState({
    nombre: '',
    whatsapp: '',
    email: '',
    negocio: '',
    necesidad: '',
    presupuesto: '',
    mensaje: '',
    privacidad: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: target.checked }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await submitLeadForm('contact_home_integrated', formData);
      
      if (response.ok) {
        redirectToLeadThankYouPage('contact_home_integrated');
        return;
      } else {
        alert(response.data?.message || 'Hubo un error al enviar. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      alert('Error de conexión.');
    }
  };

  useEffect(() => {
    if (isPrerenderUserAgent()) {
      return;
    }

    return scheduleIdleTask(async () => {
      const mergedProjects = await loadMergedProjects();
      setProjects(mergedProjects);
    }, { delay: 4000, timeout: 2000 });
  }, []);

  const featuredProjectIds = [
    'dogcat',
    'instalaciones-torrijos-fontaneria',
    'libreria-garcia-lorca',
  ];

  const featuredProjects = [
    ...featuredProjectIds
      .map((idOrTitle) => projects.find((p) => 
        p.id.toString() === idOrTitle || 
        p.title.toLowerCase().includes('dogcat') || // Force match for dogcat
        (p.title && idOrTitle.toLowerCase().includes(p.title.toLowerCase()))
      ))
      .filter((project): project is ProjectSummary => Boolean(project)),
    ...projects.filter((p) => !featuredProjectIds.some(id => 
      p.id.toString() === id || 
      p.title.toLowerCase().includes('dogcat') ||
      (p.title && id.toLowerCase().includes(p.title.toLowerCase()))
    )),
  ]
    .filter((project, index, array) => array.findIndex((item) => item.id.toString() === project.id.toString()) === index)
    .filter(p => p.id !== 'gameshelf-app' && !p.title.toLowerCase().includes('gameshelf')) // Explicitly remove gameshelf
    .slice(0, 3);

  const homeBlogPosts = getBlogEntriesBySlugs(blogSummariesSorted, [
    'que-debe-tener-una-pagina-web-para-atraer-clientes',
    'cuanto-cuesta-pagina-web-profesional-espana-2026',
    'seo-local-pequenas-empresas-guia-google-maps',
  ]);

  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationSchema(),
      {
        "@type": "WebSite",
        "@id": absoluteUrl('/#website'),
        "name": siteConfig.name,
        "url": siteConfig.url,
        "inLanguage": "es-ES",
        "publisher": {
          "@id": absoluteUrl('/#organization'),
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": absoluteUrl('/#service'),
        "name": `${siteConfig.name} | Diseño web en ${siteConfig.city}`,
        "url": siteConfig.url,
        "description": "Diseño web, SEO y soporte continuo para negocios que quieren crecer con una web rápida, clara y orientada a captar clientes.",
        "areaServed": [siteConfig.city, 'España'],
        "serviceType": ['Diseño web', 'Desarrollo web', 'SEO', 'Mantenimiento web'],
        "availableLanguage": ['es'],
        "image": absoluteUrl(siteConfig.defaultOgImage),
        "provider": buildProviderReference(),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-dark overflow-x-hidden">
      <SeoHead
        title="Diseño Web Valencia y SEO | Icono Studio"
        description="Diseñamos páginas web en Valencia rápidas, cuidadas y orientadas a captar clientes. Desarrollo web, SEO y soporte continuo para negocios que quieren crecer."
        path="/"
        schema={homeSchema}
      />

      <Navbar initialTheme="light" ctaHref="#contacto" ctaLabel="Cuéntanos tu idea" />
      {isCalculatorOpen && (
        <Suspense fallback={null}>
          <BudgetCalculator isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
        </Suspense>
      )}
      <MobileStickyCTA onOpenCalculator={() => setIsCalculatorOpen(true)} />
      <main>

      {/* 1. HERO SECTION */}
      <section id="inicio" className="relative overflow-hidden bg-white px-4 pb-12 pt-28 sm:px-6 sm:pb-14 sm:pt-32 lg:px-8 lg:pt-36">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(72,102,200,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(220,233,185,0.28),transparent_28%),linear-gradient(180deg,#fffdfa_0%,#fff8f1_100%)]" />
        <GradientBlob color="bg-brand-blue/10" className="w-[540px] h-[540px] -top-32 right-[-8rem]" delay={0} />
        <GradientBlob color="bg-brand-lime/20" className="w-[420px] h-[420px] top-[40%] left-[-7rem]" delay={1.7} />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="ui-eyebrow mb-5"
            >
              Diseño web en Valencia para negocios que quieren verse bien y explicarse mejor
            </motion.p>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              className="font-display text-[clamp(3.15rem,7.1vw,6rem)] leading-[0.92] tracking-[-0.06em] text-brand-dark"
            >
              <span className="block">Tu web puede</span>
              <span className="block text-brand-blue">sentirse cercana</span>
              <span className="block">y seguir vendiendo.</span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.25 }}
              className="mt-6 max-w-2xl text-[1.2rem] text-[#5e6b7d]"
            >
              Diseñamos webs fáciles de entender para personas que no viven dentro del mundo digital. Tú nos cuentas tu negocio y nosotros te ayudamos a presentarlo con claridad, buena imagen y foco en conseguir contactos.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsCalculatorOpen(true);
                  (window as any).dataLayer?.push({
                    event: 'cta_click',
                    cta_id: 'hero_calculator',
                    cta_text: 'Quiero orientación y precio',
                    page_path: window.location.pathname,
                  });
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-dark px-7 py-3.5 text-[1.05rem] font-medium text-white shadow-[0_18px_30px_rgba(37,51,68,0.16)] transition-all hover:-translate-y-0.5 hover:bg-brand-blue"
              >
                Quiero orientación y precio <ArrowRight size={18} />
              </button>
              <RouterLink
                to="/proyectos"
                id="cta_hero_projects"
                onClick={() => (window as any).dataLayer?.push({
                  event: 'cta_click',
                  cta_id: 'hero_projects',
                  cta_text: 'Ver trabajos',
                  page_path: window.location.pathname,
                })}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#ddd4c7] bg-white px-7 py-3.5 text-[1.05rem] font-medium text-brand-dark transition-all hover:-translate-y-0.5 hover:border-brand-blue hover:text-brand-blue"
              >
                Ver trabajos
              </RouterLink>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.55 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#e7dece] bg-white/80 px-4 py-2 text-[0.95rem] text-[#617084]">
                <div className="flex text-[#d8a327]">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} className="fill-current" />)}
                </div>
                <span>5.0 en reseñas de clientes</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#e7dece] bg-white/80 px-4 py-2 text-[0.95rem] text-[#617084]">
                <span className="h-2 w-2 rounded-full bg-[#6f945d]" />
                Sin tecnicismos ni presupuestos confusos
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.85, ease: 'easeOut', delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-[2.25rem] border border-[#e6ddcf] bg-[#fffaf4]/96 p-6 shadow-[0_26px_60px_rgba(37,51,68,0.12)] backdrop-blur sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/12 text-brand-blue">
                  <Heart className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[0.95rem] text-[#7a8698]">Pensado para negocios reales</p>
                  <h2 className="font-display text-[2rem] leading-[0.95] tracking-[-0.04em] text-brand-dark">
                    Te lo ponemos fácil
                  </h2>
                </div>
              </div>

              <div className="space-y-3">
                {heroAssurances.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-[1.35rem] border border-[#eee6da] bg-white px-4 py-4">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eef3ff] text-brand-blue">
                      <Check className="h-4 w-4" />
                    </span>
                    <p className="text-[1.02rem] leading-relaxed text-[#4d5b6f]">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[1.75rem] bg-[#f6efe5] px-5 py-5">
                <p className="text-[0.9rem] text-[#7a8698]">Lo que más valoran nuestros clientes</p>
                <p className="mt-2 text-[1.12rem] leading-relaxed text-brand-dark">
                  “Nos fueron guiando con calma, nos explicaron cada decisión y el resultado quedó mucho más claro para nuestros clientes.”
                </p>
                <p className="mt-3 text-[0.95rem] font-medium text-[#5c6a7c]">Cliente de Valencia</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 1.5 FRIENDLY REASSURANCE */}
      <section className="bg-brand-cream px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-2xl">
            <p className="ui-eyebrow mb-3">Una web bien hecha también puede sentirse cercana</p>
            <h2 className="ui-section-title text-brand-dark">Pensado para personas que quieren resultados, no palabras técnicas.</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {friendlyHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[2rem] border border-[#e6ddcf] bg-white px-5 py-6 shadow-[0_12px_30px_rgba(37,51,68,0.05)]">
                  <span className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconClassName}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="ui-card-title mb-3 text-brand-dark">{item.title}</h3>
                  <p className="text-[1rem] leading-relaxed text-[#5e6b7d]">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. SERVICIOS PRINCIPALES (SEO) */}
      <section id="servicios" className="bg-white pb-12 pt-10 sm:pb-14 sm:pt-12 md:pb-16 md:pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="ui-eyebrow mb-3">Servicios principales</p>
          <h2 className="ui-section-title text-brand-dark mb-4">Elegimos contigo la solución que mejor explica tu negocio.</h2>
          <p className="ui-section-copy max-w-2xl">
            No intentamos meterte en una plantilla. Miramos qué necesitas hoy, qué te va a resultar cómodo mantener y qué tipo de experiencia esperan tus clientes.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Card 1 */}
          <div className="group flex h-full flex-col rounded-[2rem] border border-[#e6ddcf] bg-[#fffaf4] p-6 shadow-[0_10px_24px_rgba(37,51,68,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/20 hover:shadow-[0_20px_40px_rgba(37,51,68,0.09)]">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-dark leading-tight flex-1 min-w-0 text-balance">
                Diseño Web
              </h3>
              <img 
                src="/lapiz.svg" 
                alt="Diseño Web" 
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300 shrink-0"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="mb-6 flex-grow text-[1rem] leading-relaxed text-[#5e6b7d]">
              Creamos una web cuidada y fácil de recorrer para que la gente entienda rápido quién eres, qué haces y cómo puede contactarte.
            </p>
            <RouterLink 
              to="/diseno-web-valencia" 
              id="cta_service_web"
              onClick={() => (window as any).dataLayer?.push({
                'event': 'service_view', 
                'service_name': 'Diseño Web',
                'page_path': window.location.pathname
              })} 
              className="mt-auto inline-flex items-center gap-2 text-[0.98rem] font-medium text-brand-blue transition-colors hover:text-brand-dark"
            >
              Ver servicio <ArrowRight size={18} className="transform transition-transform group-hover:translate-x-1" />
            </RouterLink>
          </div>

          {/* Card 2 */}
          <div className="group flex h-full flex-col rounded-[2rem] border border-[#e6ddcf] bg-[#fffaf4] p-6 shadow-[0_10px_24px_rgba(37,51,68,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/20 hover:shadow-[0_20px_40px_rgba(37,51,68,0.09)]">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-dark leading-tight flex-1 min-w-0 text-balance">
                Tienda Online
              </h3>
              <img 
                src="/Teclado.svg" 
                alt="Tienda Online" 
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300 shrink-0"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="mb-6 flex-grow text-[1rem] leading-relaxed text-[#5e6b7d]">
              Montamos una tienda online clara y cómoda de gestionar, para que vender por internet no se convierta en otro quebradero de cabeza.
            </p>
            <RouterLink 
              to="/#servicios" 
              id="cta_service_ecommerce"
              onClick={() => (window as any).dataLayer?.push({
                'event': 'service_view', 
                'service_name': 'Tienda Online',
                'page_path': window.location.pathname
              })} 
              className="mt-auto inline-flex items-center gap-2 text-[0.98rem] font-medium text-brand-blue transition-colors hover:text-brand-dark"
            >
              Ver servicio <ArrowRight size={18} className="transform transition-transform group-hover:translate-x-1" />
            </RouterLink>
          </div>

          {/* Card 3 */}
          <div className="group flex h-full flex-col rounded-[2rem] border border-[#e6ddcf] bg-[#fffaf4] p-6 shadow-[0_10px_24px_rgba(37,51,68,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/20 hover:shadow-[0_20px_40px_rgba(37,51,68,0.09)] md:col-span-2 md:mx-auto md:max-w-[30rem] lg:col-span-1 lg:max-w-none lg:mx-0">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-dark leading-tight flex-1 min-w-0 text-balance">
                SEO local
              </h3>
              <img 
                src="/seo.svg" 
                alt="SEO local" 
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300 shrink-0"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="mb-6 flex-grow text-[1rem] leading-relaxed text-[#5e6b7d]">
              Dejamos la web preparada para que Google entienda bien tu actividad y para que más gente de tu zona pueda encontrarte.
            </p>
            <RouterLink 
              to="/#servicios" 
              id="cta_service_seo"
              onClick={() => (window as any).dataLayer?.push({
                'event': 'service_view', 
                'service_name': 'Posicionamiento SEO',
                'page_path': window.location.pathname
              })} 
              className="mt-auto inline-flex items-center gap-2 text-[0.98rem] font-medium text-brand-blue transition-colors hover:text-brand-dark"
            >
              Ver servicio <ArrowRight size={18} className="transform transition-transform group-hover:translate-x-1" />
            </RouterLink>
          </div>
        </div>
        </div>
      </section>

      {/* 3. PROYECTOS */}
      <section id="proyectos" className="border-y border-[#ece3d7] bg-[#fcf7ef] pb-14 pt-10 sm:pb-16 sm:pt-12 md:pb-16 md:pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-12 md:mb-16 gap-8 sm:gap-10 text-center lg:text-left">
            <div className="max-w-2xl shrink-0 flex flex-col items-center lg:items-start">
              <p className="ui-eyebrow mb-3">Trabajos recientes</p>
              <h2 className="ui-section-title text-brand-dark mb-4">Webs distintas, pero con algo en común: se entienden rápido.</h2>
              <p className="ui-section-copy max-w-2xl">
                Cada proyecto responde a una necesidad real. Aquí puedes ver cómo adaptamos el diseño según el tipo de negocio y la sensación que necesita transmitir.
              </p>
            </div>
            <RouterLink
              to="/proyectos"
              onClick={() => (window as any).dataLayer?.push({
                'event': 'nav_click',
                'nav_item': 'Ver todos los proyectos Home',
                'page_path': window.location.pathname
              })}
              className="hidden lg:block border-b border-[#cabfae] pb-2 text-[0.98rem] font-medium text-[#6c7889] transition-colors hover:text-brand-dark"
            >
              Ver todos los trabajos
            </RouterLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className={index === featuredProjects.length - 1 ? 'sm:col-span-2 sm:max-w-[24rem] sm:mx-auto lg:col-span-1 lg:max-w-none lg:mx-0' : ''}
              >
                <RouterLink
                  to={`/proyecto/${project.id}`}
                  id={`project_link_${project.id}`}
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
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${project.id}/1200/800`; }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                  </div>

                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="mb-1 text-base font-bold text-brand-dark transition-colors duration-300 group-hover:text-brand-dark sm:text-lg">
                        {project.title}
                      </h3>
                      <p className="mb-1.5 text-[0.82rem] font-medium text-brand-blue">
                        {project.category}
                      </p>
                    </div>
                    <div className="w-8 h-8 shrink-0 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-brand-dark group-hover:text-white group-hover:border-brand-dark transition-all duration-300 transform group-hover:rotate-45">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </RouterLink>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center lg:hidden">
            <RouterLink
              to="/proyectos"
              onClick={() => (window as any).dataLayer?.push({
                'event': 'nav_click',
                'nav_item': 'Ver todos los proyectos Home Mobile',
                'page_path': window.location.pathname
              })}
              className="border-b border-[#cabfae] pb-2 text-[0.98rem] font-medium text-[#6c7889] transition-colors hover:text-brand-dark"
            >
              Ver todos los trabajos
            </RouterLink>
          </div>
        </div>
      </section>

      {/* 4. PROCESO DE TRABAJO */}
      <section className="pt-10 sm:pt-12 md:pt-14 pb-14 sm:pb-16 md:pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 md:mb-16 max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">
            <p className="ui-eyebrow mb-3">Nuestro proceso</p>
            <h2 className="ui-section-title text-brand-dark mb-5">
                Así te acompañamos para que todo sea más claro desde el principio.
              </h2>
              <p className="ui-section-copy max-w-2xl mx-auto lg:mx-0">
                Te vamos guiando paso a paso, con tiempos definidos y decisiones fáciles de entender. Sin improvisaciones y sin que tengas que perseguirnos para saber cómo va todo.
              </p>
          </div>

          <div 
            ref={metodologiaRef}
            onScroll={handleMetodologiaScroll}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-1 pr-[10vw] md:pr-0"
          >
            {workProcess.map((item, i) => {
              const Icon = item.icon;
              return (
                <div 
                  key={i} 
                  className={`min-w-[85vw] md:min-w-0 bg-[#fffaf4] rounded-[2rem] p-7 sm:p-8 lg:p-10 shadow-[0_12px_30px_rgba(37,51,68,0.05)] border border-[#e6ddcf] ${item.hoverBorder} hover:shadow-[0_24px_45px_rgba(37,51,68,0.09)] transition-all duration-300 group relative overflow-hidden snap-center`}
                >
                  {/* Subtle unified gradient on hover */}
                  <div className={`absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-bl ${item.gradient} to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -mr-16 sm:-mr-20 -mt-16 sm:-mt-20`}></div>
                  
                  {/* Watermark Number */}
                    <span className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 text-7xl sm:text-9xl font-display font-bold text-[#f1e9dc] opacity-70 transition-colors duration-500 select-none pointer-events-none">
                    {item.step}
                  </span>

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6 sm:mb-7">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl ${item.iconBg} flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform duration-300 ${item.iconColor}`}>
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div className="min-w-0">
                          <p className="mb-1 text-[0.88rem] font-medium text-[#7b8798]">Paso {item.step}</p>
                          <h3 className="font-display text-xl sm:text-[1.75rem] text-brand-dark leading-[0.95] text-balance break-words">{item.title}</h3>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6 sm:mb-6">
                      <h4 className="mb-2 text-[1rem] font-medium text-brand-dark">{item.subtitle}</h4>
                      <p className="text-[1rem] text-[#5e6b7d] leading-relaxed">{item.desc}</p>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {item.features.map((feature, idx) => (
                        <div key={idx} className="inline-flex items-center gap-2 rounded-full border border-[#e8e0d4] bg-white px-3 py-2 text-[0.88rem] font-medium text-[#617084]">
                          <div className={`w-4 h-4 rounded-full ${item.iconBg} border border-white flex items-center justify-center flex-shrink-0`}>
                            <Check className={`w-2.5 h-2.5 ${item.iconColor}`} />
                          </div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Indicators */}
          <div className="flex justify-center gap-2 mt-8 md:hidden">
            {workProcess.map((_, i) => (
              <div 
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeStep === i ? 'w-8 bg-brand-blue' : 'w-2 bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. OPINIONES */}
      <section id="opiniones" className="overflow-hidden border-y border-[#ece3d7] bg-[#fcf7ef] py-14 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-12 text-center lg:text-left">
            <div className="md:w-2/3 flex flex-col items-center lg:items-start">
              <p className="ui-eyebrow mb-3">Opiniones reales</p>
              <h2 className="ui-section-title text-brand-dark">
                Lo que más nos repiten es que trabajar con nosotros resulta fácil.
              </h2>
            </div>
            <div className="md:w-1/3 flex justify-center lg:justify-end pb-2">
              <div className="flex items-center gap-5 rounded-2xl border border-[#e6ddcf] bg-white px-6 py-4 shadow-sm">
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-display text-brand-dark leading-none">5.0</span>
                </div>
                <div className="w-px h-12 bg-gray-200"></div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <span className="text-[0.9rem] text-gray-500 font-medium">Valoración media</span>
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
                  <div key={idx} className="flex w-[280px] shrink-0 flex-col rounded-2xl border border-[#e6ddcf] bg-white p-5 shadow-sm sm:w-[320px]">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold text-sm shrink-0">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-brand-dark text-sm leading-none">{review.name}</p>
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
                      <p className="text-gray-600 text-[0.92rem] leading-relaxed line-clamp-3">
                        "{review.text}"
                      </p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          
          {/* Gradientes laterales para suavizar la entrada/salida */}
          <div className="absolute inset-y-0 left-0 w-12 sm:w-32 bg-gradient-to-r from-[#fcf7ef] to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-12 sm:w-32 bg-gradient-to-l from-[#fcf7ef] to-transparent pointer-events-none"></div>
        </div>
      </section>



      {/* 8. SUPPORT TEASER */}
      <section id="soporte-web" className="bg-white px-4 pb-14 pt-14 sm:px-6 sm:pb-16 sm:pt-16 md:pb-20 md:pt-20 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.25rem] md:rounded-[2.75rem] border border-[#e2d8c8] bg-[#f8f2e8] p-5 sm:p-8 lg:p-9 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.98),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(72,102,200,0.06),transparent_26%)]"></div>
            <div className="absolute -top-20 right-0 w-72 h-72 bg-white/80 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.05fr_.95fr] gap-5 sm:gap-6 lg:gap-8 items-center">
              <div className="max-w-xl mx-auto lg:mx-0 flex flex-col items-center text-center lg:items-start lg:text-left">
                <h2 className="ui-section-title text-brand-dark mb-4">
                  Tu web, siempre en buenas manos
                </h2>

                <p className="ui-section-copy max-w-xl mb-5 sm:mb-6">
                  Si quieres, seguimos contigo después de publicar para que la web esté atendida, actualizada y dando buena imagen sin que tengas que pensar en la parte técnica.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 justify-center lg:justify-start">
                  <RouterLink
                    to="/hosting-mantenimiento-web"
                    id="cta_support_plans_hero"
                    onClick={() => (window as any).dataLayer?.push({
                      'event': 'support_click',
                      'cta_id': 'support_plans_hero',
                      'page_path': window.location.pathname
                    })}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-[1rem] font-medium text-white hover:bg-brand-blue transition-colors"
                  >
                    Ver planes <ArrowRight size={18} />
                  </RouterLink>
                  <p className="text-sm font-semibold text-gray-700">Hosting por 8€ / mes + IVA</p>
                </div>
              </div>

              <div className="rounded-[1.7rem] sm:rounded-[1.9rem] border border-white/85 bg-white/88 p-4 sm:p-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)] backdrop-blur-sm">
                <div className="mb-3 sm:mb-4">
                  <div>
                    <p className="ui-form-label text-gray-400 mb-2">Servicio opcional</p>
                    <h3 className="font-display text-xl sm:text-[2rem] leading-none text-brand-dark">
                      Todo bajo control
                    </h3>
                  </div>
                </div>

                <div className="space-y-2">
                  {supportTeaserItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="rounded-[1rem] sm:rounded-[1.1rem] border border-[#E7EDF0] bg-[#F8FBFB] px-3 py-3 sm:px-3.5 sm:py-3.5">
                        <div className="flex items-start gap-3 text-brand-dark">
                          <span className={`mt-0.5 flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl ${item.iconClassName}`}>
                            <Icon className="w-4 h-4" />
                          </span>
                          <div>
                            <p className="font-semibold leading-none mb-1.5">{item.title}</p>
                            <p className="text-[13px] sm:text-sm text-gray-600 leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-3 sm:mt-4 rounded-[1.1rem] sm:rounded-[1.2rem] bg-[#ECF3F4] px-4 py-3.5 sm:py-4">
                  <p className="text-[13px] sm:text-sm text-gray-600 leading-relaxed">
                    Puedes empezar solo con el hosting y, cuando tu web necesite más atención, sumar mantenimiento, soporte y pequeñas mejoras para que siga bien cuidada sin complicarte con la parte técnica.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="border-y border-[#ece3d7] bg-white py-14 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
            <p className="ui-eyebrow mb-3">Dudas habituales</p>
            <h2 className="ui-section-title text-brand-dark mb-6">
              Resolvemos lo importante antes de empezar.
            </h2>
            <p className="ui-section-copy">Para que sepas qué esperar, cuánto suele tardar y cómo te acompañamos después.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className={`overflow-hidden rounded-2xl border bg-[#fffaf4] transition-all duration-300 ${activeFaq === i ? 'border-brand-blue shadow-md' : 'border-[#e6ddcf]'}`}
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="pr-4 text-lg font-medium text-brand-dark">{faq.q}</span>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${activeFaq === i ? 'bg-brand-blue text-white' : 'bg-[#efe7da] text-gray-500'}`}>
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
                      <div className="border-t border-[#efe7da] px-6 pb-6 pt-4 leading-relaxed text-[#5e6b7d]">
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

      {/* 11. BLOG */}
      <section id="blog" className="bg-[#fcf7ef] py-14 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-6 mb-12 md:mb-16 text-center lg:text-left">
            <div className="max-w-3xl flex flex-col items-center lg:items-start">
              <p className="ui-eyebrow mb-3">Guías que sí ayudan</p>
              <h2 className="ui-section-title text-brand-dark mb-4">Blog</h2>
              <p className="ui-section-copy max-w-2xl">
                Hemos seleccionado tres guías para resolver dudas muy comunes antes de encargar una web: precio, visibilidad y qué debe transmitir.
              </p>
            </div>
          <RouterLink to="/blog" onClick={() => (window as any).dataLayer?.push({'event': 'blog_home_click'})} className="flex items-center gap-2 text-base font-medium hover:text-brand-blue transition-colors sm:text-lg">
            Ver todos <ArrowRight size={20} className="sm:w-6 sm:h-6" />
          </RouterLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {homeBlogPosts.map((post) => (
            <RouterLink 
              key={post.slug} 
              to={`/blog/${post.slug}`} 
              onClick={() => (window as any).dataLayer?.push({
                'event': 'nav_click',
                'nav_item': `Blog: ${post.title}`,
                'page_path': window.location.pathname
              })}
              className="group cursor-pointer"
              >
                <div className="relative mb-4 overflow-hidden rounded-[2rem] sm:mb-6">
                <img src={post.image} alt={post.title} loading="lazy" decoding="async" className="w-full aspect-square object-cover transform group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[0.88rem] font-medium text-brand-dark sm:px-4 sm:py-2">
                  {post.tag}
                </div>
              </div>
              <div className="flex items-center gap-4 mb-2 sm:mb-3">
                <time dateTime={parseStructuredDate(post.modifiedDate || post.date)} className="text-sm text-gray-500">
                  {post.date}
                </time>
              </div>
              <h3 className="font-display text-xl leading-tight transition-colors group-hover:text-brand-blue sm:text-2xl">{post.title}</h3>
            </RouterLink>
          ))}
        </div>
        </div>
      </section>

      {/* 12. INTEGRATED FOOTER (FORM + LINKS) */}
      <div className="relative overflow-hidden border-t border-[#d8cfbf] bg-[#253344]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(220,233,185,0.12),transparent_30%)]"></div>

        <section id="contacto" className="py-16 sm:py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-12 lg:gap-16 items-start">
              <div className="lg:sticky lg:top-32 flex flex-col items-center text-center lg:items-start lg:text-left">

                <h2 className="ui-section-title text-white mb-8">
                  Tu nueva web
                  <br />
                  <span className="text-brand-lime">puede empezar hoy</span>
                </h2>
                <p className="mb-8 max-w-sm text-[1.1rem] leading-relaxed text-white/72 mx-auto lg:mx-0">
                  Cuéntanos qué necesitas y te responderemos con una orientación clara. Si aún no lo tienes del todo definido, también te ayudamos a ordenarlo.
                </p>

                <div className="grid grid-cols-1 gap-4 mb-8 pt-6 border-t border-white/10 w-full max-w-sm">
                  {[
                    { t: "Respuesta en menos de 24h", i: Clock },
                    { t: "Precio definido antes de empezar", i: FileText },
                    { t: "Atención personalizada", i: Heart },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-center gap-3 text-[0.95rem] font-medium text-white/90 lg:justify-start">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-lime/12 text-brand-lime">
                        <item.i size={14} />
                      </div>
                      {item.t}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative rounded-[2.5rem] border border-white/12 bg-white/8 p-5 shadow-2xl backdrop-blur-md md:p-7">
                {isSubmitted ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-brand-lime rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(204,255,0,0.2)]">
                      <Check size={32} className="text-brand-dark" />
                    </div>
                    <h3 className="mb-3 font-display text-2xl text-white">Solicitud enviada</h3>
                    <p className="text-white/60 text-base mb-6 leading-relaxed">
                      Gracias por contarnos tu proyecto. Te responderemos lo antes posible.
                    </p>
                    <a
                      href="https://wa.me/34623783129"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 rounded-full bg-brand-lime px-8 py-4 text-[1rem] font-medium text-brand-dark shadow-xl transition-all hover:scale-105"
                    >
                      Hablar por WhatsApp <Send size={14} />
                    </a>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <h3 className="mb-2 font-display text-2xl leading-none text-white sm:text-[2rem]">Cuéntanos tu proyecto</h3>
                      <p className="text-[1rem] text-white/72">Te responderemos con una propuesta clara y sin compromiso.</p>
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      onSubmitCapture={() => debugLeadFormSubmitCapture('contact_home_integrated')}
                      onInvalidCapture={(event) => {
                        const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
                        debugLeadFormInvalid('contact_home_integrated', target.name, target.validationMessage);
                      }}
                      className="space-y-3.5"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div className="space-y-1">
                          <label htmlFor="home-name" className="ui-form-label text-white/40 ml-1">Nombre</label>
                          <input
                            id="home-name"
                            type="text"
                            name="nombre"
                            required
                            value={formData.nombre}
                            onChange={handleInputChange}
                            placeholder="Tu nombre"
                            className="h-11 w-full rounded-xl border border-white/12 bg-white/6 px-4 text-[1rem] text-white placeholder:text-white/40 transition-all focus:border-brand-lime focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label htmlFor="home-business" className="ui-form-label text-white/40 ml-1">Negocio / Marca</label>
                          <input
                            id="home-business"
                            type="text"
                            name="negocio"
                            required
                            value={formData.negocio}
                            onChange={handleInputChange}
                            placeholder="Nombre de tu empresa"
                            className="h-11 w-full rounded-xl border border-white/12 bg-white/6 px-4 text-[1rem] text-white placeholder:text-white/40 transition-all focus:border-brand-lime focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div className="space-y-1">
                          <label htmlFor="home-phone" className="ui-form-label text-white/40 ml-1">WhatsApp / Teléfono</label>
                          <input
                            id="home-phone"
                            type="tel"
                            name="whatsapp"
                            required
                            value={formData.whatsapp}
                            onChange={handleInputChange}
                            placeholder="600 000 000"
                            className="h-11 w-full rounded-xl border border-white/12 bg-white/6 px-4 text-[1rem] text-white placeholder:text-white/40 transition-all focus:border-brand-lime focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label htmlFor="home-email" className="ui-form-label text-white/40 ml-1">Email</label>
                          <input
                            id="home-email"
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="hola@tuweb.com"
                            className="h-11 w-full rounded-xl border border-white/12 bg-white/6 px-4 text-[1rem] text-white placeholder:text-white/40 transition-all focus:border-brand-lime focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div className="space-y-1">
                          <label htmlFor="home-need" className="ui-form-label text-white/40 ml-1">Tipo de web</label>
                          <select
                            id="home-need"
                            name="necesidad"
                            required
                            value={formData.necesidad}
                            onChange={handleInputChange}
                            className="h-11 w-full appearance-none cursor-pointer rounded-xl border border-white/12 bg-white/6 px-4 text-[1rem] text-white transition-all focus:border-brand-lime focus:outline-none"
                          >
                            <option value="" className="bg-brand-dark">Selecciona una opción</option>
                            <option value="corporativa" className="bg-brand-dark">Web corporativa</option>
                            <option value="landing" className="bg-brand-dark">Landing page</option>
                            <option value="portfolio" className="bg-brand-dark">Portfolio</option>
                            <option value="tienda" className="bg-brand-dark">Tienda online</option>
                            <option value="rediseño" className="bg-brand-dark">Rediseño web</option>
                            <option value="no-claro" className="bg-brand-dark">No lo tengo claro</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label htmlFor="home-budget" className="ui-form-label text-white/40 ml-1">Presupuesto aproximado</label>
                          <select
                            id="home-budget"
                            name="presupuesto"
                            required
                            value={formData.presupuesto}
                            onChange={handleInputChange}
                            className="h-11 w-full appearance-none cursor-pointer rounded-xl border border-white/12 bg-white/6 px-4 text-[1rem] text-white transition-all focus:border-brand-lime focus:outline-none"
                          >
                            <option value="" className="bg-brand-dark">Selecciona un rango</option>
                            <option value="350-500" className="bg-brand-dark">350 € – 500 €</option>
                            <option value="500-800" className="bg-brand-dark">500 € – 800 €</option>
                            <option value="800-1200" className="bg-brand-dark">800 € – 1.200 €</option>
                            <option value="1200+" className="bg-brand-dark">Más de 1.200 €</option>
                            <option value="orientacion" className="bg-brand-dark">Necesito orientación</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="home-message" className="ui-form-label text-white/40 ml-1">Cuéntanos qué necesitas</label>
                        <textarea
                          id="home-message"
                          name="mensaje"
                          required
                          rows={2}
                          value={formData.mensaje}
                          onChange={handleInputChange}
                          placeholder="Ej: necesito una web para mi clínica, con imagen profesional, contacto por WhatsApp y preparada para captar clientes."
                          className="w-full resize-none rounded-xl border border-white/12 bg-white/6 px-4 py-2.5 text-[1rem] text-white placeholder:text-white/40 transition-all focus:border-brand-lime focus:outline-none"
                        ></textarea>
                      </div>

                      <div className="flex items-start gap-3 py-1">
                        <input
                          type="checkbox"
                          name="privacidad"
                          id="privacidad"
                          required
                          checked={formData.privacidad}
                          onChange={handleInputChange}
                          className="mt-1 accent-brand-lime"
                        />
                        <label htmlFor="privacidad" className="text-[0.9rem] text-white/60 leading-relaxed">
                          Acepto la{' '}
                          <RouterLink to="/politica-de-privacidad" className="text-brand-lime hover:text-white underline underline-offset-4">
                            política de privacidad
                          </RouterLink>{' '}
                          y autorizo a Icono Studio a contactar conmigo.
                        </label>
                      </div>

                      <button
                        type="submit"
                        onClick={() => debugLeadFormButtonClick('contact_home_integrated')}
                        className="mt-2 flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-brand-lime text-[1rem] font-medium text-brand-dark shadow-xl shadow-brand-lime/20 transition-all hover:scale-[1.02]"
                      >
                        Quiero una propuesta clara <Send size={14} />
                      </button>

                      <p className="pt-1 text-center text-[0.85rem] text-white/45">
                        O <a href="https://wa.me/34623783129" className="text-brand-lime hover:underline">escríbenos por WhatsApp</a> si prefieres hablarlo más rápido.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      </main>

      <Footer hideCTA={true} />
    </div>
  );
}
