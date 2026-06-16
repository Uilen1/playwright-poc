import { test } from '../fixtures/test-fixtures';
import { users } from '../test-data/users';

test.describe('Authentication', () => {
  test('allows a valid user to sign in', async ({
    loginPage,
    inventoryPage,
  }) => {
    await test.step('Open the login page', async () => {
      await loginPage.open();
      await loginPage.expectLoginPageToBeDisplayed();
    });

    await test.step('Authenticate with valid credentials', async () => {
      await loginPage.login(users.standard);
    });

    await test.step('Verify successful authentication', async () => {
      await inventoryPage.expectPageToBeDisplayed();
    });
  });

  test('shows an error for invalid credentials', async ({
    loginPage,
  }) => {
    await loginPage.open();
    await loginPage.login(users.standard);

    await loginPage.expectErrorMessage(
      'Username and password do not match',
    );
  });
});