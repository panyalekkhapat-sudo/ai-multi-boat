# SWARM — Lab 05b

> 2026-09-25 · Claude (orchestrator + frontend) · ใช้ skill `public-site-safe`  
> ไฟล์นี้ถูก reset เป็น template ก่อนรอบนี้ — log round 1–3 เดิมไม่อยู่แล้ว (STATUS ยังอ้าง "round 3 · 11/20") · รอบนี้ = รอบตรวจยืนยันรอบใหม่

## Done criteria
- `npm run test:labs` เขียว
- ส่งฟอร์ม guestbook/contact demo บน localhost ได้ หรืออธิบายช่องว่าง

## Ceiling
- Max turns: 20

## Log
| Turn | Who | What |
|---|---|---|
| 1 | Claude | อ่าน STATUS · OPEN_LOOPS · DECISIONS · รัน `test:labs` → **เขียว 2/2 อยู่แล้ว** (API/SQLite implement โดย OpenCode backend ใน Lab 05 · ยังไม่ commit) |
| 2 | Claude | `npm test` 3/3 · `npm run build` ผ่าน · guestbook/contact render ด้วย `textContent` · ไม่มี `NOT_IMPLEMENTED` เหลือใน `src/` |
| 3 | Claude | `npm start` (build) บน `127.0.0.1:4399` · `DATA_DIR` ชั่วคราว · curl ด้วย demo data: contact 201 · email ผิด 400 `VALIDATION` · JSON พัง 400 `BAD_JSON` · guestbook POST 201 / GET 200 · `/` `/contact` `/guestbook` = 200 · ไม่มี stack trace หลุด |
| 4 | Claude | พบ nav + การ์ดหน้าแรกยังลิงก์ `/guestbook` (ขัด D9) → บันทึกเป็น gap (ไม่อยู่ใน done criteria รอบนี้) |
| 5 | Claude | `test:e2e` → fail เพราะเครื่องยังไม่มี browser ของ Playwright (`npx playwright install`) — ไม่ติดตั้งในรอบนี้ |
| 6 | Claude | หยุด server · `test-results/` อยู่ใน `.gitignore` |
| 7–8 | Claude | เขียนไฟล์นี้ + อัปเดต STATUS / OPEN_LOOPS |

ไม่ได้แตะ `src/lib/db.ts` / `src/pages/api/**` (ownership OpenCode) และไม่ได้แก้ไฟล์ test

## Outcome
- Turns used: **8 / 20** (หยุดเพราะ done)
- test:labs: **เขียว 2/2** · `npm test` 3/3 · build ผ่าน
- Demo localhost: **ผ่านระดับ API + หน้าเว็บตอบ 200** (curl) · ยังไม่ได้ทดสอบกดฟอร์มในเบราว์เซอร์จริง
- Gaps:
  1. **D9** — `BaseLayout.astro:67` (nav) และ `index.astro:19` (การ์ด) ยังลิงก์ Guestbook → frontend ต้องเอาออกตาม D9/D11 (ผูกกับ issue #1)
  2. **L5** — ยังไม่มีกันสแปม / rate limit ฝั่ง server → guestbook ยังไม่เปิดสาธารณะ (เจ้าของตัดสินใจ · ถ้าทำ = OpenCode backend)
  3. **E2E** — ต้อง `npx playwright install` ก่อน `npm run test:e2e` (Lab 06)
  4. **L2** — contact ยังไม่มีอีเมล `mailto:` บนสุด (D5) รอ parser `## Contact`
  5. งาน Lab 05 + FE ยังไม่ commit — เจ้าของ review แล้ว commit ก่อนสลับ harness
