require('dotenv').config();
const Twit = require('twit');
const cron = require('node-cron');

//external functions for tweet content
const { getMuswiesenContent } = require('./muswiesenContent.js');
const { getDatabaseContent, markAsPosted } = require('./getDatabaseContent.js');

//logger functions
const  { loggRetweets } = require('./loggRetweets');
const { loggOwnTweets } = require('./loggOwnTweets.js');
const { loggErrors } = require('./loggErrors.js');

//daily statistics mail
const { sendDailyMail } = require('./mailer');

//function for updating tweet data in database (likes and retweets)
const { updateTweetData } = require('./updateTweetDataInDB')

//setup Twit
const T = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

//get list of blocked users -> will be checked before retweeting
let blocks = [];
const getBlockedUsers = () => {
  T.get('blocks/ids', function (err, data, response) {
    if (err) {
      console.log(err)
    } else {
      return blocks = data.ids}
    }
  )
};

//check tweet for words that should not be retweeted (returns true if one or more words are in tweet)
const blockedWords = process.env.BLOCKEDWORDS
//split blockedWords to turn string into array
const checkForBlockedWords = tweet => blockedWords.split(',').some(word => tweet.toLowerCase().includes(word));
 

//key words bot listens for
const retweetTriggers = process.env.RETWEETTRIGGERS;
//listen for tweets that include retweetTriggers
let stream = T.stream('statuses/filter', { track: retweetTriggers });
stream.on('tweet', gotTweet);

//retweet tweets from users that on bots block list and whose tweets that don't contain blocked words
function gotTweet(tweet) {
  if(!blocks.includes(tweet.user.id) && !checkForBlockedWords(tweet.text)) {
    T.post('statuses/retweet', { id: tweet.id_str }, retweeted);

    function retweeted(err, data, response) {
      if (err) {
        console.log(err);
      } else {
        //Succesful retweet, logg retweet to db
        loggRetweets(data)
      };
    };
    //if user is blocked or tweet contains blocked word
  } else {
    console.log('User is blocked or tweet contains blocked word');
  }
};
console.log('Bot listening');

//function for tweeting Muswiesentweet, Sprüche and Vokabeln
const sendTweet = async category => {
  let content = '';
  if (category == 'Muswiese') {
    content = await getMuswiesenContent();
  } else if (category == 'Vokabel' || category == 'Spruch') {
    content = await getDatabaseContent(category);
  } else {
    console.log('Error: No valid content category');
  };

  //Send content in tweet, mark content as posted in database afterwards and logg content to db
  T.post('statuses/update', { status: content.text }, (err, data, response) => {
      if (err) {
        tweet = {
          text: content.text
        }
        loggErrors(err, 'TweetPost', tweet)
      } else {
        //mark tweet as posted in db and logg tweet to db
        markAsPosted(content);
        loggOwnTweets(data, category);
      }
    })
};

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

//Muswiesentweet every tuesday, thursday and saturday
cron.schedule("0 33 16 * * 2,4,6", function() {
    sendTweet('Muswiese');
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

//exports for testing
module.exports = { checkForBlockedWords };