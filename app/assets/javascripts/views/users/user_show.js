NoisyNimbus.Views.UserShow = Backbone.CompositeView.extend({
  // leaving unrefactored to allow for follows from usershow

  template: JST['users/show'],

  initialize: function (options) {
    this.playlists = options.playlists;
    this.collection = this.model.songs();

    this.addSongs();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addSong);
    this.listenTo(this.collection, 'remove', this.removeSong);
    setTimeout( function () {
      $('.song-items-initial').removeClass('song-items-initial');
    }, 100);
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addSong: function (song) {
    var subview = new NoisyNimbus.Views.SongItem({ model: song,
      playlists: this.playlists });
    this.addSubview('.user-show-song-items', subview);
  },

  addSongs: function () {
    this.collection.each( function (song) {
      this.addSong(song);
    }, this);
  },

  removeSong: function (song) {
    this.removeModelSubview('.song-items', song);
  }
});
