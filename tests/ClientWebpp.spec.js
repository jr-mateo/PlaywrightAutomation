const {test, expect} = require('@playwright/test');
const { count } = require('console');
const { CONNREFUSED, ADDRGETNETWORKPARAMS } = require('dns');
const { constants } = require('http2');


test('Registration Page', async ({browser}) =>
{
   //async use to run the test synchronize and can use 'await' function 
//PW code
//always add await 
  

   const context = await browser.newContext();
   const page = await context.newPage();
   const email = "jewhytest@gmail.com";


   await page.goto("https://rahulshettyacademy.com/client");

   //registration
   await page.locator("[class*='text-reset']").click();
   await page.locator('#firstName').fill("Jewhy TEST");
   await page.locator('#lastName').fill("MTEST");
   await page.locator('#userEmail').fill(email);
   await page.locator('#userMobile').fill("1234567890");

   //drop down
   const dropdown = page.locator('select.custom-select');
   await dropdown.selectOption("Student");

   //radio button
   await page.locator("[value='Male']").check();

   //Password
   await page.locator("#userPassword").fill("$aTA12345678");
   await page.locator("#confirmPassword").fill("$aTA12345678");

   //18 years old radio
   await page.locator("[type='checkbox']").check();

   //Register Button
   await page.locator("#login").click();


   await page.pause();

});




test.only('LogIn Page', async ({browser}) =>
{
      //async use to run the test synchronize and can use 'await' function 
   //PW code
   //always add await 
     
   
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

   //For loop to search the product name
   const  countProducts = await products.count();
   for (let i = 0; i < countProducts; ++i)
   {
     if  (await products.nth(i).locator("b").textContent() === productName );
     {
         // add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;

     }

   }

   //CHECKING THE CART
   await page.locator("[routerlink*=cart]").click();
   
   //used to wait and check the div li before going to check the h3 as it uses .isvisible that dont have a wait time
   await page.locator("div li").first().waitFor();
   // locate using tag name - sudo class
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();
   

   //checkout the products

   await page.locator("text=Checkout").click();
   await page.locator("[value='4542 9931 9292 2293']").fill("1111 2222 3333 4444");
   await page.locator(".input[type='text']").nth(1).fill("214");
   await page.locator(".input[type='text']").nth(2).fill("Jewhy Matthew");
   await page.locator(".input[name='coupon']").fill("test")

   //country dropdown
   await page.locator(".input[placeholder='Select Country']").pressSequentially("ind"); //use to type in the textbox slowly
  
   const countryDropdown =  page.locator(".ta-results");
   await countryDropdown.waitFor();
   const optionsCount = await countryDropdown.locator("button").count();
   for (let i = 0; i< optionsCount; ++i)
   {
     const  text =  await countryDropdown.locator("button").nth(i).textContent();
      if (text === " India")

      {
         await countryDropdown.locator("button").nth(i).click();
         break;
      }
         

   }
   expect (page.locator(".user__name [type='text']").first()).toHaveText(email);//assertion to check the correct email is displaying
   await page.locator(".action__submit").click(); // Place Order button
   await expect (page.locator(".hero-primary")).toHaveText(" Thankyou for the order. "); //assert  if you got into  order complete page
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
   

   await page.locator("button[routerlink*='myorders']").click(); // click orders button
   await page.locator("tbody").waitFor(); 
   
   const rows = await page.locator("tbody tr");
   for (let i = 0; i <await rows.count(); ++i)
   {   
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId))
      {
         await rows.nth(i).locator("button").first().click();
         break;
      }
      

   }


   //ORDER SUMMARY ASSERTIONS
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect (orderId.includes(orderIdDetails)).toBeTruthy();
   const emailDetails = await page.locator(".address p ").nth(2).textContent();
   expect (emailDetails.includes(email)).toBeTruthy();
   const countryDetails = await page.locator(".address p ").nth(3).textContent();
   expect(countryDetails.includes('India')).toBeTruthy();
   const productNameDetails = await page.locator(".title").textContent();
   expect(productNameDetails.includes(productName)).toBeTruthy();



   
   

   















   // Transaction - Zara Coat 3











   await page.pause();

   
});
