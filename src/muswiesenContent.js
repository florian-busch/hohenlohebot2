const { currentDateAndTime } = require('./helpers')

//dates for muswiese 2022, 2023
const muswiese22Start =  new Date(Date.UTC(2022, 9, 8, 0, 1, 0));
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
  //get time difference for later umrechnung in days
  const diffInTime = calculateTimeToMuswiese();

  // Calculating the number of days between muswiese and today
  const diffInDays = Math.round(diffInTime / oneDay);
  return {text: `Ezz sanns bloaß noch ${diffInDays} Dooch bis zur Muswies!`};
};

module.exports = { getMuswiesenContent, checkIfTodayMuswiese };
