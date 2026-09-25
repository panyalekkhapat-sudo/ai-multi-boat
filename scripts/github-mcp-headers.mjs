// headersHelper for the GitHub MCP server (.mcp.json).
// Reads GITHUB_PERSONAL_ACCESS_TOKEN from .env (or the environment) and
// prints the Authorization header as JSON for Claude Code.
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const envPath = join(dirname(fileURLToPath(import.meta.url)), "..", ".env");

let token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
if (!token && existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*GITHUB_PERSONAL_ACCESS_TOKEN\s*=\s*(.*)\s*$/);
    if (m) token = m[1].replace(/^["']|["']$/g, "").trim();
  }
}

if (!token) {
  console.error("GITHUB_PERSONAL_ACCESS_TOKEN not found in .env or environment");
  process.exit(1);
}

process.stdout.write(JSON.stringify({ Authorization: `Bearer ${token}` }));
