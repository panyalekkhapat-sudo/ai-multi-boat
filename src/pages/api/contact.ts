import type { APIRoute } from 'astro';
import { insertContact, ValidationError } from '../../lib/db';

export const prerender = false;

/**
 * POST /api/contact — JSON {name, email, message} → 201 with the stored row.
 * Errors: 400 {error:{code,message}} for bad input, 500 with a fixed message
 * for anything else — raw err.message never reaches the client (D6 / L3).
 */
export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: { code: 'BAD_JSON', message: 'Invalid request body.' } }, 400);
  }

  try {
    const row = insertContact(body as { name: string; email: string; message: string });
    return json(row, 201);
  } catch (err) {
    if (err instanceof ValidationError) {
      return json({ error: { code: 'VALIDATION', message: err.message } }, 400);
    }
    // Server-side log only — never echoed to the client (D6).
    console.error('[api/contact] insert failed:', err instanceof Error ? err.message : err);
    return json(
      {
        error: {
          code: 'INTERNAL',
          message: 'ตอนนี้ส่งผ่านฟอร์มไม่ได้ — ข้อความของคุณยังอยู่ ส่งอีเมลมาได้เลยครับ',
        },
      },
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