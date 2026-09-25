# Open Loops

> งานค้างที่ยังไม่ปิด · ลบแถวเมื่อเสร็จ  
> Owner = `Claude` | `OpenCode` | `human`

Last updated: 2026-09-25 +07:00

| ID | Task | Owner | Priority | Trigger / due | Notes |
|---|---|---|---|---|---|
| L1 | สร้าง STATUS + OPEN_LOOPS จาก example | human | P0 | Lab 00 | หลัง copy แล้วลบแถวนี้ |
| L2 | `loadProfile()` ตัดหลายบรรทัดเหลือบรรทัดแรก (Bio, Interests) + parse `## Contact` | Claude (frontend) | P0 | Lab 04 | DECISIONS D10 · อย่าให้ Brainstorm/Do not show หลุด |
| L3 | API คืน error code แทน `err.message` (stub มีคำว่า Lab หลุดตอน runtime) | OpenCode | P1 | issue #4 → Lab 05 | DECISIONS D6 · + guestbook server-side ตาม D9 |
| L4 | เนื้อหา PROFILE: ตัด "หลายปี" · เหตุผล Interests · อีเมลจริง + GitHub | human | P1 | ก่อน Lab 08 | DECISIONS D7, D8, D12 |

## ปิดแล้ว (ย่อ — ย้ายหรือลบได้เมื่อรก)

| ID | Task | Closed |
|---|---|---|
| — | — | — |

## กฎสั้น

- อย่าเก็บงานที่ปิดแล้วจำนวนมากในตารางบน
- เปลี่ยน owner เมื่อ handoff ข้าม harness (ดู `docs/handoffs/`)
- สอง agent ห้ามเป็น writer พร้อมกันบนไฟล์นี้ — single-writer ตาม `AGENTS.md`
