require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOCONNECTION);

//get mongoose Schema for retweets
const loggRetweetsSchema = require('./schemas/loggRetweetsSchema');
const { loggErrors } = require('./loggErrors');
const { currentDateAndTime } = require('./helpers')

//create mongoose model
const retweetModel = mongoose.model('loggedRetweets', loggRetweetsSchema.loggRetweetsSchema);

const loggRetweets = data => {
    const newRetweet = new retweetModel({
        retweeted_status: {
            created_at: currentDateAndTime(),
            id: data.retweeted_status.id,
            id_str: data.retweeted_status.id_str,
            text: data.retweeted_status.text,
            user: {
                id: data.retweeted_status.user.id,
                id_str: data.retweeted_status.user.id_str,
                name: data.retweeted_status.user.name,
                screen_name: data.retweeted_status.user.screen_name,
                location: data.retweeted_status.user.location,
                description: data.retweeted_status.user.description,
                followers_count: data.retweeted_status.user.followers_count,
                friends_count: data.retweeted_status.user.friends_count,
                created_at: data.retweeted_status.user.created_at,
                favorites_count: data.retweeted_status.user.favorites_count,
                verified: data.retweeted_status.user.verified,
                following: data.retweeted_status.user.following,
            },
        },
      });
   
    newRetweet.save().then(response => console.log(response))
    .catch(err => loggErrors(err, 'Error saving Retweet', retweeted_status));
};

module.exports = { loggRetweets };