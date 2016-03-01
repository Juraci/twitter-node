var makeServer = function() {
    var request = require('request');
    var express = require('express');
    var cors = require('cors');
    var app = express();

    var corsOptions = {
        origin: 'http://localhost:8080',
        methods: 'GET'
    };

    var args = {
        req: request,
        consumerKey: process.env.consumerKey,
        consumerSecret: process.env.consumerSecret
    };

    var OAUTH2 = require('./lib/oauth2.js')(args);

    app.get('/tweets/:username', cors(corsOptions), function(req, response, next) {
        console.log('request received!');
        var username = req.params.username;

        OAUTH2.getBearerToken()
        .then(function(token) {
            var options = {
                url: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                qs: { screen_name: username, count: 10 },
            };

            request
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
        })
        .catch(function(err) {
            console.log(err);
        });
    });

    var server = app.listen(3000, function() {
         console.log('server listening');
    });
    return server;
};

module.exports = makeServer;
