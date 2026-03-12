import { test, expect, request } from '@playwright/test';

test.describe('API Responses Testing', () => {
    // Test Case: TP-5
    test('API Calls', async ({ request }) => {  
    // Click on the "200" link to trigger the API call for status code 200.
    var response = await request.get('/status_codes/200');
    // Expect the response of code 200
    expect(response.status()).toBe(200);

    // Click on the "200" link to trigger the API call for status code 200.
    response = await request.get('/status_codes/301');
    // Expect the response of code 301
    expect(response.status()).toBe(301);

    // Click on the "200" link to trigger the API call for status code 200.
    response = await request.get('/status_codes/404');
    // Expect the response of code 404
    expect(response.status()).toBe(404);

    // Click on the "200" link to trigger the API call for status code 500.
    response = await request.get('/status_codes/500');
    // Expect the response of code 500
    expect(response.status()).toBe(500);
    });
});