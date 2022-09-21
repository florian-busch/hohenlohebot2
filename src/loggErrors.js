require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOCONNECTION);

//get helpers
const {currentDateAndTime } = require('./helpers')

//get mongoose Schema for retweets
const { loggErrorSchema } = require('./schemas/loggErrorSchema');

//create mongoose model
const errorSchema = mongoose.model('errorSchema', loggErrorSchema);

const loggErrors = (error) => {
    const newError = new errorSchema({
        category: error.category,
        date: new Date(),
        message: error.message,
        tweet: error.tweet,
    });
   
    newError.save().then(response => console.log(response))
    .catch(err => loggErrors( {category: 'LoggingError', message: err } ));
};

module.exports = { loggErrors };