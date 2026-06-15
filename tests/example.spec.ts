import { test, expect, Locator } from '@playwright/test';

test('fluxo de login', async ({ page }) => {
  // acessar a página
  await page.goto('http://localhost:3000/');

  await expect(page.getByRole('heading', { name: 'Aprenda com quem ' })).toBeVisible();

  // menu de login no canto superior direito
  await page.locator('//*[@id="root"]/div/header/div/nav/a[4]').click();

  await expect(page.getByRole('heading', { name: 'Entre para agendar ou vender aulas' })).toBeVisible();

  // test.setTimeout(2000);
  test.slow();
  let emailInput: Locator = page.getByLabel('E-mail');
  // await emailInput.click({ force: true });
  await emailInput.fill('aaaa@gmail.com');

  let pwdInput: Locator = page.getByLabel('Senha');
  // await pwdInput.click({ force: true });
  await pwdInput.fill('12123123123123');

  await page.locator('//*[@id="root"]/div/main/form/button').click();

  await expect(page.getByText('A senha deve seguir a política de segurança.')).toBeVisible();
});

test('get started link', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
