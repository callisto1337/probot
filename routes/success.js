'use strict';

var express = require('express');
var router = express.Router();
var functions = require('./methods');

router.get('/', function(req, res, next) {
    res.render('success');
});

module.exports = router;
