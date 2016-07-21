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
            { code: 'af', display: "Afrikaans" },
            { code: 'sq', display: "Albanian" },
            { code: 'ar', display: "Arabic" },
            { code: 'az', display: "Azerbaijani" },
            { code: 'eu', display: "Basque" },
            { code: 'bn', display: "Bengali" },
            { code: 'be', display: "Belarusian" },
            { code: 'bg', display: "Bulgarian" },
            { code: 'ca', display: "Catalan" },
            { code: 'zh-CN', display: "Chinese Simplified" },
            { code: 'zh-TW', display: "Chinese Traditional" },
            { code: 'hr', display: "Croatian" },
            { code: 'cs', display: "Czech" },
            { code: 'da', display: "Danish" },
            { code: 'nl', display: "Dutch" },
            { code: 'en', display: "English" },
            { code: 'eo', display: "Esperanto" },
            { code: 'et', display: "Estonian" },
            { code: 'tl', display: "Filipino" },
            { code: 'tl', display: "Finnish" },
            { code: 'fr', display: "French" },
            { code: 'gl', display: "Galician" },
            { code: 'ka', display: "Georgian" },
            { code: 'de', display: "German" },
            { code: 'el', display: "Greek" },
            { code: 'gu', display: "Gujarati" },
            { code: 'ht', display: "Haitian Creole" },
            { code: 'iw', display: "Hebrew" },
            { code: 'hi', display: "Hindi" },
            { code: 'hu', display: "Hungarian" },
            { code: 'is', display: "Icelandic" },
            { code: 'id', display: "Indonesian" },
            { code: 'ga', display: "Irish" },
            { code: 'it', display: "Italian" },
            { code: 'ja', display: "Japanese" },
            { code: 'kn', display: "Kannada" },
            { code: 'ko', display: "Korean" },
            { code: 'la', display: "Latin" },
            { code: 'lv', display: "Latvian" },
            { code: 'lt', display: "Lithuanian" },
            { code: 'mk', display: "Macedonian" },
            { code: 'ms', display: "Malay" },
            { code: 'mt', display: "Maltese" },
            { code: 'no', display: "Norwegian" },
            { code: 'fa', display: "Persian" },
            { code: 'pl', display: "Polish" },
            { code: 'pt', display: "Portuguese" },
            { code: 'ro', display: "Romanian" },
            { code: 'ru', display: "Russian" },
            { code: 'sr', display: "Serbian" },
            { code: 'sk', display: "Slovak" },
            { code: 'sl', display: "Slovenian" },
            { code: 'es', display: "Spanish" },
            { code: 'sw', display: "Swahili" },
        ];
        let input = ko.observable("");
        let src = ko.observable();
        let target = ko.observable();
        let translation = ko.observable("");
        let isBtnTranslateEnable = ko.observable(true);
        let errorMessage = ko.observable("");
        function translate() {
            if (!input() || !src() || !target()) {
                errorMessage("Please enter a word then choose source language and target language then click Translate!");
                return;
            }

            if (src().code === target().code) {
                errorMessage(`You can't choose the same language as source and target`);
                return;
            }

            errorMessage("");
            isBtnTranslateEnable(false);
            fetch(`https://www.googleapis.com/language/translate/v2?key=AIzaSyBICHvOzCaXjtSLYdC6y5vKnlIptW9dbRY&source=${src().code}&target=${target().code}&q=${encodeURIComponent(input())}`)
                .then(response => response.json())
                .then(body => {
                    translation(body.data.translations[0].translatedText);
                }, error => {
                    errorMessage(`Couldn't get translation. Please check your internet connection.`);
                    translation("");
                })
                .then(() => {
                    isBtnTranslateEnable(true);
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