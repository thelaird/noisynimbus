NoisyNimbus.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.users = new NoisyNimbus.Collections.Users();
    this.users.fetch();
    this.songs = new NoisyNimbus.Collections.Songs();
  },

  routes:{
    '': 'userShow',
    'upload': 'songsUpload'
  },

  songsUpload: function () {
    var song = new NoisyNimbus.Models.Song();
    var view = new NoisyNimbus.Views.SongsUpload({ model: song, collection: this.songs });
    this._swapView(view);
  },

  userShow: function () {
    var user = this.users.getOrFetch(CURRENT_USER_ID);
    var view = new NoisyNimbus.Views.UserShow({ model: user });
    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
