const { defineConfig, devices } = require('@playwright/test')

const port = process.env.PORT || 5000
const baseURL = `http://localhost:${port}`

module.exports = defineConfig({
  testDir: './e2e-tests',
  timeout: 30000,
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL,
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  webServer: {
    command: 'npm run start-prod',
    url: baseURL,
    timeout: 120000,
    reuseExistingServer: !process.env.CI
  }
})
