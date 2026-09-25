import { describe, it, expect } from 'vitest';
import { parseProfile, loadProfile, splitInterest, paragraphs } from '../src/lib/profile';

/** L2 / D10 — multi-line sections, contact parsing, private sections never leak. */
const SAMPLE = `# PROFILE

## Name
Ada

## Headline
Builder

## Bio
First paragraph.

Second paragraph
wrapped line.

## Interests
- Web — because it is fun
- Teaching

## Contact
- email: ada@example.com
- github:
- linkedin: https://linkedin.com/in/ada

## Do not show
- secret employer

## Brainstorm
### Must
- private idea
`;

describe('parseProfile', () => {
  const p = parseProfile(SAMPLE);

  it('reads every bio paragraph, not only the first line', () => {
    expect(paragraphs(p.bio)).toEqual(['First paragraph.', 'Second paragraph wrapped line.']);
  });

  it('reads every interest', () => {
    expect(p.interests).toEqual(['Web — because it is fun', 'Teaching']);
    expect(splitInterest(p.interests[0])).toEqual({ title: 'Web', reason: 'because it is fun' });
    expect(splitInterest(p.interests[1])).toEqual({ title: 'Teaching', reason: '' });
  });

  it('parses contact and drops empty fields', () => {
    expect(p.contact).toEqual({ email: 'ada@example.com', linkedin: 'https://linkedin.com/in/ada' });
  });

  it('tagline is empty when the section is missing', () => {
    expect(p.tagline).toBe('');
  });

  it('never exposes Do not show / Brainstorm content', () => {
    expect(JSON.stringify(p)).not.toMatch(/secret employer|private idea|Must/);
  });
});

describe('loadProfile (docs/PROFILE.md)', () => {
  const p = loadProfile();
  it('keeps Brainstorm and Do not show out of the public profile', () => {
    expect(JSON.stringify(p)).not.toMatch(/Brainstorm|Proposed|###/);
  });
  it('has a mailto-able email', () => {
    expect(p.contact.email).toMatch(/@/);
  });
});
