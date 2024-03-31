const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  
    title: String,
    game: String,
    image: String,
    release: String,
    console: String,
    blog: String

});

module.exports = mongoose.model('Article', ArticleSchema);