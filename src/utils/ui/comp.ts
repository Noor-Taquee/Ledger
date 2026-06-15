import { createElement } from "../create-dom.js";

export function createListBtn(label: string, iconName: string) {
  const Btn = createElement("button", {
    className: "btn",
  });

  const infoDiv = createElement("div", { className: "info-div" });
  const icon1 = createElement("i", { className: `ph-bold ph-${iconName}` });
  const p = createElement("p", { textContent: label });
  infoDiv.append(icon1, p);

  const icon2 = createElement("i", { className: "ph-bold ph-caret-right" });
  Btn.append(infoDiv, icon2);
  return Btn;
}

export function createTextInputDiv(label: string, inputEl: HTMLElement) {
  const inputDiv = createElement("div", {
    id: `${inputEl.id}-div`,
    className: "input-div",
  });
  const inputLabel = createElement("p", {
    textContent: label,
    className: "input-label",
  });
  inputDiv.append(inputEl, inputLabel);

  return inputDiv;
}
