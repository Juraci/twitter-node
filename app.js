var express = require('express');
var OAUTH2 = require('./lib/oauth2.js');
var app = express();

app.get('/tweets/:username', function(req, response) {

    var username = req.params.username;

    OAUTH2.getBearerToken(function(err, token, reqst) {
        if (err) {
            console.log(err);
            return err;
        }

        var options = {
            url: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            qs: { screen_name: username, count: 10 },
        };

        reqst
        .get(options, function(error, resp, body) {
            var tweets = JSON.parse(body);
            var messages = [];
            tweets.forEach(function(tweet) {
                messages.push(tweet.text);
            });
            response.send(messages);
        })
        .on('error', function(error) {
            console.log(error);
        });
    });
});

app.listen(3000);
