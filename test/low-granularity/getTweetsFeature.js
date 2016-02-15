var request = require('supertest');
var expect = require('chai').expect;


describe('GET /tweets/:username', function() {
    var server;

    beforeEach(function() {
        server = require('../../server.js')();
    });

    afterEach(function(done) {
        server.close(done);
    });

    it('returns the last 10 tweets of a given user', function(done) {
        this.timeout(10000);
        request(server)
        .get('/tweets/JuraciVieira_')
        .end(function(err, res) {
            expect(res.status).to.equal(200);
            expect(res.body.length).to.below(10);
            done();
        });
    });
});
