require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOCONNECTION);

//get mongoose Schema for retweets
const { loggOwnTweetsSchema } = require('../schemas/loggOwnTweetsSchema');

//create mongoose model
const ownTweetsSchema = mongoose.model('loggedOwnTweets', loggOwnTweetsSchema);

const loggOwnTweets = (data, category) => {
    const newOwnTweet = new ownTweetsSchema({
        category: category,
        tweet: {
            created_at: data.created_at,
            id: data.id,
            text: data.text,
            retweet_count: data.retweet_count,
            favorite_count: data.favorite_count,
            favorited: data.favorited,
            retweeted: data.retweeted,
            truncated: data.truncated,
            user: {
                id: data.user.id,
                name: data.user.name,
                screen_name: data.user.screen_name,
                location: data.user.location,
                description: data.user.description,
                followers_count: data.user.followers_count,
                friends_count: data.user.friends_count,
                listed_count: data.user.listed_count,
                statuses_count: data.user.statuses_count,
                created_at: data.user.created_at,
                verified: data.user.verified,
            },
        },
    });
   
    newOwnTweet.save().then(response => console.log(response));
};

module.exports = { loggOwnTweets };