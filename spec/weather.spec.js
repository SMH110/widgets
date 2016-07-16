(function (factory) {
  if (typeof define === 'function' && define['amd']) {
    define(['chai', '../lib/weather'], factory);
  } else if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
    factory(require('chai'), require('../lib/weather'));
  } else {
    factory(chai, sinon, ToDoList);
  }
} (function (chai, Weather) {
  'use strict';
  const expect = chai.expect;
  describe('Weather', () => {
    let instance;

    beforeEach(() => {
      instance = new Weather();
    });

    it('It should start with empty input', () => {
      expect(instance.city()).to.equal("");
    });

    it('It should disply the city which user has entered', () => {
      instance.city("London");
      // instance.showWeather(); // I don't know how to write test for fetch!
      expect(instance.city()).to.equal("London");
    });
  });

}));