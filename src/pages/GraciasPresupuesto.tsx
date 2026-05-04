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
    <div className="min-h-screen bg-brand-dark font-sans selection:bg-brand-lime selection:text-brand-dark overflow-x-hidden relative">
      <SeoHead
        title="Gracias por tu solicitud | Icono Studio"
        description="Hemos recibido tu solicitud y te responderemos lo antes posible."
        path={siteConfig.leadThankYouPath}
        robots="noindex,nofollow"
        schema={thankYouSchema}
      />

      <div className="absolute top-0 w-full z-50">
        <Navbar initialTheme="dark" />
      </div>

      <main className="pt-28 pb-0 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-28 left-0 h-72 w-72 rounded-full bg-brand-blue/25 blur-3xl" />
          <div className="absolute top-40 right-0 h-80 w-80 rounded-full bg-brand-lime/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.06] bg-blueprint" />
        </div>

        <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 shadow-[0_24px_80px_rgba(2,6,23,0.45)] backdrop-blur-md">
              <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-0">
                <div className="relative p-7 sm:p-10 lg:p-14">
                  <div className="inline-flex items-center gap-2 rounded-full border border-brand-lime/20 bg-brand-lime/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-brand-lime">
                    <CheckCircle2 size={14} />
                    Solicitud recibida
                  </div>

                  <div className="mt-8">
                    <div className="ui-divider mb-6"></div>
                    <h1 className="ui-section-title text-white mb-6">
                      Gracias. <br />
                      <span className="text-brand-lime italic font-normal">Ya tenemos tu mensaje.</span>
                    </h1>
                    <p className="max-w-2xl text-base sm:text-lg text-white/72 leading-relaxed font-medium">
                      Hemos recibido tu formulario correctamente. Ahora revisaremos tu proyecto y te responderemos con una
                      orientación clara para que sepas cuál es el siguiente paso.
                    </p>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <a
                      href={`${siteConfig.whatsappHref}?text=${encodeURIComponent('Hola, acabo de enviar el formulario de presupuesto en la web y quería comentaros mi proyecto por aquí.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-lime px-6 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-brand-dark transition-transform hover:scale-[1.02]"
                    >
                      Hablar por WhatsApp
                      <ArrowRight size={16} />
                    </a>

                    <RouterLink
                      to="/proyectos"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-brand-dark"
                    >
                      Ver proyectos
                      <ArrowRight size={16} />
                    </RouterLink>
                  </div>

                  <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-brand-blue/10 p-5 sm:p-6">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-lime text-brand-dark">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-black uppercase tracking-[0.16em] text-white">Confirmación enviada</p>
                        <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-white/65">
                          Si nos has dejado WhatsApp o email, usaremos ese canal para responderte. Si necesitas adelantarnos algo,
                          también puedes escribirnos directamente al {siteConfig.phoneDisplay}.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 lg:border-t-0 lg:border-l lg:border-white/10 bg-black/10 p-7 sm:p-10 lg:p-12">
                  <p className="ui-eyebrow text-brand-lime mb-4">Qué ocurre ahora</p>
                  <div className="ui-divider mb-6"></div>
                  <div className="space-y-4">
                    {nextSteps.map((step) => {
                      const Icon = step.icon;

                      return (
                        <div key={step.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                          <div className="flex items-start gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/8 text-brand-lime">
                              <Icon size={20} />
                            </div>
                            <div>
                              <p className="text-sm font-black uppercase tracking-[0.14em] text-white">{step.title}</p>
                              <p className="mt-2 text-sm leading-relaxed text-white/62">{step.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 rounded-[1.5rem] border border-brand-lime/20 bg-brand-lime/8 p-5">
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-lime">Contacto directo</p>
                    <div className="mt-3 space-y-2 text-sm text-white/72">
                      <p>
                        WhatsApp: <a href={siteConfig.whatsappHref} className="text-white hover:text-brand-lime transition-colors">{siteConfig.phoneDisplay}</a>
                      </p>
                      <p>
                        Email: <a href={`mailto:${siteConfig.email}`} className="text-white hover:text-brand-lime transition-colors">{siteConfig.email}</a>
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
