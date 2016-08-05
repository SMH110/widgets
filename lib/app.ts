'use strict'

import * as ko from 'knockout';

function App() {
  let widgets = ko.observableArray();

  function addCalculator() {
    widgets.push({ name: 'calculator' });
  }

  function addToDoList() {
    widgets.push({ name: 'todo-list' });
  }

  function addWeather() {
    widgets.push({ name: 'weather' });
  }

  function addTranslate() {
    widgets.push({ name: 'translate' });
  }

  function remove() {
    widgets.remove(this);
  }

  return {
    widgets,
    addCalculator,
    addToDoList,
    addWeather,
    addTranslate,
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

ko.components.register('weather', {
  viewModel: { require: 'lib/weather' },
  template: { require: 'text!lib/weather.html' }
});

ko.components.register('translate', {
  viewModel: { require: 'lib/translate' },
  template: { require: 'text!lib/translate.html' }
});

ko.applyBindings(App());

export = App;