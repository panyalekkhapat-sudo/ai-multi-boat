import { describe, it, expect } from 'vitest';
import { createRateLimiter, isHoneypotFilled } from '../src/lib/rate-limit';

/** L5 / D9 (A2) — guestbook spam guard: per-key window limit + honeypot field. */
describe('createRateLimiter', () => {
  it('allows up to `limit` hits per key inside the window, then blocks', () => {
    let t = 0;
    const rl = createRateLimiter({ limit: 3, windowMs: 1000, now: () => t });
    expect([rl.hit('a'), rl.hit('a'), rl.hit('a')]).toEqual([true, true, true]);
    expect(rl.hit('a')).toBe(false);
    expect(rl.hit('b')).toBe(true);
  });

  it('allows again once the window has passed', () => {
    let t = 0;
    const rl = createRateLimiter({ limit: 1, windowMs: 1000, now: () => t });
    expect(rl.hit('a')).toBe(true);
    t = 999;
    expect(rl.hit('a')).toBe(false);
    t = 1000;
    expect(rl.hit('a')).toBe(true);
  });

  it('forgets expired keys so memory does not grow forever', () => {
    let t = 0;
    const rl = createRateLimiter({ limit: 1, windowMs: 1000, now: () => t });
    for (let i = 0; i < 50; i++) rl.hit(`k${i}`);
    t = 5000;
    rl.hit('fresh');
    expect(rl.size()).toBe(1);
  });
});

describe('isHoneypotFilled', () => {
  it('is true only when the hidden field has text', () => {
    expect(isHoneypotFilled({ website: 'http://spam' })).toBe(true);
    expect(isHoneypotFilled({ website: '   ' })).toBe(false);
    expect(isHoneypotFilled({ name: 'a' })).toBe(false);
    expect(isHoneypotFilled(null)).toBe(false);
  });
});
