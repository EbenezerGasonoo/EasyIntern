import { preview } from 'vite'
import { chromium } from 'playwright'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))
const frontendRoot = join(__dirname, '..')
const BASE = 'http://127.0.0.1:4173'

/**
 * @param {import('playwright').Page} page
 * @param {{ width: number; height: number; expectBurger: boolean; expectDesktop: boolean }} spec
 */
async function assertNavbarLayout(page, spec) {
  const { width, height, expectBurger, expectDesktop } = spec
  await page.setViewportSize({ width, height })
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('.navbar-burger', { state: 'attached' })
  await delay(120)

  const burgerVisible = await page.locator('.navbar-burger').first().isVisible()
  const desktopVisible = await page.locator('.navbar-desktop').first().isVisible()

  if (burgerVisible !== expectBurger) {
    throw new Error(
      `Viewport ${width}×${height}: expected hamburger visible=${expectBurger}, got ${burgerVisible}`
    )
  }
  if (desktopVisible !== expectDesktop) {
    throw new Error(
      `Viewport ${width}×${height}: expected desktop nav visible=${expectDesktop}, got ${desktopVisible}`
    )
  }
}

const server = await preview({
  root: frontendRoot,
  preview: {
    port: 4173,
    strictPort: true,
    // Windows often binds preview to ::1 only; force IPv4 so page.goto(127.0.0.1) works.
    host: '127.0.0.1',
  },
})

let browser
try {
  browser = await chromium.launch()
  const page = await browser.newPage()

  await assertNavbarLayout(page, {
    width: 390,
    height: 844,
    expectBurger: true,
    expectDesktop: false,
  })

  await assertNavbarLayout(page, {
    width: 768,
    height: 1024,
    expectBurger: true,
    expectDesktop: false,
  })

  await assertNavbarLayout(page, {
    width: 1023,
    height: 800,
    expectBurger: true,
    expectDesktop: false,
  })

  await assertNavbarLayout(page, {
    width: 1024,
    height: 800,
    expectBurger: false,
    expectDesktop: true,
  })

  await assertNavbarLayout(page, {
    width: 1280,
    height: 800,
    expectBurger: false,
    expectDesktop: true,
  })

  console.log('Responsive navbar checks: OK (mobile / tablet / breakpoint 1023–1024 / desktop).')
} finally {
  if (browser) await browser.close()
  await server.close()
}
