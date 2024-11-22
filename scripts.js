console.log('connected')

const calcKeyNums = [7,8,9,'+',4,5,6,'-',1,2,3,'x','c',0,'=','/']
const calcKeysContainer = document.querySelector('#calcKeysContainer')
const calcDisplay = document.querySelector('#calcScreen')
let number1 = []
let number2 = []
let operator = ''
let result = 0

function isOperator(key) {
    if(Number.isInteger(parseInt(key))) {
        return false
    }
    return true
}

function updateDisplay(val) {
    if (Array.isArray(val)) {
        calcDisplay.innerText = val.join('')
    } else {
        calcDisplay.innerText = val
    }
    
}


function resetVals() {
    number1 = []
    number2 = []
    operator = ''
    result = 0
}

function operate (num1,operator,num2) {

    let a = parseInt(num1.join(''))
    let b = parseInt(num2.join(''))
    let mathResult
    number1 = []
    number2 = []

    console.log(a,operator, b)

    switch (operator) {
        case '+':
            mathResult = a + b;
            break;
        case '-':
            mathResult = a - b;
            break
        case '*':
            mathResult = a * b;
            break
        case '/':
            mathResult = a / b;
            break
    }
    number1.push(mathResult)
    return mathResult

}

function registerKeyInput(e) {  
    let keyPressed = e.target.getAttribute('value')

    if (isOperator(keyPressed)) {
        if (keyPressed === 'c') {
            resetVals()
            updateDisplay(result)
        } else if (keyPressed === '=' && number1.length && number2.lenth) {
            result = operate(number1, operator, number2)
            updateDisplay(result)
        } else if (number1.length > 0 && number2.length > 0) {
            result = operate(number1, operator, number2)
            operator = (keyPressed === 'x') ? '*' : keyPressed
            updateDisplay(result)
        } else if (number1.length > 0) {
            operator = (keyPressed === 'x') ? '*' : keyPressed
        }
        
    } else {

        if (operator.length > 0) {
            number2.push(keyPressed)
            updateDisplay(number2)
        } else if (operator.length === 0) {
            number1.push(keyPressed)
            updateDisplay(number1)
        }

    }
}

function createCalcKey(k) {
    let newKey = document.createElement('div')
    newKey.id = k
    let classAttributes = (typeof k === 'string') ? 'calc-key operator-key' : 'calc-key number-key'
    newKey.setAttribute('class', classAttributes)
    newKey.setAttribute('value', k)
    newKey.innerText = k
    // let keySpan = document.createElement('span')
    // keySpan.innerText = k
    newKey.addEventListener('click', registerKeyInput)
    // newKey.appendChild(keySpan)
    return newKey
}



function initializeKeys() {
    calcKeyNums.forEach(key => {
        calcKeysContainer.appendChild(createCalcKey(key))
    });
    calcDisplay.innerText = result
    
}

initializeKeys()

