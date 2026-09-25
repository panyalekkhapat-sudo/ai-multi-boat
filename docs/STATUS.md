# Project Status

> อ่านทุก session · **สั้น** · single-writer ต่อรอบ  
> ดู [`COURSE.md`](../COURSE.md) ชั้น State (Hot)

Last updated: 2026-09-25 +07:00  
Updated by: Claude (frontend)

## Current goal

- Lab 04 — UI สะท้อน PROFILE + DECISIONS (branch `lab-04-frontend`) · รอเจ้าของตรวจ localhost → commit → PR → Lab 05 (OpenCode)

## Done

- Lab 00 init (commit `d65a220`) · Lab 01 PROFILE · Lab 02 DEBATE + DECISIONS D1–D12 · Lab 03 issues #1–#4 (commit `8663738`)
- Lab 04 UI: L2 parser (`parseProfile` · Bio/Interests หลายบรรทัด · `## Contact` · `## Tagline`) · Home (D1/D2/D4) · About (Bio ครบ) · Interests (D7 `ชื่อ — เหตุผล`) · Contact (mailto บนสุด · ข้อความคงที่ D5/D6) · nav 4 ข้อ + "สมุดเยี่ยม" (D11/D9 แก้ตาม A1) · Guestbook noindex + ไม่ใช้ innerHTML · tone ขาว-เทา
- `npm test` 10/10 ผ่าน · `npm run build` ผ่าน

## In progress

- เจ้าของตรวจ localhost + แนบ screenshot · commit + เปิด PR (อ้าง #1 #2 #3)

## Blocked

- —

## Next actions

1. `opencode run` ตรวจสัญญา API → `docs/fe-be-contract-check.md` (ขั้นที่ 4 ของ Lab 04) · แก้ฟอร์มถ้ามี mismatch
2. Commit + PR `lab-04-frontend` → main ของ learner repo
3. Lab 05 (OpenCode) — อ่าน `docs/handoffs/04-claude-to-opencode.md`
4. เจ้าของแก้ PROFILE: ตัด "หลายปี" (D8) · เหตุผล Interests (D7) · อีเมลจริง + GitHub (D12)

## Files changed in latest session

- `src/lib/profile.ts` · `tests/profile.test.ts` (ใหม่)
- `src/layouts/BaseLayout.astro` · `src/pages/{index,about,interests,contact,guestbook}.astro`
- `docs/PROFILE.md` (`## Tagline` ตาม D2) · `docs/DECISIONS.md` (โน้ต MCP vs gh · Amendment A1 แก้ D9/D11)
- `docs/STATUS.md` · `docs/OPEN_LOOPS.md` · `docs/handoffs/04-claude-to-opencode.md`

## Notes

- Guestbook: เจ้าของอนุมัติแก้ D9/D11 (A1 · 2026-09-25) → ลิงก์ "สมุดเยี่ยม" อยู่ใน nav แล้ว · คง `noindex` จนกว่า server-side ของ Lab 05 ครบ · หน้าเข้าถึงง่ายขึ้น → L3 เร่งขึ้น
- API ยังคืน `err.message` (มีคำว่า Lab) → UI ไม่แสดงแล้ว แต่ response ยังหลุด = L3 (OpenCode)
