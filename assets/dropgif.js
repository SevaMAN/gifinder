/* jshint ignore:start */

/* jshint ignore:end */

define('dropgif/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'dropgif/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('dropgif/components/gif-row', ['exports', 'ember', 'dropgif/mixins/in-viewport'], function (exports, Ember, inViewport) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend(inViewport['default'], {});

});
define('dropgif/components/show-thumb', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    tagName: 'a',
    classNames: ['thumbnail'],
    classNameBindings: ['gifLoaded:success'],
    src: '',
    cl: null,
    path: null,
    gif: null,
    thumbUrl: '',
    gifUrl: '',
    isGifVisible: false,
    gifLoaded: false,
    gerSrc: (function () {
      var cl = this.get('cl');
      var path = this.get('path');

      if (!this.get('thumbUrl') && this.get('isGifVisible')) {
        this.set('thumbUrl', cl.thumbnailUrl(path, { size: 'l', httpCache: true }));
      }
    }).on('didInsertElement').observes('isGifVisible'),
    gerGif: (function () {
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

        cl.makeUrl(path, { download: true }, function (er, file) {
          gif.on('load', function () {
            gif.css('height', '');
            gif.css('width', '');
            gif.off('load');
            _this.set('gifLoaded', true);
          });
          _this.set('gifUrl', file.url);
          _this.set('showGif', true);
        });
      }
    }).on('mouseEnter'),
    backToThumb: (function () {
      this.set('showGif', false);
    }).on('mouseLeave')
  });

});
define('dropgif/components/zero-clipboard', ['exports', 'ember', 'ember-cli-zero-clipboard/components/zero-clipboard'], function (exports, Ember, ZeroClipboard) {

	'use strict';

	exports['default'] = ZeroClipboard['default'];

});
define('dropgif/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('dropgif/controllers/gifs', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    grifd: (function () {
      var array = [];

      this.get('content').forEach(function (file, i) {
        if (i % 4 === 0) {
          array.push([file]);
        } else {
          array.objectAt(array.length - 1).push(file);
        }
      });

      return array;
    }).property('content.@each')
  });

});
define('dropgif/controllers/login', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
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
    grifd: (function () {
      var array = [];

      this.get('content').forEach(function (file, i) {
        if (i % 4 === 0) {
          array.push([file]);
        } else {
          array.objectAt(array.length - 1).push(file);
        }
      });

      return array;
    }).property('content.@each')
  });

});
define('dropgif/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('dropgif/initializers/app-version', ['exports', 'dropgif/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: 'App Version',
    initialize: function initialize(container, application) {
      if (!registered) {
        var appName = classify(application.toString());
        Ember['default'].libraries.register(appName, config['default'].APP.version);
        registered = true;
      }
    }
  };

});
define('dropgif/initializers/export-application-global', ['exports', 'ember', 'dropgif/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal && !window[classifiedName]) {
      window[classifiedName] = application;
    }
  }

  ;

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('dropgif/initializers/simple-auth-oauth2', ['exports', 'simple-auth-oauth2/configuration', 'simple-auth-oauth2/authenticators/oauth2', 'simple-auth-oauth2/authorizers/oauth2', 'dropgif/config/environment'], function (exports, Configuration, Authenticator, Authorizer, ENV) {

  'use strict';

  exports['default'] = {
    name: 'simple-auth-oauth2',
    before: 'simple-auth',
    initialize: function initialize(container, application) {
      Configuration['default'].load(container, ENV['default']['simple-auth-oauth2'] || {});
      container.register('simple-auth-authorizer:oauth2-bearer', Authorizer['default']);
      container.register('simple-auth-authenticator:oauth2-password-grant', Authenticator['default']);
    }
  };

});
define('dropgif/initializers/simple-auth', ['exports', 'simple-auth/configuration', 'simple-auth/setup', 'dropgif/config/environment'], function (exports, Configuration, setup, ENV) {

  'use strict';

  exports['default'] = {
    name: 'simple-auth',
    initialize: function initialize(container, application) {
      Configuration['default'].load(container, ENV['default']['simple-auth'] || {});
      setup['default'](container, application);
    }
  };

});
define('dropgif/mixins/in-viewport', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Mixin.create({
    scrollTimeout: 100,
    boundingClientRect: 0,
    windowHeight: 0,
    windowWidth: 0,

    enteredViewport: (function () {
      var rect, windowHeight, windowWidth, inViewport;
      rect = this.get('boundingClientRect');
      windowHeight = this.get('windowHeight');
      windowWidth = this.get('windowWidth');
      inViewport = rect.top >= 0 && rect.left >= 0 && rect.bottom <= windowHeight && rect.right <= windowWidth;
      console.log(inViewport);
      return inViewport;
    }).property('boundingClientRect', 'windowHeight', 'windowWidth'),

    exitedViewport: Ember['default'].computed.not('enteredViewport'),

    _updateBoundingClientRect: function _updateBoundingClientRect() {
      var el;
      el = this.$()[0];
      this.set('boundingClientRect', el.getBoundingClientRect());
    },

    _setup: (function () {
      return Ember['default'].run.scheduleOnce('afterRender', this, function () {
        this._updateBoundingClientRect();
        this.set('windowHeight', window.innerHeight || document.documentElement.clientHeight);
        this.set('windowWidth', window.innerWidth || document.documentElement.clientWidth);
      });
    }).on('didInsertElement'),

    _scrollHandler: function _scrollHandler() {
      return Ember['default'].run.debounce(this, '_updateBoundingClientRect', this.get('scrollTimeout'));
    },

    _bindScroll: (function () {
      var scrollHandler;
      scrollHandler = this._scrollHandler.bind(this);
      Ember['default'].$(document).on('touchmove.scrollable', scrollHandler);
      Ember['default'].$(window).on('scroll.scrollable', scrollHandler);
    }).on('didInsertElement'),

    _unbindScroll: (function () {
      Ember['default'].$(window).off('.scrollable');
      Ember['default'].$(document).off('.scrollable');
    }).on('willDestroyElement')
  });

});
define('dropgif/router', ['exports', 'ember', 'dropgif/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('login');
    this.route('gifs', { path: '/' });
  });

  exports['default'] = Router;

});
define('dropgif/routes/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({});

  /*  beforeModel: function (transition) {
      var client = new Dropbox.Client({ key: "vvf0ru33x9anjsx" });

      client.authenticate();

      debugger
      if (client.isAuthenticated()) {
        this.transitionTo('gifs');
      };
      

      // this.set('dropboxClient',client);
    }*/

});
define('dropgif/routes/gifs', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      var client = new Dropbox.Client({ key: 'vvf0ru33x9anjsx' });

      client.authenticate();

      this.set('dropboxClient', client);
    },
    model: function model() {
      var client = this.get('dropboxClient');
      return new Ember['default'].RSVP.Promise(function (resolve, reject) {
        client.stat('Public/answgif', { readDir: true }, function (wtf, data, contents) {
          resolve(contents);
        });
      });
    },
    setupController: function setupController(c, m) {
      c.set('model', m);
      c.set('dbClient', this.get('dropboxClient'));
    }
  });

});
define('dropgif/routes/login', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({});

  /*  beforeModel: function() {
      var client = new Dropbox.Client({ key: "vvf0ru33x9anjsx" });

      client.authenticate();

      this.set('dropboxClient',client);
    },
    model:function () {
      var client = this.get('dropboxClient');
      return new Ember.RSVP.Promise(function(resolve,reject) {
        client.stat('Public/answgif',{readDir:true},function (wtf,data,contents){
          resolve(contents);
        });
      })
    },
    setupController:function (c, m) {
      c.set('model',m);
      c.set('dbClient',this.get('dropboxClient'));
    }*/

});
define('dropgif/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","page-header");
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h1");
        var el4 = dom.createTextNode("- Псс, парень. Хочешь немного гифок? ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [0]),3,3);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('dropgif/templates/components/gif-row', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","col-md-3");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
          inline(env, morph0, context, "show-thumb", [], {"gif": get(env, context, "file"), "path": get(env, context, "file.path"), "cl": get(env, context, "dbClient"), "isGifVisible": get(env, context, "enteredViewport")});
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        var morph1 = dom.createMorphAt(fragment,2,2,contextualElement);
        dom.insertBoundary(fragment, 0);
        block(env, morph0, context, "each", [get(env, context, "row")], {"keyword": "file"}, child0, null);
        content(env, morph1, context, "yield");
        return fragment;
      }
    };
  }()));

});
define('dropgif/templates/components/show-thumb', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("img");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("img");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","caption text-right");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("small");
        dom.setAttribute(el2,"class","pull-left text-left");
        var el3 = dom.createTextNode(" ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"href","#");
        dom.setAttribute(el2,"class","btn btn-default btn-sm");
        dom.setAttribute(el2,"role","button");
        var el3 = dom.createTextNode("Link");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, element = hooks.element, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(fragment, [2]);
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [4, 1]),1,1);
        var morph1 = dom.createMorphAt(fragment,6,6,contextualElement);
        element(env, element0, context, "bind-attr", [], {"src": "gifUrl", "class": "showGif::hide :gif"});
        element(env, element1, context, "bind-attr", [], {"src": "thumbUrl", "class": "showGif:hide :preview"});
        content(env, morph0, context, "gif.name");
        content(env, morph1, context, "yield");
        return fragment;
      }
    };
  }()));

});
define('dropgif/templates/components/zero-clipboard', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("button");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, element = hooks.element, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0]);
        var morph0 = dom.createMorphAt(element0,0,0);
        element(env, element0, context, "bind-attr", [], {"class": get(env, context, "innerClass")});
        content(env, morph0, context, "label");
        return fragment;
      }
    };
  }()));

});
define('dropgif/templates/gifs', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
          inline(env, morph0, context, "gif-row", [], {"class": "row", "row": get(env, context, "row"), "dbClient": get(env, context, "dbClient")});
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        var morph1 = dom.createMorphAt(fragment,2,2,contextualElement);
        dom.insertBoundary(fragment, 0);
        block(env, morph0, context, "each", [get(env, context, "grifd")], {"keyword": "row"}, child0, null);
        content(env, morph1, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('dropgif/templates/login', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, inline = hooks.inline;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
          inline(env, morph0, context, "gif-row", [], {"class": "row", "row": get(env, context, "row"), "dbClient": get(env, context, "dbClient")});
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
        var morph1 = dom.createMorphAt(fragment,2,2,contextualElement);
        dom.insertBoundary(fragment, 0);
        block(env, morph0, context, "each", [get(env, context, "grifd")], {"keyword": "row"}, child0, null);
        content(env, morph1, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('dropgif/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('dropgif/tests/components/gif-row.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/gif-row.js should pass jshint', function() { 
    ok(true, 'components/gif-row.js should pass jshint.'); 
  });

});
define('dropgif/tests/components/show-thumb.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/show-thumb.js should pass jshint', function() { 
    ok(true, 'components/show-thumb.js should pass jshint.'); 
  });

});
define('dropgif/tests/controllers/gifs.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/gifs.js should pass jshint', function() { 
    ok(true, 'controllers/gifs.js should pass jshint.'); 
  });

});
define('dropgif/tests/controllers/login.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/login.js should pass jshint', function() { 
    ok(true, 'controllers/login.js should pass jshint.'); 
  });

});
define('dropgif/tests/helpers/resolver', ['exports', 'ember/resolver', 'dropgif/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('dropgif/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('dropgif/tests/helpers/start-app', ['exports', 'ember', 'dropgif/app', 'dropgif/router', 'dropgif/config/environment'], function (exports, Ember, Application, Router, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('dropgif/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('dropgif/tests/mixins/in-viewport.jshint', function () {

  'use strict';

  module('JSHint - mixins');
  test('mixins/in-viewport.js should pass jshint', function() { 
    ok(true, 'mixins/in-viewport.js should pass jshint.'); 
  });

});
define('dropgif/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('dropgif/tests/routes/application.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/application.js should pass jshint', function() { 
    ok(true, 'routes/application.js should pass jshint.'); 
  });

});
define('dropgif/tests/routes/gifs.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/gifs.js should pass jshint', function() { 
    ok(false, 'routes/gifs.js should pass jshint.\nroutes/gifs.js: line 17, col 7, Missing semicolon.\nroutes/gifs.js: line 5, col 22, \'Dropbox\' is not defined.\nroutes/gifs.js: line 13, col 52, \'reject\' is defined but never used.\n\n3 errors'); 
  });

});
define('dropgif/tests/routes/login.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/login.js should pass jshint', function() { 
    ok(true, 'routes/login.js should pass jshint.'); 
  });

});
define('dropgif/tests/test-helper', ['dropgif/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('dropgif/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('dropgif/tests/unit/components/gif-row-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('gif-row', 'Unit | Component | gif row', {
    // Specify the other units that are required for this test
    // needs: ['component:foo', 'helper:bar'],
    unit: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, 'preRender');

    // Renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
  });

});
define('dropgif/tests/unit/components/gif-row-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/gif-row-test.js should pass jshint', function() { 
    ok(true, 'unit/components/gif-row-test.js should pass jshint.'); 
  });

});
define('dropgif/tests/unit/components/show-thumb-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('show-thumb', 'Unit | Component | show thumb', {
    // Specify the other units that are required for this test
    // needs: ['component:foo', 'helper:bar'],
    unit: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Creates the component instance
    var component = this.subject();
    assert.equal(component._state, 'preRender');

    // Renders the component to the page
    this.render();
    assert.equal(component._state, 'inDOM');
  });

});
define('dropgif/tests/unit/components/show-thumb-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/show-thumb-test.js should pass jshint', function() { 
    ok(true, 'unit/components/show-thumb-test.js should pass jshint.'); 
  });

});
define('dropgif/tests/unit/controllers/gifs-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:gifs', {});

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('dropgif/tests/unit/controllers/gifs-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/gifs-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/gifs-test.js should pass jshint.'); 
  });

});
define('dropgif/tests/unit/controllers/login-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:login', {});

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('dropgif/tests/unit/controllers/login-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/login-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/login-test.js should pass jshint.'); 
  });

});
define('dropgif/tests/unit/mixins/in-viewport-test', ['ember', 'dropgif/mixins/in-viewport', 'qunit'], function (Ember, InViewportMixin, qunit) {

  'use strict';

  qunit.module('Unit | Mixin | in viewport');

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var InViewportObject = Ember['default'].Object.extend(InViewportMixin['default']);
    var subject = InViewportObject.create();
    assert.ok(subject);
  });

});
define('dropgif/tests/unit/mixins/in-viewport-test.jshint', function () {

  'use strict';

  module('JSHint - unit/mixins');
  test('unit/mixins/in-viewport-test.js should pass jshint', function() { 
    ok(true, 'unit/mixins/in-viewport-test.js should pass jshint.'); 
  });

});
define('dropgif/tests/unit/routes/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:application', 'Unit | Route | application', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('dropgif/tests/unit/routes/application-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/application-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/application-test.js should pass jshint.'); 
  });

});
define('dropgif/tests/unit/routes/gifs-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:gifs', 'Unit | Route | gifs', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('dropgif/tests/unit/routes/gifs-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/gifs-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/gifs-test.js should pass jshint.'); 
  });

});
define('dropgif/tests/unit/routes/login-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:login', 'Unit | Route | login', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('dropgif/tests/unit/routes/login-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/login-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/login-test.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('dropgif/config/environment', ['ember'], function(Ember) {
  var prefix = 'dropgif';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("dropgif/tests/test-helper");
} else {
  require("dropgif/app")["default"].create({"name":"dropgif","version":"0.0.0.c3003c93"});
}

/* jshint ignore:end */
//# sourceMappingURL=dropgif.map