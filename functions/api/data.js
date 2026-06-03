const API_KEY = 'mwp-9k2x-d4t4-2026';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
};

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function onRequestGet({ env }) {
  const raw = await env.MAWPHYLOK_DATA.get('data');
  return new Response(raw || 'null', {
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}

export async function onRequestPost({ request, env }) {
  if (request.headers.get('X-API-Key') !== API_KEY) {
    return new Response('Unauthorized', { status: 401, headers: CORS });
  }
  const body = await request.text();
  await env.MAWPHYLOK_DATA.put('data', body);
  return new Response('{"ok":true}', {
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}
