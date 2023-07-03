//  theme switcher

const themeBtns = [...document.querySelectorAll(".testbtn")];
const body = document.querySelector("body");

window.addEventListener("DOMContentLoaded", (e) => {
  let theme = getStorage("theme");
  let currentTheme = getStorage("currentThemeBtn");
  let currentThemeBtn = document.querySelector(
    `[data-theme="${currentTheme}"]`
  );
  if (theme) {
    loadTheme(theme);
  }
  if (currentThemeBtn) {
    toggleClasses(currentThemeBtn, themeBtns);
  } else {
    themeBtns[0].classList.add("active");
  }
});

themeBtns.forEach((btn) => {
  let dataTheme = btn.getAttribute("data-theme");

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    let currentBtn = e.currentTarget;

    toggleClasses(currentBtn, themeBtns);
    loadTheme(dataTheme);
    setStorage("theme", dataTheme);
    setStorage("currentThemeBtn", dataTheme);
  });
});

function loadTheme(dataTheme) {
  body.setAttribute("class", "");
  body.classList.add(dataTheme);
}

function toggleClasses(currentBtn, btns) {
  btns.forEach((btn) => {
    btn.classList.remove("active");
  });

  currentBtn.classList.add("active");
}
// local storage
function setStorage(key, value) {
  localStorage.setItem(key, value);
}
function getStorage(name) {
  return localStorage.getItem(name);
}

// buttons

const numberBtns = [...document.querySelectorAll(".num-btn")];
const symbolBtns = [...document.querySelectorAll(".symbol-btn")];
const delBtn = document.querySelector(".backspace-btn");
const equalBtn = document.querySelector(".equals-btn");
const resetBtn = document.querySelector(".reset-btn");
const dotBtn = document.querySelector(".dot-btn");
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

dotBtn.addEventListener("click", processDot);

resetBtn.addEventListener("click", resetCalc);

delBtn.addEventListener("click", deleteLastNum);

equalBtn.addEventListener("click", calculate);

// functions
function processNumber(e) {
  let currentBtn = e.currentTarget;
  let numberValue = currentBtn.value;
  currentNumber += numberValue;
  console.log(currentNumber);
  updateScreen(currentNumber);
}
function processSymbol(e) {
  let currentBtn = e.currentTarget;
  currentSymbol = currentBtn.value;
  firstNumber = currentNumber;
  currentNumber = "";
  updateScreen(currentSymbol, true);
}
function processDot(e) {
  if (currentNumber.includes(".")) {
    return;
  } else {
    currentNumber += ".";
    updateScreen(currentNumber);
  }
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
function updateScreen(value, isSymbol = false) {
  if (!isSymbol) {
    screenTxt.textContent = formatNumber(value);
  } else {
    screenTxt.textContent = value;
  }
}
function formatNumber(value) {
  return Number.parseFloat(value).toLocaleString("en-US");
}
