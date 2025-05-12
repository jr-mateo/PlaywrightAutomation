//Login UI -> .json

// test browser -> j.son , cart , order, order details , order history


const {test,expect} = require ("@playwright/test");
let webContext

test.beforeAll( async({browser}) =>
{

    const context = await browser.newContext();
    const page = await context.newPage();
    const email = "jewhytest@gmail.com";
 
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
 
    const userName = page.locator("#userEmail");
    const passWord  = page.locator("#userPassword");
    const logInButton = page.locator("#login");
    
    await userName.fill(email);
    await passWord.fill("$aTA12345678");
    await logInButton.click();
 
    //use to  wait a bit  and load state first before going to next step.
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'});
   


}); 
test('LogIn Page', async ({}) =>
{
    console.log(webContext);    

});


