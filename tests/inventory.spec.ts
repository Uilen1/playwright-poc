import { test } from '../fixtures/test-fixtures';
import { users } from '../test-data/users';

test.describe('Inventory', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.open();
    await loginPage.login(users.standard);
    await inventoryPage.expectPageToBeDisplayed();
  });

  test('displays products after authentication', async ({
    inventoryPage,
  }) => {
    await inventoryPage.expectProductsToBeAvailable();
  });

  test('allows the user to add a product to the cart', async ({
    inventoryPage,
  }) => {
    await inventoryPage.addProductToCart(
      'Sauce Labs Backpack',
    );

    await inventoryPage.expectCartQuantity(1);
  });
});