'use strict';

export default class Calculator {
    constructor() {
        /**
         * Math operators ordered by priority [/ * - +]
         */
        this._operators = ['/', '*', '-', '+'];

        /**
         * Functions for simple math operations
         */
        this._operations = {
            '/': (n1, n2) => n1 / n2,
            '*': (n1, n2) => n1 * n2,
            '-': (n1, n2) => n1 - n2,
            '+': (n1, n2) => n1 + n2
        };
    }

    /**
     * Calculate expression
     * @param expression String
     * @return {number} Number
     */
    calculate(expression = '') {
        // remove spaces
        expression = expression.trim().replace(/\s/g, '');

        if (!expression) {
            return 0;
        }

        return this._evalExpression(expression);
    }

    /**
     * Eval expression
     * @param expression String
     * @return {number} Number
     * @private
     */
    _evalExpression(expression) {
        // looking for expressions in brackets like (2.5+2*2)
        const bracketExpressions = Calculator.getBracketExpressions(expression);

        if (bracketExpressions.length) {
            bracketExpressions.forEach((bracketExpression) => {
                // exp.slice(1, -1) for remove brackets ()
                const result = this._evalSimpleExpression(bracketExpression.slice(1, -1));
                expression = expression.replace(bracketExpression, `${result}`);
            });
            // replace brackets to values and try eval again (simplify expression)
            return this._evalExpression(expression);
        }
        // eval simple expression (no brackets)
        return this._evalSimpleExpression(expression);
    }

    /**
     * Eval simple expression like 5+5/2.5/2-2*3
     * @param expression String
     * @return {number} Number
     * @private
     */
    _evalSimpleExpression(expression) {
        // math operators / * - +
        const operators = this._operators;

        operators.forEach((operator) => {
            let nextMathExpression = Calculator.getSimpleMathExpressions(operator, expression);
            // while exist math operators
            while (nextMathExpression !== null) {
                const mathExpression = nextMathExpression[0];
                const result = this._calcMathOperation(operator, mathExpression);
                expression = expression.replace(mathExpression, result);
                // search next math expression
                nextMathExpression = Calculator.getSimpleMathExpressions(operator, expression);
            }
        });

        return +expression;
    }

    /**
     * Calc simple math operation [+ - / *]
     * @param operator
     * @param mathExpression like 2+2, -5/2.5, -1-1, etc
     * @return {number} Number
     * @private
     */
    _calcMathOperation(operator, mathExpression) {
        let numbers = mathExpression.split(operator);
        // convert to numbers
        if (operator === '-' && numbers.length > 2) {
            // operator -
            // numbers.length === 2, OK, two numbers is positive 1-1
            // numbers.length === 3, one number is negative
            // -1-1 == ['','1','1']
            // 1--1 == ['1','','1']
            // numbers.length === 4, two numbers is negative -1--1
            // -1--1 == ['', '1', '', '1']
            if (numbers.length === 3) {
                if (numbers[0] === '') { // can be 0
                    numbers = [-numbers[1], +numbers[2]];
                } else if (numbers[1] === '') { // can be 0
                    numbers = [+numbers[0], -numbers[2]];
                }
            } else if (numbers.length === 4) {
                numbers = [-numbers[1], -numbers[3]];
            }
        }

        // convert strings to numbers and calculate
        return this._getOperation(operator)(+numbers[0], +numbers[1]);
    }

    /**
     * Get function for math operator
     * @param operator String
     * @return {function} Function
     * @private
     */
    _getOperation(operator) {
        return this._operations[operator];
    }

    /**
     * Looking for expressions in brackets (2.5+2*2)
     * @param expression String
     * @return {Array|{index: number, input: string}|*|Array}
     */
    static getBracketExpressions(expression) {
        return expression.match(/\((-?[0-9]*[\.]?[0-9]+[\+\-\/\*]{1})+-?[0-9]*[\.]?[0-9]+\)/g) || [];
    }

    /**
     * Looking for simple math expressions (6/2, 1+1, etc)
     * @param operator String
     * @param expression String
     * @return {Array|{index: number, input: string}|*|Array}
     */
    static getSimpleMathExpressions(operator, expression) {
        const regExp = new RegExp(`-?[0-9]*[\\.]?[0-9]+\\${operator}-?[0-9]*[\\.]?[0-9]+`);
        return expression.match(regExp);
    }
}
