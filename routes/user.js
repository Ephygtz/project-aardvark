var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.route('/sign-up')
      .get(function(req, res) {
        res.render('users/sign-up');
      })

module.exports = router;
