const {test, expect} = require('@playwright/test');
const { CONNREFUSED } = require('dns');
const { constants } = require('http2');
const { text } = require('stream/consumers');


test('Browser Context  TEST', async ({browser}) =>
{
   //async use to run the test synchronize and can use 'await' function 
//PW code
//always add await 
    
    const context = await browser.newContext();
    const page = await context.newPage();
    const  userName = page.locator('#username');
    const passWord = page.locator("[type='password']");
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator (".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title)
    //css 
    // TYPE is obsolete  use FILL instead
    await userName.fill('learning')
    await passWord.fill('learning')
    await signIn.click();
    console.log (await page.locator("[style*='block']").textContent());
    await expect (page.locator("[style*='block']")).toContainText('Incorrect');
    //  TYPE and FILL method 
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    console.log (await cardTitles.first().textContent());
    console.log (await cardTitles.nth(1).textContent());
    console.log (await cardTitles.allTextContents());


});

test('UI TEST', async ({page}) =>
{
      
      
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const  userName = page.locator('#username');
        const passWord = page.locator("[type='password']");
        const signIn = page.locator('#signInBtn');
        const documentLink = page.locator("[href*='documents-request']");
        //DROPDOWN        
        const dropdown= page.locator("select.form-control");
        await dropdown.selectOption("consult");
        
        //RADIO BUTTON
        await page.locator(".radiotextsty").last().click();
        await page.locator("#okayBtn").click();
        //ASSERTION
        console.log (await page.locator(".radiotextsty").last().isChecked());
        await expect(page.locator(".radiotextsty").last()).toBeChecked();
        //check box
        await page.locator("#terms").check();
        //ASSERTION
        await expect(page.locator("#terms")).toBeChecked();
        await page.locator("#terms").uncheck();
        expect (await page.locator("#terms").isChecked()).toBeFalsy();
        //blinking TEXT'
        await expect(documentLink).toHaveAttribute("class","blinkingText");
        await page.pause();


        
}); 

//new window
test('Child Windows Handle', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const  userName = page.locator('#username');
    const documentLink = page.locator("[href*='documents-request']");
    
    const [newPage] = await Promise.all([
    context.waitForEvent('page'),// listen for any new page- 3stages: pending,rejected,fulfilled
    documentLink.click(),//new page opened.
    ])
    
    // to Get the Red TEXT on the  new page
    const text = await newPage.locator(".red").textContent();
    console.log(text);

    //to get the  specific text (domain) in the red text 
    const arrayText = text.split("@");
    const domain = arrayText [1].split(" ")[0]
    console.log(domain);
    //Go back to main page
    await page.locator('#username').type(domain);
    await page.pause();

}); 

