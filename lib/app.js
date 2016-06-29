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
    let calculators = ko.observableArray();


    function addCalculator() {
      calculators.push({});
    }

    function removeCalculator() {
      calculators.remove(this);
    }

    let toDoLists = ko.observableArray();

    function addToDoList() {
      toDoLists.push({});
    }

    function removeToDoList() {
      toDoLists.remove(this);
    }


    return {
      calculators,
      addCalculator,
      removeCalculator,
      toDoLists,
      addToDoList,
      removeToDoList
    };
  }

  ko.components.register('calculator', {
    viewModel: { require: 'lib/calculator' },
    template: { require: 'text!lib/calculator.html' }
  });
  ko.components.register('toDoList', {
    viewModel: { require: 'lib/todo-list' },
    template: { require: 'text!lib/toDoList.html' }
  });

  ko.applyBindings(new App());
}));