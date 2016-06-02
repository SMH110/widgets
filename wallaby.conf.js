'use strict';

module.exports = function () {
  return {
    files: [
      // Application code
      { pattern: 'calculator.js', load: false }
    ],
    tests: [
      'spec/**/*spec.js'
    ],
    env: {
      type: 'node'
    },
    testFramework: 'mocha'
  };
};