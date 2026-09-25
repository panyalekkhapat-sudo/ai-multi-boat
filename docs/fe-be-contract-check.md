# FE ↔ BE Contract Check — Contact & Guestbook

> Lab 04 · ขั้นที่ 4 (ตรวจสัญญา API ก่อนเปิด PR `lab-04-frontend`)  
> ตรวจโดย: **OpenCode (backend)** · 2026-09-25  
> อ่าน: `src/pages/contact.astro` · `src/pages/guestbook.astro` · `src/pages/api/contact.ts` · `src/pages/api/guestbook.ts` · `src/lib/db.ts` (stub)  
> อ้างอิง: D5 · D6 · D9 (A1) · L3 · L5 · issues #2 #3 #4  
> **ไม่มีการแก้ไฟล์ใดใน `src/` ในรอบนี้** — รายงานอย่างเดียว

## สรุปผลสั้น

สัญญาหลัก **ตรงกันในระดับใช้งานได้จริง**: ทั้งสองฟอร์มไม่เคย render `err.message` และจัดการ 501 ด้วยข้อความคงที่ตาม D6 แล้ว · จุดที่ต้องแก้ทั้งหมดอยู่ฝั่ง API/stub (Lab 05 — งานของ OpenCode): **L3** (response ยังหลุดข้อความ `err.message` ที่มีคำว่า "Lab 05 OpenCode" ออกทาง JSON) และ **L5** (`topic` ต้องไม่ทำให้ 400) · ไม่มี mismatch ที่ทำให้ฟอร์มพังในสถานะ stub

## สัญญาที่ฟอร์มคาดหวัง vs stub (ต่อ endpoint)

### POST `/api/contact`

| ประเด็น | FE ส่ง/คาด (contact.astro) | Stub ทำ (api/contact.ts + db.ts) | สถานะ |
|---|---|---|---|
| Method / header | POST · `content-type: application/json` | รับ POST · `request.json()` | ✅ match |
| Body | `{ topic, name, email, message }` (จาก FormData ทั้งฟอร์ม · topic = dropdown D3/D5) | ส่ง body ทั้งก้อนเข้า `insertContact(_input: {name, email, message})` | ⚠️ mismatch เบา — ดู L5 ด้านล่าง |
| 2xx | `res.ok` → ข้อความ "ได้รับข้อความแล้ว" + `form.reset()` (ไม่อ่าน body) | 201 + JSON `row` (`ContactMessage`) | ✅ match |
| 400 | ข้อความคงที่ "กรุณาตรวจชื่อ อีเมล และข้อความอีกครั้ง" | ทุก error ที่ **ไม่ใช่** `NOT_IMPLEMENTED` → 400 | ⚠️ กว้างเกิน — ดู M2 ด้านล่าง |
| 501 | fallback ข้อความคงที่ + ลิงก์ mailto (ไม่ลบข้อความ · ไม่โชว์ err.message) | `insertContact` throw `NOT_IMPLEMENTED` → 501 | ✅ match (พฤติกรรมถูกตาม D5/D6) |
| Error body | **ไม่อ่าน** (`fallback()` ไม่แตะ response body) | `{ error: "NOT_IMPLEMENTED: insertContact — Lab 05 OpenCode" }` | ❌ mismatch — ดู M1 (L3) |

### GET `/api/guestbook`

| ประเด็น | FE คาด (guestbook.astro) | Stub ทำ | สถานะ |
|---|---|---|---|
| Response shape | `{ entries: Entry[] }` · ตรวจ `Array.isArray(data.entries)` · field ต่อ entry: `name` · `message` · `created_at` (ทน unknown/ขาด field — `String(e.x ?? '')`) | `{ entries: rows }` · `GuestbookEntry` มี field ตรง | ✅ match |
| !ok / throw | `entries.textContent = UNAVAILABLE` (ข้อความคงที่) | throw `NOT_IMPLEMENTED` → 501 | ✅ match พฤติกรรม |
| เงื่อนไข D9/A1 | FE ทำฝั่งตัวเองครบ (`textContent` เท่านั้น · `noindex` · maxlength 80/500) | ยังไม่มี: จำกัดความยาว server-side · กันสแปม · **LIMIT** ใน GET | ⚠️ ยังไม่ implement — ตามแผน Lab 05 |

### POST `/api/guestbook`

| ประเด็น | FE ส่ง/คาด | Stub ทำ | สถานะ |
|---|---|---|---|
| Body | `{ name, message }` (maxlength 80/500 ที่ client) | `insertGuestbook({name, message})` — signature ตรง | ✅ match |
| 2xx | `res.ok` → "ขอบคุณสำหรับข้อความครับ" + `form.reset()` + reload list | 201 + JSON `row` | ✅ match |
| 501 / error | `UNAVAILABLE` ข้อความคงที่ (ไม่ render err.message) | 501 + `{ error: "NOT_IMPLEMENTED: … Lab 05 OpenCode" }` | ✅ FE ถูก / ❌ response หลุด L3 เหมือน contact |

### หมายเหตุ: GET `/api/interests`

มี endpoint แต่ **ไม่มีหน้า .astro ใดเรียก** (`interests.astro` โหลด profile ฝั่ง server เอง) — ไม่ผูกกับฟอร์ม · ไม่เป็นสัญญาที่ต้องตรวจ · พิจารณาลบหรือใส่ `LIMIT`/cache ตอน ship ถ้าไม่ใช้ (P3 · เสนอเฉย ๆ)

## Match (ไม่ต้องแก้)

- ✅ ทั้งสองฟอร์มใช้ `textContent` / `createElement` เท่านั้น — ไม่มี `innerHTML` กับข้อมูลผู้ใช้ (D9/A1 ครบฝั่ง FE)
- ✅ `err.message` ไม่ถูก render ทุกเส้นทาง (D6 ฝั่ง FE ปิดแล้ว) — ทั้ง `catch` และ `!res.ok` ใช้ข้อความคงที่
- ✅ หลัก "ไม่มีทางตัน" (D5): contact fallback เสนอ mailto + คงข้อความที่พิมพ์ไว้ (`form.reset()` รันเฉพาะตอนสำเร็จ)
- ✅ status code ที่ FE แยก (ok / 400 / อื่น ๆ) มีอยู่จริงใน stub และตรงความหมาย
- ✅ Field บังคับของ stub (`name`, `email`, `message` สำหรับ contact · `name`, `message` สำหรับ guestbook) ตรงกับ field ที่ฟอร์ม required — `created_at` ไม่ถูกส่งจาก FE ตรงกับ default ใน schema

## Mismatch (ต้องแก้ — ทั้งหมดเป็นของ OpenCode · Lab 05)

| ID | ประเด็น | รายละเอียด | Loop / Decision |
|---|---|---|---|
| M1 | Response body หลุดข้อความ stub ออกสาธารณะ | `{ error: "NOT_IMPLEMENTED: insertContact — Lab 05 OpenCode" }` ถูกส่งกลับจริงทั้ง 501 และ 400 — FE ไม่แสดง แต่ใครเปิด DevTools เห็นคำว่า "Lab 05 OpenCode" (เผยโครงสร้างภายใน ตรงกับเหตุผลที่ D6 ห้าม) | **L3 (P0)** · D6 · issue #4 |
| M2 | 400 กว้างเกินความหมายที่ FE แปล | `catch` ใน `contact.ts` แมพทุก error ที่ไม่ใช่ `NOT_IMPLEMENTED` เป็น 400 — เมื่อ Lab 05 implement แล้ว error ฝั่ง DB/ดิสก์ จะกลายเป็น 400 → FE โชว์ "กรุณาตรวจชื่อ อีเมล และข้อความอีกครั้ง" ทั้งที่ผู้ใช้แก้อะไรไม่ได้ | D6 · แก้พร้อม L3 |
| M3 | `topic` ยังไม่มีสัญญาชัดว่า "รับแล้วเพิกเฉย" | FE ส่ง `topic` มาใน body เสมอ (D3/D5) · stub ส่งทั้งก้อนให้ `insertContact` ซึ่ง signature ไม่มี `topic` — Lab 05 ต้อง validate เฉพาะ 3 field และ**เพิกเฉย field อื่น ห้าม 400** | **L5 (P2)** · D3 · D5 |
| M4 | Guestbook ยังไม่มี server-side guard | ไม่มีจำกัดความยาว · กันสแปม · LIMIT ใน GET — client maxlength (80/500) ตัดได้แล้วจากภายนอก · หน้าเข้าถึงจาก nav แล้ว (A1) จึงเร่งขึ้น | D9 (A1) · L3 note · Lab 05 |

## ข้อเสนอแนะ (สำหรับ Lab 05 — เขียนเองตาม ownership)

1. **Error code แทน message (M1):** คืน `{ error: 'NOT_IMPLEMENTED' | 'VALIDATION' | 'SERVER' }` — ไม่ใส่สตริงจาก `err.message` ลง response เด็ดขาด (stack/message อยู่ใน log ฝั่ง server เท่านั้น)
2. **แยก 400 vs 500 (M2):** validate ขาด/เกิน field หรือ format ผิด → 400 · อ่าน/เขียน DB ล้ม → 500 · `request.json()` parse ไม่ได้ → 400 · อย่าใช้ "error อื่น = 400" เป็น catch-all
3. **L5:** validate `{name, email, message}` แบบ whitelisted — ดึงเฉพาะ 3 field จาก body · `topic` และ field แปลกอื่นถูกทิ้งเงียบ ๆ (ไม่ 400) · บันทึกไว้ใน docstring ของ `insertContact`
4. **Server-side length limit:** contact `name ≤ 80, email ≤ 120, message ≤ 2000` · guestbook `name ≤ 80, message ≤ 500` (ตาม maxlength ของฟอร์ม — FE ตั้งมาแล้ว ทำฝั่ง server ให้ตรงตัวเลขเดียวกัน)
5. **กันสแปม guestbook:** เริ่มจากขั้นต่ำที่ไม่ต้องมี state เพิ่ม — เช่น honeypot field ที่ FE ไม่มี + rate-limit ง่าย ๆ ต่อ IP ใน memory · ถ้าทำ honeypot ต้องแจ้ง frontend ผ่าน handoff ก่อน (อย่าเพิ่ม field บังคับเงียบ ๆ)
6. **LIMIT ใน GET guestbook:** เช่น `LIMIT 50 ORDER BY created_at DESC, id DESC` — FE วนแสดงทั้ง array ที่ได้ ไม่มี pagination จึงต้องจำกัดฝั่ง server
7. **Email format:** ตรวจคร่าว ๆ (มี `@` · ความยาว) พอ — อย่า block email ถูกต้องที่ regex ทั่วไปพลาด

## สิ่งที่รายงานนี้ไม่ได้ตัดสิน

- การแสดงผล/สไตล์ของฟอร์ม ข้อความ และรูปแบบวันที่ `created_at` (raw datetime) — เป็นของ frontend (L6 อยู่กับ Claude) · ข้อ 4–6 ข้างบนออกแบบให้ FE ปัจจุบันใช้ได้**โดยไม่ต้องแก้** `src/pages/*.astro` แล้ว
- `noindex` ของ guestbook จะถอดเมื่อ M4 ครบตาม D9/A1 — ตัดสินร่วมกันหลัง Lab 05 เขียว

## ข้อเสนอแนะต่อผู้ถือ STATUS (Claude — single-writer รอบนี้)

- อัปเดต `docs/STATUS.md` Next actions ข้อ 1 ให้เป็น "ตรวจสัญญาแล้ว → `docs/fe-be-contract-check.md` · ไม่พบ mismatch ฝั่ง FE ที่ block PR · mismatch ทั้งหมดเป็นงาน Lab 05 (L3/L5)"
- ส่ง M2/M3/M4 เข้า Lab 05 ผ่าน `docs/handoffs/` เดิม — ไม่ต้องเปิด issue ใหม่ (issue #4 + L3/L5 ครอบคลุมแล้ว)