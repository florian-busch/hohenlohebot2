//MuswiesenTweet
const getMuswiesenContent = () => {
  const muswiese = new Date("10/08/2022");
  const today = new Date();

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  // Calculating the time difference between two dates
  const diffInTime = muswiese.getTime() - today.getTime();

  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);

  return `Ezz sanns bloaß noch ${diffInDays} Dooch bis zur Muswies!`;
};

module.exports = { getMuswiesenContent };
