var request = require('request');
var fs = require('fs');

module.exports = {
    post_del(post_id, owner_id, access_token) {
        var url = 'https://api.vk.com/method/wall.delete?post_id=' + post_id + '&owner_id=' + owner_id + '&access_token=' + access_token;
        setTimeout(function() { request(url) }, 5000);
    },

    post_publish(post_id, owner_id, access_token, signed) {
        var url = 'https://api.vk.com/method/wall.post?post_id=' + post_id + '&owner_id=' + owner_id + '&access_token=' + access_token + '&signed=' + signed;
        setTimeout(function() { request(url) }, 5000);
    },

    app_auth(req, res) {
        var client_id = 0000000;
        var redirect_uri = 'http://goodhost.online/success';
        var scope = 'wall,offline,groups';
        var url = 'https://oauth.vk.com/authorize?client_id=' + client_id + '&scope=' + scope +'&redirect_uri=' + redirect_uri + '&display=page&response_type=token';
        return res.redirect(url);
    }
};