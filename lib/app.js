(function (factory) {
  if (typeof define === 'function' && define['amd']) {
    define(['knockout', './calculator'], factory);
  } else if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
    factory(require('knockout'), require('./calculator'));
  } else {
    factory(ko, Calculator);
  }
} (function (ko, Calculator) {

  function App() {
    let calculators = ko.observableArray([new Calculator()]);

    function addCalculator() {
      calculators.push(new Calculator());
    }

    function removeCalculator() {
      calculators.remove(this);
    }

    return {
      calculators,
      addCalculator,
      removeCalculator
    };
  }

  ko.applyBindings(new App());
}));