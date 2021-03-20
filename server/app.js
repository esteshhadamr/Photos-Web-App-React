require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// Express Routers.
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const photoRouter = require('./routes/photo');

// Express Application
const app = express();

//Express Middleware's
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/photos', photoRouter);

// app.use('/api/account', require('./routes/account'));

/* Errors handeling */
app.use((req, res, next) => next(createError(404)));
app.use((err, req, res, next) => {
    if (err.name == "MongoError" || err.name == "ValidationError" || err.name == "CastError") {
        err.status = 422;
    }
    res.status(err.status || 500).json({ message: err.message || "some error occurred" })
})

// Connect to mongodb
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useCreateIndex: true }, err => {
    if (err) throw err;
    console.log('Connected successfully');

});

module.exports = app;
