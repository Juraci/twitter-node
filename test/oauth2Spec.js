var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var expect = chai.expect;
chai.use(chaiAsPromised);

describe('OAUTH2 authentication module', function() {
    var OAUTH2;

    beforeEach(function() {
        OAUTH2 = require('../lib/oauth2.js');
    });

    it('should throw an error when no request object is provided', function() {
        var args = { consumerKey: 'foo', consumerSecret: 'bar' };
        expect(function() {
            OAUTH2(args);
        }).to.throw(/request object not provided/);
    });

    it('should throw an error when no consumerKey is provided', function() {
        var args = { req:{} };
        expect(function () {
            OAUTH2(args);
        }).to.throw(/consumerKey not provided/);
    });

    it('should throw an error when no consumerSecret is provided', function() {
        var args = { req:{}, consumerKey: 'foo' };
        expect(function () {
            OAUTH2(args);
        }).to.throw(/consumerSecret not provided/);
    });

    describe('#getBearerToken', function() {
        it('should return a promise for the bearer token', function() {
            var request = {
                post: function(opts, callback) {
                    return callback(null, { statusCode: 200 }, JSON.stringify({access_token: 'fake_token'}));
                }
            };

            var args = {
                consumerKey: 'foo',
                consumerSecret: 'bar',
                req: request
            };

            return expect(OAUTH2(args).getBearerToken()).to.eventually.equal('fake_token');
        });
    });
});
