const { defineConfig } = require("cypress");
const { isFileExist } = require('cy-verify-downloads');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  video: false,
  videoCompression: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', { isFileExist })
      allureWriter(on, config);
            return config;
    },
  },
  
});
