/**
 * Guestbook spam guard (L5 · D9 / A2).
 * In-memory fixed window per key (client IP) — nothing is written to SQLite,
 * so no visitor IP is stored. Resets on restart, which is fine for a
 * single-instance personal site.
 */

export type RateLimiter = {
  /** Record a hit for `key`; returns false when the key is over the limit. */
  hit(key: string): boolean;
  /** Number of keys currently tracked (for tests). */
  size(): number;
};

export function createRateLimiter(opts: {
  limit: number;
  windowMs: number;
  now?: () => number;
}): RateLimiter {
  const now = opts.now ?? Date.now;
  const windows = new Map<string, { start: number; count: number }>();

  function prune(t: number) {
    for (const [key, w] of windows) {
      if (t - w.start >= opts.windowMs) windows.delete(key);
    }
  }

  return {
    hit(key) {
      const t = now();
      prune(t);
      const w = windows.get(key);
      if (!w) {
        windows.set(key, { start: t, count: 1 });
        return true;
      }
      if (w.count >= opts.limit) return false;
      w.count += 1;
      return true;
    },
    size: () => windows.size,
  };
}

/** Hidden form field that people never see; bots that fill every input do. */
export const HONEYPOT_FIELD = 'website';

export function isHoneypotFilled(body: unknown): boolean {
  if (!body || typeof body !== 'object') return false;
  const value = (body as Record<string, unknown>)[HONEYPOT_FIELD];
  return typeof value === 'string' && value.trim().length > 0;
}
