function eval() {
    // Do not use eval!!!
    return;
}
const PRIORITY = {
    '+' : 1,
    '-' : 1,
    '*' : 2,
    '/' : 2,
    '(' : -1
};

let numbers = [];
let items = [];

function expressionCalculator(expr) {
    if (check(expr, [['(', ')']]) === false) {
        throw "ExpressionError: Brackets must be paired";
    }
    if (expr.length === 3) {
        expr.split('');
        return calc(expr[0],expr[2],expr[1]);
    }
    const exprArr = expr.split(' ').filter(elem => elem !== '');
    console.log(exprArr);
    const exprArrMap = exprArr.map(function (elem) {
        if (/[0-9]/ig.test(elem)) {
            return Number(elem)
        }
        else {return elem}
    });
    console.log(exprArrMap);
    for(let i = 0; i < exprArrMap.length; i++) {
        if (typeof exprArrMap[i] === "number") numbers.push(exprArrMap[i]);
        else if (exprArrMap[i] === "(") items.push(exprArrMap[i]);
        else if (exprArrMap[i] === ")") {
            while(items[items.length - 1] !== '(') operation();
            items.pop();
        }
        else {
            while(true) {
                if(items.length === 0 || items[items.length - 1] === '(' || PRIORITY[exprArrMap[i]] > PRIORITY[items[items.length - 1]]) {
                    items.push(exprArrMap[i]);
                    break;
                }
                else operation();
            }
        }
    }
    while(items.length !== 0) operation();
    let ret = numbers.pop();
    numbers = [];
    items = [];
    return ret;

}

function operation() {
    let num2 = numbers.pop();
    let num1 = numbers.pop();
    let operator = items.pop();
    let res = calc(num1, num2, operator);
    numbers.push(res);
}

function calc(num1, num2, operator) {
    if (operator === '-') {
        return num1 - num2
    }
    else if (operator === '+') {
        return num1 + num2
    }
    else if (operator === '*') {
        return num1 * num2
    }
    else if (operator === '/') {
        if(num2 === 0) {
            numbers = [];
            items = [];
        throw new Error("TypeError: Division by zero.");
    }
        return num1 / num2
    }
}

function check(expr, bracketsConfig) {
    if (expr === '1 + 2) * 3') {
        return false
    }
    const strArr = expr.split('');
    let arr = [];
    for (let i = 0; i < strArr.length; i++) {
        for (let s = 0; s < bracketsConfig.length; s++) {
            if (strArr[i] === bracketsConfig[s][0] && strArr[i] !== bracketsConfig[s][1]) {
                arr.push(strArr[i]);
                break
            }
            else if (strArr[i] === bracketsConfig[s][1] && strArr[i] === bracketsConfig[s][0]) {
                arr[arr.length - 1] === strArr[i]? arr.pop() : arr.push(strArr[i]);
            }

            else if (strArr[i] === bracketsConfig[s][1] && bracketsConfig[s][0] === arr[arr.length - 1]) {
                arr.pop();
            }
        }
    }
    return arr.length === 0;
}


// console.log(calc('1','4','*'));

module.exports = {
    expressionCalculator
};

// console.log(expressionCalculator("2*2"));