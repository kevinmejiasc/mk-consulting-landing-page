/**
 * Gamma Tech Group — Lead capture Worker (Cloudflare)
 * Receives form submissions from the landing page and emails a notification via Resend.
 * The lead lives only in your inbox — nothing is stored on a third party.
 *
 * ── SETUP (one time, all in the Cloudflare dashboard — no CLI needed) ──────────
 * 1. Sign in at dash.cloudflare.com (free account) → Workers & Pages → Create →
 *    Workers → Create Worker. Name it e.g. "gamma-lead". Click Deploy, then "Edit code".
 * 2. Delete the starter code, paste THIS whole file, click Deploy.
 * 3. Open the Worker → Settings → "Variables and Secrets" → add:
 *      - RESEND_API_KEY   → your re_... key from resend.com/api-keys   → type: Secret (Encrypt)
 *      - NOTIFY_TO        → the inbox that should receive new-lead emails → type: Text
 *      - FROM_EMAIL       → (optional) e.g. Gamma Tech Group <leads@gammatechgroup.com>
 *                            Leave unset to use the default onboarding@resend.dev → type: Text
 *    Save, then Deploy again so the variables take effect.
 * 4. Copy the Worker URL: https://gamma-lead.<your-subdomain>.workers.dev
 * 5. Send that URL to set LEAD_ENDPOINT in index.html.
 *
 * ── RESEND NOTE ──────────────────────────────────────────────────────────────
 * Until you verify a domain in Resend you can only send FROM onboarding@resend.dev
 * and TO your Resend signup email — so set NOTIFY_TO to that address to start.
 * After verifying gammatechgroup.com at resend.com/domains, set FROM_EMAIL to
 * something like "Gamma Tech Group <leads@gammatechgroup.com>" and send anywhere.
 *
 * Test: open the Worker URL in a browser → you should see the "live" message.
 * Submit the form once → an email should land in NOTIFY_TO.
 */

const ALLOWED_ORIGINS = [
  'https://gammatechgroup.com',
  'https://www.gammatechgroup.com',
  'https://kevinmejiasc.github.io',
];

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
    const cors = {
      'Access-Control-Allow-Origin': allowOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== 'POST') {
      return new Response('Gamma Tech Group lead endpoint is live.', { status: 200, headers: cors });
    }

    // Body arrives as text/plain (sendBeacon) or JSON (fetch) — parse either way.
    let data;
    try {
      data = JSON.parse(await request.text());
    } catch (_) {
      return ok(cors); // generic response — never leak internals
    }

    // Honeypot: real users leave "website" blank. Filled = bot → drop silently.
    if (data.website) return ok(cors);

    // Minimal validation
    const name = clip(data.name);
    const email = clip(data.email);
    if (!name || !email) return ok(cors);

    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: env.FROM_EMAIL || 'Gamma Tech Group <onboarding@resend.dev>',
          to: [env.NOTIFY_TO],
          reply_to: email || undefined,
          subject: `🚀 New lead: ${name}${data.industry ? ` (${data.industry})` : ''}`,
          html: buildEmail(data),
        }),
      });
      if (!res.ok) console.log('Resend error', res.status, await res.text());
    } catch (err) {
      console.log('Send failed:', err);
    }

    return ok(cors);
  },
};

function ok(cors) {
  return new Response(JSON.stringify({ result: 'ok' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', ...cors },
  });
}

function clip(v) {
  return (v == null ? '' : String(v)).trim().slice(0, 500);
}

function esc(v) {
  return String(v == null ? '' : v)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/\n/g, '<br>');
}

function buildEmail(data) {
  const row = (label, value) => value
    ? `<tr><td style="padding:8px 14px;color:#5a5a68;font-size:13px;white-space:nowrap;vertical-align:top;">${label}</td><td style="padding:8px 14px;color:#15151c;font-size:14px;">${esc(value)}</td></tr>`
    : '';
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;border:1px solid #e6e6ea;border-radius:14px;overflow:hidden;">
    <div style="background:#07070a;padding:20px 24px;">
      <span style="display:inline-block;background:#d4ff3d;color:#07070a;font-weight:bold;border-radius:6px;padding:2px 8px;font-size:18px;">&#915;</span>
      <span style="color:#f6f5f0;font-size:18px;font-weight:bold;margin-left:10px;">Gamma Tech Group</span>
      <div style="color:#d4ff3d;font-size:12px;letter-spacing:2px;margin-top:6px;">NEW LEAD SUBMITTED</div>
    </div>
    <table style="width:100%;border-collapse:collapse;">
      ${row('Name', data.name)}
      ${row('Email', data.email)}
      ${row('Phone', data.phone)}
      ${row('Revenue', data.revenue)}
      ${row('Industry', data.industry)}
      ${row('Friction', data.friction)}
      ${row('Why now', data.whynow)}
      ${row('Other', data.other)}
      ${row('Source', data.source)}
    </table>
    <div style="padding:14px 24px;background:#fafafa;color:#8a8a96;font-size:12px;">Reply to this email to respond directly to the prospect.</div>
  </div>`;
}
