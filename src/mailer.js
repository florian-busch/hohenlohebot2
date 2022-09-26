require('dotenv').config();
const moment = require('moment')
const sgMail = require('@sendgrid/mail')
const { loggErrors } = require('./loggErrors.js');

//setup mongoose connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOCONNECTION);

//get mongoose Schemas for retweets, own tweets and errors
const { retweetSchema } = require('./schemas/retweetsSchema');
const { ownTweetsSchema } = require('./schemas/ownTweetsSchema');
const { errorSchema } = require('./schemas/errorSchema');
const { currentDateAndTime } = require('./helpers.js');

//set up mongoose models
const ownTweetsModel = mongoose.model('ownTweets', ownTweetsSchema);
const retweetModel = mongoose.model('Retweets', retweetSchema);
const errorModel = mongoose.model('errorSchema', errorSchema);

//calculate time objects for db queries
const getYesterdayStart = () => {
  return moment().utcOffset(-2).subtract(1, 'days').startOf('day');
};

const getYesterdayEnd = () => {
  return moment().utcOffset(-2).subtract(1, 'days').endOf('day')
};

//get all own tweets from yesterday
const getOwnTweets = async () => {

  //db query for yesterdays own tweets
  const ownTweets = await ownTweetsModel.find( { 'tweet.created_at': { $gte: getYesterdayStart(), $lte: getYesterdayEnd() } } )
  return ownTweets
};

//get all retweets from yesterday
const getRetweets = async () => {
  const retweets = await retweetModel.find( { 'created_at': { $gte: getYesterdayStart(), $lte: getYesterdayEnd() } } );

  return retweets
};

//get all blocked Tweets from yesterday
const getBlockedTweets = async () => {
  const blockedTweets = await errorModel.find( { 'category': 'BlockedWord', 'date': { $gte: getYesterdayStart(), $lte: getYesterdayEnd() } } );

  return blockedTweets
};

//get all tweets from blocked users from yesterday
const getBlockedUserTweets = async () => {
  const blockedUserTweets = await errorModel.find( { 'category': 'BlockedUser', 'date': { $gte: getYesterdayStart(), $lte: getYesterdayEnd() } } );
  
  return blockedUserTweets
};

//sendgrid setup
sgMail.setApiKey(process.env.SENDGRID_API)

//create E-Mail-Message
const createMsg = async () => {
  const retweets = await getRetweets();
  const ownTweets = await getOwnTweets();
  const blockedTweets = await getBlockedTweets();
  const blockedUserTweets = await getBlockedUserTweets();


  return {to: process.env.SENDGRID_RECIPIENT,
  from: process.env.SENDGRID_SENDER,
  subject: 'HohenloheBot Daily Update',
  text: `There have been ${ownTweets.length} own Tweets, ${retweets.length} Retweets and ${blockedTweets.length} blocked Tweets yesterday`,
  html: `<p>There have been ${ownTweets.length} own Tweets, ${retweets.length} Retweets and ${blockedTweets.length} blocked Tweets yesterday.</p>
  <p>These are the tweets:
  ${ownTweets.map(tweet => `<br>${tweet.tweet.text} with ${tweet.tweet.favorite_count} Likes<br>`)}</p>
  <p>These are the retweets:
  ${retweets.map(retweet => `<br><b>Author</b>: ${retweet.retweeted_status.user.screen_name}<br>
  <b>Text</b>: ${retweet.retweeted_status.text}<br>`)}</p>
  <p>These are the blockedTweets:
  ${blockedTweets.map(blockedTweet => `<br><b>Author</b>: ${blockedTweet.tweet.user.screen_name}<br>
  <b>Text</b>: ${blockedTweet.tweet.text}`)}</p>
  <p>These are the tweets by blockedUsers:
  ${blockedUserTweets.map(blockedUserTweet => `<br><b>Author</b>: ${blockedUserTweet.tweet.user.screen_name}<br>
  <b>Text</b>: ${blockedUserTweet.tweet.text}`)}</p>
  `
  }
};

//send daily statistics about own tweets and retweets
const sendDailyMail = async () => {
  const msg = await createMsg()
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((err) => {
      loggErrors( {category: 'Mailer', message: err } )
    })
};

//send notification mail on restart
const sendNotificationMail = async () => {
  sgMail
    .send({to: process.env.SENDGRID_RECIPIENT,
      from: process.env.SENDGRID_SENDER,
      subject: 'Hohenlohe Bot restarted',
      text: `Hohenlohe Bot was restarted at ${currentDateAndTime()}`,
      html: `Hohenlohe Bot was restarted at ${currentDateAndTime()}`
    })
    .then(() => {
      console.log('Notification Mail sent')
    })
    .catch((err) => {
      loggErrors( {category: 'Mailer', message: err } )
    })
};   

sendNotificationMail();

module.exports = { sendDailyMail }