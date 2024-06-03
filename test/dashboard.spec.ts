import { expect, test } from '@playwright/test'

test('display day orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(
    page.getByRole('heading', { name: 'Pedidos (dia)' }),
  ).toBeVisible()
  await expect(page.getByText('20', { exact: true })).toBeVisible()
  await expect(page.getByText('-5% em relação ao dia ontem')).toBeVisible()
})

test('display month orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(
    page.getByRole('heading', { name: 'Pedidos (mês)' }),
  ).toBeVisible()
  await expect(page.getByText('234', { exact: true })).toBeVisible()
  await expect(page.getByText('-5% em relação ao mês passado')).toBeVisible()
})

test('display month canceled orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(
    page.getByRole('heading', { name: 'Cancelamentos (mês)' }),
  ).toBeVisible()
  await expect(page.getByText('5', { exact: true })).toBeVisible()
  await expect(page.getByText('-15% em relação ao mês passado')).toBeVisible()
})

test('display month revenue metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(
    page.getByRole('heading', { name: 'Receita total (mês)' }),
  ).toBeVisible()
  await expect(page.getByText('R$ 20.000,00', { exact: true })).toBeVisible()
  await expect(page.getByText('+10% em relação ao mês passado')).toBeVisible()
})
