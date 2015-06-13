NoisyNimbus.Views.SongsIndex = Backbone.CompositeView.extend({
  template: JST['songs/index'],

  initialize: function () {
    this.listenTo(this.collection, 'add', this.addSongs);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addSongs: function (songs) {
    var subview = new NoisyNimbus.Views.SongItem({ model: song });
    this.addSubview('.song-items', subview);
  }
});
