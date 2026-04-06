const {test, expect} = require('@playwright/test');

test('Cliente App login', async ({ page }) =>
{
    const email = 'willy.ciavato@gmail.com';
    const productsName = 'ADIDAS ORIGINAL';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder('email@example.com').fill(email);
    await page.getByPlaceholder('enter your passsword').fill('Tiburones91.');
    await page.getByRole("button", {name: 'Login'}).click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    
    await page.locator(".card-body").filter({hasText: 'ADIDAS ORIGINAL'})
    .getByRole("button", {name: ' Add To Cart'}).click();
    
    await page.getByRole("listitem").getByRole("button", {name: 'Cart'}).click();

    await page.locator('div li').first().waitFor();
    await expect(page.getByText('ADIDAS ORIGINAL')).toBeVisible();
    await page.getByRole("button", {name: 'Checkout'}).click();

    await page.getByPlaceholder("Select Country").pressSequentially('ven');
    await page.getByRole("button", {name: ' Venezuela'}).nth(0).click();
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText(' Thankyou for the order. ')).toBeVisible();

});
