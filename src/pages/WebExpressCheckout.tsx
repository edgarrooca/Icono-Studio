import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  ChevronDown,
  ImageUp,
  LoaderCircle,
  LockKeyhole,
  PencilLine,
} from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CheckoutElementsProvider,
  PaymentElement,
  useCheckoutElements,
} from '@stripe/react-stripe-js/checkout';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import {
  debugLeadFormButtonClick,
  debugLeadFormInvalid,
  debugLeadFormSubmitCapture,
  submitLeadFormWithFiles,
} from '../lib/analytics';
import { absoluteUrl, siteConfig } from '../lib/site';

type PlanKey = 'annual' | 'monthly';
type LogoMode = 'upload' | 'later' | 'studio';

type SessionRequestPayload = {
  nombre: string;
  negocio: string;
  whatsapp: string;
  email: string;
  sector: string;
  ciudad: string;
  plan: PlanKey;
  dominioDeseado: string;
  gestionarDominio: boolean;
  logoMode: LogoMode;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);

const roundPrice = (value: number) => Math.round(value * 100) / 100;
const vatMultiplier = 1.21;
const domainManagementExVat = 20;
const logoCreationExVat = 50;
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY?.trim() || '';
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

const planContent = {
  annual: {
    name: 'Plan anual',
    headline: '8 € / mes',
    exVatNote: '+ IVA',
    billing: 'Facturado anualmente · 116,16 € al año IVA incluido',
  },
  monthly: {
    name: 'Plan mensual',
    headline: '12 € / mes',
    exVatNote: '+ IVA',
    billing: '14,52 € al mes IVA incluido',
  },
} satisfies Record<PlanKey, {
  name: string;
  headline: string;
  exVatNote: string;
  billing: string;
}>;

function EmbeddedStripeCheckout({
  clientSecretPromise,
  onBeforeConfirm,
  onSuccess,
  onError,
}: {
  clientSecretPromise: Promise<string>;
  onBeforeConfirm: () => Promise<boolean>;
  onSuccess: (sessionId: string) => void;
  onError: (message: string) => void;
}) {
  if (!stripePromise) {
    return (
      <div className="rounded-[1.5rem] border border-dashed border-gray-200 bg-[#FAFAFA] p-5 text-sm leading-7 text-gray-600">
        Añade `VITE_STRIPE_PUBLISHABLE_KEY` y `STRIPE_SECRET_KEY` para activar el pago inline de Stripe.
      </div>
    );
  }

  return (
    <CheckoutElementsProvider
      stripe={stripePromise}
      options={{
        clientSecret: clientSecretPromise,
        elementsOptions: {
          appearance: {
            theme: 'stripe',
            variables: {
              colorPrimary: '#0F172A',
              colorBackground: '#FFFFFF',
              colorText: '#0F172A',
              colorDanger: '#B91C1C',
              borderRadius: '18px',
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              spacingUnit: '4px',
            },
          },
          loader: 'auto',
        },
      }}
    >
      <EmbeddedStripeCheckoutForm
        onBeforeConfirm={onBeforeConfirm}
        onSuccess={onSuccess}
        onError={onError}
      />
    </CheckoutElementsProvider>
  );
}

function EmbeddedStripeCheckoutForm({
  onBeforeConfirm,
  onSuccess,
  onError,
}: {
  onBeforeConfirm: () => Promise<boolean>;
  onSuccess: (sessionId: string) => void;
  onError: (message: string) => void;
}) {
  const checkoutState = useCheckoutElements();
  const [isConfirming, setIsConfirming] = useState(false);

  const handlePayment = async () => {
    onError('');

    if (checkoutState.type !== 'success') {
      return;
    }

    setIsConfirming(true);

    try {
      const leadReady = await onBeforeConfirm();
      if (!leadReady) {
        setIsConfirming(false);
        return;
      }

      const result = await checkoutState.checkout.confirm({
        redirect: 'if_required',
        returnUrl:
          typeof window !== 'undefined'
            ? `${window.location.origin}/gracias-web-express?session_id={CHECKOUT_SESSION_ID}`
            : absoluteUrl('/gracias-web-express?session_id={CHECKOUT_SESSION_ID}'),
      });

      if (result.type === 'error') {
        onError(result.error.message || 'No hemos podido completar el pago.');
        setIsConfirming(false);
        return;
      }

      onSuccess(result.session.id);
    } catch {
      onError('Ha habido un problema al preparar el pago. Inténtalo de nuevo.');
      setIsConfirming(false);
    }
  };

  if (checkoutState.type === 'loading') {
    return (
      <div className="rounded-[1.5rem] border border-gray-100 bg-white p-5">
        <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
          <LoaderCircle size={16} className="animate-spin" />
          Cargando el formulario de pago
        </div>
      </div>
    );
  }

  if (checkoutState.type === 'error') {
    return (
      <div className="rounded-[1.5rem] border border-dashed border-gray-200 bg-[#FAFAFA] p-5 text-sm leading-7 text-gray-600">
        No hemos podido cargar Stripe en este momento. Revisa la configuración del checkout o inténtalo más tarde.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-[1.5rem] border border-gray-100 bg-white p-4 sm:p-5">
        <PaymentElement options={{ layout: 'accordion' }} />
      </div>

      <button
        type="button"
        onClick={handlePayment}
        disabled={isConfirming}
        className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand-lime px-6 py-4 text-[11px] font-black uppercase tracking-[0.22em] text-brand-dark transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isConfirming ? (
          <>
            <LoaderCircle size={16} className="animate-spin" />
            Procesando pago
          </>
        ) : (
          <>
            Pagar ahora
            <ArrowRight size={16} />
          </>
        )}
      </button>
    </div>
  );
}

export default function WebExpressCheckout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const requestedPlan = searchParams.get('plan') === 'monthly' ? 'monthly' : 'annual';
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const leadSubmittedRef = useRef(false);

  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    nombre: '',
    negocio: '',
    whatsapp: '',
    email: '',
    sector: '',
    ciudad: '',
    plan: requestedPlan as PlanKey,
    dominioDeseado: '',
    gestionarDominio: true,
    logoMode: 'upload' as LogoMode,
    privacidad: false,
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [paymentError, setPaymentError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setFormData((current) => ({
      ...current,
      plan: requestedPlan,
    }));
  }, [requestedPlan]);

  useEffect(() => {
    leadSubmittedRef.current = false;
  }, [
    formData.ciudad,
    formData.dominioDeseado,
    formData.email,
    formData.gestionarDominio,
    formData.logoMode,
    formData.negocio,
    formData.nombre,
    formData.plan,
    formData.sector,
    formData.whatsapp,
    logoFile,
  ]);

  const summary = useMemo(() => {
    const planIncVat = formData.plan === 'annual' ? roundPrice(96 * vatMultiplier) : roundPrice(12 * vatMultiplier);
    const domainIncVat = roundPrice(domainManagementExVat * vatMultiplier);
    const logoIncVat = roundPrice(logoCreationExVat * vatMultiplier);

    return {
      selectedPlan:
        formData.plan === 'annual'
          ? 'Plan anual · 8 € / mes + IVA · 116,16 € al año IVA incluido'
          : 'Plan mensual · 12 € / mes + IVA · 14,52 € al mes IVA incluido',
      domainSummary: formData.gestionarDominio ? 'Con gestión de dominio' : 'Sin gestión de dominio',
      logoSummary:
        formData.logoMode === 'upload'
          ? logoFile
            ? logoFile.name
            : 'Lo subirás antes de pagar'
          : formData.logoMode === 'studio'
            ? 'Logo básico con Icono Studio'
            : 'Lo enviarás después',
      billingNote:
        formData.plan === 'annual'
          ? 'El plan anual se renueva por anualidades completas.'
          : 'El plan mensual se renueva mes a mes.',
      firstChargeNote:
        formData.plan === 'annual'
          ? `El primer pago incluye el plan anual${formData.gestionarDominio ? ', la gestión anual del dominio' : ''}${formData.logoMode === 'studio' ? ' y el logo básico' : ''}.`
          : `El primer pago incluye el primer mes${formData.gestionarDominio ? ', la gestión inicial del dominio' : ''}${formData.logoMode === 'studio' ? ' y el logo básico' : ''}.`,
      priceRows: [
        {
          label: formData.plan === 'annual' ? 'Web Express anual' : 'Web Express mensual',
          value: formData.plan === 'annual' ? `${formatCurrency(planIncVat)} / año` : `${formatCurrency(planIncVat)} / mes`,
          note: formData.plan === 'monthly' ? 'Se cobra de forma mensual.' : 'Se cobra una vez al año.',
        },
        ...(formData.gestionarDominio
          ? [
              {
                label: 'Gestión de dominio',
                value: formatCurrency(domainIncVat),
                note:
                  formData.plan === 'monthly'
                    ? 'Se añade al primer pago. La siguiente renovación anual se gestiona aparte.'
                    : 'Se suma al ciclo anual del plan.',
              },
            ]
          : []),
        ...(formData.logoMode === 'studio'
          ? [
              {
                label: 'Logo básico',
                value: formatCurrency(logoIncVat),
                note: 'Se añade una sola vez al primer pago.',
              },
            ]
          : []),
      ],
    };
  }, [formData.gestionarDominio, formData.logoMode, formData.plan, logoFile]);

  const sessionRequestPayload = useMemo<SessionRequestPayload>(
    () => ({
      nombre: formData.nombre,
      negocio: formData.negocio,
      whatsapp: formData.whatsapp,
      email: formData.email,
      sector: formData.sector,
      ciudad: formData.ciudad,
      plan: formData.plan,
      dominioDeseado: formData.dominioDeseado,
      gestionarDominio: formData.gestionarDominio,
      logoMode: formData.logoMode,
    }),
    [
      formData.ciudad,
      formData.dominioDeseado,
      formData.email,
      formData.gestionarDominio,
      formData.logoMode,
      formData.negocio,
      formData.nombre,
      formData.plan,
      formData.sector,
      formData.whatsapp,
    ]
  );

  const clientSecretPromise = useMemo(() => {
    if (step !== 2 || !stripePublishableKey) {
      return null;
    }

    return fetch('/api/web-express-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sessionRequestPayload),
    }).then(async (response) => {
      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.clientSecret) {
        throw new Error(data.message || 'No hemos podido preparar el pago.');
      }

      return data.clientSecret as string;
    });
  }, [sessionRequestPayload, step]);

  const checkoutSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Contratar Web Express | Icono Studio',
    url: absoluteUrl('/contratar-web-express'),
    description: 'Completa tus datos y realiza el pago seguro de Web Express desde la propia página.',
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;

    if (type === 'checkbox') {
      const target = event.target as HTMLInputElement;
      setFormData((current) => ({ ...current, [name]: target.checked }));
      return;
    }

    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setLogoFile(file);
  };

  const goToSummary = () => {
    setPaymentError('');

    if (!formRef.current?.reportValidity()) {
      formRef.current?.querySelector<HTMLElement>(':invalid')?.focus();
      return;
    }

    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prepareLeadSubmission = async () => {
    if (leadSubmittedRef.current) {
      return true;
    }

    const payload = {
      nombre: formData.nombre,
      negocio: formData.negocio,
      whatsapp: formData.whatsapp,
      email: formData.email,
      sector: formData.sector,
      ciudad: formData.ciudad,
      plan: formData.plan === 'annual' ? 'Plan anual' : 'Plan mensual',
      detalle_plan: summary.selectedPlan,
      dominio_deseado: formData.dominioDeseado,
      gestionar_dominio: formData.gestionarDominio,
      logo:
        formData.logoMode === 'upload'
          ? 'Sí, lo subo ahora'
          : formData.logoMode === 'studio'
            ? 'Prefiero que lo hagáis vosotros (+50 €)'
            : 'Lo enviaré después',
      detalle_primer_cobro: summary.firstChargeNote,
      detalle_facturacion: summary.billingNote,
      privacidad: formData.privacidad,
    };

    const files =
      formData.logoMode === 'upload' && logoFile
        ? [{ fieldName: 'logo_adjunto', file: logoFile }]
        : [];

    const response = await submitLeadFormWithFiles('web_express_checkout', payload, files);

    if (!response.ok) {
      setPaymentError(response.data?.message || 'No hemos podido guardar tus datos. Inténtalo de nuevo.');
      return false;
    }

    leadSubmittedRef.current = true;

    (window as any).dataLayer?.push({
      event: 'web_express_checkout_inline_ready',
      selected_plan: formData.plan,
      domain_managed: formData.gestionarDominio ? 'yes' : 'no',
      page_path: window.location.pathname,
    });

    return true;
  };

  const handlePaymentSuccess = (sessionId: string) => {
    (window as any).dataLayer?.push({
      event: 'web_express_payment_confirmed',
      selected_plan: formData.plan,
      page_path: window.location.pathname,
    });

    navigate(`/gracias-web-express?session_id=${encodeURIComponent(sessionId)}`);
  };

  return (
    <div className="min-h-screen bg-[#F3F6FB] font-sans text-brand-dark selection:bg-brand-lime selection:text-brand-dark">
      <SeoHead
        title="Contratar Web Express | Icono Studio"
        description="Completa tus datos y realiza el pago seguro de Web Express desde la propia página."
        path="/contratar-web-express"
        type="service"
        robots="noindex,nofollow"
        schema={checkoutSchema}
      />

      <Navbar initialTheme="dark" />

      <main className="pt-28 pb-24 sm:pt-32">
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <form
              ref={formRef}
              onSubmit={(event) => event.preventDefault()}
              onSubmitCapture={() => debugLeadFormSubmitCapture('web_express_checkout')}
              onInvalidCapture={(event) => {
                const target = event.target as HTMLInputElement | HTMLSelectElement;
                debugLeadFormInvalid('web_express_checkout', target.name, target.validationMessage);
              }}
              className="rounded-[2.2rem] border border-gray-100 bg-white p-5 shadow-[0_22px_70px_rgba(15,23,42,0.08)] sm:p-8"
            >
              <div className="mb-8 flex items-center justify-center gap-3">
                {[
                  { stepNumber: 1, label: 'Datos' },
                  { stepNumber: 2, label: 'Resumen' },
                ].map((item) => {
                  const active = step === item.stepNumber;
                  const completed = step > item.stepNumber;

                  return (
                    <React.Fragment key={item.stepNumber}>
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-black ${
                            active || completed
                              ? 'bg-brand-dark text-white'
                              : 'border border-gray-200 bg-[#FAFAFA] text-gray-400'
                          }`}
                        >
                          {completed ? <Check size={16} /> : item.stepNumber}
                        </div>
                        <span className={`text-[11px] font-black uppercase tracking-[0.18em] ${active ? 'text-brand-dark' : 'text-gray-400'}`}>
                          {item.label}
                        </span>
                      </div>
                      {item.stepNumber === 1 && <div className="h-px w-10 bg-gray-200" />}
                    </React.Fragment>
                  );
                })}
              </div>

              {step === 1 ? (
                <div className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {([
                      { label: 'Nombre', name: 'nombre', type: 'text', placeholder: 'Tu nombre' },
                      { label: 'Negocio', name: 'negocio', type: 'text', placeholder: 'Nombre comercial' },
                      { label: 'WhatsApp o teléfono', name: 'whatsapp', type: 'tel', placeholder: '600 000 000' },
                      { label: 'Correo', name: 'email', type: 'email', placeholder: 'hola@tunegocio.com' },
                      { label: 'Sector', name: 'sector', type: 'text', placeholder: 'Clínica, reformas, estudio...' },
                      { label: 'Ciudad / provincia', name: 'ciudad', type: 'text', placeholder: 'Valencia, Madrid, Sevilla...' },
                    ] as const).map((field) => (
                      <div key={field.name} className="space-y-1.5">
                        <label className="ui-form-label text-gray-400 ml-1">{field.label}</label>
                        <input
                          type={field.type}
                          name={field.name}
                          required
                          value={formData[field.name]}
                          onChange={handleInputChange}
                          placeholder={field.placeholder}
                          className="h-12 w-full rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 text-sm text-brand-dark placeholder:text-gray-400 focus:border-brand-blue focus:bg-white focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="rounded-[1.7rem] border border-gray-100 bg-[#FAFAFA] p-4 sm:p-5">
                    <p className="ui-form-label text-gray-400 mb-4 ml-1">Plan</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {(['annual', 'monthly'] as const).map((planKey) => {
                        const plan = planContent[planKey];
                        const selected = formData.plan === planKey;

                        return (
                          <label
                            key={planKey}
                            className={`cursor-pointer rounded-[1.4rem] border px-4 py-4 transition-colors ${
                              selected
                                ? 'border-brand-dark bg-white shadow-sm'
                                : 'border-gray-200 bg-white/80 hover:border-brand-blue/25'
                            }`}
                          >
                            <input
                              type="radio"
                              name="plan"
                              value={planKey}
                              checked={selected}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <h3 className="text-sm font-bold tracking-tight text-brand-dark">{plan.name}</h3>
                            <div className="mt-3 flex items-end gap-2">
                              <p className="font-display text-[1.85rem] leading-none text-brand-dark">{plan.headline}</p>
                              <span className="pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                                {plan.exVatNote}
                              </span>
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">{plan.billing}</p>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="rounded-[1.7rem] border border-gray-100 bg-[#FAFAFA] p-4 sm:p-5">
                    <div className="grid gap-4">
                      <div className="space-y-1.5">
                        <label className="ui-form-label text-gray-400 ml-1">Dominio que te gustaría usar</label>
                        <input
                          type="text"
                          name="dominioDeseado"
                          required
                          value={formData.dominioDeseado}
                          onChange={handleInputChange}
                          placeholder="tunegocio.es / tunegocio.com"
                          className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-brand-dark placeholder:text-gray-400 focus:border-brand-blue focus:outline-none"
                        />
                      </div>

                      <label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-brand-dark">
                        <input
                          type="checkbox"
                          name="gestionarDominio"
                          checked={formData.gestionarDominio}
                          onChange={handleInputChange}
                          className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                        />
                        Quiero que gestionéis el dominio
                      </label>
                    </div>
                  </div>

                  <div className="rounded-[1.7rem] border border-gray-100 bg-[#FAFAFA] p-4 sm:p-5">
                    <p className="ui-form-label text-gray-400 mb-4 ml-1">Logo</p>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {[
                        { value: 'upload', label: 'Subir logo ahora' },
                        { value: 'later', label: 'Lo enviaré después' },
                        { value: 'studio', label: 'Prefiero que lo hagáis vosotros · +50 €' },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`cursor-pointer rounded-[1.25rem] border px-4 py-4 transition-colors ${
                            formData.logoMode === option.value
                              ? 'border-brand-dark bg-white shadow-sm'
                              : 'border-gray-200 bg-white/80 hover:border-brand-blue/25'
                          }`}
                        >
                          <input
                            type="radio"
                            name="logoMode"
                            value={option.value}
                            checked={formData.logoMode === option.value}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <p className="text-sm font-semibold text-brand-dark">{option.label}</p>
                        </label>
                      ))}
                    </div>

                    {formData.logoMode === 'upload' && (
                      <div className="mt-4 rounded-[1.35rem] border border-dashed border-brand-blue/30 bg-white p-4">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".png,.jpg,.jpeg,.svg,.pdf"
                          onChange={handleLogoChange}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center gap-3 rounded-full bg-brand-dark px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-white"
                        >
                          <ImageUp size={16} />
                          {logoFile ? 'Cambiar archivo' : 'Subir logo'}
                        </button>
                        <p className="mt-3 text-sm text-gray-600">
                          {logoFile ? `Archivo seleccionado: ${logoFile.name}` : 'Acepta PNG, JPG, SVG o PDF.'}
                        </p>
                      </div>
                    )}
                  </div>

                  <label className="flex items-start gap-3 rounded-[1.4rem] border border-gray-200 bg-[#FAFAFA] p-4 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      name="privacidad"
                      required
                      checked={formData.privacidad}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                    />
                    <span>
                      Acepto las{' '}
                      <Link
                        to="/condiciones-web-express"
                        target="_blank"
                        className="underline decoration-brand-blue/40 underline-offset-4"
                      >
                        condiciones del servicio Web Express
                      </Link>
                      .
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      debugLeadFormButtonClick('web_express_checkout_next');
                      goToSummary();
                    }}
                    className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand-dark px-6 py-4 text-[11px] font-black uppercase tracking-[0.22em] text-white transition-transform hover:scale-[1.01]"
                  >
                    Siguiente
                    <ArrowRight size={16} />
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="rounded-[1.7rem] border border-gray-100 bg-[#FAFAFA] p-5">
                    <p className="ui-eyebrow text-gray-400 mb-4">Resumen del pedido</p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {[
                        {
                          label: 'Negocio',
                          value: formData.negocio,
                          detail: `${formData.sector} · ${formData.ciudad}`,
                        },
                        {
                          label: 'Contacto',
                          value: formData.nombre,
                          detail: `${formData.email} · ${formData.whatsapp}`,
                        },
                        {
                          label: 'Plan',
                          value: summary.selectedPlan,
                        },
                        {
                          label: 'Dominio',
                          value: formData.dominioDeseado,
                          detail: summary.domainSummary,
                        },
                        {
                          label: 'Logo',
                          value: summary.logoSummary,
                        },
                        {
                          label: 'Facturación',
                          value: summary.billingNote,
                          detail: summary.firstChargeNote,
                        },
                      ].map((item) => (
                        <div key={item.label} className="rounded-[1.25rem] border border-white bg-white px-4 py-4 shadow-sm">
                          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-400">{item.label}</p>
                          <p className="mt-2 text-sm font-semibold leading-6 text-brand-dark">{item.value}</p>
                          {item.detail ? <p className="mt-2 text-sm leading-6 text-gray-600">{item.detail}</p> : null}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.7rem] border border-brand-dark bg-brand-dark p-5 text-white">
                    <div className="mb-5 flex items-start gap-3">
                      <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/8 text-brand-lime">
                        <LockKeyhole size={18} />
                      </div>
                      <div>
                        <p className="ui-eyebrow text-brand-lime mb-3">Pago seguro</p>
                        <p className="text-sm leading-7 text-white/74">
                          Introduce la tarjeta y confirma el pago desde esta misma página. No te sacamos a una landing externa para cerrar la compra.
                        </p>
                      </div>
                    </div>

                    {paymentError ? (
                      <div className="mb-5 rounded-[1.2rem] border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                        {paymentError}
                      </div>
                    ) : null}

                    {clientSecretPromise ? (
                      <EmbeddedStripeCheckout
                        clientSecretPromise={clientSecretPromise}
                        onBeforeConfirm={async () => {
                          debugLeadFormButtonClick('web_express_checkout_pay');
                          return prepareLeadSubmission();
                        }}
                        onSuccess={handlePaymentSuccess}
                        onError={setPaymentError}
                      />
                    ) : (
                      <div className="rounded-[1.5rem] border border-dashed border-white/12 bg-white/5 p-5 text-sm leading-7 text-white/74">
                        Configura Stripe para activar el pago inline desde esta misma página.
                      </div>
                    )}
                  </div>

                  <details className="rounded-[1.7rem] border border-gray-100 bg-white p-5 group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                      <div>
                        <p className="ui-eyebrow text-gray-400 mb-2">Detalle económico</p>
                        <p className="text-sm font-semibold text-brand-dark">
                          Ver desglose de importes sin mostrar el total final aquí
                        </p>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-[#FAFAFA] text-brand-dark transition-transform group-open:rotate-180">
                        <ChevronDown size={18} />
                      </div>
                    </summary>

                    <div className="mt-5 space-y-4">
                      {summary.priceRows.map((row) => (
                        <div key={row.label} className="rounded-[1.25rem] border border-gray-100 bg-[#FAFAFA] px-4 py-4">
                          <div className="flex items-start justify-between gap-4">
                            <span className="text-sm font-medium text-brand-dark">{row.label}</span>
                            <span className="text-sm font-semibold text-brand-dark">{row.value}</span>
                          </div>
                          {row.note ? <p className="mt-2 text-sm leading-6 text-gray-600">{row.note}</p> : null}
                        </div>
                      ))}
                      <p className="text-sm leading-7 text-gray-500">
                        El total exacto se confirma dentro del pago seguro según la combinación que hayas elegido.
                      </p>
                    </div>
                  </details>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        setPaymentError('');
                      }}
                      className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-gray-200 bg-white px-6 py-4 text-[11px] font-black uppercase tracking-[0.22em] text-brand-dark transition-transform hover:scale-[1.01]"
                    >
                      <PencilLine size={16} />
                      Editar datos
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </section>
      </main>

      <Footer hideCTA />
    </div>
  );
}
