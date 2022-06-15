const mongoose = require('mongoose');

//Schema
const { Schema } = mongoose;
const loggErrorSchema = new Schema({
    //TO DO: implement error logging for retweet fail and get blocked user fail
    category: String,
    tweet: {
      id: String,
      is_str: String,
      text: String,
      user: {
        screen_name: String,
        location: String,
        description: String,
        followers_count: Number,
        friends_count: Number,
        created_at: Date,
        verified: Boolean,
        following: Boolean,
      }
    },
    error: {
        date: Date,
        message: String,
    }
  });

module.exports = { loggErrorSchema };