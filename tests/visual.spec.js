import { test, expect } from '@playwright/test';

test.describe('Visual Regression Cases', () => {
    // Test Case: TP-6
    // Currently Disable for Debugging. Need to fix the DOM screenshot issue.
    /* test('Snap all pages', async ({ page }) => {
    await page.goto('/');

    // 1. Get the list of hrefs first, so we don't rely on the DOM after navigation
    const links = page.locator('li > a');
    const count = await links.count();
    const hrefs = [];

    for (let i = 0; i < count; i++) {
        const href = await links.nth(i).getAttribute('href');
        if (href) hrefs.push(href);
    }

    // 2. Iterate through the saved strings
    for (const href of hrefs) {
        if (href.includes('login') || href.includes('logout')) continue;

        // Navigate to each sub-page
        await page.goto(`/${href}`);
        
        // Take the screenshot
        await expect(page).toHaveScreenshot(`${href.replace(/\//g, '-')}.png`);
        
        // Navigate back to main to reset for the next loop
        await page.goto('/');
    }
    }); */
});