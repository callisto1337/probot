var request = require('request');
var fs = require('fs');

module.exports = {
    post_del(post_id, owner_id, access_token) {
        var url = 'https://api.vk.com/method/wall.delete?post_id=' + post_id + '&owner_id=' + owner_id + '&access_token=' + access_token;
        setTimeout(function () {
            request(url, function (error, response, body) {
                console.log('error:', error);
                console.log('statusCode:', response && response.statusCode);
                console.log('body:', body);
            });
        }, 10000);
    },

    post_publish(post_id, owner_id, access_token, signed) {
        var url = 'https://api.vk.com/method/wall.post?post_id=' + post_id + '&owner_id=' + owner_id + '&access_token=' + access_token + '&signed=' + signed;
        setTimeout(function () {
            request(url, function (error, response, body) {
                console.log('error:', error);
                console.log('statusCode:', response && response.statusCode);
                console.log('body:', body);
            });
        }, 10000);
    },

    app_auth(req, res) {
        var client_id = 6081626;
        var redirect_uri = 'https://oauth.vk.com/blank.html';
        var scope = 'wall,offline,groups';
        var url = 'https://oauth.vk.com/authorize?client_id=' + client_id + '&scope=' + scope + '&redirect_uri=' + redirect_uri + '&display=page&response_type=token';
        res.redirect(url);
    }
};