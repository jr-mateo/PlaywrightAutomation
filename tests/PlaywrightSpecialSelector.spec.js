const {test, expect} = require('@playwright/test');
const { CONNREFUSED, ADDRGETNETWORKPARAMS } = require('dns');
const { constants } = require('http2');


test('Playwright SpecialSelector', async ({page}) =>
{
   await page.goto("https://rahulshettyacademy.com/angularpractice/");
   await page.getByLabel("Check me out if you Love IceCreams!").check(); //checkbox
   await page.getByLabel("Employed").check();//radio button
   await page.getByLabel("Gender").selectOption("Male"); // for drop down list
   await page.getByPlaceholder("Password").fill("HeyItsMe"); // to fill using the getByPlaceholder
   await page.getByRole("button", {name:'Submit'}).click(); // click using getByRole command 
   await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
   await page.getByRole("link",{name : "Shop"}).click();

   //
   await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
   await page.locator(".nav-link.btn.btn-primary").click();

   
   









   //await page.pause();
});


