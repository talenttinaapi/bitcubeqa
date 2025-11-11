import { test, expect, Page } from "@playwright/test";

test("Calculate factorial of 6", async ({ page }) => {
  await page.goto("https://qainterview.pythonanywhere.com/");
  await page.getByRole("textbox", { name: "Enter an integer" }).click();
  await page.getByRole("textbox", { name: "Enter an integer" }).fill("6");
  await page.getByRole("button", { name: "Calculate!" }).click();
});

test("Calculate factorial of 56", async ({ page }) => {
  await page.goto("https://qainterview.pythonanywhere.com/");
  await page.getByRole("textbox", { name: "Enter an integer" }).click();
  await page.getByRole("textbox", { name: "Enter an integer" }).fill("56");
  await page.locator("span").nth(1).click();
  await page.getByRole("button", { name: "Calculate!" }).click();
});

test("Calculate factorial of 0", async ({ page }) => {
  await page.goto("https://qainterview.pythonanywhere.com/");
  await page.getByRole("textbox", { name: "Enter an integer" }).click();
  await page.getByRole("textbox", { name: "Enter an integer" }).fill("0");
  await page.getByRole("button", { name: "Calculate!" }).click();
});

test("Calculate factorial of 258", async ({ page }) => {
  await page.goto("https://qainterview.pythonanywhere.com/");
  await page.getByRole("textbox", { name: "Enter an integer" }).click();
  await page.getByRole("textbox", { name: "Enter an integer" }).fill("258");
  await page.getByRole("button", { name: "Calculate!" }).click();
});

test("Calculate factorial of big int 344444444446", async ({ page }) => {
  await page.goto("https://qainterview.pythonanywhere.com/");
  await page.getByRole("textbox", { name: "Enter an integer" }).click();
  await page
    .getByRole("textbox", { name: "Enter an integer" })
    .fill("344444444446");
  await page.getByRole("button", { name: "Calculate!" }).click();
});

test("Calculate factorial of negative int -17", async ({
  page,
}: {
  page: Page;
}) => {
  await page.fill("#number", "-17");
  await page.click("#getFactorial");
  const result = page.locator("#resultDiv");
  await page.fill("#number", "-17");
  const [response] = await Promise.all([
    page.waitForResponse(
      (r) => r.url().includes("/factorial") && r.request().method() === "POST"
    ),
    page.click("#getFactorial"),
  ]);
  const status = response.status();
  expect(status).toBe(200);
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

test("Navigation to Terms and Conditions ", async ({
  page,
}) => {
  await page.goto("https://qainterview.pythonanywhere.com/");
  await page.getByRole("link", { name: "Terms and Conditions" }).click();
  await page.waitForLoadState("domcontentloaded");
  const termsText = await page.locator("body").innerText();
  const termsLines = termsText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  await expect(termsLines.length).toBeGreaterThan(1);
});

test("Navigation to Privacy page ", async ({
  page,
}) => {
  await page.goto("https://qainterview.pythonanywhere.com/");
  await page.getByRole("link", { name: "Privacy" }).click();
  await page.waitForLoadState("domcontentloaded");
  const privacyText = await page.locator("body").innerText();
  const privacyLines = privacyText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  await expect(privacyLines.length).toBeGreaterThan(1);
});
