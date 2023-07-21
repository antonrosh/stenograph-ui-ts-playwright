import { expect, test } from "@playwright/test";
import { HomePage } from "../../pages/home/home.page";

test.describe("Home Page Test Suite", () => {
  let homePage: HomePage;
  const title = "Home | Stenograph L.L.C.";

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
  });

  /**
   * Scenario 1 : Open Home page and check title
   * Given User is on Home page
   * When User checks the title
   * Then Title should be "Home | Stenograph L.L.C."
   */
  test("Open Home page and check title", async () => {
    await test.step("Given User is on Home page", async () => {
      await homePage.goToHomePage();
    });
    await test.step("When User checks the title", async () => {
      await homePage.page.waitForLoadState();
    });
    await test.step(`Then Title should be ${title}`, async () => {
      expect(await homePage.page.title()).toBe(title);
    });
  });

  /**
   * Scenario 2 : Open Home page and check carousel
   * Given User is on Home page
   * When User checks the carousel
   * Then Carousel should be displayed
   */
  test("Open Home page and check carousel", async () => {
    await test.step("Given User is on Home page", async () => {
      await homePage.goToHomePage();
    });
    await test.step("When User checks the carousel", async () => {
      await homePage.page.waitForLoadState();
    });
    await test.step("Then Carousel should be displayed", async () => {
      await expect(homePage.homeCarousel).toBeVisible();
    });
  });
});
