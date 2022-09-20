require('dotenv').config();
const { loggErrors } = require('./loggErrors');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOCONNECTION);

//get mongoose Schema for retweets
const { loggOwnTweetsSchema } = require('./schemas/loggOwnTweetsSchema');

const { currentDateAndTime } = require('./helpers')

//create mongoose model
const ownTweetsSchema = mongoose.model('loggedOwnTweets', loggOwnTweetsSchema);

const loggOwnTweets = (data, category) => {
    const newOwnTweet = new ownTweetsSchema({
        category: category,
        tweet: {
            created_at: currentDateAndTime(),
            id: data.id,
            id_str: data.id_str,
            text: data.text,
            retweet_count: data.retweet_count,
            favorite_count: data.favorite_count,
            favorited: data.favorited,
            retweeted: data.retweeted,
            truncated: data.truncated,
            user: {
                id: data.user.id,
                id_str: data.user.id_str,
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
   
    newOwnTweet.save().then(response => console.log(response))
    .catch(err => loggErrors(err, 'Error saving own Tweet to DB', data));
};

module.exports = { loggOwnTweets };