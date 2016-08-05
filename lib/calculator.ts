'use strict';

import * as ko from 'knockout';

function Calculator() {

    let newInput: any = "0";
    let oldInput: string = "";
    let result: any = "";
    let input = ko.observable(newInput);
    let operation: string = "";
    let history: any[] = [];

    function addNumber(number: string) {
        if (history[history.length - 1] === "=") {
            newInput = "";
        }

        if (newInput === "0") {
            newInput = number;
            history.push(newInput);
            input(newInput);
            return;
        }

        newInput += number;
        history.push(newInput);
        input(newInput);
    }

    function addOperation(operator: string) {
        if (history.indexOf("+") > -1 || history.indexOf("-") > -1 || history.indexOf("*") > -1 || history.indexOf("/") > -1) {
            equal();
        }
        operation = operator;
        if (history[history.length - 1] === "-" || history[history.length - 1] === "+" || history[history.length - 1] === "*" || history[history.length - 1] === "/") return;
        oldInput = newInput;
        history.push(operator);
        newInput = "";
    }

    function equal() {
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
        result = result.toString();
        input(result);
        history = [];
        history.push(result, "=");
        newInput = result;
    }

    function clear() {
        newInput = "0";
        oldInput = "";
        result = "";
        history = [];
        input(newInput);
    }

    return {
        input,
        addNumber,
        addPlus() {
            addOperation("+");
        },
        addMinus() {
            addOperation("-");
        },
        addMultiplication() {
            addOperation("*");
        },
        addDivision() {
            addOperation("/");
        },
        equal,
        clear
    };
}

export = Calculator;