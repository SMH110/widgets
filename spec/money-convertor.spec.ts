'use strict';

import {expect} from 'chai';
import * as sinon from 'sinon';
import * as zurvan from 'zurvan';
import moneyConverter = require('../lib/money-converter');

describe('moneyConverter component', () => {
  let instance, sandbox, resolveFetch, rejectFetch;

  beforeEach(() => {
    instance = moneyConverter();
    sandbox = sinon.sandbox.create();
    if (typeof window === 'undefined') {
      (global as any).window = global;
    }
    if (window.fetch === undefined) {
      window.fetch = function () { };
    }

    sandbox.stub(window, 'fetch', () => new Promise((resolve, reject) => {
      resolveFetch = resolve;
      rejectFetch = reject;
    }));
    return zurvan.interceptTimers().catch(() => { });
  });

  afterEach(() => {
    sandbox.restore();
    resolveFetch = null;
    rejectFetch = null;
    return zurvan.releaseTimers();
  });

  it('It should start with amount equl to 1', () => {
    expect(instance.amount()).to.be.empty
  });

  it('It should start with displaying any conversion result to the user', () => {
    expect(instance.conversionResult()).to.be.empty;
  });

  it('It should start without selecting any currency as target', () => {
    expect(instance.currencyTarget()).to.be.empty;
  });

  it('It should not display an error to the user', () => {
    expect(instance.errorMessage()).to.be.empty;
  });

  describe('When the user clicks convert button before choosing currency for source or target', () => {
    beforeEach(() => {
      instance.convert();
    });

    it('The convert button should be enabled', () => {
      expect(instance.isBtnConvertEnable()).to.equal(true);
    });

    it('It should alert the user with the Error message', () => {
      expect(instance.errorMessage()).to.equal(`Please choose a target currency then press convert`);
    });

  });

  describe('When the user chooses the target currency then presses the convert button', () => {

    beforeEach(() => {
      let gbp = { currency: 'GBP', display: 'British Pound Sterling' }
      instance.currencyTarget(gbp);
      instance.convert();
    });

    it('It should disable the convert button', () => {
      expect(instance.isBtnConvertEnable()).to.be.false;
    });

    it('It should fetch the conversion result from the API', () => {
      expect(fetch).to.have.been.calledWithExactly("http://apilayer.net/api/live?access_key=a9ba2e4ab354d328d2cbbcf1384930c2&currencies=GBP&source=USD&fromat=1")
    });

    describe('When there was an error making the request', () => {
      beforeEach(() => {
        rejectFetch(new Error('Error making request'));
        return zurvan.waitForEmptyQueue();
      });

      it('It should re-enable the convert button', () => {
        expect(instance.isBtnConvertEnable()).to.be.true;
      });

      it('It should display an error to the user', () => {
        expect(instance.errorMessage()).to.be.equal(`Couldn't get the result. Please check your internet connection.`)
      });

      describe('When the user clicks the convert button again without enters amount ', () => {
        beforeEach(() => {
          instance.convert();
        });

        describe('When the request was successful made', () => {
          let resolveJson, rejectJson;

          beforeEach(() => {
            resolveFetch({
              json: () => new Promise((resolve, reject) => {
                resolveJson = resolve;
                rejectJson = reject;
              })
            });
          });

          it('It should disable the convert button', () => {
            expect(instance.isBtnConvertEnable()).to.equal(false);
          });

          it('It should not display an error to the user', () => {
            expect(instance.errorMessage()).to.be.empty;
          });

          describe('When the API responded with a non JSON body', () => {
            beforeEach(() => {
              rejectJson(new Error('not valid json'));
              return zurvan.waitForEmptyQueue();
            });

            it('It should re-enable the convert button', () => {
              expect(instance.isBtnConvertEnable()).to.equal(true);
            });

            it('It should display an error message to the user', () => {
              expect(instance.errorMessage()).to.equal(`Couldn't get the result. Please check your internet connection.`);
            });

          });

          describe('When the API responded with data', () => {
            let apiResponse, gbp;
            beforeEach(() => {
              apiResponse = {
                quotes: {
                  USDGBP: 1.30585
                }
              };
              gbp = { currency: 'GBP', display: 'British Pound Sterling' };
              resolveJson(apiResponse);
              return zurvan.waitForEmptyQueue();
            });

            it('It should re-enable the convert button', () => {
              expect(instance.isBtnConvertEnable()).to.equal(true);
            });

            it('It should not display an error to the user', () => {
              expect(instance.errorMessage()).to.be.empty;
            });

            it('It should set amount to be equal to 1', () => {
              expect(instance.amount()).to.be.equal("1");
            });

            it('It should display the conversion result to the user', () => {
              expect(instance.conversionResult()).to.be.equal(apiResponse.quotes['USD' + gbp.currency] * 1)
            });

          });
        });
      });
    });

    describe('When the request was successfully made', () => {
      let resolveJson, rejectJson;
      beforeEach(() => {
        resolveFetch({
          json: () => new Promise((resolve, reject) => {
            resolveJson = resolve;
            rejectJson = reject;
          })
        });
      });

      it('It should disable the convert button', () => {
        expect(instance.isBtnConvertEnable()).to.equal(false);
      });

      describe('When the API responded with a non JSON body', () => {
        beforeEach(() => {
          rejectJson(new Error('not valid json'));
          return zurvan.waitForEmptyQueue();
        });

        it('It should re-enable the convert button', () => {
          expect(instance.isBtnConvertEnable()).to.equal(true);
        });

        it('It should display an error message to the user', () => {
          expect(instance.errorMessage()).to.equal(`Couldn't get the result. Please check your internet connection.`);
        });

      });

      describe('When the API responded with data', () => {
        let apiResponse, gbp;
        beforeEach(() => {
          apiResponse = {
            quotes: {
              USDGBP: 1.30585
            }
          };
          gbp = { currency: 'GBP', display: 'British Pound Sterling' };
          resolveJson(apiResponse);
          return zurvan.waitForEmptyQueue();
        });

        it('It should re-enable the convert button', () => {
          expect(instance.isBtnConvertEnable()).to.equal(true);
        });

        it('It should not display an error to the user', () => {
          expect(instance.errorMessage()).to.be.empty;
        });

        it('It should set amount to be equal to 1', () => {
          expect(instance.amount()).to.be.equal("1");
        });

        it('It should display the conversion result to the user', () => {
          expect(instance.conversionResult()).to.be.equal(apiResponse.quotes['USD' + gbp.currency] * 1)
        });

        describe('When the user chooses another currency to convert', () => {
          let apiResponse, cad;
          beforeEach(() => {
            apiResponse = {
              quotes: {
                USDCAD: 3.672597
              }
            };

            cad = { currency: 'CAD', display: 'Canadian Dollar' };
            instance.currencyTarget(cad);

          });

          describe('And presses the convert button', () => {
            beforeEach(() => {
              instance.convert();
            });

            describe(`And the request wasn't successfully made`, () => {
              beforeEach(() => {
                rejectFetch(new Error('Error making request'));
                return zurvan.waitForEmptyQueue();
              });

              it('It should re-enable the convert button', () => {
                expect(instance.isBtnConvertEnable()).to.equal(true);
              });

              it('It should display an error message to the user', () => {
                expect(instance.errorMessage()).to.equal(`Couldn't get the result. Please check your internet connection.`);
              });

              it('It should not display the previous conversion result to the user', () => {
                expect(instance.conversionResult()).to.equal("");
              });
            });
          });
        });
      });
    });
  });

  describe('When the user chooses the target currency and the amount to convert and presses the convert button', () => {
    let gbp;
    beforeEach(() => {
      gbp = { currency: 'GBP', display: 'British Pound Sterling' };
      instance.currencyTarget(gbp);
      instance.amount('3');
      instance.convert();
    });

    describe('When the request was successful made', () => {
      let resolveJson, rejectJson;

      beforeEach(() => {
        resolveFetch({
          json: () => new Promise((resolve, reject) => {
            resolveJson = resolve;
            rejectJson = reject;
          })
        });
      });

      describe('And the request was successfully made and the API responded with JSON body', () => {
        let apiResponse, gbp;
        beforeEach(() => {
          apiResponse = {
            quotes: {
              USDGBP: 1.30585
            }
          };
          gbp = { currency: 'GBP', display: 'British Pound Sterling' };
          resolveJson(apiResponse);
          return zurvan.waitForEmptyQueue();
        });

        it('The amount should be equal to 3', () => {
          expect(instance.amount()).to.be.equal("3");
        });

        it('It should display the conversion result to the user', () => {
          expect(instance.conversionResult()).to.be.equal(apiResponse.quotes['USD' + gbp.currency] * 3)
        });
      });
    });
  });
});
