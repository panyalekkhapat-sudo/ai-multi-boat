# Project Status

> อ่านทุก session · **สั้น** · single-writer ต่อรอบ  
> ดู [`COURSE.md`](../COURSE.md) ชั้น State (Hot)

Last updated: 2026-09-25 +07:00 (ปิด open loops · A2 — Claude)  
Updated by: Claude

## Current goal

- เหลือ ship gate เดียว: อีเมลจริง + GitHub ใน PROFILE (L4 · เจ้าของ) → Lab 07 review → Lab 08 ship

## Done

- Lab 00–03 · Lab 04 UI (PR #5) · Lab 05 Backend (PR #6) · Lab 05b swarm · Lab 06 E2E (Playwright MCP + `npm run test:e2e` 3/3)
- A2 (branch `fix/open-loops`): guestbook กันสแปม (honeypot + rate limit 5/10 นาที/IP → 429) · เอา `noindex` ออก · `astro.config.mjs` เชื่อ `X-Forwarded-For` เฉพาะ host ของ `SITE_URL` · PROFILE ตัด "หลายปี" (D8) + เหตุผล Interests (D7 · Claude ร่าง) · Dockerfile copy เฉพาะ `docs/PROFILE.md` (D12(3)) · `.playwright-mcp/` ใน `.gitignore`
- ตรวจแล้ว: `npm test` 14/14 · `test:labs` 2/2 · build ผ่าน · e2e 3/3 · curl honeypot 202 (ไม่บันทึก) · โพสต์ที่ 6 → 429

## In progress

- —

## Blocked

- —

## Next actions

1. เจ้าของใส่อีเมลจริง/alias + GitHub ใน `docs/PROFILE.md` `## Contact` (L4 · D12)
2. เจ้าของตรวจเหตุผล Interests ที่ Claude ร่าง (D7) แก้ได้ตามใจ
3. Lab 07 review → Lab 08 ship (ตั้ง `SITE_URL` ตอน build ให้ rate limit เห็น IP จริงหลัง proxy)

## Files changed in latest session

- `src/lib/rate-limit.ts` (ใหม่) · `src/pages/api/guestbook.ts` · `src/pages/guestbook.astro` · `astro.config.mjs`
- `tests/rate-limit.test.ts` (ใหม่) · `playwright/smoke.spec.ts`
- `docs/PROFILE.md` · `docs/DECISIONS.md` (A2) · `Dockerfile` · `.gitignore`

## Notes

- งาน L2/L7 เก่าที่ถูกแทนด้วย PR #5 + A1 ยังอยู่ใน `git stash` ("worktree L2/L7 (superseded by PR #5 / A1)")
- Proposed vs Approved: brainstorm อยู่ใน `DEBATE.md` — สิ่งที่ปิดแล้วอยู่ใน `DECISIONS.md`
