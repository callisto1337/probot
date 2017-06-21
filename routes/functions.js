var request = require('request');
var fs = require('fs');

module.exports = {
    post_del(post_id, owner_id, access_token) {
        var url = 'https://api.vk.com/method/wall.delete?post_id=' + post_id + '&owner_id=' + owner_id + '&access_token=' + access_token;

        setTimeout(function() {
            request(url, function (error, response, body) {
                if (body === '{"response":1}') {
                    console.log('Пустой пост успешно удален!');
                }
                else {
                    console.log('error:', error);
                    console.log('statusCode:', response && response.statusCode);
                    console.log('body:', body);
                }
            });
        }, 5000);
    },

    token_create() {
        var client_id = 6081626;
        var client_secret = 'OhcHt8WXqzudOjvwUp8F';
        var redirect_uri = 'https://oauth.vk.com/blank.html';
        var url = 'https://oauth.vk.com/access_token?client_id=' + client_id + '&client_secret=' + client_secret + '&redirect_uri' + redirect_uri;

        // request(url, function (error, response, body) {
        //     console.log('error:', error);
        //     console.log('statusCode:', response && response.statusCode);
        //     console.log('body:', body);
        // });

        fs.writeFile("token.txt", "", function(error){
            if(error) {
                throw error;
            }
        });
    },

    app_auth(req, res) {
        var client_id = 6081626;
        var redirect_uri = 'https://oauth.vk.com/blank.html';
        var scope = 'wall,offline,groups';
        var url = 'https://oauth.vk.com/authorize?client_id=' + client_id + '&scope=' + scope +'&redirect_uri=' + redirect_uri + '&display=page&response_type=token';

        module.exports.token_create();
        return res.redirect(url);
    }
};