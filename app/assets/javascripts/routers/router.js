NoisyNimbus.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.users = new NoisyNimbus.Collections.Users();
    this.songs = new NoisyNimbus.Collections.Songs();
    this.playlists = new NoisyNimbus.Collections.Playlists();
    this.songTags = new NoisyNimbus.Collections.Tags();
  },

  routes:{
    '': 'songsIndex',
    'explore': 'songsExplore',
    'upload': 'songsUpload',
    'playlists/new': 'playlistNew',
    'playlists': 'playlistsIndex',
    'playlists/:id': 'playlistShow',
    'playlists/:id/edit': 'playlistEdit',
    'tags/:id': 'tagShow',
    'songs/:artist': 'songsByArtist',
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
    var playlist = this.playlists.getOrFetch(id);
    var view = new NoisyNimbus.Views.SongsIndex({
      model: playlist,
      collection: playlist.songs(),
      template: JST['playlists/show'],
      subview: NoisyNimbus.Views.PlaylistSongItem
      });
    this._swapView(view);
  },

  songsByArtist: function () {
  },

  songsExplore: function () {
    var exploreSongs = new NoisyNimbus.Collections.ExploreSongs();
    exploreSongs.fetch();
    this.playlists.fetch();
    var view = new NoisyNimbus.Views.SongsIndex({
      collection: exploreSongs,
      playlists: this.playlists,
      template: JST['songs/explore']
      });
    this._swapView(view);
  },

  songsIndex: function () {
    this.songs.fetch();
    this.playlists.fetch();
    var view = new NoisyNimbus.Views.SongsIndex({
      collection: this.songs,
      playlists: this.playlists,
      template: JST['songs/index']
      });
    this._swapView(view);
  },

  songsUpload: function () {
    var song = new NoisyNimbus.Models.Song();
    var view = new NoisyNimbus.Views.SongsUpload({ model: song, collection: this.songs });
    this._swapView(view);
  },

  tagShow: function (id) {
    var tag = this.songTags.getOrFetch(id);
    this.playlists.fetch();
    var view = new NoisyNimbus.Views.SongsIndex({
      collection: tag.songs(),
      model: tag,
      playlists: this.playlists,
      template: JST['tags/show']
      });
    this._swapView(view);
  },

  userShow: function (id) {
    var user = this.users.getOrFetch(id);
    this.playlists.fetch();
    var view = new NoisyNimbus.Views.UserShow({
      model: user,
      playlists: this.playlists
    });
    this._swapView(view);
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
