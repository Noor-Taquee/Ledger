export function formatNumber(num: number, significantDigits = 2) {
  const isNegative = num < 0 ? true : false;
  if (isNegative) {
    num = -num;
  }

  let result = String(num);

  const currentDigits = result.length;

  if (currentDigits < significantDigits) {
    const difference = significantDigits - currentDigits;
    for (let i = 0; i < difference; i++) {
      result = "0" + result;
    }
  }

  return isNegative ? `-${result}` : result;
}
