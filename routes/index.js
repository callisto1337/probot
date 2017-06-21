'use strict';

var express = require('express');
var router = express.Router();
var functions = require('./functions');

router.get('/', function(req, res, next) {
    functions.app_auth(req, res);
});

router.post('/', function(req, res, next) {
    res.status(200).send('ok');
    var owner_id = req.body.object.owner_id;
    var post_id = req.body.object.id;
    var access_token = 'c73d8d40d411641da58f98fee8feac471a803ed6ba6097e895d0acf8ae6d4d9da91ef56f874bd47515a1c';

    if (req.body.type === 'wall_post_new') {
        if (req.body.object.text === '') {
            functions.post_del(post_id, owner_id, access_token);
        }
    }
});

module.exports = router;
