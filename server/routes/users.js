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

module.exports = router;
