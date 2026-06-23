import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

function gerarEmailUnico(): string {
  return `teste.e2e.${Date.now()}.${Math.floor(Math.random() * 1000)}@gmail.com`;
}

// Função para gerar um CPF válido dinamicamente
function gerarCpfUnico(): string {
  const random9Digits = () => Math.floor(100000000 + Math.random() * 900000000).toString();
  
  const num = random9Digits();
  let d1 = 0, d2 = 0;

  for (let i = 0; i < 9; i++) d1 += parseInt(num[i]) * (10 - i);
  d1 = 11 - (d1 % 11);
  if (d1 >= 10) d1 = 0;

  const num2 = num + d1;
  for (let i = 0; i < 10; i++) d2 += parseInt(num2[i]) * (11 - i);
  d2 = 11 - (d2 % 11);
  if (d2 >= 10) d2 = 0;

  return num + d1.toString() + d2.toString();
}

test.describe('Cadastro de usuário', () => {
  test('deve cadastrar um novo usuário com sucesso', async ({ page }) => {
    await page.goto('/cadastro');

    await page.getByLabel('Nome completo').fill('Usuário Teste E2E');
    await page.getByLabel('E-mail').fill(gerarEmailUnico());
    await page.getByLabel('CPF').fill(gerarCpfUnico());
    await page.getByLabel('Senha', { exact: true }).fill('@Teste123');
    await page.getByLabel('Confirmar senha').fill('@Teste123');

    await page.getByRole('button', { name: 'Criar conta' }).click();

    // Debug: imprime erro da API se aparecer
    const erroApi = page.locator('.cadastro-erro-api');
    if (await erroApi.isVisible({ timeout: 2000 }).catch(() => false)) {
      console.log('ERRO DA API:', await erroApi.textContent());
    }

    await expect(page.getByText('Cadastro realizado!')).toBeVisible();

    // Após o cadastro, redireciona automaticamente para o login
    await expect(page).toHaveURL('/login', { timeout: 5000 });
  });

  test('deve exibir erro ao cadastrar com e-mail já existente', async ({ page }) => {
    await page.goto('/cadastro');

    // Usa um e-mail que já sabemos existir no banco de testes
    await page.getByLabel('Nome completo').fill('Usuário Duplicado');
    await page.getByLabel('E-mail').fill('teste123@gmail.com');
    await page.getByLabel('CPF').fill(gerarCpfUnico());
    await page.getByLabel('Senha', { exact: true }).fill('@Teste123');
    await page.getByLabel('Confirmar senha').fill('@Teste123');

    await page.getByRole('button', { name: 'Criar conta' }).click();

    // Deve permanecer na página de cadastro com erro da API
    await expect(page).toHaveURL('/cadastro');
    await expect(page.locator('.cadastro-erro-api')).toBeVisible();
  });

  test('deve exibir erros de validação ao submeter formulário vazio', async ({ page }) => {
    await page.goto('/cadastro');

    await page.getByRole('button', { name: 'Criar conta' }).click();

    await expect(page.getByText('Nome é obrigatório.')).toBeVisible();
    await expect(page.getByText('E-mail é obrigatório.')).toBeVisible();
    await expect(page.getByText('CPF é obrigatório.')).toBeVisible();
    await expect(page.getByText('Senha é obrigatória.')).toBeVisible();
  });

  test('deve exibir erro quando as senhas não coincidem', async ({ page }) => {
    await page.goto('/cadastro');

    await page.getByLabel('Nome completo').fill('Usuário Teste');
    await page.getByLabel('E-mail').fill(gerarEmailUnico());
    await page.getByLabel('CPF').fill(gerarCpfUnico());
    await page.getByLabel('Senha', { exact: true }).fill('@Teste123');
    await page.getByLabel('Confirmar senha').fill('@Teste456');

    await page.getByRole('button', { name: 'Criar conta' }).click();

    await expect(page.getByText('As senhas não coincidem.')).toBeVisible();
  });
});