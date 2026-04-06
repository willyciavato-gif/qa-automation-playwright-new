const {test, expect} = require ('@playwright/test');    
test ('Security test request intercept', async ({page}) => 
    {
        //login and reach page order

        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        await page.locator('#userEmail').fill('willy.ciavato@gmail.com');
        await page.locator('#userPassword').fill('Tiburones91.');
        await page.locator("[value='Login']").click();
        await page.waitForLoadState('networkidle');
        await page.locator(".card-body b").first().waitFor();
        await page.locator("button[routerlink*='myorders']").click();

        await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
            route => route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=69bc09daf86ba51a65148bae'}));
        await page.locator("button:has-text('View')").first().click();
        await expect(page.locator('p').last()).toHaveText('You are not authorize to view this order');
        
    }
);