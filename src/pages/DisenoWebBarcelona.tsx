import React, { useState, useEffect, useMemo } from 'react';
// motion and AnimatePresence imports removed
import { Link as RouterLink } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowUpRight,
  Check, 
  Star, 
  MonitorSmartphone, 
  Search, 
  MessageSquare, 
  Rocket, 
  ShieldCheck, 
  LayoutTemplate, 
  FileText, 
  ChevronDown, 
  ChevronUp,
  Palette,
  Smartphone,
  MousePointer2,
  Send,
  Users,
  Briefcase,
  Layers,
  Zap,
  Globe,
  Plus,
  Minus,
  CheckCircle2,
  X,
  ZapOff,
  Phone,
  Clock,
  Heart,
  ExternalLink,
  Camera,
  Coffee,
  Scale,
  ShoppingBag,
  GraduationCap,
  MapPin,
  Hammer,
  User,
  CheckSquare
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { portfolioProjects } from '../data/projects';
import { debugLeadFormButtonClick, debugLeadFormInvalid, debugLeadFormSubmitCapture, redirectToLeadThankYouPage, submitLeadForm } from '../lib/analytics';
import SeoHead from '../components/SeoHead';
import { absoluteUrl, siteConfig } from '../lib/site';

export default function DisenoWebBarcelona() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activePricingIndex, setActivePricingIndex] = useState(0);

  const [formData, setFormData] = useState({
    nombre: '',
    whatsapp: '',
    email: '',
    negocio: '',
    ciudad: '',
    necesidad: '',
    presupuesto: '',
    mensaje: '',
    privacidad: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await submitLeadForm('contact_barcelona_ads', formData);
      
      if (response.ok) {
        redirectToLeadThankYouPage();
        return;
      } else {
        alert(response.data?.message || 'Hubo un error al enviar. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      alert('Error de conexión.');
    }
  };

  const projects = portfolioProjects || [];
  const featuredProjects = projects.filter(p => 
    ['dogcat-madrid-veterinaria', 'instalaciones-torrijos-fontaneria', 'libreria-garcia-lorca'].includes(p.id as string)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToForm = () => {
    document.getElementById('vlc-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const faqs = [
    { q: "¿Cuánto cuesta una página web?", a: "Depende del tipo de proyecto, pero una web básica empieza desde 350 € + IVA." },
    { q: "¿Cuánto tardas en hacerla?", a: "Una web sencilla suele estar lista en 1–3 semanas, dependiendo del contenido y revisiones." },
    { q: "¿Tengo que tener textos y fotos?", a: "No necesariamente. Podemos ayudarte con los textos base y usar imágenes de stock si no tienes material propio." },
    { q: "¿La web será mía?", a: "Sí. Te entregamos tu web publicada y organizada." },
    { q: "¿Incluyes hosting o mantenimiento?", a: "Sí, podemos encargarnos del hosting y soporte mensual si quieres despreocuparte." },
    { q: "¿Trabajas solo en Barcelona?", a: "No. Trabajamos con clientes de Barcelona y de toda España." }
  ];

  const barcelonaSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "name": "Diseño Web Barcelona | Icono Studio",
        "url": `${siteConfig.url}/diseno-web-barcelona`,
        "description": "Servicio de diseño web en Barcelona para negocios que necesitan una web rápida, cuidada y orientada a captar clientes.",
        "image": absoluteUrl(siteConfig.defaultOgImage),
        "areaServed": ['Barcelona', 'España'],
        "serviceType": ['Diseño web', 'Landing pages', 'SEO inicial', 'Soporte web'],
        "telephone": siteConfig.phoneDisplay,
        "email": siteConfig.email,
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a,
          },
        })),
      },
    ],
  };

  const workProcess = [
    { 
      step: "01", 
      title: "Briefing inicial", 
      desc: "Entendemos tu negocio, tus objetivos y qué necesita comunicar tu web.",
      img: "/images/metodologia/formulario.png"
    },
    { 
      step: "02", 
      title: "Estructura y contenido", 
      desc: "Organizamos las páginas, secciones y mensajes principales.",
      img: "/images/metodologia/construccion.png"
    },
    { 
      step: "03", 
      title: "Diseño y desarrollo", 
      desc: "Creamos una web cuidada, rápida y adaptada a móvil.",
      img: "/images/metodologia/diseno.png"
    },
    { 
      step: "04", 
      title: "Revisión contigo", 
      desc: "Te presentamos la web y aplicamos los ajustes necesarios.",
      img: "/images/metodologia/revision.png"
    },
    { 
      step: "05", 
      title: "Publicación y soporte", 
      desc: "Publicamos la web, configuramos lo esencial y te dejamos todo preparado.",
      img: "/images/metodologia/lanzamiento.png"
    }
  ];

  const mainServices = [
    { 
      title: "Diseño a medida", 
      desc: "Creamos una web adaptada a tu negocio, tu sector y tus objetivos. Nada de plantillas genéricas sin personalidad.",
      icon: Palette,
      color: "blue"
    },
    { 
      title: "Perfecta en móvil", 
      desc: "Tu web se verá clara, rápida y cómoda desde cualquier dispositivo.",
      icon: Smartphone,
      color: "lime"
    },
    { 
      title: "SEO inicial", 
      desc: "Preparamos títulos, estructura, URLs y textos para que Google entienda mejor tu negocio desde el primer día.",
      icon: Search,
      color: "blue"
    },
    { 
      title: "Textos incluidos", 
      desc: "Te ayudamos a explicar tus servicios de forma clara, profesional y orientada a generar confianza.",
      icon: FileText,
      color: "dark"
    },
    { 
      title: "Contacto directo", 
      desc: "Integramos WhatsApp, teléfono, email o formularios para que tus clientes puedan contactarte fácilmente.",
      icon: MessageSquare,
      color: "blue"
    },
    { 
      title: "Soporte real", 
      desc: "Te acompañamos durante el proceso y dejamos tu web preparada para publicarse sin líos técnicos.",
      icon: Rocket,
      color: "lime"
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
    { name: "Elena Navarro", date: "Hace 8 meses", text: "Son unos cracks. Me ayudaron a modernizar la imagen de mi empresa con una web súper profesional y adaptada a móvil.", source: "Google", rating: 5 },
    { name: "Pablo Sánchez", date: "Hace 9 meses", text: "Totalmente recomendables. Precio competitivo y un resultado de muchísima calidad. ¡Gracias!", source: "Google", rating: 5 },
    { name: "Ana Morales", date: "Hace 10 meses", text: "Buscaba a un equipo de confianza para rehacer mi web y lo encontré. Comunicación fluida y trabajo de 10.", source: "Google", rating: 5 },
    { name: "Sergio Romero", date: "Hace 11 meses", text: "Muy perfeccionistas. Se nota que les apasiona su trabajo. La web carga rapidísimo y el diseño es espectacular.", source: "Google", rating: 5 },
    { name: "Lucía Torres", date: "Hace 11 meses", text: "Me hicieron los proyectos perfectos. Minimalista, elegante y justo lo que necesitaba para mostrar mis trabajos.", source: "Google", rating: 5 },
    { name: "Raúl Gil", date: "Hace 1 año", text: "Atención al cliente inmejorable. El equipo te acompaña en todo el proceso y te explica todo de forma sencilla.", source: "Google", rating: 5 },
    { name: "Carmen Vargas", date: "Hace 1 año", text: "La mejor inversión para mi negocio. Desde que lanzamos la nueva web, he notado un aumento en los contactos.", source: "Google", rating: 5 },
    { name: "Diego Castro", date: "Hace 1 año", text: "Rápidos, eficientes y con mucho gusto para el diseño. Sin duda volveré a contar con ellos para futuros proyectos.", source: "Google", rating: 5 }
  ];

  const sectors = [
    "Clínicas y centros de salud", "Empresas de reformas", "Fotógrafos y creativos", "Restaurantes y cafeterías", 
    "Abogados y asesores", "Tiendas y comercios locales", "Empresas de servicios", "Academias y formación"
  ];

  const starData = useMemo(() => {
    return [...Array(12)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5
    }));
  }, []);

  return (
    <div className="valencia-page barcelona-page min-h-screen bg-white font-sans text-brand-dark selection:bg-brand-lime selection:text-brand-dark overflow-x-hidden">
      <SeoHead
        title="Diseño Web Barcelona | Páginas Web Profesionales | Icono Studio"
        description="Diseñamos páginas web en Barcelona rápidas, cuidadas y preparadas para convertir visitas en clientes. SEO inicial, diseño adaptable y trato directo."
        path="/diseno-web-barcelona"
        type="service"
        schema={barcelonaSchema}
      />

      <Navbar ctaHref="#vlc-form" />

      {/* 1. HERO - MAXIMUM SEO & CONVERSION */}
      <section id="vlc-hero" className="relative pt-32 pb-12 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center overflow-hidden bg-brand-dark text-white z-20 rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-2xl">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/30 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute inset-0 opacity-[0.03] bg-blueprint"></div>
          {starData.map((star, i) => (
            <div 
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                animationDelay: `${star.delay}s`,
                opacity: 0.4
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center w-full max-w-5xl mx-auto">
          <h1 className="font-display text-[11vw] xs:text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tighter uppercase mb-6 sm:mb-8">
            <span className="block text-brand-lime text-[10px] sm:text-base md:text-lg font-black tracking-[0.4em] mb-3">DISEÑO WEB EN BARCELONA</span>
            <span className="block">Webs que convierten</span>
            <span className="text-brand-lime italic block">visitas en clientes</span>
          </h1>
          
          <p className="text-base md:text-xl max-w-3xl text-white/70 font-medium mb-10 sm:mb-12 leading-relaxed">
            Diseñamos páginas web en Barcelona rápidas, cuidadas y preparadas para que tu negocio transmita confianza, aparezca mejor en Google y reciba más contactos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
            <button 
              onClick={scrollToForm}
              className="bg-brand-lime text-brand-dark px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(212,255,0,0.25)]"
            >
              Pedir presupuesto gratis <ArrowRight size={16} />
            </button>
            <a 
              href="https://wa.me/34623783129" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white hover:text-brand-dark transition-all flex items-center justify-center gap-3"
            >
              Hablar por WhatsApp <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR - LOCAL PROOF */}
      <section id="vlc-trust" className="relative z-30 -mt-6 md:-mt-10 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-4 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-2">
          {[
            { label: "Respuesta", val: "Menos de 24h", icon: Clock },
            { label: "Adaptables", val: "100% Móvil", icon: Smartphone },
            { label: "Desde Barcelona", val: "Trato directo", icon: Heart },
            { label: "Optimización", val: "SEO inicial", icon: Search }
          ].map((item, i) => (
            <div key={i} className="flex md:flex-col items-center md:text-center px-1 md:px-4 md:border-r last:border-r-0 border-gray-100 gap-3 md:gap-0">
              <item.icon size={20} className="text-brand-blue md:mb-3 opacity-80 shrink-0" />
              <div className="flex flex-col items-start md:items-center text-left md:text-center">
                <p className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-gray-400 mb-0.5 md:mb-1 leading-none">{item.label}</p>
                <p className="text-[13px] md:text-base font-bold text-brand-dark uppercase tracking-tight leading-tight">{item.val}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PROBLEMA - PREMIUM VISUAL DIAGNOSTIC */}
      <section id="vlc-problem" className="py-12 md:py-20 bg-white overflow-hidden border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="vlc-problem-grid flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Text Content */}
            <div className="lg:w-1/2 w-full order-1 lg:order-1">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-brand-dark font-black text-[10px] uppercase tracking-[0.2em]">
                    DISEÑO WEB EN BARCELONA
                  </span>
                </div>
                <div className="w-12 h-[2px] bg-brand-lime mb-8"></div>
              </div>
              
              <h2 className="font-display uppercase text-2xl md:text-4xl leading-[1.1] tracking-tight text-brand-dark mb-8">
                <span className="italic font-normal">No basta</span> con que <br className="hidden lg:block" />
                tu web se vea bien.
              </h2>
              
              <p className="text-[16px] md:text-[18px] text-gray-500 font-medium leading-relaxed mb-12 max-w-lg">
                Si tu página carga lenta, no se entiende en móvil o no guía al usuario hacia el contacto, estás perdiendo oportunidades cada día.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                {[
                  { t: "Carga lenta", d: "Pierdes visitas antes de empezar", i: Clock },
                  { t: "No Adaptable a móvil", d: "La experiencia falla en móvil", i: Smartphone },
                  { t: "Mala estructura", d: "El usuario no sabe qué hacer", i: Layers },
                  { t: "No genera contactos", d: "La visita entra, mira y se va.", i: ZapOff }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-red-50/50 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                      <item.i size={20} />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-black text-xs uppercase text-brand-dark tracking-[0.15em] flex items-center gap-2">
                        {item.t}
                        <div className="w-1 h-1 rounded-full bg-red-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </h4>
                      <p className="text-[13px] text-gray-500 font-medium leading-tight">
                        {item.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Column: Premium Illustration */}
            <div className="lg:w-1/2 w-full order-2 lg:order-2">
              <div className="relative aspect-[4/3] flex items-center justify-center perspective-1000">
                <div className="relative w-full h-full flex items-center justify-center">
                  
                  {/* Desktop Mockup (Geometric & Modern) */}
                  <div className="w-[85%] aspect-video bg-white rounded-lg md:rounded-2xl border border-gray-200 shadow-[0_40px_100px_rgba(0,0,0,0.08)] relative z-10 flex flex-col overflow-hidden">
                    {/* Browser Header */}
                    <div className="h-4 md:h-7 bg-zinc-50 border-b border-gray-100 flex items-center px-2 md:px-4 justify-between shrink-0">
                      <div className="flex gap-1 md:gap-1.5">
                        <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-gray-200"></div>
                        <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-gray-200"></div>
                        <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-gray-200"></div>
                      </div>
                      <div className="text-[5px] md:text-[8px] font-bold text-gray-300 uppercase tracking-widest">www.web-lenta.es</div>
                      <div className="w-2 h-2 md:w-4 md:h-4 rounded bg-gray-100"></div>
                    </div>
                    {/* Wireframe Content with Minimalist Errors */}
                    <div className="p-2 md:p-5 flex-1 flex flex-col gap-2 md:gap-4">
                      <div className="flex justify-between items-center shrink-0">
                        <div className="h-1.5 md:h-3 w-1/4 bg-zinc-100 rounded-full"></div>
                        <div className="flex gap-1 md:gap-2">
                          <div className="h-1 md:h-2 w-4 md:w-8 bg-zinc-50 rounded-full"></div>
                          <div className="h-1 md:h-2 w-4 md:w-8 bg-zinc-50 rounded-full"></div>
                        </div>
                      </div>
                      
                      <div className="h-12 md:h-32 bg-zinc-50 rounded-md md:rounded-2xl border border-dashed border-gray-100 flex flex-col items-center justify-center relative overflow-hidden shrink-0">
                        {/* Spinning Loading Wheel */}
                        <div className="w-4 h-4 md:w-8 md:h-8 border-2 border-red-500/20 border-t-red-500 rounded-full mb-1 md:mb-3" />
                        <span className="text-[5px] md:text-[7px] font-black text-gray-300 uppercase mt-1 md:mt-2 tracking-[0.2em]">Cargando...</span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-1.5 md:gap-3 flex-1">
                        <div className="h-full bg-zinc-50 rounded-md md:rounded-xl relative overflow-hidden">
                           <div className="absolute top-1 md:top-2 left-1 md:left-2 w-1/2 h-1 md:h-1.5 bg-gray-100 rounded-full"></div>
                        </div>
                        <div className="h-full bg-red-50/30 rounded-md md:rounded-xl border border-red-100/50 flex items-center justify-center">
                          <X className="w-2.5 h-2.5 md:w-3 md:h-3 text-red-300" />
                        </div>
                        <div className="h-full bg-zinc-50 rounded-md md:rounded-xl"></div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Mockup (Navy / Dark) with Errors */}
                  <div className="absolute -bottom-4 right-[8%] w-[28%] aspect-[9/19] bg-brand-dark rounded-xl md:rounded-[2.5rem] border-[2px] md:border-4 border-gray-800 shadow-[0_30px_60px_rgba(0,0,0,0.2)] z-20 p-1 md:p-2.5 overflow-hidden flex flex-col">
                    <div className="w-[30%] h-0.5 md:h-1 bg-gray-800 rounded-full mx-auto mb-2 md:mb-5 shrink-0"></div>
                    <div className="flex-1 flex flex-col gap-1.5 md:gap-4 min-h-0">
                      {/* Broken Mobile Header */}
                      <div className="flex justify-between items-center opacity-30 shrink-0">
                        <div className="w-1/3 h-1 md:h-2 bg-white/20 rounded"></div>
                        <div className="w-1.5 h-1.5 md:w-4 md:h-4 border md:border-2 border-white/20 rounded-[1px] md:rounded-sm rotate-45"></div>
                      </div>
                      
                      {/* Content Overlap Error */}
                      <div className="relative pt-1 md:pt-4 shrink-0">
                        <div className="w-full h-4 md:h-12 bg-white/5 rounded md:rounded-lg mb-1 md:mb-3"></div>
                        <div className="w-[140%] h-8 md:h-24 bg-red-500/10 border border-red-500/30 md:border-2 rounded-md md:rounded-xl flex items-center justify-start pl-1 md:pl-4 relative -left-1 md:-left-2 shadow-2xl">
                          <div className="space-y-0.5 md:space-y-2 w-full">
                             <div className="w-1/2 h-0.5 md:h-2 bg-red-500/40 rounded"></div>
                             <div className="w-1/3 h-0.5 md:h-2 bg-red-500/40 rounded"></div>
                          </div>
                          <div className="absolute right-0.5 md:right-2 top-0.5 md:top-2 bg-red-500 text-white text-[3px] md:text-[6px] font-black px-0.5 md:px-1.5 py-[1px] md:py-0.5 rounded-sm uppercase">Error</div>
                        </div>
                      </div>

                      <div className="w-full flex-1 bg-white/5 rounded-md md:rounded-xl pt-2 md:pt-10 px-1.5 md:px-3 opacity-20">
                         <div className="w-full h-0.5 md:h-1.5 bg-white/10 rounded mb-1 md:mb-2"></div>
                         <div className="w-2/3 h-0.5 md:h-1.5 bg-white/10 rounded"></div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Badges / Labels — hidden on tablet */}
                  <div className="absolute inset-0 z-30 pointer-events-none hidden lg:block">
                    
                    {/* Badge 1: Carga lenta */}
                    <div className="absolute top-[8%] left-[0%] flex flex-col items-start group">
                      <div className="bg-white border border-gray-100 shadow-[0_10px_25px_rgba(0,0,0,0.05)] px-4 py-2 rounded-full flex items-center gap-3 relative z-10">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark">Carga lenta</span>
                        <Clock size={12} className="text-gray-300" />
                      </div>
                      {/* Curved Line */}
                      <div className="w-10 h-10 border-l-2 border-b-2 border-gray-100 rounded-bl-2xl -mt-2 ml-4 relative">
                        <div className="absolute -right-1 -bottom-1 w-2 h-2 bg-gray-200 rounded-full border-2 border-white shadow-sm"></div>
                      </div>
                    </div>

                    {/* Badge 2: No Adaptable a móvil */}
                    <div className="absolute bottom-[20%] left-[2%] flex flex-col items-start">
                      {/* Curved Line */}
                      <div className="w-12 h-12 border-l-2 border-t-2 border-gray-100 rounded-tl-2xl -mb-2 ml-6 relative order-1">
                        <div className="absolute -right-1 -top-1 w-2 h-2 bg-gray-200 rounded-full border-2 border-white shadow-sm"></div>
                      </div>
                      <div className="bg-white border border-gray-100 shadow-[0_10px_25px_rgba(0,0,0,0.05)] px-4 py-2 rounded-full flex items-center gap-3 relative z-10 order-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark">No Adaptable a móvil</span>
                        <Smartphone size={12} className="text-gray-300" />
                      </div>
                    </div>

                    {/* Badge 3: Sin jerarquía */}
                    <div className="absolute top-[18%] right-[-5%] flex flex-col items-end">
                      <div className="bg-white border border-gray-100 shadow-[0_10px_25px_rgba(0,0,0,0.05)] px-4 py-2 rounded-full flex items-center gap-3 relative z-10">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark">Sin jerarquía</span>
                        <Layers size={12} className="text-gray-300" />
                      </div>
                      {/* Curved Line */}
                      <div className="w-12 h-10 border-r-2 border-b-2 border-gray-100 rounded-br-2xl -mt-2 mr-6 relative">
                        <div className="absolute -left-1 -bottom-1 w-2 h-2 bg-gray-200 rounded-full border-2 border-white shadow-sm"></div>
                      </div>
                    </div>

                    {/* Badge 4: Mala conversión */}
                    <div className="absolute bottom-[5%] right-[20%] flex flex-col items-center">
                      <div className="bg-brand-dark text-white border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.2)] px-4 py-2 rounded-full flex items-center gap-3 relative z-10">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest">Mala conversión</span>
                        <ZapOff size={12} className="text-white/30" />
                      </div>
                    </div>

                  </div>

                  {/* Background Soft Shadows */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-zinc-50 rounded-full blur-[120px] -z-10 opacity-60"></div>
                </div>
              </div>
            </div>

          </div>
          
          <div className="mt-16 flex justify-center relative z-10">
            <button 
              onClick={scrollToForm}
              className="bg-brand-dark text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-brand-lime hover:text-brand-dark transition-all duration-300 flex items-center justify-center gap-3 shadow-xl"
            >
              Obtener presupuesto <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section id="vlc-services" className="py-12 md:py-16 bg-zinc-50 relative border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="vlc-services-grid flex flex-col lg:flex-row gap-10 lg:gap-16">
            
            {/* Left side: Sticky Title */}
            <div className="lg:w-1/3 lg:sticky lg:top-32 lg:h-fit">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-brand-dark font-black text-[10px] uppercase tracking-[0.2em]">
                    SERVICIOS INCLUIDOS
                  </span>
                </div>
                <div className="w-12 h-[2px] bg-brand-lime mb-8"></div>
              </div>
              <h2 className="font-display uppercase text-2xl md:text-4xl leading-[1.1] tracking-tight text-brand-dark mb-6">
                Una web preparada para <br className="hidden lg:block"/>
                <span className="italic font-normal">vender.</span>
              </h2>
              <p className="text-[16px] md:text-[18px] text-gray-500 font-medium leading-relaxed mb-10 lg:mb-12 max-w-sm">
                No solo diseñamos. Te acompañamos en todo el proceso para que tu negocio transmita una imagen impecable y profesional.
              </p>
              
              <div className="mb-12 lg:mb-0">
                <button 
                  onClick={scrollToForm}
                  className="bg-brand-dark text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-brand-lime hover:text-brand-dark transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-xl w-full sm:w-auto"
                >
                  Pedir presupuesto gratis <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Right side: Grid of Cards */}
            <div className="lg:w-2/3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {mainServices.map((s, i) => (
                  <div key={i} className="group p-5 rounded-[1.25rem] bg-white border border-gray-200/60 shadow-sm hover:border-brand-blue/10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 flex flex-col items-start">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-all duration-500 shadow-sm ${
                      s.color === 'blue' ? 'bg-brand-blue/5 text-brand-blue group-hover:bg-brand-blue group-hover:text-white' : 
                      s.color === 'lime' ? 'bg-brand-lime/10 text-brand-dark group-hover:bg-brand-lime group-hover:text-brand-dark' : 
                      'bg-brand-dark/5 text-brand-dark group-hover:bg-brand-dark group-hover:text-white'
                    }`}>
                      <s.icon size={20} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-base font-bold text-brand-dark mb-1.5 tracking-tight leading-tight group-hover:text-brand-blue transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECTORES - TARGETED REDESIGN */}
      <section id="vlc-sectors" className="py-14 sm:py-16 md:py-20 bg-white relative overflow-hidden border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="vlc-sectors-grid grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            
            {/* Left side: Sectors List */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-brand-dark font-black text-[10px] uppercase tracking-[0.2em]">
                  IMPULSANDO NEGOCIOS LOCALES
                </span>
              </div>
              <div className="w-12 h-[2px] bg-brand-lime mb-8"></div>
              
              <h2 className="font-display uppercase text-2xl md:text-4xl leading-[1.1] tracking-tight text-brand-dark mb-6">
                <span className="block md:whitespace-nowrap">Diseño web para</span>
                <span className="block md:whitespace-nowrap">negocios que quieren</span>
                <span className="block md:whitespace-nowrap italic font-normal">crecer online.</span>
              </h2>
              
              <p className="text-[16px] md:text-[18px] text-gray-500 font-medium leading-relaxed mb-10 max-w-[420px]">
                Trabajamos desde Barcelona con negocios de toda España, creando páginas web que transmiten confianza y ayudan a convertir visitas en contactos.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                {[
                  { name: "Clínicas y centros de salud", icon: Plus },
                  { name: "Empresas de reformas", icon: Hammer },
                  { name: "Fotógrafos y creativos", icon: Camera },
                  { name: "Restaurantes y cafeterías", icon: Coffee },
                  { name: "Abogados y asesores", icon: Scale },
                  { name: "Tiendas y comercios locales", icon: ShoppingBag },
                  { name: "Empresas de servicios", icon: Briefcase },
                  { name: "Academias y formación", icon: GraduationCap }
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-3 px-5 py-3 rounded-full bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-brand-blue/20 hover:shadow-md transition-all group">
                    <s.icon size={16} strokeWidth={1.5} className="text-brand-blue group-hover:scale-110 transition-transform" />
                    <span className="text-[12px] font-bold text-brand-dark">{s.name}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 lg:mt-12">
                <button 
                  onClick={scrollToForm}
                  className="bg-brand-dark text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-brand-lime hover:text-brand-dark transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-xl w-full sm:w-auto"
                >
                  Pedir presupuesto gratis <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Right side: Studio Card */}
            <div className="relative">
              <div className="bg-white rounded-[2rem] p-6 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-gray-100 relative overflow-hidden">
                {/* Decorative background globe */}
                <div className="absolute top-0 right-0 w-72 h-72 -mt-16 -mr-16 pointer-events-none z-0">
                  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="w-full h-full text-gray-300 opacity-60">
                    <circle cx="50" cy="50" r="48"/>
                    <ellipse cx="50" cy="50" rx="20" ry="48"/>
                    <line x1="50" y1="2" x2="50" y2="98"/>
                    <line x1="2" y1="50" x2="98" y2="50"/>
                    <ellipse cx="50" cy="50" rx="48" ry="20"/>
                  </svg>
                </div>

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 text-gray-600 text-[9px] font-black uppercase tracking-widest mb-8">
                    <MapPin size={10} strokeWidth={2.5} />
                    BARCELONA · ESTUDIO LOCAL
                  </div>
                  
                  <h3 className="font-display uppercase text-xl md:text-3xl text-brand-dark mb-4 leading-[1.1] tracking-tight max-w-[280px]">
                    Estudio local en Barcelona
                  </h3>
                  
                  <p className="text-[14px] text-gray-500 font-medium leading-relaxed mb-4 max-w-[360px]">
                    <span className="text-brand-dark font-black">Trato directo</span>, <span className="text-brand-dark font-black">respuesta cercana</span> y <span className="text-brand-dark font-black">soporte post-lanzamiento</span>. Diseñamos webs que transmiten confianza y ayudan a negocios de toda España a ganar presencia y captar más contactos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PORTFOLIO - SELECTED WORKS */}
      <section id="proyectos" className="vlc-portfolio pt-10 sm:pt-12 md:pt-14 pb-14 sm:pb-16 md:pb-20 bg-[#FAFAFA] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-8 sm:gap-10">
            <div className="max-w-2xl shrink-0">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-brand-dark font-black text-[10px] uppercase tracking-[0.2em]">
                  TRABAJOS DESTACADOS
                </span>
              </div>
              <div className="w-12 h-[2px] bg-brand-lime mb-8"></div>
              <h2 className="font-display uppercase text-2xl md:text-4xl leading-[1.1] tracking-tight text-brand-dark mb-4">
                Proyectos recientes <br />
                <span className="italic font-normal">diseño web Barcelona</span>
              </h2>
            </div>
            <RouterLink 
              to="/proyectos" 
              className="hidden lg:block text-xs font-black uppercase tracking-[0.3em] text-gray-400 hover:text-brand-dark transition-colors pb-2 border-b-2 border-gray-200 mb-2"
            >
              Ver todos los proyectos
            </RouterLink>
          </div>

          <div className="vlc-portfolio-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {featuredProjects.map((project) => (
              <div key={project.id}>
                <RouterLink 
                  to={`/proyecto/${project.id}`} 
                  className="group cursor-pointer flex flex-col"
                >
                  <div className="overflow-hidden rounded-2xl lg:rounded-3xl aspect-[3/4] mb-5 sm:mb-6 lg:mb-8 bg-gray-100 relative shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                    <img 
                      src={project.imgReto || project.img} 
                      alt={project.title} 
                      className="w-full h-full object-cover object-top transition-all duration-[5s] ease-in-out group-hover:object-bottom" 
                      referrerPolicy="no-referrer"
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
                </RouterLink>
              </div>
            ))}
          </div>

          {/* Mobile and iPad vertical centered link */}
          <div className="mt-12 flex justify-center lg:hidden">
            <RouterLink 
              to="/proyectos" 
              className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 hover:text-brand-dark transition-colors pb-2 border-b-2 border-gray-200"
            >
              Ver todos los proyectos
            </RouterLink>
          </div>
        </div>
      </section>

      {/* 7. PROCESO - ROADMAP */}
      <section id="vlc-process" className="py-12 md:py-16 bg-white overflow-hidden border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="vlc-process-grid grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 mb-10">
            
            {/* Left Column */}
            <div className="pt-4 lg:pt-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-brand-dark font-black text-[10px] uppercase tracking-[0.2em]">
                  PROCESO CLARO Y TRANSPARENTE
                </span>
              </div>
              <div className="w-12 h-[2px] bg-brand-lime mb-8"></div>
              
              <h2 className="font-display uppercase text-2xl md:text-4xl leading-[1.1] tracking-tight text-brand-dark mb-6">
                Así será el <br className="hidden lg:block"/>proceso para <br className="hidden lg:block"/>
                <span className="italic font-normal">crear tu web</span>
              </h2>
              
              <p className="text-[16px] md:text-[18px] text-gray-500 font-medium leading-relaxed mb-12 max-w-sm">
                Te guiamos en cada fase con un proceso definido, revisiones claras y acompañamiento directo para que todo avance con orden y confianza.
              </p>
              
              <div className="mt-10 lg:mt-12">
                <button 
                  onClick={scrollToForm}
                  className="bg-brand-dark text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-brand-lime hover:text-brand-dark transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-xl w-full sm:w-auto"
                >
                  Pedir presupuesto gratis <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Right Column: Timeline */}
            <div className="relative">
              <div className="flex flex-col relative z-10 w-full">
                {workProcess.map((step, i) => (
                  <div key={i} className="flex flex-col w-full">
                    <div className="w-full bg-white p-5 md:p-6 rounded-[1.25rem] border border-gray-100 shadow-sm flex items-center gap-5 md:gap-6 hover:border-brand-blue/30 hover:shadow-md transition-all duration-300">
                      <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 opacity-95">
                        <img src={step.img} alt={step.title} className="w-full h-full object-contain scale-[1.1]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-brand-dark text-[15px] md:text-[17px] mb-1 flex items-center gap-2">
                          <span className="text-brand-dark font-black">{step.step}.</span>
                          {step.title}
                        </h4>
                        <p className="text-[13px] text-gray-500 font-medium leading-relaxed max-w-[380px]">{step.desc}</p>
                      </div>
                    </div>
                    {i < workProcess.length - 1 && (
                      <div className="flex ml-12 md:ml-14 my-2">
                        <div className="w-[2px] h-4 bg-gray-200/70 rounded-full"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </section>


      {/* 9. PRECIOS */}
      <section id="planes" className="vlc-pricing py-12 sm:py-16 md:py-20 bg-[#FAFAFA] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-brand-dark rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3.5rem] p-6 sm:p-10 md:p-12 text-white relative overflow-hidden shadow-2xl">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-lime/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
          
          <div className="relative z-10 mb-8 sm:mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
            <div className="max-w-2xl">
              <h2 className="font-display uppercase text-2xl sm:text-3xl md:text-4xl tracking-tight mb-4 leading-[1.1] text-balance">
                Precios <span className="text-brand-lime italic">claros</span>, sin sorpresas.
              </h2>
            </div>
            <div className="md:w-1/3 md:pb-2">
              <p className="border-t border-brand-lime/20 pt-4 text-sm sm:text-lg text-white/70 font-light md:border-t-0 md:border-l-2 md:pt-0 md:pl-6">
                Tarifas transparentes para proyectos de alto rendimiento. Selecciona el pack que mejor se adapte a tu fase actual.
              </p>
            </div>
          </div>

          <div className="vlc-pricing-grid grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {/* Pack 1: Web Básica */}
            <div className="bg-white/5 border border-white/10 rounded-[1.6rem] sm:rounded-[2.5rem] p-6 sm:p-8 hover:bg-white/10 transition-all duration-300 flex flex-col group backdrop-blur-sm">
              <h3 className="font-display uppercase text-xl sm:text-2xl mb-2 text-white">Web básica</h3>
              <p className="text-white/50 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">Ideal para negocios que necesitan una presencia profesional online.</p>
              <div className="mb-5 sm:mb-6">
                <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-1 font-bold">Desde</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-display uppercase tracking-tight">350</span>
                  <span className="text-xl text-white/50">€ <span className="text-xs uppercase tracking-tighter opacity-50">+ IVA</span></span>
                </div>
              </div>
              <div className="w-full h-px bg-white/10 mb-5 sm:mb-6"></div>
              <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
                {['Diseño adaptable a móvil', 'Textos base', 'Formulario/contacto', 'SEO inicial', 'Publicación', 'WhatsApp integrado'].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-white/80 leading-tight">
                    <Check size={16} className="text-white/30 shrink-0 mt-0.5" /> <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={scrollToForm}
                className="w-full py-3.5 rounded-full border border-white/20 font-black text-white hover:bg-white hover:text-brand-dark transition-all duration-300 uppercase tracking-widest text-[9px] text-center"
              >
                Pedir presupuesto
              </button>
            </div>

            {/* Pack 2: Web Avanzada */}
            <div className="bg-gradient-to-b from-white/10 to-white/5 border border-brand-lime/40 rounded-[1.6rem] sm:rounded-[2.5rem] p-6 sm:p-8 shadow-[0_0_40px_rgba(204,255,0,0.1)] flex flex-col relative backdrop-blur-sm hover:border-brand-lime/60 transition-all duration-300">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-lime text-brand-dark text-[10px] font-black uppercase tracking-widest py-1 px-3 rounded-full shadow-lg whitespace-nowrap">
                Recomendado
              </div>
              <h3 className="font-display uppercase text-xl sm:text-2xl mb-2 text-white">Web avanzada</h3>
              <p className="text-white/60 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">Para webs con más páginas, estructura, catálogo o funcionalidades extra.</p>
              <div className="mb-5 sm:mb-6">
                <span className="text-[10px] text-brand-lime/80 uppercase tracking-widest block mb-1 font-bold">Desde</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-display uppercase tracking-tight text-brand-lime">500</span>
                  <span className="text-2xl text-brand-lime/50 px-1">–</span>
                  <span className="text-3xl sm:text-4xl font-display uppercase tracking-tight text-brand-lime">800</span>
                  <span className="text-xl text-white/50 ml-1">€ <span className="text-xs uppercase tracking-tighter opacity-50">+ IVA</span></span>
                </div>
              </div>
              <div className="w-full h-px bg-white/10 mb-5 sm:mb-6"></div>
              <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
                {['Estructura multi-página', 'Diseño y Experiencia a medida', 'Catálogo de servicios', 'Blog / Noticias', 'Panel autogestionable', 'Optimización SEO avanzada'].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-white/90 leading-tight">
                    <Check size={16} className="text-brand-lime shrink-0 mt-0.5" /> <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={scrollToForm}
                className="w-full py-3.5 rounded-full bg-brand-lime text-brand-dark font-black hover:bg-white transition-all duration-300 uppercase tracking-widest text-[9px] text-center shadow-[0_0_20px_rgba(204,255,0,0.3)]"
              >
                Pedir presupuesto
              </button>
            </div>

            {/* Pack 3: Proyecto a Medida */}
            <div className="bg-white/5 border border-white/10 rounded-[1.6rem] sm:rounded-[2.5rem] p-6 sm:p-8 hover:bg-white/10 transition-all duration-300 flex flex-col group backdrop-blur-sm">
              <h3 className="font-display uppercase text-xl sm:text-2xl mb-2 text-white">Proyecto a medida</h3>
              <p className="text-white/50 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">Para formularios avanzados, automatizaciones, pagos o necesidades especiales.</p>
              <div className="mb-5 sm:mb-6">
                <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-1 font-bold">Presupuesto</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-display uppercase tracking-tight">Personalizado</span>
                </div>
              </div>
              <div className="w-full h-px bg-white/10 mb-5 sm:mb-6"></div>
              <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
                {['Funcionalidades complejas', 'Áreas de cliente / Intranets', 'Integración con APIs', 'Automatizaciones', 'Tiendas online avanzadas', 'Soporte prioritario'].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-white/80 leading-tight">
                    <Check size={16} className="text-white/30 shrink-0 mt-0.5" /> <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={scrollToForm}
                className="w-full py-3.5 rounded-full border border-white/20 font-black text-white hover:bg-white hover:text-brand-dark transition-all duration-300 uppercase tracking-widest text-[9px] text-center"
              >
                Pedir presupuesto personalizado
              </button>
            </div>
          </div>
          
          <div className="mt-8 sm:mt-10 text-center relative z-10 border-t border-white/10 pt-5 sm:pt-6">
             <p className="text-white/40 text-[10px] sm:text-xs font-mono uppercase tracking-widest">* Todos los precios son sin IVA. El coste final dependerá de los requisitos exactos del proyecto.</p>
          </div>
        </div>
      </section>

      {/* 10. TESTIMONIOS - OPINIONES REALES */}
      <section id="opiniones" className="vlc-testimonials py-12 md:py-16 bg-zinc-50 overflow-hidden border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
            <div className="md:w-2/3">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-brand-dark font-black text-[10px] uppercase tracking-[0.2em]">
                  OPINIONES REALES
                </span>
              </div>
              <div className="w-12 h-[2px] bg-brand-lime mb-8"></div>
              <h2 className="font-display uppercase text-2xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-brand-dark mb-6">
                Lo que dicen <br className="hidden sm:block" />
                <span className="italic font-normal">nuestros clientes</span>
              </h2>
            </div>
            <div className="hidden lg:flex md:w-1/3 md:justify-end pb-2">
              <div className="flex items-center gap-5 bg-white px-6 py-4 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-display text-brand-dark leading-none">5.0</span>
                </div>
                <div className="w-px h-12 bg-gray-200"></div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wider text-[10px]">Valoración media</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col gap-4 sm:gap-6">
          <style>{`
            @keyframes scroll-left {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-scroll-left { animation: scroll-left 80s linear infinite; }
            .pause-on-hover:hover { animation-play-state: paused; }
          `}</style>

          {/* Fila única: Hacia la izquierda */}
          <div className="flex w-max animate-scroll-left pause-on-hover">
            {[1, 2].map((group) => (
              <div key={group} className="flex gap-4 sm:gap-6 px-2 sm:px-3">
                {reviews.map((review, idx) => (
                  <div key={idx} className="w-[280px] sm:w-[320px] bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm shrink-0 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-lime/10 flex items-center justify-center text-brand-dark font-black text-sm shrink-0">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-brand-dark text-sm leading-none">{review.name}</h4>
                          <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">{review.date}</p>
                        </div>
                      </div>
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </div>
                    <div className="flex text-yellow-400 mb-3">
                      {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 font-medium">
                      "{review.text}"
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Gradientes laterales para suavizar la entrada/salida */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-48 bg-gradient-to-r from-zinc-50 to-transparent pointer-events-none z-10"></div>
          <div className="absolute inset-y-0 right-0 w-16 sm:w-48 bg-gradient-to-l from-zinc-50 to-transparent pointer-events-none z-10"></div>
        </div>
      </section>

      {/* 11. SEO LOCAL - TEXT */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-brand-dark font-black text-[10px] uppercase tracking-[0.2em]">
              ALCANCE
            </span>
          </div>
          <div className="w-12 h-[2px] bg-brand-lime mb-6"></div>
          <h2 className="font-display uppercase text-2xl md:text-4xl leading-[1.1] tracking-tight text-brand-dark mb-6">
            Diseño web en <br/> <span className="italic font-normal">toda Barcelona</span>
          </h2>
          <p className="text-[15px] text-gray-500 font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
            Trabajamos con negocios de Barcelona y toda la provincia, coordinando reuniones presenciales o gestión 100% online para asegurar un resultado perfecto.
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {["Barcelona", "L'Hospitalet", "Badalona", "Sabadell", "Terrassa", "Sant Cugat", "Mataró", "Granollers", "Castelldefels", "Cornellà"].map((city) => (
              <span key={city} className="px-4 py-2 bg-zinc-50 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-100">
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FAQ - COMPACT */}
      <section id="vlc-faq" className="py-12 md:py-20 bg-zinc-50 overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center flex flex-col items-center">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-brand-dark font-black text-[10px] uppercase tracking-[0.2em]">
                DUDAS RESUELTAS
              </span>
            </div>
            <div className="w-12 h-[2px] bg-brand-lime mb-8"></div>
            <h2 className="font-display uppercase text-2xl md:text-4xl leading-[1.1] tracking-tight text-brand-dark">
              Preguntas <br className="hidden md:block"/><span className="italic font-normal">frecuentes</span>
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button 
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left group"
                >
                  <span className={`font-bold text-base sm:text-lg transition-colors uppercase tracking-tight leading-none ${activeFaq === index ? 'text-brand-dark italic' : 'text-brand-dark'}`}>{faq.q}</span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${activeFaq === index ? 'bg-brand-blue text-white rotate-180' : 'bg-zinc-50 text-gray-400'}`}>
                    <ChevronDown size={20} />
                  </div>
                </button>
                  {activeFaq === index && (
                    <div className="overflow-hidden">
                      <div className="px-10 pb-10 text-base text-gray-500 leading-relaxed font-medium border-t border-gray-50 pt-6">
                        {faq.a}
                      </div>
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. INTEGRATED FOOTER (FORM + LINKS) */}
      <div className="bg-brand-dark relative overflow-hidden border-t border-white/20">
        {/* Shared background elements */}
        <div className="absolute inset-0 opacity-[0.05] bg-blueprint"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-blue/10 to-transparent"></div>
        
        {/* Form Section */}
        <section id="vlc-form" className="py-16 sm:py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="vlc-form-grid grid lg:grid-cols-[0.7fr_1.3fr] gap-12 lg:gap-16 items-start">
              <div className="lg:sticky lg:top-32">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-brand-lime font-black text-[10px] uppercase tracking-[0.2em]">
                    TU PRÓXIMO PASO
                  </span>
                </div>
                <div className="w-12 h-[2px] bg-brand-lime mb-6"></div>
                <h2 className="font-display uppercase text-3xl md:text-5xl leading-[1.0] tracking-tight text-white mb-8">
                  TU NUEVA WEB <br/>
                  <span className="text-brand-lime italic font-normal">EMPIEZA AQUÍ</span>
                </h2>
                <p className="text-[15px] text-white/70 font-medium leading-relaxed mb-8 max-w-sm">
                  Cuéntanos qué necesitas y te responderemos con una orientación clara para crear una web profesional, cuidada y preparada para captar clientes.
                </p>
                
                <div className="grid grid-cols-1 gap-4 mb-8 pt-6 border-t border-white/10">
                  {[
                    { t: "Respuesta en menos de 24h", i: Clock },
                    { t: "Precio definido antes de empezar", i: FileText },
                    { t: "Atención personalizada", i: Heart }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs font-bold text-white/90">
                      <div className="w-6 h-6 rounded-lg bg-brand-lime/10 flex items-center justify-center text-brand-lime">
                        <item.i size={14} />
                      </div>
                      {item.t}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-5 md:p-7 rounded-[2.5rem] backdrop-blur-md shadow-2xl relative">
                {isSubmitted ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-brand-lime rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(204,255,0,0.2)]">
                      <Check size={32} className="text-brand-dark" />
                    </div>
                    <h3 className="font-display text-2xl uppercase mb-3 text-white italic">Solicitud enviada</h3>
                    <p className="text-white/60 text-base mb-6 leading-relaxed">
                      Gracias por contarnos tu proyecto. Te responderemos lo antes posible.
                    </p>
                    <a 
                      href="https://wa.me/34623783129" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex bg-brand-lime text-brand-dark px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all items-center gap-3 shadow-xl"
                    >
                      Hablar por WhatsApp <Send size={14} />
                    </a>
                  </div>
                ) : (
                  <>
                  <div className="mb-6">
                    <h3 className="font-display text-xl sm:text-2xl uppercase text-white italic tracking-tight leading-none mb-2">Pide tu presupuesto web</h3>
                    <p className="text-sm text-white/70 font-medium">Te responderemos con una propuesta clara y sin compromiso.</p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    onSubmitCapture={() => debugLeadFormSubmitCapture('contact_barcelona_ads')}
                    onInvalidCapture={(event) => {
                      const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
                      debugLeadFormInvalid('contact_barcelona_ads', target.name, target.validationMessage);
                    }}
                    className="space-y-3.5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="ui-form-label text-white/40 ml-1">Nombre</label>
                        <input 
                          type="text" 
                          name="nombre"
                          required
                          value={formData.nombre}
                          onChange={handleInputChange}
                          placeholder="Tu nombre" 
                          className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white placeholder:text-white/40 focus:border-brand-lime focus:outline-none transition-all" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="ui-form-label text-white/40 ml-1">Negocio / Marca</label>
                        <input 
                          type="text" 
                          name="negocio"
                          required
                          value={formData.negocio}
                          onChange={handleInputChange}
                          placeholder="Nombre de tu empresa" 
                          className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white placeholder:text-white/40 focus:border-brand-lime focus:outline-none transition-all" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="ui-form-label text-white/40 ml-1">WhatsApp / Teléfono</label>
                        <input 
                          type="tel" 
                          name="whatsapp"
                          required
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          placeholder="600 000 000" 
                          className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white placeholder:text-white/40 focus:border-brand-lime focus:outline-none transition-all" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="ui-form-label text-white/40 ml-1">Email</label>
                        <input 
                          type="email" 
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="hola@tuweb.com" 
                          className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white placeholder:text-white/40 focus:border-brand-lime focus:outline-none transition-all" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="ui-form-label text-white/40 ml-1">Tipo de web</label>
                        <select 
                          name="necesidad"
                          required
                          value={formData.necesidad}
                          onChange={handleInputChange}
                          className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white focus:border-brand-lime focus:outline-none transition-all appearance-none cursor-pointer"
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
                        <label className="ui-form-label text-white/40 ml-1">Presupuesto aproximado</label>
                        <select 
                          name="presupuesto"
                          required
                          value={formData.presupuesto}
                          onChange={handleInputChange}
                          className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white focus:border-brand-lime focus:outline-none transition-all appearance-none cursor-pointer"
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
                      <label className="ui-form-label text-white/40 ml-1">Cuéntanos qué necesitas</label>
                      <textarea 
                        name="mensaje"
                        required
                        rows={2} 
                        value={formData.mensaje}
                        onChange={handleInputChange}
                        placeholder="Ej: necesito una web para mi clínica, con imagen profesional, contacto por WhatsApp y preparada para captar clientes." 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-brand-lime focus:outline-none transition-all resize-none"
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
                      <label htmlFor="privacidad" className="text-[11px] text-white/55 leading-relaxed">
                        Acepto la{' '}
                        <RouterLink to="/politica-de-privacidad" className="text-brand-lime hover:text-white underline underline-offset-4">
                          política de privacidad
                        </RouterLink>{' '}
                        y autorizo a Icono Studio a contactar conmigo.
                      </label>
                    </div>

                    <button 
                      type="submit" 
                      onClick={() => debugLeadFormButtonClick('contact_barcelona_ads')}
                      className="w-full bg-brand-lime text-brand-dark h-12 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:scale-[1.02] transition-all shadow-xl shadow-brand-lime/20 mt-2 flex items-center justify-center gap-3"
                    >
                      Pedir presupuesto gratis <Send size={14} />
                    </button>

                    <p className="text-[9px] text-center text-white/40 font-bold uppercase tracking-widest pt-1">
                      O <a href="https://wa.me/34623783129" className="text-brand-lime hover:underline">escríbenos por WhatsApp</a> si prefieres hablarlo más rápido.
                    </p>
                  </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Subtle Divider */}

        <Footer hideCTA={true} />
      </div>
    </div>
  );
}
