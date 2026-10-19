import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, Clock3, Mail, MessageCircle, Phone, Send, Star, Users } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import { debugLeadFormButtonClick, debugLeadFormInvalid, debugLeadFormSubmitCapture, redirectToLeadThankYouPage, submitLeadForm } from '../lib/analytics';
import { absoluteUrl, siteConfig } from '../lib/site';
import { buildBreadcrumbSchema, buildOrganizationSchema } from '../lib/structuredData';
import RelatedGuidesSection from '../components/RelatedGuidesSection';
import { getBlogEntriesBySlugs } from '../lib/blogUtils';
import { blogSummariesSorted } from '../data/blogSummaries';

const inputClassName = 'w-full rounded-xl border border-[#DCE5EE] bg-[#F8FAFC] px-4 py-3 text-sm font-medium text-[#0B1B63] outline-none transition-[border-color,box-shadow,background-color] placeholder:text-[#91A0B0] focus:border-[#2A6D98] focus:bg-white focus:ring-4 focus:ring-[#9ED6F1]/25';
const labelClassName = 'mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#51667A]';

const contactProof = [
  { icon: Star, text: '5,0 en Google' },
  { icon: Users, text: '+120 clientes satisfechos' },
  { icon: Clock3, text: 'Respuesta en 24 h' },
];

interface ContactFormData {
  nombre: string;
  whatsapp: string;
  email: string;
  negocio: string;
  ciudad: string;
  necesidad: string;
  presupuesto: string;
  mensaje: string;
  privacidad: boolean;
}

const readChatPrefill = (): ContactFormData => {
  const emptyForm: ContactFormData = {
    nombre: '',
    whatsapp: '',
    email: '',
    negocio: '',
    ciudad: '',
    necesidad: '',
    presupuesto: '',
    mensaje: '',
    privacidad: false,
  };

  if (typeof window === 'undefined') return emptyForm;

  try {
    const rawPrefill = window.sessionStorage.getItem('icono_chat_prefill_v1');
    if (!rawPrefill) return emptyForm;

    const prefill = JSON.parse(rawPrefill) as Partial<ContactFormData>;
    return {
      ...emptyForm,
      nombre: typeof prefill.nombre === 'string' ? prefill.nombre : '',
      whatsapp: typeof prefill.whatsapp === 'string' ? prefill.whatsapp : '',
      email: typeof prefill.email === 'string' ? prefill.email : '',
      negocio: typeof prefill.negocio === 'string' ? prefill.negocio : '',
      ciudad: typeof prefill.ciudad === 'string' ? prefill.ciudad : '',
      necesidad: typeof prefill.necesidad === 'string' ? prefill.necesidad : '',
      presupuesto: typeof prefill.presupuesto === 'string' ? prefill.presupuesto : '',
      mensaje: typeof prefill.mensaje === 'string' ? prefill.mensaje : '',
    };
  } catch {
    return emptyForm;
  }
};

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>(readChatPrefill);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    window.sessionStorage.removeItem('icono_chat_prefill_v1');
  }, []);

  const contactSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationSchema(),
      buildBreadcrumbSchema([
        { name: 'Inicio', path: '/' },
        { name: 'Contacto' },
      ]),
      {
        '@type': 'ContactPage',
        '@id': absoluteUrl('/contacto#page'),
        name: 'Contacto | ' + siteConfig.name,
        url: absoluteUrl('/contacto'),
        about: { '@id': absoluteUrl('/#organization') },
      },
    ],
  };

  const contactGuides = getBlogEntriesBySlugs(blogSummariesSorted, [
    'que-debe-tener-una-pagina-web-para-atraer-clientes',
    'cuanto-cuesta-pagina-web-profesional-espana-2026',
    'errores-pagina-web-no-consigue-clientes',
  ]);

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
      const response = await submitLeadForm('contact_page_main', formData);

      if (response.ok) {
        setIsSubmitted(true);
        redirectToLeadThankYouPage('contact_page_main');
        return;
      }

      alert(response.data?.message || 'Hubo un error al enviar. Por favor, inténtalo de nuevo.');
    } catch {
      alert('Error de conexión.');
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F7F9FC] font-sans text-[#0B1B63] selection:bg-[#9ED6F1]/40 selection:text-[#0B1B63]">
      <SeoHead
        title="Presupuesto Web en Valencia | Contacto | Icono Studio"
        description="Cuéntanos tu proyecto y te responderemos con una propuesta clara para crear una web profesional, rápida y preparada para captar clientes."
        path="/contacto"
        image="/home-hero-illustration-poster.png"
        type="service"
        schema={contactSchema}
      />

      <Navbar initialTheme="light" />

      <main>
        <section className="relative overflow-hidden bg-[#D8ECFB] px-5 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8">
          <div className="pointer-events-none absolute -top-44 left-1/2 h-[32rem] w-[52rem] -translate-x-1/2 rounded-full bg-white/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-48 -right-24 h-[24rem] w-[24rem] rounded-full bg-[#9ED6F1]/40 blur-3xl" />

          <div className="relative mx-auto w-full max-w-[48rem] text-center">
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#9BC8E4] bg-white/60 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#28536E]">
                <span className="h-2 w-2 rounded-full bg-[#2A6D98]" aria-hidden="true" />
                Hablemos de tu proyecto
              </span>
            </div>

            <h1 className="mt-6 font-display text-[2.9rem] font-extrabold leading-[1.02] tracking-[-0.055em] text-[#0B1B63] sm:text-[3.7rem] lg:text-[4.1rem]">
              Tu nueva web
              <span className="block text-[#2A6D98]">empieza aquí.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-[34rem] text-[1.02rem] font-medium leading-[1.7] text-[#29456F] sm:text-[1.1rem]">
              Cuéntanos qué necesitas. Te ayudaremos a ordenar la idea, elegir el camino adecuado y convertirla en una web que dé confianza.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="brand-button brand-button--dark inline-flex items-center gap-2 px-6 py-3 text-sm font-bold"
              >
                <MessageCircle size={17} strokeWidth={1.8} />
                Escribir por WhatsApp
              </a>
              <a
                href={'mailto:' + siteConfig.email}
                className="brand-button brand-button--outline inline-flex items-center gap-2 px-6 py-3 text-sm font-bold"
              >
                <Mail size={17} strokeWidth={1.8} />
                Enviar un email
              </a>
            </div>

            <div className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[0.82rem] font-bold text-[#45617B]">
              {contactProof.map(({ icon: Icon, text }) => (
                <span key={text} className="inline-flex items-center gap-2">
                  <Icon size={15} className="text-[#2A6D98]" strokeWidth={2} />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="vlc-form" className="relative px-5 pb-16 pt-4 sm:px-6 sm:pb-20 lg:px-8">
          <div className="mx-auto w-full max-w-[46rem]">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2A6D98]">Pedir presupuesto</p>
              <h2 className="mt-4 font-display text-[1.9rem] font-extrabold leading-[1.14] tracking-[-0.045em] text-[#0B1B63] sm:text-[2.4rem]">
                Cuanto más nos cuentes, mejor podremos ayudarte.
              </h2>
              <p className="mx-auto mt-4 max-w-[32rem] text-[0.98rem] font-medium leading-[1.75] text-[#526477]">
                No hace falta que sepas de webs. Explícanos tu negocio con tus palabras y nosotros lo convertimos en una propuesta clara.
              </p>
            </div>

            <div className="mt-10 rounded-[1.75rem] border border-[#DCE5EE] bg-white p-5 shadow-[0_18px_55px_rgba(11,27,99,0.08)] sm:p-8">
              {isSubmitted ? (
                <div className="flex min-h-[24rem] flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E6F4FB] text-[#0B1B63]">
                    <Check size={28} />
                  </span>
                  <h2 className="mt-6 font-display text-2xl font-extrabold text-[#0B1B63]">Solicitud enviada</h2>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#526477]">Gracias por contarnos tu proyecto. Te responderemos lo antes posible.</p>
                  <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" className="brand-button brand-button--dark mt-6 inline-flex items-center gap-2 px-5 py-3 text-sm font-bold">
                    Hablar por WhatsApp <ArrowRight size={16} />
                  </a>
                </div>
              ) : (
                <>
                  <div className="mb-7 flex items-center justify-between gap-4">
                    <p className="font-display text-2xl font-extrabold tracking-[-0.04em] text-[#0B1B63]">Cuéntanos qué necesitas</p>
                    <span className="hidden shrink-0 rounded-full bg-[#F0F7FF] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#2A6D98] sm:inline-flex">Sin compromiso</span>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    onSubmitCapture={() => debugLeadFormSubmitCapture('contact_page_main')}
                    onInvalidCapture={(event) => {
                      const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
                      debugLeadFormInvalid('contact_page_main', target.name, target.validationMessage);
                    }}
                    className="space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-name" className={labelClassName}>Nombre</label>
                        <input id="contact-name" type="text" name="nombre" required value={formData.nombre} onChange={handleInputChange} placeholder="Tu nombre" className={inputClassName} />
                      </div>
                      <div>
                        <label htmlFor="contact-business" className={labelClassName}>Negocio o marca</label>
                        <input id="contact-business" type="text" name="negocio" required value={formData.negocio} onChange={handleInputChange} placeholder="Nombre de tu negocio" className={inputClassName} />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-phone" className={labelClassName}>WhatsApp o teléfono</label>
                        <input id="contact-phone" type="tel" name="whatsapp" required value={formData.whatsapp} onChange={handleInputChange} placeholder="600 000 000" className={inputClassName} />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className={labelClassName}>Email</label>
                        <input id="contact-email" type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="hola@tuweb.com" className={inputClassName} />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-city" className={labelClassName}>Ciudad</label>
                        <input id="contact-city" type="text" name="ciudad" value={formData.ciudad} onChange={handleInputChange} placeholder="Valencia, Madrid..." className={inputClassName} />
                      </div>
                      <div>
                        <label htmlFor="contact-need" className={labelClassName}>Qué quieres conseguir con tu web</label>
                        <select id="contact-need" name="necesidad" required value={formData.necesidad} onChange={handleInputChange} className={inputClassName}>
                          <option value="">Selecciona una opción</option>
                          <option value="corporativa">Mostrar y presentar mi negocio</option>
                          <option value="landing">Promocionar una oferta o campaña</option>
                          <option value="portfolio">Enseñar mis trabajos</option>
                          <option value="tienda">Vender por internet</option>
                          <option value="rediseño">Mejorar la web que ya tengo</option>
                          <option value="no-claro">No lo tengo claro</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-budget" className={labelClassName}>Presupuesto aproximado</label>
                      <select id="contact-budget" name="presupuesto" required value={formData.presupuesto} onChange={handleInputChange} className={inputClassName}>
                        <option value="">Selecciona un rango</option>
                        <option value="350-500">350 € a 500 €</option>
                        <option value="500-800">500 € a 800 €</option>
                        <option value="800-1200">800 € a 1.200 €</option>
                        <option value="1200+">Más de 1.200 €</option>
                        <option value="orientacion">Necesito orientación</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className={labelClassName}>Cuéntanos tu idea</label>
                      <textarea id="contact-message" name="mensaje" required rows={4} value={formData.mensaje} onChange={handleInputChange} placeholder="Qué haces, qué te gustaría mejorar y qué debería conseguir tu web..." className={inputClassName} />
                    </div>

                    <button
                      type="submit"
                      onClick={() => debugLeadFormButtonClick('contact_page_main')}
                      className="brand-button brand-button--dark inline-flex w-full items-center justify-center gap-2 px-6 py-4 text-sm font-bold"
                    >
                      Pedir presupuesto gratis <Send size={16} />
                    </button>
                  </form>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 border-t border-[#EDF1F5] pt-6 text-sm">
                    <span className="font-medium text-[#526477]">¿Prefieres hablar por teléfono?</span>
                    <a
                      href={siteConfig.phoneHref}
                      className="inline-flex items-center gap-2 font-bold text-[#0B1B63] transition-colors hover:text-[#2A6D98]"
                    >
                      <Phone size={16} className="text-[#2A6D98]" />
                      {siteConfig.phoneDisplay}
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="px-5 pb-16 sm:px-6 sm:pb-20 lg:px-8">
          <div className="mx-auto w-full max-w-[1180px]">
            <RelatedGuidesSection
              title="Antes de empezar, quizá te ayuden estas guías"
              description="Respuestas sencillas para entender qué necesita tu web, cuánto puede costar y qué conviene revisar antes de lanzarla."
              posts={contactGuides}
            />
          </div>
        </section>
      </main>

      <Footer hideCTA />
    </div>
  );
}
