require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOCONNECTION);

//get mongoose Schema for retweets
const { retweetsSchema } = require('./schemas/retweetsSchema');
const { loggErrors } = require('./loggErrors');
const { currentDateAndTime } = require('./helpers')

//create mongoose model
const retweetModel = mongoose.model('Retweets', retweetsSchema);

const loggRetweets = tweet => {
    const newRetweet = new retweetModel({
        retweeted_status: {
            created_at: currentDateAndTime(),
            id: tweet.retweeted_status.id,
            id_str: tweet.retweeted_status.id_str,
            text: tweet.retweeted_status.text,
            truncated: tweet.retweeted_status.truncated,
            user: {
                id: tweet.retweeted_status.user.id,
                id_str: tweet.retweeted_status.user.id_str,
                name: tweet.retweeted_status.user.name,
                screen_name: tweet.retweeted_status.user.screen_name,
                location: tweet.retweeted_status.user.location,
                description: tweet.retweeted_status.user.description,
                followers_count: tweet.retweeted_status.user.followers_count,
                friends_count: tweet.retweeted_status.user.friends_count,
                created_at: tweet.retweeted_status.user.created_at,
                favorites_count: tweet.retweeted_status.user.favorites_count,
                verified: tweet.retweeted_status.user.verified,
                following: tweet.retweeted_status.user.following,
            },
        },
        created_at: tweet.created_at,
        id: tweet.id,
        id_str: tweet.id_str,
        text: tweet.text,
        truncated: tweet.truncated,
        entities: tweet.entities,
        source: tweet.source,
        user: {
            name: tweet.user.name,
            followers_count: tweet.user.follower_count,
            listed_count: tweet.user.listed_count,
            favorites_count: tweet.user.favorites_count,
            statuses_count: tweet.user.statuses_count,
        },
      });
   
    newRetweet.save().then(response => console.log(response))
    .catch(err => loggErrors( {category: 'RetweetSave', message: err, tweet: tweet } ));
};

module.exports = { loggRetweets };