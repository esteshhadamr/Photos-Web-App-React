const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Define Photo Schema
const ModelSchema = new mongoose.Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    avatar: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    likedbyusers: [],

    created_at: {
        type: Date,
        default: Date.now
    }
});

// Create Photo model
const Model = mongoose.model('Photo', ModelSchema);

module.exports = Model;