NoisyNimbus.Views.SongShow = Backbone.CompositeView.extend({
  template: JST['songs/show'],

  initialize: function (options) {
    this.playlists = options.playlists;
    this.addSong(this.model);
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ song: this.model, playlists: this.playlists });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addSong: function (song) {
    var subview = new NoisyNimbus.Views.SongItem({ model: song,
      playlists: this.playlists });
    this.addSubview('.song-show-song', subview);
  }
});
