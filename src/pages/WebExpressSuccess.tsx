import { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Clock3, ShieldCheck } from 'lucide-react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SeoHead from '../components/SeoHead';
import { absoluteUrl, siteConfig } from '../lib/site';

type SessionStatusResponse = {
  status: 'open' | 'complete' | 'expired';
  payment_status: 'paid' | 'unpaid' | 'no_payment_required';
  customer_email?: string | null;
};

export default function WebExpressSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id') || '';
  const [state, setState] = useState<{
    loading: boolean;
    error: string;
    data: SessionStatusResponse | null;
  }>({
    loading: true,
    error: '',
    data: null,
  });

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!sessionId) {
        setState({
          loading: false,
          error: 'No hemos encontrado la referencia del pago.',
          data: null,
        });
        return;
      }

      try {
        const response = await fetch(`/api/web-express-session-status?session_id=${encodeURIComponent(sessionId)}`);
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(data.message || 'No hemos podido comprobar el estado del pago.');
        }

        if (!cancelled) {
          setState({
            loading: false,
            error: '',
            data,
          });

          if (data.payment_status === 'paid') {
            (window as any).dataLayer?.push({
              event: 'web_express_payment_success_view',
              session_id: sessionId,
              page_path: window.location.pathname,
            });
          }
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            loading: false,
            error: error instanceof Error ? error.message : 'No hemos podido comprobar el estado del pago.',
            data: null,
          });
        }
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const statusCopy = (() => {
    if (state.loading) {
      return {
        badge: 'Comprobando pago',
        title: 'Estamos confirmando tu contratación',
        description: 'En unos segundos validamos el estado del pago y te mostramos la confirmación.',
        icon: Clock3,
      };
    }

    if (state.error) {
      return {
        badge: 'Revisión manual',
        title: 'Necesitamos comprobar el pago',
        description: state.error,
        icon: ShieldCheck,
      };
    }

    if (state.data?.status === 'complete' && state.data.payment_status === 'paid') {
      return {
        badge: 'Pago confirmado',
        title: 'Tu Web Express ya está activada',
        description:
          'Hemos recibido el pago correctamente. Revisaremos los datos del pedido y te escribiremos para continuar con la puesta en marcha.',
        icon: CheckCircle2,
      };
    }

    return {
      badge: 'Pago en proceso',
      title: 'Tu contratación está en revisión',
      description:
        'La sesión se ha creado correctamente, pero el pago todavía aparece en proceso o pendiente de confirmación.',
      icon: Clock3,
    };
  })();

  const StatusIcon = statusCopy.icon;

  return (
    <div className="min-h-screen bg-brand-dark font-sans selection:bg-brand-lime selection:text-brand-dark overflow-x-hidden relative">
      <SeoHead
        title="Pago de Web Express | Icono Studio"
        description="Confirmación del pago y activación de Web Express."
        path="/gracias-web-express"
        robots="noindex,nofollow"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `Pago de Web Express | ${siteConfig.name}`,
          url: absoluteUrl('/gracias-web-express'),
          description: 'Página de confirmación del pago de Web Express.',
        }}
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
          <div className="max-w-6xl mx-auto">
            <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 shadow-[0_24px_80px_rgba(2,6,23,0.45)] backdrop-blur-md">
              <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
                <div className="p-7 sm:p-10 lg:p-14">
                  <div className="inline-flex items-center gap-2 rounded-full border border-brand-lime/20 bg-brand-lime/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-brand-lime">
                    <StatusIcon size={14} />
                    {statusCopy.badge}
                  </div>

                  <div className="mt-8">
                    <div className="ui-divider mb-6" />
                    <h1 className="ui-section-title text-white mb-6">{statusCopy.title}</h1>
                    <p className="max-w-2xl text-base sm:text-lg text-white/72 leading-relaxed font-medium">
                      {statusCopy.description}
                    </p>
                  </div>

                  {state.data?.customer_email ? (
                    <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-brand-blue/10 p-5 sm:p-6">
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-lime text-brand-dark">
                          <ShieldCheck size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-black uppercase tracking-[0.16em] text-white">Correo asociado</p>
                          <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-white/65">
                            Hemos vinculado la contratación a {state.data.customer_email}. Si hace falta, te escribiremos ahí para confirmar el siguiente paso.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="border-t border-white/10 bg-black/10 p-7 sm:p-10 lg:border-l lg:border-t-0 lg:border-white/10 lg:p-12">
                  <p className="ui-eyebrow text-brand-lime mb-4">Siguiente paso</p>
                  <div className="ui-divider mb-6" />

                  <div className="space-y-4">
                    {[
                      'Revisamos los datos del negocio y del dominio.',
                      'Comprobamos si el logo está adjunto o si hay que prepararlo.',
                      'Te contactamos para arrancar la publicación de la web.',
                    ].map((item) => (
                      <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                        <div className="flex items-start gap-3 text-sm leading-7 text-white/70">
                          <CheckCircle2 size={18} className="mt-1 shrink-0 text-brand-lime" />
                          <span>{item}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-col gap-3">
                    <a
                      href={`${siteConfig.whatsappHref}?text=${encodeURIComponent('Hola, acabo de contratar Web Express y quería dejaros un comentario sobre mi pedido.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-lime px-6 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-brand-dark transition-transform hover:scale-[1.02]"
                    >
                      Hablar por WhatsApp
                      <ArrowRight size={16} />
                    </a>

                    <RouterLink
                      to="/pagina-web-gratis"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-brand-dark"
                    >
                      Volver a Web Express
                      <ArrowRight size={16} />
                    </RouterLink>
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
