const mongoose = require('mongoose');
const Article = require('../models/article');


//COMMENTING OUT USECREATEINDEX. NOT SUPPORTED ANYMORE
mongoose.connect('mongodb://localhost:27017/gaming-blog', {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await Article.deleteMany({});
    const entry = new Article({
        title: "It's a me Mariooo",
        game: "Super Mario 64",
        image: "https://source.unsplash.com/collection/483251",
        release: 1996,
        console: "Nintendo 64",
        blog: "insert here"
    });
    await entry.save();
}


seedDB().then(() => {
    mongoose.connection.close();
});