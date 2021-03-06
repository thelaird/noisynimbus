NoisyNimbus.Views.SongsIndex = Backbone.CompositeView.extend({

  initialize: function (options) {
    this.playlists = options.playlists;
    this.template = options.template || JST['songs/index'];
    this.subview = options.subview || NoisyNimbus.Views.SongItem;
    this.addSongs();
    this.listenTo(this.collection, 'add', this.addSong);
    this.listenTo(this.collection, 'remove', this.removeSong);
    setTimeout( function () {
      $('.song-items-initial').removeClass('song-items-initial');
    }, 100);
  },

  render: function () {
    var content = this.template({ songs: this.collection });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addSongs: function () {
    this.collection.each( function (song) {
      this.addSong(song);
    }, this);
  },

  addSong: function (song) {
    var subview = new this.subview({ model: song,
      playlists: this.playlists });
    this.addSubview('.song-items', subview);
  },

  removeSong: function (song) {
    this.removeModelSubview('.song-items', song);
  }
});
