# Open Loops

> งานค้างที่ยังไม่ปิด · ลบแถวเมื่อเสร็จ  
> Owner = `Claude` | `OpenCode` | `human`

Last updated: 2026-09-25 +07:00

| ID | Task | Owner | Priority | Trigger / due | Notes |
|---|---|---|---|---|---|
| L1 | สร้าง STATUS + OPEN_LOOPS จาก example | human | P0 | Lab 00 | หลัง copy แล้วลบแถวนี้ |
| L3 | API คืน error code แทน `err.message` (stub มีคำว่า Lab หลุดตอน runtime) | OpenCode | **P0** | issue #4 → Lab 05 | DECISIONS D6 · + guestbook server-side ตาม D9 (ความยาว · กันสแปม · LIMIT) · UI ไม่แสดง message แล้ว · **เร่งขึ้น:** Guestbook อยู่ใน nav แล้ว (D9 แก้ A1) · เอา `noindex` ออกได้เมื่อครบ |
| L4 | เนื้อหา PROFILE: ตัด "หลายปี" · เหตุผล Interests · อีเมลจริง + GitHub | human | P1 | ก่อน Lab 08 | DECISIONS D7, D8, D12 · UI รองรับแล้ว (เหตุผล/ลิงก์ว่างจะซ่อน) |
| L5 | `/api/contact` รับ field `topic` (dropdown ใน Contact) — เก็บหรือเพิกเฉย แต่ห้าม 400 เพราะมี field เกิน | OpenCode | P2 | Lab 05 | D3 · D5 |
| L6 | D5 "แสดงฟอร์มเฉพาะเมื่อ API ใช้ได้จริง" — ตอนนี้ฟอร์มแสดงเสมอแต่ไม่มีทางตัน (fallback mailto · ไม่ลบข้อความ) | Claude (frontend) | P2 | หลัง Lab 05 | ทบทวนเมื่อ API เขียว · ถ้ายังไม่พร้อมตอน ship ให้ซ่อนฟอร์ม |
| L7 | Dockerfile copy เฉพาะ `docs/PROFILE.md` | OpenCode / human | P2 | Lab 08 | D12(3) |

## ปิดแล้ว (ย่อ — ย้ายหรือลบได้เมื่อรก)

| ID | Task | Closed |
|---|---|---|
| L2 | `loadProfile()` หลายบรรทัด + `## Contact` + กัน Brainstorm/Do not show (D10) | 2026-09-25 · Claude (frontend) · `tests/profile.test.ts` |

## กฎสั้น

- อย่าเก็บงานที่ปิดแล้วจำนวนมากในตารางบน
- เปลี่ยน owner เมื่อ handoff ข้าม harness (ดู `docs/handoffs/`)
- สอง agent ห้ามเป็น writer พร้อมกันบนไฟล์นี้ — single-writer ตาม `AGENTS.md`
