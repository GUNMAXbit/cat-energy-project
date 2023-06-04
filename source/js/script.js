let headerMain = document.querySelector(".main-header");
let headerToggle = document.querySelector(".main-header__toggle");

headerMain.classList.remove("main-header--nojs");

headerToggle.addEventListener("click", function () {
  if (headerMain.classList.contains("main-header--closed")) {
    headerMain.classList.remove("main-header--closed");
    headerMain.classList.add("main-header--opened");
  } else {
    headerMain.classList.add("main-header--closed");
    headerMain.classList.remove("main-header--opened");
  }
});
