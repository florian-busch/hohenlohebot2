//get date/time in UTC
const currentDateAndTime = function createDateAsUTC() {
    const date = new Date()
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
};

module.exports = { currentDateAndTime }


// // //helper function to move tweets from old schema to new schema
// // require('dotenv').config();

// // const mongoose = require('mongoose');
// // mongoose.connect(process.env.MONGOCONNECTION);

// // //old retweet-Schema
// // const { temporaryOwnTweets } = require('./schemas/temporaryOwnTweetsSchema')
// // const { ownTweetsSchema } = require('./schemas/ownTweetsSchema');

// // const oldTweetsModel = mongoose.model('loggedOwnTweets', temporaryOwnTweets);


// // //new retweet-Schema
// // const newTweetModel = mongoose.model('ownTweets', ownTweetsSchema);

// // // save tweets to new schema
// // const saveTweetToNewSchema = tweet => {
// //     const newOwnTweet = new newTweetModel({
// //         category: tweet.category,
// //         tweet: {
// //             created_at: tweet.tweet.created_at,
// //             id: tweet.tweet.id,
// //             id_str: tweet.tweet.id_str,
// //             text: tweet.tweet.text,
// //             truncated: tweet.tweet.truncated,
// //             retweet_count: tweet.tweet.retweet_count,
// //             favorite_count: tweet.tweet.favorite_count,
// //             favorited: tweet.tweet.favorited,
// //             retweeted: tweet.tweet.retweeted,
// //             user: {
// //                 id: tweet.tweet.user.id,
// //                 id_str: tweet.tweet.user.id_str,
// //                 name: tweet.tweet.user.name,
// //                 screen_name: tweet.tweet.user.screen_name,
// //                 location: tweet.tweet.user.location,
// //                 description: tweet.tweet.user.description,
// //                 followers_count: tweet.tweet.user.followers_count,
// //                 friends_count: tweet.tweet.user.friends_count,
// //                 created_at: tweet.tweet.user.created_at,
// //                 verified: tweet.tweet.user.verified,
// //                 following: tweet.tweet.user.following,
// //             },
// //         },
// //       });
// //       newOwnTweet.save().then(response => console.log(response))
// //       console.log('DONE')
// // }

// // //get IDs from old retweets from db
// // const getTweetIDsFromDB = async () => {
// //     let IDs = [];
// //     await oldTweetsModel.find()
// //       .then(tweets => tweets.forEach(data => IDs.push(data._id)))
  
// //     return IDs;
// //   };

// // const writeTweetToDb = IDs => {
// //     IDs.forEach(ID =>  oldTweetsModel.findOne({_id: ID} ).then(data => saveTweetToNewSchema(data)))
// // }

// // //update data for all own tweets in db
// // const updateTweetData = async () => {
// //   //fetch tweet IDs from old DB
// //   const tweetIDs = await getTweetIDsFromDB();
// //   //hand over tweetIDs to
// //   writeTweetToDb(tweetIDs)

// // };

// // updateTweetData()
