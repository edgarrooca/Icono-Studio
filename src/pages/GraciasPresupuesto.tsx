import { useEffect } from 'react';
import { ArrowRight, CheckCircle2, Clock3, MessageCircleMore, ShieldCheck } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SeoHead from '../components/SeoHead';
import { trackLeadThankYouPageConversion } from '../lib/analytics';
import { siteConfig } from '../lib/site';

const nextSteps = [
  {
    title: 'Revisamos tu solicitud',
    description: 'Vamos a leer lo que nos has enviado para entender bien tu proyecto y el tipo de web que necesitas.',
    icon: CheckCircle2,
  },
  {
    title: 'Te respondemos rápido',
    description: 'Normalmente contestamos en menos de 24 horas laborables con una orientación clara y sin rodeos.',
    icon: Clock3,
  },
  {
    title: 'Si quieres, lo agilizamos por WhatsApp',
    description: 'Si prefieres ir más al grano, puedes escribirnos ahora mismo y seguir la conversación por ahí.',
    icon: MessageCircleMore,
  },
] as const;

export default function GraciasPresupuesto() {
  useEffect(() => {
    trackLeadThankYouPageConversion();
  }, []);

  const thankYouSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Gracias por tu solicitud | ${siteConfig.name}`,
    url: `${siteConfig.url}${siteConfig.leadThankYouPath}`,
    description: 'Página de confirmación tras enviar una solicitud de presupuesto web.',
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F7F9FC] font-sans text-[#0B1B63] selection:bg-[#9ED6F1]/40 selection:text-[#0B1B63]">
      <SeoHead
        title="Gracias por tu solicitud | Icono Studio"
        description="Hemos recibido tu solicitud y te responderemos lo antes posible."
        path={siteConfig.leadThankYouPath}
        robots="noindex,nofollow"
        schema={thankYouSchema}
      />

      <div className="absolute top-0 z-50 w-full">
        <Navbar initialTheme="light" />
      </div>

      <main className="relative pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="pointer-events-none absolute -right-32 -top-40 h-[30rem] w-[30rem] rounded-full bg-[#D8ECFB] blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-44 left-[-6%] h-[22rem] w-[22rem] rounded-full bg-[#EAF5FA] blur-3xl" aria-hidden />
        </div>

        <section className="relative z-10 px-5 pb-16 sm:px-6 sm:pb-20 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <div className="overflow-hidden rounded-[1.75rem] border border-[#DCE5EE] bg-white shadow-[0_24px_80px_rgba(11,27,99,0.12)]">
              <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="p-7 sm:p-10 lg:p-14">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#E6F4FB] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0B1B63]">
                    <CheckCircle2 size={14} />
                    Solicitud recibida
                  </div>

                  <h1 className="mt-6 font-display text-[2.1rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#0B1B63] sm:text-[2.6rem]">
                    Gracias.{' '}
                    <span style={{ color: '#3E88AE' }}>Ya tenemos tu mensaje.</span>
                  </h1>
                  <p className="mt-5 max-w-2xl text-base font-medium leading-[1.7] text-[#425776] sm:text-lg">
                    Hemos recibido tu formulario correctamente. Ahora revisaremos tu proyecto y te responderemos con una
                    orientación clara para que sepas cuál es el siguiente paso.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                    <a
                      href={`${siteConfig.whatsappHref}?text=${encodeURIComponent('Hola, acabo de enviar el formulario de presupuesto en la web y quería comentaros mi proyecto por aquí.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="brand-button brand-button--outline inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[0.98rem] font-semibold"
                    >
                      Hablar por WhatsApp
                      <ArrowRight size={17} />
                    </a>

                    <RouterLink
                      to="/proyectos"
                      className="brand-button brand-button--outline inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[0.98rem] font-semibold"
                    >
                      Ver proyectos
                      <ArrowRight size={17} />
                    </RouterLink>
                  </div>

                  <div className="mt-8 rounded-[1.5rem] border border-[#C7E6F6] bg-[#F1F8FD] p-5 sm:p-6">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#9ED6F1] text-[#0B1B63]">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0B1B63]">Confirmación enviada</p>
                        <p className="mt-2 text-sm font-medium leading-relaxed text-[#425776] sm:text-[15px]">
                          Si nos has dejado WhatsApp o email, usaremos ese canal para responderte. Si necesitas adelantarnos algo,
                          también puedes escribirnos directamente al {siteConfig.phoneDisplay}.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#EDF1F7] bg-[#F7F9FC] p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
                  <div className="inline-block rounded-full bg-[#E6F4FB] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0B1B63]">
                    Qué ocurre ahora
                  </div>
                  <div className="mt-6 space-y-4">
                    {nextSteps.map((step) => {
                      const Icon = step.icon;

                      return (
                        <div key={step.title} className="rounded-2xl border border-[#E4E9F2] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(11,27,99,0.1)]">
                          <div className="flex items-start gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E6F4FB] text-[#2A6D98]">
                              <Icon size={20} />
                            </div>
                            <div>
                              <p className="text-sm font-bold tracking-[-0.01em] text-[#0B1B63]">{step.title}</p>
                              <p className="mt-2 text-sm font-medium leading-relaxed text-[#425776]">{step.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 rounded-2xl border border-[#C7E6F6] bg-[#F1F8FD] p-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2A6D98]">Contacto directo</p>
                    <div className="mt-3 space-y-2 text-sm font-medium text-[#425776]">
                      <p>
                        WhatsApp:{' '}
                        <a href={siteConfig.whatsappHref} className="font-semibold text-[#0B1B63] transition-colors hover:text-[#2A6D98]">
                          {siteConfig.phoneDisplay}
                        </a>
                      </p>
                      <p>
                        Email:{' '}
                        <a href={`mailto:${siteConfig.email}`} className="font-semibold text-[#0B1B63] transition-colors hover:text-[#2A6D98]">
                          {siteConfig.email}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer hideCTA />
    </div>
  );
}
