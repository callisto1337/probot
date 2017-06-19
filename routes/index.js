var express = require('express');
var router = express.Router();
var request = require('request');

var token = '';

router.get('/', function(req, res, next) {
    var client_id = 6081626;
    var redirect_uri = 'https://oauth.vk.com/blank.html';
    var scope = 'wall,offline,groups';
    var url = 'https://oauth.vk.com/authorize?client_id=' + client_id + '&scope=' + scope +'&redirect_uri=' + redirect_uri + '&display=page&response_type=token';
    // access_token=5647c6239aec622ae192bcf0fd3230800d99d2d78b1d4d2140bc9563dea431b12504edf0f90366923f485&expires_in=0&user_id=40828857

    res.redirect(url);
});

router.post('/', function(req, res, next) {
    res.status(200).send('ok');
    console.log(req.body);

    if (req.body.type === 'wall_post_new') {

        if (req.body.object.text === '') {
            var owner_id = req.body.object.owner_id;
            var post_id = req.body.object.id;
            var access_token = '5647c6239aec622ae192bcf0fd3230800d99d2d78b1d4d2140bc9563dea431b12504edf0f90366923f485'
            var url = 'https://api.vk.com/method/wall.delete?post_id=' + post_id + '&owner_id=' + owner_id + '&access_token=' + access_token;

            request(url, function (error, response, body) {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', body); // Print the HTML.
            });
        }
    }
});


module.exports = router;
