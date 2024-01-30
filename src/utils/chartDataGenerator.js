export function getDaysArray(month) {
  let numDaysInMonth, i, j, daysArray;
  numDaysInMonth = [];
  if (new Date().getFullYear() % 4 === 0) {
    numDaysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  } else {
    numDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  }
  daysArray = [];
  for (i = 0, j = numDaysInMonth[month - 1]; i < j; i++) {
    daysArray.push(i + 1);
  }
  return daysArray;
}

// export function getYearsArray(currentYear) {
//   const startYear = 2015;
//   const difference = currentYear - startYear + 1;
//   let years = [];
//   for (let i = 0; i < difference; i++) {
//     years.push(startYear + i);
//   }
//   return years;
// }

export function findDaysData(day, orderDays) {
  const days = [...day];
  for (let i = 0; i < days?.length; i++) {
    let found = false;
    for (let j = 0; j < orderDays?.length; j++) {
      if (days[i] === orderDays[j]._id.day) {
        days[i] = orderDays[j].total;
        found = true;
        break;
      }
    }
    if (!found) {
      days[i] = 0;
    }
  }
  return days;
}

export function findMonthsData(months, monthsData) {
  let copyMonths = [...months];
  for (let i = 0; i < copyMonths.length; i++) {
    let found = false;
    for (let j = 0; j < monthsData?.length; j++) {
      if (copyMonths[i] === monthsData[j].month) {
        copyMonths[i] = monthsData[j].total;
        found = true;
        break;
      }
    }
    if (!found) {
      copyMonths[i] = 0;
    }
  }
  return copyMonths;
}

export const monthsLabel = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
