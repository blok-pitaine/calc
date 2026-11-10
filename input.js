// CALCULATOR INPUT

function backspace(){
    const input = document.getElementById('calculator-input');
    if (input.value.length > 0) {
        input.value = input.value.slice(0, -1);
        input.setSelectionRange(input.value.length, input.value.length);
    }
}

function clearResult(){
    document.getElementById('result').innerText = '';
}

function add(value){
    calcInput.value+=value;
    clearResult();
}

const calcInput = document.getElementById('calculator-input')

const clearBtn = document.getElementById('C')
clearBtn.addEventListener('click', function(){
    calcInput.value = ""});
const bracketstartBtn = document.getElementById('bracketstart')
bracketstartBtn.addEventListener('click', function(){
    add("(")
});
const bracketendBtn = document.getElementById('bracketend')
bracketendBtn.addEventListener('click', function(){
    add(")")
});
const remainderBtn = document.getElementById('remainder')
remainderBtn.addEventListener('click', function(){
    add("%")});
const divisionBtn = document.getElementById('division')
divisionBtn.addEventListener('click', function(){
    add("/")});

const sevenBtn = document.getElementById('seven')
sevenBtn.addEventListener('click', function(){
    add("7")});
const eightBtn = document.getElementById('eight')
eightBtn.addEventListener('click', function(){
    add("8")});
const nineBtn = document.getElementById('nine')
nineBtn.addEventListener('click', function(){
    add("9")});
const muliplicationBtn = document.getElementById('multiplication')
muliplicationBtn.addEventListener('click', function(){
    add("*")});
const exponentiationBtn = document.getElementById('exponentiation')
exponentiationBtn.addEventListener('click', function(){
    add("^")});

const fourBtn = document.getElementById('four')
fourBtn.addEventListener('click', function(){
    add("4")});
const fiveBtn = document.getElementById('five')
fiveBtn.addEventListener('click', function(){
    add("5")});
const sixBtn = document.getElementById('six')
sixBtn.addEventListener('click', function(){
    add("6")});
const minusBtn = document.getElementById('minus')
minusBtn.addEventListener('click', function(){
    add("-")});

const oneBtn = document.getElementById('one')
oneBtn.addEventListener('click', function(){
    add("1")});
const twoBtn = document.getElementById('two')
twoBtn.addEventListener('click', function(){
    add("2")});
const threeBtn = document.getElementById('three')
threeBtn.addEventListener('click', function(){
    add("3")});
const plusBtn = document.getElementById('plus')
plusBtn.addEventListener('click', function(){
    add("+")});

const zeroBtn = document.getElementById('zero')
zeroBtn.addEventListener('click', function(){
    add("0")});
const dotBtn = document.getElementById('dot')
dotBtn.addEventListener('click', function(){
    add(".")});
const calculateBtn = document.getElementById('calculate')
calculateBtn.addEventListener('click', function(){
    calculate()});

const backspaceBtn = document.getElementById('backspace');
backspaceBtn.addEventListener('click', function() {
    backspace()
});

const spaceBtn = document.getElementById('space');
spaceBtn.addEventListener('click', function() {
    add(' ')
});


calcInput.addEventListener('input', function(){
    clearResult()
});

//constants

const eBtn = document.getElementById('E');
eBtn.addEventListener('click', function() {
    add('e')
});
const piBtn = document.getElementById('PI');
piBtn.addEventListener('click', function() {
    add('pi')
});

//funcs
const absBtn = document.getElementById('abs');
absBtn.addEventListener('click', function() {
    add('abs(')
});
const sqrtBtn = document.getElementById('sqrt');
sqrtBtn.addEventListener('click', function() {
    add('sqrt(')
});
const roundBtn = document.getElementById('round');
roundBtn.addEventListener('click', function() {
    add('round(')
});
const randomBtn = document.getElementById('random');
randomBtn.addEventListener('click', function() {
    add('random(')
});
const powBtn = document.getElementById('pow');
powBtn.addEventListener('click', function() {
    add('pow(')
});
const expBtn = document.getElementById('exp');
expBtn.addEventListener('click', function() {
    add('exp(')
});
const floorBtn = document.getElementById('floor');
floorBtn.addEventListener('click', function() {
    add('floor(')
});
const logBtn = document.getElementById('log');
logBtn.addEventListener('click', function() {
    add('log(')
});

const sinBtn = document.getElementById('sin');
sinBtn.addEventListener('click', function() {
    add('sin(')
});
const sinhBtn = document.getElementById('sinh');
sinhBtn.addEventListener('click', function() {
    add('sinh(')
});
const asinBtn = document.getElementById('asin');
asinBtn.addEventListener('click', function() {
    add('asin(')
});
const asinhBtn = document.getElementById('asinh');
asinhBtn.addEventListener('click', function() {
    add('asinh(')
});

const cosBtn = document.getElementById('cos');
cosBtn.addEventListener('click', function() {
    add('cos(')
});
const coshBtn = document.getElementById('cosh');
coshBtn.addEventListener('click', function() {
    add('cosh(')
});
const acosBtn = document.getElementById('acos');
acosBtn.addEventListener('click', function() {
    add('acos(')
});
const acoshBtn = document.getElementById('acosh');
acoshBtn.addEventListener('click', function() {
    add('acosh(')
});

const tanBtn = document.getElementById('tan');
tanBtn.addEventListener('click', function() {
    add('tan(')
});
const tanhBtn = document.getElementById('tanh');
tanhBtn.addEventListener('click', function() {
    add('tanh(')
});
const atanBtn = document.getElementById('atan');
atanBtn.addEventListener('click', function() {
    add('atan(')
});
const atanhBtn = document.getElementById('atanh');
atanhBtn.addEventListener('click', function() {
    add('atanh(')
});
const atan2Btn = document.getElementById('atan2');
atan2Btn.addEventListener('click', function() {
    add('atan2(')
});

const cbrtBtn = document.getElementById('cbrt');
cbrtBtn.addEventListener('click', function() {
    add('cbrt(')
});
const minBtn = document.getElementById('min');
minBtn.addEventListener('click', function() {
    add('min(')
});
const maxBtn = document.getElementById('max');
maxBtn.addEventListener('click', function() {
    add('max(')
});

const ceilBtn = document.getElementById('ceil');
ceilBtn.addEventListener('click', function() {
    add('ceil(')
});
const truncBtn = document.getElementById('trunc');
truncBtn.addEventListener('click', function() {
    add('trunc(')
});
const signBtn = document.getElementById('sign');
signBtn.addEventListener('click', function() {
    add('sign(')
});
const hypotBtn = document.getElementById('hypot');
hypotBtn.addEventListener('click', function() {
    add('hypot(')
});

window.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key === 'Escape') {
        calcInput.value = "";
    } else if (key === 'Enter') {
        calculate();
    } 
})