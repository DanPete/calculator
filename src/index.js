const calcScreen = document.querySelector('.screen input')
const digits = document.querySelectorAll('.digit')
const operators = document.querySelectorAll('.operator')
const equalButton = document.querySelector('.equal')
const deleteButton = document.querySelector('.delete')
const decimalButton = document.querySelector('.decimal')

let inputNumbers = []
let inputOperator = []
let firstNumber = 0
let secondNumber = null
let operator = "+"

// Helpers

function updateCalcScreen(number) {
  if(equalButton.dataset.solved) {
    inputNumbers = []
    equalButton.removeAttribute('data-solved')
  } 
  inputNumbers.push(number)
  calcScreen.value = inputNumbers.join("")
}

function checkDecimal() {
  if(calcScreen.value.includes('.')){
    decimalButton.style.background = 'lightgray'
    decimalButton.style.opacity = '0.5'
    decimalButton.setAttribute('data-disabled', true)
    decimalButton.removeEventListener('click', handleDigitClick)
  } else {
    decimalButton.style.background = 'white'
    decimalButton.style.opacity = '1'
    decimalButton.removeAttribute('data-disabled')
    decimalButton.addEventListener('click', handleDigitClick)
  }
}

function clearDecimalCheck() {
  decimalButton.style.background = 'white'
  decimalButton.style.opacity = '1'
  decimalButton.addEventListener('click', handleDigitClick)
}

function storeOperator(operatorButton) {
  switch (operatorButton) {
    case '+':
      operator = '+'
      break;
    case '-':
      operator = '-'
      break;
    case '*':
      operator = '*'
      break;
    case '/':
      operator = '/'
      break;
    
    default:
      break;
  }
}

function solveOperator(operatorKey) {
  switch (operatorKey) {
    case '+':
      return firstNumber + secondNumber
    case '-':
      return firstNumber - secondNumber
    case '*':
      return firstNumber * secondNumber
    case '/':
      return firstNumber / secondNumber
    
    default:
      console.log('error')
      calcScreen.value('ERROR')
      break;
  }
}

function truncateCalcScreen() {
  if(calcScreen.value.length > 12) {
    firstNumber = Number(calcScreen.value)
    calcScreenLength = calcScreen.value.length
    calcScreen.value = `${calcScreen.value.slice(0,9)}e+${firstNumber.toString().length}`
  }
}

//Click handlers

function handleDigitClick(e) {
  updateCalcScreen(e.target.textContent)
  checkDecimal()
}

function handleOperatorClick(e) {
  if(e.target.textContent === '-' && inputNumbers.length === 0) {
    updateCalcScreen(e.target.textContent)
    return false
  }
  console.log(e.target.textContent)
  firstNumber = Number(calcScreen.value)
  inputNumbers = []
  storeOperator(e.target.textContent)
  calcScreen.value = e.target.textContent
  checkDecimal()
}

function handleEqualButton() {
  secondNumber = Number(inputNumbers.join(''))
  console.log(firstNumber, operator, secondNumber)
  calcScreen.value = solveOperator(operator)
  firstNumber = Number(calcScreen.value)
  equalButton.setAttribute('data-solved', true)
  clearDecimalCheck()
  truncateCalcScreen()
}

function handleDeleteButton() {
  inputNumbers.pop()
  calcScreen.value = inputNumbers.join('')
  checkDecimal()
}

// calcScreen.addEventListener('input', handleScreenChange)
digits.forEach(button => button.addEventListener('click', handleDigitClick))
operators.forEach(button => button.addEventListener('click', handleOperatorClick))
equalButton.addEventListener('click', handleEqualButton)
deleteButton.addEventListener('click', handleDeleteButton)

function simulateFocus(element) {
  document.querySelector(`.${element}`).classList.add('button-focus')
  setTimeout(() => document.querySelector(`.${element}`).classList.remove('button-focus'), 200)
}


function handleDigitKey(e) {
  switch (e.key) {
    case '0':
      updateCalcScreen(0)
      simulateFocus('number0')
      break;
    case '1':
      updateCalcScreen(1)
      simulateFocus('number1')
      break;
    case '2':
      updateCalcScreen(2)
      simulateFocus('number2')
      break;
    case '3':
      updateCalcScreen(3)
      simulateFocus('number3')
      break;
    case '4':
      updateCalcScreen(4)
      simulateFocus('number4')
      break;
    case '5':
      updateCalcScreen(5)
      simulateFocus('number5')
      break;
    case '6':
      updateCalcScreen(6)
      simulateFocus('number6')
      break;
    case '7':
      updateCalcScreen(7)
      simulateFocus('number7')
      break;
    case '8':
      updateCalcScreen(8)
      simulateFocus('number8')
      break;
    case '9':
      updateCalcScreen(9)
      simulateFocus('number9')
      break;
  
    default:
      break;
  }
  if(e.key === '.' && !decimalButton.dataset.disabled) {
    updateCalcScreen('.')
  }
}

function handleOperatorKey(e) {
  if(e.key === '-' && inputNumbers.length === 0) {
    updateCalcScreen('-')
    return false
  }
  function updateOperator() {
    firstNumber = Number(calcScreen.value)
    inputNumbers = []
  }
  switch (e.key) {
    case '+':
      storeOperator('+')
      updateOperator()
      calcScreen.value = '+'
      simulateFocus('addition')
      break;
    case '-':
      storeOperator('-')
      updateOperator()
      calcScreen.value = '-'
      simulateFocus('subtraction')
      break;
    case '*':
      storeOperator('*')
      updateOperator()
      calcScreen.value = '*'
      simulateFocus('multiplication')
      break;
    case '/':
      e.preventDefault()
      storeOperator('/')
      updateOperator()
      calcScreen.value = '/'
      simulateFocus('division')
      break;
  
    default:
      break;
  }
  checkDecimal()
}

function handleEqualKey(e) {
  if(e.key === 'Enter') {
    secondNumber = Number(inputNumbers.join(''))
    console.log(firstNumber, operator, secondNumber)
    calcScreen.value = solveOperator(operator)
    firstNumber = Number(calcScreen.value)
    equalButton.setAttribute('data-solved', true)
    clearDecimalCheck()
    truncateCalcScreen()
  }
}

function handleDeleteKey(e) {
  if(e.key === 'Backspace' || e.key == 'Delete' || e.key === 'c') {
    inputNumbers.pop()
    calcScreen.value = inputNumbers.join("")
    checkDecimal()
  }
}

window.addEventListener('keydown', handleDigitKey)
window.addEventListener('keydown', handleOperatorKey)
window.addEventListener('keydown', handleEqualKey)
window.addEventListener('keydown', handleDeleteKey)

