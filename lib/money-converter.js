(function (factory) {
    if (typeof define === 'function' && define['amd']) {
        define(['knockout'], factory);
    } else if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        module.exports = factory(require('knockout'));
    } else {
        window.MoneyConverter = factory(ko);
    }
} (function (ko) {
    return function MoneyConverter() {
        'use strict';

        let currencySrc = ko.observable("");
        let currencyTrgt = ko.observable("");
        let amount = ko.observable("");
        let api = "http://globalcurrencies.xignite.com/xGlobalCurrencies.json/ConvertRealTimeValue?From=";
        let changeReslut = ko.observable("");
        let apiID= "&APIID=1C59AE1EB2654E529DDD02BB0073CB5F"
        function convertCurrency() {
            let url = api + currencySrc()  + "&To=" + currencyTrgt() + "&Amount=" + amount() + apiID;
            fetch("http://globalcurrencies.xignite.com/xGlobalCurrencies.json/ConvertRealTimeValue?1C59AE1EB2654E529DDD02BB0073CB5F&From=EUR&To=USD&Amount=1500")
                .then(response => {
                    response.json()
                        .then(body => {
                            changeReslut(body);
                            console.log(changeReslut());
                        });

                });

        }


        return {
            currencySrc,
            currencyTrgt,
            amount,
            changeReslut,
            convertCurrency

        }
    };
}));