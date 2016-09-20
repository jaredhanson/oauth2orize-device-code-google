var chai = require('chai')
  , code = require('../../lib/middleware/code');


describe('middleware.code', function() {
  
  it('should be named code', function() {
    expect(code(function(){}).name).to.equal('code');
  });
  
  describe('issuing a user code', function() {
    var response, err;

    before(function(done) {
      function issue(client, scope, done) {
        if (client.id !== '812741506391-h38jh0j4fv0ce1krdkiq0hfvt6n5amrf.apps.googleusercontent.com') { return done(new Error('incorrect client argument')); }
        if (scope.length !== 2) { return done(new Error('incorrect scope argument')); }
        if (scope[0] !== 'email') { return done(new Error('incorrect scope argument')); }
        if (scope[1] !== 'profile') { return done(new Error('incorrect scope argument')); }
        return done(null, '4/4-GMMhmHCXhWEzkobqIHGG_EnNYYsAkukHspeYUk9E8', 'WWWWWWWWWWWWWWW', 'https://www.google.com/device');
      }
      
      chai.connect.use(code(issue))
        .req(function(req) {
          req.user = { id: '812741506391-h38jh0j4fv0ce1krdkiq0hfvt6n5amrf.apps.googleusercontent.com', name: 'Example' };
          req.body = { scope: 'email profile' };
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
    });
    
    it('should respond with body', function() {
      expect(response.body).to.equal('{"device_code":"4/4-GMMhmHCXhWEzkobqIHGG_EnNYYsAkukHspeYUk9E8","user_code":"WWWWWWWWWWWWWWW","verification_url":"https://www.google.com/device"}');
    });
  });
  
  describe('issuing a user code with expires in and interval', function() {
    var response, err;

    before(function(done) {
      function issue(client, scope, done) {
        if (client.id !== '812741506391-h38jh0j4fv0ce1krdkiq0hfvt6n5amrf.apps.googleusercontent.com') { return done(new Error('incorrect client argument')); }
        if (scope.length !== 2) { return done(new Error('incorrect scope argument')); }
        if (scope[0] !== 'email') { return done(new Error('incorrect scope argument')); }
        if (scope[1] !== 'profile') { return done(new Error('incorrect scope argument')); }
        return done(null, '4/4-GMMhmHCXhWEzkobqIHGG_EnNYYsAkukHspeYUk9E8', 'GQVQ-JKEC', 'https://www.google.com/device', { expires_in: 1800, interval: 5 });
      }
      
      chai.connect.use(code(issue))
        .req(function(req) {
          req.user = { id: '812741506391-h38jh0j4fv0ce1krdkiq0hfvt6n5amrf.apps.googleusercontent.com', name: 'Example' };
          req.body = { scope: 'email profile' };
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
    });
    
    it('should respond with body', function() {
      expect(response.body).to.equal('{"device_code":"4/4-GMMhmHCXhWEzkobqIHGG_EnNYYsAkukHspeYUk9E8","user_code":"GQVQ-JKEC","verification_url":"https://www.google.com/device","expires_in":1800,"interval":5}');
    });
  });
  
});
