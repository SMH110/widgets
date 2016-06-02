'use strict';

const Calculator = require('../calculator');
const expect = require('chai').expect;

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