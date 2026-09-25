---
name: debate-lab02-stance
description: Devil's Advocate stance after Lab 02 debate round 2 (2026-09-25) — non-negotiable ship gates, concessions, open questions
metadata:
  type: project
---

Stance after round 2 (2026-09-25). DECISIONS not yet read/closed at time of writing — check docs/DECISIONS.md for outcome.

Ship gates (non-negotiable): (1) real contact channel (real email/alias, no demo) before any public URL; (2) no raw err.message to users — 501/500 show fixed safe text, no course/stack refs; (3) guestbook off nav and not public until escape + server-side length + basic anti-spam.

Held: AI agents stays out of tagline (Bio only); Lighthouse only with date + conditions, not as "hero proof"; ?topic= chips = Nice (static mailto subject ok); "reply within a few days" not promised unless owner commits.
Conceded: Brand's headline "ทีมรับช่วงต่อได้"; single CTA; UX nav 4 items + guestbook in footer; hide empty contact fields; 501 fallback message (only after real email).

Split: Lab 04 blockers = L2 parser, error text, hide empty fields, guestbook innerHTML. Lab 05 (OpenCode) = rate limit/honeypot, server length, GET limit, contact retention, moderation column.

**Why:** privacy/credibility risk concentrates on contact + guestbook.
**How to apply:** open questions still: real email? who reads/retains contact rows? guestbook purpose + moderator? years of experience number? Dockerfile COPY docs leaking Do not show/Brainstorm.

**Outcome (facilitator, docs/DECISIONS.md 2026-09-25 — Proposed until owner approves):** Won D6 no err.message, D8 claims need proof, D9 guestbook hidden until safe, D12 ship gates (real email, GitHub, Dockerfile copy PROFILE only), D5 form -> Nice. Lost: Interests 'why' became Must (D7).
