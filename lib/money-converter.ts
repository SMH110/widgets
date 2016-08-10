'use strict';

import * as ko from 'knockout';
import * as currencies from './currencies';

function moneyConverter() {
    let amount = ko.observable("");
    let currencyTarget = ko.observable<any>();
    let isBtnConvertEnable = ko.observable(true);
    let conversionResult = ko.observable<any>("")
    let errorMessage = ko.observable("");

    function convert() {
        if (!currencyTarget()) {
            errorMessage("Please choose a target currency then press convert");
            conversionResult("");
            return;
        }
        if (!amount() || isNaN(+amount())) {
            amount("1")
        }

        isBtnConvertEnable(false);
        errorMessage("");

        fetch(`http://apilayer.net/api/live?access_key=a9ba2e4ab354d328d2cbbcf1384930c2&currencies=${currencyTarget().currency}&source=USD&fromat=1`)
            .then(response => response.json())
            .then(body => {
                let result = body.quotes['USD' + currencyTarget().currency] * +amount();
                conversionResult(result)
            }, error => {
                conversionResult("");
                errorMessage(`Couldn't get the result. Please check your internet connection.`);
            })
            .then(() => {
                isBtnConvertEnable(true);
            })
    }

    return {
        currencies,
        amount,
        currencyTarget,
        convert,
        errorMessage,
        isBtnConvertEnable,
        conversionResult
    };
}

export = moneyConverter;