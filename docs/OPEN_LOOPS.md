# Open Loops

> งานค้างที่ยังไม่ปิด · ลบแถวเมื่อเสร็จ  
> Owner = `Claude` | `OpenCode` | `human`

Last updated: 2026-09-25 +07:00 (swarm verify run)

| ID | Task | Owner | Priority | Trigger / due | Notes |
|---|---|---|---|---|---|
| L1 | สร้าง STATUS + OPEN_LOOPS จาก example | human | P0 | Lab 00 | หลัง copy แล้วลบแถวนี้ |
| L2 | `loadProfile()` ตัดหลายบรรทัดเหลือบรรทัดแรก (Bio, Interests) + parse `## Contact` | Claude (frontend) | P0 | Lab 04 | DECISIONS D10 · อย่าให้ Brainstorm/Do not show หลุด |
| L4 | เนื้อหา PROFILE: ตัด "หลายปี" · เหตุผล Interests · อีเมลจริง + GitHub | human | P1 | ก่อน Lab 08 | DECISIONS D7, D8, D12 |
| L5 | Guestbook ยังไม่เปิดสาธารณะ — FE ใช้ `textContent` แล้ว (round 3) · เหลือเจ้าของตัดสินใจเรื่องกันสแปม (rate limit) ถ้าจะเปิดจริง | human | P1 | ก่อน Lab 08 | DECISIONS D9 — server + FE ครบแล้ว |
| L7 | ลิงก์ Guestbook ยังอยู่ใน nav (`BaseLayout.astro:67`) และการ์ดหน้าแรก (`index.astro:19`) — ขัด D9 | Claude (frontend) | P1 | Lab 04 / issue #1 | พบใน swarm verify run |
| L8 | ติดตั้ง browser ของ Playwright (`npx playwright install`) แล้วรัน `npm run test:e2e` | human | P2 | Lab 06 | e2e fail เพราะไม่มี chromium |

## ปิดแล้ว (ย่อ — ย้ายหรือลบได้เมื่อรก)

| ID | Task | Closed |
|---|---|---|
| L3 | API คืน error code แทน `err.message` (`BAD_JSON`/`VALIDATION`/`INTERNAL` · 501 stub ถูกแทนด้วย implementation จริง) | 2026-09-25 (OpenCode · Lab 05 · D6) |
| L6 | `contact.astro` ข้อความ error คงที่ (D6) · network error ไม่ล้างฟอร์ม · ข้อความ 400 รอเจ้าของอนุมัติใน DECISIONS · อีเมลในข้อความรอ L2 | 2026-09-25 (Claude frontend · swarm round 3) |

## กฎสั้น

- อย่าเก็บงานที่ปิดแล้วจำนวนมากในตารางบน
- เปลี่ยน owner เมื่อ handoff ข้าม harness (ดู `docs/handoffs/`)
- สอง agent ห้ามเป็น writer พร้อมกันบนไฟล์นี้ — single-writer ตาม `AGENTS.md`
