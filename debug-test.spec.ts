import { test } from '@playwright/test';

test('debug page', async ({ page }) => {
  page.on('console', msg => console.log('BROWSER:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err));

  await page.goto('http://localhost:4567/');

  // Wait for page to load
  await page.waitForTimeout(2000);

  // Get page content
  const content = await page.content();
  console.log('PAGE CONTENT:', content);

  // Take screenshot
  await page.screenshot({ path: 'home-debug.png', fullPage: true });

  // Try /hello
  await page.goto('http://localhost:4567/hello');
  await page.waitForTimeout(2000);
  const helloContent = await page.content();
  console.log('HELLO PAGE CONTENT:', helloContent);
  await page.screenshot({ path: 'hello-debug.png', fullPage: true });
});
