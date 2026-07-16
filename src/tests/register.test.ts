import { test, expect } from "@playwright/test";
import { BaseTest } from "./basetest";

let basetest: BaseTest;
let randomEmail: string;

test.describe("Register User", () => {
  function generateRandomEmail(): string {
    randomEmail = (Math.random() + 1).toString(36).substring(2) + "@gmail.com";
    return randomEmail;
  }

  test.beforeEach(async () => {
    basetest = new BaseTest();
    await basetest.setup(); // Set up the browser, page, and page objects

    randomEmail = generateRandomEmail();
    await basetest.loginPage.navigate();
  });

  // After each test, clean up
  test.afterEach(async () => {
    await basetest.teardown(); // Close the browser
  });

  test("user can register user with valid credentials", async () => {
    //1- Navigate to Login Page
    await basetest.loginPage.navigate();

    //2- verify "New User Signup!" is visible
    await expect(
      basetest.loginPage.getElementByText("New User Signup!"),
    ).toBeVisible();

    //3- Sign up with valid random username and email address
    await basetest.loginPage.signup("Pranav", randomEmail);

    //4- verify "Enter Account Information" is visible
    await expect(
      basetest.signupPage.getElementByText("Enter Account Information"),
    ).toBeVisible();

    //5- Fill All Account Details
    await basetest.signupPage.fillAccountInfoDetails("pranav", "Password123");

    //6- Verify account created text is visible
    await expect(basetest.accountcreatedPage.getAccountCreatedText).toBeVisible(
      {
        timeout: 10000,
      },
    );

    //7- Click on Continue Button
    await basetest.accountcreatedPage.getContinueButton.click();

    //8- Verify that 'Logged in as pranav' in homepage
    await expect(
      basetest.homePage.getElementByText("Logged in as pranav"),
    ).toBeVisible();

    //9- Click on 'Delete Account' from page header using helper
    await basetest.homePage.clickDeleteAccountButton();

    //10- Verify that 'Account Deleted!' Text is Visible
    await expect(
      basetest.accountdeletedPage.getAccountDeletedText,
    ).toBeVisible();
  });
});
