import { test, expect } from '@playwright/test'

test.describe('Dashboard Functional Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')

    await page.locator('#username').fill('admin123')
    await page.locator('#password').fill('admin')

    await page.locator('button:has-text("Login")').click()
  })

  test('should log in, fetch real characters from the API, and display them in the grid', async ({
    page,
  }) => {
    await expect(page).toHaveURL(/\/dashboard/)

    await expect(page.locator('text=WUBBA LUBBA DUB DUB')).toBeVisible()
    await expect(page.locator('text=Traveler: admin123')).toBeVisible()
    await expect(page.locator('text=Rick Sanchez')).toBeVisible()
  })

  test('should clear the session and redirect to login when clicking the exit portal button', async ({
    page,
  }) => {
    await expect(page).toHaveURL(/\/dashboard/)

    await page.locator('button:has-text("Exit Portal")').click()

    await expect(page).toHaveURL(/\/login/)

    await expect(page.locator('text=Welcome Back!')).toBeVisible()
  })
})
