const { currentDateAndTime } = require('./helpers')

//dates for muswiese 2022, 2023
const muswiese22Start =  new Date(Date.UTC(2022, 9, 8, 12, 12, 0));
const muswiese22End = new Date(Date.UTC(2022, 9, 13, 23, 59, 0));
const muswiese23Start = new Date(Date.UTC(2023, 9, 7, 12, 15, 0));
const muswiese23End = new Date(Date.UTC(2023, 9, 12, 12, 15, 0));


// One day in milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//Date of today
const today = currentDateAndTime();

// Calculating the time difference between 2022 or 2023 muswiese and today
calculateTimeToMuswiese = () => {
  //muswiese22 has not started yet
  if (today < muswiese22Start) {
    return muswiese22Start - today;
  //muswiese22 ended, muswiese23 not started and not ended
  } else if (today > muswiese22End && today < muswiese23Start) {
    return muswiese23Start - today
  }
};

const checkIfTodayMuswiese = () => {
  if ((today > muswiese22Start && today < muswiese22End) || (today > muswiese23Start && today < muswiese23End)) {
    return true
  } else {
    return false
  }
};

//MuswiesenTweet
const getMuswiesenContent = () => {
  //get time difference for umrechnung to days and hours
  const diffInUnixTime = calculateTimeToMuswiese();

  // Calculating the number of days between muswiese and today
  const diffInFullDays = Math.floor(diffInUnixTime / oneDay);

  /* Calculating remaining hours --> 
  1. differenceInUnixTime / oneDayInUnixTime
  2. remainingDaysWithDecimal - rounded differenceInFullDays without decimal
  3. rounded(remainingDaysWithDecimals times 24)  
  */
  const remainingDaysWithDecimal = diffInUnixTime / oneDay;
  const decimalRemainingHours = remainingDaysWithDecimal - diffInFullDays;
  const remainingHours = Math.floor(decimalRemainingHours * 24);
  return {text: `Ezz sanns bloaß noch ${diffInFullDays} Dooch bis zur Muswies!`};
};

module.exports = { getMuswiesenContent, checkIfTodayMuswiese };
