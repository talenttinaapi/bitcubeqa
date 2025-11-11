import { test, expect, Page } from "@playwright/test";

const APP_URL = "https://qainterview.pythonanywhere.com/";

//function to calculate factorial using input field selector
async function calculateFactorial(page: Page, number: string): Promise<void> {
  await page.getByRole("textbox", { name: "Enter an integer" }).fill(number);
  await page.getByRole("button", { name: "Calculate!" }).click();
}

// This function to calculate factorial using direct selectors (#number, #getFactorial)
async function calculateFactorialDirect(
  page: Page,
  number: string
): Promise<void> {
  await page.fill("#number", number);
  await page.click("#getFactorial");
}

// Helper function to verify result text in result div
async function verifyFactorialResult(
  page: Page,
  expectedText: string
): Promise<void> {
  const result = page.locator("#resultDiv");
  await expect(result).toContainText(expectedText);
}

// This function is to verify substantial content on pages
async function verifyPageContent(
  page: Page,
  minLines: number = 1
): Promise<void> {
  const pageText = await page.locator("body").innerText();
  const lines = pageText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  await expect(lines.length).toBeGreaterThan(minLines);
}

// Here you navigate o the application before each test
test.beforeEach(async ({ page }) => {
  await page.goto(APP_URL);
});

 test("Input field testing for accepting text",async  ({ page }) => {
    const input = page.getByRole("textbox", { name: "Enter an integer" });
    await expect(input).toBeVisible();
    await expect(input).toBeEditable();
    
    await input.fill("742");
    await expect(input).toHaveValue("742");
  });


test("Calculate factorial of 6", async ({ page }) => {
  await calculateFactorial(page, "6");
  await verifyFactorialResult(page, "The factorial of 6 is: 720");
});

test("Calculate factorial of 56", async ({ page }) => {
  await calculateFactorial(page, "56");
  await verifyFactorialResult(page, "The factorial of 56 is:");
});

test("Calculate factorial of 0", async ({ page }) => {
  await calculateFactorial(page, "0");
  await verifyFactorialResult(page, "The factorial of 0 is: 1");
});

test("Calculate factorial of 258", async ({ page }) => {
  await calculateFactorial(page, "258");
  await verifyFactorialResult(page, "The factorial of 258 is:");
});

test("Calculate factorial of negative int -17", async ({
  page,
}: {
  page: Page;
}) => {
  const [response] = await Promise.all([
    page.waitForResponse(
      (r) => r.url().includes("/factorial") && r.request().method() === "POST"
    ),
    calculateFactorialDirect(page, "-17"),
  ]);

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toBeTruthy();
  expect(body.answer).not.toBeUndefined();
});

test("Enter key submits the form ", async ({ page }) => {
  await page.goto("https://qainterview.pythonanywhere.com/");
  await page.fill("#number", "97");
  await page.focus("#number");
  await page.press("#number", "Enter");
  const result = page.locator("#resultDiv");
  await expect(result).toContainText("The factorial of 97 is");
});

test("Navigation to About page", async ({
  page,
}) => {
  await page.goto("https://qainterview.pythonanywhere.com/");
  await page.getByRole("link", { name: "About" }).click();
  await page.waitForLoadState("domcontentloaded");
  const aboutText = await page.locator("body").innerText();
  const aboutLines = aboutText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  await expect(aboutLines.length).toBeGreaterThan(1);
});

test("Navigation to Terms and Conditions", async ({ page }) => {
  await page.getByRole("link", { name: "Terms and Conditions" }).click();
  await page.waitForLoadState("domcontentloaded");
  const termsText = await page.locator("body").innerText();
  const termsLines = termsText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  await expect(termsLines.length).toBeGreaterThan(1);
});

test("Navigation to Privacy page", async ({ page }) => {
  await page.getByRole("link", { name: "Privacy" }).click();
  await page.waitForLoadState("domcontentloaded");
  const privacyText = await page.locator("body").innerText();
  const privacyLines = privacyText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  await expect(privacyLines.length).toBeGreaterThan(1);
});
