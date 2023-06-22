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
