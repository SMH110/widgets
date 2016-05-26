'use strict';
function Calculator() {
    let result = "0";
    let buttons_insert = "";
    this.input = ko.observable(result);

    //-------------------------------------------------  ADD NUMBER -----------------------

    this.addSeven = () => {
        if (result === "0") {
            result = "7";
            buttons_insert = "7";
            this.input(result);
            return;
        }

        result += "7";
        buttons_insert += "7";
        this.input(buttons_insert)
    }

    this.addEight = () => {
        if (result === "0") {
            result = "8";
            buttons_insert = "8";
            this.input(result);
            return;
        }

        result += "8";
        buttons_insert += "8";
        this.input(buttons_insert);
    }

    this.addNine = () => {
        if (result === "0") {
            result = "9";
            buttons_insert = "9";
            this.input(result);
            return;
        }
        result += "9";
        buttons_insert += "9";
        this.input(buttons_insert);
    }

    this.addFour = () => {
        if (result === "0") {
            result = "4";
            buttons_insert = "4";
            this.input(result);
            return;
        }
        result += "4";
        buttons_insert += "4";
        this.input(buttons_insert);
    }

    this.addFive = () => {
        if (result === "0") {
            result = "5";
            buttons_insert = "5";
            this.input(result);
            return;
        }

        result += "5";
        buttons_insert += "5";
        this.input(buttons_insert);
    }

    this.addSix = () => {
        if (result === "0") {
            result = "6";
            buttons_insert = "6";
            this.input(result)
            return;
        }
        result += "6";
        buttons_insert += "6";
        this.input(buttons_insert);
    }

    this.addOne = () => {
        if (result === "0") {
            result = "1";
            buttons_insert = "1";
            this.input(result);
            return;
        }

        result += "1"
        buttons_insert += "1";
        this.input(buttons_insert);
    }

    this.addTwo = () => {
        if (result === "0") {
            result = "2";
            buttons_insert = "2";
            this.input(result);
            return;
        }

        result += "2";
        buttons_insert += "2";
        this.input(buttons_insert);
    }

    this.addThree = () => {
        if (result === "0") {
            result = "3";
            buttons_insert = "3";
            this.input(result);
            return;
        }

        result += "3";
        buttons_insert += "3";
        this.input(buttons_insert);
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