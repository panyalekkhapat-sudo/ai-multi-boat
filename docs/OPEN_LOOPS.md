# Open Loops

> งานค้างที่ยังไม่ปิด · ลบแถวเมื่อเสร็จ  
> Owner = `Claude` | `OpenCode` | `human`

Last updated: 2026-09-25 +07:00 (รวม PR #5 + #6 — Claude)

| ID | Task | Owner | Priority | Trigger / due | Notes |
|---|---|---|---|---|---|
| L1 | สร้าง STATUS + OPEN_LOOPS จาก example | human | P0 | Lab 00 | หลัง copy แล้วลบแถวนี้ |
| L4 | เนื้อหา PROFILE: ตัด "หลายปี" · เหตุผล Interests · อีเมลจริง + GitHub | human | P1 | ก่อน Lab 08 | DECISIONS D7, D8, D12 · UI รองรับแล้ว (เหตุผล/ลิงก์ว่างจะซ่อน) |
| L5 | Guestbook กันสแปม (rate limit) — ความยาว + LIMIT + `textContent` ครบแล้ว · เอา `noindex` ออกได้เมื่อครบ | human → OpenCode | P1 | ก่อน Lab 08 | DECISIONS D9 / A1 |
| L6 | D5 "แสดงฟอร์มเฉพาะเมื่อ API ใช้ได้จริง" — ฟอร์มแสดงเสมอแต่ไม่มีทางตัน (fallback mailto · ไม่ลบข้อความ) | Claude (frontend) | P2 | ก่อน Lab 08 | API เขียวแล้ว · ทบทวนตอน ship |
| L8 | ติดตั้ง browser ของ Playwright (`npx playwright install`) แล้วรัน `npm run test:e2e` | human | P2 | Lab 06 | e2e fail เพราะไม่มี chromium |
| L9 | Dockerfile copy เฉพาะ `docs/PROFILE.md` | OpenCode / human | P2 | Lab 08 | D12(3) |

## ปิดแล้ว (ย่อ — ย้ายหรือลบได้เมื่อรก)

| ID | Task | Closed |
|---|---|---|
| L2 | `loadProfile()` หลายบรรทัด + `## Contact` + กัน Brainstorm/Do not show (D10) | 2026-09-25 · Claude (frontend) · PR #5 · `tests/profile.test.ts` |
| L3 | API คืน error code แทน `err.message` (`BAD_JSON`/`VALIDATION`/`INTERNAL`) | 2026-09-25 · OpenCode · PR #6 · D6 |
| L7 | ลิงก์ Guestbook ใน nav — ปิดตาม A1 (เจ้าของอนุมัติให้อยู่ใน nav · คง `noindex`) · การ์ดหน้าแรกถูกเอาออกแล้ว | 2026-09-25 · A1 |
| — | `/api/contact` รับ field `topic` เกินมาได้ (ไม่ 400 · ไม่เก็บ) | 2026-09-25 · ตรวจตอน merge PR #5 |

## กฎสั้น

- อย่าเก็บงานที่ปิดแล้วจำนวนมากในตารางบน
- เปลี่ยน owner เมื่อ handoff ข้าม harness (ดู `docs/handoffs/`)
- สอง agent ห้ามเป็น writer พร้อมกันบนไฟล์นี้ — single-writer ตาม `AGENTS.md`
