const mongoose = require('mongoose');

//Schema
const { Schema } = mongoose;
const loggErrorSchema = new Schema({
    //TO DO: implement error logging for retweet fail and get blocked user fail
    category: { type: String, enum: ['Retweet', 'TweetPost', 'BlockedUser']},
    error: {
        date: Date,
        message: String,
    }
  });

module.exports = { loggErrorSchema };