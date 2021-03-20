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

//Like photo
///* exports.Photolike = (req, res, next) => {
//     Photo.findByIdAndUpdate(req.params.id, {
//         likes: likes + 1,
//         { $push: { friends: friend }

//     }
//         .sort({ created_at: 'desc' })
//         .then(photos => {
//             res.json(photos);
//         })
//         .catch(next);
// };
//      

exports.delete = (req, res, next) => {
    Photo.remove(req.params.id)
        .then(deleted => {
            if (!deleted) throw createError(404, "Photo not found.");
            res.json({ message: "Photo has been deleted" });
        })
        .catch(next);
};

