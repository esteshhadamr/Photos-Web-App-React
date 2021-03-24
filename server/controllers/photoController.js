const Photo = require('../models/Photo');

const createError = require('http-errors');

//Upload photo .
exports.uploadPhoto = (req, res, next) => {
    let model = new Photo({
        avatar: req.file.filename,
        description: req.body.description,
        location: req.body.location,
        author: req.user.id,
    });
    model.save()
        .then(photo => {
            res.json();
        })
        .catch(next);
};

// Get all photos
exports.allPhotos = (req, res, next) => {
    Photo.find()
        .sort({ created_at: 'desc' })
        .then(photos => {
            res.json(photos);
        })
        .catch(next);
};

// Get all photos to each user
exports.PhotosTouser = (req, res, next) => {
    Photo.find({ author: req.params.id })

        .sort({ created_at: 'desc' })
        .then(photos => {
            res.json(photos);
        })
        .catch(next);
};

//Like Photo
exports.likephoto = (req, res, next) => {
    let data = req.user.id;

    Photo.findById(req.params.photoId)
        .then(photo => {
            if (!photo) throw createError(404);
            photo.likedbyusers.push(data);
            return photo.save();
        })
        .then(photo => {
            res.json(photo);
        })
        .catch(next);
};
