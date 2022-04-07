const mongoose = require('mongoose');

//Schema
const { Schema } = mongoose;
const loggRetweetsSchema = new Schema({
  retweeted_status: {
    created_at: Date,
    id: Number,
    id_str: String,
    text: String,
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
});

module.exports = { loggRetweetsSchema };