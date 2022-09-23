require('dotenv').config();
const { loggErrors } = require('./loggErrors');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOCONNECTION);

//get mongoose Schema for retweets
const { ownTweetsSchema } = require('./schemas/ownTweetsSchema');

const { currentDateAndTime } = require('./helpers')

//create mongoose model
const ownTweetsModel = mongoose.model('ownTweets', ownTweetsSchema);

const loggOwnTweets = (tweet, category) => {
    const newOwnTweet = new ownTweetsModel({
        category: category,
        tweet: {
            created_at: currentDateAndTime(),
            id: tweet.id,
            id_str: tweet.id_str,
            text: tweet.text,
            source: tweet.source,
            truncated: tweet.truncated,
            in_reply_to_status_id: tweet.in_reply_to_status_id,
            in_reply_to_status_id_str: tweet.in_reply_to_status_id_str,
            in_reply_to_user_id: tweet.in_reply_to_user_id,
            in_reply_to_user_id_str: tweet.in_reply_to_user_id_str,
            in_reply_to_screen_name: tweet.in_reply_to_screen_name,
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
            coordinates: tweet.coordinates,
            place: tweet.place,
            quoted_status_id: tweet.quoted_status_id,
            quoted_status_id_str: tweet.quoted_status_id_str,
            is_quote_status: tweet.is_quote_status,
            quoted_status: tweet.quoted_status,
            retweeted_status: tweet.retweeted_status,
            quote_count: tweet.quote_count,
            reply_count: tweet.reply_count,
            retweet_count: tweet.retweet_count,
            favorite_count: tweet.favorite_count,
            entities: tweet.entities,
            extended_entities: tweet.extended_entities,
            favorited: tweet.favorited,
            retweeted: tweet.retweeted,
            possibly_sensitive: tweet.possibly_sensitive,
            filter_level: tweet.filter_level,
            lang: tweet.lang,
            matching_rules: tweet.matching_rules,
        },
    });
   
    newOwnTweet.save().then(response => console.log(response))
    .catch(err => loggErrors( {category: 'SaveTweetToDB', message: err, tweet: tweet } ));
};

module.exports = { loggOwnTweets };