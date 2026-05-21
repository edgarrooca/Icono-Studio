import Stripe from 'stripe';

const planPricing = {
  annual: {
    label: 'Web Express anual',
    amount: 11616,
    interval: 'year',
  },
  monthly: {
    label: 'Web Express mensual',
    amount: 1452,
    interval: 'month',
  },
};

const domainAmount = 2420;
const logoAmount = 6050;

const json = (res, status, payload) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
};

const asString = (value, max = 300) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

const asBool = (value) => value === true || value === 'true';

const getBaseUrl = (req) => {
  if (process.env.APP_URL) {
    return process.env.APP_URL.replace(/\/$/, '');
  }

  const forwardedProto = req.headers['x-forwarded-proto'];
  const protocol =
    typeof forwardedProto === 'string' && forwardedProto.length > 0
      ? forwardedProto.split(',')[0]
      : 'https';
  const host = req.headers.host || process.env.VERCEL_URL || 'icono.studio';

  return `${protocol}://${host}`.replace(/\/$/, '');
};

const buildLineItems = ({ plan, gestionarDominio, logoMode }) => {
  const selectedPlan = plan === 'monthly' ? planPricing.monthly : planPricing.annual;
  const lineItems = [
    {
      price_data: {
        currency: 'eur',
        unit_amount: selectedPlan.amount,
        recurring: {
          interval: selectedPlan.interval,
        },
        product_data: {
          name: selectedPlan.label,
        },
      },
      quantity: 1,
    },
  ];

  if (gestionarDominio) {
    lineItems.push({
      price_data: {
        currency: 'eur',
        unit_amount: domainAmount,
        ...(plan === 'annual'
          ? {
              recurring: {
                interval: 'year',
              },
            }
          : {}),
        product_data: {
          name:
            plan === 'annual'
              ? 'Gestión de dominio anual'
              : 'Gestión de dominio inicial',
        },
      },
      quantity: 1,
    });
  }

  if (logoMode === 'studio') {
    lineItems.push({
      price_data: {
        currency: 'eur',
        unit_amount: logoAmount,
        product_data: {
          name: 'Logo básico',
        },
      },
      quantity: 1,
    });
  }

  return lineItems;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, 405, { message: 'Method not allowed.' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return json(res, 500, { message: 'Missing STRIPE_SECRET_KEY.' });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-02-25.clover',
    });

    const body =
      typeof req.body === 'string'
        ? JSON.parse(req.body || '{}')
        : req.body || {};

    const plan = body.plan === 'monthly' ? 'monthly' : 'annual';
    const gestionarDominio = asBool(body.gestionarDominio);
    const logoMode =
      body.logoMode === 'studio'
        ? 'studio'
        : body.logoMode === 'later'
          ? 'later'
          : 'upload';

    const metadata = {
      source: 'web_express_checkout',
      plan,
      nombre: asString(body.nombre),
      negocio: asString(body.negocio),
      whatsapp: asString(body.whatsapp),
      email: asString(body.email),
      sector: asString(body.sector),
      ciudad: asString(body.ciudad),
      dominio_deseado: asString(body.dominioDeseado),
      gestionar_dominio: gestionarDominio ? 'yes' : 'no',
      logo_mode: logoMode,
    };

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      ui_mode: 'custom',
      return_url: `${getBaseUrl(req)}/gracias-web-express?session_id={CHECKOUT_SESSION_ID}`,
      customer_email: metadata.email || undefined,
      billing_address_collection: 'auto',
      line_items: buildLineItems({ plan, gestionarDominio, logoMode }),
      metadata,
      subscription_data: {
        metadata,
      },
    });

    return json(res, 200, {
      clientSecret: session.client_secret,
      sessionId: session.id,
    });
  } catch (error) {
    return json(res, 500, {
      message:
        error instanceof Error
          ? error.message
          : 'No hemos podido crear la sesión de pago.',
    });
  }
}
