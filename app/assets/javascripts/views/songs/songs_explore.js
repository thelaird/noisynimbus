NoisyNimbus.Views.ExploreSongs = Backbone.CompositeView.extend({
  template: JST['songs/explore'],

  initialize: function (options) {
    this.playlists = options.playlists;
    this.addSongs();
    this.listenTo(this.collection, 'add', this.addSong);
  },

  render: function () {
    var content = this.template();
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
    var subview = new NoisyNimbus.Views.SongItem({ model: song,
      playlists: this.playlists });
    this.addSubview('.song-items', subview);
  }
});
