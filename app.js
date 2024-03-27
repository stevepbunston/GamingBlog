const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Article = require('./models/article');
//const article = require('./models/article');

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

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

//homepage
app.get('/', (req,res) => {
    res.render('home');
});


app.get('/articles', async(req, res) => {
    const articles = await Article.find({})
    res.render('articles/index', {articles});
});

//Has to go ahead of get by id or it weill be treated as id!!
app.get('/articles/new', (req, res) =>{
    res.render('articles/new');
});

app.post('/articles', async(req, res) =>{
    const article = new Article(req.body.article);
    await article.save();
    res.redirect(`/articles/${article._id}`);
});


app.get('/articles/:id', async(req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('articles/show', {article});
});

app.get('/articles/:id/edit', async(req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('articles/edit', {article});
});

app.put('/articles/:id', async(req, res) => {
    const { id } = req.params;
    const article = await Article.findByIdAndUpdate(id,{...req.body.article})
    res.redirect(`/articles/${article._id}`);
})


app.listen(3000, () => {
    console.log("Listening on port 3000");
});
