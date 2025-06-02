const {test,expect} = require ("@playwright/test");
const { ADDRGETNETWORKPARAMS } = require("dns");


test("More Validations" ,async({page})=>
{

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
//await page.goto("http://google.com");
// await page.goBack();
// await page.goForward();
expect(await page.locator("#displayed-text")).toBeVisible();
await page.locator("#hide-textbox").click();
expect(await page.locator("#displayed-text")).toBeHidden();

//dialog handling/ Java Pop out without elements
page.on("dialog",diaglog=> diaglog.accept ());
await page.locator("#confirmbtn").click();

//hover handling
await  page.locator("#mousehover").hover();

// iframe handling 
const framePage=  page.frameLocator("#courses-iframe");

//iframe  -2 matching element  and but will  just click the visible one 
await framePage.locator("li a[href*='lifetime-access']:visible").click();
const textCheck= await framePage.locator(".text h2").textContent();
console.log(textCheck.split(" ")[1]);
const textCheck2 = await framePage.locator("div h1 ").textContent();
console.log(textCheck2);


});


test("Screenshot and Visual Comparison " ,async({page})=>
{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    expect(await page.locator("#displayed-text")).toBeVisible();
    await page.locator('#displayed-text').screenshot({path: 'partialscreenshot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'});
    expect(await page.locator("#displayed-text")).toBeHidden();



});

test('Visual Comparison',async({page})=>
{

    await page.goto('https://www.google.com');
    expect  (await page.screenshot()).toMatchSnapshot('landingpage.png');
    


});