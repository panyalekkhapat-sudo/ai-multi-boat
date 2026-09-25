# QA — Personal Site

> Lab 06

## E2E Playwright

- วันที่: 2026-09-25 · เครื่องมือ: Playwright MCP (Chromium) · Target: `http://localhost:4321` (`PORT=4321` จาก `.env`) · dev server รันอยู่แล้ว
- ไม่ได้แก้ `src/` ในรอบนี้

| # | Step | Expected | Result |
|---|---|---|---|
| 1 | เปิด `/` (Home) | displayName + headline จาก `docs/PROFILE.md` | ✅ title `Panya L. · Home` · `h1` = **Panya L.** (`## Name`) · headline = "Full-stack Developer ที่ทำเว็บให้ทีมรับช่วงต่อได้" (`## Headline`) |
| 2 | เปิด `/about` | 200 ไม่ใช่ 404 | ✅ 200 · `h1` About · Bio แสดงครบ |
| 3 | เปิด `/interests` | 200 ไม่ใช่ 404 | ✅ 200 · ⚠️ list มีแค่ 1 รายการ ("AI agents / LLM") — ตรงกับ bug L2 (parse หลายบรรทัดเหลือบรรทัดแรก) |
| 4 | เปิด `/contact` | 200 ไม่ใช่ 404 | ✅ 200 · ฟอร์ม Name / Email / Message + ปุ่ม Send |
| 5 | (control) เปิด `/does-not-exist` | 404 | ✅ 404 — console error 1 รายการมาจาก step นี้เท่านั้น (คาดไว้) |
| 6 | Contact: ส่งด้วย email `not-an-email` | ถูกปฏิเสธ | ✅ browser validation (`type=email`) บล็อกไว้ — **ไม่มี request** ไป `/api/contact` · ฟอร์มไม่ถูกล้าง |
| 7 | Contact: ส่ง demo (`QA Demo` · `qa.demo@example.com` · ข้อความไทย) | success | ✅ `POST /api/contact` → **201** · status "ส่งแล้ว ขอบคุณครับ" · ฟอร์มถูกล้าง |
| 8 | Guestbook: sign demo (`QA Demo` · ข้อความมี `<img src=x onerror=alert(1)>`) | success + ไม่ render HTML | ✅ `POST /api/guestbook` → **201** แล้ว `GET` → 200 · status "บันทึกแล้ว ขอบคุณครับ" · entry ใหม่อยู่บนสุด · payload แสดงเป็นข้อความ (`main img` = 0, `main script` = 0) |
| 9 | Screenshot | ≥ 2 หน้า | ✅ 3 ไฟล์ (ด้านล่าง) |

### Screenshots

- [`screenshots/e2e-home.png`](screenshots/e2e-home.png) — Home
- [`screenshots/e2e-contact-success.png`](screenshots/e2e-contact-success.png) — Contact หลังส่งสำเร็จ
- [`screenshots/e2e-guestbook-success.png`](screenshots/e2e-guestbook-success.png) — Guestbook หลัง sign

### ข้อสังเกต (ยังไม่แก้ — ส่งต่อรอบ a11y / frontend)

- **L2** — Interests แสดงแค่บรรทัดแรก
- **L7 / D9** — nav และการ์ดหน้าแรกยังลิงก์ Guestbook
- Guestbook entry: ข้อความกับ timestamp ติดกันใน accessible text (เช่น `…TEST TEST2026-09-25 08:16:34`) — ควรมีตัวคั่น / `<time>` แยก
- หน้า `/contact` และ `/guestbook` มี `<title>` แค่ "Contact" / "Guestbook" — ไม่มีชื่อเจ้าของเหมือนหน้าอื่น (`About · Panya L.`)
- Home มี eyebrow "Personal branding site" hardcode ใน `index.astro:9`
- ข้อมูล demo ที่ส่งรอบนี้อยู่ใน `data/site.sqlite` (git-ignored) — ลบได้ก่อน ship

## a11y Debate

- วันที่: 2026-09-25 · Input: `## E2E Playwright` ด้านบน + `src/pages/contact.astro` + CSS global ใน `src/layouts/BaseLayout.astro`
- contrast คำนวณตามสูตร WCAG 2.x (relative luminance) จากค่า CSS จริง · พื้น `.card` ≈ `#272c40` (`color-mix(#141a2f 92%, white 8%)`)
- ยังไม่แก้ `src/` ในรอบนี้

### Advocate

1. **Contrast ข้อความ — ผ่าน** · `--text` บน card 12.35:1 · `--muted` 6.63:1 · `--accent` (ลิงก์) 5.30:1 · ปุ่ม `#081018` บน `--accent` 7.34:1 · ข้อความใน input 16.21:1 → AA ครบ
2. **ขอบช่องกรอก — ไม่ผ่าน WCAG 1.4.11 (Non-text contrast ≥ 3:1)** · `--border #243056` เทียบ card = **1.07:1** · เทียบพื้น input = 1.41:1 · พื้น input `#0f1528` เทียบ card = 1.31:1 → คนสายตาเลือนรางแทบไม่เห็นว่าช่อง Name / Email / Message อยู่ตรงไหน
3. **Focus — ไม่มีสไตล์ของเราเลย** (`grep focus` ใน `src/` = 0) · พึ่ง focus ring ของ browser ซึ่งสีน้ำเงินมาตรฐาน (~`#005fcc`) บนพื้น card เข้ม ≈ 2.3:1 ต่ำกว่า 3:1 · ลิงก์ nav + การ์ดหน้าแรก (`<a class="card">`) ต้องเห็นชัดตอนกด Tab — WCAG 2.4.7 / 2.4.11
4. **Labels ฟอร์ม — โครงถูก** · ทุกช่องมี `<label for>` ตรง `id` · `required` · status ใช้ `role="status" aria-live="polite"` ✅ แต่:
   - ไม่มี `autocomplete` (`name` / `email`) — WCAG 1.3.5 Identify Input Purpose (AA)
   - ไม่บอกว่า "จำเป็นทุกช่อง" ด้วยข้อความ — ตอนนี้รู้ได้แค่จาก browser bubble
   - error 400 ขึ้นข้อความรวมใน status แต่ไม่ชี้ว่าช่องไหน (`aria-invalid` / `aria-describedby` ไม่มี) · ไม่ย้าย focus ไปช่องที่ผิด
   - ระหว่าง "Sending…" ปุ่มยังกดซ้ำได้ (ไม่มี `disabled` / `aria-busy`) → ส่งซ้ำ + screen reader ได้ยิน status ซ้ำ
5. **Heading order — ผ่าน** · ทุกหน้ามี `h1` เดียว · หน้าแรก `h1` → `h2` (การ์ด) ไม่ข้ามระดับ · Contact มี `h1` อย่างเดียว ไม่มีปัญหา
6. **อื่น ๆ จาก E2E** · `<title>` หน้า Contact / Guestbook ไม่มีชื่อเจ้าของ (2.4.2 — ตอนเปิดหลายแท็บแยกไม่ออก) · guestbook ข้อความติด timestamp ใน accessible text (ควรใช้ `<time>` + ตัวคั่น) · ลิงก์ใน body แยกจากข้อความด้วยสีอย่างเดียว (`text-decoration: none`) — 1.4.1 ถ้าวันหลังมีลิงก์กลางย่อหน้า · ไม่มี skip link (nav สั้น 5 ลิงก์ — ความเสี่ยงต่ำ) · label ภาษาอังกฤษบนหน้า `lang="th"` (อ่านได้ แต่สำเนียง screen reader เพี้ยนเล็กน้อย)

### Pragmatist

- **Contrast ข้อความผ่านแล้ว — อย่าเสียเวลารื้อ palette** · ปัญหาจริงคือ *ขอบ input* กับ *focus* — แก้ได้ด้วย CSS 2–3 บรรทัดใน `BaseLayout.astro` ครอบทุกหน้า (Contact + Guestbook) คุ้มที่สุด
- **ก่อน ship (ต้องทำ):** ขอบ input ≥ 3:1 · `:focus-visible` ชัด · `autocomplete` ใน Contact · ปุ่ม disable ระหว่างส่ง — รวมไม่เกิน 30 นาที ไม่แตะ API/DB (ไม่ข้าม ownership ของ OpenCode)
- **รอหลัง ship ได้:** error ระดับช่อง (`aria-invalid` + ย้าย focus) ต้องให้ API ส่ง field ที่ผิดกลับมา → ต้องคุยสัญญา API กับ backend ก่อน ไม่ใช่งาน 30 นาที · skip link · `<time>` ใน guestbook (หน้านี้ยังไม่เปิดสาธารณะตาม D9 อยู่แล้ว — ถ้าเอาออกจาก nav ตาม L7 ความเร่งลดลง)
- **ไม่ทำ:** เปลี่ยน label เป็นภาษาไทยทั้งหมด — เป็นเรื่อง brand/copy ต้องไปผ่าน DECISIONS ไม่ใช่ a11y blocker
- **ข้อแม้:** `<title>` ที่ไม่มีชื่อ — แก้ง่าย (1 บรรทัด/หน้า) แต่ผูกกับ L2/ชื่อจาก PROFILE · ให้ทำพร้อม frontend รอบ L2 เลย

## a11y Action items (prioritized P0/P1/P2)

| # | Pri | Item | ไฟล์ | WCAG | เวลา |
|---|---|---|---|---|---|
| A1 | **P0** | ขอบ `input, textarea` ให้ ≥ 3:1 — เช่น `#7383b8` (3.73:1 บน card · 4.89:1 บนพื้น input) | `src/layouts/BaseLayout.astro` | 1.4.11 | 5 นาที |
| A2 | **P0** | เพิ่ม `:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px }` (accent บน card 5.30:1 · บนพื้น input 6.96:1) | `src/layouts/BaseLayout.astro` | 2.4.7 · 2.4.11 | 5 นาที |
| A3 | **P1** | `autocomplete="name"` / `autocomplete="email"` ในฟอร์ม Contact | `src/pages/contact.astro` | 1.3.5 | 3 นาที |
| A4 | **P1** | ปุ่ม Send `disabled` + `aria-busy` ระหว่างส่ง แล้วคืนค่าใน `finally` | `src/pages/contact.astro` | 4.1.3 (ลด status ซ้ำ) | 10 นาที |
| A5 | **P1** | ข้อความ "ทุกช่องจำเป็นต้องกรอก" ใต้ `h1` ของ Contact | `src/pages/contact.astro` | 3.3.2 | 3 นาที |
| A6 | P2 | `<title>` Contact / Guestbook ให้มีชื่อเจ้าของ — ทำพร้อม L2 | `contact.astro` · `guestbook.astro` | 2.4.2 | 5 นาที |
| A7 | P2 | error ระดับช่อง (`aria-invalid` + `aria-describedby` + ย้าย focus) — ต้องตกลงสัญญา API กับ OpenCode ก่อน | `contact.astro` + `src/pages/api/contact.ts` | 3.3.1 | > 30 นาที |
| A8 | P2 | Guestbook: แยก timestamp ด้วย `<time datetime>` + ตัวคั่น · skip link · underline ลิงก์ใน body | `guestbook.astro` · `BaseLayout.astro` | 1.3.1 · 2.4.1 · 1.4.1 | 15 นาที |

**รวม P0 + P1 (A1–A5) ≈ 26 นาที** · owner = Claude (frontend) · ไม่แตะ API/DB · ทั้งหมดเป็น CSS/attribute ไม่เพิ่มคำที่คนเห็นซึ่งผิดกฎ `public-site-safe` (A5 ต้องไม่มีคำว่า lab)
