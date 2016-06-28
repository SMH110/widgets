'use strict';

module.exports = function () {
  return {
    files: [
      // Application code
      { pattern: 'lib/**/*.js', load: false },
      { pattern: 'spec/mocha-setup.js', load: false }
    ],
    tests: [
      'spec/**/*spec.js'
    ],
    env: {
      type: 'node'
    },
    setup: function () {
      require('./spec/mocha-setup');
    },
    testFramework: 'mocha'
  };
};