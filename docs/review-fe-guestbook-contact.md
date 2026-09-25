# Review — FE gap: `guestbook.astro` · `contact.astro`

> 2026-09-25 · reviewer ฝั่ง frontend (one-shot, report only) · อ้างอิง `docs/DECISIONS.md` D5 · D6 · D9 และ `docs/OPEN_LOOPS.md` L5  
> **ไม่ได้แก้ `src/**`** — pseudo-diff ด้านล่างเป็นข้อเสนอให้ frontend (Claude) ทำใน session ของตัวเอง

## 1. `src/pages/guestbook.astro` เทียบ D9 — XSS จาก `innerHTML`

**จุดที่เสี่ยง** — `src/pages/guestbook.astro:29-31`

```js
entries.innerHTML = (data.entries || [])
  .map((e) => `<p><strong>${e.name}</strong>: ${e.message}<br/><small>${e.created_at}</small></p>`)
  .join('') || '<p>No entries yet.</p>';
```

- `e.name` และ `e.message` มาจากผู้ใช้ (POST `/api/guestbook`) แล้วถูกต่อ string เป็น HTML ตรง ๆ → ใครก็ได้โพสต์ `name = <img src=x onerror=alert(document.cookie)>` แล้วโค้ดจะรันในเบราว์เซอร์ของผู้ชมทุกคนที่เปิดหน้านี้ (stored XSS)
- ฝั่ง server จำกัดความยาว + LIMIT ใน GET แล้ว (L5 notes) แต่ **การจำกัดความยาวไม่กัน XSS** — payload ข้างบนสั้นกว่า 80 ตัวอักษร
- `e.created_at` มาจาก DB (server สร้าง) ความเสี่ยงต่ำกว่า แต่ควรใช้วิธีเดียวกันเพื่อไม่ต้องมานั่งแยกว่าฟิลด์ไหน "ปลอดภัย"
- D9 และเกณฑ์พร้อม Frontend ระบุชัด: "หน้า guestbook ไม่ใช้ `innerHTML` กับข้อมูลผู้ใช้" → **ตอนนี้ยังไม่ผ่าน**

**แนวทางแก้ (pseudo-diff)** — สร้าง DOM node แล้วใส่ข้อความด้วย `textContent`

```diff
- entries.innerHTML = (data.entries || [])
-   .map((e) => `<p><strong>${e.name}</strong>: ${e.message}<br/><small>${e.created_at}</small></p>`)
-   .join('') || '<p>No entries yet.</p>';
+ const list = data.entries || [];
+ entries.replaceChildren();                       // ล้างของเดิม (รวม "Loading…")
+ if (list.length === 0) {
+   const p = document.createElement('p');
+   p.textContent = 'No entries yet.';
+   entries.append(p);
+   return;
+ }
+ for (const e of list) {
+   const p = document.createElement('p');
+   const strong = document.createElement('strong');
+   strong.textContent = e.name;                   // ข้อมูลผู้ใช้ → textContent เท่านั้น
+   const small = document.createElement('small');
+   small.textContent = e.created_at;
+   p.append(strong, ': ' + e.message, document.createElement('br'), small);
+   entries.append(p);                             // string ใน append() = text node ไม่ถูก parse เป็น HTML
+ }
```

หมายเหตุประกอบ:

- `Element.append('...')` ที่รับ string จะสร้าง Text node ให้เอง — ปลอดภัยเท่ากับ `textContent`
- ห้ามแก้ด้วยการเขียนฟังก์ชัน escape เองแล้วยังใช้ `innerHTML` — ลืมฟิลด์เดียวก็กลับมาเป็น XSS
- ข้างเคียง (ไม่ใช่ XSS แต่เกี่ยว D6): บรรทัด 26 `entries.textContent = data.error || ...` — API ตอนนี้คืน `error` เป็น object `{code, message}` → จะแสดง `[object Object]` เหมือนกรณี contact (ดูข้อ 2) · และ submit handler (บรรทัด 36-42) ไม่เช็ก `res.ok` และ `form.reset()` ทุกกรณี → ส่งไม่สำเร็จแล้วข้อความหาย
- ต่อให้แก้ครบ D9 ยังต้องมี: ไม่อยู่ใน nav/footer + เจ้าของตัดสินใจเรื่องกันสแปม/rate limit (L5 · owner human) ก่อนเปิดสาธารณะ

## 2. `src/pages/contact.astro` เทียบ D6 — error ไม่ใช่ข้อความคงที่

**จุดที่ผิด** — `src/pages/contact.astro:36`

```js
status.textContent = res.ok ? 'Sent. Thank you!' : `Error: ${data.error || res.status}`;
```

- หลัง L3 ปิด (OpenCode) API `src/pages/api/contact.ts` คืน error เป็น **object**: `{ error: { code: 'BAD_JSON' | 'VALIDATION' | 'INTERNAL', message } }`
- template literal แปลง object เป็น string → ผู้ใช้เห็น **`Error: [object Object]`** ทุกครั้งที่ไม่สำเร็จ
- ถึงแม้จะเปลี่ยนเป็น `data.error.message` ก็ยังผิด D6 — D6 ให้ FE ใช้ **ข้อความคงที่** ไม่ใช่สะท้อนข้อความจาก server
- บรรทัด 38-39 `catch` แสดง `'Network error'` — เป็นทางตันตาม D5 (ไม่บอกช่องทางอื่น) และจะโดนด้วยถ้า `res.json()` parse ไม่ได้ (เช่น proxy คืน HTML)
- ส่วนที่**ถูกแล้ว**: `form.reset()` เรียกเฉพาะเมื่อ `res.ok` → ส่งไม่สำเร็จข้อความยังอยู่ (ตรง D5)

**ข้อความคงที่ที่ควรใช้ (ตาม D6)** สำหรับ 500/501 และ network error:

> ตอนนี้ส่งผ่านฟอร์มไม่ได้ — ข้อความของคุณยังอยู่ ส่งอีเมลมาที่ [email] ได้เลยครับ

- `[email]` = อีเมลจริงจาก `## Contact` ใน `docs/PROFILE.md` (ผ่าน `loadProfile()` หลัง L2) · แนะนำให้เป็นลิงก์ `mailto:` เพื่อไม่เป็นทางตัน (D5)
- 400 `VALIDATION` / `BAD_JSON` เป็นความผิดของ input — ใช้ข้อความคงที่ฝั่ง FE แยกตาม `code` ได้ เช่น "กรุณาตรวจชื่อ อีเมล และข้อความอีกครั้ง" (ยังไม่มีใน DECISIONS — เสนอให้เจ้าของอนุมัติ)

**แนวทางแก้ (pseudo-diff)**

```diff
+ const FALLBACK_MSG = 'ตอนนี้ส่งผ่านฟอร์มไม่ได้ — ข้อความของคุณยังอยู่ ส่งอีเมลมาที่ ' + CONTACT_EMAIL + ' ได้เลยครับ';
+ const INPUT_MSG = 'กรุณาตรวจชื่อ อีเมล และข้อความอีกครั้ง';
  try {
    const res = await fetch('/api/contact', { ... });
-   const data = await res.json();
-   status.textContent = res.ok ? 'Sent. Thank you!' : `Error: ${data.error || res.status}`;
-   if (res.ok) form.reset();
+   if (res.ok) {
+     status.textContent = 'Sent. Thank you!';
+     form.reset();
+   } else {
+     const code = await res.json().then((d) => d?.error?.code).catch(() => null);
+     status.textContent = res.status === 400 && code ? INPUT_MSG : FALLBACK_MSG;   // ไม่แสดง data.error.message
+   }
  } catch (err) {
-   status.textContent = 'Network error';
+   status.textContent = FALLBACK_MSG;
  }
```

- `CONTACT_EMAIL` ส่งจาก frontmatter ของหน้า (ค่าจาก `loadProfile()`) ผ่าน `data-*` attribute หรือ `define:vars` — frontend เลือกวิธีเอง
- ห้ามใส่คำอ้างคอร์ส/แล็บในข้อความเหล่านี้ (`tests/public-site.test.ts` สแกน markup)

## 3. ตารางสรุป

| ไฟล์ | ปัญหา | ตัดสินใจที่เกี่ยว | ระดับความเสี่ยง |
|---|---|---|---|
| `src/pages/guestbook.astro:29-31` | `innerHTML` + `e.name` / `e.message` ของผู้ใช้ → stored XSS | D9 · L5 | **block-public** |
| `src/pages/guestbook.astro:26` | `data.error` เป็น object → แสดง `[object Object]` | D6 | cosmetic (หน้าไม่เปิดสาธารณะตาม D9) |
| `src/pages/guestbook.astro:36-42` | ไม่เช็ก `res.ok` · `form.reset()` ทุกกรณี → ส่งไม่สำเร็จข้อความหาย | D5 (หลักเดียวกัน) · D9 | cosmetic |
| `src/pages/contact.astro:36` | `Error: ${data.error}` → `Error: [object Object]` · ไม่ใช่ข้อความคงที่ | D6 | **block-public** |
| `src/pages/contact.astro:38-39` | `'Network error'` ไม่มีช่องทางสำรอง = ทางตัน | D5 · D6 | **block-public** |
| `src/pages/contact.astro` (ทั้งหน้า) | ยังไม่มีอีเมล `mailto:` บนสุด (ต้องรอ L2 parse `## Contact`) | D5 · D10 | **block-public** (นอกขอบเขตรีวิวนี้ · issue #2) |

**ลำดับที่แนะนำ:** contact บรรทัด 36-39 (issue #3) → guestbook `textContent` (D9) → ที่เหลือ · guestbook เปิดสาธารณะไม่ได้จนกว่า L5 ฝั่ง human ตัดสินใจเรื่องกันสแปม
