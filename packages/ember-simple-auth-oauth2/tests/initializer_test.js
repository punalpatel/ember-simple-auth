import initializer from 'ember-simple-auth-oauth2/initializer';
import Authenticator from 'ember-simple-auth-oauth2/authenticators/oauth2';
import Authorizer from 'ember-simple-auth-oauth2/authorizers/oauth2';

describe('the "ember-simple-auth-oauth2" initializer', function() {
  it('has the correct name', function() {
    expect(initializer.name).to.eq('ember-simple-auth-oauth2');
  });

  it('runs before the "ember-simple-auth" initializer', function() {
    expect(initializer.before).to.eq('ember-simple-auth');
  });

  describe('the initialize method', function() {
    beforeEach(function() {
      this.container = { register: function() {} };
      sinon.spy(this.container, 'register');
    });

    it('registers the authorizer with the Ember container', function() {
      initializer.initialize(this.container);
      var spyCall = this.container.register.getCall(0);

      expect(spyCall.args[0]).to.eql('ember-simple-auth-authorizer:oauth2-bearer');
      expect(spyCall.args[1]).to.eql(Authorizer);
    });

    it('registers the authenticator with the Ember container', function() {
      initializer.initialize(this.container);

      var spyCall = this.container.register.getCall(1);

      expect(spyCall.args[0]).to.eql('ember-simple-auth-authenticator:oauth2-password-grant');
      expect(spyCall.args[1]).to.eql(Authenticator);
    });
  });
});
