// require('dotenv').config();

// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// module.exports = app;

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
// const registerRouter = require('./routes/auth');

// Express Application
const app = express();

//Express Middleware's
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth', authRouter);

// app.use('/api/account', require('./routes/account'));

//Errors handling
app.use((err, req, res, next) => {
    if (err.name === 'MongoError' || err.name === 'ValidationError' || err.name === 'CastError') {
        err.status = 422;
    }
    if (req.get('accept').includes('json')) {
        res.status(err.status || 500).json({ message: err.message || 'some error eccured.' });
    } else {
        res.status(err.status || 500).sendFile(path.join(__dirname, 'public', 'index.html'));
    }
});

// Connect to mongodb
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useCreateIndex: true }, err => {
    if (err) throw err;
    console.log('Connected successfully');

});

module.exports = app;
