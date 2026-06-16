import { defineConfig, devices } from '@playwright/test';
import { environment } from './config/environment';

export default defineConfig({
  testDir: './tests',

  // Allows independent test files to execute in parallel.
  fullyParallel: true,

  // Prevents test.only from being committed and executed in CI.
  forbidOnly: Boolean(process.env.CI),

  // Retry only in CI to collect additional failure evidence.
  retries: process.env.CI ? 2 : 0,

  // Start conservatively in CI. Increase after validating stability.
  workers: process.env.CI ? 3 : undefined,

  timeout: 30_000,

  expect: {
    timeout: 5_000,
  },

  reporter: process.env.CI
    ? [
      ['line'],
      [
        'html',
        {
          outputFolder: 'playwright-report',
          open: 'never',
          title: 'Playwright Automation Report',
        },
      ],
    ]
    : [
      ['list'],
      [
        'html',
        {
          outputFolder: 'playwright-report',
          open: 'never',
          title: 'Playwright Automation Report',
        },
      ],
    ],

  use: {
    baseURL: environment.baseUrl,

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    actionTimeout: 10_000,
    navigationTimeout: 30_000,

    ignoreHTTPSErrors: false,
  },

  // Raw execution evidence, such as traces, screenshots and videos.
  outputDir: 'test-results',

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
});