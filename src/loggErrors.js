require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOCONNECTION);

//get mongoose Schema for retweets
const { loggErrorSchema } = require('../schemas/loggErrorSchema');

//create mongoose model
const errorSchema = mongoose.model('errorSchema', loggErrorSchema);

const loggErrors = (err, category) => {
    const newError = new errorSchema({
        category: category,
        error: {
            date: new Date(),
            message: err,
        },
    });
   
    newError.save().then(response => console.log(response));
};

module.exports = { loggErrors };