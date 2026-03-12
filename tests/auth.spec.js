import { test, expect, describe } from '@playwright/test';

test.fixme('Basic Auth Feature - Needs Investigation', () => {
test('Basic Auth with Dialog Listener', async ({ page }) => {
  await page.goto(mainPage);
  
  // 1. REGISTER the listener FIRST
  page.on('dialog', async dialog => {
    await expect(dialog.accept('admin:admin')).toBeTruthy();
    await dialog.dismiss();  
  }); // Accept the dialog with the credentials "admin:admin"

  // Expect the success message to be visible on the page after successful authentication.
  await expect(page.getByText('Congratulations! You must have the proper credentials.')).toBeVisible();

});

test('Authentication Failure', async ({ page }) => {
  await page.goto(mainPage);

  // Go to the login page.
  await page.getByRole('link', { name: 'Form Authentication' }).click();

  // Fill in the username and password fields with incorrect credentials.
  await page.getByLabel('Username').fill('invalidUser');
  await page.getByLabel('Password').fill('invalidPassword');

  // Click the login button.
  await page.getByRole('button', { name: 'Login' }).click();

  // Expect an error message to be visible on the page after failed authentication.
  await expect(page.getByText('Your username is invalid!')).toBeVisible();
});
});

test.describe('Form Authentication Feature', () => {
// Test Case: TP-4
test('Authentication Check', async ({ page }) => {
  await page.goto('/');

  // Go to the login page.
  await page.getByRole('link', { name: 'Form Authentication' }).click();

  // Fill in the username and password fields with incorrect information
  await page.getByLabel('Username').fill('invalidUser');
  await page.getByLabel('Password').fill('invalidPassword');

  // Click the login button.
  await page.getByRole('button', { name: 'Login' }).click();

  // Expect an error message to be visible on the page after failed authentication.
  await expect(page.getByText('Your username is invalid!')).toBeVisible();

  // Fill in the username and password fields
  await page.getByLabel('Username').fill('tomsmith');
  await page.getByLabel('Password').fill('SuperSecretPassword!');

  // Click the login button.
  await page.getByRole('button', { name: 'Login' }).click();

  // Expect a success message to be visible.
  await expect(page.getByText('You logged into a secure area!')).toBeVisible();
});
});

test.describe('Form Authentication Edge Cases', () => {
// Test Case: TP-10
test('Long String in Form Authentication', async ({ page }) => {
  await page.goto('/');

  // Go to the login page.
  await page.getByRole('link', { name: 'Form Authentication' }).click();

  // Fill in the username and password fields with long strings.
  const longString = 'a'.repeat(1000); // Generate a long string of 1000 characters
  await page.getByLabel('Username').fill(longString);
  await page.getByLabel('Password').fill(longString);

  // Click the login button.
  await page.getByRole('button', { name: 'Login' }).click();

  // Expect an error message to be visible on the page after failed authentication.
  await expect(page.getByText('Your username is invalid!')).toBeVisible();
});

// Test Case: TP-11
test('Empty Fields in Form Authentication', async ({ page }) => {
  await page.goto('/');

  // Go to the login page.
  await page.getByRole('link', { name: 'Form Authentication' }).click();

  // Leave the username and password fields empty and click the login button.
  await page.getByRole('button', { name: 'Login' }).click();

  // Expect an error message to be visible on the page after failed authentication.
  await expect(page.getByText('Your username is invalid!')).toBeVisible();
});

// Test Case: TP-12
test('Special Characters in Form Authentication', async ({ page }) => {
  await page.goto('/');

  // Go to the login page.
  await page.getByRole('link', { name: 'Form Authentication' }).click();

  // Fill in the username and password fields with special characters.
  const specialChars = '!@#$%^&*()_+{}|:"<>?`~';
  await page.getByLabel('Username').fill(specialChars);
  await page.getByLabel('Password').fill(specialChars);

  // Click the login button.
  await page.getByRole('button', { name: 'Login' }).click();

  // Expect an error message to be visible on the page after failed authentication.
  await expect(page.getByText('Your username is invalid!')).toBeVisible();
});

// Test Case: TP-13
test('SQL Injection in Form Authentication', async ({ page }) => {
  await page.goto('/');

  // Go to the login page.
  await page.getByRole('link', { name: 'Form Authentication' }).click();

  // Fill in the username and password fields with SQL injection strings.
  const sqlInjectionString = "' OR '1'='1";
  await page.getByLabel('Username').fill(sqlInjectionString);
  await page.getByLabel('Password').fill(sqlInjectionString);

  // Click the login button.
  await page.getByRole('button', { name: 'Login' }).click();

  // Expect an error message to be visible on the page after failed authentication.
  await expect(page.getByText('Your username is invalid!')).toBeVisible();
});

// Test Case: TP-14
test('Cross-Site Scripting (XSS) in Form Authentication', async ({ page }) => {
  await page.goto('/');

  // Go to the login page.
  await page.getByRole('link', { name: 'Form Authentication' }).click();

  // Fill in the username and password fields with XSS attack strings.
  const xssString = '<script>alert("XSS")</script>';
  await page.getByLabel('Username').fill(xssString);
  await page.getByLabel('Password').fill(xssString);

  // Click the login button.
  await page.getByRole('button', { name: 'Login' }).click();

  // Expect an error message to be visible on the page after failed authentication.
  await expect(page.getByText('Your username is invalid!')).toBeVisible();
});
});