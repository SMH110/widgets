'use strict';

import * as ko from 'knockout';
import * as languages from './languages';

function Translate() {
    let input = ko.observable("");
    let src = ko.observable<any>();
    let target = ko.observable<any>();
    let translation = ko.observable("");
    let isBtnTranslateEnable = ko.observable(true);
    let errorMessage = ko.observable("");

    function translate() {
        if (!input() || !src() || !target()) {
            errorMessage("Please enter a word then choose source language and target language then click Translate!");
            translation("");
            return;
        }

        if (src().code === target().code) {
            errorMessage(`You can't choose the same language as source and target`);
            translation("");
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
}

export = Translate;