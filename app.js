require('dotenv').config();
const express = require("express");
const connectDB = require("./db/db");
const router = require('./routes/route');
const path = require('path');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));


app.use(flash());


app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});


app.use('/', router);


const port = process.env.PORT;

connectDB()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(port, () => {
            console.log(`App is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error("Unable to connect to database:", error);
    });
