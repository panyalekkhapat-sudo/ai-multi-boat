// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// Trust X-Forwarded-For only for the real site host, so the guestbook rate
// limit sees each visitor's IP behind a reverse proxy instead of the proxy's.
const siteUrl = process.env.SITE_URL;

export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:4321',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  server: { host: true, port: 4321 },
  security: siteUrl ? { allowedDomains: [{ hostname: new URL(siteUrl).hostname }] } : undefined,
});
