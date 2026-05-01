const FORM_SUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/holaiconostudio@gmail.com';

const parseJsonBody = (body) => {
  if (!body) {
    return {};
  }

  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }

  return body;
};

const sanitizeForLog = (payload = {}) => ({
  origen_formulario: payload.origen_formulario || '',
  nombre: payload.nombre || '',
  email: payload.email || '',
  whatsapp: payload.whatsapp || '',
  negocio: payload.negocio || '',
  path_actual: payload.path_actual || '',
  tracking_landing_path: payload.tracking_landing_path || '',
  tracking_utm_source: payload.tracking_utm_source || '',
  tracking_utm_medium: payload.tracking_utm_medium || '',
  tracking_utm_campaign: payload.tracking_utm_campaign || '',
  tracking_gclid: payload.tracking_gclid || '',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  const payload = parseJsonBody(req.body);

  if (!payload.email || !payload.nombre || !payload.mensaje) {
    return res.status(400).json({
      ok: false,
      message: 'Faltan campos obligatorios en el lead.',
    });
  }

  console.log('[Icono Lead API] lead_received', sanitizeForLog(payload));

  try {
    const upstreamResponse = await fetch(FORM_SUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    let upstreamData = null;

    try {
      upstreamData = await upstreamResponse.json();
    } catch {
      upstreamData = null;
    }

    const success =
      upstreamResponse.ok &&
      upstreamData?.success !== false &&
      upstreamData?.success !== 'false';

    if (!success) {
      console.error('[Icono Lead API] upstream_error', {
        status: upstreamResponse.status,
        data: upstreamData,
      });

      return res.status(502).json({
        ok: false,
        message: upstreamData?.message || 'No se pudo enviar el lead al proveedor de email.',
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Lead enviado correctamente.',
      provider: 'formsubmit',
      data: upstreamData,
    });
  } catch (error) {
    console.error('[Icono Lead API] request_failed', error);

    return res.status(500).json({
      ok: false,
      message: 'Error interno al procesar el lead.',
    });
  }
}
