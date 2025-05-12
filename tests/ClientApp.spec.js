const {test, expect} = require('@playwright/test');
const { CONNREFUSED } = require('dns');
const { constants } = require('http2');


test('Browser Context  TEST', async ({browser}) =>
{
   //async use to run the test synchronize and can use 'await' function 
//PW code
//always add await 
  

const context = await browser.newContext();
const page = await context.newPage();
const userEmail = page.locator("#userEmail");
const passWord = page.locator("#userPassword");
const logIn = page.locator("[type=submit]");


await page.goto ("https://rahulshettyacademy.com/client");
await page.title;
await userEmail.fill('jewhy.hk@gmail.com');   
await passWord.fill('Mylene_27');
await logIn.click();
//await page.waitForLoadState('networkidle')
await page.locator(".card-body b").first().waitFor();
//console.log(await cardTitles.first().textContent());
//console.log(await cardTitles.nth(2).textContent());
const titles = await page.locator(".card-body b").allTextContents();
console.log(titles);




});




