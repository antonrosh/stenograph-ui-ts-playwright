import { Locator, Page } from "@playwright/test";

export class LoginPage {
  page: Page;
  readonly loginInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginInput = page.locator("#UserName");
    this.passwordInput = page.locator("#Password");
    this.loginButton = page.locator("[type='submit']");
  }

  async logIn(username: string, password: string) {
    await this.loginInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
