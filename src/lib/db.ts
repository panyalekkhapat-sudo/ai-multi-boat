/**
 * SQLite helpers for contact + guestbook (better-sqlite3, singleton per config).
 * Persistence implemented in Lab 05 — validation errors are safe fixed strings
 * so the API layer can map them to error codes without leaking internals (D6).
 */
import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export type GuestbookEntry = {
  id: number;
  name: string;
  message: string;
  created_at: string;
};

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;
  const dir = process.env.DATA_DIR || join(process.cwd(), 'data');
  mkdirSync(dir, { recursive: true });
  db = new Database(join(dir, 'site.sqlite'));
  db.exec(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS guestbook (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  return db;
}

/**
 * Validation errors are safe, fixed strings — the API layer maps them to
 * error codes and never echoes raw `err.message` to the client (D6).
 */
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

const LIMITS = {
  name: { min: 1, max: 100 },
  email: { max: 254 },
  message: { min: 1, max: 2000 },
  guestbookMessage: { min: 1, max: 500 },
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanString(value: unknown, field: string, max: number, min = 1): string {
  if (typeof value !== 'string') {
    throw new ValidationError(`${field} is required`);
  }
  const trimmed = value.trim();
  if (trimmed.length < min) {
    throw new ValidationError(`${field} is required`);
  }
  if (trimmed.length > max) {
    throw new ValidationError(`${field} is too long (max ${max} characters)`);
  }
  return trimmed;
}

export function insertContact(input: {
  name: string;
  email: string;
  message: string;
}): ContactMessage {
  const name = cleanString(input?.name, 'name', LIMITS.name.max, LIMITS.name.min);
  const email = cleanString(input?.email, 'email', LIMITS.email.max);
  const message = cleanString(input?.message, 'message', LIMITS.message.max, LIMITS.message.min);
  if (!EMAIL_RE.test(email)) {
    throw new ValidationError('email is not valid');
  }
  const db = getDb();
  const info = db
    .prepare(
      `INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)`
    )
    .run(name, email, message);
  const row = db
    .prepare(
      `SELECT id, name, email, message, created_at FROM contact_messages WHERE id = ?`
    )
    .get(info.lastInsertRowid) as ContactMessage;
  return row;
}

/** List guestbook entries, newest first. Limit is server-capped (D9). */
export function listGuestbook(limit?: number): GuestbookEntry[] {
  const requested = typeof limit === 'number' && Number.isFinite(limit) && limit > 0
    ? Math.floor(limit)
    : 50;
  const capped = Math.min(requested, 100);
  const db = getDb();
  return db
    .prepare(
      `SELECT id, name, message, created_at FROM guestbook ORDER BY id DESC LIMIT ?`
    )
    .all(capped) as GuestbookEntry[];
}

export function insertGuestbook(input: {
  name: string;
  message: string;
}): GuestbookEntry {
  const name = cleanString(input?.name, 'name', LIMITS.name.max, LIMITS.name.min);
  const message = cleanString(
    input?.message,
    'message',
    LIMITS.guestbookMessage.max,
    LIMITS.guestbookMessage.min
  );
  const db = getDb();
  const info = db
    .prepare(`INSERT INTO guestbook (name, message) VALUES (?, ?)`)
    .run(name, message);
  const row = db
    .prepare(
      `SELECT id, name, message, created_at FROM guestbook WHERE id = ?`
    )
    .get(info.lastInsertRowid) as GuestbookEntry;
  return row;
}
