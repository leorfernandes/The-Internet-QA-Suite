import { test, expect } from '@playwright/test';

test.describe('Functional Testing', () => {
    // Test Case: TP-2
    test('Dynamic Content', async ({ page }) => {
    await page.goto('/');

    // Click on the "Dynamic Content" link to navigate to the dynamic content page.
    await page.getByRole('link', { name: 'Dynamic Content' }).click();

    // Expect the dynamic content.row to contain specific elements.
    const targetRow = page.locator('#content .row')
    .filter({ has: page.locator('.large-2.columns').getByRole('img') })
    .filter({ has: page.locator('.large-10.columns') });

    await expect(targetRow).toBeTruthy();
    });


    // Test Case: TP-3
    test('Check Dropdown', async ({ page }) => {
    await page.goto('/');

    // Click on the "Dropdown" link to navigate to the dropdown page.
    await page.getByRole('link', { name: 'Dropdown' }).click();

    // Find the dropdown menu and expect it to be visible on the page.
    const dropdown = page.locator('#dropdown');
    await expect(dropdown).toBeVisible();

    // Select "Option 1" from the dropdown menu.
    await dropdown.selectOption('1');
    // Expect "Option 1" to be selected in the dropdown menu.
    await expect(dropdown).toHaveValue('1');

    // Select "Option 2" from the dropdown menu.
    await dropdown.selectOption('2');
    // Expect "Option 2" to be selected in the dropdown menu.
    await expect(dropdown).toHaveValue('2');
    }
);
});