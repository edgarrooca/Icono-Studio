import Stripe from 'stripe';

const json = (res, status, payload) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
};

const asString = (value, max = 300) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return json(res, 405, { message: 'Method not allowed.' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return json(res, 500, { message: 'Missing STRIPE_SECRET_KEY.' });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-02-25.clover',
    });

    const sessionId = asString(req.query?.session_id);

    if (!sessionId) {
      return json(res, 400, { message: 'Missing session_id.' });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    let customerEmail = session.customer_details?.email || null;

    if (!customerEmail && session.customer && typeof session.customer === 'string') {
      const customer = await stripe.customers.retrieve(session.customer);
      if (!('deleted' in customer) || !customer.deleted) {
        customerEmail = customer.email || null;
      }
    }

    return json(res, 200, {
      status: session.status,
      payment_status: session.payment_status,
      customer_email: customerEmail,
    });
  } catch (error) {
    return json(res, 500, {
      message:
        error instanceof Error
          ? error.message
          : 'No hemos podido comprobar la sesión de pago.',
    });
  }
}
