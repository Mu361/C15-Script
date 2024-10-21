// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//     //Prod URL
//     // baseUrl: 'https://app.culture15.com/'
//     // Stage URL
//     baseUrl: 'https://staging.app.culture15.com'
//   },
//   chromeWebSecurity: false,
//   viewportHeight: 800,
//   viewportWidth: 1200,
//   watchForFileChanges: true,

//   reporter: "mochawesome",
//   "reporterOptions": {
//     "reportDir": "cypress/reports",
//     "overwrite": false,
//     "html": true,
//     "json": falsez
//   }


// });

// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//     // Prod URL
//     // baseUrl: 'https://app.culture15.com/'
//     // Stage URL
//     baseUrl: 'https://staging.app.culture15.com'
//   },
//   chromeWebSecurity: false,
//   viewportHeight: 800,
//   viewportWidth: 1200,
//   watchForFileChanges: true,

//   reporter: "mochawesome",
//   reporterOptions: {
//     reportDir: "cypress/reports",
//     overwrite: false,
//     html: true,
//     json: false
//   },
  
//   env: {
//     ORG_NAME: '0 Script 3' // Set your organization name here
//   }
// });



const { defineConfig } = require("cypress");
const faker = require('faker'); // Import Faker

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Generate a random organization name with a "0" prefix
      config.env.ORG_NAME = '0 ' + faker.company.companyName(); // Generates a random company name with "0" prefix
      return config; // Return the updated config
    },
    // Prod URL
    // baseUrl: 'https://app.culture15.com/'
    // Stage URL
    baseUrl: 'https://staging.app.culture15.com'
  },
  chromeWebSecurity: false,
  viewportHeight: 800,
  viewportWidth: 1200,
  watchForFileChanges: true,

  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: false
  }
});