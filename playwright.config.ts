import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './test',
  testMatch: /.*\.e2e-spec\.ts$/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5174',
  },
  webServer: {
    command: 'pnpm run dev:test',
    url: 'http://localhost:5174',
    reuseExistingServer: !process.env.CI,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], locale: 'pt-BR' },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], locale: 'pt-BR' },
    },
    // TODO: playwright doesn't have support fot Ubuntu 24.04
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
})
