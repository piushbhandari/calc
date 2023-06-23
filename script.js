//  theme switcher

const themeBtns = [...document.querySelectorAll(".testbtn")];
const body = document.querySelector("body");
themeBtns.forEach((btn) => {
  let dataTheme = btn.getAttribute("data-theme");

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    body.setAttribute("class", "");
    body.classList.add(dataTheme);
  });
});

// buttons

const numberBtns = [...document.querySelectorAll(".num-btn")];
const symbolBtns = [...document.querySelectorAll(".symbol-btn")];
const delBtn = document.querySelector(".backspace-btn");
const equalBtn = document.querySelector(".equals-btn");
const resetBtn = document.querySelector(".reset-btn");

// screen
const screenTxt = document.querySelector(".calculator__screen-text");

// global variables

const resetNumber = 0;
let firstNumber = "";
let secondNumber = "";
let currentNumber = "";
let currentSymbol = "";

// event listeners
numberBtns.forEach((btn) => {
  btn.addEventListener("click", processNumber);
});
symbolBtns.forEach((btn) => {
  btn.addEventListener("click", processSymbol);
});
resetBtn.addEventListener("click", resetCalc);

delBtn.addEventListener("click", deleteLastNum);

equalBtn.addEventListener("click", calculate);

// functions
function processNumber(e) {
  let currentBtn = e.currentTarget;
  // if (screenTxt.textContent === "0") {
  //   return;
  // }
  let numberValue = currentBtn.value;
  currentNumber += numberValue;

  updateScreen(currentNumber);
}
function processSymbol(e) {
  let currentBtn = e.currentTarget;
  currentSymbol = currentBtn.value;
  firstNumber = currentNumber;
  currentNumber = "";
  screenTxt.textContent = currentSymbol;
}

function deleteLastNum(e) {
  currentNumber = currentNumber.substring(0, currentNumber.length - 1);
  if (!currentNumber) {
    currentNumber = 0;
  }
  updateScreen(currentNumber);
}
function resetCalc(e) {
  firstNumber = "";
  secondNumber = "";
  currentNumber = "";
  updateScreen(resetNumber);
}

function calculate(e) {
  secondNumber = currentNumber;
  if (currentSymbol === "+") {
    currentNumber = +firstNumber + +secondNumber;
  } else if (currentSymbol === "-") {
    currentNumber = +firstNumber - +secondNumber;
  } else if (currentSymbol === "x") {
    currentNumber = +firstNumber * +secondNumber;
  } else if (currentSymbol === "/") {
    currentNumber = +firstNumber / +secondNumber;
  }
  updateScreen(currentNumber);
}
function updateScreen(value) {
  screenTxt.textContent = value;
}
