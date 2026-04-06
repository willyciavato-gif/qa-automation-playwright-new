const {test, expect, request} = require('@playwright/test');
const {ApiUtils} = require('../utils/ApiUtils');
const loginPayLoad = {userEmail:"willy.ciavato@gmail.com",userPassword:"Tiburones91."};
const orderPayLoad = {orders:[{country:"Venezuela",productOrderedId:"6960eae1c941646b7a8b3ed3"}]};
const fakePayloadOrders = {data: [], message: 'No orders'};
 
 
let response;
test.beforeAll( async()=>
{
   const apiContext = await request.newContext();
   const apiUtils = new ApiUtils(apiContext,loginPayLoad);
   response =  await apiUtils.createOrder(orderPayLoad);
 
})
 
 
//create order is success
test('@API Place the order', async ({page})=>
{ 
    await page.addInitScript(value => {
 
        window.localStorage.setItem('token',value);
    }, response.token );
    await page.goto("https://rahulshettyacademy.com/client");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => 
        {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadOrders);
                route.fulfill(
                    {
                    response,
                    body,
                    });
        });
    
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    console.log(await page.locator('.mt-4').textContent());
});
 
