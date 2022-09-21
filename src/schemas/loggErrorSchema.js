const mongoose = require('mongoose');

//Schema
const { Schema } = mongoose;
const loggErrorSchema = new Schema({
  //TO DO: implement error logging for retweet fail and get blocked user fail
  category: String,
  date: Date,
  message: String,
  tweet: {
    created_at: Date,
    id: Number,
    id_str: String,
    text: String,
    retweet_count: Number,
    favorite_count: Number,
    favorited: Boolean,
    retweeted: Boolean,
    truncated: Boolean,
    user: {
      id: Number,
      id_str: String,
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
    }
  },
})

module.exports = { loggErrorSchema };