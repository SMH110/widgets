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
        let api = "http://api.openweathermap.org/data/2.5/weather?q=";
        let unit = "&units=metric&";
        let apiId = "appid=bd959553bce6759da749a8bcad48f038";
        let maxTemp = ko.observable("");
        let minTemp = ko.observable("");
        let isTempVisible = ko.observable(false);
        let josnCityName = ko.observable("");

        function showWeather() {
            let url = api + city() + unit + apiId;
            fetch(url)
                .then((response => {
                    response.json()
                        .then(josn => {
                            maxTemp(josn.main.temp_max);
                            minTemp(josn.main.temp_min);
                            isTempVisible(true);
                            josnCityName(josn.name);

                        });
                }));
        }


        return {
            city,
            showWeather,
            maxTemp,
            minTemp,
            isTempVisible,
            josnCityName
        };
    };
}));