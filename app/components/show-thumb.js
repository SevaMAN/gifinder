import Ember from 'ember';

export default Ember.Component.extend({
  tagName:'a',
  classNames:['thumbnail'],
  //classNameBindings:['thumbnail'],
  src:'',
  cl:null,
  path:null,
  thumbUrl:'',
  gifUrl:'',
  gerSrc: function() {
    var cl = this.get('cl');
    var path = this.get('path');

    if (!this.get('thumbUrl')) {
      this.set('thumbUrl', cl.thumbnailUrl(path,{size:'l',httpCache:true}));
    }

  }.on('didInsertElement'),
  gerGif: function() {
    var _this = this;
    var cl = this.get('cl');
    var path = this.get('path');

    if (this.get('gifUrl')) {
      this.set('showGif', true);
    } else {

      debugger

    var el = this.$();
    var img = this.$('img.preview');
    var gif = this.$('img.gif');
      gif.css('height', img.height());
      gif.css('width', img.width());




    cl.makeUrl(path,{download:true},function (er, file, stat) {
        gif.on('load',function () {
          gif.css('height', '');
          gif.css('width', '');
          gif.off('load')
        });
      _this.set('gifUrl', file.url);
      _this.set('showGif', true);
    })
    }

  }.on('mouseEnter'),
  backToThumb:function () {
    this.set('showGif', false);
  }.on('mouseLeave')
});
