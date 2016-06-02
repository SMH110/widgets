let calculators = ko.observableArray([new Calculator()]);

function addCalculator() {
  calculators.push(new Calculator());
}

function removeCalculator() {
  calculators.remove(this);
}

ko.applyBindings(calculators);