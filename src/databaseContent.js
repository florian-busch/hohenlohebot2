require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOCONNECTION);

//get Schema from schema file
const textSchema = require('../schemas/textSchema');

//Model setup
const Text = mongoose.model('Text', textSchema.textSchema);

//mark texts as already posted after they got tweeted
async function markAsPosted (doc) {
  return await Text.updateOne( { _id: doc._id }, { already_posted: true, posted: new Date() })
};

//get content for tweets from database based on category of tweet (vokabel or spruch)
const getContentFromDatabase = async category => {
  const doc = await Text.findOne({ category: `${category}`, already_posted: false });
    if (category == undefined) {
      return 'No document found';
    } else {
      return doc
    }
};

module.exports = { getContentFromDatabase, markAsPosted };



// // helper function to new vokabel or spruch to database (import data before use)
// data.data.forEach(el => {
//   const textchen = new Text({ text: el.text, category: el.category, already_posted: false })
//   textchen.save().then(response => console.log(response))
// });
