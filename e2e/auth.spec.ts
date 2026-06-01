import { test, expect } from '@playwright/test'

test.describe('Authentication - Full Flow', () => {
  test('should log in with valid credentials and reach the Dashboard', async ({ page }) => {
    await page.goto('/login')

    await expect(page.locator('text=Welcome Back!')).toBeVisible()

    await page.locator('#username').fill('admin123')
    await page.locator('#password').fill('admin')

    await page.locator('button:has-text("Login")').click()

    await expect(page).toHaveURL(/\/dashboard/)

    await expect(page.locator('text=WUBBA LUBBA DUB DUB')).toBeVisible()
    await expect(page.locator('text=Traveler: admin123')).toBeVisible()
  })

  test('should show Zod errors if the fields are too short', async ({ page }) => {
    await page.goto('/login')

    await page.locator('#username').fill('corto')
    await page.locator('#password').fill('123')

    await page.locator('button:has-text("Login")').click()

    await expect(page.locator('text=Minimum 8 characters')).toBeVisible()
    await expect(page.locator('text=Minimum 5 characters')).toBeVisible()
  })

  test('should display an incorrect credentials error', async ({ page }) => {
    await page.goto('/login')

    await page.locator('#username').fill('usuario_valido_largo')
    await page.locator('#password').fill('password_largo')

    await page.locator('button:has-text("Login")').click()

    await expect(page.locator('text=Wrong credentials')).toBeVisible()

    await expect(page).toHaveURL(/\/login/)
  })
})
