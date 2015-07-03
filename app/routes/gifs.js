import Ember from 'ember';
/* global Dropbox */

export default Ember.Route.extend({
  beforeModel: function() {
    var client = new Dropbox.Client({ key: "vvf0ru33x9anjsx" });

    client.authenticate();

    this.set('dropboxClient',client);
  },
  model:function () {
    var client = this.get('dropboxClient');
    return new Ember.RSVP.Promise(function (resolve) {
      client.stat('Public/answgif',{readDir:true},function (wtf,data,contents){
        resolve(contents);
      });
    });
  },
  setupController:function (c, m) {
    c.set('model',m);
    c.set('dbClient',this.get('dropboxClient'));
  }
});
