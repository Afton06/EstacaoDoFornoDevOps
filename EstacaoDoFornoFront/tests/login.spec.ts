import { test, expect } from '@playwright/test';

const USUARIO_TESTE = {
  email: 'teste123@gmail.com',
  senha: '@Ronald123',
};

test.describe('Login', () => {
  test('deve fazer login com sucesso usando credenciais válidas', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('E-mail').fill(USUARIO_TESTE.email);
    await page.getByLabel('Senha').fill(USUARIO_TESTE.senha);
    await page.getByRole('button', { name: 'Entrar' }).click();

    await expect(page).toHaveURL('/');
    await expect(page.getByRole('button', { name: 'Sair' })).toBeVisible();
  });

  test('deve exibir erro ao tentar logar com credenciais inválidas', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('E-mail').fill('email.invalido@teste.com');
    await page.getByLabel('Senha').fill('senhaErrada123');
    await page.getByRole('button', { name: 'Entrar' }).click();

    await expect(page).toHaveURL('/login');
    await expect(page.getByText('Email ou senha inválidos')).toBeVisible();
  });

  test('deve exibir erros de validação ao submeter campos vazios', async ({ page }) => {
    await page.goto('/login');

    await page.getByRole('button', { name: 'Entrar' }).click();

    await expect(page.getByText('E-mail é obrigatório.')).toBeVisible();
    await expect(page.getByText('Senha é obrigatória.')).toBeVisible();
  });
});