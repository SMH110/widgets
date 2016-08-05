'use strict';

import {expect} from 'chai';
import * as sinon from 'sinon';
import * as zurvan from 'zurvan';
import Weather = require('../lib/weather');

  describe('Weather component', () => {
    let instance, sandbox, resolveFetch, rejectFetch;

    beforeEach(() => {
      instance = Weather();
      sandbox = sinon.sandbox.create();
      if (typeof window === 'undefined') {
        (global as any).window = global;
      }
      if (window.fetch === undefined) {
        window.fetch = function () { } as any;
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

    it('It should start with empty input', () => {
      expect(instance.searchText()).to.equal("");
    });

    it('It should enable the Get Weather Button', () => {
      expect(instance.isBtnGetWeatherEnable()).to.equal(true);
    });

    it('It should not display an error message to the user', () => {
      expect(instance.errorMessage()).to.be.empty;
    });

    describe('When the user enters a city name', () => {
      beforeEach(() => {
        instance.searchText('Test City&Name');
      });

      describe('And the user clicks Get Weather', () => {
        beforeEach(() => {
          instance.getWeather();
        });

        it('It should disable the Get Weather button', () => {
          expect(instance.isBtnGetWeatherEnable()).to.equal(false);
        });

        it('It should fetch the weather from the API, encoding any invalid query string characters', () => {
          expect(fetch).to.have.been.calledWithExactly(`http://api.openweathermap.org/data/2.5/weather?q=Test%20City%26Name&units=metric&appid=bd959553bce6759da749a8bcad48f038`);
        });

        it('It should not display an error message to the user', () => {
          expect(instance.errorMessage()).to.be.empty;
        });

        describe('When there was an error making the request', () => {
          beforeEach(() => {
            rejectFetch(new Error('Error making request'));
            return zurvan.waitForEmptyQueue();
          });

          it('It should re-enable the Get Weather button', () => {
            expect(instance.isBtnGetWeatherEnable()).to.equal(true);
          });

          it('It should display an error message to the user', () => {
            expect(instance.errorMessage()).to.equal(`Couldn't get weather information. Please check your internet connection.`);
          });

          describe('When the user clicks Get Weather again', () => {
            beforeEach(() => {
              instance.getWeather();
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

              it('It should disable the Get Weather button', () => {
                expect(instance.isBtnGetWeatherEnable()).to.equal(false);
              });

              it('It should not display an error message to the user', () => {
                expect(instance.errorMessage()).to.be.empty;
              });

              describe('When the API responded with a non JSON body', () => {
                beforeEach(() => {
                  rejectJson(new Error('Not valid json'));
                  return zurvan.waitForEmptyQueue();
                });

                it('It should re-enable the Get Weather button', () => {
                  expect(instance.isBtnGetWeatherEnable()).to.equal(true);
                });

                it('It should display an error message to the user', () => {
                  expect(instance.errorMessage()).to.equal(`Couldn't get weather information. Please check your internet connection.`);
                });
              });

              describe('When the API responded with an error', () => {
                let errorMessage;

                beforeEach(() => {
                  errorMessage = 'Error: not found city';
                  resolveJson({ message: errorMessage });
                  return zurvan.waitForEmptyQueue();
                });

                it('It should re-enable the Get Weather button', () => {
                  expect(instance.isBtnGetWeatherEnable()).to.equal(true);
                });

                it('It should display an error message to the user', () => {
                  expect(instance.errorMessage()).to.equal(errorMessage + ' ' + instance.searchText());
                });

                it('It should not display any results', () => {
                  expect(instance.jsonCityName()).to.be.empty;
                });
              });

              describe('When the API responded with data', () => {
                let data;

                beforeEach(() => {
                  data = {
                    name: 'Some City',
                    sys: {
                      country: 'Some Country'
                    },
                    main: {
                      temp_max: 23.5873,
                      temp_min: 13.2211
                    }
                  };
                  resolveJson(data);
                  return zurvan.waitForEmptyQueue();
                });

                it('It should re-enable the Get Weather button', () => {
                  expect(instance.isBtnGetWeatherEnable()).to.equal(true);
                });

                it('It should not display an error message to the user', () => {
                  expect(instance.errorMessage()).to.be.empty;
                });

                it('It should display the city and country that were found', () => {
                  expect(instance.jsonCityName()).to.equal(`${data.name} / ${data.sys.country}`);
                });

                it('It should display the minimum temperature', () => {
                  expect(instance.minTemp()).to.equal(data.main.temp_min);
                });

                it('It should display the maximum temperature', () => {
                  expect(instance.maxTemp()).to.equal(data.main.temp_max);
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

          it('It should disable the Get Weather button', () => {
            expect(instance.isBtnGetWeatherEnable()).to.equal(false);
          });

          it('It should not display an error message to the user', () => {
            expect(instance.errorMessage()).to.be.empty;
          });

          describe('When the API responded with a non JSON body', () => {
            beforeEach(() => {
              rejectJson(new Error('Not valid json'));
              return zurvan.waitForEmptyQueue();
            });

            it('It should re-enable the Get Weather button', () => {
              expect(instance.isBtnGetWeatherEnable()).to.equal(true);
            });

            it('It should display an error message to the user', () => {
              expect(instance.errorMessage()).to.equal(`Couldn't get weather information. Please check your internet connection.`);
            });
          });

          describe('When the API responded with an error', () => {
            let errorMessage;

            beforeEach(() => {
              errorMessage = 'Error: not found city';
              resolveJson({ message: errorMessage });
              return zurvan.waitForEmptyQueue();
            });

            it('It should re-enable the Get Weather button', () => {
              expect(instance.isBtnGetWeatherEnable()).to.equal(true);
            });

            it('It should display an error message to the user', () => {
              expect(instance.errorMessage()).to.equal(errorMessage + ' ' + instance.searchText());
            });

            it('It should not display any results', () => {
              expect(instance.jsonCityName()).to.be.empty;
            });
          });

          describe('When the API responded with data', () => {
            let data;

            beforeEach(() => {
              data = {
                name: 'Some City',
                sys: {
                  country: 'Some Country'
                },
                main: {
                  temp_max: 23.5873,
                  temp_min: 13.2211
                }
              };
              resolveJson(data);
              return zurvan.waitForEmptyQueue();
            });

            it('It should re-enable the Get Weather button', () => {
              expect(instance.isBtnGetWeatherEnable()).to.equal(true);
            });

            it('It should not display an error message to the user', () => {
              expect(instance.errorMessage()).to.be.empty;
            });

            it('It should display the city and country that were found', () => {
              expect(instance.jsonCityName()).to.equal(`${data.name} / ${data.sys.country}`);
            });

            it('It should display the minimum temperature', () => {
              expect(instance.minTemp()).to.equal(data.main.temp_min);
            });

            it('It should display the maximum temperature', () => {
              expect(instance.maxTemp()).to.equal(data.main.temp_max);
            });
          });
        });
      });
    });
  });
