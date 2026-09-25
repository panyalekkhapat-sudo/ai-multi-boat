# Open Loops

> งานค้างที่ยังไม่ปิด · ลบแถวเมื่อเสร็จ  
> Owner = `Claude` | `OpenCode` | `human`

Last updated: 2026-09-25 +07:00 (ปิด L1 L5 L6 L8 L9 · A2 — Claude)

| ID | Task | Owner | Priority | Trigger / due | Notes |
|---|---|---|---|---|---|
| L4 | อีเมลจริงหรือ alias แทน `demo@example.com` + ลิงก์ GitHub สาธารณะ (ถ้าไม่มี GitHub ให้ทบทวน D1) | human | P1 | ก่อน Lab 08 (ship gate) | D12(1)(2) · เจ้าของขอคงไว้ก่อน (2026-09-25) · ส่วน D7/D8 ปิดแล้วใน A2 · ใส่ค่าใน `## Contact` แล้ว UI แสดงเอง |

## ปิดแล้ว (ย่อ — ย้ายหรือลบได้เมื่อรก)

| ID | Task | Closed |
|---|---|---|
| L5 | Guestbook กันสแปม: honeypot + 5 โพสต์/10 นาที/IP → 429 · เอา `noindex` ออก · `tests/rate-limit.test.ts` + e2e | 2026-09-25 · Claude (A2 · เจ้าของอนุมัติข้าม ownership) |
| L6 | D5 ฟอร์ม Contact แสดงเมื่อ API ใช้ได้จริง — API เขียวแล้ว (201) · fallback mailto ยังอยู่ | 2026-09-25 · Claude |
| L8 | ติดตั้ง chromium · `npm run test:e2e` 3/3 ผ่าน (แก้ spec ให้ตรง label ภาษาไทย + เพิ่มเคส guestbook) | 2026-09-25 · Claude |
| L9 | Dockerfile copy เฉพาะ `docs/PROFILE.md` (D12(3)) | 2026-09-25 · Claude |
| L1 | STATUS + OPEN_LOOPS สร้างแล้ว | 2026-09-25 |
| L2 | `loadProfile()` หลายบรรทัด + `## Contact` + กัน Brainstorm/Do not show (D10) | 2026-09-25 · Claude (frontend) · PR #5 · `tests/profile.test.ts` |
| L3 | API คืน error code แทน `err.message` (`BAD_JSON`/`VALIDATION`/`INTERNAL`) | 2026-09-25 · OpenCode · PR #6 · D6 |
| L7 | ลิงก์ Guestbook ใน nav — ปิดตาม A1 (เจ้าของอนุมัติให้อยู่ใน nav · คง `noindex`) · การ์ดหน้าแรกถูกเอาออกแล้ว | 2026-09-25 · A1 |
| — | `/api/contact` รับ field `topic` เกินมาได้ (ไม่ 400 · ไม่เก็บ) | 2026-09-25 · ตรวจตอน merge PR #5 |

## กฎสั้น

- อย่าเก็บงานที่ปิดแล้วจำนวนมากในตารางบน
- เปลี่ยน owner เมื่อ handoff ข้าม harness (ดู `docs/handoffs/`)
- สอง agent ห้ามเป็น writer พร้อมกันบนไฟล์นี้ — single-writer ตาม `AGENTS.md`
