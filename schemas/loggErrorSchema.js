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
      created_at: Date,
      user: {
        screen_name: String,
        description: String,
      }
    },
    error: {
        date: Date,
        message: String,
    }
  });

module.exports = { loggErrorSchema };