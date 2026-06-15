import { test, expect } from '@playwright/test'

test.describe('sticky notes core interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('create a new note', async ({ page }) => {
    await page.getByRole('button', { name: /create note/i }).click()
    await expect(page.getByRole('button', { name: /sticky note/i })).toBeVisible()
  })

  test('type text in a note', async ({ page }) => {
    await page.getByRole('button', { name: /create note/i }).click()
    const textarea = page.locator('textarea')
    await textarea.fill('Hello World')
    await expect(textarea).toHaveValue('Hello World')
  })

  test('change note color', async ({ page }) => {
    await page.getByRole('button', { name: /create note/i }).click()
    const colorBtn = page.getByRole('button', { name: /blue/i })
    await colorBtn.click()
    const note = page.getByRole('button', { name: /sticky note/i })
    await expect(note).toBeVisible()
  })

  test('delete a note by creating and deleting', async ({ page }) => {
    await page.getByRole('button', { name: /create note/i }).click()
    await expect(page.getByRole('button', { name: /sticky note/i })).toBeVisible()

    const note = page.getByRole('button', { name: /sticky note/i })
    await note.focus()
    await page.keyboard.press('Delete')
    await expect(page.getByRole('button', { name: /sticky note/i })).not.toBeVisible()
  })

  test('persists notes across page reload', async ({ page }) => {
    await page.getByRole('button', { name: /create note/i }).click()
    const textarea = page.locator('textarea')
    await textarea.fill('Persisted content')

    await page.reload()
    await expect(page.getByRole('button', { name: /sticky note/i })).toBeVisible()
    await expect(page.locator('textarea')).toHaveValue('Persisted content')
  })

  test('moves note on drag', async ({ page }) => {
    await page.getByRole('button', { name: /create note/i }).click()
    await page.waitForTimeout(300)

    const note = page.getByRole('button', { name: /sticky note/i })
    const box = await note.boundingBox()
    expect(box).not.toBeNull()

    await page.mouse.move(box!.x + 100, box!.y + 10)
    await page.mouse.down()
    await page.mouse.move(box!.x + 100 + 50, box!.y + 10 + 30)
    await page.mouse.up()

    const newBox = await note.boundingBox()
    if (box && newBox) {
      expect(newBox.x).toBeGreaterThan(box.x)
      expect(newBox.y).toBeGreaterThan(box.y)
    }
  })
})
