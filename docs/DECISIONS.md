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
| D9 | Guestbook | **(แก้ 2026-09-25 · เจ้าของอนุมัติ — ดู Amendment A1)** ลิงก์ "สมุดเยี่ยม" **อยู่ใน nav ได้** · render ด้วย `textContent` เท่านั้น ห้าม `innerHTML` กับข้อมูลผู้ใช้ (Lab 04 · ทำแล้ว) · หน้า guestbook **คง `noindex`** จนกว่า server-side ครบ: จำกัดความยาว + กันสแปม + LIMIT ใน GET (OpenCode · Lab 05) · ยังไม่นับเป็น "เปิดสาธารณะเต็มรูปแบบ" จนกว่าจะครบ | เดิม: XSS จริงในโค้ด + ไม่มีคนดูแลข้อความ · XSS ฝั่ง render ปิดแล้ว · เจ้าของต้องการให้คนเข้าถึงได้จาก nav · noindex ลดการถูก bot/สแปมพบระหว่างรอ server-side | Devil (UX ยอม) · แก้โดยเจ้าของ |
| D10 | Parser `loadProfile()` (L2) | อ่านได้หลายบรรทัดจนถึงหัวข้อ `##` ถัดไป · **ต้องไม่ดึง** `## Brainstorm` / `## Do not show` / `###` ย่อยขึ้นเว็บ · parse `## Contact` · ฟิลด์ที่ว่างให้ซ่อน ไม่แสดงลิงก์ว่าง | block About, Interests, Contact · ความเสี่ยงให้ข้อมูลที่ไม่ต้องการหลุดขึ้นเว็บ | UX + Devil |
| D11 | Navigation | **(แก้ 2026-09-25 · A1)** 4 ข้อหลัก: **หน้าแรก · เกี่ยวกับผม · สิ่งที่สนใจ · ติดต่อ** + **สมุดเยี่ยม** ต่อท้าย | ลด cognitive load ด้วย 4 ข้อหลัก · Guestbook เพิ่มตามการตัดสินของเจ้าของ (D9) | UX · แก้โดยเจ้าของ |
| D12 | เงื่อนไขก่อน ship (Lab 08) | (1) อีเมลจริงหรือ alias แทน `demo@example.com` (2) ลิงก์ GitHub สาธารณะเพื่อเป็นหลักฐานของ "รับช่วงต่อได้" ถ้าไม่มีให้กลับไปทบทวน D1 (3) Dockerfile copy เฉพาะ `docs/PROFILE.md` แทนทั้ง `docs/` | ช่องทางติดต่อปลอม = เว็บไร้ประโยชน์ · ไม่ส่ง Brainstorm/DEBATE ไปกับ image | Devil + Brand |

**PROFILE ที่แก้ในรอบนี้:** `## Headline` เปลี่ยนจาก "ทำเว็บครบทั้งหน้าบ้าน-หลังบ้าน ที่โหลดเร็ว ใช้ง่าย และทีมรับช่วงต่อได้" → ข้อความใน D1 (tagline ใน D2 ยังไม่มีหัวข้อใน PROFILE · parser ยังไม่รองรับ — frontend ตัดสินใจตอน Lab 04)  
**เจ้าของต้องแก้ PROFILE เอง:** ตัด "หลายปี" (D8) · เขียนเหตุผลใน Interests (D7) · อีเมลจริง + GitHub (D12)

## Amendments

| ID | วันที่ | แก้ Decision | สรุป | ผู้อนุมัติ |
|---|---|---|---|---|
| A1 | 2026-09-25 | D9 · D11 | อนุญาตลิงก์ Guestbook ("สมุดเยี่ยม") ใน nav · คง `textContent` + `noindex` · เงื่อนไข server-side (ความยาว · กันสแปม · LIMIT ใน GET) ยังเป็นของ OpenCode Lab 05 และเร่งขึ้นเพราะหน้าเข้าถึงได้จาก nav แล้ว | เจ้าของ repo (Panya) — เลือก "แก้ D9 ก่อนแล้วค่อยเพิ่มลิงก์" |
| A2 | 2026-09-25 | D7 · D8 · D9 · D12(3) | **D9:** กันสแปม guestbook = honeypot field `website` (บอทได้ 202 เงียบ ๆ ไม่บันทึก) + จำกัด 5 โพสต์ / 10 นาที / IP ในหน่วยความจำ (ไม่เก็บ IP ลง DB) → 429 · ครบเงื่อนไข server-side แล้ว → **เอา `noindex` ออก** · โค้ด `src/lib/rate-limit.ts` + `src/pages/api/guestbook.ts` ทำโดย Claude แทน OpenCode (เจ้าของอนุมัติข้าม ownership ครั้งนี้) · **D7:** Claude ร่างเหตุผล Interests จาก Bio เดิม — เจ้าของแก้ได้ · **D8:** ตัด "หลายปี" แล้ว · **D12(3):** Dockerfile copy เฉพาะ `docs/PROFILE.md` · D12(1)(2) อีเมลจริง/GitHub เจ้าของขอคงไว้ก่อน | เจ้าของ repo (Panya) |

## สิ่งที่เลื่อนออก (Out of scope v1)

- ชิปทางเข้าตาม Audience บน Home และ `/contact?topic=`
- ฟอร์ม Contact เป็น Must (ย้ายเป็น Nice จนกว่า API ของ OpenCode จะพร้อม)
- ตัวเลข Lighthouse บนเว็บ (ยกเว้นมีวันที่และเงื่อนไขกำกับ)
- ลิงก์ "คุยเรื่องนี้ →" ในการ์ด Interests
- คำสัญญาเวลาตอบกลับ
- Blog · case study · TH/EN · SEO/OG image · CMS · login · dark mode · animation หนัก
- Retention/นโยบายข้อความ Contact และคอลัมน์ moderate → เปิด issue ให้ OpenCode (Lab 03/05)

## เกณฑ์พร้อม Frontend (Lab 04)

- แก้ L2 เสร็จ: About แสดง Bio ครบ 3 ย่อหน้า · Interests ครบ 3 ข้อ · มีข้อมูล Contact · **ไม่มี**เนื้อหาจาก Brainstorm / Do not show หลุดขึ้นหน้าเว็บ (D10)
- Home มี Name + Headline (D1) + Tagline (D2) + ปุ่ม "ทักมาคุยกัน" ปุ่มเดียว + บรรทัดข้อความใต้ปุ่ม (D4) · nav 4 ข้อ (D11)
- Contact แสดงอีเมลเป็น `mailto:` บนสุด · ไม่มีหน้าไหนแสดง `err.message` · 501/500 ใช้ข้อความคงที่ (D5, D6)
- Guestbook มีลิงก์ "สมุดเยี่ยม" ใน nav (D9/D11 · A1) · หน้า guestbook ไม่ใช้ `innerHTML` กับข้อมูลผู้ใช้ · มี `noindex` จนกว่า server-side ของ Lab 05 ครบ
- `npm test` ผ่าน (ไม่มีคำอ้างถึงคอร์สใน markup) · ไม่แตะ `src/lib/db.ts` / `src/pages/api/**` (งาน OpenCode)

## Issues (Lab 03)

> สร้าง 2026-09-25 ผ่าน GitHub MCP ใน `panyalekkhapat-sudo/ai-multi-boat` · **ยังไม่มี label** (PAT ได้ 403 ตอนติด label — เจ้าของต้องเพิ่มสิทธิ์หรือติด `enhancement` เอง) · D7–D12 ยังไม่เปิด issue

| Issue # | Title | มาจาก Decision | Owner |
|---|---|---|---|
| [#1](https://github.com/panyalekkhapat-sudo/ai-multi-boat/issues/1) | Home: Headline + Tagline + CTA เดียว "ทักมาคุยกัน" | D1 · D2 · D4 | Claude (frontend) |
| [#2](https://github.com/panyalekkhapat-sudo/ai-multi-boat/issues/2) | Contact: อีเมล mailto บนสุด · หลัก "ไม่มีทางตัน" | D3 · D5 | Claude (frontend) |
| [#3](https://github.com/panyalekkhapat-sudo/ai-multi-boat/issues/3) | Frontend: ห้ามแสดง err.message — ข้อความคงที่เมื่อ 501/500 | D6 | Claude (frontend) |
| [#4](https://github.com/panyalekkhapat-sudo/ai-multi-boat/issues/4) | API: คืน error code แทน err.message (L3) | D6 | OpenCode (backend) |

## Lab 03 — MCP vs gh

- **ความเร็ว:** MCP เร็วกว่าเมื่อต้องแปลง DECISIONS → หลาย issue ในครั้งเดียว (Claude อ่าน docs + ร่าง body + สร้าง #1–#4 ในรอบเดียว) · `gh` เร็วกว่าสำหรับงานเดี่ยวที่รู้ title/body แล้ว และสำหรับตรวจผล (`gh issue list` / `gh issue view --web`) เพราะไม่ต้องผ่านรอบคิดของโมเดล
- **สิทธิ์:** MCP ใช้ PAT จาก `.env` (`GITHUB_PERSONAL_ACCESS_TOKEN`) → สิทธิ์เท่าที่ scope ของ PAT ให้ · `gh` ใช้ token ของ `gh auth login` แยกกัน → สองช่องทางอาจมีสิทธิ์ไม่เท่ากันบน repo เดียว · เก็บ PAT ให้แคบ (fine-grained · repo เดียว · Issues read/write) และไม่ใส่ค่าจริงในเอกสาร
- **Audit trail:** ทั้งสองขึ้นใน GitHub ว่าเจ้าของ token เป็นคนสร้าง (แยกไม่ออกว่า agent หรือคน) · MCP มีร่องรอยเพิ่มใน transcript ของ Claude Code (prompt → tool call → ผลลัพธ์) · `gh` มีแค่ shell history → ให้ใส่ tag `[Dx]` ใน title และอ้าง Decision ใน body เพื่อโยงกลับ DECISIONS ได้ทั้งสองทาง
- **ข้อผิดพลาดที่เจอ:** MCP สร้าง issue ได้แต่ **ติด label ไม่ได้ (403)** เพราะ PAT ขาดสิทธิ์ → #1–#4 ไม่มี label · ความเสี่ยงของ MCP คือสร้างซ้ำถ้า prompt ถูกรันใหม่ (ต้อง `search_issues` / `gh issue list` ก่อนสร้าง) · ความเสี่ยงของ `gh` บน PowerShell คือการ escape body หลายบรรทัด/ภาษาไทย → ใช้ here-string + `--body-file -`
- **เมื่อไหร่ใช้อะไร:** ใช้ **MCP** เมื่อ agent ต้องอ่าน context ใน `docs/` แล้วสร้าง/อัปเดตหลายรายการ หรือทำต่อเนื่องใน workflow (issue → PR → review) · ใช้ **`gh`** เมื่อคนต้องการควบคุมเอง, ต้องตรวจยืนยันผลของ agent, งานสิทธิ์ที่ PAT ของ MCP ทำไม่ได้ (เช่นติด label), หรือใส่ใน script/CI
