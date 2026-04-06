// @ts-check
import { defineConfig, devices, expect } from "@playwright/test";
import { trace } from "node:console";
import { permission } from "node:process";
import { Browser } from "selenium-webdriver";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */

const config = {
  testDir: "./tests",
  retries: 1,
  workers: 2,
  timeout: 40 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: "html",
  projects: [
    {
      name: "firefox",
      use: {
        browserName: "firefox",
        headless: true,
        screenshot: "off",
        trace: "on",
        ...devices['Nokia Lumia 520']
      },
    },
    {
      name: "chrome",
      use: {
        BrowserName: "chronium",
        headless: false,
        screenshot: "on",
        video: 'retain-on-failure',
        ignoreHttpsErrors: true,
        permission:['geolocation'],
        trace: "on",
        //viewport: { width: 720, height: 720 },
      },
    },
  ],

  /* Configure projects for major browsers */
  /*projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
  // {
  //   name: 'Mobile Chrome',
  //   use: { ...devices['Pixel 5'] },
  // },
  // {
  //   name: 'Mobile Safari',
  //   use: { ...devices['iPhone 12'] },
  // },

  /* Test against branded browsers. */
  // {
  //   name: 'Microsoft Edge',
  //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
  // },
  // {
  //   name: 'Google Chrome',
  //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  // },
  //],/*

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
};

module.exports = config;
