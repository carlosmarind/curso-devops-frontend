import {
  World,
  setWorldConstructor,
  Before,
  BeforeAll,
  After,
  AfterAll,
  ITestCaseHookParameter,
  Status,
} from '@cucumber/cucumber'
import { chromium, Browser, BrowserContext, Page } from '@playwright/test'
import { spawn, ChildProcess } from 'child_process'

// ─── CustomWorld: el objeto "this" disponible en cada step definition ─────────
// Provee acceso a "page" (la pestaña) y "context" (el perfil del navegador).
export class CustomWorld extends World {
  context?: BrowserContext
  page?: Page
}

setWorldConstructor(CustomWorld)

// ─── Variables del ciclo de vida ──────────────────────────────────────────────
let browser: Browser
let serverProcess: ChildProcess

// ─── BeforeAll: se ejecuta UNA vez antes de todos los escenarios ──────────────
BeforeAll(async function () {
  serverProcess = spawn('npx', ['vite'], { detached: true, stdio: 'inherit' })
  console.log(`Servidor Vite iniciado (PID: ${serverProcess.pid})`)
  // Espera a que el servidor esté listo
  await new Promise((resolve) => setTimeout(resolve, 2000))
  browser = await chromium.launch({ headless: true })
})

// ─── Before: se ejecuta antes de CADA escenario ───────────────────────────────
Before(async function (this: CustomWorld) {
  this.context = await browser.newContext({
    acceptDownloads: true,
    recordVideo: { dir: 'tests/reports/videos' },
    viewport: { width: 1200, height: 800 },
  })
  this.page = await this.context.newPage()
})

// ─── After: se ejecuta después de CADA escenario ─────────────────────────────
// Si el escenario falló, adjunta un screenshot al reporte HTML.
After(async function (this: CustomWorld, { result }: ITestCaseHookParameter) {
  if (result?.status !== Status.PASSED) {
    const imagen = await this.page?.screenshot()
    if (imagen) await this.attach(imagen, 'image/png')
  }
  await this.page?.close()
  await this.context?.close()
})

// ─── AfterAll: se ejecuta UNA vez al final de todos los escenarios ────────────
AfterAll(async function () {
  await browser.close()
  if (serverProcess && serverProcess.exitCode === null) {
    process.kill(-serverProcess.pid!)
    console.log('Servidor Vite detenido.')
  }
})
