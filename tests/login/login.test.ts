import { test as base } from "@playwright/test";
import { expect } from "@playwright/test";
import { HomePage } from "../../pages/home/home.page";
import { LoginPage } from "../../pages/login/login.page";

// Declare the types of fixtures.
type TestFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
};

// Extend the base test type with the fixture types.
const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goToHomePage();
    await use(homePage);
  },
  loginPage: async ({ homePage, isMobile, browserName }, use) => {
    if (isMobile) {
      await homePage.page.goto(`${process.env.BASE_URL!}profile/login`);
    } else if (browserName === "firefox") {
      // Firefox has issues with login https://github.com/microsoft/playwright/issues/18121
      test.skip();
    } else {
      await homePage.loginLink.click();
    }
    const loginPage = new LoginPage(homePage.page);
    await use(loginPage);
  },
});

test.describe.serial("Login Page Test Suite Desctop", () => {
  /**
   * Scenario 1 : Open Login page and login using valid credentials
   * Given User is on Login page
   * When User logs in using valid credentials
   * Then User should be logged in
   */
  test("Open Login page and login using valid credentials", async ({
    loginPage,
    homePage,
  }) => {
    await test.step("Given User is on Login page", async () => {
      await expect(loginPage.loginInput).toBeVisible();
    });
    await test.step("When User logs in using valid credentials", async () => {
      await loginPage.logIn(process.env.EMAIL!, process.env.PASSWORD!);
    });
    await test.step("Then User should be logged in", async () => {
      await expect(homePage.homeCarousel).toBeVisible();
      expect(loginPage.page.url()).toBe(process.env.BASE_URL!);
    });
  });

  /**
   * Scenario 2 : Open Login page and login using invalid credentials
   * Given User is on Login page
   * When User logs in using invalid credentials
   * Then User should not be logged in
   * And Error message should be displayed
   */
  test("Open Login page and login using invalid credentials", async ({
    loginPage,
    homePage,
  }) => {
    const errorMessages =
      "Your login attempt was unsuccessful. Please try again.";
    await test.step("Given User is on Login page", async () => {
      await expect(loginPage.loginInput).toBeVisible();
    });
    await test.step("When User logs in using invalid credentials", async () => {
      await loginPage.logIn("invalid@invalid.com", "invalid");
    });
    await test.step("Then User should not be logged in", async () => {
      await expect(homePage.homeCarousel).not.toBeVisible();
      expect(loginPage.page.url()).toBe(
        `${process.env.BASE_URL!}profile/login`
      );
    });
    await test.step("And Error message should be displayed", async () => {
      await expect(loginPage.page.getByText(errorMessages)).toBeVisible();
    });
  });
});
