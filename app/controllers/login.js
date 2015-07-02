import Ember from 'ember';
//import Dropbox from 'vendor/dropbox.js';

export default Ember.Controller.extend({
  /*actions:{
    authenticate: function() {
      debugger;

      var client = new Dropbox.Client({ key: "vvf0ru33x9anjsx" });

      client.authenticate();

      client.findByName('Photos','i_CVJ1wCmA0',function(){ 
        debugger
      })
      debugger;

      return;
      Em.$.ajax({
        url:'https://www.dropbox.com/1/oauth2/authorize',
        type:'GET',
        crossDomain: true,
        data:{
          'client_id':'vvf0ru33x9anjsx',
          'response_type':'token',
          'redirect_uri':'http://localhost:4200/login'
        },
        accepts: 'application/json',
          success: function(data) {
            debugger
          },
          error: function(er) {
            debugger
          }
      });

      var data = this.getProperties('identification', 'password');
      return this.get('session').authenticate('simple-auth-authenticator:oauth2-password-grant', data);
    }
  }*/
  grifd:function () {
    var array = [];

    this.get('content').forEach(function (file,i) {
      if ( i % 4 === 0 ) {
        array.push([file]);
      } else {
        array.objectAt(array.length-1).push(file);
      }
    });

    return array;
  }.property('content.@each')
});
