import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const tweets = [];


app.get("/", (req, res)=>{
    res.render("index.ejs");
});

app.get("/about", (req, res)=>{
    res.render("about.ejs");
});

app.post("/Submit", (req, res) => {
    const name = req.body["name"];
    const tweet = req.body["content"];

    tweets.push({id: uuidv4(), name, tweet});

    res.render("index.ejs", {allTweets: tweets});
});

app.post("/clear", (req,res) => {
    tweets.length = 0;
    res.redirect("/");
});

app.post("/edit", (req,res) => {
    const id = req.body.id;
    const tweet = tweets.find(t => t.id === id);

    res.render("index.ejs", { allTweets: tweets, editTweet: tweet });
});

app.post("/update", (req, res) => {
    const { id, name, content } = req.body;
    const index = tweets.findIndex(t => t.id === id);

    if (index !== -1) {
        tweets[index].name = name;
        tweets[index].tweet = content;
    }

    res.render("index.ejs", { allTweets: tweets });
});

app.post("/remove", (req,res) => {
    const id = req.body.id;
    const index = tweets.findIndex(tweet => tweet.id == id);

    if (index !== -1) {
        tweets.splice(index, 1);
    }
    res.render("index.ejs", {allTweets: tweets});
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});


