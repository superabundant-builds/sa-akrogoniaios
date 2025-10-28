import { test, expect } from '@playwright/test';

test('home page loads correctly', async ({ page }) => {
  await page.goto('http://localhost:4567/');

  // Check for Vite + TypeScript heading
  await expect(page.locator('h1')).toContainText('Vite + TypeScript');

  // Check for navigation links
  await expect(page.locator('a[href="/"]')).toBeVisible();
  await expect(page.locator('a[href="/hello"]')).toBeVisible();

  // Check for counter button
  await expect(page.locator('button#counter')).toBeVisible();
});

test('/hello page loads correctly', async ({ page }) => {
  await page.goto('http://localhost:4567/hello');

  // Check for h1 with "world"
  await expect(page.locator('h1')).toContainText('world');

  // Check for navigation links
  await expect(page.locator('a[href="/"]')).toBeVisible();
  await expect(page.locator('a[href="/hello"]')).toBeVisible();
});

test('navigation between pages works', async ({ page }) => {
  // Start at home page
  await page.goto('http://localhost:4567/');

  // Click on Hello link
  await page.locator('a[href="/hello"]').click();

  // Verify we're on /hello page
  await expect(page.locator('h1')).toContainText('world');

  // Click on Home link
  await page.locator('a[href="/"]').click();

  // Verify we're back on home page
  await expect(page.locator('h1')).toContainText('Vite + TypeScript');
});
