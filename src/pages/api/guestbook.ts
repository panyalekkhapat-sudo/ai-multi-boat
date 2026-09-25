import type { APIRoute } from 'astro';
import { insertGuestbook, listGuestbook, ValidationError } from '../../lib/db';

export const prerender = false;

/**
 * GET /api/guestbook?limit=50 — newest first, server-capped (max 100) per D9.
 * POST /api/guestbook — JSON {name, message}; length limits enforced server-side.
 * Client never sees raw err.message — only fixed codes/messages (D6 / L3).
 */
export const GET: APIRoute = async ({ url }) => {
  try {
    const limitParam = url.searchParams.get('limit');
    const limit = limitParam === null ? undefined : Number(limitParam);
    const rows = listGuestbook(limit);
    return json({ entries: rows }, 200);
  } catch (err) {
    console.error('[api/guestbook] list failed:', err instanceof Error ? err.message : err);
    return json(
      { error: { code: 'INTERNAL', message: 'Could not load guestbook entries.' } },
      500
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: { code: 'BAD_JSON', message: 'Invalid request body.' } }, 400);
  }

  try {
    const row = insertGuestbook(body as { name: string; message: string });
    return json(row, 201);
  } catch (err) {
    if (err instanceof ValidationError) {
      return json({ error: { code: 'VALIDATION', message: err.message } }, 400);
    }
    console.error('[api/guestbook] insert failed:', err instanceof Error ? err.message : err);
    return json(
      { error: { code: 'INTERNAL', message: 'Could not save your entry right now.' } },
      500
    );
  }
};

function json(payload: unknown, status: number): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}