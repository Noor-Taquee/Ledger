// import { openDB } from 'idb';

export const daysList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;
export const daysShortList = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
] as const;
export const monthsList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export type Transaction = {
  id: string;

  amount: string;

  value: number;

  type: "credit" | "debit";

  category: string[];

  description: string;

  metadata: {
    time: {
      seconds: number;
      minutes: number;
      hours: number;
    };

    /** Date of month @range [1, 31] */
    date: number;

    /** number @range [0, 11] */
    month: number;

    /** Full year @example 1996 */
    year: number;

    /** Short name of day of week */
    day: number;
  };
  method: string;
};

export let transactionHistory = new Map<string, Transaction[]>();

document.addEventListener("DOMContentLoaded", async () => {
  await fetchFromStorage();
  document.dispatchEvent(new Event("list-update"));
});

export async function addToStorage() {
  const a = Array.from(transactionHistory);
  const ab = JSON.stringify(a);
  localStorage.setItem("transaction-history", ab);
  console.log(ab);
}

export async function fetchFromStorage() {
  const ab = localStorage.getItem("transaction-history");
  if (!ab) return;

  const a: [string, Transaction[]][] = await JSON.parse(ab);

  if (a.length > 0) {
    transactionHistory = new Map(a);
    console.log(transactionHistory);
  }
}

export function addTransaction(transaction: Transaction) {
  const date = `${transaction.metadata.date}-${transaction.metadata.month}-${transaction.metadata.year}`;
  const list = transactionHistory.has(date)
    ? transactionHistory.get(date)!
    : [];

  list.push(transaction);

  transactionHistory.set(date, list);
}

/** Returns a list of transactions which matches the properties. */
export function getTransactionLike(props: Partial<Transaction>): Transaction[] {
  return [];
}

/** Returns a list of transactions from the given time. */
export function getTransactionFrom(props: {
  day?: number;
  month?: number;
  year?: number;
}): Transaction[] {
  return [];
}
