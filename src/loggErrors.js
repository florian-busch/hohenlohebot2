require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOCONNECTION);

//get helpers
const {currentDateAndTime } = require('./helpers')

//get mongoose Schema for retweets
const { loggErrorSchema } = require('./schemas/loggErrorSchema');

//create mongoose model
const errorSchema = mongoose.model('errorSchema', loggErrorSchema);

const loggErrors = (err, category, tweet) => {
    const newError = new errorSchema({
        category,
        tweet,
        error: {
            date: currentDateAndTime(),
            message: err,
        },
    });
   
    newError.save().then(response => console.log(response))
    .catch(err => loggErrors(err, 'LoggingError', tweet));
};

module.exports = { loggErrors };