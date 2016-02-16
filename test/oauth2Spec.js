var expect = require('chai').expect;

describe('OAUTH2 authentication', function() {
    var oauth2;

    beforeEach(function() {
        oauth2 = require('../lib/oauth2.js');
    });

    it('should throw an error when no request object is provided', function() {
        var args = { consumerKey: 'foo', consumerSecret: 'bar' };
        expect(function() {
            oauth2(args);
        }).to.throw(/request object not provided/);
    });

    it('should throw an error when no consumerKey is provided', function() {
        var args = { req:{} };
        expect(function () {
            oauth2(args);
        }).to.throw(/consumerKey not provided/);
    });

    it('should throw an error when no consumerSecret is provided', function() {
        var args = { req:{}, consumerKey: 'foo' };
        expect(function () {
            oauth2(args);
        }).to.throw(/consumerSecret not provided/);
    });
});