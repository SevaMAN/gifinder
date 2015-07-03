import Ember from 'ember';

export default Ember.Route.extend({
  actions:{
    login:function () {
      var client = new Dropbox.Client({ key: "vvf0ru33x9anjsx" });
      client.authenticate(function (error, client) {
        if (error) {
          return;
        }
        this.transitionTo('gifs');
      }.bind(this));
    }
  },
  beforeModel: function() {
    var client = new Dropbox.Client({ key: "vvf0ru33x9anjsx" });

    client.authenticate({interactive: false}, function (error, client) {
      if (error) {
        //TODO handle this
        return;
      }
      if (client.isAuthenticated()) {
        this.transitionTo('gifs');
      }
    }.bind(this));
  }
});
