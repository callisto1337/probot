var express = require('express');
var router = express.Router();
var methods = require('./methods');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/probot');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('db started!');
});

var userSchema = mongoose.Schema({
    id: {type: Number, unique: true, required: true},
    lastPost: {type: String}
});
var User = mongoose.model('User', userSchema);


router.get('/', function (req, res, next) {
    methods.app_auth(req, res);
});

router.post('/', function (req, res, next) {
    res.send('ok');
    var user_id = req.body.object.from_id;
    var owner_id = req.body.object.owner_id;
    var post_id = req.body.object.id;
    var signed = 1;
    var access_token = '212d4d35558ee64e3760ac589601958aa9930b3c81db88acd56677b906e7d9fe16fbd4234fef54dc2ba8f';

    if (req.body.type === 'wall_post_new' && req.body.object.post_type === 'suggest') {
        User.find({id: user_id}, function (err, users) {
            if (req.body.object.text === '') {                                // Проверка наличия текста поста
                methods.post_del(post_id, owner_id, access_token);
            }
            else {
                if (users[0] !== undefined) {                                 // Сохранен ли пользователь в базу
                    if (Date.now() - users[0]['lastPost'] < 3600000) {
                        setTimeout(function () {
                            methods.post_del(post_id, owner_id, access_token);
                        }, 10000)
                    }
                    else {
                        setTimeout(function () {
                            User.findOneAndUpdate({'id': user_id}, {$set: {'lastPost': Date.now()}}, function (err, page) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    methods.post_publish(post_id, owner_id, access_token, signed);
                                }
                            });
                        }, 30000);
                    }
                }
                else {
                    var user = new User({
                        'id': user_id,
                        'lastPost': Date.now()
                    });
                    setTimeout(function () {
                        user.save(function (err, fluffy) {
                            if (err) return console.error(err);
                        });
                        methods.post_publish(post_id, owner_id, access_token, signed);
                    }, 30000);
                }
            }
        });
    }
});

module.exports = router;
