const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const {articleSchema} = require('./schemas.js');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
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

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

const validateArticle = (req, res, next) =>{
    const { error } = articleSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(msg, 400);
    }
    else{
        next();
    }
}

//homepage
app.get('/', (req,res) => {
    res.render('home');
});


app.get('/articles', catchAsync(async(req, res) => {
    const articles = await Article.find({})
    res.render('articles/index', {articles});
}));

//Has to go ahead of get by id or it weill be treated as id!!
app.get('/articles/new', (req, res) =>{
    res.render('articles/new');
});

app.post('/articles', validateArticle, catchAsync(async (req, res, next) =>{
        // if(!req.body.article) throw new ExpressError("Invalid Article", 400);
        const article = new Article(req.body.article);
        await article.save();
        res.redirect(`/articles/${article._id}`);
}));


app.get('/articles/:id', catchAsync(async(req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('articles/show', {article});
}));

app.get('/articles/:id/edit', catchAsync(async(req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('articles/edit', {article});
}));

app.put('/articles/:id', validateArticle, catchAsync(async(req, res) => {
    const { id } = req.params;
    const article = await Article.findByIdAndUpdate(id,{...req.body.article})
    res.redirect(`/articles/${article._id}`);
}));

app.delete('/articles/:id', catchAsync(async(req, res) =>{
    const { id } = req.params;
    await Article.findByIdAndDelete(id);
    res.redirect('/articles');
}));

app.all('*', (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
    const { statusCode= 500} = err;
    if(!err.message) err.message = "Something Went Wrong";
    res.status(statusCode).render('error', { err });
});


app.listen(3000, () => {
    console.log("Listening on port 3000");
});

