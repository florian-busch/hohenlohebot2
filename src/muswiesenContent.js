const { currentDateAndTime } = require('./helpers')

//define dates for muswiese 2022, 2023
const muswiese22 = new Date(2022, 9, 8);
const muswiese23 = new Date(2022, 9, 13);

// One day in milliseconds
const oneDay = 1000 * 60 * 60 * 24;

// Calculating the time difference between 2022 or 2023 muswiese and today
calculateTimeToMuswiese = () => {
  const today = currentDateAndTime();
  //if year == 2022 and muswiese has not started yet
  if (new Date().getFullYear() == 2022 && currentDateAndTime() < new Date(Date.UTC(2022, 9, 8))) {
    return muswiese22.getTime() - today.getTime();
  //if year == 2023 and muswiese from 2022 has ended
  } else if (new Date().getFullYear() == 2023 && currentDateAndTime() > new Date(Date.UTC(2022, 9, 13))) {
    return muswiese23.getTime() - today.getTime()
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

module.exports = { getMuswiesenContent };
