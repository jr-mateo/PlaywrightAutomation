const {test, expect} = require('@playwright/test');
const { count } = require('console');
const { CONNREFUSED, ADDRGETNETWORKPARAMS } = require('dns');
const { constants } = require('http2');
const { waitForDebugger } = require('inspector');
const { text, buffer } = require('stream/consumers');


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




test('LogIn Page', async ({browser}) =>
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

   //const userName = page.locator("#userEmail"); - > use this one or below
   const userName= page.getByPlaceholder("email@example.com");
   //const passWord  = page.locator("#userPassword"); - > use this one or below
   const passWord =  page.getByPlaceholder("enter your passsword");
   //const logInButton = page.locator("#login");- > use this one or below
   const logInButton = page.getByRole("Button",{ name: 'login'});
   
   await userName.fill(email);
   await passWord.fill("$aTA12345678");
   await logInButton.click();

   //use to  wait a bit  and load state first before going to next step.
   await page.waitForLoadState('networkidle');

   // search the product name
   await page.locator(".card-body").filter({hasText: (productName)}).getByRole('button',{name: " Add To Cart"}).click();

   //CHECKING THE CART
   //await page.locator("[routerlink*=cart]").click(); - > use this one or below
   await page.getByRole('listitem').getByRole('button',{name: 'Cart'}).click();

   //used to wait and check the div li before going to check the h3 as it uses .isvisible that dont have a wait time
   await page.locator("div li").first().waitFor();
   // locate using Text
   await expect(page.getByText(productName)).toBeVisible();
   


   //checkout the products
   //await page.locator("text=Checkout").click(); - > use this one or below
   await page.getByRole('button',{name: 'Checkout'}).click();
   



   await page.locator("[value='4542 9931 9292 2293']").fill("1111 2222 3333 4444");
   await page.locator(".input[type='text']").nth(1).fill("214");
   await page.locator(".input[type='text']").nth(2).fill("Jewhy Matthew");
   await page.locator(".input[name='coupon']").fill("test"); 
   //await page.getByRole('button',{name: 'Apply Coupon'}).click();

   //country dropdown
   await page.locator(".input[placeholder='Select Country']").pressSequentially("ind"); //use to type in the textbox slowly
   await page.getByRole('button',{name:'India' }).nth(1).click();

 


   expect (page.locator(".user__name [type='text']").first()).toHaveText(email);//assertion to check the correct email is displaying
   //await page.locator(".action__submit").click(); // Place Order button
   await page.getByText("Place Order ").click();
   //await expect (page.locator(".hero-primary")).toHaveText(" Thankyou for the order. "); //assert  if you got into  order complete page
   await expect (page.getByText(" Thankyou for the order. ")).toBeVisible();

   const orderIdRaw = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   const orderId = orderIdRaw.replace(/\|/g, '').trim();
   console.log(orderId);
   

   //await page.locator("button[routerlink*='myorders']").click(); // click orders button
   await page.getByRole('button',{name: '  ORDERS'}).click();
   await page.locator("tbody").waitFor(); 
   
   //await expect  (page.locator("tbody").getByText(orderId)).toBeVisible();
   await page.locator("tr").filter({hasText: (orderId)}).getByRole('button', {name: 'View'}).click();






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
