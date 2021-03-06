const User = require('../models/user');

const createError = require('http-errors');

/** Login */
exports.login = (req, res, next) => {
    const { email, password } = req.body;
    // Find user by email.
    User.findOne({ email }).then(user => {
        // if user not found or password is wrong then create error 401.
        if (!user || !user.checkPassword(password)) {
            throw new createError(401, ' Email or Password is Incorrect');
        }
        // Generate user token.
        res.json(user.signJwt());
    })
        .catch(next);
};

/** Register */
exports.register = (req, res, next) => {
    let data = { username, email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (user) throw createError(422, "This email is already exists");
            return User.create(data);
        })
        .then(user => {
            // Generate user token.
            res.json(user.signJwt());
            sendNewUser(user);
        })
        .catch(next);
};
