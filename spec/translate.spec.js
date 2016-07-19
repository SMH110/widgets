(function (factory) {
  if (typeof define === 'function' && define['amd']) {
    define(['chai', '../lib/translate', 'sinon', 'zurvan'], factory);
  } else if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
    factory(require('chai'), require('../lib/translate'), require('sinon'), require('zurvan'));
  } else {
    factory(chai, Translate, sinon, zurvan);
  }
} (function (chai, Translate, sinon, zurvan) {
  'use strict';
  const expect = chai.expect;
  describe('Translate component', () => {
    let instance, sandbox, resolveFetch, rejectFetch;

    beforeEach(() => {
      instance = new Translate();
      sandbox = sinon.sandbox.create();
      if (typeof window === 'undefined') {
        global.window = global;
      }
      if (window.fetch === undefined) {
        window.fetch = function () { };
      }
      if (window.alert === undefined) {
        window.alert = () => { };
      }
      sandbox.stub(window, 'alert');
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

    it('It should start with empty input ', () => {
      expect(instance.input()).to.be.empty;
    });

    it('It should enable the Tranlste button', () => {
      expect(instance.isBtnTranslateEnable()).to.equal(true);
    });

    it('It should start without selecting any language as source', () => {
      expect(instance.src()).to.be.empty;
    });

    it('It should start without selecting any language as target', () => {
      expect(instance.target()).to.be.empty;
    });

    it('It should not display an error to the user', () => {
      expect(instance.errorMessage()).to.be.empty;
    });

    describe('When the user clicks the translate button before entering a word or choosing a language as source or as target', () => {
      beforeEach(() => {
        instance.translate();
      });

      it('Input should be empty', () => {
        expect(instance.input()).to.be.empty;
      });

      it('Soruce language should be empty', () => {
        expect(instance.src()).to.be.empty;
      });

      it('Trget language should be empty', () => {
        expect(instance.target()).to.be.empty;
      });

      it('It should not display an error to the user', () => {
        expect(instance.errorMessage()).to.be.empty;
      });

      it('It should alret the user the message "Please enter a word then choose source language and target language then click Translate!" ', () => {
        expect(window.alert).to.have.been.calledWithExactly('Please enter a word then choose source language and target language then click Translate!');
      });

    });

    describe('When the user enter a word and chooses the same language as source and target and then clicks translate button', () => {
      beforeEach(() => {
        let english = { code: 'EN', display: "English" };
        instance.input("word");
        instance.src(english);
        instance.target(english);
        instance.translate();
      });

      it('It should alret the user with the message saying "You can not choose the same language as source and target"', () => {
        expect(window.alert).to.have.been.calledWithExactly("You can't choose the same language as source and target");
      });
    });

    describe('When the user enters a word and chooses source language and target language', () => {
      beforeEach(() => {
        let english = { code: 'EN', display: "English" }, french = { code: 'FR', display: "French" };
        instance.input("word");
        instance.src(english);
        instance.target(french);
      });

      describe('And the user clicks translate button', () => {
        beforeEach(() => {
          instance.translate();
        });

        it('It should disable translate button ', () => {
          expect(instance.isBtnTranslateEnable()).to.be.equal(false);
        });

        it('It should fetch the translation from the API, encoding any invalid query string characters', () => {
          expect(fetch).to.have.been.calledWithExactly("https://www.googleapis.com/language/translate/v2?key=AIzaSyBICHvOzCaXjtSLYdC6y5vKnlIptW9dbRY&source=EN&target=FR&q=word");
        });

        describe('When there was an error making the request', () => {
          beforeEach(() => {
            rejectFetch(new Error('Error making request'));
            return zurvan.waitForEmptyQueue();
          });
          it('It should re-enable the translate button', () => {
            expect(instance.isBtnTranslateEnable()).to.equal(true);
          });

          it('It should  display an error to the user', () => {
            expect(instance.errorMessage()).to.be.equal(`Couldn't get weather information. Please check your internet connection.`);
          });

          describe('When the user clicks translate button again', () => {
            beforeEach(() => {
              instance.translate();
            });

            describe('When the request was successfull made', () => {
              let resolveJson, rejectJson;
              beforeEach(() => {
                resolveFetch({
                  json: () => new Promise((resolve, reject) => {
                    resolveJson = resolve;
                    rejectJson = reject;
                  })
                });
              });

              it('It should disable the translate button', () => {
                expect(instance.isBtnTranslateEnable()).to.equal(false);
              });

              it('It should not display an error to the user', () => {
                expect(instance.errorMessage()).to.be.empty;
              });

              describe('When the API responded with a non JSON body', () => {
                beforeEach(() => {
                  rejectJson(new Error('not valid json'));
                  return zurvan.waitForEmptyQueue();
                });

                it('It should re-enable the translate button', () => {
                  expect(instance.isBtnTranslateEnable()).to.equal(true);
                });
                it('It should display an error message to the user', () => {
                  expect(instance.errorMessage()).to.equal(`Couldn't get weather information. Please check your internet connection.`)
                });
              }); 
              describe('When the API responded with data', () => {
                let data;
                beforeEach(() => {
                  data = {
                    data: {
                      translations: [{ translatedText: 'some word' }]
                    }
                  };
                  resolveJson(data);
                  return zurvan.waitForEmptyQueue();
                });

                it('It should re-enable the translate button', () => {
                  expect(instance.isBtnTranslateEnable()).to.equal(true);
                });

                it('It should not display an error message to the user', () => {
                  expect(instance.errorMessage()).to.be.empty;
                });

                it('It should display the translation of input word', () => {
                  expect(instance.translation()).to.equal(data.data.translations[0].translatedText)
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

          it('It should disable the translate button', () => {
            expect(instance.isBtnTranslateEnable()).to.equal(false);
          });

          it('It should not dispaly an error message to the user', () => {
            expect(instance.errorMessage()).to.be.empty;
          });

          describe('When the API respond with a non JSON body', () => {
            beforeEach(() => {
              rejectJson(new Error('not valid json'));
              return zurvan.waitForEmptyQueue();
            });

            it('It should re-enable the translate button', () => {
              expect(instance.isBtnTranslateEnable()).to.equal(true);
            });
            it('It should display an error message to the user', () => {
              expect(instance.errorMessage()).to.equal(`Couldn't get weather information. Please check your internet connection.`)
            });
          });

          describe('When the API responded with data', () => {
            let data;
            beforeEach(() => {
              data = {
                data: {
                  translations: [{ translatedText: 'some word' }]
                }
              };
              resolveJson(data);
              return zurvan.waitForEmptyQueue();
            });

            it('It should re-enable the translate button', () => {
              expect(instance.isBtnTranslateEnable()).to.equal(true);
            });

            it('It should not display an error message to the user', () => {
              expect(instance.errorMessage()).to.be.empty;
            });

            it('It should display the translation of input word', () => {
              expect(instance.translation()).to.equal(data.data.translations[0].translatedText)
            });
          });
        });
      }); 
    });
  });
}));