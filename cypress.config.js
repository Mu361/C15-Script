const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    //Prod URL
    // baseUrl: 'https://app.culture15.com/'
    // Stage URL
    baseUrl: 'https://staging.app.culture15.com'
  },
  chromeWebSecurity: false,
  viewportHeight: 800,
  viewportWidth: 1200,

  reporter: "mochawesome",
  "reporterOptions": {
    "reportDir": "cypress/reports",
    "overwrite": false,
    "html": true,
    "json": false
  }


});
