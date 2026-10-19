import React, { Suspense, lazy, useState } from 'react';
import { m, AnimatePresence, MotionConfig, useReducedMotion } from 'motion/react';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowRight, Check, CheckCircle2, Star, ChevronDown, ShieldCheck, Send, Mail, RefreshCcw, Pencil, MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import ProyectosRecientes from '../components/ProyectosRecientes';
import HomeProcess from '../components/HomeProcess';
import HomeContactForm from '../components/HomeContactForm';
import '../components/HomeSections.css';
import { redirectToLeadThankYouPage, submitLeadForm } from '../lib/analytics';
import { absoluteUrl, siteConfig } from '../lib/site';
import { buildOrganizationSchema, buildProviderReference } from '../lib/structuredData';
import { homeHeroNavLinks } from '../data/navigation';

const BudgetCalculator = lazy(() => import('../components/BudgetCalculator'));

const faqs = [
  { q: "¿El precio incluye el hosting y dominio?", a: "No. El dominio no está incluido, aunque podemos recomendarte la mejor opción y ayudarte a dejarlo configurado. El hosting tampoco va incluido en el precio base de la web, pero si quieres podemos gestionarlo nosotros como un servicio aparte." },
  { q: "¿Cuánto tardáis en hacer una web?", a: "Depende de la complejidad del proyecto. Una página sencilla (como la de presentar un servicio o una oferta) suele estar lista en 1-2 semanas, mientras que una web con varias secciones o una tienda online puede llevar entre 4 y 8 semanas." },
  { q: "¿Podré modificar la web yo mismo?", a: "¡Por supuesto! Desarrollamos nuestras webs con paneles de control autogestionables (como WordPress o Shopify) y te damos una formación básica para que puedas cambiar textos, imágenes o productos sin depender de nosotros." },
  { q: "¿Hacéis mantenimiento web?", a: "Sí, ofrecemos planes de mantenimiento mensual para asegurar que tu web esté siempre actualizada, segura y funcionando al 100% de su capacidad." },
  { q: "¿Qué necesito tener preparado para empezar?", a: "No necesitas tenerlo todo listo. Cuéntanos qué hace tu negocio, qué quieres conseguir y qué tienes ahora mismo; nosotros te ayudamos a ordenar las ideas y te indicamos el siguiente paso." }
];

const reviews = [
  {
    name: 'Carolina Méndez',
    profession: 'Estudio de arquitectura',
    text: 'El equipo entendió desde el primer momento lo que necesitábamos. La web quedó impecable y nuestros clientes lo notan.',
    avatar: '/testimonials/avatars/carolina-head.png',
  },
  {
    name: 'Martín Rojas',
    profession: 'Tienda online de accesorios',
    text: 'Profesionales, claros y muy organizados. El proceso fue simple y el resultado superó nuestras expectativas.',
    avatar: '/testimonials/avatars/martin-head.png',
  },
  {
    name: 'Lucía Fernández',
    profession: 'Consultora de marketing',
    text: 'Nuestra nueva web nos ayudó a transmitir mejor y a recibir muchos más contactos. 100% recomendados.',
    avatar: '/testimonials/avatars/lucia-head.png',
  },
  {
    name: 'Inés Ferrer',
    profession: 'Clínica dental',
    text: 'Nos explicaron todo sin tecnicismos y ahora nuestra web transmite la confianza que queríamos desde el primer vistazo.',
    avatar: '/testimonials/avatars/ines-head.png',
  },
  {
    name: 'Javier Navarro',
    profession: 'Taller de bicicletas',
    text: 'Ahora nuestros servicios se entienden a la primera y las consultas que recibimos llegan mucho más claras.',
    avatar: '/testimonials/avatars/javier-head.png',
  },
  {
    name: 'Marta Pardo',
    profession: 'Estudio de interiorismo',
    text: 'El resultado se siente profesional, cercano y muy nuestro. Ha sido un cambio enorme para el negocio.',
    avatar: '/testimonials/avatars/marta-head.png',
  },
];

const hostingFeatures = [
  { label: "SSL incluido", icon: ShieldCheck },
  { label: "Correo profesional", icon: Mail },
  { label: "Copias semanales", icon: RefreshCcw },
  { label: "Revisión mensual", icon: CheckCircle2 },
];

const maintenanceFeatures = [
  { label: "Hasta 3 cambios al mes", icon: Pencil },
  { label: "Ayuda 24 h", icon: MessageCircle },
];

const supportPlans = [
  {
    eyebrow: "La base de tu web",
    title: "Hosting",
    description: "Tu web alojada, protegida y siempre disponible.",
    price: "8 €/mes",
    imageSrc: "/seccion-3/hosting-v2.png",
    imageAlt: "Servidor protegido",
    features: hostingFeatures,
  },
  {
    eyebrow: "Para seguir mejorando",
    title: "Mantenimiento web",
    description: "Pequeños cambios en tu web sin preocuparte de hacerlos tú.",
    price: "30 €/mes",
    imageSrc: "/seccion-3/maintenance-v2.png",
    imageAlt: "Mantenimiento y actualizaciones web",
    features: maintenanceFeatures,
  },
] as const;

const heroTrustItems = [
  { icon: Star, label: "5,0 en Google", iconClassName: "text-amber-400" },
  { icon: CheckCircle2, label: "Webs a medida", iconClassName: "text-slate-400" },
  { icon: ShieldCheck, label: "SEO incluido", iconClassName: "text-slate-400" },
];

const heroVisualItems = [
  { key: 'browser', className: 'hero-visual-item--browser', depth: 0.45, src: '/home-hero/browser.webp', fallbackSrc: '/home-hero/browser.png', alt: '' },
  { key: 'cursor', className: 'hero-visual-item--cursor', depth: 0.8, src: '/home-hero/cursor.webp', fallbackSrc: '/home-hero/cursor.png', alt: '' },
  { key: 'phone', className: 'hero-visual-item--phone', depth: 0.65, src: '/home-hero/phone.webp', fallbackSrc: '/home-hero/phone.png', alt: '' },
  { key: 'message', className: 'hero-visual-item--message', depth: 0.55, src: '/home-hero/message.webp', fallbackSrc: '/home-hero/message.png', alt: '' },
  { key: 'code', className: 'hero-visual-item--code', depth: 0.9, src: '/home-hero/code.webp', fallbackSrc: '/home-hero/code.png', alt: '' },
  { key: 'sparkles', className: 'hero-visual-item--sparkles', depth: 0.35, src: '/home-hero/sparkles.webp', fallbackSrc: '/home-hero/sparkles.png', alt: '' },
] as const;

function HeroVisual() {
  const reduceMotion = useReducedMotion();
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || reduceMotion) {
      return;
    }

    const stage = event.currentTarget;
    const bounds = stage.getBoundingClientRect();
    const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;
    const easedX = Math.sin(normalizedX * Math.PI / 2);
    const easedY = Math.sin(normalizedY * Math.PI / 2);

    stage.style.setProperty('--hero-light-x', `${(normalizedX + 0.5) * 100}%`);
    stage.style.setProperty('--hero-light-y', `${(normalizedY + 0.5) * 100}%`);

    stage.querySelectorAll<HTMLElement>('[data-hero-depth]').forEach((layer) => {
      const depth = Number(layer.dataset.heroDepth ?? 0);
      layer.style.setProperty('--hero-parallax-x', `${easedX * depth * 18}px`);
      layer.style.setProperty('--hero-parallax-y', `${easedY * depth * 13}px`);
      layer.style.setProperty('--hero-parallax-rotate', `${(easedX * 3.2 - easedY * 1.4) * depth}deg`);
    });
  };

  const resetPointerPosition = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty('--hero-light-x', '50%');
    event.currentTarget.style.setProperty('--hero-light-y', '45%');
    event.currentTarget.querySelectorAll<HTMLElement>('[data-hero-depth]').forEach((layer) => {
      layer.style.setProperty('--hero-parallax-x', '0px');
      layer.style.setProperty('--hero-parallax-y', '0px');
      layer.style.setProperty('--hero-parallax-rotate', '0deg');
    });
  };

  return (
    <div
      className="hero-visual"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointerPosition}
      aria-hidden="true"
    >
      <img
        className="hero-visual-character"
        src="/home-hero/character.webp"
        alt=""
        fetchPriority="high"
        decoding="async"
        onError={(event) => {
          event.currentTarget.src = '/home-hero/character.png';
        }}
      />

      {heroVisualItems.map((item) => (
        <div
          key={item.key}
          className={`hero-visual-item ${item.className}`}
          data-hero-depth={item.depth}
        >
          <div className="hero-visual-float">
            <img
              src={item.src}
              alt={item.alt}
              loading="eager"
              decoding="async"
              onError={(event) => {
                event.currentTarget.src = item.fallbackSrc;
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

const homeProblemItems = [
  {
    title: "No te ven",
    description: "No apareces en Google o tu web pasa desapercibida.",
    imageSrc: "/seccion-2/duda.webp",
    imageClassName: "w-[5.2rem] sm:w-[5.75rem] lg:w-[6.2rem]",
  },
  {
    title: "No conectas",
    description: "Tu mensaje no genera confianza ni conecta con tus clientes.",
    imageSrc: "/seccion-2/mensaje.webp",
    imageClassName: "w-[5.4rem] sm:w-[6rem] lg:w-[6.4rem]",
  },
  {
    title: "No queda claro",
    description: "Tus servicios, beneficios o pasos no se entienden rápido.",
    imageSrc: "/seccion-2/flechas.webp",
    imageClassName: "w-[5.8rem] sm:w-[6.4rem] lg:w-[6.9rem]",
  },
  {
    title: "No conviertes",
    description: "Visitan tu web, pero no te escriben, no llaman ni compran.",
    imageSrc: "/seccion-2/carrito.webp",
    imageClassName: "w-[5.4rem] sm:w-[6rem] lg:w-[6.5rem]",
  },
] as const;

const homeServiceCards = [
  {
    key: "design",
    title: "Diseño web",
    description: "Una web a medida para presentar tu negocio, tus servicios y todo lo que ofreces.",
    imageSrc: "/seccion-3/service-web-hover-poster.png",
    imageAlt: "Diseño web",
    hoverAnimationSrc: "/seccion-3/service-web-hover.webp",
  },
  {
    key: "landing",
    title: "Página promocional",
    description: "Una página directa para promocionar un servicio, una oferta o una campaña.",
    imageSrc: "/seccion-3/service-promotion-hover-poster.png",
    imageAlt: "Página promocional",
    hoverAnimationSrc: "/seccion-3/service-promotion-hover.webp",
  },
  {
    key: "shop",
    title: "Tienda online",
    description: "Tu tienda preparada para mostrar y vender productos por internet de forma sencilla.",
    imageSrc: "/seccion-3/service-shop-hover-poster.png?v=3",
    imageAlt: "Tienda online",
    hoverAnimationSrc: "/seccion-3/service-shop-hover.webp",
  },
] as const;

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [hoveredServiceKey, setHoveredServiceKey] = useState<string | null>(null);
  const [serviceAnimationRun, setServiceAnimationRun] = useState(0);
  const [serviceAnimationReady, setServiceAnimationReady] = useState(false);
  const reduceMotion = useReducedMotion();
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

  const [isSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

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
    if (isSubmitting) return;
    setIsSubmitting(true);
    setFormError('');

    try {
      const response = await submitLeadForm('contact_home_integrated', formData);
      
      if (response.ok) {
        redirectToLeadThankYouPage('contact_home_integrated');
        return;
      } else {
        setFormError(response.data?.message || 'No se ha podido enviar. Inténtalo de nuevo en un momento.');
      }
    } catch (error) {
      setFormError('No hemos podido conectar. Revisa tu conexión y vuelve a intentarlo.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <MotionConfig reducedMotion="user">
    <div className="home-page min-h-screen overflow-x-clip bg-[#F7F9FC] font-sans text-[#0B1B63] selection:bg-[#9ED6F1]/40 selection:text-[#0B1B63]">
      <SeoHead
        title="Diseño Web Valencia y SEO | Icono Studio"
        description="Diseñamos páginas web en Valencia rápidas, cuidadas y orientadas a captar clientes. Desarrollo web, SEO y soporte continuo para negocios que quieren crecer."
        path="/"
        schema={homeSchema}
      />

      <Navbar initialTheme="light" ctaHref="#contacto" ctaLabel="Pedir presupuesto" linksOverride={homeHeroNavLinks} />
      {isCalculatorOpen && (
        <Suspense fallback={null}>
          <BudgetCalculator isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
        </Suspense>
      )}
      <main>

      {/* 1. HERO SECTION */}
      <section id="inicio" className="relative z-20 scroll-mt-24 overflow-hidden bg-[#F7F7F7] px-5 pb-16 pt-28 text-brand-dark sm:px-6 sm:pb-20 sm:pt-28 lg:px-8 lg:pb-24 lg:pt-28 xl:pt-32">
        <div className="relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-8 lg:min-h-[29rem] lg:grid-cols-[1.12fr_1fr] lg:gap-6 xl:gap-12">
          <div className="home-section-intro relative z-20 min-w-0 max-w-[42rem] lg:pl-4 xl:pl-7">
            <m.h1
              initial={{ y: 40 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="font-display text-[clamp(1.85rem,8vw,2.2rem)] font-extrabold leading-[1.14] tracking-[-0.025em] text-[#0B1B63] sm:text-[2.75rem] md:text-[2.82rem] lg:text-[clamp(2.1rem,3.1vw,2.88rem)]"
            >
              <span className="lg:block">Tu negocio merece una web </span>
              <span className="lg:block">
                que transmita <span style={{ color: "#3E88AE" }}>confianza</span>
              </span>
            </m.h1>

            <m.p
              initial={{ y: 20 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.22 }}
              className="mt-6 max-w-[35rem] font-sans text-[1.02rem] font-medium leading-[1.76] text-[#27396C] sm:text-[1.1rem]"
            >
              Diseñamos páginas web claras, bonitas y estratégicas para que tu negocio reciba más llamadas, WhatsApps y solicitudes.
            </m.p>

            <m.div
              initial={{ y: 20 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.34 }}
              className="mt-8 flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap lg:justify-start"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsCalculatorOpen(true);
                  (window as any).dataLayer?.push({
                    'event': 'cta_click',
                    'cta_id': 'hero_calculator',
                    'cta_text': 'Pedir presupuesto',
                    'page_path': window.location.pathname
                  });
                }}
                className="brand-button inline-flex min-w-0 items-center justify-center gap-2 px-7 py-4 font-sans text-[1.02rem] font-semibold sm:px-8"
              >
                Pedir presupuesto <ArrowRight size={18} />
              </button>
              <RouterLink
                to="/proyectos"
                id="cta_hero_projects"
                onClick={() => (window as any).dataLayer?.push({
                  'event': 'cta_click',
                  'cta_id': 'hero_projects',
                  'cta_text': 'Ver proyectos',
                  'page_path': window.location.pathname
                })}
                className="inline-flex min-w-0 items-center justify-center gap-2 rounded-full border border-[#9ED6F1] bg-white px-7 py-4 font-sans text-[1.02rem] font-semibold text-[#0B1B63] transition-colors hover:bg-[#EAF6FC] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#9ED6F1]/45 sm:px-8"
              >
                Ver proyectos
              </RouterLink>
            </m.div>

            <m.div
              initial={{ y: 20 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.46 }}
              className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-3 font-sans text-[0.82rem] font-medium text-[#17295E] sm:text-[0.88rem] lg:justify-start lg:gap-x-4 lg:text-[0.84rem] xl:gap-x-6"
            >
              {heroTrustItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-2.5 whitespace-nowrap"
                  >
                    <Icon size={18} className={item.iconClassName} />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </m.div>
          </div>

          <m.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="relative z-10 mx-auto w-full min-w-0 max-w-[38rem] px-2 sm:px-4 lg:max-w-none lg:px-2"
          >
            <HeroVisual />
          </m.div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 180"
            preserveAspectRatio="none"
            className="home-wave home-wave--hero block h-[60px] w-full fill-[#D8ECFB] sm:h-[72px] lg:h-[92px] xl:h-[104px]"
          >
            <path className="hidden sm:block" d="M-360,104 C-300,66 -240,60 -180,96 C-120,130 -60,136 0,104 C60,70 120,64 180,98 C240,132 300,138 360,104 C420,70 480,64 540,98 C600,132 660,138 720,104 C780,70 840,64 900,98 C960,132 1020,138 1080,104 C1140,70 1200,64 1260,98 C1320,132 1380,138 1440,104 C1500,70 1560,64 1620,98 C1680,132 1740,138 1800,104 L1800,180 L-360,180 Z">
              {!reduceMotion && <animateTransform
                className="home-wave-motion"
                attributeName="transform"
                type="translate"
                dur="16s"
                calcMode="linear"
                repeatCount="indefinite"
                values="0 0; -360 0"
              />}
            </path>
            <path className="block sm:hidden" d="M-720,104 C-600,84 -480,80 -360,100 C-240,122 -120,124 0,104 C120,84 240,80 360,100 C480,122 600,124 720,104 C840,84 960,80 1080,100 C1200,122 1320,124 1440,104 C1560,84 1680,80 1800,100 C1920,122 2040,124 2160,104 L2160,180 L-720,180 Z">
              {!reduceMotion && <animateTransform
                className="home-wave-motion"
                attributeName="transform"
                type="translate"
                dur="17s"
                calcMode="linear"
                repeatCount="indefinite"
                values="0 0; -720 0"
              />}
            </path>
            <rect x="0" y="176" width="1440" height="4" fill="#D8ECFB" />
          </svg>
        </div>
      </section>

      {/* 1.5 HOME PROBLEMS */}
      <section className="relative z-10 overflow-hidden bg-[linear-gradient(180deg,#D8ECFB_0%,#D2E8FA_100%)] pb-[5rem] pt-8 sm:pb-[5.5rem] sm:pt-10 lg:pb-[6.5rem] lg:pt-12 xl:pt-[3.25rem]">
        <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[67rem] text-center">
            <h2 className="text-balance font-display text-[1.85rem] font-extrabold leading-[1.12] tracking-[-0.032em] text-[#0B1B63] sm:text-[2.15rem] lg:text-[2.32rem] xl:text-[2.52rem]">
              Cuando alguien busca tu negocio, ¿qué encuentra?
            </h2>
            <p className="mx-auto mt-4 max-w-[54rem] font-sans text-[0.98rem] font-medium leading-[1.68] text-[#1F3572] sm:text-[1.02rem] lg:text-[1.06rem]">
              Antes de llamar o pedir presupuesto, muchos clientes ya han buscado tu negocio, han comparado opciones y se han formado una primera impresión.
            </p>
          </div>

          <div className="home-problems-grid mt-8 grid grid-cols-2 gap-x-5 gap-y-8 sm:mt-10 sm:gap-x-8 sm:gap-y-12 lg:mt-12 lg:grid-cols-4 lg:gap-x-8">
            {homeProblemItems.map((item) => (
              <article key={item.title} className="flex flex-col items-center text-center">
                <div className="flex h-[7.5rem] items-center justify-center sm:h-[8rem] lg:h-[8.6rem]">
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className={`${item.imageClassName} home-problem-image h-auto max-h-full object-contain`}
                  />
                </div>
                <h3 className="mt-4 font-sans text-[1.6rem] font-bold tracking-[-0.04em] text-[#0B1B63] sm:text-[1.72rem]">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-[15.5rem] font-sans text-[0.96rem] font-medium leading-[1.5] text-[#1F3572] sm:max-w-[16.5rem]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 180"
            preserveAspectRatio="none"
            className="home-wave home-wave--problems block h-[58px] w-full fill-[#F7F7F7] sm:h-[72px] lg:h-[92px]"
          >
            <path className="hidden sm:block" d="M-360,100 C-300,64 -240,58 -180,96 C-120,128 -60,136 0,100 C60,68 120,62 180,98 C240,132 300,140 360,100 C420,68 480,62 540,98 C600,132 660,140 720,100 C780,68 840,62 900,98 C960,132 1020,140 1080,100 C1140,68 1200,62 1260,98 C1320,132 1380,140 1440,100 C1500,68 1560,62 1620,98 C1680,132 1740,140 1800,100 L1800,180 L-360,180 Z">
              {!reduceMotion && <animateTransform
                className="home-wave-motion"
                attributeName="transform"
                type="translate"
                dur="18s"
                calcMode="linear"
                repeatCount="indefinite"
                values="0 0; -360 0"
              />}
            </path>
            <path className="block sm:hidden" d="M-720,100 C-600,82 -480,78 -360,98 C-240,120 -120,122 0,100 C120,82 240,78 360,98 C480,120 600,122 720,100 C840,82 960,78 1080,98 C1200,120 1320,122 1440,100 C1560,82 1680,78 1800,98 C1920,120 2040,122 2160,100 L2160,180 L-720,180 Z">
              {!reduceMotion && <animateTransform
                className="home-wave-motion"
                attributeName="transform"
                type="translate"
                dur="19s"
                calcMode="linear"
                repeatCount="indefinite"
                values="0 0; -720 0"
              />}
            </path>
            <rect x="0" y="176" width="1440" height="4" fill="#F7F7F7" />
          </svg>
        </div>
      </section>

      {/* 2. SERVICIOS PRINCIPALES */}
      <section id="servicios" className="relative scroll-mt-24 overflow-hidden bg-[#F7F7F7] py-12 sm:py-14 lg:py-16">
        <div className="pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full bg-[#EAF5FA] opacity-70 blur-3xl" aria-hidden />

        <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="grid items-start gap-9 lg:grid-cols-[1fr_1.1fr] lg:gap-12 xl:gap-16">
            <div className="home-section-intro max-w-[34rem]">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2A6D98]">Lo que podemos hacer</p>
              <h2 className="mt-4 font-display text-[2rem] font-extrabold leading-[1.06] tracking-[-0.05em] text-[#0B1B63] sm:text-[2.65rem] lg:text-[2.45rem]">
                <span className="block">Diseñamos la web que</span>
                <span className="block">tu negocio <span style={{ color: '#3E88AE' }}>se merece</span></span>
              </h2>
              <p className="mt-5 max-w-[22rem] font-sans text-[0.98rem] font-medium leading-[1.7] text-[#1F3572]">
                Tú conoces tu negocio mejor que nadie. Nosotros nos encargamos de convertirlo en una web hecha a tu medida.
              </p>
              <RouterLink
                to="/contacto"
                id="cta_services_overview"
                onClick={() => (window as any).dataLayer?.push({
                  event: 'cta_click',
                  cta_id: 'services_overview',
                  cta_text: 'Ver cómo puedo ayudarte',
                  page_path: window.location.pathname
                })}
                className="brand-button brand-button--dark-soft mt-7 inline-flex items-center gap-3 px-6 py-3.5 font-sans text-[0.98rem] font-semibold"
              >
                Ver cómo puedo ayudarte <ArrowRight size={17} />
              </RouterLink>
            </div>

            <div className="mx-auto w-full max-w-[42rem] border-b border-[#C8DDEA] lg:max-w-none">
              {homeServiceCards.map((item, index) => (
                <article
                  key={item.key}
                  onMouseEnter={() => {
                    if (!item.hoverAnimationSrc || reduceMotion) return;
                    setServiceAnimationReady(false);
                    setServiceAnimationRun((run) => run + 1);
                    setHoveredServiceKey(item.key);
                  }}
                  onMouseLeave={() => item.hoverAnimationSrc && setHoveredServiceKey(null)}
                  className="group relative flex items-center gap-3 border-b border-[#C8DDEA] py-6 last:border-b-0 sm:gap-4 sm:py-7"
                >
                  <span className="hidden w-6 shrink-0 font-display text-sm font-extrabold text-[#3E88AE] sm:block sm:text-base">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="relative h-12 w-12 shrink-0 sm:h-16 sm:w-16 lg:h-14 lg:w-14 xl:h-16 xl:w-16">
                    <img
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className={`absolute inset-0 h-full w-full object-contain ${hoveredServiceKey === item.key && serviceAnimationReady ? 'opacity-0' : 'opacity-100'}`}
                    />
                    {item.hoverAnimationSrc && hoveredServiceKey === item.key && serviceAnimationRun > 0 ? (
                      <img
                        key={`${item.key}-service-hover-${serviceAnimationRun}`}
                        className={`absolute inset-0 h-full w-full object-contain ${hoveredServiceKey === item.key && serviceAnimationReady ? 'opacity-100' : 'opacity-0'}`}
                        src={`${item.hoverAnimationSrc}?v=3&run=${serviceAnimationRun}`}
                        alt=""
                        aria-hidden="true"
                        decoding="async"
                        fetchPriority="high"
                        onLoad={() => item.key === hoveredServiceKey && setServiceAnimationReady(true)}
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-[1.25rem] font-extrabold leading-[1.15] tracking-[-0.035em] text-[#0B1B63] sm:text-[1.5rem]">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 max-w-[31rem] text-sm font-medium leading-[1.55] text-[#526477] sm:text-[0.95rem]">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROYECTOS: carrusel horizontal con resultado por proyecto */}
      <ProyectosRecientes />

      {/* 4. PROCESO DE TRABAJO */}
      <HomeProcess />

      {/* 6. TESTIMONIOS */}
      <section id="opiniones" aria-labelledby="reviews-heading" className="relative scroll-mt-24 overflow-hidden bg-[#0B1B63] py-14 text-white sm:py-16 md:py-20">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-[#1C78B6]/20 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-52 -left-36 h-[25rem] w-[25rem] rounded-full bg-[#3E88AE]/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-[100rem]">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-[42rem] px-5 text-center sm:px-6 lg:px-8"
          >
            <h2 id="reviews-heading" className="font-display text-[1.85rem] font-extrabold leading-[1.08] tracking-[-0.032em] text-white sm:text-[2rem] lg:text-[2.15rem] xl:text-[2.32rem]">
              <span className="block">Gente real.</span>
              <span className="block text-[#9ED6F1]">Opiniones reales.</span>
            </h2>
          </m.div>

          <div className="reviews-stream-viewport relative mt-10 sm:mt-11" role="region" tabIndex={0} aria-label="Reseñas de clientes">
            <div className="reviews-stream flex w-max gap-6 pl-5 pr-5 sm:gap-8 sm:pl-[max(1.5rem,calc((100vw-96rem)/2))] sm:pr-0 lg:gap-10">
              {[...reviews, ...reviews].map((review, index) => {
                const isDuplicate = index >= reviews.length;

                return (
                  <article
                    key={`${review.name}-${index}`}
                    aria-hidden={isDuplicate}
                    className="w-[min(82vw,22rem)] shrink-0 border-l border-white/20 pl-5 sm:w-[24rem] sm:pl-6 lg:w-[27rem] lg:pl-7"
                  >
                    <div className="flex gap-1" aria-label="5 de 5 estrellas">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-[#FFB800] text-[#FFB800]" strokeWidth={0} aria-hidden="true" />
                      ))}
                    </div>
                    <blockquote className="mt-5 min-h-[8.2rem] font-display text-[1.18rem] font-extrabold leading-[1.27] tracking-[-0.018em] text-white sm:text-[1.28rem]">
                      “{review.text}”
                    </blockquote>
                    <div className="mt-7 flex items-center gap-3">
                      <span className="flex h-[3.65rem] w-[3.65rem] shrink-0 items-end justify-center overflow-hidden rounded-full bg-white/[0.09] ring-1 ring-inset ring-white/10">
                        <img
                          src={review.avatar}
                          alt=""
                          aria-hidden="true"
                          className="h-[3.7rem] w-[3.7rem] object-contain"
                          loading="lazy"
                          decoding="async"
                        />
                      </span>
                      <div>
                        <p className="text-[0.94rem] font-extrabold leading-[1.3] text-white sm:text-[1rem]">{review.name}</p>
                        <p className="mt-1 text-[0.8rem] font-medium leading-[1.35] text-white/60 sm:text-[0.84rem]">{review.profession}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <m.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-11 flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-white/15 px-5 pt-5 text-[0.94rem] font-semibold text-white/75 sm:mt-13 sm:px-6 lg:px-8"
          >
            <div className="flex items-center gap-2">
              <Star className="h-[1.15rem] w-[1.15rem] fill-[#FFB800] text-[#FFB800]" strokeWidth={0} aria-hidden="true" />
              <span>5,0 en Google</span>
            </div>
            <span className="text-white/30" aria-hidden="true">/</span>
            <span>+120 clientes satisfechos</span>
          </m.div>
        </div>
      </section>



      {/* 8. SUPPORT TEASER */}
      <section id="soporte-web" aria-labelledby="support-heading" className="relative scroll-mt-24 bg-[#F7F7F7] py-12 sm:py-14 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="home-support-intro">
            <h2 id="support-heading" className="max-w-[36rem] font-display text-[1.9rem] font-extrabold leading-[1.1] tracking-[-0.035em] text-[#0B1B63] sm:text-[2.25rem] lg:text-[2.55rem]">
              Nos ocupamos también <span className="inline-block text-[#3E88AE]">del después</span>
            </h2>
            <p className="mt-4 text-[0.98rem] font-medium leading-[1.65] text-[#425776]">
              Hosting y mantenimiento para que tu web siga funcionando después del lanzamiento.
            </p>
          </div>
          <div className="home-support-plans">
            {supportPlans.map(plan => (
              <article key={plan.title} className="home-support-card">
                <div className="home-support-top">
                  <h3 className="font-display">{plan.title}</h3>
                  <p className="home-support-price"><strong className="font-display">{plan.price}</strong><small>+ IVA</small></p>
                </div>
                <p className="home-support-description">{plan.description}</p>
                <ul className="home-support-features">
                  {plan.features.map(({ label }) => (
                    <li key={label} className="home-support-feature">
                      <Check strokeWidth={1.8} aria-hidden="true" />
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="home-support-action">
            <RouterLink to="/hosting-mantenimiento-web#planes" className="brand-button brand-button--outline inline-flex min-h-12 items-center justify-center gap-3 px-7 py-3.5 font-semibold">
              Ver los planes <ArrowRight size={17} aria-hidden="true" />
            </RouterLink>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section id="faq" aria-labelledby="faq-heading" className="relative scroll-mt-24 overflow-hidden bg-[#163A70] pb-12 pt-10 sm:pb-14 sm:pt-12 md:pb-16 md:pt-14">
        <div className="pointer-events-none absolute -left-40 -top-44 h-[32rem] w-[42rem] rounded-[48%] bg-[#2C6598]/75 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-52 -right-40 h-[30rem] w-[30rem] rounded-full bg-[#2479A8]/35 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          {[
            { left: '8%', top: '18%', size: 'h-1.5 w-1.5', delay: '0s' },
            { left: '17%', top: '66%', size: 'h-1.5 w-1.5', delay: '1.7s' },
            { left: '31%', top: '13%', size: 'h-1.5 w-1.5', delay: '3.1s' },
            { left: '46%', top: '83%', size: 'h-2 w-2', delay: '0.9s' },
            { left: '60%', top: '11%', size: 'h-1.5 w-1.5', delay: '2.4s' },
            { left: '73%', top: '28%', size: 'h-2 w-2', delay: '4.2s' },
            { left: '88%', top: '68%', size: 'h-1.5 w-1.5', delay: '1.1s' },
            { left: '94%', top: '16%', size: 'h-1.5 w-1.5', delay: '2.9s' },
            { left: '26%', top: '91%', size: 'h-1.5 w-1.5', delay: '4.8s' },
            { left: '69%', top: '91%', size: 'h-1.5 w-1.5', delay: '3.6s' },
            { left: '82%', top: '53%', size: 'h-1.5 w-1.5', delay: '0.4s' },
            { left: '52%', top: '8%', size: 'h-1.5 w-1.5', delay: '5.2s' },
            { left: '4%', top: '47%', size: 'h-1 w-1', delay: '2.2s' },
            { left: '12%', top: '88%', size: 'h-1 w-1', delay: '5.7s' },
            { left: '23%', top: '34%', size: 'h-1 w-1', delay: '0.8s' },
            { left: '38%', top: '58%', size: 'h-1.5 w-1.5', delay: '3.9s' },
            { left: '57%', top: '43%', size: 'h-1 w-1', delay: '1.4s' },
            { left: '65%', top: '76%', size: 'h-1 w-1', delay: '5.1s' },
            { left: '78%', top: '9%', size: 'h-1 w-1', delay: '2.7s' },
            { left: '86%', top: '39%', size: 'h-1.5 w-1.5', delay: '4.6s' },
            { left: '98%', top: '86%', size: 'h-1 w-1', delay: '1.9s' },
            { left: '43%', top: '25%', size: 'h-1 w-1', delay: '6s' },
          ].map((star, index) => (
            <svg
              key={`faq-star-${index}`}
              viewBox="0 0 24 24"
              aria-hidden="true"
              className={`faq-star absolute ${star.size}`}
              style={{ left: star.left, top: star.top, animationDelay: star.delay }}
            >
              <path d="M12 1.5c.9 0 1.5 1.2 1.9 4.4.2 1.8.9 2.8 2.4 3.1 3.2.5 4.4 1.1 4.4 2s-1.2 1.5-4.4 2c-1.5.3-2.2 1.3-2.4 3.1-.4 3.2-1 4.4-1.9 4.4s-1.5-1.2-1.9-4.4c-.2-1.8-.9-2.8-2.4-3.1-3.2-.5-4.4-1.1-4.4-2s1.2-1.5 4.4-2c1.5-.3 2.2-1.3 2.4-3.1.4-3.2 1-4.4 1.9-4.4Z" />
            </svg>
          ))}
          <span className="faq-shooting-star absolute left-[66%] top-[13%]" aria-hidden="true" />
          <span className="faq-shooting-star faq-shooting-star--second absolute left-[31%] top-[35%]" aria-hidden="true" />
          <span className="faq-shooting-star faq-shooting-star--third absolute left-[78%] top-[56%]" aria-hidden="true" />
        </div>

        <div className="faq-side-character faq-side-character--left pointer-events-none absolute left-[-0.25rem] top-[48%] z-[2] hidden w-[9rem] lg:block xl:left-[0.5rem] xl:w-[11rem]" aria-hidden="true">
          <img
            src="/faq/faq-gardener-floating-v3.png"
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full"
          />
        </div>
        <div className="faq-side-character faq-side-character--right pointer-events-none absolute right-[-0.25rem] top-[39%] z-[2] hidden w-[9rem] xl:block xl:right-[0.5rem] xl:w-[9.5rem]" aria-hidden="true">
          <img
            src="/faq/faq-mechanic-floating-v3.png"
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full"
          />
        </div>
        <div className="faq-side-character faq-side-character--painter pointer-events-none absolute left-[2%] top-[74%] z-[1] hidden w-[5rem] lg:block xl:left-[38%] xl:top-[66%] xl:w-[6.75rem]" aria-hidden="true">
          <img
            src="/faq/faq-painter-floating.png"
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full"
          />
        </div>
        <div className="faq-floating-prop faq-floating-prop--plant pointer-events-none absolute left-[13%] top-[39%] z-[1] hidden w-[4rem] xl:block" aria-hidden="true">
          <img
            src="/faq/faq-floating-plant.png"
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full"
          />
        </div>
        <div className="faq-floating-prop faq-floating-prop--wrench pointer-events-none absolute right-[1%] top-[28%] z-[3] hidden w-[2.75rem] xl:block" aria-hidden="true">
          <img
            src="/faq/faq-floating-wrench.png"
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-14 xl:gap-20">
            <m.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-center lg:sticky lg:top-28 lg:self-start lg:text-left"
            >
              <h2 id="faq-heading" className="mx-auto max-w-[32rem] font-display text-[1.9rem] font-extrabold leading-[1.06] tracking-[-0.035em] text-white sm:text-[2.25rem] lg:mx-0 lg:text-[2.55rem]">
                ¿Tienes dudas? <span className="block text-[#9ED6F1]">Te ayudamos</span>
              </h2>
              <p className="mx-auto mt-4 max-w-[24rem] font-sans text-[1.02rem] font-medium leading-[1.6] text-white/75 lg:mx-0">
                Respuestas claras para que sepas qué esperar antes de empezar tu proyecto.
              </p>

              <div className="faq-idea-float relative mx-auto mt-5 flex h-[11.5rem] w-full max-w-[19rem] items-center justify-center sm:mt-7 sm:h-[13rem] sm:max-w-[21rem] lg:mx-0 lg:mt-8 lg:h-[14rem] lg:max-w-[22rem]">
                <div className="faq-bulb-glow pointer-events-none absolute right-[21%] top-[-0.2rem] z-0 h-16 w-16 rounded-full" aria-hidden="true" />
                <div className="pointer-events-none absolute bottom-4 left-1/2 h-32 w-56 -translate-x-1/2 rounded-full bg-[#9ED6F1]/25 blur-3xl" aria-hidden="true" />
                <img
                  src="/seccion-2/faq-idea-character.png"
                  alt="Personaje de Icono Studio flotando junto a una bombilla"
                  loading="lazy"
                  decoding="async"
                  className="relative z-10 h-full w-full object-contain object-center drop-shadow-[0_18px_24px_rgba(0,0,0,0.22)]"
                />
              </div>
            </m.div>

            <div className="mx-auto w-full max-w-[43rem] overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#0B2B5F]/60 p-2 shadow-[0_24px_70px_-38px_rgba(0,0,0,0.58)] sm:p-3 lg:max-w-none">
              {faqs.map((faq, i) => {
                const isActive = activeFaq === i;
                const questionId = `faq-question-${i}`;
                const answerId = `faq-answer-${i}`;

                return (
                  <m.div
                    key={faq.q}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className={`group overflow-hidden rounded-[1.1rem] ${isActive ? 'bg-[#D8ECFB] shadow-[0_12px_28px_-22px_rgba(0,0,0,0.65)]' : ''}`}
                  >
                    <h3>
                      <button
                        type="button"
                        id={questionId}
                        aria-expanded={isActive}
                        aria-controls={answerId}
                        onClick={() => setActiveFaq(isActive ? null : i)}
                        className={`flex min-h-[4.75rem] w-full items-center justify-between gap-4 rounded-[1.1rem] px-3 py-4 text-left transition-[background-color,box-shadow,color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#9ED6F1] sm:px-5 sm:py-5 ${isActive ? 'bg-transparent text-[#0B1B63]' : 'hover:bg-white/[0.08]'}`}
                      >
                        <span className="flex min-w-0 items-center gap-3 sm:gap-4">
                          <span className={`shrink-0 font-display text-[0.76rem] font-extrabold tracking-[0.12em] transition-colors duration-300 ${isActive ? 'text-[#1C78B6]' : 'text-[#9ED6F1]'}`} aria-hidden="true">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className={`pr-2 font-sans text-[1.02rem] font-bold leading-[1.35] transition-colors sm:text-[1.08rem] ${isActive ? 'text-[#0B1B63]' : 'text-white/90'}`}>
                            {faq.q}
                          </span>
                        </span>
                        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isActive ? 'border-[#0B1B63] bg-[#0B1B63] text-white' : 'border-white/25 bg-white/10 text-white/70 group-hover:border-[#9ED6F1] group-hover:text-[#9ED6F1]'}`}>
                          <ChevronDown className={`h-[1.1rem] w-[1.1rem] transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} aria-hidden="true" />
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <m.div
                          id={answerId}
                          role="region"
                          aria-labelledby={questionId}
                          initial={{ height: 0, opacity: 0, y: -4 }}
                          animate={{ height: 'auto', opacity: 1, y: 0 }}
                          exit={{ height: 0, opacity: 0, y: -4 }}
                          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="px-4 pb-5 pt-0 text-[0.98rem] font-medium leading-[1.65] text-[#27396C] sm:px-5">
                            {faq.a}
                          </div>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </m.div>
                );
              })}
            </div>
          </div>
        </div>

      </section>

      {/* 10. CONTACT */}
      <section id="contacto" className="relative scroll-mt-24 overflow-hidden bg-[#D8ECFB] pb-28 pt-8 sm:py-10 md:pb-44 md:pt-8 lg:py-12">
        <div className="pointer-events-none absolute -right-32 -top-36 h-[28rem] w-[28rem] rounded-full bg-white/45 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-44 left-[14%] h-[22rem] w-[30rem] rounded-full bg-[#9ED6F1]/45 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[43rem] text-center">
            <h2 className="mt-0 font-display text-[2rem] font-extrabold leading-[1.06] tracking-[-0.04em] text-[#0B1B63] sm:text-[2.45rem] lg:text-[2.75rem]">
              Tu nueva web <span style={{ color: '#3E88AE' }}>empieza aquí</span>
            </h2>
            <p className="mx-auto mt-3 max-w-[32rem] text-[0.98rem] font-medium leading-[1.5] text-[#27396C] sm:text-[1.04rem]">
              Cuéntanos tu idea, aunque todavía no tengas todos los detalles. Te ayudamos a dar el siguiente paso.
            </p>
          </div>

          <div className="relative mx-auto mt-6 max-w-[64rem] pt-6 sm:mt-8 sm:pt-8 md:max-w-[34rem] md:pt-6 lg:mt-9 lg:max-w-[64rem] lg:px-[10.25rem] lg:pt-0">
            <div className="contact-club-companion contact-club-companion--painter pointer-events-none absolute bottom-[-11.25rem] left-[-6.5rem] top-auto z-[5] hidden w-[6.5rem] md:block lg:bottom-[-5.75rem] lg:left-[-8.75rem] lg:w-[7.5rem]" aria-hidden="true">
              <img
                src="/contact/contact-club-painter.png"
                alt=""
                loading="lazy"
                decoding="async"
                className="w-full"
              />
            </div>

            <div className="contact-club-companion contact-club-companion--gardener pointer-events-none absolute bottom-[-11.25rem] left-[1rem] top-auto z-[5] hidden w-[6.5rem] md:block lg:bottom-[-5.75rem] lg:left-[-3rem] lg:w-[7.5rem]" aria-hidden="true">
              <img
                src="/contact/contact-club-gardener.png"
                alt=""
                loading="lazy"
                decoding="async"
                className="w-full"
              />
            </div>

            <div className="contact-club-companion contact-club-companion--architect pointer-events-none absolute bottom-[-11.25rem] left-[8.5rem] right-auto top-auto z-[5] hidden w-[6.5rem] md:block lg:bottom-[-5.75rem] lg:left-auto lg:right-[-9.25rem] lg:w-[7.5rem]" aria-hidden="true">
              <img
                src="/contact/contact-club-architect.png"
                alt=""
                loading="lazy"
                decoding="async"
                className="w-full"
              />
            </div>

            <div className="contact-club-character pointer-events-none absolute bottom-[-6.75rem] right-1 top-auto z-10 mb-0 w-[5rem] max-w-none sm:bottom-[-7rem] sm:right-4 sm:w-[6rem] md:bottom-[-11.25rem] md:right-[-6.5rem] md:w-[9rem] lg:right-[-2rem] lg:bottom-[-5.75rem] lg:w-[16rem]">
              <img
                src="/contact/contact-club-mascot-v5.png"
                alt="Personaje de Icono Studio asomándose con una expresión amable y el pulgar arriba"
                loading="lazy"
                decoding="async"
                className="w-full"
              />
            </div>

            <div className="contact-club-form relative z-20 overflow-hidden rounded-[1.5rem] border border-white/90 bg-white shadow-[0_24px_65px_rgba(11,27,99,0.16)] sm:rounded-[1.75rem]">
              <div className="p-4 sm:p-6 lg:p-6">
              {isSubmitted ? (
                <div className="py-10 text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#9ED6F1]">
                    <Check size={28} className="text-[#0B1B63]" strokeWidth={2.5} />
                  </div>
                  <h3 className="mb-3 font-display text-[1.3rem] font-extrabold text-[#0B1B63]">Solicitud enviada</h3>
                  <p className="mb-6 text-[0.92rem] font-medium leading-relaxed text-[#536583]">
                    Gracias por contarnos tu proyecto. Te responderemos lo antes posible.
                  </p>
                  <a
                    href="https://wa.me/34623783129"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brand-button brand-button--dark inline-flex items-center gap-2 px-7 py-3 text-[0.88rem] font-bold"
                  >
                    Hablar por WhatsApp <Send size={14} />
                  </a>
                </div>
              ) : (
                <>
                  <HomeContactForm
                    values={formData}
                    busy={isSubmitting}
                    error={formError}
                    onChange={handleInputChange}
                    onSubmit={handleSubmit}
                  />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        </section>
      </main>

      <Footer hideCTA={true} />
    </div>
    </MotionConfig>
  );
}
