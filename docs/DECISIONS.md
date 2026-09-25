# Decisions — Personal Site

> Lab 02 · 2026-09-25 · ที่มา: [`DEBATE.md`](DEBATE.md) (Brand / UX / Devil × 2 รอบ)  
> **Approved เฉพาะเมื่อเจ้าของรีวิวแล้ว** — ถ้าไม่ตรงใจ แก้คอลัมน์ "ตัดสินใจ" ได้เลย

## สรุปการโต้วาที

ทั้งสามมุมเห็นตรงกันว่าจุดต่างของเว็บคือ "ทำเว็บให้ทีมรับช่วงต่อได้" และ Home ควรมี CTA เดียว (UX ยอมเอาชิป Audience ออก แล้วย้ายการแยกหัวข้อไป Contact) Brand ยอมเอา AI agents และ Lighthouse ออกจากข้อความหลักเพราะ Devil ชี้ว่ายังไม่มีหลักฐาน ความขัดแย้งที่เหลือคือเรื่อง Contact และ Guestbook ซึ่งจบที่หลัก "ไม่มีทางตัน" ช่องทางติดต่อต้องใช้ได้จริงทุกสถานะ ห้ามแสดง error ดิบ และ Guestbook ห้ามเปิดสาธารณะจนกว่าจะปลอดภัย งาน frontend ที่ block ทุกอย่างคือ parser bug (L2) ส่วนความปลอดภัยของ API เป็นงาน OpenCode

## การตัดสินใจ (ตาราง)

| ID | หัวข้อ | ตัดสินใจ | เหตุผลสั้น | ใครเสนอ (Brand/UX/Devil) |
|----|--------|----------|------------|---------------------------|
| D1 | Headline | **"Full-stack Developer ที่ทำเว็บให้ทีมรับช่วงต่อได้"** — แก้ใน `PROFILE.md` แล้ว | headline เดิมพูด 3 เรื่อง · "รับช่วงต่อได้" คือจุดต่างจริง | Brand (Devil ยอม) |
| D2 | Tagline | **"หน้าบ้านถึงหลังบ้าน — โหลดเร็ว ใช้ง่าย โค้ดอ่านออก"** · AI agents **ไม่อยู่** ใน tagline → อยู่ใน Interests + Bio ย่อหน้า 2 | 1 บรรทัด = 1 คำสัญญา · "กำลังทดลอง" ยังไม่มีผลงานรองรับ | Brand + Devil |
| D3 | Audience หลัก | **บริษัทที่หาคนร่วมทีม** · ฟรีแลนซ์/นักเรียน/เพื่อน dev เป็นกลุ่มรอง ดูแลผ่าน dropdown ของ Contact และหน้า Interests | ข้อความ "รับช่วงต่อได้" พูดกับคนจ้างระยะยาว · ฟรีแลนซ์ขาดหลักฐาน (ห้ามโชว์เรท/ลูกค้า) | Brand |
| D4 | Home CTA | ปุ่มหลัก 1 ปุ่ม **"ทักมาคุยกัน"** → `/contact` + ข้อความธรรมดาใต้ปุ่ม "รับคุยเรื่องร่วมทีม · โปรเจกต์ · เริ่มเรียนเขียนเว็บ" · **ไม่มี**ชิป Audience | Brand ต้องการ CTA เดียว · UX ต้องการให้คนรู้ว่าทักเรื่องอะไรได้ | Brand + UX |
| D5 | Contact | **Must:** อีเมลจริงเป็น `mailto:` อยู่บนสุด · หลัก "ไม่มีทางตัน" · **Nice:** ฟอร์ม + dropdown หัวข้อ (แสดงฟอร์มเฉพาะเมื่อ API ใช้ได้จริง · ส่งไม่สำเร็จต้องไม่ลบข้อความ) · ไม่ทำ `?topic=` ใน v1 | ฟอร์มที่ได้ 501 = ทางตัน · `?topic=` เพิ่ม scope ทั้ง FE+BE | UX + Devil |
| D6 | Error ที่ผู้ใช้เห็น | **ห้ามแสดง `err.message`** · 501/500 ใช้ข้อความคงที่ "ตอนนี้ส่งผ่านฟอร์มไม่ได้ — ข้อความของคุณยังอยู่ ส่งอีเมลมาที่ [email] ได้เลยครับ" · FE แก้ `contact.astro` (Lab 04) · API คืน error code (L3 · OpenCode Lab 05) | ตอนนี้ผู้ชมเห็นข้อความ NOT_IMPLEMENTED ที่อ้างคอร์ส + เผยโครงสร้างภายใน | Devil |
| D7 | Interests | **Must:** 3 หัวข้อ รูปแบบ `ชื่อ — เหตุผล 1 บรรทัด` ใน `string[]` เดิม (ไม่แก้ type) · ไม่มีลิงก์ "คุยเรื่องนี้ →" (คง CTA เดียว) · เจ้าของเขียนเหตุผลเอง | ไม่มีเหตุผล = หน้าบางเกินจะแยก · Devil ยอมเมื่อไม่ต้องแก้ type | UX (Devil ยอมมีเงื่อนไข) |
| D8 | การเคลม / หลักฐาน | ตัด **"หลายปี"** ออกจาก Bio (หรือใส่ตัวเลขจริง) · ไม่ใช้ Lighthouse ในข้อความหลัก (Nice ต้องมีวันที่ + อุปกรณ์ + หน้าที่วัด) · **ไม่สัญญา** "ตอบภายในไม่กี่วัน" · ทุกการเคลมต้องมีหลักฐานบนหน้า ไม่มี = ตัด | ห้ามแสดงบริษัท/ลูกค้า/รูป → เคลมลอย ๆ ทำลายความน่าเชื่อถือ | Devil (Brand ยอม) |
| D9 | Guestbook | **ไม่อยู่ใน nav/footer และไม่เปิดสาธารณะ** จนกว่าจะมีครบ: escape ฝั่ง render (`textContent` แทน `innerHTML` · Lab 04) + จำกัดความยาวฝั่ง server + กันสแปม + LIMIT ใน GET (OpenCode · Lab 05) | XSS จริงในโค้ดตอนนี้ · ไม่มีคนดูแลข้อความ | Devil (UX ยอม) |
| D10 | Parser `loadProfile()` (L2) | อ่านได้หลายบรรทัดจนถึงหัวข้อ `##` ถัดไป · **ต้องไม่ดึง** `## Brainstorm` / `## Do not show` / `###` ย่อยขึ้นเว็บ · parse `## Contact` · ฟิลด์ที่ว่างให้ซ่อน ไม่แสดงลิงก์ว่าง | block About, Interests, Contact · ความเสี่ยงให้ข้อมูลที่ไม่ต้องการหลุดขึ้นเว็บ | UX + Devil |
| D11 | Navigation | 4 ข้อ: **หน้าแรก · เกี่ยวกับผม · สิ่งที่สนใจ · ติดต่อ** | ลด cognitive load · Guestbook ตาม D9 | UX |
| D12 | เงื่อนไขก่อน ship (Lab 08) | (1) อีเมลจริงหรือ alias แทน `demo@example.com` (2) ลิงก์ GitHub สาธารณะเพื่อเป็นหลักฐานของ "รับช่วงต่อได้" ถ้าไม่มีให้กลับไปทบทวน D1 (3) Dockerfile copy เฉพาะ `docs/PROFILE.md` แทนทั้ง `docs/` | ช่องทางติดต่อปลอม = เว็บไร้ประโยชน์ · ไม่ส่ง Brainstorm/DEBATE ไปกับ image | Devil + Brand |

**PROFILE ที่แก้ในรอบนี้:** `## Headline` เปลี่ยนจาก "ทำเว็บครบทั้งหน้าบ้าน-หลังบ้าน ที่โหลดเร็ว ใช้ง่าย และทีมรับช่วงต่อได้" → ข้อความใน D1 (tagline ใน D2 ยังไม่มีหัวข้อใน PROFILE · parser ยังไม่รองรับ — frontend ตัดสินใจตอน Lab 04)  
**เจ้าของต้องแก้ PROFILE เอง:** ตัด "หลายปี" (D8) · เขียนเหตุผลใน Interests (D7) · อีเมลจริง + GitHub (D12)

## สิ่งที่เลื่อนออก (Out of scope v1)

- ชิปทางเข้าตาม Audience บน Home และ `/contact?topic=`
- ฟอร์ม Contact เป็น Must (ย้ายเป็น Nice จนกว่า API ของ OpenCode จะพร้อม)
- Guestbook สาธารณะ (ดู D9)
- ตัวเลข Lighthouse บนเว็บ (ยกเว้นมีวันที่และเงื่อนไขกำกับ)
- ลิงก์ "คุยเรื่องนี้ →" ในการ์ด Interests
- คำสัญญาเวลาตอบกลับ
- Blog · case study · TH/EN · SEO/OG image · CMS · login · dark mode · animation หนัก
- Retention/นโยบายข้อความ Contact และคอลัมน์ moderate → เปิด issue ให้ OpenCode (Lab 03/05)

## เกณฑ์พร้อม Frontend (Lab 04)

- แก้ L2 เสร็จ: About แสดง Bio ครบ 3 ย่อหน้า · Interests ครบ 3 ข้อ · มีข้อมูล Contact · **ไม่มี**เนื้อหาจาก Brainstorm / Do not show หลุดขึ้นหน้าเว็บ (D10)
- Home มี Name + Headline (D1) + Tagline (D2) + ปุ่ม "ทักมาคุยกัน" ปุ่มเดียว + บรรทัดข้อความใต้ปุ่ม (D4) · nav 4 ข้อ (D11)
- Contact แสดงอีเมลเป็น `mailto:` บนสุด · ไม่มีหน้าไหนแสดง `err.message` · 501/500 ใช้ข้อความคงที่ (D5, D6)
- Guestbook ไม่มีลิงก์จาก nav/footer และหน้า guestbook ไม่ใช้ `innerHTML` กับข้อมูลผู้ใช้ (D9)
- `npm test` ผ่าน (ไม่มีคำอ้างถึงคอร์สใน markup) · ไม่แตะ `src/lib/db.ts` / `src/pages/api/**` (งาน OpenCode)

## Issues (Lab 03)

> สร้าง 2026-09-25 ผ่าน GitHub MCP ใน `panyalekkhapat-sudo/ai-multi-boat` · **ยังไม่มี label** (PAT ได้ 403 ตอนติด label — เจ้าของต้องเพิ่มสิทธิ์หรือติด `enhancement` เอง) · D7–D12 ยังไม่เปิด issue

| Issue # | Title | มาจาก Decision | Owner |
|---|---|---|---|
| [#1](https://github.com/panyalekkhapat-sudo/ai-multi-boat/issues/1) | Home: Headline + Tagline + CTA เดียว "ทักมาคุยกัน" | D1 · D2 · D4 | Claude (frontend) |
| [#2](https://github.com/panyalekkhapat-sudo/ai-multi-boat/issues/2) | Contact: อีเมล mailto บนสุด · หลัก "ไม่มีทางตัน" | D3 · D5 | Claude (frontend) |
| [#3](https://github.com/panyalekkhapat-sudo/ai-multi-boat/issues/3) | Frontend: ห้ามแสดง err.message — ข้อความคงที่เมื่อ 501/500 | D6 | Claude (frontend) |
| [#4](https://github.com/panyalekkhapat-sudo/ai-multi-boat/issues/4) | API: คืน error code แทน err.message (L3) | D6 | OpenCode (backend) |
