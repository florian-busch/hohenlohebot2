const mongoose = require('mongoose');

//Schema
const { Schema } = mongoose;
const loggOwnTweetsSchema = new Schema({
    category: String,
    tweet: {
        created_at: Date,
        id: Number,
        text: String,
        retweet_count: Number,
        favorite_count: Number,
        favorited: Boolean,
        retweeted: Boolean,
        truncated: Boolean,
        user: {
        id: Number,
        name: String,
        screen_name: String,
        location: String,
        description: String,
        followers_count: Number,
        friends_count: Number,
        listed_count: Number,
        statuses_count: Number,
        created_at: Date,
        verified: Boolean,
        },
    },
  });

module.exports = { loggOwnTweetsSchema };