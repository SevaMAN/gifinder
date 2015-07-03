import Ember from 'ember';

export default Ember.Controller.extend({
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
