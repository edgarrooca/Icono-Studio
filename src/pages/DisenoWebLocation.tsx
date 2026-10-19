import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, ChevronDown, CircleCheck, FileText, HeartHandshake, LayoutTemplate, MessageCircle, MonitorSmartphone, Search, Send, ShieldCheck, Star, Users } from 'lucide-react';
import { Navigate, useParams, Link as RouterLink } from 'react-router-dom';
import { seoLocations } from '../data/seoLocations';
import { portfolioProjects } from '../data/projects';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BudgetCalculator from '../components/BudgetCalculator';
import RelatedGuidesSection from '../components/RelatedGuidesSection';
import SeoHead from '../components/SeoHead';
import { blogSummariesSorted } from '../data/blogSummaries';
import { getBlogEntriesBySlugs } from '../lib/blogUtils';
import { getSpinVariation, spintaxData } from '../lib/spintax';
import { debugLeadFormButtonClick, debugLeadFormInvalid, debugLeadFormSubmitCapture, redirectToLeadThankYouPage, submitLeadForm } from '../lib/analytics';
import { absoluteUrl, siteConfig } from '../lib/site';
import { buildBreadcrumbSchema, buildOrganizationSchema, buildProviderReference } from '../lib/structuredData';

const inputClassName = 'w-full rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] px-4 py-3 text-sm font-medium text-[#0B1B63] outline-none transition-[border-color,box-shadow,background-color] placeholder:text-[#91A0B0] focus:border-[#2A6D98] focus:bg-white focus:ring-4 focus:ring-[#9ED6F1]/25';
const labelClassName = 'mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#51667A]';

const serviceItems = [
  { title: 'Diseño a medida', description: 'Una estructura y una imagen pensadas para explicar tu negocio con claridad.', icon: LayoutTemplate },
  { title: 'Perfecta en móvil', description: 'Una experiencia cómoda y rápida desde el dispositivo que utilicen tus clientes.', icon: MonitorSmartphone },
  { title: 'SEO inicial', description: 'Base técnica, textos y estructura preparados para que Google entienda tu negocio.', icon: Search },
  { title: 'Contacto directo', description: 'WhatsApp, teléfono, email y formularios donde el usuario espera encontrarlos.', icon: MessageCircle },
  { title: 'Contenido claro', description: 'Te ayudamos a convertir lo que sabes de tu negocio en mensajes fáciles de entender.', icon: FileText },
  { title: 'Acompañamiento', description: 'Seguimos cerca después de publicar para que no tengas que resolverlo todo solo.', icon: HeartHandshake },
];

const processItems = [
  { title: 'Nos conocemos', description: 'Entendemos tu negocio, tus objetivos y qué debe conseguir la web.', image: '/images/metodologia/formulario.webp' },
  { title: 'Ordenamos la idea', description: 'Definimos páginas, contenidos y llamadas a la acción sin complicarlo.', image: '/images/metodologia/construccion.webp' },
  { title: 'Diseñamos y desarrollamos', description: 'Creamos una web cuidada, rápida y adaptada a todos los dispositivos.', image: '/images/metodologia/diseno.webp' },
  { title: 'La revisamos contigo', description: 'Te enseñamos el resultado y ajustamos lo necesario antes de publicar.', image: '/images/metodologia/revision.webp' },
  { title: 'Publicamos y acompañamos', description: 'Dejamos todo preparado y seguimos disponibles después del lanzamiento.', image: '/images/metodologia/lanzamiento.webp' },
];

const pricingItems = [
  {
    title: 'Landing page',
    price: '350',
    description: 'Una página directa para presentar una oferta, servicio o campaña.',
    features: ['Página única optimizada', 'Diseño adaptable a móvil', 'Formulario de contacto', 'SEO inicial'],
  },
  {
    title: 'Web corporativa',
    price: '500 a 800',
    description: 'La opción equilibrada para explicar bien tu negocio y ganar autoridad.',
    features: ['Estructura multipágina', 'Diseño a medida', 'Optimización SEO', 'Panel autogestionable'],
    featured: true,
  },
  {
    title: 'Tienda o proyecto a medida',
    price: 'Desde 1.300',
    description: 'Para vender online o resolver necesidades más específicas de tu negocio.',
    features: ['Catálogo y pagos', 'Funciones personalizadas', 'Integraciones', 'Soporte post lanzamiento'],
  },
];

const reviews = [
  { name: 'Taller Lorigüilla S.L.', text: 'Muy amables y rápidos. El trato fue sencillo desde el primer momento.', source: 'Google' },
  { name: 'Cristian', text: 'Excelente servicio, rapidez y profesionalidad. Inmejorable precio.', source: 'Google' },
  { name: 'Yolanda Aldeguer', text: 'Cuidaron mucho el detalle y fueron fieles a lo que habíamos pedido.', source: 'Google' },
];

export default function DisenoWebLocation({ locationSlug }: { locationSlug?: string }) {
  const params = useParams();
  const slug = locationSlug || params.location;
  const location = seoLocations.find((item) => item.slug === slug);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    whatsapp: '',
    email: '',
    negocio: '',
    ciudad: location?.name || '',
    necesidad: '',
    presupuesto: '',
    mensaje: '',
    privacidad: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!location) {
    return <Navigate to="/" replace />;
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;

    if (type === 'checkbox') {
      const target = event.target as HTMLInputElement;
      setFormData((previous) => ({ ...previous, [name]: target.checked }));
      return;
    }

    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await submitLeadForm('contact_' + location.slug + '_ads', formData);

      if (response.ok) {
        setIsSubmitted(true);
        redirectToLeadThankYouPage('contact_' + location.slug + '_ads');
        return;
      }

      alert(response.data?.message || 'Hubo un error al enviar. Por favor, inténtalo de nuevo.');
    } catch {
      alert('Error de conexión.');
    }
  };

  const locationFaqs = location.faqs;
  const featuredProjects = portfolioProjects
    .filter((project) => ['dogcat', 'instalaciones-torrijos-fontaneria', 'libreria-garcia-lorca'].includes(project.id as string))
    .slice(0, 3);
  const locationGuides = getBlogEntriesBySlugs(blogSummariesSorted, [
    'seo-local-pequenas-empresas-guia-google-maps',
    'google-business-profile-google-my-business-checklist-maps',
    'como-conseguir-resenas-google-y-responderlas-bien',
  ]);

  const locationSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationSchema(),
      buildBreadcrumbSchema([
        { name: 'Inicio', path: '/' },
        { name: 'Diseño web ' + location.name },
      ]),
      {
        '@type': 'ProfessionalService',
        '@id': absoluteUrl('/diseno-web-' + location.slug + '#service'),
        name: 'Diseño Web ' + location.name + ' | ' + siteConfig.name,
        url: absoluteUrl('/diseno-web-' + location.slug),
        description: 'Servicio de diseño web en ' + location.name + ' para negocios que necesitan una web rápida, cuidada y orientada a captar clientes.',
        image: absoluteUrl('/home-hero-illustration-poster.png'),
        areaServed: [location.name, 'España'],
        serviceType: ['Diseño web', 'Landing pages', 'SEO inicial', 'Soporte web'],
        telephone: siteConfig.phoneDisplay,
        email: siteConfig.email,
        availableLanguage: ['es'],
        provider: buildProviderReference(),
      },
      {
        '@type': 'FAQPage',
        mainEntity: locationFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
    ],
  };

  const scrollToForm = () => {
    document.getElementById('vlc-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F7F9FC] font-sans text-[#0B1B63] selection:bg-[#9ED6F1]/40 selection:text-[#0B1B63]">
      <SeoHead
        title={'Diseño Web ' + location.name + ' | Páginas Web Profesionales | Icono Studio'}
        description={'Diseñamos páginas web en ' + location.name + ' rápidas, cuidadas y preparadas para convertir visitas en clientes. SEO inicial, diseño adaptable y trato directo.'}
        path={'/diseno-web-' + location.slug}
        image="/home-hero-illustration-poster.png"
        type="service"
        schema={locationSchema}
      />

      <Navbar initialTheme="light" />
      <BudgetCalculator isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />

      <main>
        <section id="vlc-hero" className="relative overflow-hidden bg-[#D8ECFB] px-5 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24">
          <div className="pointer-events-none absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-white/50 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-48 left-[28%] h-[26rem] w-[32rem] rounded-full bg-[#9ED6F1]/40 blur-3xl" />

          <div className="relative mx-auto grid w-full max-w-[1380px] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="max-w-[39rem]">
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#28536E]">
                <span className="h-2 w-2 rounded-full bg-[#2A6D98]" aria-hidden="true" />
                Diseño web en {location.name}
              </div>
              <h1 className="mt-5 font-display text-[2.55rem] font-extrabold leading-[1.05] tracking-[-0.06em] text-[#0B1B63] sm:text-[3.1rem] lg:text-[3rem] xl:text-[3.9rem] 2xl:text-[4.4rem]">
                Una web que hace{' '}
                <span className="block text-[#2A6D98]">que te elijan.</span>
              </h1>
              <p className="mt-6 max-w-[36rem] text-[1.02rem] font-medium leading-[1.75] text-[#29456F] sm:text-[1.1rem]">
                {getSpinVariation(location.slug, spintaxData.heroTagline)}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsCalculatorOpen(true);
                    (window as any).dataLayer?.push({ event: 'cta_click', cta_id: 'hero_calculator_location', cta_text: 'Calcular precio web', page_path: window.location.pathname });
                  }}
                  className="brand-button brand-button--dark inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold"
                >
                  Calcular precio web <ArrowRight size={17} />
                </button>
                <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" className="brand-button brand-button--outline inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold">
                  <MessageCircle size={17} />
                  Hablar por WhatsApp
                </a>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#A6CDE5] pt-6 text-sm font-bold text-[#0B1B63]">
                <span className="inline-flex items-center gap-2"><CircleCheck size={16} className="text-[#2A6D98]" /> Respuesta en 24 h</span>
                <span className="inline-flex items-center gap-2"><CircleCheck size={16} className="text-[#2A6D98]" /> SEO inicial</span>
                <span className="inline-flex items-center gap-2"><CircleCheck size={16} className="text-[#2A6D98]" /> 100% adaptable</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[44rem]">
              <div className="absolute -inset-4 rounded-[2rem] bg-white/40 blur-xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/70 p-3 shadow-[0_24px_70px_rgba(42,109,152,0.16)] sm:p-5">
                <div className="overflow-hidden rounded-[1.25rem] bg-[#F7F7F7]">
                  <img
                    src="/home-hero-illustration-poster.webp"
                    alt="Personaje de Icono Studio trabajando en una web"
                    className="block h-auto w-full object-contain"
                    fetchPriority="high"
                    decoding="async"
                  />
                </div>
                <div className="flex items-center justify-between gap-4 px-2 pb-1 pt-4 sm:px-3">
                  <p className="text-sm font-bold text-[#0B1B63]">Tu negocio, bien presentado</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2A6D98]"><ShieldCheck size={15} /> Base preparada para crecer</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="mx-auto grid w-full max-w-[1180px] grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-0">
            {[
              { label: 'Respuesta', value: 'Menos de 24 h', icon: MessageCircle },
              { label: 'Adaptación', value: '100% móvil', icon: MonitorSmartphone },
              { label: 'Visibilidad', value: 'SEO inicial', icon: Search },
              { label: 'Proceso', value: 'Claro y cercano', icon: HeartHandshake },
            ].map(({ label, value, icon: Icon }, index) => (
              <div key={label} className={'flex items-center gap-3 border-[#DCE5EE] px-2 sm:flex-col sm:justify-center sm:gap-2 sm:text-center ' + (index < 3 ? 'sm:border-r' : '')}>
                <Icon size={19} strokeWidth={1.7} className="shrink-0 text-[#2A6D98]" />
                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#5F7186]">{label}</p>
                  <p className="mt-1 text-xs font-bold text-[#0B1B63] sm:text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#F7F9FC] px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto grid w-full max-w-[1260px] items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2A6D98]">La primera impresión importa</p>
              <h2 className="mt-4 max-w-[34rem] font-display text-[2.2rem] font-extrabold leading-[1.05] tracking-[-0.05em] text-[#0B1B63] sm:text-[3.1rem]">
                No basta con estar online.
              </h2>
              <p className="mt-5 max-w-[34rem] text-[1rem] leading-[1.75] text-[#526477]">
                Cuando alguien busca un negocio en {location.name}, compara en pocos segundos. Tu web tiene que responder qué haces, por qué confiar en ti y cuál es el siguiente paso.
              </p>
              <button type="button" onClick={scrollToForm} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#0B1B63] transition-colors hover:text-[#2A6D98]">
                Hablemos de tu proyecto <ArrowRight size={16} />
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { number: '01', title: 'Te encuentran', text: 'Una base SEO local para que tu negocio sea más fácil de descubrir.', icon: Search },
                { number: '02', title: 'Te entienden', text: 'Mensajes y estructura para que la propuesta se entienda rápido.', icon: FileText },
                { number: '03', title: 'Te contactan', text: 'Llamadas a la acción claras, sin hacer pensar de más al usuario.', icon: MessageCircle },
              ].map(({ number, title, text, icon: Icon }) => (
                <article key={number} className="rounded-[1.15rem] border border-[#DCE5EE] bg-white p-5 shadow-[0_12px_35px_-26px_rgba(11,27,99,0.35)]">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D8ECFB] text-[#2A6D98]"><Icon size={19} /></span>
                    <span className="font-display text-xl font-bold text-[#3E88AE]">{number}</span>
                  </div>
                  <h3 className="mt-6 font-display text-lg font-extrabold tracking-[-0.03em] text-[#0B1B63]">{title}</h3>
                  <p className="mt-2 text-sm leading-[1.6] text-[#526477]">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto w-full max-w-[1260px]">
            <div className="max-w-[40rem]">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2A6D98]">Qué cuidamos</p>
              <h2 className="mt-3 font-display text-[2.2rem] font-extrabold leading-[1.06] tracking-[-0.05em] text-[#0B1B63] sm:text-[3rem]">
                Una web preparada para tu negocio.
              </h2>
              <p className="mt-4 text-[1rem] leading-[1.75] text-[#526477]">
                No partimos de una plantilla cerrada. Construimos una base que puedas entender, usar y hacer crecer.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {serviceItems.map(({ title, description, icon: Icon }, index) => (
                <article key={title} className="group rounded-[1.15rem] border border-[#DCE5EE] bg-[#F7F9FC] p-6 transition-[border-color,background-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[#9ED6F1] hover:bg-white hover:shadow-[0_18px_44px_-28px_rgba(11,27,99,0.35)]">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D8ECFB] text-[#2A6D98]"><Icon size={21} strokeWidth={1.7} /></span>
                    <span className="font-display text-xl font-bold text-[#3E88AE]">0{index + 1}</span>
                  </div>
                  <h3 className="mt-6 font-display text-lg font-extrabold tracking-[-0.03em] text-[#0B1B63]">{title}</h3>
                  <p className="mt-2 text-sm leading-[1.65] text-[#526477]">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="proyectos" className="bg-[#F7F9FC] px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto w-full max-w-[1260px]">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2A6D98]">Proyectos recientes</p>
                <h2 className="mt-3 font-display text-[2.2rem] font-extrabold tracking-[-0.05em] text-[#0B1B63] sm:text-[3rem]">
                  Trabajo real, resultados visibles.
                </h2>
              </div>
              <RouterLink to="/proyectos" className="inline-flex items-center gap-2 text-sm font-bold text-[#0B1B63] transition-colors hover:text-[#2A6D98]">
                Ver todos los proyectos <ArrowRight size={16} />
              </RouterLink>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {featuredProjects.map((project) => (
                <RouterLink key={project.id} to={'/proyecto/' + project.id} className="group overflow-hidden rounded-[1.25rem] border border-[#DCE5EE] bg-white transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[#9ED6F1] hover:shadow-[0_18px_44px_-28px_rgba(11,27,99,0.4)]">
                  <div className="relative aspect-[1.2] overflow-hidden bg-[#D8ECFB]">
                    <img src={project.img || project.imgReto} alt={project.title} loading="lazy" decoding="async" referrerPolicy="no-referrer" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <div className="flex items-start justify-between gap-4 p-5">
                    <div>
                      <h3 className="font-display text-lg font-extrabold tracking-[-0.03em] text-[#0B1B63]">{project.title}</h3>
                      <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#2A6D98]">{project.category}</p>
                    </div>
                    <ArrowRight size={17} className="mt-1 shrink-0 text-[#2A6D98] transition-transform group-hover:translate-x-1" />
                  </div>
                </RouterLink>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto grid w-full max-w-[1260px] gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2A6D98]">Cómo trabajamos</p>
              <h2 className="mt-3 max-w-[26rem] font-display text-[2.2rem] font-extrabold leading-[1.06] tracking-[-0.05em] text-[#0B1B63] sm:text-[3rem]">
                Un proceso claro, sin líos.
              </h2>
              <p className="mt-4 max-w-[28rem] text-[1rem] leading-[1.75] text-[#526477]">
                Te guiamos desde la primera conversación hasta la publicación para que siempre sepas qué estamos haciendo y por qué.
              </p>
              <button type="button" onClick={scrollToForm} className="brand-button brand-button--dark mt-7 inline-flex items-center gap-2 px-5 py-3 text-sm font-bold">
                Empezar a hablar <ArrowRight size={16} />
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {processItems.map(({ title, description, image }, index) => (
                <div key={title} className="flex items-center gap-4 rounded-[1rem] border border-[#DCE5EE] bg-[#F7F9FC] p-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white p-2">
                    <img src={image} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain" />
                  </span>
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#5F7186]">0{index + 1}</p>
                    <h3 className="mt-1 text-sm font-bold text-[#0B1B63]">{title}</h3>
                    <p className="mt-1 text-xs leading-[1.55] text-[#526477]">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#D8ECFB] px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto grid w-full max-w-[1180px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#28536E]">Cerca, aunque trabajemos online</p>
              <h2 className="mt-3 font-display text-[2.2rem] font-extrabold leading-[1.06] tracking-[-0.05em] text-[#0B1B63] sm:text-[3rem]">
                Diseño web para negocios de {location.name}.
              </h2>
              <p className="mt-4 max-w-[35rem] text-[1rem] leading-[1.75] text-[#29456F]">
                {getSpinVariation(location.slug, spintaxData.localOutro)}
              </p>
            </div>
            <div className="rounded-[1.25rem] border border-white/80 bg-white/65 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <Users size={20} className="text-[#2A6D98]" />
                <p className="text-sm font-bold text-[#0B1B63]">También trabajamos con negocios de</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {location.surroundingTowns.map((town) => (
                  <span key={town} className="rounded-full border border-[#B7D8EA] bg-white/65 px-3 py-2 text-xs font-bold text-[#28536E]">{town}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="planes" className="bg-[#F7F9FC] px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto w-full max-w-[1260px]">
            <div className="max-w-[42rem]">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2A6D98]">Inversión orientativa</p>
              <h2 className="mt-4 font-display text-[2.2rem] font-extrabold leading-[1.06] tracking-[-0.05em] text-[#0B1B63] sm:text-[3rem]">
                Precios claros para
                <span className="block text-[#2A6D98]">empezar con confianza.</span>
              </h2>
              <p className="mt-4 max-w-[38rem] text-[0.98rem] leading-[1.7] text-[#526477]">
                Son tarifas orientativas. Antes de empezar te enviaremos un presupuesto cerrado según lo que necesite tu negocio.
              </p>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {pricingItems.map((item) => (
                <article key={item.title} className={'group relative flex h-full flex-col rounded-[1.5rem] border bg-white p-6 shadow-[0_8px_24px_-12px_rgba(11,27,99,0.08)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 sm:p-7 ' + (item.featured ? 'border-2 border-brand-blue' : 'border border-[#DCE5EE]')}>
                  {item.featured ? <span className="absolute -top-3 left-6 rounded-full bg-[#9ED6F1] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#0B1B63]">Más elegido</span> : null}
                  <h3 className="font-display text-xl font-extrabold text-[#0B1B63]">{item.title}</h3>
                  <p className="mt-3 min-h-[3.5rem] text-sm leading-[1.65] text-[#526477]">{item.description}</p>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-extrabold tracking-[-0.05em] text-[#0B1B63]">{item.price}</span>
                    <span className="text-sm font-bold text-[#5F7186]">€ + IVA</span>
                  </div>
                  <ul className="mt-6 grid flex-1 gap-3 border-t border-[#E4E9F2] pt-6">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm font-semibold text-[#34465D]"><Check size={16} className="mt-0.5 shrink-0 text-[#2A6D98]" />{feature}</li>
                    ))}
                  </ul>
                  <button type="button" onClick={scrollToForm} className={'brand-button mt-7 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold ' + (item.featured ? '' : 'brand-button--outline')}>
                    Pedir presupuesto <ArrowRight size={16} />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto w-full max-w-[1180px]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2A6D98]">Experiencias reales</p>
                <h2 className="mt-3 font-display text-[2.2rem] font-extrabold tracking-[-0.05em] text-[#0B1B63] sm:text-[3rem]">Un trato que se nota.</h2>
              </div>
              <div className="inline-flex items-center gap-2 text-sm font-bold text-[#526477]"><Star size={17} className="fill-[#FFB800] text-[#FFB800]" /> 5,0 en Google</div>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {reviews.map((review) => (
                <article key={review.name} className="rounded-[1.15rem] border border-[#DCE5EE] bg-[#F7F9FC] p-6">
                  <div className="flex items-center gap-1 text-[#FFB800]">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={14} className="fill-current" />)}</div>
                  <p className="mt-5 text-sm leading-[1.7] text-[#34465D]">“{review.text}”</p>
                  <div className="mt-6 border-t border-[#DCE5EE] pt-4">
                    <p className="text-sm font-bold text-[#0B1B63]">{review.name}</p>
                    <p className="mt-1 text-xs text-[#5F7186]">{review.source}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="vlc-faq" className="bg-[#F7F9FC] px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto grid w-full max-w-[980px] gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2A6D98]">Preguntas frecuentes</p>
              <h2 className="mt-3 font-display text-[2.2rem] font-extrabold leading-[1.06] tracking-[-0.05em] text-[#0B1B63] sm:text-[3rem]">Antes de empezar, todo claro.</h2>
              <p className="mt-4 text-sm leading-[1.7] text-[#526477]">Si no encuentras tu respuesta, escríbenos y lo hablamos.</p>
            </div>
            <div className="grid gap-3">
              {locationFaqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div key={faq.q} className={'overflow-hidden rounded-[1rem] border bg-white transition-colors ' + (isOpen ? 'border-[#9ED6F1]' : 'border-[#DCE5EE]')}>
                    <button type="button" onClick={() => setActiveFaq(isOpen ? null : index)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6">
                      <span className="text-sm font-bold text-[#0B1B63] sm:text-base">{faq.q}</span>
                      <ChevronDown size={18} className={'shrink-0 text-[#2A6D98] transition-transform ' + (isOpen ? 'rotate-180' : '')} />
                    </button>
                    {isOpen ? <div className="border-t border-[#DCE5EE] px-5 pb-5 pt-4 text-sm leading-[1.7] text-[#526477] sm:px-6">{faq.a}</div> : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="vlc-form" className="relative px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto grid w-full max-w-[1180px] gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2A6D98]">Tu próximo paso</p>
              <h2 className="mt-4 font-display text-[2.3rem] font-extrabold leading-[1.04] tracking-[-0.05em] text-[#0B1B63] sm:text-[3.2rem]">
                Cuéntanos qué quieres conseguir.
              </h2>
              <p className="mt-5 max-w-[27rem] text-[0.98rem] leading-[1.75] text-[#526477]">
                No necesitas saber de webs. Explícanos tu negocio y te responderemos con una orientación clara y un presupuesto sin compromiso.
              </p>
              <div className="mt-8 grid gap-4 border-t border-[#A6CDE5] pt-6">
                <span className="inline-flex items-center gap-3 text-sm font-bold text-[#0B1B63]"><CircleCheck size={17} className="text-[#2A6D98]" /> Respuesta en menos de 24 horas</span>
                <span className="inline-flex items-center gap-3 text-sm font-bold text-[#0B1B63]"><CircleCheck size={17} className="text-[#2A6D98]" /> Precio definido antes de empezar</span>
                <span className="inline-flex items-center gap-3 text-sm font-bold text-[#0B1B63]"><CircleCheck size={17} className="text-[#2A6D98]" /> Trato directo y sin tecnicismos</span>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-[#DCE5EE] bg-white p-5 shadow-[0_18px_55px_rgba(11,27,99,0.08)] sm:p-8">
              {isSubmitted ? (
                <div className="flex min-h-[24rem] flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E6F4FB] text-[#0B1B63]"><Check size={28} /></span>
                  <h2 className="mt-6 font-display text-2xl font-extrabold text-[#0B1B63]">Solicitud enviada</h2>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#526477]">Gracias por contarnos tu proyecto. Te responderemos lo antes posible.</p>
                  <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" className="brand-button brand-button--dark mt-6 inline-flex items-center gap-2 px-5 py-3 text-sm font-bold">Hablar por WhatsApp <ArrowRight size={16} /></a>
                </div>
              ) : (
                <>
                  <div className="mb-7">
                    <h2 className="font-display text-2xl font-extrabold tracking-[-0.04em] text-[#0B1B63]">Pide tu presupuesto web</h2>
                    <p className="mt-2 text-sm leading-relaxed text-[#526477]">Te responderemos con próximos pasos claros.</p>
                  </div>
                  <form
                    onSubmit={handleSubmit}
                    onSubmitCapture={() => debugLeadFormSubmitCapture('contact_' + location.slug + '_ads')}
                    onInvalidCapture={(event) => {
                      const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
                      debugLeadFormInvalid('contact_' + location.slug + '_ads', target.name, target.validationMessage);
                    }}
                    className="space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor={'location-name-' + location.slug} className={labelClassName}>Nombre</label>
                        <input id={'location-name-' + location.slug} type="text" name="nombre" required value={formData.nombre} onChange={handleInputChange} placeholder="Tu nombre" className={inputClassName} />
                      </div>
                      <div>
                        <label htmlFor={'location-business-' + location.slug} className={labelClassName}>Negocio o marca</label>
                        <input id={'location-business-' + location.slug} type="text" name="negocio" required value={formData.negocio} onChange={handleInputChange} placeholder="Nombre de tu negocio" className={inputClassName} />
                      </div>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor={'location-phone-' + location.slug} className={labelClassName}>WhatsApp o teléfono</label>
                        <input id={'location-phone-' + location.slug} type="tel" name="whatsapp" required value={formData.whatsapp} onChange={handleInputChange} placeholder="600 000 000" className={inputClassName} />
                      </div>
                      <div>
                        <label htmlFor={'location-email-' + location.slug} className={labelClassName}>Email</label>
                        <input id={'location-email-' + location.slug} type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="hola@tuweb.com" className={inputClassName} />
                      </div>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor={'location-city-' + location.slug} className={labelClassName}>Ciudad</label>
                        <input id={'location-city-' + location.slug} type="text" name="ciudad" required value={formData.ciudad} onChange={handleInputChange} placeholder={location.name} className={inputClassName} />
                      </div>
                      <div>
                        <label htmlFor={'location-need-' + location.slug} className={labelClassName}>Tipo de web</label>
                        <select id={'location-need-' + location.slug} name="necesidad" required value={formData.necesidad} onChange={handleInputChange} className={inputClassName}>
                          <option value="">Selecciona una opción</option>
                          <option value="corporativa">Web corporativa</option>
                          <option value="landing">Landing page</option>
                          <option value="portfolio">Portfolio</option>
                          <option value="tienda">Tienda online</option>
                          <option value="rediseño">Rediseño web</option>
                          <option value="no-claro">No lo tengo claro</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor={'location-budget-' + location.slug} className={labelClassName}>Presupuesto aproximado</label>
                      <select id={'location-budget-' + location.slug} name="presupuesto" required value={formData.presupuesto} onChange={handleInputChange} className={inputClassName}>
                        <option value="">Selecciona un rango</option>
                        <option value="350-500">350 € a 500 €</option>
                        <option value="500-800">500 € a 800 €</option>
                        <option value="800-1200">800 € a 1.200 €</option>
                        <option value="1200+">Más de 1.200 €</option>
                        <option value="orientacion">Necesito orientación</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor={'location-message-' + location.slug} className={labelClassName}>Cuéntanos tu idea</label>
                      <textarea id={'location-message-' + location.slug} name="mensaje" required rows={4} value={formData.mensaje} onChange={handleInputChange} placeholder="Qué haces, qué te gustaría mejorar y qué debería conseguir tu web..." className={inputClassName} />
                    </div>
                    <div className="flex items-start gap-3">
                      <input type="checkbox" name="privacidad" id={'location-privacy-' + location.slug} required checked={formData.privacidad} onChange={handleInputChange} className="mt-1 h-4 w-4 accent-[#0B1B63]" />
                      <label htmlFor={'location-privacy-' + location.slug} className="text-xs leading-relaxed text-[#64778A]">
                        Acepto la <RouterLink to="/politica-de-privacidad" className="font-bold text-[#2A6D98] underline underline-offset-2">política de privacidad</RouterLink> y autorizo a Icono Studio a contactar conmigo.
                      </label>
                    </div>
                    <button type="submit" onClick={() => debugLeadFormButtonClick('contact_' + location.slug + '_ads')} className="brand-button brand-button--dark inline-flex w-full items-center justify-center gap-2 px-6 py-4 text-sm font-bold">
                      Pedir presupuesto gratis <Send size={16} />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="bg-[#F7F9FC] px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto w-full max-w-[1180px]">
            <RelatedGuidesSection
              title={'Guías para mejorar la visibilidad de tu negocio en ' + location.name}
              description="Ideas claras para aparecer mejor en Google, transmitir confianza y convertir más visitas en contactos."
              posts={locationGuides}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
