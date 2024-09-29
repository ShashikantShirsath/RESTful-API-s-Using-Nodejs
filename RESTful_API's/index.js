const express = require("express");
const app = express();
const port = 5003;
const { v4: uuidv4 } = require('uuid');
const path = require("path");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})

let users = [
    {
        id : uuidv4(),
        username : "_Shashi_01",
        caption : "Do work hard until you becomes successful", 
        following : "353k+",
        followers : "593"
    },
    {
        id : uuidv4(),
        username : "_Karan_DK",
        caption : "current situation is not the last destination", 
        following : "45M+",
        followers : "953K+"
    },
    {
        id : uuidv4(),
        username : "_Rohite_Wadile_56",
        caption : "A Good practices makes you perfect", 
        following : "232K+",
        followers : "535"
    }
]

app.get("/instagram", (req, res) => {
    res.render("index.ejs",{users});
})

// show route
app.get("/instagram/:id/show", (req, res) => {
    let {id} = req.params;
    let user = users.find((usr) => usr.id === id);
    res.render("show.ejs", {user});
});

// new route
app.get("/instagram/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/instagram", (req, res) => {
    let {username, caption, following, followers} = req.body;
    let id= uuidv4();
    users.push({id, username, caption, following, followers});
    res.redirect("/instagram");
});

// update/edit route
app.get("/instagram/:id/edit",(req, res) => {
    let {id} = req.params;
    let user = users.find((usr) => usr.id === id);
    res.render("edit.ejs", {user});
})

app.patch("/instagram/:id", (req, res) => {
    let {id} = req.params;
    let {caption, following, followers} = req.body;
    let user = users.find((p) => p.id === id);
    user.caption = caption;
    user.following = following;
    user.followers = followers;
    res.redirect("/instagram");
})

// delete route
app.delete("/instagram/:id",(req, res) => {
    let {id} = req.params;
    users = users.filter((p) => p.id != id);
    res.redirect("/instagram");
});