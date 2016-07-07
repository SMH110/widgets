(function (factory) {
    if (typeof define === 'function' && define['amd']) {
        define(['knockout'], factory);
    } else if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        module.exports = factory(require('knockout'));
    } else {
        window.WeatherApp = factory(ko);
    }
} (function (ko) {
    return function WeatherApp() {
        'use strict';
        let city = ko.observable("");
        let maxTemp = ko.observable("");
        let minTemp = ko.observable("");
        let jsonCityName = ko.observable("");
        let errorMessage = ko.observable("");
        let isBtnGetWeatherEnable = ko.observable(true);

        function getWeather() {
            isBtnGetWeatherEnable(false);
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city().replace(/\$/g, "")}&units=metric&appid=bd959553bce6759da749a8bcad48f038`)
                .then((response => {

                    response.json()
                        .then(json => {
                            if (json.message) {
                                errorMessage(`${json.message} ${city()}`);
                                isBtnGetWeatherEnable(true);
                                jsonCityName("");
                                return;
                            }
                            isBtnGetWeatherEnable(true);
                            errorMessage("");
                            maxTemp(json.main.temp_max);
                            minTemp(json.main.temp_min);
                            jsonCityName(`${json.name} / ${json.sys.country}`);
                        });

                })).catch(error => {
                    isBtnGetWeatherEnable(true);
                    errorMessage("Couldn't get weather information. Please check your internet connection.");
                });

        }


        return {
            city,
            getWeather,
            maxTemp,
            minTemp,
            jsonCityName,
            errorMessage,
            isBtnGetWeatherEnable
        };
    };
}));