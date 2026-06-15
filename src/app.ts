import { createElement } from "./utils/create-dom.js";

import { navBar } from "./components/navigation/script.js";

export const app = document.getElementById("app") as HTMLDivElement;

app.dataset.theme = "light";

//#region inner app
export const innerApp = createElement("div", {
  id: "inner-app",
  className: "app-part",
});

export const panelContainer = createElement("div", {
  className: "panel-container",
});

innerApp.append(navBar, panelContainer);
//#endregion inner app

//#region outer app
export const outerApp = createElement("div", {
  id: "outer-app",
  className: "app-part",
});

export const outerApp_tabContainer = createElement("div", {
  className: "panel-container",
});

outerApp.append(outerApp_tabContainer);
//#endregion outer app

app.append(innerApp);
