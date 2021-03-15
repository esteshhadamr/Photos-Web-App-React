const express = require('express');
const router = express.Router();

const controller = require('../controllers/photoController');

const auth = require('../middlewares/auth');
const path = require('path');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

// Upload photo middleware.
const upload = multer({
    limits: { fileSize: 1024 * 1024 },
    storage: storage,
    fileFilter: (req, file, cb) => {
        let fileTypes = /jpeg|jpg|png/;
        let mimeType = fileTypes.test(file.mimetype);
        let extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (mimeType && extname) return cb(null, true);
        cb(new Error('Uploading of this file is not allowed,Only. jpeg|jpg|png  '));
    },
});

// upload photo.
router.post('/', [auth.authenticated, upload.single('avatar')], controller.uploadPhoto);

//Get All Photos
router.get('/', controller.allPhotos);


//Get All Photos to each user
router.get('/:id', controller.PhotosTouser);

//Delete Photo
router.delete('/:id', controller.delete);

module.exports = router;