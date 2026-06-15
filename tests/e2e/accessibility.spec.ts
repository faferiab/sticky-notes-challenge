import { test, expect } from '@playwright/test'

test.describe('accessibility workflows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('page has proper landmarks', async ({ page }) => {
    await expect(page.getByRole('main', { name: /sticky notes/i })).toBeAttached()
  })

  test('toolbar has accessible label', async ({ page }) => {
    await expect(page.getByRole('toolbar', { name: /note toolbar/i })).toBeAttached()
  })

  test('notes canvas has region label', async ({ page }) => {
    await expect(page.getByRole('region', { name: /notes canvas/i })).toBeAttached()
  })

  test('trash zone has accessible label', async ({ page }) => {
    await expect(page.getByRole('region', { name: /trash zone/i })).toBeAttached()
  })

  test('create note with keyboard shortcut', async ({ page }) => {
    await page.keyboard.press('n')
    await expect(page.getByRole('button', { name: /sticky note/i })).toBeVisible()
  })

  test('delete note with keyboard', async ({ page }) => {
    await page.keyboard.press('n')
    await expect(page.getByRole('button', { name: /sticky note/i })).toBeVisible()

    await page.keyboard.press('Delete')
    await expect(page.getByRole('button', { name: /sticky note/i })).not.toBeVisible()
  })

  test('navigate between notes with Tab', async ({ page }) => {
    await page.keyboard.press('n')
    await page.keyboard.press('n')
    await page.keyboard.press('n')

    const notes = page.getByRole('button', { name: /sticky note/i })
    await expect(notes).toHaveCount(3)

    await notes.first().focus()

    const focusedBefore = page.locator(':focus')
    await focusedBefore.evaluate((el) => el.getAttribute('id'))

    await page.keyboard.press('Tab')
    await page.waitForTimeout(100)

    const focusedAfter = page.locator(':focus')
    await expect(focusedAfter).not.toHaveId('')
  })

  test('color picker has radio group role', async ({ page }) => {
    await expect(page.getByRole('radiogroup', { name: /note color/i })).toBeAttached()
  })

  test('each color swatch has accessible name', async ({ page }) => {
    await expect(page.getByRole('button', { name: /yellow/i })).toBeAttached()
    await expect(page.getByRole('button', { name: /green/i })).toBeAttached()
    await expect(page.getByRole('button', { name: /blue/i })).toBeAttached()
    await expect(page.getByRole('button', { name: /pink/i })).toBeAttached()
    await expect(page.getByRole('button', { name: /orange/i })).toBeAttached()
  })
})
