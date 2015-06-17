NoisyNimbus.Views.SongShow = Backbone.CompositeView.extend({
  template: JST['songs/show'],

  initialize: function (options) {
    this.playlists = options.playlists;
    this.addSong(this.model);
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.uploaderCheck);
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
  },

  addUploaderLinks: function () {
    var subview = new NoisyNimbus.Views.SongShowLinks({ model: this.model });
    this.addSubview('.song-show-uploader-links-container', subview);
    subview.onRender();
  },

  uploaderCheck: function () {
    if (this.model.uploader().id.toString() === CURRENT_USER_ID) {
      this.addUploaderLinks();
    }
  }

});
