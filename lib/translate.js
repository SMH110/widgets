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
        let input = ko.observable("");
        let src = ko.observable("");
        let target = ko.observable("");
        let api = "https://www.googleapis.com/language/translate/v2?key=";
        let apiId = "AIzaSyBICHvOzCaXjtSLYdC6y5vKnlIptW9dbRY&source=";
        let translation = ko.observable("");
        function translate() {
            let url = api + apiId + src() + "&target=" + target() + "&q=" + input().split(" ").join("%20");
            fetch(url)
                .then(response => {
                    response.json()
                        .then(body => {
                            translation(body.data.translations[0].translatedText)
                            console.log(translation());
                        });

                });

        }


        return {
            input,
            src,
            target,
            translate,
            translation

        }
    };
}));