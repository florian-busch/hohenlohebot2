require('dotenv').config();
const Twit = require('twit');
const cron = require('node-cron');

//external functions for tweet content
const { getMuswiesenContent } = require('./muswiesenContent.js');
const { getDatabaseContent, markAsPosted } = require('./getDatabaseContent.js');

//logger functions
const  { loggRetweets } = require('./loggRetweets');
const { loggOwnTweets } = require('./loggOwnTweets.js');

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
    if(err) {
      console.log(err)
    } else {
      return blocks = data.ids}
    }
  )
};

//key words bot listens for
const phrase = "Hohenlohe,hohenlohe,#hohenlohe,#Hohenlohe,Hohenlohisch,hohenlohisch,Hohenloher,hohenloher,@hohenloheb";

//check tweet for words that should not be retweeted (returns true if one or more words are in tweet)
const blockedWords = ['alfonso', 'hubertus', 'karl'];
const checkForBlockedWords = tweet => blockedWords.some(word => tweet.toLowerCase().includes(word));
 

//listen for tweets that include phrase
let stream = T.stream('statuses/filter', { track: phrase });
stream.on('tweet', gotTweet);

//retweet tweets from users that on bots block list and whose tweets that don't contain blocked words
function gotTweet(tweet) {
  if(!blocks.includes(tweet.user.id) && !checkForBlockedWords(tweet.text)) {
    console.log('Attempting to retweet ' + tweet.id_str + ": " + tweet.text);

    T.post('statuses/retweet', { id: tweet.id_str }, retweeted);

    function retweeted(err, data, response) {
      if (err) {
        console.log("Error: " + err.message);
      } else {
        //Succesful retweet, logg retweeted Tweets to db
        loggRetweets(data)
      };
    };
    //if user is blocked
  } else {
    console.log('User ' + tweet.user.id_str + ' is blocked');
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
      console.log(err);
    } else {
      //mark tweet as posted in db and logg tweet to db
      markAsPosted(content);
      loggOwnTweets(data, category);
    }
  });
};

/*//Cron-jobs to start different
 tweets and get blocked users//*/

//get blocked users once at start and then once a day
getBlockedUsers();
cron.schedule("0 59 23 * * *", function() {
  getBlockedUsers()
});

//Muswiesentweet every tuesday at 15.33
cron.schedule("0 33 15 * * 2", function() {
  sendTweet('Muswiese');
});

//Vokabel-Tweet every wednesday, friday and sunday at 4.12 pm
cron.schedule("0 12 16 * * 3,5,7", function() {
  sendTweet('Vokabel');
});

//Spruch-Tweet every monday and thursday at 2.30 pm
cron.schedule("0 30 14 * * 1,4", function() {
  sendTweet('Spruch');
});

//exports for testing
module.exports = { checkForBlockedWords };