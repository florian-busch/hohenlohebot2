//get date/time in UTC
const currentDateAndTime = function createDateAsUTC() {
    const date = new Date()
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
};

module.exports = { currentDateAndTime }


// // //helper function to move retweets from old schema to new schema
// // require('dotenv').config();

// // const mongoose = require('mongoose');
// // mongoose.connect(process.env.MONGOCONNECTION);

// // //old retweet-Schema
// // const { temporaryRetweets } = require('./schemas/temporaryRetweetsSchema');
// // const { retweetSchema } = require('./schemas/retweetsSchema');

// // const oldReweetsModel = mongoose.model('loggedretweets', temporaryRetweets);


// // //new retweet-Schema
// // const newRetweetModel = mongoose.model('Retweets', retweetSchema);

// // // save tweets to new schema
// // const saveTweetToNewSchema = tweet => {
// //     const newRetweet = new newRetweetModel({
// //         retweeted_status: {
// //             created_at: tweet.retweeted_status.created_at,
// //             id: tweet.retweeted_status.id,
// //             id_str: tweet.retweeted_status.id_str,
// //             text: tweet.retweeted_status.text,
// //             truncated: tweet.retweeted_status.truncated,
// //             user: {
// //                 id: tweet.retweeted_status.user.id,
// //                 id_str: tweet.retweeted_status.user.id_str,
// //                 name: tweet.retweeted_status.user.name,
// //                 screen_name: tweet.retweeted_status.user.screen_name,
// //                 location: tweet.retweeted_status.user.location,
// //                 description: tweet.retweeted_status.user.description,
// //                 followers_count: tweet.retweeted_status.user.followers_count,
// //                 friends_count: tweet.retweeted_status.user.friends_count,
// //                 created_at: tweet.retweeted_status.user.created_at,
// //                 verified: tweet.retweeted_status.user.verified,
// //                 following: tweet.retweeted_status.user.following,
// //             },
// //         },
// //         created_at: tweet.created_at,
// //         id: tweet.id,
// //         id_str: tweet.id_str,
// //         text: tweet.text,
// //       });
// //       newRetweet.save().then(response => console.log(response))
// //       console.log('DONE')
// // }

// // //get IDs from old retweets from db
// // const getTweetIDsFromDB = async () => {
// //     let IDs = [];
// //     await oldReweetsModel.find()
// //       .then(tweets => tweets.forEach(data => IDs.push(data._id)))
  
// //     return IDs;
// //   };

// // const writeTweetToDb = IDs => {
// //     IDs.forEach(ID =>  oldReweetsModel.findOne({_id: ID} ).then(data => saveTweetToNewSchema(data)))
// // }

// // //update data for all own tweets in db
// // const updateTweetData = async () => {
// //   //fetch tweet IDs from old DB
// //   const tweetIDs = await getTweetIDsFromDB();
// //   //hand over tweetIDs to
// //   writeTweetToDb(tweetIDs)

// // };

// // updateTweetData()
