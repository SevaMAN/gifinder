import Ember from 'ember';

export default Ember.Component.extend({
  tagName:'a',
  classNames:['thumbnail'],
  classNameBindings:['gifLoaded:success'],
  src:'',
  cl:null,
  path:null,
  gif:null,
  thumbUrl:'',
  gifUrl:'',
  isGifVisible:false,
  gifLoaded:false,
  gerSrc: function() {
    var cl = this.get('cl');
    var path = this.get('path');

    if (!this.get('thumbUrl') && this.get('isGifVisible')) {
      this.set('thumbUrl', cl.thumbnailUrl(path,{size:'l',httpCache:true}));
    }

  }.on('didInsertElement').observes('isGifVisible'),
  gerGif: function() {
    var _this = this;
    var cl = this.get('cl');
    var path = this.get('path');

    if (this.get('gifUrl')) {
      this.set('showGif', true);
    } else if (this.get('isGifVisible')) {

      var img = this.$('img.preview');
      var gif = this.$('img.gif');

      gif.css('height', img.height());
      gif.css('width', img.width());

      cl.makeUrl(path,{download:true},function (er, file) {
          gif.on('load',function () {
            gif.css('height', '');
            gif.css('width', '');
            gif.off('load');
            _this.set('gifLoaded', true);
          });
        _this.set('gifUrl', file.url);
        _this.set('showGif', true);
      });
    }

  }.on('mouseEnter'),
  backToThumb:function () {
    this.set('showGif', false);
  }.on('mouseLeave')
});
