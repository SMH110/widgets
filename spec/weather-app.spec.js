(function (factory) {
  if (typeof define === 'function' && define['amd']) {
    define(['chai', '../lib/weatherApp'], factory);
  } else if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
    factory(require('chai'), require('../lib/weatherApp'));
  } else {
    factory(chai, sinon, WeatherApp);
  }
} (function (chai, WeatherApp) {
  'use strict';
  const expect = chai.expect;
  describe('WeatherApp', () => {
    let instance;

    beforeEach(() => {
      instance = new WeatherApp();
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