export function checkDateEquality(date1: Date, date2: Date) {
  typeof date1;
  if (date1 instanceof Date && date2 instanceof Date) {
    console.log("dates are instances of Date");
    const date1Day = date1.getDate();
    const date1Month = date1.getMonth();

    const date1Year = date1.getFullYear();
    const date2Month = date2.getMonth();
    const date2Day = date2.getDate();
    const date2Year = date2.getFullYear();
    console.log(date1Day, date1Month, date1Year);

    return (
      date1Month === date2Month &&
      date1Day === date2Day &&
      date1Year === date2Year
    );
  } else {
    console.log("dates are not instances of Date", date1, date2);
    return false;
  }
}

const date1 = new Date("2021-09-01");
const dateArray = [
  new Date("2021-09-01"),
  new Date("2021-09-02"),
  new Date("2021-09-03"),
];

dateArray.map((date) => {
  const iss = checkDateEquality(date1, date);
  iss;
});
console.log(dateArray.includes(date1));
