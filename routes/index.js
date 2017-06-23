var express = require('express');
var router = express.Router();
var methods = require('./methods');

router.get('/', function(req, res, next) {
    methods.app_auth(req, res);
});

router.post('/', function(req, res, next) {
    res.send('ok');
    var owner_id = req.body.object.owner_id;
    var post_id = req.body.object.id;
    var signed = 1;
    var access_token = '';

    if (req.body.type === 'wall_post_new' && req.body.object.post_type === 'suggest') {
        if (req.body.object.text === '') {
            methods.post_del(post_id, owner_id, access_token);
        }
        else {
            methods.post_publish(post_id, owner_id, access_token, signed);
        }
    }
});

module.exports = router;
