'use strict';

function Calculator() {
    let result = "0";
    let buttons_insert = "";
    this.input = ko.observable(result);

    //-------------------------------------------------  ADD NUMBER -----------------------
    this.addNumber = (number) => () => {
        if (result === "0") {
            result = number.toString();
            buttons_insert = number.toString();
            this.input(result);
            return;
        }

        result += number.toString();
        buttons_insert += number.toString();
        this.input(buttons_insert)

    }

    this.addZero = () => {
        if (result === "0") return;

        result += "0";
        buttons_insert += "0";
        this.input(buttons_insert);
    }
    //---------------------------------------------------------  OPERATIONS  -------------------
    this.addPlus = () => {
        let lastChar = +result[result.length - 1];
        if (isNaN(lastChar)) return;
        if (result.indexOf("+") > -1 || result.indexOf("-") > -1 || result.indexOf("/") > -1 || result.indexOf("*") > -1) {
            this.equal()
        }


        this.input(result);
        result += "+";
        buttons_insert = "";
    }

    this.addMinus = () => {
        let lastChar = +result[result.length - 1];
        if (result === "0" || isNaN(lastChar)) return;
        if (result.indexOf("+") > -1 || result.indexOf("-") > -1 || result.indexOf("/") > -1 || result.indexOf("*") > -1) {
            this.equal()
        }
        this.input(result);
        result += "-";
        buttons_insert = "";
    }

    this.addMultiplication = () => {
        let lastChar = +result[result.length - 1];
        if (result === "0" || isNaN(lastChar)) return;
        if (result.indexOf("+") > -1 || result.indexOf("-") > -1 || result.indexOf("/") > -1 || result.indexOf("*") > -1) {
            this.equal()
        }

        this.input(result);
        result += "*";
        buttons_insert = "";
    }

    this.addDivision = () => {
        let lastChar = +result[result.length - 1];
        if (result === "0" || isNaN(lastChar)) return;
        if (result.indexOf("+") > -1 || result.indexOf("-") > -1 || result.indexOf("/") > -1 || result.indexOf("*") > -1) {
            this.equal();
        }

        this.input(result);
        result += "/";
        buttons_insert = "";
    }


    //-------------------------------------------------------EQUAL---------

    this.equal = () => {
        if (!result.length) return;
        result = String(eval(result));
        if (result == Number.POSITIVE_INFINITY || result == Number.NEGATIVE_INFINITY) {
            result = "0";
        }
        this.input(result);
    }


    //-------------------------------------------------------CLEAR---------

    this.clear = () => {
        result = "0";
        buttons_insert = "";
        this.input(result);
    }

}

ko.applyBindings(new Calculator());