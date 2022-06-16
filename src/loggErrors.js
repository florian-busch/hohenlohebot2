require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOCONNECTION);

//get mongoose Schema for retweets
const { loggErrorSchema } = require('../schemas/loggErrorSchema');

//create mongoose model
const errorSchema = mongoose.model('errorSchema', loggErrorSchema);

const loggErrors = (err, category, tweet) => {
    const newError = new errorSchema({
        category,
        tweet,
        error: {
            date: new Date(),
            message: err,
        },
    });
   
    newError.save().then(response => console.log(response))
    .catch(err => console.log(err));
};

module.exports = { loggErrors };