const {test,expect, request} = require ("@playwright/test");
const { json } = require("stream/consumers");
const {APIUtils} = require('./utils/APIUtils');
const loginPayLoad = {   "userEmail": "jewhytest@gmail.com", "userPassword": "$aTA12345678" }
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "67a8dde5c0d3e6622a297cc8"}]}


let orderId;
let token;
let response;


test.beforeAll(async () =>
{  
   const apiContext =await request.newContext();
   const apiUtils = new APIUtils(apiContext,loginPayLoad);
   response = await  apiUtils.createOrder(orderPayload);


});


    


test(' Place an Order', async ({page}) =>
{
    //async use to run the test synchronize and can use 'await' function 
    //PW code
    //always add await 
    //by pass the login page using API call
      

    page.addInitScript(value =>{
        window.localStorage.setItem('token', value);

    },response.token)
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click(); // click orders button
    await page.locator("tbody").waitFor(); 
   
   const rows = await page.locator("tbody tr");
   for (let i = 0; i <await rows.count(); ++i)
   {   
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (response.orderId.includes(rowOrderId))
      {
         await rows.nth(i).locator("button").first().click();
         break;
      }
      

   }


    //console.log(await cardTitles.first().textContent());
    //console.log(await cardTitles.nth(2).textContent());
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect (response.orderId.includes(orderIdDetails)).toBeTruthy();
    console.log("OrderID: " + orderIdDetails);
    

     
    
    
 });
    
    
    