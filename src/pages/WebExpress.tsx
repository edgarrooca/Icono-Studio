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
  'Contacto directo y funciona perfectamente en el móvil',
  'Hosting, seguridad y configuración técnica resueltos',
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
    title: 'Hosting, seguridad y base técnica',
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

const plans = [
  {
    featured: true,
    title: 'Plan anual',
    price: '8 € / mes',
    priceDetail: 'Facturados anualmente. 33% de ahorro.',
    billed: '116,16 € al año IVA incluido',
    benefit: 'Ahorra un 33%',
    href: '/contratar-web-express?plan=annual',
  },
  {
    featured: false,
    title: 'Plan mensual',
    price: '12 € / mes',
    priceDetail: 'Facturación mensual, sin permanencia.',
    billed: '14,52 € al mes IVA incluido',
    benefit: '',
    href: '/contratar-web-express?plan=monthly',
  },
];

const processSteps = [
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

  const sectionHeader = (eyebrow: string, title: React.ReactNode, copy?: string) => (
    <div className="max-w-3xl">
      <div className="inline-block rounded-full bg-[#E6F4FB] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0B1B63]">
        {eyebrow}
      </div>
      <h2 className="mt-4 font-display text-[1.85rem] font-extrabold leading-[1.08] tracking-[-0.032em] text-[#0B1B63] sm:text-[2rem] lg:text-[2.15rem]">
        {title}
      </h2>
      {copy ? (
        <p className="mt-4 font-sans text-[0.98rem] font-medium leading-[1.68] text-[#425776] sm:text-[1.02rem]">
          {copy}
        </p>
      ) : null}
    </div>
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-[#0B1B63] selection:bg-[#9ED6F1]/40 selection:text-[#0B1B63]">
      <SeoHead
        title="Página web profesional desde 8 €/mes | Web Express | Icono Studio"
        description="Web Express es una página web profesional para negocios, autónomos y marcas locales desde 8 €/mes, con hosting, SSL, versión móvil y gestión de dominio disponible."
        path="/pagina-web-gratis"
        type="service"
        schema={webExpressSchema}
      />

      <Navbar ctaHref="/contratar-web-express" ctaLabel="Contratar" />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#F7F7F7] px-5 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24">
          <div className="pointer-events-none absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#D8ECFB] blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-44 left-[-6%] h-[24rem] w-[24rem] rounded-full bg-[#EAF5FA] blur-3xl" aria-hidden />

          <div className="relative mx-auto grid w-full max-w-[1380px] items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div className="max-w-[44rem]">
              <div className="inline-block rounded-full bg-[#E6F4FB] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0B1B63]">
                Web Express de Icono Studio
              </div>
              <h1 className="mt-5 font-display text-[2.3rem] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#0B1B63] sm:text-[2.9rem] lg:text-[3.3rem]">
                Tu página web lista{' '}
                <span style={{ color: '#3E88AE' }}>desde 8 € / mes</span>
              </h1>
              <p className="mt-6 max-w-2xl font-sans text-[1.02rem] font-medium leading-[1.7] text-[#1F3572] sm:text-[1.1rem]">
                Lanza una página web profesional para tu negocio con una base visual cuidada, la mejor velocidad de carga
                posible y una presencia que transmite confianza. Adaptamos la estructura a tu marca, la publicamos en
                nuestro hosting y la dejamos lista para que no tengas que preocuparte por la parte técnica.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <RouterLink
                  to="/contratar-web-express"
                  className="brand-button brand-button--outline inline-flex items-center justify-center gap-3 px-8 py-[1.05rem] font-sans text-[1.06rem] font-semibold"
                >
                  Crear mi web <ArrowRight size={18} />
                </RouterLink>
                <RouterLink
                  to="/contacto"
                  className="inline-flex items-center justify-center gap-2 font-sans text-[1rem] font-semibold text-[#0B1B63] transition-colors hover:text-[#2A6D98]"
                >
                  ¿Tienes dudas? Escríbenos
                </RouterLink>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {heroBenefits.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-[#E4E9F2] bg-white px-4 py-3.5 text-sm font-medium text-[#34465D] shadow-[0_8px_24px_-16px_rgba(11,27,99,0.15)]"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E6F4FB]">
                      <Check size={12} strokeWidth={3} className="text-[#2A6D98]" />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Plan card */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="rounded-[1.75rem] border border-[#C7E6F6] bg-[#F1F8FD] p-5 shadow-[0_20px_60px_-20px_rgba(11,27,99,0.2)] sm:p-7">
                <div className="border-b border-[#C7E6F6] pb-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2A6D98]">Web Express</p>
                  <h2 className="mt-2 font-display text-[1.6rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#0B1B63]">
                    Todo listo para activar tu web
                  </h2>
                </div>

                <div className="space-y-3.5 py-5">
                  {[
                    'Estructura profesional y carga rápida',
                    'Hasta 5 secciones y contacto directo',
                    'Hosting, seguridad y versión móvil incluidos',
                    'Opción de gestión de dominio',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#9ED6F1]">
                        <Check size={14} strokeWidth={3} className="text-[#0B1B63]" />
                      </span>
                      <p className="text-sm font-medium leading-relaxed text-[#34465D]">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="relative rounded-[1.25rem] bg-[#0B1B63] p-5 text-white transition-transform duration-300 hover:-translate-y-0.5">
                    <div className="absolute -top-2.5 left-4 rounded-full bg-[#E6F4FB] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0B1B63] shadow-sm">
                      Ahorra un 33%
                    </div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9ED6F1]">Plan anual</p>
                    <div className="mt-2.5 flex items-end gap-1.5">
                      <p className="font-display text-[1.9rem] font-extrabold leading-none">8 € / mes</p>
                      <span className="pb-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">+ IVA</span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-white/70">Facturado anualmente · 116,16 € al año IVA incluido</p>
                  </div>

                  <RouterLink
                    to="/contratar-web-express?plan=monthly"
                    className="rounded-[1.25rem] border-2 border-[#C7E6F6] bg-white p-5 text-left transition-colors duration-300 hover:bg-[#E6F4FB]"
                  >
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2A6D98]">Plan mensual</p>
                    <div className="mt-2.5 flex items-end gap-1.5">
                      <p className="font-display text-[1.9rem] font-extrabold leading-none text-[#0B1B63]">12 € / mes</p>
                      <span className="pb-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5F7186]">+ IVA</span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-[#526477]">14,52 € al mes IVA incluido</p>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PARA QUIÉN */}
        <section className="bg-white py-10 sm:py-14 md:py-16">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
            {sectionHeader(
              'Página web profesional',
              'Empieza con buena imagen',
              'Web Express está pensada para negocios que necesitan una web seria, clara y visualmente sólida desde el primer momento. Una forma ágil de tener una presencia profesional sin renunciar a una ejecución cuidada.',
            )}

            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {idealFor.map((item) => (
                <article
                  key={item.title}
                  className="group rounded-2xl border border-[#E4E9F2] bg-white p-6 shadow-[0_8px_24px_-12px_rgba(11,27,99,0.06)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#C8DCF5] hover:shadow-[0_22px_56px_rgba(109,144,193,0.12)] sm:p-7"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E6F4FB] text-[#2A6D98] transition-colors duration-300 group-hover:bg-[#9ED6F1] group-hover:text-[#0B1B63]">
                    <item.icon size={22} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display text-[1.15rem] font-bold leading-[1.25] tracking-[-0.02em] text-[#0B1B63]">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm font-medium leading-[1.65] text-[#34465D]">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* QUÉ INCLUYE */}
        <section className="relative bg-[#F7F7F7] py-10 sm:py-14 md:py-16">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
            {sectionHeader(
              'Qué incluye Web Express',
              'Todo lo esencial para una web profesional',
              'Una base bien resuelta para lanzar una página clara, rápida y preparada para presentar tu negocio con buena imagen desde el primer día.',
            )}

            <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {includedFeatures.map((feature) => (
                <article
                  key={feature.title}
                  className="group rounded-2xl border border-[#E4E9F2] bg-white p-6 shadow-[0_8px_24px_-12px_rgba(11,27,99,0.06)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#C8DCF5] hover:shadow-[0_22px_56px_rgba(109,144,193,0.12)] sm:p-7"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B1B63] text-[#9ED6F1]">
                    <feature.icon size={22} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display text-[1.15rem] font-bold leading-[1.25] tracking-[-0.02em] text-[#0B1B63]">
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 text-sm font-medium leading-[1.65] text-[#34465D]">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PLANES */}
        <section id="planes" className="bg-white py-10 sm:py-14 md:py-16">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
            {sectionHeader(
              'Planes',
              'Dos formas de activar tu web',
              'El mismo servicio, con una modalidad anual más ventajosa y una mensual para empezar con más flexibilidad.',
            )}

            <div className="mx-auto mt-12 grid max-w-4xl gap-6 lg:grid-cols-2">
              {plans.map((plan) => (
                <article
                  key={plan.title}
                  className={`relative flex flex-col rounded-[1.75rem] p-7 ${
                    plan.featured
                      ? 'bg-[#0B1B63] text-white shadow-[0_24px_70px_rgba(15,23,42,0.22)]'
                      : 'border border-[#E4E9F2] bg-white text-[#0B1B63] shadow-[0_8px_24px_-12px_rgba(11,27,99,0.08)]'
                  }`}
                >
                  {plan.benefit ? (
                    <div className="absolute left-7 top-0 -translate-y-1/2">
                      <span className="inline-flex rounded-full bg-[#E6F4FB] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0B1B63] shadow-sm">
                        {plan.benefit}
                      </span>
                    </div>
                  ) : null}
                  <h3 className="pt-3 font-display text-[1.6rem] font-extrabold tracking-[-0.02em]">
                    {plan.title}
                  </h3>
                  <div className="mt-4 flex items-end gap-2">
                    <p className={`font-display text-[2.5rem] font-extrabold leading-none tracking-[-0.03em] ${plan.featured ? 'text-white' : 'text-[#0B1B63]'}`}>
                      {plan.price}
                    </p>
                    <span className={`pb-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${plan.featured ? 'text-white/60' : 'text-[#5F7186]'}`}>
                      + IVA
                    </span>
                  </div>
                  <div className={`my-6 h-px ${plan.featured ? 'bg-white/12' : 'bg-[#EDF1F7]'}`} />
                  <p className={`text-sm ${plan.featured ? 'text-white/75' : 'text-[#526477]'}`}>{plan.priceDetail}</p>
                  <p className={`mt-1.5 text-sm font-semibold ${plan.featured ? 'text-white/90' : 'text-[#34465D]'}`}>{plan.billed}</p>

                  <ul className="mt-6 flex-grow space-y-3">
                    {[
                      'Página web profesional',
                      'Hosting y seguridad SSL incluidos',
                      'Funciona perfectamente en el móvil',
                      'Contacto directo',
                      'Opción de gestión del dominio (tuweb.es)',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm font-medium">
                        <Check size={16} strokeWidth={2.5} className={`mt-1 shrink-0 ${plan.featured ? 'text-[#9ED6F1]' : 'text-[#2A6D98]'}`} />
                        <span className={plan.featured ? 'text-white/85' : 'text-[#34465D]'}>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <RouterLink
                    to={plan.href}
                    className={`mt-8 inline-flex w-full items-center justify-center gap-3 rounded-[0.95rem] px-6 py-3.5 text-[0.98rem] font-semibold transition-colors duration-300 ${
                      plan.featured
                        ? 'bg-white text-[#0B1B63] hover:bg-[#D8ECFB]'
                        : 'border-2 border-brand-blue bg-white text-[#0B1B63] hover:bg-brand-blue/[0.12]'
                    }`}
                  >
                    Contratar este plan <ArrowRight size={17} />
                  </RouterLink>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA A MEDIDA */}
        <section className="bg-white py-10 sm:py-14 md:py-16">
          <div className="mx-auto w-full max-w-5xl px-5 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-[#0B1B63] p-7 text-white sm:p-10">
              <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-[#9ED6F1]/15 blur-3xl" aria-hidden />
              <div className="relative grid items-center gap-6 lg:grid-cols-[1fr_auto]">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9ED6F1]">¿Necesitas algo más completo?</p>
                  <h2 className="mt-3 font-display text-[1.6rem] font-extrabold leading-[1.12] tracking-[-0.03em] sm:text-[1.9rem]">
                    También podemos prepararte una propuesta a medida
                  </h2>
                  <p className="mt-4 max-w-3xl text-sm font-medium leading-[1.7] text-white/75 sm:text-base">
                    Si tu proyecto necesita varias páginas, tienda online, funcionalidades específicas o un planteamiento
                    completamente personalizado, lo trabajamos contigo aparte.
                  </p>
                </div>
                <RouterLink
                  to="/contacto"
                  className="inline-flex items-center justify-center gap-3 rounded-[1rem] bg-white px-7 py-3.5 text-[0.98rem] font-semibold text-[#0B1B63] transition-colors hover:bg-[#D8ECFB]"
                >
                  Contactar <ArrowRight size={17} />
                </RouterLink>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESO */}
        <section className="bg-[#F7F7F7] py-10 sm:py-14 md:py-16">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
            {sectionHeader('Proceso', 'Así preparamos tu Web Express')}

            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {processSteps.map((item) => (
                <article
                  key={item.step}
                  className="group rounded-2xl border border-[#E4E9F2] bg-white p-6 shadow-[0_8px_24px_-12px_rgba(11,27,99,0.06)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#C8DCF5] hover:shadow-[0_22px_56px_rgba(109,144,193,0.12)] sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-block rounded-full bg-[#E6F4FB] px-3.5 py-1 text-[11px] font-bold tracking-[0.14em] text-[#2A6D98]">
                      {item.step}
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B1B63] text-[#9ED6F1]">
                      <item.icon size={22} strokeWidth={1.8} />
                    </div>
                  </div>
                  <h3 className="mt-5 font-display text-[1.15rem] font-bold leading-[1.25] tracking-[-0.02em] text-[#0B1B63]">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm font-medium leading-[1.65] text-[#34465D]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-10 sm:py-14 md:py-16">
          <div className="mx-auto w-full max-w-3xl px-5 sm:px-6 lg:px-8">
            {sectionHeader(
              'Preguntas frecuentes',
              'Dudas habituales antes de contratar',
              'Las preguntas más comunes sobre el servicio, la propiedad y la gestión técnica.',
            )}

            <div className="mt-9 space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;

                return (
                  <article key={faq.question} className="overflow-hidden rounded-2xl border border-[#E4E9F2] bg-white shadow-[0_8px_24px_-16px_rgba(11,27,99,0.1)]">
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                    >
                      <h3 className="text-[0.98rem] font-bold tracking-[-0.01em] text-[#0B1B63] sm:text-base">
                        {faq.question}
                      </h3>
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E6F4FB] text-[#0B1B63] transition-transform duration-300">
                        {isOpen ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
                      </div>
                    </button>

                    {isOpen && (
                      <p className="px-5 pb-6 text-sm font-medium leading-[1.7] text-[#425776] sm:px-6 sm:text-[0.95rem]">
                        {faq.answer}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="bg-[#F7F7F7] py-10 sm:py-14 md:py-16">
          <div className="mx-auto w-full max-w-5xl px-5 sm:px-6 lg:px-8">
            <div className="rounded-[1.75rem] border border-[#C7E6F6] bg-[#F1F8FD] p-7 sm:p-10">
              <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2A6D98]">Compra online</p>
                  <h2 className="mt-3 font-display text-[1.6rem] font-extrabold leading-[1.12] tracking-[-0.03em] text-[#0B1B63] sm:text-[1.9rem]">
                    Activa tu Web Express hoy
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm font-medium leading-[1.7] text-[#425776] sm:text-base">
                    Pasa a la página de contratación, rellena los datos básicos de tu negocio y continúa al pago seguro con Stripe.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <RouterLink
                    to="/contratar-web-express?plan=annual"
                    className="brand-button brand-button--dark inline-flex items-center justify-center gap-3 px-7 py-3.5 text-[0.98rem] font-semibold"
                  >
                    Contratar anual <ArrowRight size={17} />
                  </RouterLink>
                  <RouterLink
                    to="/contratar-web-express?plan=monthly"
                    className="brand-button brand-button--outline inline-flex items-center justify-center gap-3 px-7 py-3.5 text-[0.98rem] font-semibold"
                  >
                    Contratar mensual <ArrowRight size={17} />
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
