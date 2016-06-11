(function (factory) {
  if (typeof define === 'function' && define['amd']) {
    define(['chai', '../lib/calculator'], factory);
  } else if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
    factory(require('chai'), require('../lib/calculator'));
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

    // This is a good spec (spec is another word for test)
    it('It should report 0 when created', () => {
      expect(instance.input()).to.equal('0');
    });

    it('It should be able to perform a simple add operation', () => {
      instance.addNumber('3');
      instance.addPlus();
      instance.addNumber('2');
      instance.equal();
      expect(instance.input()).to.equal("5");
    });

    it('It should be able to perform a simple subtract operation', () => {
      instance.addNumber('6');
      instance.addMinus();
      instance.addNumber('5');
      instance.equal();
      expect(instance.input()).to.equal("1");
    });

    it('It should be able to perform a simple multiply operation', () => {
      instance.addNumber('3');
      instance.addMultiplication();
      instance.addNumber('5');
      instance.equal();
      expect(instance.input()).to.equal("15");
    });

    it('It should be able to perform a simple divide operation', () => {
      instance.addNumber('6');
      instance.addDivision();
      instance.addNumber('3');
      instance.equal();
      expect(instance.input()).to.equal("2");
    });

    it('It should be able to perform an add operation with more than single digit numbers', () => {
      instance.addNumber('6');
      instance.addNumber('2');
      instance.addPlus();
      instance.addNumber('3');
      instance.addNumber('2');
      instance.equal();
      expect(instance.input()).to.equal("94");
    });

    it('It should display the currently entered number when more than 1 digit is entered', () => {
      instance.addNumber('6');
      instance.addNumber('2');
      expect(instance.input()).to.equal("62");
    });

    it('It should continue to display the first operand after an operation has been pressed and the user has not yet started typing the second operand', () => {
      instance.addNumber('6');
      instance.addNumber('2');
      instance.addPlus();
      expect(instance.input()).to.equal("62");
    });

    it('It should display only the second operand when an operation has been pressed and the user is typing the second operand', () => {
      instance.addNumber('6');
      instance.addNumber('2');
      instance.addPlus();
      instance.addNumber('3');
      instance.addNumber('2');
      expect(instance.input()).to.equal("32");
    });


    it('It should be able to perform an subtract operation with more than single digit numbers', () => {
      instance.addNumber('2');
      instance.addNumber('2');
      instance.addMinus();
      instance.addNumber('1');
      instance.addNumber('2');
      instance.equal();
      expect(instance.input()).to.equal("10");
    });

    it('It should continue to display the first operand after subtract has been pressed and the user has not yet started typing the second operand', () => {
      instance.addNumber('2');
      instance.addNumber('2');
      instance.addMinus();
      expect(instance.input()).to.equal("22");
    });

    it('It should display only the second operand when subtract has been pressed and the user is typing the second operand', () => {
      instance.addNumber('2');
      instance.addNumber('2');
      instance.addMinus();
      instance.addNumber('1');
      instance.addNumber('2');
      expect(instance.input()).to.equal("12");
    });

    it('It should be able to perform an multiply operation with more than single digit numbers', () => {
      instance.addNumber('2');
      instance.addNumber('4');
      instance.addMultiplication();
      instance.addNumber('2');
      instance.addNumber('0');
      instance.equal();
      expect(instance.input()).to.equal("480");
    });

    it('It should continue to display the first operand after multiply operation has been pressed and the user has not yet started typing the second operand', () => {
      instance.addNumber('2');
      instance.addNumber('4');
      instance.addMultiplication();
      expect(instance.input()).to.equal("24");
    });

    it('It should display only the second operand when multiply operation has been pressed and the user is typing the second operand', () => {
      instance.addNumber('2');
      instance.addNumber('4');
      instance.addMultiplication();
      instance.addNumber('2');
      instance.addNumber('0');
      expect(instance.input()).to.equal("20");
    });

    it('It should be able to perform a divide operation with more than single digit numbers', () => {
      instance.addNumber('3');
      instance.addNumber('2');
      instance.addDivision();
      instance.addNumber('1');
      instance.addNumber('6');
      instance.equal();
      expect(instance.input()).to.equal("2");
    });

    it('It should continue to display the first operand after divide operation has been pressed and the user has not yet started typing the second operand', () => {
      instance.addNumber('3');
      instance.addNumber('2');
      instance.addDivision();
      expect(instance.input()).to.equal("32");

    });

    it('It should display only the second operand when divide operation has been pressed and the user is typing the second operand', () => {
      instance.addNumber('3');
      instance.addNumber('2');
      instance.addDivision();
      expect(instance.input()).to.equal("32");
      instance.addNumber('1');
      instance.addNumber('6');

    });

    it('It should be able to clear before equal button has been pressed', () => {
      instance.addNumber('2');
      instance.addNumber('4');
      instance.addMultiplication();
      instance.addNumber('2');
      instance.addNumber('0');
      instance.clear();
      expect(instance.input()).to.equal("0");
    });

    it('It should be able to clear after equal button has been pressed', () => {
      instance.addNumber('2');
      instance.addNumber('4');
      instance.addMultiplication();
      instance.addNumber('2');
      instance.addNumber('0');
      instance.equal();
      instance.clear();
      expect(instance.input()).to.equal("0");
    });

    it('It should start new operation after clicking equal button', () => {
      // First operation
      instance.addNumber('1');
      instance.addNumber('2');
      instance.addPlus();
      instance.addNumber('6');
      instance.equal();

      // Second operation
      instance.addNumber('5');
      instance.addMinus();
      instance.addNumber('2');
      instance.equal()
      expect(instance.input()).to.equal('3');
    });

    it('It should display the result of the old add operation before moving to new operation if there was more than one operation', () => {
      instance.addNumber('8');
      instance.addPlus();
      instance.addNumber('4');
      instance.addPlus();
      expect(instance.input()).to.equal("12");
    });

    it('It should perform the result of the old subtract operation before moving to new operation if there was more than one operation', () => {
      instance.addNumber('8');
      instance.addMinus();
      instance.addNumber('2');
      instance.addMinus();
      expect(instance.input()).to.equal("6");
    });

    it('It should perform the result of the old multiply operation before moving to new operation if there was more than one operation', () => {
      instance.addNumber('6');
      instance.addMultiplication();
      instance.addNumber('2');
      instance.addMultiplication();
      expect(instance.input()).to.equal("12");
    });

    it('It should perform the result of the old divide operation before moving to new operation if there was more than one operation', () => {
      instance.addNumber('9');
      instance.addDivision();
      instance.addNumber('3');
      instance.addDivision();
      expect(instance.input()).to.equal("3");
    });

    it('It should use the last operator pressed when multiple operators have been pressed', () => {
      instance.addNumber('3');
      instance.addPlus();
      instance.addMinus();
      instance.addNumber('1');
      instance.equal();
      expect(instance.input()).to.equal("2");
    });

    it('It should ignore multiple consecutive presses of the subtract operator', () => {
      instance.addNumber('5');
      instance.addMinus();
      instance.addMinus();
      instance.addNumber('2');
      instance.equal();
      expect(instance.input()).to.equal("3");
    });

    it('It should ignore multiple consecutive presses of the add operator', () => {
      instance.addNumber('2');
      instance.addPlus();
      instance.addPlus();
      instance.addNumber('3');
      instance.equal();
      expect(instance.input()).to.equal("5");
    });

    it('It should ignore multiple consecutive presses of the multiply operator', () => {
      instance.addNumber('6');
      instance.addMultiplication();
      instance.addMultiplication();
      instance.addNumber('3');
      instance.equal();
      expect(instance.input()).to.equal("18");
    });

    it('It should ignore multiple consecutive presses of the divide operator', () => {
      instance.addNumber('9');
      instance.addDivision();
      instance.addDivision();
      instance.addNumber('3');
      instance.equal();
      expect(instance.input()).to.equal("3");
    });

    it('It should show "0" when divided by Zero', () => {
      instance.addNumber('5');
      instance.addDivision();
      instance.addNumber('0');
      instance.equal();
      expect(instance.input()).to.equal("0");
    });

    it('It should not add more than one zero if there was just zero on display', () => {
      instance.addNumber('0');
      instance.addNumber('0');
      expect(instance.input()).to.equal("0");
    });



    it('It should not change the display if equal button has been pressed before an operation button', () => {
      instance.addNumber('1');
      instance.addNumber('1');
      instance.equal();
      expect(instance.input()).to.equal("11");
    });


  });
}));