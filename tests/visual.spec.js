import { test, expect } from '@playwright/test';

    // Test Case: TP-6
test.describe('Visual Regression Strategy', () => {

  // 1. STATIC PAGES: Standard regression
  const stablePages = [
    { name: 'Home', path: '/' },
    { name: 'Checkboxes', path: '/checkboxes' },
    { name: 'Dropdown', path: '/dropdown' }
  ];

  for (const info of stablePages) {
    test(`Visual: ${info.name}`, async ({ page }) => {
      await page.goto(info.path);
      await expect(page).toHaveScreenshot(`${info.name.toLowerCase()}.png`);
    });
  }

  // 2. DYNAMIC PAGE: Masking dynamic elements
  test('Visual: Challenging DOM (with Masking)', async ({ page }) => {
    await page.goto('/challenging_dom');
    
    // Mask the buttons because their IDs and labels change on refresh
    await expect(page).toHaveScreenshot('challenging-dom-masked.png', {
      mask: [page.locator('.button')],
      maxDiffPixelRatio: 0.1 // Adding a tiny bit of wiggle room for anti-aliasing
    });
  });

  // 3. VARIABLE PAGE: Using Thresholds for A/B Testing
  test('Visual: A/B Testing (with Threshold)', async ({ page }) => {
    await page.goto('/abtest');
    
    // Allow a higher pixel difference to account for the changing header text
    await expect(page).toHaveScreenshot('ab-test-threshold.png', {
      maxDiffPixels: 800, // Allowing up to 800 pixels of difference due to the changing header
      maxDiffPixelRatio: 0.05 // Allowing up to 5% of pixels to differ 
    });
  });
});