import { defineConfig, devices } from "@playwright/test";

// A remote target runs the same journey without starting a local server.
const remoteURL = process.env.PLAYWRIGHT_BASE_URL;
const baseURL = remoteURL ??
  new URL(process.env.BASE_PATH ?? "/", "http://127.0.0.1:4173").href;

export default defineConfig({
  testDir: "./tests",
  use: { baseURL, trace: "retain-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: remoteURL ? undefined : {
    command: "npm run build && npm run preview -- --host 127.0.0.1 --port 4173 --strictPort",
    url: baseURL,
    reuseExistingServer: false,
  },
});
