const cron = require('node-cron');

//daily statistics mail
const { sendDailyMail } = require('./mailer');

//function for updating tweet data in database (likes and retweets)
const { updateTweetData } = require('./updateTweetDataInDB')

//function for getting blocked users
const { getBlockedUsers, sendTweet } = require('./twitter')

//function for checking if today is muswiese
const { checkIfTodayMuswiese } = require('./muswiesenContent.js');

/*//Cron-jobs to start different
//  tweets and get blocked users//*/

//get blocked users once at start and then once an hour
getBlockedUsers();
cron.schedule("* 30 * * * *", function() {
  getBlockedUsers()
});

cron.schedule("0 00 10 * * *", function() {
  updateTweetData()
});

//Muswiesentweet every sunday and thursday
cron.schedule("0 33 16 * * 0,4", function() {
  if (checkIfTodayMuswiese()) {
    sendTweet('daysOfMuswiese')
  } else {
    sendTweet('MuswiesenCountdown')
  }
});

//Muswiesentweet every tuesday and saturday
cron.schedule("0 33 10 * * 2,6", function() {
  if (checkIfTodayMuswiese()) {
    sendTweet('daysOfMuswiese')
  } else {
    sendTweet('MuswiesenCountdown')
  }
});

//Vokabel-Tweet every wednesday, friday and sunday at 4.12 pm
cron.schedule("0 12 16 * * 3,5", function() {
  sendTweet('Vokabel');
});

//Spruch-Tweet every monday and thursday at 2.30 pm
cron.schedule("0 30 13 * * 1,4", function() {
  sendTweet('Spruch');
});

//send daily mail with statistics about yesterdays tweets and retweets
cron.schedule("0 30 9 * * *", function() {
  sendDailyMail()
});
