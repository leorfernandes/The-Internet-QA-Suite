const fs = require('fs');
const path = require('path');
const { test, expect  } = require('@playwright/test');

test.describe('File Upload Tests', () => { 

  const smallFilePath = path.join(__dirname, 'files', 'small_file.txt');

  const largeFilePath = path.join(__dirname, 'files', 'large_file');

  test.beforeAll(async () => {
    // This creates a small text file with "Hello World" content
    fs.writeFileSync(smallFilePath, 'Hello, this is a test file for upload!');

    // This creates a 100MB file
    // 1024 * 1024 * 100 = 100MB
    const buffer = Buffer.alloc(1024 * 1024 * 100); 
    fs.writeFileSync(largeFilePath, buffer);    
  });

  test.afterAll(async () => {
    // Clean up the file after the tests are done to save disk space
    if (fs.existsSync(largeFilePath)) {
      fs.unlinkSync(largeFilePath);
    }
    if (fs.existsSync(smallFilePath)) {
      fs.unlinkSync(smallFilePath);
    }
  });

// Test Case: TP-8
test('File Upload', async ({ page }) => {
  await page.goto('/');

  // Click on the "File Upload" link to navigate to the file upload page.
  await page.getByRole('link', { name: 'File Upload' }).click();

  // Set the file input to the specified file path.
  await page.setInputFiles('#file-upload', smallFilePath);

  // Click the upload button to submit the file.
  await page.getByRole('button', { name: 'Upload' }).click();

  // Expect the uploaded file name to be visible on the page after successful upload.
  await expect(page.getByText('small_file.txt')).toBeVisible();
});

// Test Case: TP-15
test('No file selected in File Upload', async ({ page }) => {
  await page.goto('/');
  
  // Click on the "File Upload" link to navigate to the file upload page.
  await page.getByRole('link', { name: 'File Upload' }).click();

  // Click the upload button without selecting a file.
  await page.getByRole('button', { name: 'Upload' }).click();

  // Expect an error message to be visible on the page after attempting to upload without selecting a file.
  await expect(page.getByText('You did not select a file to upload.')).toBeVisible();
});

// Test Case: TP-16
test('Large File Upload', async ({ page }) => {
  test.setTimeout(120000); // Set timeout to 2 minutes for file creation
  await page.goto('/');

  // Click on the "File Upload" link to navigate to the file upload page.
  await page.getByRole('link', { name: 'File Upload' }).click({ timeout: 60000 });

  // Set the file input to a large file path.
  await page.setInputFiles('#file-upload', largeFilePath);

  // Click the upload button to submit the file.
  await page.getByRole('button', { name: 'Upload' }).click({ timeout: 60000 });

  // Expect the uploaded file name to be visible on the page after successful upload.
  await expect(page.getByText('large_file')).toBeVisible({ timeout: 60000 });
});

test.describe('File Download Cases', () => {
// Test Case: TP-9
test('File Download', async ({ page, context }) => {
  await page.goto('/');
  
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
});
});