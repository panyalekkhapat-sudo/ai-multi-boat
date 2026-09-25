# BE ↔ FE Integration Check — Contact · Guestbook

> 2026-09-25 · Claude (report only) · **ไม่ได้แก้ `src/**`**  
> เทียบฟอร์มใน `src/pages/contact.astro` · `src/pages/guestbook.astro` กับ API ที่ implement แล้วใน `src/pages/api/contact.ts` · `src/pages/api/guestbook.ts` · `src/lib/db.ts` (ยังไม่ commit · working tree บน branch `lab-05-backend`)  
> อ้างอิง: `docs/DECISIONS.md` D5 · D6 · D9 · `docs/review-fe-guestbook-contact.md` · `docs/OPEN_LOOPS.md` L5 · L6

**ไฟล์ที่ขอให้อ่านแต่ไม่มีใน repo:** `docs/handoffs/04-claude-to-opencode.md` และ `docs/fe-be-contract-check.md` — ใน `docs/handoffs/` มีแค่ `README.md` กับ `TEMPLATE.md` · รายงานนี้จึงอิงสัญญาจากโค้ด API จริงกับ DECISIONS ไม่ได้อิง handoff

---

## 1. สัญญา API ที่ implement แล้ว (สรุปจากโค้ด)

| Endpoint | Request | Success | Error |
|---|---|---|---|
| `POST /api/contact` | JSON `{ name, email, message }` | **201** + row `{ id, name, email, message, created_at }` | **400** `{ error: { code: 'BAD_JSON' \| 'VALIDATION', message } }` · **500** `{ error: { code: 'INTERNAL', message } }` |
| `GET /api/guestbook?limit=` | query `limit` (ไม่ใส่ = 50 · สูงสุด 100) | **200** `{ entries: [{ id, name, message, created_at }] }` เรียงใหม่สุดก่อน | **500** `{ error: { code: 'INTERNAL', message } }` |
| `POST /api/guestbook` | JSON `{ name, message }` | **201** + row `{ id, name, message, created_at }` | **400** `BAD_JSON` / `VALIDATION` · **500** `INTERNAL` |

กฎ validation ฝั่ง server (`src/lib/db.ts:61-93`) — ทุกฟิลด์ต้องเป็น string และ **trim ก่อนตรวจ**:

| ฟิลด์ | server | FE (`maxlength` / `type`) |
|---|---|---|
| `name` (ทั้งสองฟอร์ม) | 1–100 ตัว | `required maxlength="80"` |
| `email` (contact) | ≤ 254 ตัว + regex `^[^\s@]+@[^\s@]+\.[^\s@]+$` | `type="email" required maxlength="120"` |
| `message` (contact) | 1–2,000 ตัว | `required maxlength="2000"` |
| `message` (guestbook) | 1–500 ตัว | `required maxlength="500"` |

ไม่มี 501 อีกต่อไป (stub `NOT_IMPLEMENTED` ถูกแทนแล้ว · L3 ปิด)

---

## 2. Match — ตรงกันแล้ว

| # | จุด | หลักฐาน |
|---|---|---|
| M1 | HTTP method: contact `POST` · guestbook `GET` (list) + `POST` (sign) | `contact.astro:30-31` ↔ `api/contact.ts:11` · `guestbook.astro:23,36-37` ↔ `api/guestbook.ts:11,26` |
| M2 | ส่งเป็น JSON พร้อม `content-type: application/json` · server อ่านด้วย `request.json()` | `contact.astro:32-33` · `guestbook.astro:38-39` |
| M3 | ชื่อฟิลด์: ฟอร์มใช้ `name="name" / "email" / "message"` → `Object.fromEntries(FormData)` ได้ key ตรงกับที่ `insertContact` / `insertGuestbook` อ่าน · ไม่มีฟิลด์เกิน | `contact.astro:11-15` · `guestbook.astro:11-13` |
| M4 | ความยาว `message` ตรงกันเป๊ะ: contact 2,000 · guestbook 500 | `db.ts:64-65` |
| M5 | ความยาว `name` / `email` ฝั่ง FE เข้มกว่า server (80 < 100 · 120 < 254) → ผู้ใช้ไม่มีทางพิมพ์เกินที่ server รับ | — |
| M6 | Response ของ GET guestbook: FE อ่าน `data.entries[].name / message / created_at` ตรงกับ `{ entries: rows }` | `guestbook.astro:29-30` ↔ `api/guestbook.ts:16` |
| M7 | GET guestbook ไม่ส่ง `limit` → server ใช้ default 50 · มี cap 100 ตาม D9 | `db.ts:110-120` |
| M8 | Contact เช็ก `res.ok` (201 นับเป็น ok) และ `form.reset()` เฉพาะตอนสำเร็จ → ส่งไม่สำเร็จข้อความยังอยู่ ตรง D5 | `contact.astro:36-37` |
| M9 | ฝั่ง server ไม่ echo `err.message` ของ error ภายใน — log ใน server อย่างเดียว ตรง D6 | `api/contact.ts:27` · `api/guestbook.ts:18,41` |

---

## 3. Mismatch — ไม่ตรงกัน

| # | ระดับ | จุด | ปัญหา | ผลที่ผู้ใช้เห็น |
|---|---|---|---|---|
| X1 | **block-public** | `contact.astro:36` | FE คิดว่า `data.error` เป็น string แต่ API คืน **object** `{ code, message }` | `Error: [object Object]` ทุกครั้งที่ 400/500 · ผิด D6 (ต้องเป็นข้อความคงที่) — ตรงกับ L6 / issue #3 |
| X2 | **block-public** | `guestbook.astro:29-31` | `innerHTML` + `e.name` / `e.message` ของผู้ใช้ · server เก็บ string ตามที่ส่งมา (trim อย่างเดียว ไม่ escape) | stored XSS — payload `<img src=x onerror=…>` ยาวไม่ถึง 80 ตัว ผ่าน validation ได้ · ผิด D9 (รายละเอียดใน `review-fe-guestbook-contact.md` §1) |
| X3 | cosmetic* | `guestbook.astro:26` | เหมือน X1 — `entries.textContent = data.error` ได้ object | `[object Object]` ตอน GET 500 |
| X4 | cosmetic* | `guestbook.astro:36-41` | ไม่เช็ก `res.ok` ของ POST และ `form.reset()` ทุกกรณี | 400/500 แล้วข้อความหายเงียบ ๆ ไม่มีสถานะแจ้ง · ผิดหลัก D5 ("ส่งไม่สำเร็จต้องไม่ลบข้อความ") |
| X5 | minor | `contact.astro:13` vs `db.ts:68` | `type="email"` ของเบราว์เซอร์ยอม `a@b` (ไม่มีจุด) แต่ regex server บังคับต้องมี `.` หลัง `@` | ผ่านเบราว์เซอร์ → โดน 400 `VALIDATION` → เจอ X1 ต่อ |
| X6 | minor | ทั้งสองฟอร์ม vs `db.ts:74-77` | `required` ยอมข้อความที่เป็นช่องว่างล้วน แต่ server trim แล้วถือว่าว่าง | 400 `VALIDATION` → เจอ X1 / X4 |
| X7 | minor | `contact.astro:35` · `guestbook.astro:24` | เรียก `res.json()` โดยไม่เผื่อ body ที่ไม่ใช่ JSON (เช่น proxy คืน 413/502 เป็น HTML) | contact: ตกไป `catch` → `'Network error'` (ทางตันตาม D5) · guestbook `load()` ไม่มี `try/catch` → ค้าง "Loading…" + unhandled rejection |
| X8 | minor | `contact.astro:39` | `'Network error'` ไม่บอกช่องทางอื่น | ทางตัน ผิด D5 |
| X9 | BE vs D9 | `db.ts` · `api/guestbook.ts` | D9 ระบุว่าก่อนเปิดสาธารณะต้องมี "กันสแปม" ด้วย แต่ server ยังไม่มี rate limit / honeypot / moderation — มีแค่ความยาว + LIMIT | ยังไม่กระทบตอนนี้เพราะ guestbook ไม่อยู่ใน nav · STATUS เขียนว่า "server ครบแล้ว" แต่จริง ๆ ครบเฉพาะความยาว + LIMIT · L5 ให้เจ้าของเป็นคนตัดสินเรื่องนี้ |

\* cosmetic เพราะ guestbook ยังไม่เปิดสาธารณะตาม D9 — แต่ต้องแก้ก่อนเปิด

**ข้อความ error จาก server ไม่สม่ำเสมอ** (ไม่ใช่ bug แต่กระทบถ้า FE จะใช้ `message`): contact 500 เป็นภาษาไทยแต่ไม่มีอีเมลตาม D6 · guestbook 500 เป็นภาษาอังกฤษ · `VALIDATION` เป็นภาษาอังกฤษและมีชื่อฟิลด์ภายใน (`name is too long (max 100 characters)`) → FE **ไม่ควร**แสดง `error.message` ใด ๆ เลย ให้แยกตาม `code` + HTTP status แล้วใช้ข้อความคงที่ของ FE เอง

---

## 4. Suggestion — ข้อเสนอ

### ฝั่ง frontend (Claude · owner UI) — แก้ใน session ของตัวเอง

1. **Contact (X1, X7, X8 · issue #3 / L6):** แยกตาม status/code แล้วใช้ข้อความคงที่
   - `201` → "ส่งแล้ว ขอบคุณครับ" + `form.reset()`
   - `400` + `code` ใด ๆ → ข้อความตรวจ input (เช่น "กรุณาตรวจชื่อ อีเมล และข้อความอีกครั้ง" — **ยังไม่มีใน DECISIONS ต้องให้เจ้าของอนุมัติ**)
   - `500` / body ไม่ใช่ JSON / network error → ข้อความ D6: "ตอนนี้ส่งผ่านฟอร์มไม่ได้ — ข้อความของคุณยังอยู่ ส่งอีเมลมาที่ [email] ได้เลยครับ" โดย `[email]` เป็น `mailto:` จาก `loadProfile()` (ต้องรอ L2)
   - ห่อ `res.json()` ด้วย `.catch(() => null)` เพื่อไม่ให้ body ที่ไม่ใช่ JSON ตกไปเป็น network error
2. **Guestbook (X2):** เลิกใช้ `innerHTML` เปลี่ยนเป็น `createElement` + `textContent` / `append(string)` ตาม pseudo-diff ใน `review-fe-guestbook-contact.md` §1
3. **Guestbook (X3, X4, X7):** เช็ก `res.ok` ทั้ง GET และ POST · reset ฟอร์มเฉพาะตอน 201 · เพิ่ม `<p role="status">` เหมือนหน้า contact · `load()` มี `try/catch` และแสดงข้อความคงที่แทน `data.error`
4. **Validation ฝั่ง client (X5, X6):** เพิ่ม `pattern` ให้ช่อง email ให้ตรง regex ของ server (หรือเช็กใน JS ก่อนส่ง) และ trim ค่าก่อนเช็กว่าว่าง → ผู้ใช้เห็นข้อความ inline แทนการยิงแล้วโดน 400
5. **กันกดซ้ำ:** disable ปุ่ม submit ระหว่างรอ response — ตอนนี้กดหลายครั้งได้ row ซ้ำใน DB (server ไม่มี dedupe)
6. **เรื่อง copy (ไม่ใช่สัญญา แต่เจอระหว่างตรวจ):** ทั้งสองหน้าบอกผู้ชมว่า "โพสต์ไปที่ `POST /api/contact`" / "`/api/guestbook`" — เผยโครงสร้างภายในแบบเดียวกับที่ D6 ไม่อยากให้เห็น · ควรตัดออก · และหน้า contact ยังไม่มี `mailto:` บนสุดตาม D5 (issue #2 · รอ L2)
7. **`created_at`:** server คืนรูปแบบ SQLite `YYYY-MM-DD HH:MM:SS` เป็น **UTC ไม่มี timezone** → ถ้าจะแสดง ควรแปลงเป็นเวลาไทย (`+07:00`) ก่อน ไม่งั้นผู้ชมเห็นเวลาคลาดไป 7 ชั่วโมง
8. **(ถ้าต้องการ) ปรับ `maxlength` ให้เท่ากับ server** (name 100 · email 254) — ตอนนี้ไม่ผิดเพราะ FE เข้มกว่า แต่ถ้าตั้งใจให้ 80 ก็ควรบันทึกไว้ว่าเป็นการตัดสินใจ ไม่ใช่ค่าที่หลงเหลือจาก template

### ฝั่ง backend (OpenCode · owner API) — เสนอเท่านั้น ไม่ใช่ blocker ของ FE

1. **ทำ `error.message` ให้สม่ำเสมอ** (ภาษาเดียวกัน · ไม่มีชื่อฟิลด์ภายใน) หรือบันทึกในสัญญาว่า `message` มีไว้ debug และ FE ห้ามแสดง — แนะนำอย่างหลัง เพราะตรง D6 และไม่ผูก copy ไว้กับ server
2. **ถ้าอยาก FE แสดง error รายฟิลด์:** เพิ่ม `error.field` (`'name' | 'email' | 'message'`) ใน `VALIDATION` แทนการให้ FE parse ข้อความ
3. **กันสแปม (X9 · D9 · L5):** rate limit ต่อ IP / honeypot field — ต้องให้เจ้าของตัดสินก่อนว่าจะทำหรือไม่ · ถ้าเพิ่ม honeypot ต้องตกลงชื่อฟิลด์กับ FE ก่อน (กระทบสัญญา request)
4. **บันทึกสัญญานี้ลง docs** — ตอนนี้สัญญาอยู่แค่ใน comment ของ `api/*.ts` และไม่มี `docs/handoffs/04-*` · แนะนำให้ผู้ส่งงานรอบถัดไปเขียน handoff จาก `docs/handoffs/TEMPLATE.md` โดยใช้ตารางในข้อ 1 ของรายงานนี้

---

## 5. สรุป

- **สัญญาระดับ transport ตรงกันแล้ว** — method, path, content-type, ชื่อฟิลด์, ความยาว message และ shape ของ response สำเร็จตรงกันหมด
- **ที่ไม่ตรงคือการจัดการ error ฝั่ง FE** — API เปลี่ยน `error` เป็น object `{ code, message }` แต่ FE ทั้งสองหน้ายังคิดว่าเป็น string (X1, X3) · บวก XSS ใน guestbook (X2) ซึ่งเป็นปัญหา FE ล้วน server ไม่ได้ทำให้เกิด
- **ลำดับที่แนะนำ:** X1 + X7 + X8 (contact · issue #3) → X2 (guestbook XSS) → X3/X4 → X5/X6 → ข้อเสนอที่เหลือ
- Guestbook ยังเปิดสาธารณะไม่ได้แม้ FE จะแก้ครบ จนกว่าเจ้าของจะตัดสินเรื่องกันสแปม (X9 · L5)
