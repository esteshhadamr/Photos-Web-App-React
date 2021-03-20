var express = require('express');
const User = require('../models/user');

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(422).send(err);
    })
  // res.send('respond with a resource');
});


/* GET user data. */

router.get('/:id', function (req, res, next) {
  User.findById(req.params.id)
    .then(user => {
      if (!user) throw createError(404, "User not found");
      res.json(user);
    })
    .catch(next);
});


module.exports = router;
