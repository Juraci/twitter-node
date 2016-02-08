var request = require('request');
var consumerKey = getEnvironmentVarValue('consumerKey');
var consumerSecret = getEnvironmentVarValue('consumerSecret');

function getEnvironmentVarValue(variableName) {
    if(process.env[variableName] !== undefined) {
        return process.env[variableName];
    } else {
        throw(new Error('no variable named: ' + variableName));
    }
}

var bearerTokenCredentials = consumerKey + ':' + consumerSecret;

console.log(consumerKey);
console.log(consumerSecret);

var result = new Buffer(bearerTokenCredentials).toString('base64');
console.log(result);

var options = {
    url: 'https://api.twitter.com/oauth2/token',
    headers: {
        'Authorization': 'Basic ' + result,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    oauth: { transport_method: 'body' },
    body: 'grant_type=client_credentials'
};

request.post(options, function(error, response, body) {
    console.log(error);
    console.log(response.statusCode);
    console.log(body);
});
