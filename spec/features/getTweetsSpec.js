describe('GET /tweets/:username', function() {
    var request = require('request');

    it('returns the last 10 tweets of a user', function(done) {
        request.get('http://localhost:3000/tweets/JuraciVieira_', function(error, response, body) {
            expect(error).toEqual(null);
            expect(response.statusCode).toEqual(200);
            expect(JSON.parse(body).length).toBeLessThan(10);
            done();
        });
    });
});
