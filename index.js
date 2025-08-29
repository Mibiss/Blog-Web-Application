import express from "express";
import bodyParser from "body-parser";

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

    tweets.push({name, tweet});

    res.render("index.ejs", {allTweets: tweets});
});

app.post("/clear", (req,res) => {
    tweets.length = 0;
    res.redirect("/");
});

app.post("/edit", (req,res) => {
    //
});

app.post("/remove", (req,res) => {
    
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});


