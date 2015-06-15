NoisyNimbus.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.users = new NoisyNimbus.Collections.Users();
    this.songs = new NoisyNimbus.Collections.Songs();
    this.playlists = new NoisyNimbus.Collections.Playlists();
  },

  routes:{
    '': 'songsIndex',
    'explore': 'songsExplore',
    'upload': 'songsUpload',
    'playlists/new': 'playlistNew',
    'playlists': 'playlistsIndex',
    'playlists/:id': 'playlistShow',
    'playlists/:id/edit': 'playlistEdit',
    'users/:id': 'userShow'
  },

  playlistEdit: function (id) {
    var playlist = this.playlists.getOrFetch(id);
    var view = new NoisyNimbus.Views.PlaylistForm({ model: playlist, collection: this.playlists });
    this._swapView(view);
  },

  playlistsIndex: function () {
    this.playlists.fetch();
    var view = new NoisyNimbus.Views.PlaylistsIndex({ collection: this.playlists });
    this._swapView(view);
  },

  playlistNew: function () {
    var playlist = new NoisyNimbus.Models.Playlist();
    var view = new NoisyNimbus.Views.PlaylistForm({ model: playlist, collection: this.playlists });
    this._swapView(view);
  },

  playlistShow: function (id) {
    var playlist = new NoisyNimbus.Models.Playlist({ id: id });
    playlist.fetch();
    var view = new NoisyNimbus.Views.PlaylistShow({ model: playlist });
    this._swapView(view);
  },

  songsExplore: function () {
    var exploreSongs = new NoisyNimbus.Collections.ExploreSongs();
    exploreSongs.fetch();
    var view = new NoisyNimbus.Views.ExploreSongs({ collection: exploreSongs });
    this._swapView(view);
  },

  songsIndex: function () {
    this.songs.fetch();
    var view = new NoisyNimbus.Views.SongsIndex({ collection: this.songs });
    this._swapView(view);
  },

  songsUpload: function () {
    var song = new NoisyNimbus.Models.Song();
    var view = new NoisyNimbus.Views.SongsUpload({ model: song, collection: this.songs });
    this._swapView(view);
  },

  userShow: function (id) {
    var user = this.users.getOrFetch(id);
    var view = new NoisyNimbus.Views.UserShow({ model: user });
    this._swapView(view);
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
