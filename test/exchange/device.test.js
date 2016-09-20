var chai = require('chai')
  , device = require('../../lib/exchange/device');


describe('exchange.device', function() {
  
  it('should be named device', function() {
    expect(device(function(){}).name).to.equal('device');
  });
  
  describe('issuing an access token', function() {
    var response, err;

    before(function(done) {
      function issue(client, code, done) {
        if (client.id !== '812741506391-h38jh0j4fv0ce1krdkiq0hfvt6n5amrf.apps.googleusercontent.com') { return done(new Error('incorrect client argument')); }
        if (code !== '4/4-GMMhmHCXhWEzkobqIHGG_EnNYYsAkukHspeYUk9E8') { return done(new Error('incorrect code argument')); }
        return done(null, 'ya29.AHES6ZSuY8f6WFLswSv0HELP2J4cCvFSj-8GiZM0Pr6cgXU');
      }
      
      chai.connect.use(device(issue))
        .req(function(req) {
          req.user = { id: '812741506391-h38jh0j4fv0ce1krdkiq0hfvt6n5amrf.apps.googleusercontent.com', name: 'Example App' };
          req.body = { code: '4/4-GMMhmHCXhWEzkobqIHGG_EnNYYsAkukHspeYUk9E8' };
        })
        .end(function(res) {
          response = res;
          done();
        })
        .next(function(err) {
          console.log(err);
          console.log(err.stack);
          throw err;
        })
        .dispatch();
    });
    
    it('should respond with headers', function() {
      expect(response.getHeader('Content-Type')).to.equal('application/json');
      expect(response.getHeader('Cache-Control')).to.equal('no-store');
      expect(response.getHeader('Pragma')).to.equal('no-cache');
    });
    
    it('should respond with body', function() {
      expect(response.body).to.equal('{"access_token":"ya29.AHES6ZSuY8f6WFLswSv0HELP2J4cCvFSj-8GiZM0Pr6cgXU","token_type":"Bearer"}');
    });
  });
  
  describe('issuing an access token and refresh token', function() {
    var response, err;

    before(function(done) {
      function issue(client, code, done) {
        if (client.id !== '812741506391-h38jh0j4fv0ce1krdkiq0hfvt6n5amrf.apps.googleusercontent.com') { return done(new Error('incorrect client argument')); }
        if (code !== '4/4-GMMhmHCXhWEzkobqIHGG_EnNYYsAkukHspeYUk9E8') { return done(new Error('incorrect code argument')); }
        return done(null, '2YotnFZFEjr1zCsicMWpAA', '1/551G1yXUqgkDGnkfFk6ZbjMLMDIMxo3JFc8lY8CAR-Q');
      }
      
      chai.connect.use(device(issue))
        .req(function(req) {
          req.user = { id: '812741506391-h38jh0j4fv0ce1krdkiq0hfvt6n5amrf.apps.googleusercontent.com', name: 'Example App' };
          req.body = { code: '4/4-GMMhmHCXhWEzkobqIHGG_EnNYYsAkukHspeYUk9E8' };
        })
        .end(function(res) {
          response = res;
          done();
        })
        .next(function(err) {
          console.log(err);
          console.log(err.stack);
          throw err;
        })
        .dispatch();
    });
    
    it('should respond with headers', function() {
      expect(response.getHeader('Content-Type')).to.equal('application/json');
      expect(response.getHeader('Cache-Control')).to.equal('no-store');
      expect(response.getHeader('Pragma')).to.equal('no-cache');
    });
    
    it('should respond with body', function() {
      expect(response.body).to.equal('{"access_token":"2YotnFZFEjr1zCsicMWpAA","refresh_token":"1/551G1yXUqgkDGnkfFk6ZbjMLMDIMxo3JFc8lY8CAR-Q","token_type":"Bearer"}');
    });
  });
  
})