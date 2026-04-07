const {test, expect} = require('@playwright/test');
const { request } = require('node:http');
const { text } = require('node:stream/consumers');
const { promise } = require('selenium-webdriver');


test('@Web Browser context Playwright test', async ({ browser }) =>

{
const context = await browser.newContext();
const page = await context.newPage();
//await page.route('**/*.{jgp, png,jpeg}', route => route.abort());
const userName = page.locator('#username');
const signInBtn = page.locator("#signInBtn");
const cardTitles = page.locator('.card-body a');
await page.on('request',request => console.log(request.url()));
await page.on('response',response => console.log(response.url(), response.status()));
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
//css - xpath
await userName.fill('Willyciavatoacademy');
await page.locator("[type='password']").fill('Learning@830$3mK2');
await signInBtn.click();
console.log(await page.locator("[style*='block']").textContent());
await expect(page.locator("[style*='block']")).toContainText('Incorrect');

await userName.fill("");
await userName.fill('rahulshettyacademy');
await signInBtn.click();
//console.log(await cardTitles.first().textContent());
//console.log(await cardTitles.nth(1).textContent());
const allTitles = await cardTitles.allTextContents();
console.log(allTitles);

});

test('UI Controls', async ({page}) =>
{
    //get tittle - assertions
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signInBtn = page.locator("#signInBtn");
    const documentLink = page.locator("[href*='documents-request']");
    const dropdwon = page.locator('select.form-control');
    await dropdwon.selectOption('consult');
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    console.log(await page.locator('.radiotextsty').last().isChecked());
    await expect(page.locator('.radiotextsty').last()).toBeChecked();
    await page.locator('#terms').click();
    await expect(await page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute('class','blinkingText');
    //assertion
    //await page.pause();
});

test('Chield windows hadl', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),

    ])
    const text = await newPage.locator('.red').textContent();
    const arrayText = text.split('@');
    const domain = arrayText[1].split(' ')[0];
    //console.log(domain);
    await page.locator('#username').fill(domain);
    console.log(await page.locator('#username').inputValue());
});