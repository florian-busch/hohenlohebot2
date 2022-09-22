require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOCONNECTION);

//get helpers
const {currentDateAndTime } = require('./helpers')

//get mongoose Schema for retweets
const { errorSchema } = require('./schemas/errorSchema');

//create mongoose model
const errorModel = mongoose.model('errorSchema', errorSchema);

const loggErrors = (error) => {
    const newError = new errorModel({
        category: error.category,
        date: currentDateAndTime(),
        message: error.message,
        tweet: error.tweet,
    });
   
    newError.save().then(response => console.log(response))
    .catch(err => loggErrors( {category: 'LoggingError', message: err } ));
};

module.exports = { loggErrors };