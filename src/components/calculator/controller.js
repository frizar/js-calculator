'use strict';

export default class CalculatorController {
    constructor(Calculator) {
        this.Calculator = Calculator;

        this.data = {
            expression: '',
            result: 0,
            history: []
        };
    }

    calculate() {
        this.data.result = this.Calculator.calculate(this.data.expression);

        if (this.data.expression) {
            // add to history
            this.data.history.push({
                expression: this.data.expression,
                result: this.data.result
            });
            // save only last 10 calculations
            if (this.data.history.length > 10) {
                this.data.history.shift();
            }
        }
    }

    loadExpression(event, history) {
        event.preventDefault();

        this.data.expression = history.expression;
        this.data.result = history.result;
    }

    cleanCalculator() {
        this.data.expression = '';
        this.data.result = 0;
    }
}

CalculatorController.$inject = ['Calculator'];
