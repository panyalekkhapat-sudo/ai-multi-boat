import { test, expect } from '@playwright/test';

test('home renders nav and heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('navigation')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('contact page has mailto and form fields', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.locator('a[href^="mailto:"]').first()).toBeVisible();
  await expect(page.getByLabel('ชื่อ', { exact: true })).toBeVisible();
  await expect(page.getByLabel('อีเมลของคุณ')).toBeVisible();
  await expect(page.getByLabel('ข้อความ', { exact: true })).toBeVisible();
});

test('guestbook: honeypot is hidden and a signed entry shows up as text', async ({ page }) => {
  await page.goto('/guestbook');
  await expect(page.locator('#website')).not.toBeInViewport();
  const name = `e2e-${Date.now()}`;
  await page.getByLabel('ชื่อ', { exact: true }).fill(name);
  await page.getByLabel('ข้อความ', { exact: true }).fill('<b>not bold</b>');
  await page.getByRole('button', { name: 'ฝากข้อความ' }).click();
  await expect(page.locator('#gb-status')).toHaveText('ขอบคุณสำหรับข้อความครับ');
  const entry = page.locator('#entries p', { hasText: name });
  await expect(entry).toContainText('<b>not bold</b>');
  await expect(entry.locator('b')).toHaveCount(0);
});
