@AGENTS.md

# Claude Code — seed คอร์ส (อย่าลบตอน /init)

หลัง Lab 00 ให้ `/init` **merge** — เก็บกฎด้านล่างไว้เสมอ

## สี่เสา (ย่อ)

1. Multi-Agent แยกหน้าที่/ความจำ · 2. Sub-Agent ใช้แล้วทิ้ง · 3. ประสานผ่าน docs/PR · 4. Swarm เพดาน **20 turns**

## Ownership (บังคับ)

| Artifact | Owner |
|---|---|
| UI | Claude · `.claude/agents/frontend.md` |
| API + SQLite | OpenCode · `.opencode/agents/backend.md` |
| docs PROFILE / DEBATE / DECISIONS | Claude (Lab 01–02) |
| Hot state STATUS / OPEN_LOOPS | ผู้ถืองานรอบนั้น (single-writer) |

## Canonical context (อ่านก่อน · อย่าคัดลอกซ้ำในไฟล์นี้)

ก่อนลงมือ:

1. `docs/STATUS.md`
2. `docs/OPEN_LOOPS.md`
3. handoff ล่าสุดใน `docs/handoffs/` (ถ้ามี)
4. ตามงาน: `docs/PROFILE.md` · `docs/DECISIONS.md`

สรุป Goal / Latest D-id / Open loops / Blockers **ไม่เกิน 8 บรรทัด**  
ห้ามสมมุติจากแชท OpenCode ถ้าไม่มีใน `docs/`  
จบงานที่เปลี่ยนสถานะ → อัปเดต STATUS / OPEN_LOOPS · สลับ harness → เขียน handoff จาก [`docs/handoffs/TEMPLATE.md`](docs/handoffs/TEMPLATE.md)

## กฎสั้น

- Root เท่านั้น · plugin **project scope**
- Skill **`public-site-safe`**
- Agent ถาวรใช้ `memory: project` (harness) — ตรวจใน Lab 00 · ห้ามสร้าง memory bus เอง
- MCP ไม่ใช่ท่อ Claude ↔ OpenCode · Cross-CLI เฉพาะ Lab 07
- ห้าม commit `.env` · PR เข้า learner repo เท่านั้น
- Swarm: หยุดเมื่อ done หรือครบ 20 turns
- STATUS/OPEN_LOOPS = single-writer · commit ก่อนสลับ harness

## Labs

ดู [`labs/README.md`](labs/README.md) · เริ่ม [`lab-00-project-init`](labs/lab-00-project-init/README.md)

---

<!-- ส่วนล่างนี้ merge จาก /init (Lab 00) — ส่วน seed ด้านบนห้ามลบ -->

## Commands (รันที่ root · Node ≥ 22.12)

```powershell
npm run dev                                   # astro dev → http://localhost:4321
npm test                                      # vitest: tests/**/*.test.ts (ไม่รวม tests/labs)
npx vitest run tests/public-site.test.ts      # รันไฟล์เดียว · เพิ่ม -t "<ชื่อ test>" เพื่อกรอง
npm run test:labs                             # tests/labs/** — RED บน template จนกว่า Lab 05 เสร็จ
npm run test:e2e                              # Playwright (playwright/) · ต้องมี server ที่ PLAYWRIGHT_BASE_URL (default 127.0.0.1:4321)
npm run build && npm start                    # SSR build → node ./dist/server/entry.mjs
```

CI (`.github/workflows/ci.yml`) รัน `npm ci` → `npm test` → `npm run build` — ต้องเขียวก่อน merge

## Architecture

- **Astro 7 SSR** (`output: 'server'`, `@astrojs/node` standalone) — ทุกหน้า/endpoint ตั้ง `prerender = false`
- **Profile content** มาจาก `docs/PROFILE.md` ตอน runtime ผ่าน `loadProfile()` ใน `src/lib/profile.ts` (parse หัวข้อ `##`) → ถ้าไม่มีไฟล์/หัวข้อว่างจะใช้ `FALLBACK` — Dockerfile จึง `COPY docs` เข้า image
- **Pages** `src/pages/{index,about,interests,contact,guestbook}.astro` ใช้ `src/layouts/BaseLayout.astro` (`lang="th"`, CSS vars เช่น `--accent`)
- **API** `src/pages/api/{contact,guestbook,interests}.ts` → เรียก helper ใน `src/lib/db.ts` (better-sqlite3, ไฟล์ `$DATA_DIR/site.sqlite`, default `./data`)
- **Stub convention:** helper ที่ยังไม่ทำ `throw new Error('NOT_IMPLEMENTED: …')` → API แปลงเป็น **501**; error อื่น = 500 — Lab 05 (OpenCode) เป็นคน implement
- Docker: multi-stage node 22, runtime `DATA_DIR=/data` (volume), port 4321

## Gotchas

- `tests/public-site.test.ts` สแกน markup ที่ render ใน `src/**/*.astro|html` (ตัด frontmatter + HTML comment) — **ห้ามมีคำว่า "Lab 0x" / "แล็บ"** ในข้อความที่คนเห็น รวมถึง `FALLBACK` · comment ในไฟล์ `.ts` อ้าง lab ได้
- `tests/labs/*` ตั้ง `process.env.DATA_DIR` ก่อน dynamic import `db.ts` — `getDb()` cache connection ระดับ module
- `data/`, `*.sqlite`, `.env`, `.mcp.json`, `docs/_cli-*` อยู่ใน `.gitignore` — ห้ามบังคับ add
- ใช้ `.env.example` / `.mcp.json.example` / `opencode.json.example` / `.claude/settings.json.example` เป็นต้นแบบ — อย่าใส่ค่าจริงในไฟล์ example
