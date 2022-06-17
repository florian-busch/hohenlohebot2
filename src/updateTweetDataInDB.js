require('dotenv').config();
const { loggErrors } = require('./loggErrors');

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
      if (err == 'Error: No status found with that ID.') {
        loggErrors(err, 'Error updating Tweets in DB', tweetData)
      } else {
        console.log(doc)
      }
  });
};

//delete tweets in DB that can't be found on twitter anymore and logg error
const deleteTweet = async (ID, statusNotFoundError) => {
  ownTweetsSchema.findOneAndDelete( { 'tweet.id_str': ID }, function (err, doc) {
    if (err) {
      loggErrors(err, 'Error while deleting Tweet');
    } else {
      loggErrors(statusNotFoundError, 'Error: No tweet found with that ID on Twitter. DB-Entry deleted', doc.tweet)
    }
  })
};

//get IDs from own tweets (not retweets) from db
const getTweetIDsFromDB = async () => {
  let IDs = [];
  await ownTweetsSchema.find()
    .then(tweets => tweets.forEach(data => IDs.push(data.tweet.id_str)))
    .catch(err => loggErrors(err, 'Error retrieving Tweets from DB', data))

  return IDs;
};

//update data for all own tweets in db
const updateTweetData = async () => {
  //fetch tweet IDs
  const tweetIDs = await getTweetIDsFromDB();

  //for every tweet get current data then pass values to update function
  tweetIDs.forEach(ID => 
    T.get('statuses/show', { id: ID }, function (err, data, response) {
      //if no tweet is found on twitter with ID --> delete tweet from db and logg deletion with loggError
      if (err == 'Error: No status found with that ID.') {
        deleteTweet(ID, err)
      } else if (err) {
        loggErrors(err, 'Error while retrieving tweets from twitter for updateTweetData')
      } else {
        updateOneTweetInDB(data)
      };
    })
    );
};

module.exports = { updateTweetData };