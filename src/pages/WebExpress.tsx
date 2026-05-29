import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  Globe,
  Layers,
  LayoutTemplate,
  MapPin,
  MessageSquare,
  MousePointer2,
  Palette,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import { absoluteUrl, siteConfig } from '../lib/site';
import { buildBreadcrumbSchema, buildOrganizationSchema, buildProviderReference } from '../lib/structuredData';

const heroBenefits = [
  'Imagen profesional desde el primer día',
  'La mejor velocidad de carga posible',
  'Contacto directo y versión móvil cuidada',
  'Hosting, SSL y gestión técnica resueltos',
];

const idealFor = [
  {
    title: 'Presencia profesional desde el primer día',
    description:
      'Una web clara, bien presentada y fácil de entender para explicar quién eres, qué haces y cómo pueden contactarte.',
    icon: MousePointer2,
  },
  {
    title: 'Confianza para negocios locales',
    description:
      'Encaja especialmente bien con clínicas, estudios, despachos, comercios y servicios que trabajan por zona.',
    icon: MapPin,
  },
  {
    title: 'Rapidez con una base sólida',
    description:
      'Te permite salir online con una estética cuidada, buena base técnica y una solución lista para empezar a captar contactos.',
    icon: Clock,
  },
];

const includedFeatures = [
  {
    title: 'Estructura clara y enfocada al negocio',
    description:
      'One page organizada para presentar tu marca, tus servicios y tu contacto de forma directa y profesional.',
    icon: LayoutTemplate,
  },
  {
    title: 'Adaptación visual a tu marca',
    description:
      'Ajustamos logo, colores y estilo para que la web se vea coherente, cuidada y alineada con tu negocio.',
    icon: Palette,
  },
  {
    title: 'Contacto directo desde la web',
    description:
      'Formulario básico, botón de WhatsApp o llamada para facilitar el primer contacto desde cualquier dispositivo.',
    icon: MessageSquare,
  },
  {
    title: 'Buena experiencia en móvil',
    description:
      'Diseño responsive y navegación fluida para que la web se vea bien y resulte cómoda de usar en móvil, tablet y escritorio.',
    icon: Smartphone,
  },
  {
    title: 'Hosting, SSL y base técnica',
    description:
      'Nos ocupamos de publicar la web, mantener el certificado de seguridad y dejar una base ligera y rápida.',
    icon: ShieldCheck,
  },
  {
    title: 'Gestión de dominio',
    description:
      'Si lo necesitas, registramos y conectamos tu dominio para que toda la parte técnica quede resuelta contigo.',
    icon: Globe,
  },
];

const faqs = [
  {
    question: '¿La web es mía?',
    answer:
      'Tus textos, imágenes, logo y dominio son tuyos. Web Express funciona como un servicio alojado y gestionado por Icono Studio, así que la web permanece activa mientras el plan esté contratado.',
  },
  {
    question: '¿Puedo cancelar cuando quiera?',
    answer:
      'Sí. El plan mensual no tiene permanencia. Si cancelas o no renuevas, la web deja de estar publicada.',
  },
  {
    question: '¿Puedo llevarme la web a otro hosting?',
    answer:
      'Web Express no incluye entrega del código ni migración. Si más adelante necesitas exportar o mover la web, podemos valorarlo como servicio aparte.',
  },
  {
    question: '¿Cuánto tarda en estar lista?',
    answer:
      'Cuando recibimos la información básica del negocio, solemos preparar la web en pocos días laborables.',
  },
  {
    question: '¿Incluye dominio?',
    answer:
      'El hosting y el SSL sí están incluidos. El dominio es opcional y lo gestionamos aparte por 20 € + IVA al año para extensiones estándar como .es o .com.',
  },
  {
    question: '¿Y si necesito algo más completo?',
    answer:
      'Si tu proyecto necesita una web personalizada, varias páginas, tienda online o funcionalidades específicas, podemos prepararte una propuesta a medida.',
  },
];

export default function WebExpress() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const webExpressSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationSchema(),
      buildBreadcrumbSchema([
        { name: 'Inicio', path: '/' },
        { name: 'Web Express' },
      ]),
      {
        '@type': 'Service',
        '@id': absoluteUrl('/pagina-web-gratis#service'),
        name: 'Web Express | Icono Studio',
        url: absoluteUrl('/pagina-web-gratis'),
        description:
          'Página web profesional para negocios, autónomos y marcas locales desde 8 €/mes, con hosting, SSL, versión móvil y gestión de dominio disponible.',
        image: absoluteUrl(siteConfig.defaultOgImage),
        areaServed: ['España'],
        serviceType: [
          'Página web profesional',
          'Web para autónomos',
          'Web para negocios locales',
        ],
        provider: buildProviderReference(),
        availableLanguage: ['es'],
        offers: [
          {
            '@type': 'Offer',
            name: 'Web Express anual',
            priceCurrency: 'EUR',
            price: '96',
            description: 'Pago anual de 96 € + IVA. Equivale a 8 € al mes.',
            url: absoluteUrl('/contratar-web-express?plan=annual'),
          },
          {
            '@type': 'Offer',
            name: 'Web Express mensual',
            priceCurrency: 'EUR',
            price: '12',
            description: 'Pago mensual de 12 € + IVA sin permanencia.',
            url: absoluteUrl('/contratar-web-express?plan=monthly'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white font-sans text-brand-dark selection:bg-brand-lime selection:text-brand-dark overflow-x-hidden">
      <SeoHead
        title="Página web profesional desde 8 €/mes | Web Express | Icono Studio"
        description="Web Express es una página web profesional para negocios, autónomos y marcas locales desde 8 €/mes, con hosting, SSL, versión móvil y gestión de dominio disponible."
        path="/pagina-web-gratis"
        type="service"
        schema={webExpressSchema}
      />

      <Navbar ctaHref="/contratar-web-express" ctaLabel="Contratar" />

      <main>
        <section className="relative overflow-hidden bg-support-mesh pt-28 pb-18 sm:pt-34 sm:pb-22 lg:pt-38 lg:pb-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(212,255,0,0.12),transparent_22%)] pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="max-w-3xl">
                <p className="ui-eyebrow text-brand-lime mb-4">Web Express de Icono Studio</p>
                <h1 className="font-display text-white text-[clamp(2rem,5.8vw,4.2rem)] leading-[0.94] tracking-[-0.04em] uppercase text-balance">
                  Tu página web lista
                  <span className="mt-2 block text-[0.8em] text-brand-lime italic font-normal">desde 8 € / mes</span>
                </h1>
                <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-white/78">
                  Lanza una página web profesional para tu negocio con una base visual cuidada, la mejor velocidad de carga
                  posible y una presencia que transmite confianza. Adaptamos la estructura a tu marca, la publicamos en
                  nuestro hosting y la dejamos lista para que no tengas que preocuparte por la parte técnica.
                </p>

                <div className="mt-8">
                  <RouterLink
                    to="/contratar-web-express"
                    className="inline-flex items-center justify-center gap-3 rounded-full bg-brand-lime px-8 py-4 text-[11px] font-black uppercase tracking-[0.22em] text-brand-dark transition-transform hover:scale-[1.02]"
                  >
                    Crear mi web
                    <ArrowRight size={16} />
                  </RouterLink>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 sm:p-7 backdrop-blur-md shadow-[0_30px_80px_rgba(15,23,42,0.35)]">
                  <div className="rounded-[1.75rem] bg-white p-6 text-brand-dark">
                    <div className="border-b border-gray-100 pb-5">
                      <p className="ui-eyebrow text-brand-blue mb-2">Web Express</p>
                      <h2 className="font-display text-[2rem] uppercase leading-none">Todo listo para activar tu web</h2>
                    </div>

                    <div className="space-y-4 py-5">
                      {[
                        'Estructura profesional y carga rápida',
                        'Hasta 5 secciones y contacto directo',
                        'Hosting, SSL y versión móvil incluidos',
                        'Opción de gestión de dominio',
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white">
                            <Check size={14} />
                          </div>
                          <p className="text-sm leading-relaxed text-gray-700">{item}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="relative pt-4">
                        <div className="absolute left-4 top-0 z-10 -translate-y-1/2 rounded-full bg-brand-lime px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-brand-dark shadow-sm">
                          Ahorra un 33%
                        </div>
                        <RouterLink
                          to="/contratar-web-express?plan=annual"
                          className="block rounded-[1.5rem] bg-brand-dark px-5 py-5 text-left text-white transition-transform hover:scale-[1.01]"
                        >
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-lime">Plan anual</p>
                          <div className="mt-3 flex items-end gap-2">
                            <p className="font-display text-[2rem] leading-none">8 € / mes</p>
                            <span className="pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/68">+ IVA</span>
                          </div>
                          <p className="mt-3 text-sm text-white/72">
                            Facturado anualmente · 116,16 € al año IVA incluido
                          </p>
                        </RouterLink>
                      </div>

                      <RouterLink
                        to="/contratar-web-express?plan=monthly"
                        className="block rounded-[1.5rem] border border-gray-200 bg-gray-50 px-5 py-5 text-left transition-transform hover:scale-[1.01]"
                      >
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-blue">Plan mensual</p>
                        <div className="mt-3 flex items-end gap-2">
                          <p className="font-display text-[2rem] leading-none text-brand-dark">12 € / mes</p>
                          <span className="pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">+ IVA</span>
                        </div>
                        <p className="mt-3 text-sm text-gray-600">14,52 € al mes IVA incluido</p>
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {heroBenefits.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.5rem] border border-white/12 bg-white/10 px-5 py-4 text-sm font-medium text-white/84 backdrop-blur-md"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="ui-eyebrow text-brand-blue mb-4">Página web profesional</p>
              <div className="ui-divider mb-6" />
              <h2 className="ui-section-title text-brand-dark mb-5">Empieza con buena imagen</h2>
              <p className="ui-section-copy max-w-3xl">
                Web Express está pensada para negocios que necesitan una web seria, clara y visualmente sólida desde el
                primer momento. Una forma ágil de tener una presencia profesional sin renunciar a una ejecución cuidada.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {idealFor.map((item) => (
                <article key={item.title} className="rounded-[2rem] border border-gray-100 bg-[#FAFAFA] p-7 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue text-white">
                    <item.icon size={20} />
                  </div>
                  <h3 className="ui-card-title text-brand-dark mb-3">{item.title}</h3>
                  <p className="text-sm leading-7 text-gray-600">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-support-mesh-light py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="ui-eyebrow text-brand-blue mb-4">Qué incluye Web Express</p>
              <div className="ui-divider mb-6" />
              <h2 className="ui-section-title text-brand-dark mb-5">Todo lo esencial para una web profesional</h2>
              <p className="ui-section-copy">
                Una base bien resuelta para lanzar una página clara, rápida y preparada para presentar tu negocio con buena
                imagen desde el primer día.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {includedFeatures.map((feature) => (
                <article key={feature.title} className="rounded-[2rem] border border-white/70 bg-white p-7 shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-dark text-brand-lime">
                    <feature.icon size={20} />
                  </div>
                  <h3 className="ui-card-title text-brand-dark mb-3">{feature.title}</h3>
                  <p className="text-sm leading-7 text-gray-600">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="planes" className="bg-white py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="ui-eyebrow text-brand-blue mb-4">Planes</p>
              <div className="ui-divider mb-6" />
              <h2 className="ui-section-title text-brand-dark mb-5">Dos formas de activar tu web</h2>
              <p className="ui-section-copy">
                El mismo servicio, con una modalidad anual más ventajosa y una mensual para empezar con más flexibilidad.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              {[
                {
                  featured: true,
                  title: 'Plan anual',
                  price: '8 € / mes + IVA',
                  priceDetail: 'Facturados anualmente.',
                  billed: '116,16 € al año IVA incluido',
                  benefit: '33% de ahorro',
                  href: '/contratar-web-express?plan=annual',
                },
                {
                  featured: false,
                  title: 'Plan mensual',
                  price: '12 € / mes + IVA',
                  priceDetail: 'Facturación mensual.',
                  billed: '14,52 € al mes IVA incluido',
                  benefit: '',
                  href: '/contratar-web-express?plan=monthly',
                },
              ].map((plan) => (
                <article
                  key={plan.title}
                  className={`relative rounded-[2rem] border p-7 shadow-sm ${
                    plan.featured
                      ? 'border-brand-dark bg-brand-dark text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)]'
                      : 'border-gray-100 bg-[#FAFAFA] text-brand-dark'
                  }`}
                >
                  {plan.benefit ? (
                    <div className="absolute left-7 top-0 -translate-y-1/2">
                      <span className="inline-flex rounded-full bg-brand-lime px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-brand-dark shadow-sm">
                        {plan.benefit}
                      </span>
                    </div>
                  ) : null}
                  <h3 className="font-display pt-4 text-4xl uppercase leading-none">{plan.title}</h3>
                  <div className="mt-4 flex items-end gap-2">
                    <p className={`font-display text-[2.7rem] leading-none ${plan.featured ? 'text-white' : 'text-brand-dark'}`}>
                      {plan.price.replace(' + IVA', '')}
                    </p>
                    <span className={`pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${plan.featured ? 'text-white/65' : 'text-gray-500'}`}>
                      + IVA
                    </span>
                  </div>
                  <div className={`my-7 h-px ${plan.featured ? 'bg-white/12' : 'bg-gray-200'}`} />
                  <p className={`text-sm ${plan.featured ? 'text-white/72' : 'text-gray-600'}`}>{plan.priceDetail}</p>
                  <p className={`mt-2 text-sm ${plan.featured ? 'text-white/80' : 'text-gray-700'}`}>{plan.billed}</p>

                  <ul className="mt-6 space-y-3">
                    {[
                      'Página web profesional',
                      'Hosting y SSL incluidos',
                      'Versión móvil cuidada',
                      'Contacto directo',
                      'Opción de gestión de dominio',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <Check size={16} className={`mt-1 shrink-0 ${plan.featured ? 'text-brand-lime' : 'text-brand-blue'}`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <RouterLink
                    to={plan.href}
                    className={`mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full px-6 py-4 text-[11px] font-black uppercase tracking-[0.22em] transition-transform hover:scale-[1.01] ${
                      plan.featured ? 'bg-brand-lime text-brand-dark' : 'bg-brand-dark text-white'
                    }`}
                  >
                    Contratar este plan
                    <ArrowRight size={16} />
                  </RouterLink>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#E7EEFF] py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2.2rem] border border-brand-dark/5 bg-brand-dark p-7 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="ui-eyebrow text-brand-lime mb-4">¿Necesitas algo más completo?</p>
                  <h2 className="font-display text-3xl uppercase leading-none text-white">
                    También podemos prepararte una propuesta a medida
                  </h2>
                  <p className="mt-4 max-w-3xl leading-7 text-white/72">
                    Si tu proyecto necesita varias páginas, tienda online, funcionalidades específicas o un planteamiento
                    completamente personalizado, lo trabajamos contigo aparte.
                  </p>
                </div>
                <RouterLink
                  to="/contacto"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-brand-lime px-7 py-4 text-[11px] font-black uppercase tracking-[0.22em] text-brand-dark transition-transform hover:scale-[1.02]"
                >
                  Contactar
                  <ArrowRight size={16} />
                </RouterLink>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-support-mesh-light py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="ui-eyebrow text-brand-blue mb-4">Proceso</p>
              <div className="ui-divider mb-6" />
              <h2 className="ui-section-title text-brand-dark mb-5">Así preparamos tu Web Express</h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  step: '01',
                  title: 'Recogemos la información clave',
                  text: 'Negocio, servicios, ciudad, contacto, referencias visuales y preferencia de dominio.',
                  icon: FileText,
                },
                {
                  step: '02',
                  title: 'Adaptamos la estructura y la imagen',
                  text: 'Trabajamos sobre una base profesional, ajustando jerarquía, estilo y contenido a tu marca.',
                  icon: Layers,
                },
                {
                  step: '03',
                  title: 'Publicamos y dejamos todo listo',
                  text: 'Conectamos la parte técnica y tu web queda online para empezar a recibir visitas y contactos.',
                  icon: Check,
                },
              ].map((item) => (
                <article key={item.step} className="rounded-[2rem] border border-white/70 bg-white p-7 shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-blue">{item.step}</p>
                  <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-dark text-brand-lime">
                    <item.icon size={20} />
                  </div>
                  <h3 className="ui-card-title mt-5 text-brand-dark">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-600">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="ui-eyebrow text-brand-blue mb-4">Preguntas frecuentes</p>
              <div className="ui-divider mb-6" />
              <h2 className="ui-section-title text-brand-dark mb-5">Dudas habituales antes de contratar</h2>
              <p className="ui-section-copy">Las preguntas más comunes sobre el servicio, la propiedad y la gestión técnica.</p>
            </div>

            <div className="mt-10 space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;

                return (
                  <article key={faq.question} className="rounded-[1.75rem] border border-gray-100 bg-[#FAFAFA] px-5 sm:px-7">
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    >
                      <h3 className="text-base sm:text-lg font-bold tracking-tight text-brand-dark">{faq.question}</h3>
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-brand-dark">
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </button>

                    {isOpen && <p className="pb-6 text-sm sm:text-base leading-7 text-gray-600">{faq.answer}</p>}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-brand-dark py-20 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 rounded-[2.2rem] border border-white/10 bg-white/5 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="ui-eyebrow text-brand-lime mb-4">Compra online</p>
                <h2 className="ui-section-title text-white mb-4">Activa tu Web Express hoy</h2>
                <p className="max-w-2xl text-white/70 leading-7">
                  Pasa a la página de contratación, rellena los datos básicos de tu negocio y continúa al pago seguro con Stripe.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <RouterLink
                  to="/contratar-web-express?plan=annual"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-brand-lime px-7 py-4 text-[11px] font-black uppercase tracking-[0.22em] text-brand-dark transition-transform hover:scale-[1.02]"
                >
                  Contratar anual
                  <ArrowRight size={16} />
                </RouterLink>
                <RouterLink
                  to="/contratar-web-express?plan=monthly"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/8 px-7 py-4 text-[11px] font-black uppercase tracking-[0.22em] text-white transition-transform hover:scale-[1.02]"
                >
                  Contratar mensual
                  <ArrowRight size={16} />
                </RouterLink>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
