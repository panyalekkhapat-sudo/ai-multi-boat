# Project Status

> อ่านทุก session · **สั้น** · single-writer ต่อรอบ  
> ดู [`COURSE.md`](../COURSE.md) ชั้น State (Hot)

Last updated: 2026-09-25 +07:00 (swarm verify run)  
Updated by: Claude

## Current goal

- **Swarm guestbook/API — รอบตรวจยืนยันเสร็จใน 8/20 turns**: `test:labs` 2/2 · `npm test` 3/3 · build ผ่าน · demo localhost ผ่าน (curl API 201/400/200 · หน้า 200) · gap: nav/หน้าแรกยังลิงก์ Guestbook (D9) · กันสแปม (L5) · Playwright browser ยังไม่ติดตั้ง · ดู `docs/SWARM.md` · รอเจ้าของ review + commit

## Done

- Lab 00 init (commit `d65a220`)
- Lab 01 `docs/PROFILE.md`
- Lab 02 `docs/DEBATE.md` (Brand / UX / Devil × 2 รอบ · subagent แยก context) + `docs/DECISIONS.md` (D1–D12, Out of scope, เกณฑ์ Lab 04)
- PROFILE `## Headline` แก้ตาม D1
- persona agents `.claude/agents/{brand-strategist,ux-critic,devils-advocate}.md` (`memory: project`) · memory ที่ `.claude/agent-memory/<name>/`
- Lab 05 Backend: `src/lib/db.ts` — validation (trim · จำกัดความยาว name 100 / message contact 2,000 / guestbook 500 · email format) + `ValidationError` · guestbook GET มี LIMIT (default 50, cap 100 ตาม D9) · API routes คืน error code (`BAD_JSON`/`VALIDATION`/`INTERNAL`) แทน `err.message` (D6/L3) · log error ฝั่ง server เท่านั้น

## In progress

- เจ้าของรีวิว D1–D12 และแก้คำตัดสินถ้ายังไม่ตรงใจ
- เจ้าของรีวิว PR ของ Lab 05 Backend (ข้อความ PR อยู่ด้านล่าง / ในเซสชันนี้)

## Blocked

- —

## Next actions

1. เจ้าของรีวิว PR ของ Lab 05 Backend — branch จากงานนี้ · merge หลัง review
2. เจ้าของรีวิว DECISIONS → commit `docs: debate and decisions from Lab 02` (รวม `.claude/agents/*` + `.claude/agent-memory/*`)
3. เจ้าของแก้ PROFILE: ตัด "หลายปี" (D8) · เหตุผล Interests แบบ `ชื่อ — เหตุผล` (D7) · อีเมลจริง + GitHub (D12)
4. Lab 03 — เปิดแล้ว #1–#4 (D1–D6 · ดูท้าย DECISIONS) · ยังขาด label (PAT 403) และ issue ของ D7–D12
5. ฝั่ง Claude (frontend) เอาลิงก์ Guestbook ออกจาก nav + หน้าแรก (D9 · L7)
6. ฝั่ง Claude (frontend) แก้ L2 (`loadProfile()` parse `## Contact`) → ใส่อีเมลในข้อความ D6 + `mailto:` บนสุดของ contact (D5 · issue #2)

## Files changed in latest session

- `src/pages/guestbook.astro` · `src/pages/contact.astro` (frontend · swarm round 3)
- `docs/SWARM.md` (เพิ่ม Round 3) · `docs/STATUS.md` · `docs/OPEN_LOOPS.md`
- (ยังไม่ commit: `docs/review-fe-guestbook-contact.md` · งาน Lab 05: `src/lib/db.ts` · `src/pages/api/contact.ts` · `src/pages/api/guestbook.ts` — ยังไม่ commit รอ review)

## Notes

- Proposed vs Approved: brainstorm อยู่ใน `DEBATE.md` — สิ่งที่ปิดแล้วอยู่ใน `DECISIONS.md`
- ฉบับเก่า (Cold) อยู่ที่ `docs/_cli-lab02-subagents-*.md` — ไม่ได้ใช้ในรอบนี้
