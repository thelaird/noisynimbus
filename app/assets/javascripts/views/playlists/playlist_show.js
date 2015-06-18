NoisyNimbus.Views.PlaylistShow = Backbone.CompositeView.extend({
  template: JST['playlists/show'],

  initialize: function (options) {
    this.addSongs();
    this.listenTo(this.model.songs(), 'add', this.addSong);
    this.listenTo(this.model.songs(), 'remove', this.removeSong);
    this.listenTo(NoisyNimbus.globalEvents, 'nextSong', this.playNext);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addSongs: function () {
    this.model.songs().each( function (song) {
      this.addSong(song);
    }, this);
  },

  addSong: function (song) {
    var subview = new NoisyNimbus.Views.PlaylistSongItem({ model: song });
    this.addSubview('.song-items', subview);
  },

  playNext: function (song) {
    console.log("Now playing: " + song.escape('artist') + " - " + song.escape('title'));
  },

  removeSong: function (song) {
    this.removeModelSubview('.song-items', song);
  }
});
