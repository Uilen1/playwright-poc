import {
  test as base,
  expect,
} from '@playwright/test';

import { InventoryPage } from '../pages/inventory.page';
import { LoginPage } from '../pages/login.page';

type ApplicationFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
};

export const test = base.extend<ApplicationFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
});

export { expect };