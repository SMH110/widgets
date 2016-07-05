(function (factory) {
  if (typeof define === 'function' && define['amd']) {
    define(['chai', '../lib/weatherApp'], factory);
  } else if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
    factory(require('chai'), require('../lib/translate'));
  } else {
    factory(chai, Translate);
  }
} (function (chai, Translate) {
  'use strict';
  const expect = chai.expect;
  describe('Translate', () => {
    let instance;

    beforeEach(() => {
      instance = new Translate();
    });

    it('It should start with empty input', () => {
      expect(instance.input()).to.equal("");
    });

    it('The source input should be empty', () => {
      expect(instance.src()).to.equal("");
    });

    it('The target input should be empty', () => {
      expect(instance.target()).to.equal("");
    });

    it('The translation part should be hidden', () => {
      expect(instance.translation()).to.equal("");
    });


  });

}));