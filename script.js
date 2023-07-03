//  theme switcher

const themeBtns = [...document.querySelectorAll(".testbtn")];
const body = document.querySelector("body");

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

let trackers = {
  firstNumber: "",
  secondNumber: "",
  currentNumber: "0",
  currentSymbol: "",
};

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

window.addEventListener("DOMContentLoaded", (e) => {
  let theme = getStorage("theme");
  let currentTheme = getStorage("currentThemeBtn");
  let currentThemeBtn = document.querySelector(
    `[data-theme="${currentTheme}"]`
  );

  let localTrackers = JSON.parse(getStorage("trackers"));
  if (theme) {
    loadTheme(theme);
  }
  if (currentThemeBtn) {
    toggleClasses(currentThemeBtn, themeBtns);
  } else {
    themeBtns[0].classList.add("active");
  }

  if (localTrackers) {
    loadScreen(localTrackers);
  }

  console.log(trackers);
});

// functions
function processNumber(e) {
  let currentBtn = e.currentTarget;
  let numberValue = currentBtn.value;
  trackers.currentNumber += numberValue;
  updateScreen(trackers.currentNumber);
  setStorage("currentNumber", trackers.currentNumber);
}
function processSymbol(e) {
  let currentBtn = e.currentTarget;
  trackers.currentSymbol = currentBtn.value;
  trackers.firstNumber = trackers.currentNumber;
  trackers.currentNumber = "";
  updateScreen(trackers.currentSymbol, true);
}
function processDot(e) {
  if (trackers.currentNumber.includes(".")) {
    return;
  } else {
    trackers.currentNumber += ".";
    updateScreen(trackers.currentNumber);
  }
}
function deleteLastNum(e) {
  trackers.currentNumber =
    trackers.currentNumber.length > 0
      ? trackers.currentNumber.substring(0, trackers.currentNumber.length - 1)
      : "";
  if (!trackers.currentNumber) {
    trackers.currentNumber = 0;
  }
  updateScreen(trackers.currentNumber);
}
function resetCalc(e) {
  trackers.firstNumber = "";
  trackers.secondNumber = "";
  trackers.currentNumber = "0";
  updateScreen(resetNumber);
  setStorage("trackers", JSON.stringify(trackers));
}

function calculate(e) {
  trackers.secondNumber = trackers.currentNumber;
  if (trackers.currentSymbol === "+") {
    trackers.currentNumber = +trackers.firstNumber + +trackers.secondNumber;
  } else if (trackers.currentSymbol === "-") {
    trackers.currentNumber = +trackers.firstNumber - +trackers.secondNumber;
  } else if (trackers.currentSymbol === "x") {
    trackers.currentNumber = +trackers.firstNumber * +trackers.secondNumber;
  } else if (trackers.currentSymbol === "/") {
    trackers.currentNumber = +trackers.firstNumber / +trackers.secondNumber;
  }

  updateScreen(trackers.currentNumber);
}
function updateScreen(value, isSymbol = false) {
  if (!isSymbol) {
    screenTxt.textContent = formatNumber(value);
  } else {
    screenTxt.textContent = value;
  }

  setStorage("trackers", JSON.stringify(trackers));
}

function loadScreen(value) {
  trackers = value;
  screenTxt.textContent = formatNumber(trackers.currentNumber);
}
function formatNumber(value) {
  return Number.parseFloat(value).toLocaleString("en-US");
}

// local storage
function setStorage(key, value) {
  localStorage.setItem(key, value);
}
function getStorage(name) {
  return localStorage.getItem(name);
}
