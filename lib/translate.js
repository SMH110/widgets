(function (factory) {
    if (typeof define === 'function' && define['amd']) {
        define(['knockout'], factory);
    } else if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        module.exports = factory(require('knockout'));
    } else {
        window.Translate = factory(ko);
    }
} (function (ko) {
    return function Translate() {
        'use strict';
        let languages = [
            { code: 'EN', display: "English" },
            { code: 'FR', display: "French" },
            { code: 'AR', display: "Arbic" },
        ];
        let input = ko.observable("");
        let src = ko.observable("");
        let target = ko.observable("");
        let translation = ko.observable("");
        let isBtnTranslateEnable = ko.observable(true);
        let errorMessage = ko.observable("");
        function translate() {
            if (!input() || !src() || !target()) {
                alert("Please enter a word then choose source language and target language then click Translate!");
                return;
            }

            if (src().code === target().code) {
                alert(`You can't choose the same language as source and target`);
                return;
            }

            errorMessage("");
            isBtnTranslateEnable(false);
            fetch(`https://www.googleapis.com/language/translate/v2?key=AIzaSyBICHvOzCaXjtSLYdC6y5vKnlIptW9dbRY&source=${src().code}&target=${target().code}&q=${encodeURIComponent(input())}`)
                .then(response => response.json())
                .then(body => {
                    isBtnTranslateEnable(true);
                    translation(body.data.translations[0].translatedText);
                }, error => {
                    isBtnTranslateEnable(true);
                    errorMessage(`Couldn't get weather information. Please check your internet connection.`);
                });

        }

        return {
            languages,
            input,
            src,
            target,
            translate,
            translation,
            isBtnTranslateEnable,
            errorMessage
        };
    };
}));