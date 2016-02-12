var express = require('express');
var OAUTH2 = require('./lib/oauth2.js');
var app = express();

app.get('/tweets/:username', function(req, response) {
    console.log('request received!');
    var username = req.params.username;

    OAUTH2.getBearerToken(function(err, token, reqst) {
        if (err) {
            console.log(err);
            throw err;
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
            response.status(200).send(messages);
        })
        .on('error', function(error) {
            throw error;
        });
    });
});

app.listen(3000);
