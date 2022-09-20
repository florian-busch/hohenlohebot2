require('dotenv').config();
const moment = require('moment')
const sgMail = require('@sendgrid/mail')
const { loggErrors } = require('./loggErrors.js');

//setup mongoose connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOCONNECTION);

//get mongoose Schemas for retweets and own tweets
const { loggRetweetsSchema } = require('./schemas/loggRetweetsSchema');
const { loggOwnTweetsSchema } = require('./schemas/loggOwnTweetsSchema');
const { loggErrorSchema } = require('./schemas/loggErrorSchema');

//set up mongoose models
const ownTweetsSchema = mongoose.model('loggedOwnTweets', loggOwnTweetsSchema);
const retweetModel = mongoose.model('loggedRetweets', loggRetweetsSchema);
const errorModel = mongoose.model('errorSchema', loggErrorSchema);


//get all own tweets from yesterday
const getOwnTweets = async () => {
  //calculate time objects for db queries for getOwnTweets() and getRetweets()
  const yesterdayStart = moment().utcOffset(-2).subtract(1, 'days').startOf('day');
  const yesterdayEnd = moment().utcOffset(-2).subtract(1, 'days').endOf('day')

  //db query for yesterdays own tweets
  const ownTweets = await ownTweetsSchema.find( { 'tweet.created_at': { $gte: yesterdayStart, $lte: yesterdayEnd } } )
  return ownTweets
};

//get all retweets from yesterday
const getRetweets = async () => {
   //calculate time objects for db queries for getOwnTweets() and getRetweets()
   const yesterdayStart = moment().utcOffset(-2).subtract(1, 'days').startOf('day');
   const yesterdayEnd = moment().utcOffset(-2).subtract(1, 'days').endOf('day')
 
  //db query for yesterdays retweets
  const retweets = await retweetModel.find( { 'retweeted_status.created_at': { $gte: yesterdayStart, $lte: yesterdayEnd } } )

  return retweets
};

const getBlockedTweets = async () => {
  const yesterdayStart = moment().utcOffset(-2).subtract(1, 'days').startOf('day');
  const yesterdayEnd = moment().utcOffset(-2).subtract(1, 'days').endOf('day')

  const blockedTweets = await errorModel.find( { 'category': 'BlockedWord', 'error.date': { $gte: yesterdayStart, $lte: yesterdayEnd } } );
  return blockedTweets
};

const getBlockedUserTweets = async () => {
  const yesterdayStart = moment().utcOffset(-2).subtract(1, 'days').startOf('day');
  const yesterdayEnd = moment().utcOffset(-2).subtract(1, 'days').endOf('day')

  const blockedUserTweets = await errorModel.find( { 'category': 'BlockedUser', 'error.date': { $gte: yesterdayStart, $lte: yesterdayEnd } } );
  return blockedUserTweets
}

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
      loggErrors(err, 'Mailer')
    })
};

//send notification mail on restart
const sendNotificationMail = async () => {
  sgMail
    .send({to: process.env.SENDGRID_RECIPIENT,
      from: process.env.SENDGRID_SENDER,
      subject: 'Hohenlohe Bot restarted',
      text: `Hohenlohe Bot was restarted at ${new Date()}`,
      html: `Hohenlohe Bot was restarted at ${new Date()}`
    })
    .then(() => {
      console.log('Notification Mail sent')
    })
    .catch((err) => {
      loggErrors(err, 'Mailer')
    })
};   

sendNotificationMail();

module.exports = { sendDailyMail }