const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Article = require('./models/article');
const article = require('./models/article');

mongoose.connect('mongodb://localhost:27017/gaming-blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//homepage
app.get('/', (req,res) => {
    res.render('home');
});


app.get('/articles', async(req, res) => {
    const articles = await Article.find({})
    res.render('articles/index', {articles});
});

app.get('/articles/:id', async(req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('articles/show', {article});
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
