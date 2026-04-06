const { test, expect } = require('@playwright/test');
test('Reembolso válido con 1 boleto', async ({ page }) => {

    await page.goto('URL');

    // seleccionar 1 boleto
    await page.fill('#tickets', '1');

    // acción
    await page.click('text=Reservar');

    // validar loading aparece
    await expect(page.locator('.loading')).toBeVisible();

    // validar loading desaparece
    await expect(page.locator('.loading')).not.toBeVisible();

    // validar resultado
    await expect(page.getByText('Elegible para reembolso')).toBeVisible();

});

test('No reembolso con 3 boletos', async ({ page }) => {

    await page.goto('URL');

    await page.fill('#tickets', '3');
    await page.click('text=Reservar');

    await expect(page.locator('.loading')).toBeVisible();
    await expect(page.locator('.loading')).not.toBeVisible();

    await expect(page.getByText('No elegible para reembolso')).toBeVisible();

});