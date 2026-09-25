# Handoff: Claude (frontend) → OpenCode (backend)

Timestamp: 2026-09-25 14:20 +07:00  
Task: Lab 04 — หน้าเว็บจาก PROFILE + DECISIONS (issues #1 #2 #3) → ส่งต่อ Lab 05 backend  
Status: NEEDS_REVIEW (รอเจ้าของ commit + PR)

## What changed

- `loadProfile()` แก้ L2: อ่านหัวข้อ `##` หลายบรรทัดจนถึงหัวข้อถัดไป · parse `## Contact` (`email/github/linkedin`) · `## Tagline` · ไม่ดึง Brainstorm / Do not show / `###`
- Home (D1/D2/D4) · About Bio ครบทุกย่อหน้า · Interests `ชื่อ — เหตุผล` (D7) · nav 4 ข้อภาษาไทย (D11) · tone ขาว-เทา
- Contact: `mailto:` บนสุด · ฟอร์ม + dropdown `topic` · 501/500/network → ข้อความคงที่ + ลิงก์อีเมล · ไม่ล้างข้อความเมื่อส่งไม่สำเร็จ · 400 → "กรุณาตรวจ..." · **ไม่แสดง `err.message`** (D5/D6)
- Guestbook: **มีลิงก์ "สมุดเยี่ยม" ใน nav แล้ว** (เจ้าของแก้ D9/D11 · Amendment A1 · 2026-09-25) · คง `noindex` · render ด้วย `textContent` (ไม่มี `innerHTML`) · error → ข้อความคงที่

## Files

- `src/lib/profile.ts` · `tests/profile.test.ts`
- `src/layouts/BaseLayout.astro` · `src/pages/{index,about,interests,contact,guestbook}.astro`
- `docs/PROFILE.md` (`## Tagline`) · `docs/STATUS.md` · `docs/OPEN_LOOPS.md`
- **ไม่แตะ** `src/lib/db.ts` · `src/pages/api/**`

## Verification

- Unit / smoke: PASS — `npm test` 3 files / 10 tests · `npm run build` ผ่าน · smoke บน build: `/ /about /interests /contact /guestbook` = 200 · ไม่มี Brainstorm/Do not show ใน HTML
- Labs (`npm run test:labs`): N/A (ยังแดงตามคาด — stub)
- Manual / localhost: `POST /api/contact` = 501 `{"error":"NOT_IMPLEMENTED: … Lab 05 …"}` → UI แสดงข้อความคงที่แทน · response ดิบยังหลุด = L3
- Contract check (`docs/fe-be-contract-check.md`): ยังไม่ได้รัน — ทำก่อนเริ่ม Lab 05

## สัญญาที่ UI คาดไว้

| Endpoint | Request | UI ถือว่าสำเร็จเมื่อ | UI ทำอะไรเมื่อไม่สำเร็จ |
|---|---|---|---|
| `POST /api/contact` | JSON `{topic, name, email, message}` | `res.ok` (201) | 400 = ให้ตรวจ input · อื่น ๆ = ข้อความคงที่ + mailto |
| `GET /api/guestbook` | — | `res.ok` + `{entries: [{name, message, created_at}]}` | ข้อความคงที่ |
| `POST /api/guestbook` | JSON `{name, message}` | `res.ok` | ข้อความคงที่ |

UI ไม่อ่าน body ของ error เลย → backend เปลี่ยนเป็น error code ได้อิสระ

## Assumptions to challenge

1. `topic` เป็น field เกินใน `/api/contact` — backend ควรรับ (เก็บหรือเพิกเฉย) ไม่ใช่ 400 (L5)
2. ใช้ 400 = input ผิด · 5xx/501 = ระบบยังไม่พร้อม — ถ้า backend ใช้ 422 แทน ให้บอก frontend
3. ฟอร์ม Contact แสดงเสมอ (ไม่ probe API) — ผ่อนจาก D5 เพราะไม่มีทางตัน (L6)

## Request to next agent

> **เร่งด่วน:** Guestbook เข้าถึงได้จาก nav แล้ว (A1) → server-side protections ของ D9 (ความยาว · กันสแปม · LIMIT ใน GET) และ L3 เป็น P0 ของ Lab 05 · เมื่อครบให้แจ้ง frontend เพื่อเอา `noindex` ออก

OpenCode `backend` (Lab 05): implement `insertContact` / `listGuestbook` / `insertGuestbook` ใน `src/lib/db.ts` + API คืน error code แทน `err.message` (L3 · issue #4) + guestbook server-side ตาม D9 (จำกัดความยาว · กันสแปม · LIMIT ใน GET) + รับ `topic` (L5) → `npm run test:labs` เขียว · **อย่าแก้ UI** (`src/pages/*.astro`, `src/layouts/`) — ถ้าต้องเปลี่ยนสัญญา เขียนลง handoff กลับ

## Canonical state updated

- [x] `docs/STATUS.md`
- [x] `docs/OPEN_LOOPS.md` (ปิด L2 · เพิ่ม L5–L7)
- [x] `docs/DECISIONS.md` (Amendment A1: แก้ D9 + D11 · เจ้าของอนุมัติ)
- [x] อื่น ๆ: `docs/PROFILE.md` เพิ่ม `## Tagline` ตาม D2

## Single-writer note

Writer รอบถัดไปของ STATUS/OPEN_LOOPS = OpenCode (backend) หลังเจ้าของ commit branch นี้
