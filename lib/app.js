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

    function addTranslate() {
      widgets.push({ name: 'translate' });
    }
     function addMoneyConverter() {
      widgets.push({ name: 'money-converter' });
    }

    function remove() {
      widgets.remove(this);
    }

    return {
      widgets,
      addCalculator,
      addToDoList,
      addWeatherApp,
      addTranslate,
      addMoneyConverter,
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

  ko.components.register('translate', {
    viewModel: { require: 'lib/translate' },
    template: { require: 'text!lib/translate.html' }
  });

  ko.components.register('money-converter', {
    viewModel: { require: 'lib/money-converter' },
    template: { require: 'text!lib/money-converter.html' }
  });

  ko.applyBindings(new App());
}));