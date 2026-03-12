// @ts-check
import { test, expect, request } from '@playwright/test';

const mainPage = 'https://the-internet.herokuapp.com/';

/* THIS TEST IS BUGGED. NEED TO FIX.
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
}); */

// Test Case: TP-2
test('Dynamic Content', async ({ page }) => {
  await page.goto(mainPage);

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
  await page.goto(mainPage);

  // Click on the "Dropdown" link to navigate to the dropdown page.
  await page.getByRole('link', { name: 'Dropdown' }).click();

  // 
  const dropdown = page.locator('#dropdown');

  // Find the dropdown menu and expect it to be visible on the page.
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

// Test Case: TP-4
test('Authentication Check', async ({ page }) => {
  await page.goto(mainPage);

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

// Test Case: TP-5
test('API Calls', async ({ request }) => {  
  // Click on the "200" link to trigger the API call for status code 200.
  var response = await request.get('https://the-internet.herokuapp.com/status_codes/200');
  // Expect the response of code 200
  expect(response.status()).toBe(200);

  // Click on the "200" link to trigger the API call for status code 200.
  response = await request.get('https://the-internet.herokuapp.com/status_codes/301');
  // Expect the response of code 301
  expect(response.status()).toBe(301);

  // Click on the "200" link to trigger the API call for status code 200.
  response = await request.get('https://the-internet.herokuapp.com/status_codes/404');
  // Expect the response of code 404
  expect(response.status()).toBe(404);

  // Click on the "200" link to trigger the API call for status code 500.
  response = await request.get('https://the-internet.herokuapp.com/status_codes/500');
  // Expect the response of code 500
  expect(response.status()).toBe(500);
});

// Test Case: TP-6
// Currently Disable for Debugging. Need to fix the DOM screenshot issue.
/* test('Snap all pages', async ({ page }) => {
  await page.goto(mainPage);

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
    await page.goto(`${mainPage}/${href}`);
    
    // Take the screenshot
    await expect(page).toHaveScreenshot(`${href.replace(/\//g, '-')}.png`);
    
    // Navigate back to main to reset for the next loop
    await page.goto(mainPage);
  }
}); */

// Test Case: TP-8
test('File Upload', async ({ page }) => {
  await page.goto(mainPage);

  // Click on the "File Upload" link to navigate to the file upload page.
  await page.getByRole('link', { name: 'File Upload' }).click();

  // Set the file input to the specified file path.
  const filePath = './tests/files/sample.txt';
  await page.setInputFiles('#file-upload', filePath);

  // Click the upload button to submit the file.
  await page.getByRole('button', { name: 'Upload' }).click();

  // Expect the uploaded file name to be visible on the page after successful upload.
  await expect(page.getByText('sample.txt')).toBeVisible();
});

// Test Case: TP-9
test('File Download', async ({ page, context }) => {
  await page.goto(mainPage);
  
  // Click on the "File Download" link to navigate to the file download page.
  const fileDownloadPage = page.getByRole('link', { name: 'File Download', exact: true });
  await fileDownloadPage.click();


  // Get download links and expect them to be visible on the page.
  const downloadLinks = page.locator('#content a');

  // Iterate through the download links and click on each one to trigger the file download.
    const count = await downloadLinks.count();
    for (let i = 0; i < count; i++) {
      const link = downloadLinks.nth(i);
      const fileName = await link.textContent();
      if (fileName) {
        // Click the link to trigger the download and wait for the download event
        const [download] = await Promise.all([
          page.waitForEvent('download'),
          link.click()
        ]);
        
        // Save the downloaded file to a specific path.
        const downloadPath = await download.path();
        console.log(`File "${fileName.trim()}" downloaded to: ${downloadPath}`);
        // Expect the downloaded file to exist at the specified path.
        expect(downloadPath).not.toBeNull();
        // Optionally, you can also check the file content or name if needed.
        expect(download.suggestedFilename()).toBe(fileName.trim());
      }
    }
});
