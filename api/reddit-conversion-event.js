const defaultRedditPixelId = 'a2_j2mpb3v49ipk';

const allowedActionSources = new Set(['WEBSITE', 'APP', 'OTHER', 'PHYSICAL_STORE']);
const allowedTrackingTypes = new Set([
  'PAGE_VISIT',
  'VIEW_CONTENT',
  'SEARCH',
  'ADD_TO_CART',
  'ADD_TO_WISHLIST',
  'PURCHASE',
  'LEAD',
  'SIGN_UP',
  'CUSTOM',
]);

const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

const json = (res, status, payload) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
};

const asString = (value, max = 500) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

const asNumber = (value) => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
};

const getClientIp = (req) => {
  const forwardedFor = req.headers['x-forwarded-for'];
  const forwardedValue = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : asString(forwardedFor, 200);
  const firstIp = asString(forwardedValue.split(',')[0], 80).replace(/^::ffff:/, '');

  if (firstIp) {
    return firstIp;
  }

  const realIp = asString(req.headers['x-real-ip'], 80).replace(/^::ffff:/, '');
  if (realIp) {
    return realIp;
  }

  return asString(req.socket?.remoteAddress, 80).replace(/^::ffff:/, '');
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, 405, { message: 'Method not allowed.' });
  }

  const accessToken = asString(
    process.env.REDDIT_CONVERSION_ACCESS_TOKEN ||
      process.env.REDDIT_ADS_CONVERSIONS_TOKEN ||
      process.env.REDDIT_ADS_API_TOKEN,
    2000
  );

  if (!accessToken) {
    return json(res, 202, {
      ok: false,
      skipped: true,
      message: 'Reddit CAPI token is not configured.',
    });
  }

  try {
    const body =
      typeof req.body === 'string'
        ? JSON.parse(req.body || '{}')
        : req.body || {};

    const pixelId =
      asString(body.pixelId, 120) ||
      asString(process.env.REDDIT_PIXEL_ID, 120) ||
      defaultRedditPixelId;

    const trackingType = asString(body.trackingType, 64).toUpperCase();
    if (!allowedTrackingTypes.has(trackingType)) {
      return json(res, 400, {
        ok: false,
        message: 'Invalid trackingType. Use a Reddit CAPI v3 tracking type.',
      });
    }

    const customEventName = asString(body.customEventName, 64);
    if (trackingType === 'CUSTOM' && !customEventName) {
      return json(res, 400, {
        ok: false,
        message: 'customEventName is required when trackingType is CUSTOM.',
      });
    }

    const conversionId = asString(body.conversionId, 200);
    if (!conversionId) {
      return json(res, 400, {
        ok: false,
        message: 'conversionId is required for deduplication.',
      });
    }

    const now = Date.now();
    const rawEventAt = asNumber(body.eventAt);
    const eventAt =
      rawEventAt && rawEventAt > now - sevenDaysInMs && rawEventAt <= now + 60_000
        ? Math.round(rawEventAt)
        : now;

    const actionSourceInput = asString(body.actionSource, 64).toUpperCase();
    const actionSource = allowedActionSources.has(actionSourceInput)
      ? actionSourceInput
      : 'WEBSITE';

    const userAgent = asString(req.headers['user-agent'], 1000);
    const clientIp = getClientIp(req);

    const type = {
      tracking_type: trackingType,
      ...(trackingType === 'CUSTOM' && customEventName
        ? { custom_event_name: customEventName }
        : {}),
    };

    const metadata = {
      conversion_id: conversionId,
    };

    const value = asNumber(body.value);
    if (value !== null && value >= 0) {
      metadata.value = value;
    }

    const itemCount = asNumber(body.itemCount);
    if (itemCount !== null && itemCount >= 0) {
      metadata.item_count = Math.floor(itemCount);
    }

    const currency = asString(body.currency, 3).toUpperCase();
    if (currency.length === 3) {
      metadata.currency = currency;
    }

    const user = {
      email: asString(body.email, 320) || undefined,
      phone_number: asString(body.phoneNumber, 30) || undefined,
      external_id: asString(body.externalId, 200) || undefined,
      uuid: asString(body.uuid, 120) || undefined,
      aaid: asString(body.aaid, 120) || undefined,
      idfa: asString(body.idfa, 120) || undefined,
      ip_address: clientIp || undefined,
      user_agent: userAgent || undefined,
    };

    const event = {
      event_at: eventAt,
      action_source: actionSource,
      event_source_url: asString(body.eventSourceUrl, 1000) || undefined,
      click_id: asString(body.clickId, 120) || undefined,
      type,
      metadata,
      user,
    };

    const testId =
      asString(body.testId, 200) ||
      asString(process.env.REDDIT_CAPI_TEST_ID, 200) ||
      '';

    const payload = {
      data: {
        ...(testId ? { test_id: testId } : {}),
        events: [event],
      },
    };

    const response = await fetch(
      `https://ads-api.reddit.com/api/v3/pixels/${encodeURIComponent(pixelId)}/conversion_events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'User-Agent':
            process.env.REDDIT_CAPI_USER_AGENT ||
            'web:icono.studio:reddit-capi:v1 (by /u/iconostudio)',
        },
        body: JSON.stringify(payload),
      }
    );

    const responseText = await response.text();
    let responseJson = null;
    try {
      responseJson = responseText ? JSON.parse(responseText) : null;
    } catch {
      responseJson = null;
    }

    if (!response.ok) {
      return json(res, response.status, {
        ok: false,
        message: 'Reddit CAPI request failed.',
        reddit: responseJson || responseText,
      });
    }

    return json(res, 200, {
      ok: true,
      message:
        responseJson?.data?.message || 'Reddit CAPI event processed successfully.',
      reddit: responseJson,
    });
  } catch (error) {
    return json(res, 500, {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : 'Unexpected error while sending Reddit conversion event.',
    });
  }
}
