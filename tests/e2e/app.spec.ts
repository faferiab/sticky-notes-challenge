import { test, expect } from '@playwright/test'

test('page loads and shows the app', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#root')).toBeAttached()
})
