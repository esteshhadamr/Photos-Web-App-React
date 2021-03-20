const User = require('../models/user');

const createError = require('http-errors');
const jwt = require('jsonwebtoken');

// LoggedIn Middleware

// Authenticated LoggedIn
exports.authenticated = (req, res, next) => {
    let token = req.headers['authorization'];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return next(createError(401));
        User.findById(decoded.id).then(user => {
            if (!user) throw createError(401);
            req.user = user;
            next();
        }).catch(next);
    });
};
// Authenticated Guest
exports.guest = (req, res, next) => {
    let token = req.headers['authorization'];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return next();
        throw createError(403);
    });
};
