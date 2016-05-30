'use strict';

function Calculator() {
    let newInput = "0";
    let oldInput = "";
    let result = "";

    this.input = ko.observable(newInput);
    let operation = "";
    let history = [];

    //-------------------------------------------------  ADD NUMBER -----------------------
    this.addNumber = (number) => () => {
        if (newInput === "0") {
            newInput = number.toString();
            history.push(newInput)
            this.input(newInput);
            return;
        }
        if (history[history.length - 1] === "=") {
            newInput = "";
        }
        newInput += number.toString();
        history.push(newInput)
        this.input(newInput)
    }

    this.addZero = () => {
        if (newInput === "0") return;
        if (history[history.length - 1] === "=") {
            newInput = "";
        }
        newInput += "0";
        history.push(newInput)
        this.input(newInput);
    }
    //---------------------------------------------------------  OPERATIONS  -------------------
    this.addPlus = () => {
        if (history.indexOf("+") > -1 || history.indexOf("-") > -1 || history.indexOf("*") > -1 || history.indexOf("/") > -1) {
            this.equal()
        }
        operation = "+";
        if ( history[history.length - 1] === "-" || history[history.length - 1] === "+" || history[history.length - 1] === "*" || history[history.length - 1] === "/" ) return;

        oldInput = newInput;
        history.push("+")
        newInput = "";


    }

    this.addMinus = () => {
        if (history.indexOf("+") > -1 || history.indexOf("-") > -1 || history.indexOf("*") > -1 || history.indexOf("/") > -1) {
            this.equal()

        }
        operation = "-";
        if ( history[history.length - 1] === "-" || history[history.length - 1] === "+" || history[history.length - 1] === "*" || history[history.length - 1] === "/" ) return;

        oldInput = newInput;
        history.push("-")
        newInput = "";

    }

    this.addMultiplication = () => {
        if (history.indexOf("+") > -1 || history.indexOf("-") > -1 || history.indexOf("*") > -1 || history.indexOf("/") > -1) {
            this.equal()
        }
        operation = "*";
       if ( history[history.length - 1] === "-" || history[history.length - 1] === "+" || history[history.length - 1] === "*" || history[history.length - 1] === "/" ) return;

        oldInput = newInput;
        history.push("*")
        newInput = "";

    }

    this.addDivision = () => {
        if (history.indexOf("+") > -1 || history.indexOf("-") > -1 || history.indexOf("*") > -1 || history.indexOf("/") > -1) {
            this.equal()
        }
        operation = "/";
        if ( history[history.length - 1] === "-" || history[history.length - 1] === "+" || history[history.length - 1] === "*" || history[history.length - 1] === "/" ) return;
        oldInput = newInput;
        history.push("/")
        newInput = "";

    }


    //-------------------------------------------------------EQUAL---------

    this.equal = () => {
        if (isNaN(history[history.length - 1])) return
        if (operation === "" || oldInput === "") return;
        if (operation === "+") {
            result = +oldInput + +newInput;
        } else if (operation === "-") {
            result = +oldInput - +newInput;
        } else if (operation === "*") {
            result = +oldInput * +newInput;
        }else if (operation === "/") {
            result = +oldInput / +newInput;
        }
        
        if (result == Number.POSITIVE_INFINITY || result == Number.NEGATIVE_INFINITY) {
            result = "0";
        }

        this.input(result);
        history = [];
        history.push(result, "=")
        newInput = result;


       


    }


    //-------------------------------------------------------CLEAR---------

    this.clear = () => {
        newInput = "0";
        oldInput = "";
        result = "";
        history = [];
        this.input(newInput);

    }

}

ko.applyBindings(new Calculator());