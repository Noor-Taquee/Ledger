import "./history-panel.css";

import {
  addToStorage,
  daysShortList,
  monthsList,
  type Transaction,
  transactionHistory,
} from "../../core/handler.js";
import { createElement } from "../../utils/create-dom.js";
import { formatNumber } from "../../utils/logic/a.js";

export const historyPanel = createElement("div", {
  id: "history-panel",
  className: "app-panel",
});

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
    title: "Back",
    className: "toggle-btn",
  },
  [createElement("i", { className: "ph-bold ph-caret-left" })],
);
const panelName = createElement("p", {
  className: "panel-name",
  textContent: "History",
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

const listElement = createElement("div", {
  id: "transaction-list",
  className: "list",
});

function updateList() {
  listElement.innerHTML = "";
  addToStorage();

  transactionHistory.forEach((trnxn_list, date) => {
    const dateEl = createElement("div", { className: "date-div" });
    const dateTime = new Date(date);
    const dateP = createElement("p", {
      textContent: `${daysShortList.at(dateTime.getDay())}, ${dateTime.getDate()} ${monthsList.at(dateTime.getMonth())} ${new Date().getFullYear() == dateTime.getFullYear() ? "" : dateTime.getFullYear()}`,
    });
    dateEl.append(dateP);
    listElement.appendChild(dateEl);
    trnxn_list.forEach((trnxn) =>
      listElement.appendChild(createTrnsxnBtn(trnxn)),
    );
  });
}

document.addEventListener("list-update", updateList);

export function createTrnsxnBtn(transaction: Transaction) {
  const Btn = createElement("div", {
    className: "transaction-btn",
  });

  const amountDiv = createElement(
    "div",
    {
      className: "amount-div",
    },
    [
      createElement("i", { className: "ph-bold ph-currency-inr" }),
      createElement("span", { textContent: transaction.amount }),
    ],
  );

  const infoDiv = createElement("div", { className: "info-div" });
  const div1 = createElement("div", {
    className: "",
  });
  transaction.category.forEach((cat) => {
    const p = createElement("p", { textContent: cat });
    infoDiv.appendChild(p);
  });
  const timep = createElement("p", {
    textContent: `${formatNumber(transaction.metadata.time.hours)}:${formatNumber(transaction.metadata.time.minutes)}`,
  });
  div1.append(timep);

  const notep = createElement("p", {
    className: "note",
    textContent: transaction.description,
  });
  infoDiv.append(div1, notep);

  const icon2 = createElement("i", { className: "ph-bold ph-caret-right" });
  Btn.append(amountDiv, infoDiv, icon2);

  return Btn;
}

content.append(listElement);
//#endregion Content

historyPanel.append(topBar, content);
