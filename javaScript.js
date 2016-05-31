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
    
    
    
    
    /////////////////////////////////////
    
     let newInputRight = "0";
    let oldInputRight = "";
    let resultRight = "";

    this.inputRight = ko.observable(newInputRight);
    let operationRight = "";
    let historyRight = [];

    //-------------------------------------------------  ADD NUMBER -----------------------
    this.addNumberRight = (number) => () => {
        if (newInputRight === "0") {
            newInputRight = number.toString();
            historyRight.push(newInputRight)
            this.inputRight(newInputRight);
            return;
        }
        if (historyRight[historyRight.length - 1] === "=") {
            newInputRight = "";
        }
        newInputRight += number.toString();
        historyRight.push(newInputRight)
        this.inputRight(newInputRight)
    }

    this.addZeroRight = () => {
        if (newInputRight === "0") return;
        if (historyRight[historyRight.length - 1] === "=") {
            newInputRight = "";
        }
        newInputRight += "0";
        historyRight.push(newInputRight)
        this.inputRight(newInputRight);
    }
    
    ///////////////////////////
    //---------------------------------------------------------  OPERATIONS  -------------------
    this.addPlusRight = () => {
        if (historyRight.indexOf("+") > -1 || historyRight.indexOf("-") > -1 || historyRight.indexOf("*") > -1 || historyRight.indexOf("/") > -1) {
            this.equalRight()
        }
        operationRight = "+";
        if ( historyRight[historyRight.length - 1] === "-" || historyRight[historyRight.length - 1] === "+" || historyRight[historyRight.length - 1] === "*" || historyRight[historyRight.length - 1] === "/" ) return;

        oldInputRight = newInputRight;
        historyRight.push("+")
        newInputRight = "";


    }

    this.addMinusRight = () => {
        if (historyRight.indexOf("+") > -1 || historyRight.indexOf("-") > -1 || historyRight.indexOf("*") > -1 || historyRight.indexOf("/") > -1) {
            this.equalRight()
        }
        operationRight = "-";
        if ( historyRight[historyRight.length - 1] === "-" || historyRight[historyRight.length - 1] === "+" || historyRight[historyRight.length - 1] === "*" || historyRight[historyRight.length - 1] === "/" ) return;

        oldInputRight = newInputRight;
        historyRight.push("-")
        newInputRight = "";

    }

    this.addMultiplicationRight = () => {
        if (historyRight.indexOf("+") > -1 || historyRight.indexOf("-") > -1 || historyRight.indexOf("*") > -1 || historyRight.indexOf("/") > -1) {
            this.equalRight()
        }
        operationRight = "*";
        if ( historyRight[historyRight.length - 1] === "-" || historyRight[historyRight.length - 1] === "+" || historyRight[historyRight.length - 1] === "*" || historyRight[historyRight.length - 1] === "/" ) return;

        oldInputRight = newInputRight;
        historyRight.push("*")
        newInputRight = "";

    }

    this.addDivisionRight = () => {
         if (historyRight.indexOf("+") > -1 || historyRight.indexOf("-") > -1 || historyRight.indexOf("*") > -1 || historyRight.indexOf("/") > -1) {
            this.equalRight()
        }
        operationRight = "/";
        if ( historyRight[historyRight.length - 1] === "-" || historyRight[historyRight.length - 1] === "+" || historyRight[historyRight.length - 1] === "*" || historyRight[historyRight.length - 1] === "/" ) return;

        oldInputRight = newInputRight;
        historyRight.push("/")
        newInputRight = "";

    }


    //-------------------------------------------------------EQUAL---------

    this.equalRight = () => {
        if (isNaN(historyRight[historyRight.length - 1])) return
        if (operationRight === "" || oldInputRight === "") return;
        if (operationRight === "+") {
            resultRight = +oldInputRight + +newInputRight;
        } else if (operationRight === "-") {
            resultRight = +oldInputRight - +newInputRight;
        } else if (operationRight === "*") {
            resultRight = +oldInputRight * +newInputRight;
        }else if (operationRight === "/") {
            resultRight = +oldInputRight / +newInputRight;
        }
        
        if (resultRight == Number.POSITIVE_INFINITY || resultRight == Number.NEGATIVE_INFINITY) {
            resultRight = "0";
        }

        this.inputRight(resultRight);
        historyRight = [];
        historyRight.push(resultRight, "=")
        newInputRight = resultRight;


       


    }


    //-------------------------------------------------------CLEAR---------

    this.clearRight = () => {
        newInputRight = "0";
        oldInputRight = "";
        resultRight = "";
        historyRight = [];
        this.inputRight(newInputRight);

    }

}

ko.applyBindings(new Calculator());
/////////////////////////////////
/////////////////////////////////



////////////////////////////////




ko.applyBindings(new Calculator());