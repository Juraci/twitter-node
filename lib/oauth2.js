var request = require('request');

var OAUTH2 = (function(req, proc) {
    var getEnvironmentVarValue = function(variableName) {
        if(process.env[variableName] !== undefined) {
            return process.env[variableName];
        } else {
            throw(new Error('no variable named: ' + variableName));
        }
    };
    var consumerKey = getEnvironmentVarValue('consumerKey');
    var consumerSecret = getEnvironmentVarValue('consumerSecret');
    var bearerTokenCredentials = consumerKey + ':' + consumerSecret;
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
        getBearerToken: function(callback) {
            req.post(options, function(error, response, body) {
                if(error) {
                    return callback(error);
                }
                return callback(null, JSON.parse(body).access_token, req);
            });
        }
    };

})(request, process);

module.exports = OAUTH2;
