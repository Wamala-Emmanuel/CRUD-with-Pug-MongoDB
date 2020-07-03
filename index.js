const administrator = require("./models/administrator");

//import modules into this file
const express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    chalk = require('chalk'),
    path = require('path'),
    passport = require('passport'),
    session = require('express-session'),
    login = require("./routes/login"),
    user = require("./routes/user"),
    employee = require('./models/employee');

//Used ES6 feature `object destructuring` to assign the environment variable port
let { PORT = 4000 } = process.env;

//create `green` variable to be used to color and format specific terminal strings to color green and bold font style.
const green = chalk.bold.green;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, 'views'));
app.use(express.static("public"));

//Instead of bodyparser, use `express.json` and `express.urlencoded` bcz bodyparser is now in built in express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(session({
//     secret: 'session_secret',
//     resave: true,
//     saveUninitialized: false
// }))

app.use(passport.initialize())
passport.use(employee.createStrategy())
passport.serializeUser(employee.serializeUser())
passport.deserializeUser(employee.deserializeUser())


app.use("/login", login);
app.use("/user", user);

//mongoose.connect creates a connection to your database
mongoose.connect(
    "mongodb://localhost:27017/coronavirus",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) throw err;

        console.log(green("Successfully connected to tutorial DB"));
    }
);
// Logs out the user by destroying the session if the session is still active
app.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                throw err
            } else {
                return res.redirect('/');      //Redirects the user to the login page
            }
        })
    }
})

app.listen(PORT, () => {            //server is listening at `PORT = 4000`
    console.log(green(`listening on http://127.0.0.1:${PORT}`));
});
