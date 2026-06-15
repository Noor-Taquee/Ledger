import "./home-panel.css";

import { createElement } from "../../utils/create-dom.js";
import { createListBtn } from "../../utils/ui/comp.js";
import { daysShortList, monthsList } from "../../core/handler.js";

export const homePanel = createElement("div", {
  id: "home-panel",
  className: "app-panel",
});

//#region Top Bar
const topBar = createElement("div", {
  className: "top-bar",
});

const panelNameDiv = createElement("div", {
  className: "panel-name-div",
});
const panelName = createElement("p", {
  textContent: "Ledger",
  className: "panel-name",
});
panelNameDiv.append(panelName);

const home_date_el = createElement("p", { id: "home-date" });
const home_date_dayn = createElement("span");
const home_date_month = createElement("span");
const home_date_year = createElement("span");
home_date_el.append(home_date_dayn, home_date_month, home_date_year);

topBar.append(panelNameDiv, home_date_el);

function updateDate() {
  const date = new Date();
  home_date_dayn.textContent = `${daysShortList.at(date.getDay())}`;
  home_date_month.textContent = `${monthsList.at(date.getMonth())}`;
  home_date_year.textContent = `${date.getDate()}`;
}
document.addEventListener("DOMContentLoaded", updateDate);
//#endregion  Top Bar

//#region Content
const content = createElement("div", {
  className: "content-div",
});

//#region Label List
const list = createElement("div", {
  id: "list",
  className: "list",
});

const educationBtn = createListBtn("Education", "");
const foodBtn = createListBtn("Food", "");
const groceryBtn = createListBtn("Grocery", "");
const healthBtn = createListBtn("Health", "");

list.append(educationBtn, foodBtn, groceryBtn, healthBtn);

//#endregion Label List

content.appendChild(list);
//#region Content

homePanel.append(topBar, content);
