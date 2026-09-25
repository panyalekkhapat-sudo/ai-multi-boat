/**
 * Profile helpers. Learners fill docs/PROFILE.md in Lab 01.
 * Lab 04 (L2 / D10): sections are read in full up to the next heading, and
 * only the whitelisted `##` sections below are ever read — `## Brainstorm`,
 * `## Do not show` and any `###` sub-heading never reach the page.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export type Contact = {
  email?: string;
  github?: string;
  linkedin?: string;
};

export type Profile = {
  name: string;
  headline: string;
  /** Optional one-liner under the headline (D2) — hidden when empty. */
  tagline: string;
  /** Paragraphs separated by a blank line in PROFILE.md. */
  bio: string;
  audience: string;
  /** Each item may be `ชื่อ — เหตุผล` (D7); see splitInterest(). */
  interests: string[];
  contact: Contact;
};

/**
 * FALLBACK renders publicly when docs/PROFILE.md is missing or a section is
 * empty — keep it course-free (no lab references); learner hints belong in
 * comments and docs, not in rendered fallback text.
 */
const FALLBACK: Profile = {
  name: 'Your Name',
  headline: 'Personal branding site',
  tagline: '',
  bio: 'This personal site is still being built — content is coming soon.',
  audience: 'Hiring managers / peers / community',
  interests: ['AI agents', 'Web', 'Teaching'],
  contact: {},
};

function profilePath(): string {
  const candidates = [
    join(process.cwd(), 'docs', 'PROFILE.md'),
    join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'docs', 'PROFILE.md'),
  ];
  return candidates.find((p) => existsSync(p)) || candidates[0];
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Body of `## <label>` up to the next heading of any level (or end of file). */
export function getSection(raw: string, label: string): string {
  const re = new RegExp(`^##[ \\t]+${escapeRegExp(label)}[ \\t]*\\n([\\s\\S]*?)(?=^#{1,6}[ \\t]|(?![\\s\\S]))`, 'm');
  return (raw.match(re)?.[1] || '').trim();
}

function listItems(section: string): string[] {
  return section
    .split('\n')
    .map((l) => l.replace(/^[-*]\s*/, '').trim())
    .filter(Boolean);
}

function parseContact(section: string): Contact {
  const out: Contact = {};
  for (const item of listItems(section)) {
    const m = item.match(/^(email|github|linkedin)\s*:\s*(.*)$/i);
    const value = m?.[2].trim();
    if (m && value) out[m[1].toLowerCase() as keyof Contact] = value;
  }
  return out;
}

/** Split `ชื่อ — เหตุผล` into its parts; reason is empty when not written yet. */
export function splitInterest(item: string): { title: string; reason: string } {
  const [title, ...rest] = item.split(/\s+[—–]\s+/);
  return { title: title.trim(), reason: rest.join(' — ').trim() };
}

/** Bio paragraphs, split on blank lines. */
export function paragraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s*\n\s*/g, ' ').trim())
    .filter(Boolean);
}

export function parseProfile(raw: string): Profile {
  const text = raw.replace(/\r\n/g, '\n');
  const get = (label: string) => getSection(text, label);
  const interests = listItems(get('Interests'));
  return {
    name: get('Name') || FALLBACK.name,
    headline: get('Headline') || FALLBACK.headline,
    tagline: get('Tagline'),
    bio: get('Bio') || FALLBACK.bio,
    audience: get('Audience') || FALLBACK.audience,
    interests: interests.length ? interests : FALLBACK.interests,
    contact: parseContact(get('Contact')),
  };
}

export function loadProfile(): Profile {
  const path = profilePath();
  if (!existsSync(path)) return FALLBACK;
  return parseProfile(readFileSync(path, 'utf8'));
}
