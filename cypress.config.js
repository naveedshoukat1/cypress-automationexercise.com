const { defineConfig } = require("cypress");
const { isFileExist } = require('cy-verify-downloads');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', { isFileExist })
    },
  },
});
