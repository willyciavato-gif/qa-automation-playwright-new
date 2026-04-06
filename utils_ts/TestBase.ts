import { test as baseTest } from '@playwright/test';

interface TestDataForOrder {
  username: string;
  password: string;
  productName: string;
}

export const customTest = baseTest.extend<{
  testDataForOrder: TestDataForOrder;
}>({
  testDataForOrder: async ({}, use) => {
    await use({
      username: 'willy.ciavato@gmail.com',
      password: 'Tiburones91.',
      productName: 'ADIDAS ORIGINAL'
    });
  }
});