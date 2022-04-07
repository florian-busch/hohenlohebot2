require('dotenv').config();

//setup Twit
const Twit = require('twit');
const T = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOCONNECTION);

//get Schema from schema file
const { loggOwnTweetsSchema } = require('../schemas/loggOwnTweetsSchema');

//Model setup
const ownTweetsSchema = mongoose.model('loggedOwnTweets', loggOwnTweetsSchema);

//update tweet likes and retweets in db
const updateOneTweetInDB = tweetData => {
  const query = { 'tweet.id_str': tweetData.id_str };
  const options = { new: true }
  ownTweetsSchema.findOneAndUpdate(
    query, 
    {
      'tweet.favorite_count': tweetData.favorite_count,
      'tweet.retweet_count': tweetData.retweet_count,
    },
    options, function (err, doc) {
      if (err) {
        console.log(err)
      } else {
        console.log(doc)
      }
  });
};

//get IDs from own tweets (not retweets) from db
const getTweetIDsFromDB = async () => {
  let IDs = [];
  await ownTweetsSchema.find()
  .then(tweets => tweets.forEach(data => IDs.push(data.tweet.id_str)));

  return IDs;
};

//update data for all own tweets in db
const updateTweetData = async () => {
  //fetch tweet IDs
  const tweetIDs = await getTweetIDsFromDB();

  //for every tweet get current data then pass values to update function
  tweetIDs.forEach(ID => 
    T.get('statuses/show', { id: ID }, function (err, data, response) {
      if (err) {
        console.log(err)
      } else {
        updateOneTweetInDB(data)
      };
    })
    );
};

module.exports = { updateTweetData };