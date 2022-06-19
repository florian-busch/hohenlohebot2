require('dotenv').config();
const moment = require('moment')
const sgMail = require('@sendgrid/mail')
const { loggErrors } = require('./loggErrors.js');

//setup mongoose connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOCONNECTION);

//get mongoose Schemas for retweets and own tweets
const { loggRetweetsSchema } = require('../schemas/loggRetweetsSchema');
const { loggOwnTweetsSchema } = require('../schemas/loggOwnTweetsSchema');

//set up mongoose models
const ownTweetsSchema = mongoose.model('loggedOwnTweets', loggOwnTweetsSchema);
const retweetModel = mongoose.model('loggedRetweets', loggRetweetsSchema);

//calculate time objects for db queries for getOwnTweets() and getRetweets()
const yesterdayStart = moment().utcOffset(-2).subtract(1,'days').startOf('day');
const yesterdayEnd = moment().utcOffset(-2).subtract(1, 'days').endOf('day')

//get all own tweets from yesterday
const getOwnTweets = async () => {
  //db query for yesterdays own tweets
  const ownTweets = await ownTweetsSchema.find( { 'tweet.created_at': { $gte: yesterdayStart, $lte: yesterdayEnd } } )

  return ownTweets
};

//get all retweets from yesterday
const getRetweets = async () => {
  //db query for yesterdays retweets
  const retweets = await retweetModel.find( { 'retweeted_status.created_at': { $gte: yesterdayStart, $lte: yesterdayEnd } } )

  return retweets
};

getRetweets().then(retweets => console.log(retweets))
getOwnTweets().then(ownTweets => console.log(ownTweets))
console.log(yesterdayStart)
console.log(yesterdayEnd)

//sendgrid setup
sgMail.setApiKey(process.env.SENDGRID_API)

//create E-Mail-Message
const createMsg = async () => {
  const retweets = await getRetweets();
  const ownTweets = await getOwnTweets();

  return {to: process.env.SENDGRID_RECIPIENT,
  from: process.env.SENDGRID_SENDER,
  subject: 'HohenloheBot Daily Update',
  text: `There have been ${ownTweets.length} own Tweets and ${retweets.length} Retweets yesterday`,
  html: `<p>There have been ${ownTweets.length} own Tweets and ${retweets.length} Retweets yesterday.</p>
  <p>These are the tweets:
  ${ownTweets.map(tweet => `<br>${tweet.tweet.text}`)}</p>
  <p>These are the retweets:
  ${retweets.map(retweet => `<br><b>Author</b>: ${retweet.retweeted_status.user.screen_name}<br>
  <b>Text</b>: ${retweet.retweeted_status.text}`)}</p>
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

module.exports = { sendDailyMail }