(function (factory) {
  if (typeof define === 'function' && define['amd']) {
    define(['knockout'], factory);
  } else if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
    factory(require('knockout'));
  } else {
    factory(ko);
  }
} (function (ko) {

  function App() {
    let widgets = ko.observableArray();

    function addCalculator() {
      widgets.push({ name: 'calculator' });
    }

    function addToDoList() {
      widgets.push({ name: 'todo-list' });
    }

    function addWeatherApp() {
      widgets.push({ name: 'weather-app' });
    }

    function remove() {
      widgets.remove(this);
    }

    return {
      widgets,
      addCalculator,
      addToDoList,
      addWeatherApp,
      remove
    };
  }

  ko.components.register('calculator', {
    viewModel: { require: 'lib/calculator' },
    template: { require: 'text!lib/calculator.html' }
  });

  ko.components.register('todo-list', {
    viewModel: { require: 'lib/todo-list' },
    template: { require: 'text!lib/todo-list.html' }
  });

  ko.components.register('weather-app', {
    viewModel: { require: 'lib/weatherApp' },
    template: { require: 'text!lib/weather.html' }
  });

  ko.applyBindings(new App());
}));