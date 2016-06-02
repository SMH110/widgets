(function (factory) {
  if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory(require('chai'), require('../Calculator'));
  } else {
    factory(chai, Calculator);
  }
} (function (chai, Calculator) {
  'use strict';

  const expect = chai.expect;

  describe('Calculator', () => {
    let instance;

    beforeEach(() => {
      instance = new Calculator();
    });

    it('It should report 0 when created', () => {
      expect(instance.input()).to.equal('0');
    });

    it('It should be able to perform a simple add operation', () => {
      instance.addNumber(3)();
      instance.addPlus();
      instance.addNumber(2)();
      instance.equal();
      expect(instance.input()).to.equal(5);
    });
  });
}));