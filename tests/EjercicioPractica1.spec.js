const { test, expect } = require('@playwright/test');

test('Login exitoso', async ({ page }) => {

    const eventName = `Test Event ${Date.now()}`;

    await page.goto('https://eventhub.rahulshettyacademy.com');

    await page.getByPlaceholder('you@email.com').fill('Willy.ciavato@gmail.com');
    await page.getByLabel('Password').fill('Tiburones91.');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByText('Discover & Book')).toBeVisible();

    await page.getByRole('button', { name: 'Admin' }).click();
    const manageEvents = page
    .getByRole('navigation')
    .getByRole('link', { name: 'Manage Events' });

    await expect(manageEvents).toBeVisible();
    await manageEvents.click();

    await expect(page.getByText('+ New Event')).toBeVisible();
    await page.locator('#event-title-input').fill(eventName);
    await page.getByPlaceholder('Describe the event…').fill('Ejercicio de prueba');
    await page.locator('#city').fill('Caracas');
    await page.locator('#venue').fill('Santa Rosa');

   
    await page.getByLabel('Event Date & Time').fill('2028-05-06T10:00');

    await page.getByLabel('Price ($)').fill('100');
    await page.getByLabel('Total Seats').fill('50');

    await page.locator('#add-event-btn').click();
    await expect(page.getByText('Event created!')).toBeVisible();
    console.log(`Created event: "${eventName}"`);
    
    // reservar
    await page.goto('https://eventhub.rahulshettyacademy.com/events');
    
      // Located by data-testid
      const eventCards = page.getByTestId('event-card');
      await expect(eventCards.first()).toBeVisible();
    
      // Scan all visible event cards for the one matching our created title
      const targetCard = eventCards.filter({ hasText: eventName }).first();
      await expect(targetCard).toBeVisible({ timeout: 5000 });
    
      // Capture seat count before booking
      const seatsBeforeBooking = parseInt(await targetCard.getByText('seat').first().innerText());
      console.log(`Seats before booking: ${seatsBeforeBooking}`);
    
      // Located by data-testid inside the matched card
      await targetCard.getByTestId('book-now-btn').click();
    
      // ── Step 4: Fill the booking form ────────────────────────────────────────
    
      // Quantity defaults to 1 — verify via id
      const ticketCount = page.locator('#ticket-count');
      await expect(ticketCount).toHaveText('1');
    
      // Located by label
      await page.getByLabel('Full Name').fill('Test Student');
    
      // Located by id
      await page.locator('#customer-email').fill('test.student@example.com');
    
      // Located by placeholder
      await page.getByPlaceholder('+91 98765 43210').fill('9876543210');
    
      // Located by CSS class
      await page.locator('.confirm-booking-btn').click();

});