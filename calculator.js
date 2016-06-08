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
        this.addNumber = number => {
            if (history[history.length - 1] === "=") {
                newInput = "";
            }
            if (newInput === "0" && number === 0) return;
            if (history[history.length - 1] === "=" && number === 0) {
                this.clear();
                return;
            }
            

            if (newInput === "0") {
                newInput = number.toString();
                history.push(newInput);
                this.input(newInput);
                return;
            }

            newInput += number.toString();
            history.push(newInput);
            this.input(newInput);

        };


        //----------OPERATIONS----------
        this.addOperation = (operator) => {
            if (history.indexOf("+") > -1 || history.indexOf("-") > -1 || history.indexOf("*") > -1 || history.indexOf("/") > -1) {
                this.equal();
            }
            operation = operator;
            if (history[history.length - 1] === "-" || history[history.length - 1] === "+" || history[history.length - 1] === "*" || history[history.length - 1] === "/") return;
            oldInput = newInput;
            history.push(operator);
            newInput = "";
        };



        //----------EQUAL----------

        this.equal = () => {
            if (isNaN(history[history.length - 1])) return;
            if (operation === "" || oldInput === "") return;
            if (operation === "+") {
                result = +oldInput + (+newInput);
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


