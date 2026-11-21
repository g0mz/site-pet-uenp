import { expect, test } from '@playwright/test'

test('página carrega e mostra o bloco do próximo evento', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))

  await page.goto('./site-pet-uenp/')

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByTestId('proximo-evento').first()).toBeVisible()
  expect(errors).toEqual([])
})
