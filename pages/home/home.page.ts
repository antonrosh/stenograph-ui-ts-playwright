import { Locator, Page, expect } from "@playwright/test";

export class HomePage {
  page: Page;
  // Top Action Bar locators
  readonly customerServiceLink: Locator;
  readonly loginLink: Locator;
  // Search locators
  readonly searchInput: Locator;
  // Body locators
  readonly homeCarousel: Locator;

  constructor(page: Page) {
    this.page = page;
    // Top Action Bar locators
    this.customerServiceLink = page.locator("text=Customer Service");
    this.loginLink = page.locator("text=Login >> nth=0");
    // Search locators
    this.searchInput = page.locator("#searchbox");
    // Body locators
    this.homeCarousel = page.locator("#flexiPage");
  }

  async goToHomePage() {
    await this.page.goto(process.env.BASE_URL!, {
      waitUntil: "domcontentloaded",
    });
  }

  async searchFor(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
    await this.searchInput.press("Enter");
  }
}
