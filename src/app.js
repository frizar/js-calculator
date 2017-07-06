'use strict';

import Calculator from './services/Calculator';
import calculator from './components/calculator';

angular.module('calculatorApp', [])
    .service('Calculator', Calculator)
    .component('calculator', calculator);
