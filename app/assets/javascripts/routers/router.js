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
    'artist/:artist': 'songsByArtist',
    'explore': 'songsExplore',
    'playlists': 'playlistsIndex',
    'playlists/new': 'playlistNew',
    'playlists/:id': 'playlistShow',
    'playlists/:id/edit': 'playlistEdit',
    'songs/:id': 'songShow',
    'songs/:id/:edit': 'songEdit',
    'tags/:id': 'tagShow',
    'upload': 'songsUpload',
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

  songsByArtist: function (artist) {
    var songs = new NoisyNimbus.Collections.ArtistSongs({ artist: artist });
    this.playlists.fetch();
    songs.fetch().then( function () {
      var view = new NoisyNimbus.Views.SongsIndex({
        collection: songs,
        playlists: this.playlists,
        template: JST['songs/by_artist']
      });

      this._swapView(view);
    }.bind(this));
  },

  songsExplore: function () {
    var songs = new NoisyNimbus.Collections.ExploreSongs();
    songs.fetch();
    this.playlists.fetch();
    var view = new NoisyNimbus.Views.SongsIndex({
      collection: songs,
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

  songShow: function (id) {
    var song = this.songs.getOrFetch(id);
    this.playlists.fetch();
    var view = new NoisyNimbus.Views.SongShow({
      model: song,
      playlists: this.playlists
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
