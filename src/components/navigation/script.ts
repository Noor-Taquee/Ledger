import "./style.css";

import { createElement } from "../../utils/create-dom.js";

export const navBar = createElement("div", {
  id: "navigation-bar",
});

const navFocus = createElement("span", {
  id: "nav-focus",
});

const addTransactionBtn = createElement(
  "button",
  {
    className: "nav-btn",
  },
  [
    createElement("i", { className: "ph-bold ph-plus" }),
    createElement("p", { textContent: "Add" }),
  ],
);
addTransactionBtn.addEventListener("click", () => {
  window.location.hash = "#form";
});

const homeBtn = createElement(
  "button",
  {
    className: "nav-btn",
  },
  [
    createElement("i", { className: "ph-bold ph-house" }),
    createElement("p", { textContent: "Home" }),
  ],
);
homeBtn.addEventListener("click", () => {
  window.location.hash = "#home";
});

const historyBtn = createElement(
  "button",
  {
    className: "nav-btn",
  },
  [
    createElement("i", { className: "ph-bold ph-clock-counter-clockwise" }),
    createElement("p", { textContent: "history" }),
  ],
);
historyBtn.addEventListener("click", () => {
  window.location.hash = "#history";
});

navBar.append(navFocus, addTransactionBtn, homeBtn, historyBtn);
