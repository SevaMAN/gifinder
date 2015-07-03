import Ember from 'ember';
/* global Dropbox */

export default Ember.Route.extend({
  beforeModel: function() {
    var client = new Dropbox.Client({ key: "vvf0ru33x9anjsx" });

    client.authenticate({interactive: false}, function (error, client) {
      if (error) {
        //TODO handle this
        return;
      }
      if (client.isAuthenticated()) {
        this.set('dropboxClient',client);
      } else {
        this.transitionTo('login');
      }
    }.bind(this));
  },
  model:function () {
    var client = this.get('dropboxClient');
    return new Ember.RSVP.Promise(function (resolve, reject) {
      if (!client) {
        reject({});
      };
      client.stat('Public/answgif',{readDir:true},function (error, data, contents){
        if (error) {
          reject(error);
        }
        resolve(contents);
      });
    });
  },
  setupController:function (c, m) {
    c.set('model',m);
    c.set('dbClient',this.get('dropboxClient'));
  }
});
