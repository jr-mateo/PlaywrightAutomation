const {test,expect, request} = require ("@playwright/test");
const { json } = require("stream/consumers");
const loginPayLoad = {   "userEmail": "jewhytest@gmail.com", "userPassword": "$aTA12345678" }
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "67a8dde5c0d3e6622a297cc8"}]}
let orderId;
let token;



test.beforeAll(async () =>
{   //Login using API call
   const apiContext = await request.newContext();
   const loginResponse= await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data:loginPayLoad
    })

    expect (loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);

    //Create Order is success
   const orderResponse =  await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data: orderPayload,
        headers:    {
                        'Authorization' : token,
                        'content-type' :'application/json'


                    },
    })
    const orderResponseJsOn = await orderResponse.json();
    console.log(orderResponseJsOn);
    orderId = orderResponseJsOn.orders[0];
    



});


test.beforeEach(() =>
{
    
    
    
});
    


test(' Place an Order', async ({page}) =>
{
    //async use to run the test synchronize and can use 'await' function 
    //PW code
    //always add await 
    //by pass the login page using API call
      

    page.addInitScript(value =>{
        window.localStorage.setItem('token', value);

    },token)
    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator(".card-body b").first().waitFor();
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


    //console.log(await cardTitles.first().textContent());
    //console.log(await cardTitles.nth(2).textContent());
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    

     
    
    
 });
    
    
    