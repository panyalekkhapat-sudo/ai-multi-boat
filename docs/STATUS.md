# Project Status

> อ่านทุก session · **สั้น** · single-writer ต่อรอบ  
> ดู [`COURSE.md`](../COURSE.md) ชั้น State (Hot)

Last updated: 2026-09-25 +07:00 (รวม PR #5 + #6 เข้า main — Claude)  
Updated by: Claude

## Current goal

- Lab 04 (UI) + Lab 05 (API/SQLite) อยู่บน `main` แล้ว · ต่อไป: เนื้อหา PROFILE (L4) · กันสแปม guestbook (L5) · Lab 07 review → Lab 08 ship

## Done

- Lab 00 init · Lab 01 PROFILE · Lab 02 DEBATE + DECISIONS D1–D12 (+ A1 แก้ D9/D11) · Lab 03 issues #1–#4
- Lab 04 UI (PR #5): L2 parser (`parseProfile` · Bio/Interests หลายบรรทัด · `## Contact` · `## Tagline`) · Home (D1/D2/D4) · About · Interests (D7) · Contact (mailto บนสุด · ข้อความคงที่ D5/D6) · nav 4 ข้อ + "สมุดเยี่ยม" (A1) · Guestbook `noindex` + `textContent`
- Lab 05 Backend (PR #6): validation + `ValidationError` · guestbook GET LIMIT (50, cap 100) · API คืน error code (`BAD_JSON`/`VALIDATION`/`INTERNAL`) ไม่หลุด `err.message`
- Lab 05b swarm (`docs/SWARM.md`) · Lab 06 E2E ผ่าน Playwright MCP (`docs/QA.md` · screenshots)
- ตอน merge: guestbook แสดงข้อความ "ตรวจชื่อและข้อความ" เมื่อ API ตอบ 400 (เดิมขึ้น "ยังไม่พร้อมใช้งาน")

## In progress

- —

## Blocked

- —

## Next actions

1. เจ้าของแก้ PROFILE: ตัด "หลายปี" (D8) · เหตุผล Interests (D7) · อีเมลจริง + GitHub (D12) — L4
2. เจ้าของตัดสินใจกันสแปม guestbook → เอา `noindex` ออกเมื่อครบ (D9/A1) — L5
3. Issue ของ D7–D12 + label (PAT 403)
4. Lab 07 review → Lab 08 ship

## Files changed in latest session

- merge PR #6 → main · merge main → `lab-04-frontend` (แก้ conflict `contact.astro` / `guestbook.astro` / STATUS / OPEN_LOOPS) → merge PR #5
- `src/pages/guestbook.astro` (ข้อความเมื่อ 400)

## Notes

- งาน L2/L7 ที่ยังไม่ commit บน `lab-05-backend` (เอา Guestbook ออกจาก nav ตาม D9 ฉบับเดิม) ถูกแทนด้วย PR #5 + A1 → เก็บไว้ใน `git stash` ("worktree L2/L7 (superseded by PR #5 / A1)")
- Proposed vs Approved: brainstorm อยู่ใน `DEBATE.md` — สิ่งที่ปิดแล้วอยู่ใน `DECISIONS.md`
