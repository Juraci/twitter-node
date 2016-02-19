"use strict";
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);

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
        it('should propagate the bearer token to the callback function', function() {
            var request = {
                post: function(opts, callback) {
                    return callback(null, {}, JSON.stringify({access_token: 'fake_token'}));
                }
            };

            var args = {
                consumerKey: 'foo',
                consumerSecret: 'bar',
                req: request
            };

            var callback = sinon.spy();

            OAUTH2(args).getBearerToken(callback);
            expect(callback).to.have.been.calledWith(null, 'fake_token', request);
        });
    });
});
