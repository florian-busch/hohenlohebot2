require('dotenv').config();
const { loggErrors } = require('./loggErrors');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOCONNECTION);

//get mongoose Schema for retweets
const { ownTweetsSchema } = require('./schemas/ownTweetsSchema');

const { currentDateAndTime } = require('./helpers')

//create mongoose model
const ownTweetsModel = mongoose.model('loggedOwnTweets', ownTweetsSchema);

const loggOwnTweets = (tweet, category) => {
    const newOwnTweet = new ownTweetsModel({
        category: category,
        tweet: {
            created_at: currentDateAndTime(),
            id: tweet.id,
            id_str: tweet.id_str,
            text: tweet.text,
            retweet_count: tweet.retweet_count,
            favorite_count: tweet.favorite_count,
            favorited: tweet.favorited,
            retweeted: tweet.retweeted,
            truncated: tweet.truncated,
            user: {
                id: tweet.user.id,
                id_str: tweet.user.id_str,
                name: tweet.user.name,
                screen_name: tweet.user.screen_name,
                location: tweet.user.location,
                description: tweet.user.description,
                followers_count: tweet.user.followers_count,
                friends_count: tweet.user.friends_count,
                listed_count: tweet.user.listed_count,
                statuses_count: tweet.user.statuses_count,
                created_at: tweet.user.created_at,
                verified: tweet.user.verified,
            },
        },
    });
   
    newOwnTweet.save().then(response => console.log(response))
    .catch(err => loggErrors( {category: 'SaveTweetToDB', message: err, tweet: tweet } ));
};

module.exports = { loggOwnTweets };