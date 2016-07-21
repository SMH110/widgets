(function (factory) {
    if (typeof define === 'function' && define['amd']) {
        define([], factory);
    } else if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        module.exports = factory();
    } else {
        window.Languages = factory();
    }
} (function () {
    'use strict';
    return [
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
}));