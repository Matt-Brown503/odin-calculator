const calcKeyNums = [7,8,9,'+',4,5,6,'-',1,2,3,'x','c',0,'=','/']
const calcKeysContainer = document.querySelector('#calcKeysContainer')
const calcDisplay = document.querySelector('#calcScreen')
let number1 = []
let number2 = []
let operator = ''
let result = 0

// checks if keypress is an operator
function isOperator(key) {
    if(Number.isInteger(parseInt(key))) {
        return false
    }
    return true
}

// updates visual display
function updateDisplay(val) {
    if (Array.isArray(val)) {
        calcDisplay.innerText = val.join('')
    } else {
        calcDisplay.innerText = val
    }
}

// resets all values
function resetVals() {
    number1 = []
    number2 = []
    operator = ''
    result = 0
}

// equates the numbers stored and returns the final result
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
            mathResult = (b===0) ? mathResult = 'Nope' : a / b;
            break
    }
    number1.push(mathResult)
    return mathResult

}
// determins what kind of keypress was made and stores the values for the equation
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

// key creator function used to create each key
function createCalcKey(k) {
    let newKey = document.createElement('div')
    newKey.id = k
    let classAttributes = (typeof k === 'string') ? 'calc-key operator-key' : 'calc-key number-key'
    newKey.setAttribute('class', classAttributes)
    newKey.setAttribute('value', k)
    newKey.innerText = k
    newKey.addEventListener('click', registerKeyInput)
    return newKey
}

// Uses array of keys to generate calculator keys
function initializeKeys() {
    calcKeyNums.forEach(key => {
        calcKeysContainer.appendChild(createCalcKey(key))
    });
    document.querySelector('#c').classList.add('clear-key')
    calcDisplay.innerText = result
    
}

initializeKeys()

