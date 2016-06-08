(function (factory) {
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        module.exports = factory(require('knockout'));
    } else {
        window.Calculator = factory(ko);
    }
} (function (ko) {
    return function Calculator() {
        'use strict';

        let newInput = "0";
        let oldInput = "";
        let result = "";
        this.input = ko.observable(newInput);
        let operation = "";
        let history = [];

        //--------ADD NUMBER---------
        this.addNumber = (number) => () => {
            if (history[history.length - 1] === "=") {
                newInput = "";
            }
            if (number === 0) {
                if (newInput === "0") return;
                if (history[history.length - 1] === "=") {
                    this.clear();
                    return;
                }
                newInput += "0";
                history.push(newInput);
                this.input(newInput);
            } else {
                if (newInput === "0") {
                    newInput = number.toString();
                    history.push(newInput);
                    this.input(newInput);
                    return;
                }

                newInput += number.toString();
                history.push(newInput);
                this.input(newInput);
            }
        };


        //----------OPERATIONS----------
        this.addOperation = (operation_) => {
            if (history.indexOf("+") > -1 || history.indexOf("-") > -1 || history.indexOf("*") > -1 || history.indexOf("/") > -1) {
                this.equal();
            }
            operation = operation_;
            if (history[history.length - 1] === "-" || history[history.length - 1] === "+" || history[history.length - 1] === "*" || history[history.length - 1] === "/") return;
            oldInput = newInput;
            history.push(operation_);
            newInput = "";
        }



        //----------EQUAL----------

        this.equal = () => {
            if (isNaN(history[history.length - 1])) return;
            if (operation === "" || oldInput === "") return;
            if (operation === "+") {
                result = +oldInput + +newInput;
            } else if (operation === "-") {
                result = +oldInput - +newInput;
            } else if (operation === "*") {
                result = +oldInput * +newInput;
            } else if (operation === "/") {
                result = +oldInput / +newInput;
            }

            if (result == Number.POSITIVE_INFINITY || result == Number.NEGATIVE_INFINITY) {
                result = "0";
            }

            this.input(result);
            history = [];
            history.push(result, "=");
            newInput = result;
        };

        //----------CLEAR----------

        this.clear = () => {
            newInput = "0";
            oldInput = "";
            result = "";
            history = [];
            this.input(newInput);
        };
    };


}));


