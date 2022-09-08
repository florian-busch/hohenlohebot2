const { currentDateAndTime } = require('./helpers')

//define dates for muswiese 2022, 2023
const muswiese22Start =  new Date(Date.UTC(2022, 9, 8, 0, 1, 0));

const muswiese23Start = new Date(Date.UTC(2022, 9, 13, 12, 15, 0));

// One day in milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//Date of today
const today = currentDateAndTime();

// Calculating the time difference between 2022 or 2023 muswiese and today
calculateTimeToMuswiese = () => {

  //if year == 2022 and muswiese has not started yet
  if (new Date().getFullYear() == 2022 && today < muswiese22Start) {
    return muswiese22Start - today;
  //if year == 2023 and muswiese from 2022 has ended
  } else if (new Date().getFullYear() == 2023 && today > muswiese23Start) {
    return muswiese23Start.getTime() - today.getTime()
  }
};

//MuswiesenTweet
const getMuswiesenContent = () => {

  const muswiese22End = new Date(Date.UTC(2022, 9, 13, 23, 59, 0));

  //check if today is muswiese and return according text
  if (today > muswiese22Start && today < muswiese22End) {
    return {text: 'Endlich is Muswies!'}
  // if not muswiese, return countdown message
  } else {
    //get time difference for later umrechnung in days
    const diffInTime = calculateTimeToMuswiese();

    // Calculating the number of days between muswiese and today
    const diffInDays = Math.round(diffInTime / oneDay);
    return {text: `Ezz sanns bloaß noch ${diffInDays} Dooch bis zur Muswies!`};
  }
};

console.log(getMuswiesenContent())

module.exports = { getMuswiesenContent };
