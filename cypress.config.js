const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // Configure your E2E tests here
    specPattern: "**/*.{cy,spec}.{js,ts}"
  },
})