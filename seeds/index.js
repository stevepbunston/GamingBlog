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
    const articleEntry = new Article({
        title: "Marioooooooooo",
        game: "Super Mario",
        release: 1996,
        console: "Nintendo 64",
    });
    await articleEntry.save();
}


seedDB().then(() => {
    mongoose.connection.close();
});