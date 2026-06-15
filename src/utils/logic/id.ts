export function generateId() {
  const date = new Date();
  return `${date.getTime()}`;
}
