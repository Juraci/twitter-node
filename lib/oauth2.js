"use strict";

function OAUTH2(args) {
    if(args.consumerKey === undefined) {
        throw new Error('consumerKey not provided');
    } else if(args.consumerSecret === undefined) {
        throw new Error('consumerSecret not provided');
    } else if(args.req === undefined) {
        throw new Error('request object not provided');
    }

    var request = args.req;

    var bearerTokenCredentials = args.consumerKey + ':' + args.consumerSecret;
    var encodedBearerCredentials = new Buffer(bearerTokenCredentials).toString('base64');

    var options = {
        url: 'https://api.twitter.com/oauth2/token',
        headers: {
            'Authorization': 'Basic ' + encodedBearerCredentials,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        oauth: { transport_method: 'body' },
        body: 'grant_type=client_credentials'
    };

    return {
        getBearerToken: function() {
            return new Promise(function(resolve, reject) {
                request.post(options, function(error, response, body) {
                    if(response.statusCode === 200) {
                      resolve(JSON.parse(body).access_token);
                    } else {
                      reject(error);
                    }
                });

            });
        }
    };

}

module.exports = OAUTH2;
