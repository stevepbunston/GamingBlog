const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  
    title: String,
    game: String,
    release: Number,
    console: String,

});

module.exports = mongoose.model('Article', ArticleSchema);