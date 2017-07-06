'use strict';

import JSCalculator from './js-calculator';

const calculator = new JSCalculator();
let expression = '3 + 2 * (5 + 5 / -2.5 / 2 - 2 * 3) + (10 * 3 + (6 - 3)) / 3';
console.log(expression);
const result = calculator.calculate(expression);
console.log(result);
