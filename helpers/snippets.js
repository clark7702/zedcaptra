//capitalize only the first letter of the string.
export function capitalizeFirstLetter(string) {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
}

export function capitalizeWords(text) {
  return text?.toUpperCase();
}

export function capitalizeEveryFirstLetter(string) {
  return string
    ?.split(" ")
    ?.map((word) => capitalizeFirstLetter(word))
    ?.join(" ");
}

function addStr(str, index, stringToAdd) {
  return (
    str.substring(0, index) + stringToAdd + str.substring(index, str.length)
  );
}

export function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return "XXXXXX" + str.slice(-4);
}

export function truncateStringBetween(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, 3) + "****" + str.slice(7);
}

export function stringInBetween(str, start, end) {
  const startIndex = str.indexOf(start) + start.length;
  const endIndex = str.indexOf(end, startIndex);
  return str.substring(startIndex, endIndex);
}

export function currencywithAmount(info) {
  const dollarUSLocale = Intl.NumberFormat("en-US");
  const dollarIndianLocale = Intl.NumberFormat("en-IN");

  return (
    <>
      {info?.currency === "USD"
        ? "$"
        : info?.currency === "EUR"
          ? "€"
          : info?.currency === "GBP" && "£"}
      {info?.currency === "USD" ||
      info?.currency === "EUR" ||
      info?.currency === "GBP"
        ? dollarUSLocale.format(info?.amount)
        : dollarIndianLocale.format(info?.amount)}
    </>
  );
}

export function substractNumbers(number1, number2) {
  return number1 - number2;
}

export function formattedDate(date) {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export const formatNumber = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatNumberWithDecimal(number) {
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}
