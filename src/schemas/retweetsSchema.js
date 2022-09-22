const mongoose = require('mongoose');

//Schema
const { Schema } = mongoose;
const retweetSchema = new Schema({
  created_at: Date,
  id: Number,
  id_str: String,
  text: String,
  truncated: Boolean,
  entities: Object,
  source: String,
  user: {
    name: String,
    followers_count: Number,
    listed_count: Number,
    favorites_count: Number,
    statuses_count: Number,
  },
  retweeted_status: {
    created_at: Date,
    id: Number,
    id_str: String,
    text: String,
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
      created_at: Date,
      favorites_count: Number,
      verified: Boolean,
      following: Boolean,
    },
  },
  lang: String        
});

module.exports = { retweetSchema };