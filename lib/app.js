(function (factory) {
  if (typeof define === 'function' && define['amd']) {
    define(['knockout', './calculator', './todo-list'], factory);
  } else if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
    factory(require('knockout'), require('./calculator'), require('./todo-list'));
  } else {
    factory(ko, Calculator, ToDoList);
  }
} (function (ko, Calculator, ToDoList) {

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
      removeCalculator,
      toDoList: new ToDoList()
    };
  }

  ko.applyBindings(new App());
}));