const {test,expect} = require ("@playwright/test");
const { AsyncResource } = require("node:async_hooks");

//Feature1 Ticket No wrong 
test("Calendar Validations", async ({page}) =>
{
    const monthNumber = "6";
    const date = "15"
    const year = "2027";
    const expectedList = [monthNumber,date,year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await  page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__tile").nth(Number(monthNumber)-1).click();
    await page.locator("//abbr[text()= "+date+"]").click();

    expect (await  page.locator(".react-date-picker__inputGroup__month")).toHaveValue(monthNumber);
    expect(await page.locator(".react-date-picker__inputGroup__day")).toHaveValue(date);
    expect(await page.locator(".react-date-picker__inputGroup__year")).toHaveValue(year);

    const inputs = await page.locator(".eact-date-picker__inputGroup__input");
    for ( let i = 0; i <inputs.length; i++ )
    {
        const value = inputs[i].getAttribute("value");
        expect(value).toEqual(expectedList[i]);
        


    }    












})