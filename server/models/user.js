
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Define User Schema.
const ModelSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

});

/** Pre save middleware before save user data*/
ModelSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 8);
    }
    next();
});

// Get user data.
ModelSchema.methods.getData = function () {
    return {
        id: this._id,
        username: this.username,
        email: this.email,
    };
};

// create user token from profile data.
ModelSchema.methods.signJwt = function () {
    let data = this.getData();
    data.token = jwt.sign(data, process.env.JWT_SECRET);
    return data;
};

// Check if password is correct.
ModelSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

//create id attribute.
ModelSchema.virtual('id').get(function () {
    return this._id.toHexString();
});


// Enable virtual attributes to id.
ModelSchema.set('toJSON', {
    virtuals: true
});

// Create User model
const Model = mongoose.model('User', ModelSchema);

module.exports = Model;