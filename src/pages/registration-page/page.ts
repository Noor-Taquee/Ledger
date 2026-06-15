import { createElement } from "../../utils/create-dom.js";

export const loginPanel = createElement("div", {
  id: "login-panel",
  className: "app-panel",
});
loginPanel.dataset.index = "1";

//#region Top Bar
const topBar = createElement("div", {
  className: "top-bar",
});

const panelNameDiv = createElement("div", {
  className: "panel-name-div",
});
const backBtn = createElement(
  "button",
  {
    className: "toggle-btn",
  },
  [createElement("i", { className: "ph-bold ph-caret-left" })],
);
const panelName = createElement("p", {
  className: "panel-name",
  textContent: "Login",
});
panelNameDiv.append(backBtn, panelName);
backBtn.addEventListener("click", () => {
  window.location.hash = "#home";
});

topBar.append(panelNameDiv);
//#endregion Top Bar

//#region Content
const content = createElement("div", {
  className: "content-div",
});

content.append();
//#endregion Content

loginPanel.append(topBar, content);
