// PARSER

function calculate() {
    const expr = document.getElementById('calculator-input').value.trim();
    const resultDiv = document.getElementById('result');
    try {
        const result = evaluateExpression(expr);
        resultDiv.textContent = '=' + result;
        addExprInHistory(expr, result)
    } catch (e) {
        resultDiv.textContent = '!: ' + e.message;
    }
}

function evaluateExpression(expr) {
    const tokens = tokenize(expr);
    const values = [];
    const ops = [];

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (typeof token === 'number') {
            values.push(token);
        } else if (token === '(') {
            ops.push(token);
        } else if (token === ')') {
            // Применяем операторы пока не встретим '('
            while (ops.length > 0 && ops[ops.length - 1] !== '(') {
                applyOp(values, ops.pop());
            }
            
            if (ops.length === 0) {
                throw new Error('Unbalanced brackets');
            }
            ops.pop(); // Удаляем '('

            // Если перед скобкой была функция, применяем её сразу после раскрытия скобки
            if (ops.length > 0 && isFunction(ops[ops.length - 1])) {
                const funcName = ops.pop();
                applyFunction(values, funcName);
            }
        } 
        // Обработка операторов и функций
        else if (isFunction(token)) {
            ops.push(token);
        } 
        else if (isOperator(token)) {
            const isUnary = (
                i === 0 || 
                isOperator(tokens[i - 1]) || 
                tokens[i - 1] === '(' ||
                isFunction(tokens[i-1]) // Например, sin(-1)
            );

            if (token === '-' && isUnary) {
                values.push(0);
                continue; 
            }
            while (
                ops.length > 0 &&
                hasPrecedence(ops[ops.length - 1], token) &&
                !isFunction(ops[ops.length - 1])
            ) {
                applyOp(values, ops.pop());
            }
            ops.push(token);
        } else {
            throw new Error(`Invalid symbol/token: ${token}`);
        }
    }

    // Применяем оставшиеся операторы
    while (ops.length > 0) {
        const op = ops.pop();
        if (isFunction(op)) {
            applyFunction(values, op);
        } else {
            applyOp(values, op);
        }
    }

    if (values.length !== 1) {
        // Для отладки можно вывести состояние стеков
        console.error('Values:', values, 'Ops:', ops);
        throw new Error('Solving error: Invalid expression structure');
    }
    
    return values[0];
}


const FUNCTIONS = {
    'abs': Math.abs,
    'sin': Math.sin, 'sinh': Math.sinh, 'asin': Math.asin, 'asinh': Math.asinh,
    'cos': Math.cos, 'cosh': Math.cosh, 'acos': Math.acos, 'acosh': Math.acosh,
    'tan': Math.tan, 'tanh': Math.tanh, 'atan': Math.atan, 'atanh': Math.atanh,
    'atan2': Math.atan2,
    'cbrt': Math.cbrt,
    'min': Math.min, 'max': Math.max,
    'round': Math.round, 'random': Math.random, 'pow': Math.pow,
    'sqrt': Math.sqrt, 'log': Math.log, 'exp': Math.exp,
    'floor': Math.floor, 'ceil': Math.ceil, 'trunc': Math.trunc,
    'sign': Math.sign, 'hypot': Math.hypot,
};

const CONSTANTS = {
    'e': Math.E,
    'pi': Math.PI,
};

function isFunction(token) {
    return typeof token === 'string' && FUNCTIONS.hasOwnProperty(token);
}

function applyFunction(values, funcName) {
    const fn = FUNCTIONS[funcName];
    if (!fn) throw new Error(`Invalid function: ${funcName}`);

    // Определяем, сколько аргументов нужно
    const arity = fn.length;

    if (values.length < arity) {
        throw new Error(`Not enough operands for function ${funcName}`);
    }

    const args = [];
    for (let i = 0; i < arity; i++) {
        args.unshift(values.pop()); // берём с конца
    }

    const result = fn(...args);
    if (Number.isNaN(result)) {
        throw new Error('NaN');
    }
    values.push(result);
}

function tokenize(str) {
    if (str === '') throw new Error('Expression is empty');
    const tokens = [];
    let i = 0;

    while (i < str.length) {
        const ch = str[i];

        if (/\s/.test(ch)) {
            i++;
            continue;
        }

        if (/[0-9]/.test(ch)) {
            let numStr = '';
            let hasDot = false;
            while (i < str.length && (/[0-9]/.test(str[i]) || (str[i] === '.' && !hasDot))) {
                if (str[i] === '.') hasDot = true;
                numStr += str[i++];
            }
            const num = Number(numStr);
            if (Number.isNaN(num)) {
                throw new Error('Invalid number');
            }
            tokens.push(num);
            continue;
        }

        // Имена функций и констант
        if (/[a-zA-Z]/.test(ch)) {
            let name = '';
            while (i < str.length && /[a-zA-Z]/ .test(str[i])) {
                name += str[i++];
            }
            const lower = name.toLowerCase();
            if (FUNCTIONS.hasOwnProperty(lower)) {
                tokens.push(lower);
            } else if (CONSTANTS.hasOwnProperty(lower)) {
                tokens.push(CONSTANTS[lower]);
            } else {
                throw new Error(`Unexpected identifier: ${name}`);
            }
            continue;
        }

        // Операторы и скобки
        if ('+-*/%()^'.includes(ch)) {
            tokens.push(ch);
            i++;
        } else {
            throw new Error(`Invalid character: ${ch}`);
        }
    }
    return tokens;
}

function isOperator(ch) {
    return '+-*/%^'.includes(ch);
}

function hasPrecedence(op1, op2) {
    const prec = { '+': 1, '-': 1, '*': 2, '/': 2, '%': 2, '^': 3 };
    if (op1 === '^' && op2 === '^') return false; 
    return prec[op1] >= prec[op2];
}

function applyOp(values, op) {
    if (values.length < 2) throw new Error('Not enough operands');
    const b = values.pop();
    const a = values.pop();

    switch (op) {
        case '+': values.push(a + b); break;
        case '-': values.push(a - b); break;
        case '*': values.push(a * b); break;
        case '/':
            if (b === 0) throw new Error('Division by zero');
            values.push(a / b);
            break;
        case '%':
            if (b === 0) throw new Error('Modulo by zero');
            values.push(a % b);
            break;
        case '^': values.push(a ** b); break;
        default: throw new Error('Unknown operator');
    }
}