(function (factory) {
  if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory(require('chai'), require('../lib/Calculator'));
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
      instance.addNumber(3);
      instance.addPlus();
      instance.addNumber(2);
      instance.equal();
      expect(instance.input()).to.equal(5);
    });

    it('It should be able to perform a simple subtract operation', () => {
      instance.addNumber(6);
      instance.addMinus();
      instance.addNumber(5);
      instance.equal();
      expect(instance.input()).to.equal(1);
    });

    it('It should be able to perform a simple multiply operation', () => {
      instance.addNumber(3);
      instance.addMultiplication();
      instance.addNumber(5);
      instance.equal();
      expect(instance.input()).to.equal(15);
    });

    it('It should be able to perform a simple divide operation', () => {
      instance.addNumber(6);
      instance.addDivision();
      instance.addNumber(3);
      instance.equal();
      expect(instance.input()).to.equal(2);
    });

    it('It should be able to perform an add operation', () => {
      instance.addNumber(6);
      expect(instance.input()).to.equal("6");
      instance.addNumber(2);
      expect(instance.input()).to.equal("62");
      instance.addPlus();
      expect(instance.input()).to.equal("62");
      instance.addNumber(3);
      expect(instance.input()).to.equal("3");
      instance.addNumber(2);
      expect(instance.input()).to.equal("32");
      instance.equal();
      expect(instance.input()).to.equal(94);
    });
// can i do something? yep
// done 
    it('It should be able to perform a subtract operation', () => {
      instance.addNumber(1);
      expect(instance.input()).to.equal("1");
      instance.addNumber(4);
      expect(instance.input()).to.equal("14");
      instance.addMinus();
      expect(instance.input()).to.equal("14");
      instance.addNumber(1);
      expect(instance.input()).to.equal("1");
      instance.addNumber(0);
      expect(instance.input()).to.equal("10");
      instance.equal();
      expect(instance.input()).to.equal(4);
    });

    it('It should be able to perform a subtract operation', () => {
      instance.addNumber(1);
      expect(instance.input()).to.equal("1");
      instance.addNumber(4);
      expect(instance.input()).to.equal("14");
      instance.addMinus();
      expect(instance.input()).to.equal("14");
      instance.addNumber(1);
      expect(instance.input()).to.equal("1");
      instance.addNumber(0);
      expect(instance.input()).to.equal("10");
      instance.equal();
      expect(instance.input()).to.equal(4);
    });

    it('It should be able to perform a multiply operation', () => {
      instance.addNumber(2);
      expect(instance.input()).to.equal("2");
      instance.addNumber(4);
      expect(instance.input()).to.equal("24");
      instance.addMultiplication();
      expect(instance.input()).to.equal("24");
      instance.addNumber(2);
      expect(instance.input()).to.equal("2");
      instance.addNumber(0);
      expect(instance.input()).to.equal("20");
      instance.equal();
      expect(instance.input()).to.equal(480);
    });

    it('It should be able to perform a divide operation', () => {
      instance.addNumber(3);
      expect(instance.input()).to.equal("3");
      instance.addNumber(2);
      expect(instance.input()).to.equal("32");
      instance.addDivision();
      expect(instance.input()).to.equal("32");
      instance.addNumber(1);
      expect(instance.input()).to.equal("1");
      instance.addNumber(6);
      expect(instance.input()).to.equal("16");
      instance.equal();
      expect(instance.input()).to.equal(2);
    });

    it('It should be able to clear', () => {
      instance.addNumber(2);
      instance.addNumber(4);
      instance.addMultiplication();
      instance.addNumber(2);
      instance.addNumber(0);
      instance.equal();
      expect(instance.input()).to.equal(480);
      instance.clear();
      expect(instance.input()).to.equal("0");
    });

    it('It should start new operation after clicking equal button', () => {
      instance.addNumber(1);
      instance.addNumber(2);
      instance.addPlus();
      instance.addNumber(6);
      instance.equal();
      expect(instance.input()).to.equal(18);
      instance.addNumber(6);
      expect(instance.input()).to.equal('6');
      instance.addMinus();
      instance.addNumber(2);
      instance.equal();
      expect(instance.input()).to.equal(4);
    });

    it('It should perform the result of the old operation before moving to new operation if there was more than one operation', () => {
      instance.addNumber(8);
      instance.addPlus();
      instance.addNumber(4);
      instance.addPlus();
      expect(instance.input()).to.equal(12);

      instance.clear();

      instance.addNumber(6);
      instance.addMinus();
      instance.addNumber(3);
      instance.addMinus();
      expect(instance.input()).to.equal(3);

      instance.clear();

      instance.addNumber(2);
      instance.addMultiplication();
      instance.addNumber(6);
      instance.addMultiplication();
      expect(instance.input()).to.equal(12);
      instance.addNumber(2);
      instance.equal();
      expect(instance.input()).to.equal(24);

      instance.clear();

      instance.addNumber(1);
      instance.addNumber(6);
      instance.addDivision();
      instance.addNumber(2);
      instance.addDivision();
      expect(instance.input()).to.equal(8);
      instance.addNumber(2);
      instance.equal();
      expect(instance.input()).to.equal(4);
      
      instance.clear();

      instance.addNumber(1);
      instance.addPlus();
      instance.addNumber(2);
      instance.addMinus();
      instance.addNumber(1);
      instance.equal();
      expect(instance.input()).to.equal(2);

      instance.clear();

      instance.addNumber(2);
      instance.addMultiplication();
      instance.addNumber(5);
      instance.addPlus();
      expect(instance.input()).to.equal(10);
      instance.addNumber(2);
      expect(instance.input()).to.equal("2");
      instance.addMinus();
      expect(instance.input()).to.equal(12);
      instance.addNumber(3);
      expect(instance.input()).to.equal("3");
      instance.addMultiplication();
      expect(instance.input()).to.equal(9);
      instance.addNumber(3);
      instance.addMinus();
      expect(instance.input()).to.equal(27);
      instance.addNumber(1);
      instance.addDivision();
      expect(instance.input()).to.equal(26);
      instance.addNumber(2);
      instance.equal();
      expect(instance.input()).to.equal(13);

    });

    it('It should perform the last operation', () => {
      instance.addNumber(3);
      instance.addPlus();
      instance.addMinus();
      instance.addNumber(1);
      instance.equal();
      expect(instance.input()).to.equal(2);
    });

    it('It should show correct result even if user pressed an operation button twice', () => {
      instance.addNumber(5);
      instance.addMinus();
      instance.addMinus();
      instance.addNumber(2);
      instance.equal();
      expect(instance.input()).to.equal(3);

      instance.clear();

      instance.addNumber(2);
      instance.addPlus();
      instance.addPlus();
      instance.addNumber(3);
      instance.equal();
      expect(instance.input()).to.equal(5);

      instance.clear();

      instance.addNumber(6);
      instance.addMultiplication();
      instance.addMultiplication();
      instance.addNumber(3);
      instance.equal();
      expect(instance.input()).to.equal(18);

      instance.clear();

      instance.addNumber(9);
      instance.addDivision();
      instance.addDivision();
      instance.addNumber(3);
      instance.equal();
      expect(instance.input()).to.equal(3);
    });

    it('It should show "0" when divided by Zero', () => {
      instance.addNumber(5);
      instance.addDivision();
      instance.addNumber(0);
      instance.equal();
      expect(instance.input()).to.equal("0");
    });

    it('It should not add more than one zero if there was just zero on display', () => {
      instance.addNumber(0);
      instance.addNumber(0);
      expect(instance.input()).to.equal("0");
    });

     it('Clicking zero after an operation should has the same effect of pressing clear button', () => {
      instance.addNumber(1);
      instance.addPlus();
      instance.addNumber(1);
      instance.equal();
      instance.addNumber(0);
      instance.equal();
      instance.addNumber(0);
      expect(instance.input()).to.equal("0");
    });
  });
}));