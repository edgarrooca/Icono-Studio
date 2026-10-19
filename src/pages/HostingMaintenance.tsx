import { useEffect, useState } from 'react';
import { ArrowRight, Check, ChevronDown, CircleCheck, Cloud, MessageCircle, Server, ShieldCheck, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import RelatedGuidesSection from '../components/RelatedGuidesSection';
import { blogSummariesSorted } from '../data/blogSummaries';
import { getBlogEntriesBySlugs } from '../lib/blogUtils';
import { absoluteUrl, siteConfig } from '../lib/site';
import { buildBreadcrumbSchema, buildOrganizationSchema, buildProviderReference } from '../lib/structuredData';

const pricingViews = [
  { key: 'hosting', label: 'Solo hosting' },
  { key: 'maintenance', label: 'Solo mantenimiento' },
  { key: 'bundle', label: 'Hosting + mantenimiento' },
] as const;

const heroProof = [
  { icon: Star, text: '5,0 en Google' },
  { icon: Users, text: '+120 clientes satisfechos' },
  { icon: ShieldCheck, text: 'Garantía de cuidado' },
];

const serviceBlocks = [
  {
    title: 'Hosting profesional',
    text: 'Tu web siempre disponible, en un servidor rápido y protegida con candado de seguridad (SSL).',
    icon: Server,
    items: ['Todo configurado por nosotros', 'Candado de seguridad SSL', 'Copias de seguridad'],
  },
  {
    title: 'Mantenimiento mensual',
    text: 'Revisamos tu web y aplicamos las actualizaciones necesarias para evitar errores y sustos.',
    icon: ShieldCheck,
    items: ['Revisiones técnicas', 'Actualizaciones seguras', 'Control de incidencias'],
  },
  {
    title: 'Soporte cercano',
    text: 'Cuando necesites un cambio o tengas una duda, tienes a alguien que conoce tu proyecto.',
    icon: MessageCircle,
    items: ['Dudas y orientación', 'Pequeños ajustes', 'Respuesta prioritaria'],
  },
];

const maintenancePlans = [
  {
    name: 'Básico',
    maintenancePrice: '30€',
    bundlePrice: '35€',
    maintenanceLink: 'https://buy.stripe.com/5kQdRbeGDeqm3kr2xIew801',
    bundleLink: 'https://buy.stripe.com/fZu7sN9mjgyu6wDgoyew804',
    label: 'Lo esencial',
    description: 'Para tener tu web actualizada y saber que alguien la está revisando.',
    features: ['Revisión mensual de seguridad', 'Actualizaciones del sistema', 'Resolución de errores menores', 'Soporte por email'],
    featured: false,
  },
  {
    name: 'Estándar',
    maintenancePrice: '50€',
    bundlePrice: '55€',
    maintenanceLink: 'https://buy.stripe.com/28E9AVaqn5TQf392xIew802',
    bundleLink: 'https://buy.stripe.com/eVqaEZ1TRaa6g7d3BMew805',
    label: 'El más elegido',
    description: 'La opción equilibrada para despreocuparte y tener soporte prioritario.',
    features: ['Revisión quincenal técnica', 'Soporte prioritario por WhatsApp o email', 'Pequeños cambios y ajustes', 'Informe mensual de estado', 'Cuidado post lanzamiento'],
    featured: true,
  },
  {
    name: 'Profesional',
    maintenancePrice: '80€',
    bundlePrice: '85€',
    maintenanceLink: 'https://buy.stripe.com/28EdRb2XV81Y3kr3BMew803',
    bundleLink: 'https://buy.stripe.com/28E4gBgOL5TQ3kra0aew806',
    label: 'Crecimiento',
    description: 'Para negocios que quieren seguir mejorando su web durante todo el año.',
    features: ['Horas de desarrollo incluidas', 'Plan de mejoras continuas', 'Ajustes de diseño y funciones', 'Soporte prioritario'],
    featured: false,
  },
];

const supportFaqs = [
  {
    q: '¿Está incluido el nombre del dominio?',
    a: 'El dominio no suele estar incluido en el precio base. Si ya tienes uno, nos encargamos de conectarlo. Si no, te ayudamos a comprar el más adecuado para ti.',
  },
  {
    q: '¿Puedo contratar solo el hosting?',
    a: 'Sí. Si solo necesitas alojamiento seguro con la configuración técnica base, puedes contratarlo sin añadir un plan de mantenimiento.',
  },
  {
    q: '¿Qué pasa si ya tengo un hosting contratado?',
    a: 'Podemos encargarnos solo del mantenimiento trabajando sobre tu servidor actual, siempre que cumpla los requisitos mínimos de seguridad y rendimiento.',
  },
  {
    q: '¿Cómo funciona el pack de hosting y mantenimiento?',
    a: 'Gestionamos ambas partes desde una sola cuota y ajustamos el precio para que resulte más sencillo y rentable que contratar cada servicio por separado.',
  },
  {
    q: '¿Trabajáis con webs que no habéis hecho vosotros?',
    a: 'Sí. Antes hacemos una revisión breve para entender cómo está construida y confirmar qué soporte podemos ofrecerte con garantías.',
  },
];

const hostingFeatures = ['Todo listo y optimizado para ti', 'Candado de seguridad SSL', 'Copias de seguridad', 'Revisión del estado'];

export default function HostingMaintenance() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [pricingView, setPricingView] = useState<(typeof pricingViews)[number]['key']>('bundle');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.innerWidth < 768) {
      setPricingView('hosting');
    }
  }, []);

  const supportSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationSchema(),
      buildBreadcrumbSchema([
        { name: 'Inicio', path: '/' },
        { name: 'Hosting y mantenimiento' },
      ]),
      {
        '@type': 'Service',
        '@id': absoluteUrl('/hosting-mantenimiento-web#service'),
        name: 'Hosting y mantenimiento web | ' + siteConfig.name,
        url: absoluteUrl('/hosting-mantenimiento-web'),
        description: 'Servicio de hosting, mantenimiento y soporte web para mantener tu proyecto rápido, seguro y actualizado.',
        provider: buildProviderReference(),
        serviceType: ['Hosting web', 'Mantenimiento web', 'Soporte técnico'],
        areaServed: ['España'],
        image: absoluteUrl(siteConfig.defaultOgImage),
      },
      {
        '@type': 'FAQPage',
        mainEntity: supportFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
    ],
  };

  const supportGuides = getBlogEntriesBySlugs(blogSummariesSorted, [
    'importancia-mantenimiento-web-negocio',
    'velocidad-web-importancia',
    'redisenar-migrar-web-sin-perder-seo-checklist',
  ]);

  const selectPricingView = (view: (typeof pricingViews)[number]['key']) => {
    setPricingView(view);
    (window as any).dataLayer?.push({
      event: 'support_view_change',
      view_type: view,
      view_label: pricingViews.find((item) => item.key === view)?.label,
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F7F9FC] font-sans text-[#0B1B63] selection:bg-[#9ED6F1]/40 selection:text-[#0B1B63]">
      <SeoHead
        title="Hosting y Mantenimiento Web | Icono Studio"
        description="Hosting, mantenimiento y soporte web para que tu proyecto esté siempre rápido, seguro y bien atendido. Planes claros, sin permanencias y con soporte directo."
        path="/hosting-mantenimiento-web"
        image="/home-hero-illustration-poster.png"
        type="service"
        schema={supportSchema}
      />

      <Navbar initialTheme="light" />

      <main>
        <section className="relative overflow-hidden bg-[#D8ECFB] px-5 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24">
          <div className="pointer-events-none absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-white/50 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-52 left-[35%] h-[26rem] w-[30rem] rounded-full bg-[#9ED6F1]/35 blur-3xl" />

          <div className="relative mx-auto grid w-full max-w-[1380px] items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
            <div className="max-w-[38rem]">
              <h1 className="mt-0 font-display text-[2.55rem] font-extrabold leading-[1.05] tracking-[-0.06em] text-[#0B1B63] sm:text-[3.1rem] lg:text-[3.5rem] xl:text-[4.1rem] 2xl:text-[4.6rem]">
                Tu web cuidada
                <span className="block text-[#2A6D98]">para seguir creciendo.</span>
              </h1>
              <p className="mt-6 max-w-[35rem] text-[1.02rem] font-medium leading-[1.75] text-[#29456F] sm:text-[1.1rem]">
                Hosting, mantenimiento y soporte real para que tu web siga rápida, segura y útil mientras tú te ocupas de tu negocio.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#planes"
                  id="cta_support_hero_plans"
                  onClick={() => (window as any).dataLayer?.push({ event: 'cta_click', cta_id: 'support_hero_plans', cta_text: 'Ver planes', page_path: window.location.pathname })}
                  className="brand-button brand-button--dark inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold"
                >
                  Ver planes <ArrowRight size={17} />
                </a>
                <Link to="/contacto" className="brand-button brand-button--outline inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold">
                  Hablar con nosotros <MessageCircle size={17} strokeWidth={1.8} />
                </Link>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#A6CDE5] pt-6 text-sm font-bold text-[#0B1B63]">
                <span className="inline-flex items-center gap-2"><CircleCheck size={16} className="text-[#2A6D98]" /> Sin permanencia</span>
                <span className="inline-flex items-center gap-2"><CircleCheck size={16} className="text-[#2A6D98]" /> Soporte directo</span>
                <span className="inline-flex items-center gap-2"><CircleCheck size={16} className="text-[#2A6D98]" /> Planes claros</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-[0.82rem] font-bold text-[#45617B]">
                {heroProof.map(({ icon: Icon, text }) => (
                  <span key={text} className="inline-flex items-center gap-2">
                    <Icon size={15} className="text-[#2A6D98]" strokeWidth={2} />
                    {text}
                  </span>
                ))}
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
                <div className="grid gap-3 px-2 pb-1 pt-4 sm:grid-cols-3 sm:px-3">
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.13em] text-[#5F7186]">Estado</p>
                    <p className="mt-1 text-sm font-bold text-[#0B1B63]">Todo bajo control</p>
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.13em] text-[#5F7186]">Respuesta</p>
                    <p className="mt-1 text-sm font-bold text-[#0B1B63]">Prioritaria</p>
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.13em] text-[#5F7186]">Cuidado</p>
                    <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-[#2A6D98]"><ShieldCheck size={15} /> Continuo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto w-full max-w-[1260px]">
            <div className="max-w-[42rem]">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2A6D98]">Una sola preocupación menos</p>
              <h2 className="mt-3 font-display text-[2.1rem] font-extrabold leading-[1.06] tracking-[-0.05em] text-[#0B1B63] sm:text-[2.8rem]">
                Nos ocupamos de la parte técnica.
              </h2>
              <p className="mt-4 max-w-[39rem] text-[1rem] font-medium leading-[1.75] text-[#526477]">
                Tu web no termina el día que la publicamos. La mantenemos en condiciones para que siga transmitiendo confianza y funcionando como debe.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {serviceBlocks.map(({ title, text, icon: Icon, items }, index) => (
                <article key={title} className="group rounded-[1.25rem] border border-[#DCE5EE] bg-[#F7F9FC] p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[#9ED6F1] hover:bg-white hover:shadow-[0_18px_44px_-28px_rgba(11,27,99,0.35)] sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D8ECFB] text-[#2A6D98]">
                      <Icon size={23} strokeWidth={1.7} />
                    </span>
                    <span className="font-display text-2xl font-bold text-[#3E88AE]">0{index + 1}</span>
                  </div>
                  <h3 className="mt-7 font-display text-xl font-extrabold tracking-[-0.035em] text-[#0B1B63]">{title}</h3>
                  <p className="mt-3 text-sm leading-[1.7] text-[#526477]">{text}</p>
                  <ul className="mt-6 grid gap-3 border-t border-[#DCE5EE] pt-5">
                    {items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm font-bold text-[#29456F]">
                        <Check size={16} className="shrink-0 text-[#2A6D98]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="planes" className="bg-[#F7F9FC] px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto w-full max-w-[1260px]">
            <div className="rounded-[1.75rem] bg-[#0B1B63] p-6 text-white shadow-[0_24px_70px_rgba(11,27,99,0.14)] sm:p-10 lg:p-14">
              <div className="flex flex-col gap-8 border-b border-white/15 pb-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-[42rem]">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9ED6F1]">Planes de cuidado</p>
                  <h2 className="mt-4 font-display text-[1.9rem] font-extrabold leading-[1.05] tracking-[-0.05em] sm:text-[2.6rem] lg:text-[3rem] xl:text-[3.3rem]">
                    Elige el nivel de ayuda
                    <span className="block text-[#3E88AE]">que necesita tu web.</span>
                  </h2>
                  <p className="mt-4 max-w-[38rem] text-[0.98rem] leading-[1.7] text-white/70">
                    Puedes contratar solo alojamiento, mantenimiento o combinar ambos servicios. Si no sabes cuál encaja, te orientamos.
                  </p>
                </div>
                <div className="flex max-w-full gap-1.5 overflow-x-auto rounded-full border border-white/15 bg-white/[0.06] p-1 scrollbar-hide" aria-label="Cambiar vista de planes">
                  {pricingViews.map((view) => (
                    <button
                      key={view.key}
                      type="button"
                      id={'cta_support_view_' + view.key}
                      onClick={() => selectPricingView(view.key)}
                      className={'shrink-0 rounded-full px-4 py-2.5 text-xs font-bold transition-colors ' + (
                        pricingView === view.key ? 'bg-[#9ED6F1] text-[#0B1B63]' : 'text-white/60 hover:text-white'
                      )}
                    >
                      {view.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                {pricingView === 'hosting' ? (
                  <div className="mx-auto max-w-[30rem] rounded-[1.25rem] border border-white/15 bg-white/[0.06] p-7 sm:p-9">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#9ED6F1]">Cuota mensual</p>
                        <h3 className="mt-2 font-display text-2xl font-extrabold">Solo hosting</h3>
                      </div>
                      <Cloud size={34} strokeWidth={1.4} className="text-[#9ED6F1]" />
                    </div>
                    <div className="mt-8 flex items-baseline gap-2">
                      <span className="font-display text-6xl font-extrabold tracking-[-0.06em]">8</span>
                      <span className="text-sm font-bold text-white/55">€ / mes + IVA</span>
                    </div>
                    <ul className="mt-8 grid gap-3 border-t border-white/15 pt-6">
                      {hostingFeatures.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm font-semibold text-white/80">
                          <Check size={16} className="shrink-0 text-[#9ED6F1]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="https://buy.stripe.com/aFaeVf0PNdmig7d0pAew800"
                      id="cta_support_buy_hosting_only"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => (window as any).dataLayer?.push({ event: 'support_checkout_click', plan_name: 'Solo Hosting', pricing_view: 'hosting' })}
                      className="brand-button mt-8 inline-flex w-full items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold"
                    >
                      Contratar hosting <ArrowRight size={17} />
                    </a>
                  </div>
                ) : (
                  <div className="grid gap-5 lg:grid-cols-3">
                    {maintenancePlans.map((plan) => (
                      <article key={plan.name} className={'relative flex flex-col rounded-[1.25rem] border p-6 sm:p-7 ' + (
                        plan.featured
                          ? 'border-[#9ED6F1]/70 bg-white/[0.1] shadow-[0_18px_50px_rgba(158,214,241,0.08)]'
                          : 'border-white/15 bg-white/[0.04]'
                      )}>
                        {plan.featured ? (
                          <span className="absolute -top-3 left-6 rounded-full bg-[#9ED6F1] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#0B1B63]">
                            {plan.label}
                          </span>
                        ) : null}
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#9ED6F1]">{plan.label}</p>
                        <h3 className="mt-3 font-display text-2xl font-extrabold">{plan.name}</h3>
                        <p className="mt-3 min-h-[4.2rem] text-sm leading-[1.65] text-white/65">{plan.description}</p>
                        <div className="mt-6 flex items-baseline gap-2">
                          <span className="font-display text-5xl font-extrabold tracking-[-0.06em]">
                            {(pricingView === 'bundle' ? plan.bundlePrice : plan.maintenancePrice).replace('€', '')}
                          </span>
                          <span className="text-sm font-bold text-white/55">€ / mes + IVA</span>
                        </div>
                        <ul className="mt-6 grid flex-1 gap-3 border-t border-white/15 pt-6">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3 text-sm font-semibold text-white/75">
                              <Check size={16} className="mt-0.5 shrink-0 text-[#9ED6F1]" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <a
                          href={pricingView === 'bundle' ? plan.bundleLink : plan.maintenanceLink}
                          id={'cta_support_buy_' + plan.name.toLowerCase()}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => (window as any).dataLayer?.push({ event: 'support_checkout_click', plan_name: plan.name, pricing_view: pricingView })}
                          className={'brand-button mt-7 inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold ' + (
                            plan.featured ? '' : 'brand-button--dark-outline'
                          )}
                        >
                          Elegir plan <ArrowRight size={16} />
                        </a>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto w-full max-w-[900px]">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2A6D98]">Preguntas frecuentes</p>
              <h2 className="mt-3 font-display text-[2.2rem] font-extrabold tracking-[-0.05em] text-[#0B1B63] sm:text-[3rem]">
                Todo claro antes de empezar.
              </h2>
              <p className="mx-auto mt-4 max-w-[38rem] text-[0.98rem] leading-[1.7] text-[#526477]">
                Si no encuentras aquí lo que buscas, escríbenos y te responderemos directamente.
              </p>
            </div>

            <div className="mt-10 grid gap-3">
              {supportFaqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div key={faq.q} className={'overflow-hidden rounded-[1rem] border bg-[#F7F9FC] transition-colors ' + (isOpen ? 'border-[#9ED6F1]' : 'border-[#DCE5EE]')}>
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                    >
                      <span className="text-sm font-bold text-[#0B1B63] sm:text-base">{faq.q}</span>
                      <ChevronDown size={18} className={'shrink-0 text-[#2A6D98] transition-transform ' + (isOpen ? 'rotate-180' : '')} />
                    </button>
                    {isOpen ? (
                      <div className="border-t border-[#DCE5EE] px-5 pb-5 pt-4 text-sm leading-[1.7] text-[#526477] sm:px-6">
                        {faq.a}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#F7F9FC] px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto w-full max-w-[1180px]">
            <RelatedGuidesSection
              title="Sigue aprendiendo sobre tu web"
              description="Estas guías te ayudarán a entender el mantenimiento, la velocidad y las decisiones técnicas que conviene tomar después de publicar."
              posts={supportGuides}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
