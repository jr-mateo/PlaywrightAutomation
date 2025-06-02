const {test,expect, request} = require ("@playwright/test");
const { json } = require("stream/consumers");
const {APIUtils} = require('./utils/APIUtils');
const loginPayLoad = {   "userEmail": "jewhytest@gmail.com", "userPassword": "$aTA12345678" };
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "67a8dde5c0d3e6622a297cc8"}]};
const fakePayloadOrders = {data: [], message:"No Orders" };

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
    
    //by pass the login page using API call
      

    page.addInitScript(value =>{
        window.localStorage.setItem('token', value);

    },response.token)
    await page.goto("https://rahulshettyacademy.com/client");
    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route=>
      {
         //intercepting response : API  response-> {playwright fake response }-> customer
        const response=  page.request.fetch(route.request());
        let body =JSON.stringify(fakePayloadOrders); //converts  to JSON FILE/DATA
        route.fulfill(
         {
            response,
            body,

         });
      }
    )
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click(); // click orders button
   //await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());
    //await page.locator("tbody").waitFor(); 
   
    
 });
    
    
    