import { Locator, Page, expect } from "@playwright/test";

export class HomePage {
  page: Page;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator("#searchbox");
  }

  async goToHomePage() {
    await this.page.goto(process.env.BASE_URL!, {
      waitUntil: "domcontentloaded",
    });
    await expect(this.searchInput).toBeVisible();
  }
}
