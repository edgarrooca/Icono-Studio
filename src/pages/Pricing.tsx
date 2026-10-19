import React, { useEffect } from 'react';
import { m } from 'motion/react';
import { Check, ArrowRight, ShieldCheck, Star, Users } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import { absoluteUrl, siteConfig } from '../lib/site';
import { buildBreadcrumbSchema, buildOrganizationSchema, buildProviderReference } from '../lib/structuredData';
import RelatedGuidesSection from '../components/RelatedGuidesSection';
import { getBlogEntriesBySlugs } from '../lib/blogUtils';
import { blogSummariesSorted } from '../data/blogSummaries';

const EASE = [0.22, 1, 0.36, 1] as const;

const pricingProof = [
  { icon: Star, text: '5,0 en Google' },
  { icon: Users, text: '+120 clientes satisfechos' },
  { icon: ShieldCheck, text: 'Sin costes ocultos' },
];

const pricingTiers = [
  {
    name: 'Landing Page',
    description: 'Ideal para validar ideas, campañas publicitarias o captar leads rápidamente.',
    price: '350',
    from: 'Desde',
    features: [
      'Página única optimizada',
      'Copywriting persuasivo',
      'Diseño responsive',
      'Formulario de captación',
    ],
    featured: false,
  },
  {
    name: 'Web corporativa',
    description: 'Para empresas que buscan autoridad, credibilidad y presencia digital sólida.',
    price: '500 - 800',
    from: 'Desde',
    features: [
      'Hasta 5 páginas internas',
      'Diseño UX/UI a medida',
      'Optimización SEO On-page',
      'Panel autogestionable',
      'Integración de analítica',
    ],
    featured: true,
  },
  {
    name: 'Tienda online',
    description: 'Tiendas online de alto rendimiento diseñadas para maximizar las ventas.',
    price: '1.300',
    from: 'Desde',
    features: [
      'Catálogo de productos',
      'Pasarelas de pago seguras',
      'Gestión de stock y envíos',
      'Emails transaccionales',
      'Optimización de checkout',
    ],
    featured: false,
  },
  {
    name: 'A medida',
    description: 'Aplicaciones web complejas, portales personalizados e integraciones.',
    price: '2.000',
    from: 'Desde',
    features: [
      'Arquitectura escalable',
      'Integración de APIs externas',
      'Bases de datos complejas',
      'Panel de control custom',
      'Soporte técnico prioritario',
    ],
    featured: false,
  },
];

export default function Pricing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    { q: "¿El precio incluye el hosting y dominio?", a: "No. El dominio no está incluido, aunque podemos recomendarte la mejor opción y ayudarte a configurarlo. El hosting tampoco va incluido en el precio base, pero ofrecemos planes de mantenimiento y hosting para que te despreocupes de todo." },
    { q: "¿Hay algún coste oculto?", a: "No. Nuestros precios son cerrados para las funcionalidades detalladas en el presupuesto. Si a mitad de proyecto decides añadir funciones extra complejas, te informaremos del coste adicional antes de implementarlo." },
    { q: "¿Cómo se realiza el pago?", a: "Generalmente trabajamos con un anticipo del 50% al aceptar el presupuesto para reservar fechas y arrancar el diseño, y el 50% restante a la entrega y publicación final del proyecto." },
    { q: "¿Ofrecéis facilidades de pago o cuotas?", a: "Para proyectos a medida grandes, podemos estudiar dividir el pago en hitos de entrega. También disponemos de nuestro servicio Web Express, donde puedes pagar una cuota mensual por tener la web lista sin gran inversión inicial." }
  ];

  const pricingSchema = {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationSchema(),
      buildBreadcrumbSchema([
        { name: 'Inicio', path: '/' },
        { name: 'Precios' },
      ]),
      {
        "@type": "CollectionPage",
        "@id": absoluteUrl('/precios#page'),
        "name": `Precios | ${siteConfig.name}`,
        "url": absoluteUrl('/precios'),
        "description": 'Tarifas base para landing pages, webs corporativas, e-commerce y desarrollo a medida con enfoque comercial.',
        "about": {
          "@id": absoluteUrl('/#organization'),
        },
      },
      {
        "@type": "OfferCatalog",
        "@id": absoluteUrl('/precios#offers'),
        "name": 'Catálogo base de servicios web',
        "itemListElement": [
          {
            "@type": "Offer",
            "name": 'Landing Page',
            "priceCurrency": 'EUR',
            "price": '350',
            "url": absoluteUrl('/precios'),
            "itemOffered": {
              "@type": "Service",
              "name": 'Landing page de captación',
              "provider": buildProviderReference(),
            },
          },
          {
            "@type": "AggregateOffer",
            "name": 'Web corporativa',
            "priceCurrency": 'EUR',
            "lowPrice": '500',
            "highPrice": '800',
            "url": absoluteUrl('/precios'),
            "itemOffered": {
              "@type": "Service",
              "name": 'Web corporativa',
              "provider": buildProviderReference(),
            },
          },
          {
            "@type": "Offer",
            "name": 'Tienda online',
            "priceCurrency": 'EUR',
            "price": '1300',
            "url": absoluteUrl('/precios'),
            "itemOffered": {
              "@type": "Service",
              "name": 'E-commerce',
              "provider": buildProviderReference(),
            },
          },
          {
            "@type": "Offer",
            "name": 'Proyecto a medida',
            "priceCurrency": 'EUR',
            "price": '2000',
            "url": absoluteUrl('/precios'),
            "itemOffered": {
              "@type": "Service",
              "name": 'Desarrollo web a medida',
              "provider": buildProviderReference(),
            },
          },
        ],
      },
    ],
  };

  const pricingGuides = getBlogEntriesBySlugs(blogSummariesSorted, [
    'cuanto-cuesta-pagina-web-profesional-espana-2026',
    'pagina-web-barata-vs-profesional-comparativa',
    'landing-page-o-pagina-web-completa-diferencias',
  ]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-[#0B1B63] selection:bg-[#9ED6F1]/40 selection:text-[#0B1B63]">
      <SeoHead
        title="Precios Diseño Web | Icono Studio"
        description="Descubre nuestros planes de diseño web corporativo, landing pages y tiendas online. Tarifas claras, transparentes y orientadas a resultados para tu negocio."
        path="/precios"
        schema={pricingSchema}
      />
      <Navbar />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#F7F7F7] px-5 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8 lg:pb-20">
          <div className="pointer-events-none absolute -right-32 -top-40 h-[32rem] w-[32rem] rounded-full bg-[#D8ECFB] blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-44 left-[-6%] h-[24rem] w-[24rem] rounded-full bg-[#EAF5FA] blur-3xl" aria-hidden />

          <m.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative mx-auto max-w-3xl text-center"
          >
            <div className="inline-block rounded-full bg-[#E6F4FB] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0B1B63]">
              Precios claros
            </div>
            <h1 className="mt-5 font-display text-[2.1rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#0B1B63] sm:text-[2.6rem] lg:text-[3rem]">
              Transparencia desde{' '}
              <span style={{ color: '#3E88AE' }}>el primer clic</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl font-sans text-[1rem] font-medium leading-[1.68] text-[#1F3572] sm:text-[1.06rem]">
              Sin letra pequeña. Te mostramos nuestras tarifas base para que puedas hacerte una idea real de la inversión necesaria para tu próximo proyecto digital.
            </p>
          </m.div>
        </section>

        {/* PRICING CARDS */}
        <section className="relative bg-white py-10 sm:py-14 md:py-16">
          <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {pricingTiers.map((tier, index) => (
                <m.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
                  className={`group relative flex h-full flex-col rounded-[1.5rem] border bg-white p-6 shadow-[0_8px_24px_-12px_rgba(11,27,99,0.08)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 sm:p-7 ${
                    tier.featured
                      ? 'border-[#9ED6F1] ring-1 ring-[#9ED6F1] hover:border-[#9ED6F1] hover:shadow-[0_22px_56px_rgba(109,144,193,0.16)]'
                      : 'border-[#E4E9F2] hover:border-[#C8DCF5] hover:shadow-[0_22px_56px_rgba(109,144,193,0.12)]'
                  }`}
                >
                  {tier.featured && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#0B1B63] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-md">
                      El más elegido
                    </div>
                  )}
                  <h2 className="font-display text-[1.35rem] font-extrabold tracking-[-0.02em] text-[#0B1B63]">
                    {tier.name}
                  </h2>
                  <p className="mt-2.5 text-sm font-medium leading-[1.6] text-[#34465D]">
                    {tier.description}
                  </p>

                  <div className="mt-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#2A6D98]">
                      {tier.from}
                    </p>
                    <div className="mt-1.5 flex items-baseline gap-1">
                      <span className="font-display text-[2.15rem] font-extrabold leading-none tracking-[-0.03em] text-[#0B1B63]">
                        {tier.price}
                      </span>
                      <span className="text-lg font-semibold text-[#5F7186]">
                        € <span className="text-xs uppercase tracking-tight">+ IVA</span>
                      </span>
                    </div>
                  </div>

                  <div className="my-6 h-px w-full bg-[#EDF1F7]" />

                  <ul className="mb-7 flex-grow space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm font-medium text-[#34465D]">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E6F4FB]">
                          <Check size={12} strokeWidth={3} className="text-[#2A6D98]" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <RouterLink
                    to="/contacto"
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-[0.9rem] px-5 py-3 text-sm font-semibold transition-colors duration-300 ${
                      tier.featured
                        ? 'bg-[#0B1B63] text-white hover:bg-[#1F3572]'
                        : 'border-2 border-brand-blue bg-white text-[#0B1B63] hover:bg-brand-blue/[0.12]'
                    }`}
                  >
                    Solicitar presupuesto
                  </RouterLink>
                </m.div>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-x-8 gap-y-3 border-t border-[#EDF1F7] pt-6 sm:flex-row sm:flex-wrap">
              {pricingProof.map(({ icon: Icon, text }) => (
                <span key={text} className="inline-flex items-center gap-2 text-[0.82rem] font-bold text-[#526477]">
                  <Icon size={15} className="text-[#2A6D98]" strokeWidth={2} />
                  {text}
                </span>
              ))}
            </div>
            <p className="mt-5 text-center text-xs font-medium text-[#5F7186] sm:text-[13px]">
              * Todos los precios son sin IVA. El coste final dependerá de los requisitos exactos de tu proyecto. Los precios son cerrados: si añadimos algo, lo acordamos contigo antes.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="relative bg-[#F7F7F7] py-10 sm:py-12 md:py-16">
          <div className="relative mx-auto w-full max-w-5xl px-5 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-block rounded-full bg-[#E6F4FB] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0B1B63]">
                Dudas frecuentes
              </div>
              <h2 className="mt-3 font-display text-[1.85rem] font-extrabold leading-[1.08] tracking-[-0.032em] text-[#0B1B63] sm:text-[2rem] lg:text-[2.15rem]">
                Dudas habituales sobre <span style={{ color: '#3E88AE' }}>presupuestos</span>
              </h2>
            </div>

            <div className="mt-9 grid gap-5 sm:grid-cols-2">
              {faqs.map((faq) => (
                <div key={faq.q} className="rounded-2xl border border-[#E4E9F2] bg-white p-6 shadow-[0_8px_24px_-12px_rgba(11,27,99,0.06)]">
                  <h3 className="font-display text-[1.05rem] font-bold leading-[1.3] text-[#0B1B63]">
                    {faq.q}
                  </h3>
                  <p className="mt-2.5 text-sm font-medium leading-[1.7] text-[#34465D]">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative bg-white py-10 sm:py-12 md:py-16">
          <div className="relative mx-auto w-full max-w-5xl px-5 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-[#C7E6F6] bg-[#F1F8FD] px-6 py-10 text-center sm:px-12 sm:py-14">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/60 blur-2xl" aria-hidden />
              <div className="relative">
                <h2 className="font-display text-[1.7rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#0B1B63] sm:text-[2.1rem]">
                  ¿No tienes claro cuál es para ti?
                </h2>
                <p className="mx-auto mt-4 max-w-2xl font-sans text-[0.98rem] font-medium leading-[1.68] text-[#425776] sm:text-[1.02rem]">
                  Cada proyecto es un mundo. Cuéntanos qué necesitas y te preparamos una propuesta a medida, sin ningún tipo de compromiso.
                </p>
                <div className="mt-8 flex justify-center">
                  <RouterLink
                    to="/contacto"
                    className="brand-button brand-button--outline inline-flex min-w-[17.5rem] items-center justify-center gap-3 px-8 py-[1.1rem] font-sans text-[1.06rem] font-semibold sm:min-w-[18.5rem] sm:text-[1.1rem]"
                  >
                    Cuéntanos tu proyecto <ArrowRight size={18} />
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GUIDES */}
        <section className="bg-[#F7F7F7] px-5 pb-14 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
          <div className="mx-auto w-full max-w-5xl">
            <RelatedGuidesSection
              title="Guías que ayudan a decidir mejor"
              description="Estas lecturas resuelven las objeciones más habituales sobre precio, diferencia entre una web barata y una profesional, y cuándo compensa una landing frente a una web completa."
              posts={pricingGuides}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
