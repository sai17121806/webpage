const express = require("express");
const app = express();
const mongoose = require("mongoose");
const data = require("./Schema");
const bcrypt = require("bcryptjs");
const database = "mongodb+srv://Sai5685:Sai568599@cluster.y3rescu.mongodb.net/MyDatabase?retryWrites=true&w=majority";
// mongoose.connect(database)
//     .then((result) => {
//         console.log("Database Connected");
//         app.listen(5000);
//     })
//     .catch((error) => {
//         console.log(error);
//     });
app.listen(5000);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("statics"));
app.get("/", (req, res) => {
    res.render("toggl", { user: "" });
});
app.get("/log-in", (req, res) => {
    res.render("LPage");
});
app.post("/log-in", (req, res) => {

    bcrypt.genSalt(10, function (err, Salt) {
        bcrypt.hash(req.body.inputPassword, Salt, function (err, hash) {
            req.body.inputPassword = hash;
        });
    });

    data.find({
        inputEmail: req.body.inputEmail,
        inputPassword: req.body.inputPassword
    })
        .then((result) => {
            res.render("toggl", { user: "Hello" });
        })
        .catch((error) => {
            res.render("toggl", { user: "Hello" });
        })
});
app.get("/sign-up", (req, res) => {
    res.render("SPage");
});
app.post("/sign-up", (req, res) => {
    const Data = new data(req.body);
    bcrypt.genSalt(10, function (err, Salt) {
        bcrypt.hash(req.body.inputPassword, Salt, function (err, hash) {
            req.body.inputPassword = hash;
            Data.save()
                .then((result) => {
                    res.render("LPage");
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    });
});
app.use((req, res) => {
    res.send("Page Doesn't Exist");
});

