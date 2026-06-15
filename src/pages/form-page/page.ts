import "./form-panel.css";

import { createElement } from "../../utils/create-dom.js";
import { createTextInputDiv } from "../../utils/ui/comp.js";

import { addTransaction, type Transaction } from "../../core/handler.js";

export const formPanel = createElement("div", {
  id: "form-panel",
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
  textContent: "add transaction",
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

//#region Form
const addForm = createElement("form", {
  name: "transaction-form",
  id: "transaction-form",
  action: "Javascript:void(0)",
});

// MARK: Amount
const amountInput = createElement("input", {
  name: "amount",
  type: "number",
  id: "amount-input",
  className: "type-input",
  required: true,
});
const amountInputDiv = createTextInputDiv("Amount", amountInput);
modifyInputDiv(amountInput, amountInputDiv);

// MARK: Category
const categorySelectionDiv = createElement("div", {
  id: "category-select-div",
  className: "input-div",
});
const categorySelectionLabel = createElement("p", {
  textContent: "Category",
  className: "input-label",
});
const categorySelection = createElement("select", {
  name: "category",
  id: "category-select",
  className: "type-select",
});
categorySelectionDiv.append(categorySelectionLabel, categorySelection);
modifyInputDiv(categorySelection, categorySelectionDiv);

function createCategoryOptions() {
  const food = createElement("option", {
    className: "select-option",
    textContent: "Food",
    value: "food",
  });
  const health = createElement("option", {
    className: "select-option checked",
    textContent: "Health",
    value: "health",
  });
  const education = createElement("option", {
    className: "select-option",
    textContent: "Education",
    value: "education",
  });
  const grocery = createElement("option", {
    className: "select-option",
    textContent: "Grocery",
    value: "grocery",
  });
  categorySelection.append(food, health, education, grocery);
}

createCategoryOptions();

// MARK: Date
const dateDiv = createElement("div", {
  className: "input-div-wrapper",
});

/** Day of month in number */
const dayInput = createElement("input", {
  name: "day",
  id: "day-input",
  type: "number",
  className: "type-input",
  autocomplete: "bday-day",
  required: true,
});
const dayInputDiv = createTextInputDiv("Day", dayInput);
modifyInputDiv(dayInput, dayInputDiv);

/** Month in number */
const monthInput = createElement("input", {
  name: "month",
  id: "month-input",
  type: "number",
  className: "type-input",
  autocomplete: "bday-month",
  required: true,
});
const monthInputDiv = createTextInputDiv("Month", monthInput);
modifyInputDiv(monthInput, monthInputDiv);

/** Full year */
const yearInput = createElement("input", {
  name: "year",
  id: "year-input",
  type: "number",
  className: "type-input",
  autocomplete: "bday-year",
  required: true,
});
const yearInputDiv = createTextInputDiv("Year", yearInput);
modifyInputDiv(yearInput, yearInputDiv);

const currentDateBtn = createElement(
  "button",
  {
    type: "button",
    id: "current-date-btn",
    title: "Current Date",
    className: "",
  },
  [createElement("i", { className: "ph-bold ph-clock" })],
);

currentDateBtn.addEventListener("click", fillCurrentDate);

function fillCurrentDate() {
  const currentDate = new Date();

  let date = String(currentDate.getDate());
  date = date.length == 1 ? "0" + date : date;
  dayInput.value = date;
  checkInput(dayInput, dayInputDiv);

  let month = String(currentDate.getMonth() + 1);
  month = month.length == 1 ? "0" + month : month;
  monthInput.value = month;
  checkInput(monthInput, monthInputDiv);

  yearInput.value = String(currentDate.getFullYear());
  checkInput(yearInput, yearInputDiv);
}

dateDiv.append(dayInputDiv, monthInputDiv, yearInputDiv, currentDateBtn);

// MARK: Note
const noteInput = createElement("input", {
  name: "note",
  id: "decription-input",
  className: "type-input",
});
const noteInputDiv = createTextInputDiv("Note", noteInput);
modifyInputDiv(noteInput, noteInputDiv);

addForm.append(amountInputDiv, categorySelectionDiv, dateDiv, noteInputDiv);
//#endregion Form

// MARK: Add button
const addTransactionBtn = createElement(
  "button",
  {
    title: "Add transaction",
    id: "add-btn",
  },
  [
    createElement("p", { textContent: "Add" }),
    createElement("i", { className: "ph-bold ph-plus" }),
  ],
);

addTransactionBtn.addEventListener("click", () => {
  addForm.dispatchEvent(
    new SubmitEvent("submit", {
      submitter: addTransactionBtn,
    }),
  );
});

addForm.addEventListener("submit", () => {
  const currentTime = new Date();
  const amount = amountInput.value;
  const note = noteInput.value;

  const year = yearInput.value;
  if (Number(year) < 0 || Number(year) > 2026) {
    yearInputDiv.classList.add("wrong");
  }

  const month = monthInput.value;
  if (Number(month) < 1 || Number(month) > 12) {
    monthInputDiv.classList.add("wrong");
  }

  const date = dayInput.value;
  if (Number(month) < 1 || Number(month) > 12) {
    dayInputDiv.classList.add("wrong");
  }

  addForm.reset();

  const tr: Transaction = {
    id: "",
    amount: amount,
    type: "credit",
    description: note,
    category: ["food"],
    method: "",
    value: Number(amount),
    metadata: {
      time: {
        seconds: currentTime.getSeconds(),
        minutes: currentTime.getMinutes(),
        hours: currentTime.getHours(),
      },
      date: Number(date),
      month: Number(month),
      year: Number(year),
      day: new Date(`${year}-${month}-${date}`).getDay(),
    },
  };
  addTransaction(tr);
  document.dispatchEvent(new Event("list-update"));
});

function modifyInputDiv(
  input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  div: HTMLDivElement,
) {
  checkInput(input, div);

  input.addEventListener("focus", () => {
    div.classList.add("selected");
  });
  input.addEventListener("input", () => {
    div.classList.add("selected");
  });

  input.addEventListener("blur", () => {
    if (input.value.length > 0) return;
    div.classList.remove("selected");
  });
}

function checkInput(
  input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  div: HTMLDivElement,
) {
  if (input.value.length > 0) div.classList.add("selected");
}

content.append(addForm, addTransactionBtn);

//#endregion Content

formPanel.append(topBar, content);
