const { test, expect, request } = require('@playwright/test');


// test.beforeAll('Login', async ({ browser }) => {
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     const email = "jewhytest@gmail.com";

//     await page.goto("https://rahulshettyacademy.com/client");
//     const products = page.locator(".card-body");
//     const productName = "ZARA COAT 3";

//     const userName = page.locator("#userEmail");
//     const passWord = page.locator("#userPassword");
//     const logInButton = page.locator("#login");

//     await userName.fill(email);
//     await passWord.fill("$aTA12345678");
//     await logInButton.click();

// });

test('Security Test Request Interecpt', async ({ page }) => {

    const email = "jewhytest@gmail.com";

    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";

    const userName = page.locator("#userEmail");
    const passWord = page.locator("#userPassword");
    const logInButton = page.locator("#login");

    await userName.fill(email);
    await passWord.fill("$aTA12345678");
    await logInButton.click();


    //click Orders Byutton
    await page.waitForLoadState('networkidle');

    await page.locator("button[routerlink*='/dashboard/myorders']").click();
    await page.pause();


    //intercept request calll
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=68213efbfd2af1c99e1b2254' })
    )
    await page.locator("button:has-text('View')").first().click();
    
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
    await page.pause();


});