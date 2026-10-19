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
    <div className="relative min-h-screen overflow-x-hidden bg-[#F7F9FC] font-sans text-[#0B1B63] selection:bg-[#9ED6F1]/40 selection:text-[#0B1B63]">
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
              <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
                <div className="p-7 sm:p-10 lg:p-14">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#E6F4FB] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0B1B63]">
                    <StatusIcon size={14} />
                    {statusCopy.badge}
                  </div>

                  <h1 className="mt-6 font-display text-[2.1rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#0B1B63] sm:text-[2.6rem]">
                    {statusCopy.title}
                  </h1>
                  <p className="mt-5 max-w-2xl text-base font-medium leading-[1.7] text-[#425776] sm:text-lg">
                    {statusCopy.description}
                  </p>

                  {state.data?.customer_email ? (
                    <div className="mt-8 rounded-[1.5rem] border border-[#C7E6F6] bg-[#F1F8FD] p-5 sm:p-6">
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#9ED6F1] text-[#0B1B63]">
                          <ShieldCheck size={20} />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0B1B63]">Correo asociado</p>
                          <p className="mt-2 text-sm font-medium leading-relaxed text-[#425776] sm:text-[15px]">
                            Hemos vinculado la contratación a {state.data.customer_email}. Si hace falta, te escribiremos ahí para confirmar el siguiente paso.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="border-t border-[#EDF1F7] bg-[#F7F9FC] p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
                  <div className="inline-block rounded-full bg-[#E6F4FB] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0B1B63]">
                    Siguiente paso
                  </div>

                  <div className="mt-6 space-y-4">
                    {[
                      'Revisamos los datos del negocio y del dominio.',
                      'Comprobamos si el logo está adjunto o si hay que prepararlo.',
                      'Te contactamos para arrancar la publicación de la web.',
                    ].map((item) => (
                      <div key={item} className="rounded-2xl border border-[#E4E9F2] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(11,27,99,0.1)]">
                        <div className="flex items-start gap-3 text-sm font-medium leading-7 text-[#425776]">
                          <CheckCircle2 size={18} className="mt-1 shrink-0 text-[#2A6D98]" />
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
                      className="brand-button brand-button--outline inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[0.98rem] font-semibold"
                    >
                      Hablar por WhatsApp
                      <ArrowRight size={17} />
                    </a>

                    <RouterLink
                      to="/pagina-web-gratis"
                      className="brand-button brand-button--outline inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[0.98rem] font-semibold"
                    >
                      Volver a Web Express
                      <ArrowRight size={17} />
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
