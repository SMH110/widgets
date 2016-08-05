'use strict';

import {expect} from 'chai';
import * as sinon from 'sinon';
import * as zurvan from 'zurvan';
import Translate = require('../lib/translate');

  describe('Translate component', () => {
    let instance, sandbox, resolveFetch, rejectFetch;

    beforeEach(() => {
      instance = Translate();
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

    it('It should start with empty input ', () => {
      expect(instance.input()).to.be.empty;
    });

    it('It should enable the Translate button', () => {
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

      it('The translate button should be enabled', () => {
        expect(instance.isBtnTranslateEnable()).to.equal(true);
      });

      it('It should alert the user a message', () => {
        expect(instance.errorMessage()).to.equal("Please enter a word then choose source language and target language then click Translate!");
      });

    });

    describe('When the user enters a word and chooses the same language as source and target and then clicks the translate button', () => {
      beforeEach(() => {
        let english = { code: 'EN', display: "English" };
        instance.input("word");
        instance.src(english);
        instance.target(english);
        instance.translate();
      });

      it('It should alert the user with a message', () => {
        expect(instance.errorMessage()).to.equal("You can't choose the same language as source and target");
      });

      it('Translate button should be enabled', () => {
        expect(instance.isBtnTranslateEnable()).to.equal(true);
      });
    });

    describe('When the user enters a word and chooses source language and target language', () => {
      beforeEach(() => {
        let english = { code: 'EN', display: "English" }, french = { code: 'FR', display: "French" };
        instance.input("word");
        instance.src(english);
        instance.target(french);
      });

      describe('And the user clicks the translate button', () => {
        beforeEach(() => {
          instance.translate();
        });

        it('It should disable the translate button ', () => {
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
            expect(instance.errorMessage()).to.be.equal(`Couldn't get translation. Please check your internet connection.`);
          });

          describe('When the user clicks the translate button again', () => {
            beforeEach(() => {
              instance.translate();
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
                  expect(instance.errorMessage()).to.equal(`Couldn't get translation. Please check your internet connection.`);
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
                  expect(instance.translation()).to.equal(data.data.translations[0].translatedText);
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

          it('It should not display an error message to the user', () => {
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
              expect(instance.errorMessage()).to.equal(`Couldn't get translation. Please check your internet connection.`);
            });
          });

          describe('When the API responded with data', () => {
            let apiResponse;

            beforeEach(() => {
              apiResponse = {
                data: {
                  translations: [{ translatedText: 'some word' }]
                }
              };
              resolveJson(apiResponse);
              return zurvan.waitForEmptyQueue();
            });

            it('It should re-enable the translate button', () => {
              expect(instance.isBtnTranslateEnable()).to.equal(true);
            });

            it('It should not display an error message to the user', () => {
              expect(instance.errorMessage()).to.be.empty;
            });

            it('It should display the translation of input word', () => {
              expect(instance.translation()).to.equal(apiResponse.data.translations[0].translatedText);
            });

            describe('When the user enters another word to translate', () => {
              beforeEach(() => {
                let english = { code: 'EN', display: "English" }, french = { code: 'FR', display: "French" };
                instance.input("Another Word");
                instance.src(english);
                instance.target(french);
              });

              describe('And presses the translate button', () => {
                beforeEach(() => {
                  instance.translate();
                });

                describe(`And the request wasn't successfully made`, () => {
                  beforeEach(() => {
                    rejectFetch(new Error('Error making request'));
                    return zurvan.waitForEmptyQueue();
                  });
                  it('It should re-enable the translate button', () => {
                    expect(instance.isBtnTranslateEnable()).to.equal(true);
                  });

                  it('It should  display an error to the user', () => {
                    expect(instance.errorMessage()).to.be.equal(`Couldn't get translation. Please check your internet connection.`);
                  });
                  it('It should not display the previous translation to the user', () => {
                    expect(instance.translation()).to.be.empty;
                  });
                });
              });
            });

            describe('When the user resets the setting to the default and presses the translate button', () => {
              beforeEach(() => {
                instance.input("");
                instance.src(undefined);
                instance.target(undefined);
                instance.translate();
              });

              it('It should display an error message to the user', () => {
                expect(instance.errorMessage()).to.equal("Please enter a word then choose source language and target language then click Translate!");
              });

              it('It should not show the previous translation to the user', () => {
                expect(instance.translation()).to.be.empty;
              });
            });

            describe('When the user enters another word and selects the same language for source and target', () => {
              beforeEach(() => {
                let english = { code: 'EN', display: "English" };
                instance.input("another word");
                instance.src(english);
                instance.target(english);
              });

              describe('And presses the translate button', () => {
                beforeEach(() => {
                  instance.translate();
                });

                it('It should display an error message to the user', () => {
                  expect(instance.errorMessage()).to.equal("You can't choose the same language as source and target");
                });

                it('It should not show the previous translation to the user', () => {
                  expect(instance.translation()).to.be.empty;
                });
              });
            });
          });
        });
      });
    });
  });
