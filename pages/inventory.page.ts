import { expect, type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  private readonly title: Locator;
  private readonly inventoryItems: Locator;
  private readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.title = page.getByText('Products', { exact: true });
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async expectPageToBeDisplayed(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.title).toBeVisible();
  }

  async expectProductsToBeAvailable(): Promise<void> {
    await expect(this.inventoryItems.first()).toBeVisible();

    const productCount = await this.inventoryItems.count();

    expect(
      productCount,
      'At least one product should be available',
    ).toBeGreaterThan(0);
  }

  async addProductToCart(productName: string): Promise<void> {
    const product = this.inventoryItems.filter({
      hasText: productName,
    });

    await expect(product).toHaveCount(1);

    await product.getByRole('button', { name: 'Add to cart' }).click();
  }

  async expectCartQuantity(quantity: number): Promise<void> {
    await expect(this.shoppingCartLink).toHaveText(String(quantity));
  }
}