import { test, expect } from "@playwright/test";
import { BaseTest } from "./basetest";
import { users } from "../fixtures/auth/users";

let basetest: BaseTest;

test.describe("Login User", () => {
  // Before each test, create an instance of BaseTest
  test.beforeEach(async () => {
    basetest = new BaseTest();
    await basetest.setup(); // Set up the browser, page, and page objects

    await basetest.loginPage.navigate();
  });

  // After each test, clean up
  test.afterEach(async () => {
    await basetest.teardown(); // Close the browser
  });

  test("user can login with valid credentials", async () => {
    // Write Valid Credentials then Submit
    await basetest.loginPage.login(
      users.validUser.email,
      users.validUser.password,
    );

    // Verify that "Logged in as username" is visible
    const isLoggedIn = await basetest.homePage.getElementByText(
      " Logged in as Pranav",
    );

    await expect(isLoggedIn).toBeVisible();
  });

  test("user can login with invalid credentials", async () => {
    // Write Invalid Credentials then Submit
    await basetest.loginPage.login(
      users.invalidUser.email,
      users.invalidUser.password,
    );

    // Verify that "Your email or password is incorrect" is visible
    const hasError = await basetest.loginPage.getElementByText(
      "Your email or password is incorrect!",
    );

    await expect(hasError).toBeVisible();
  });
});
