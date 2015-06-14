NoisyNimbus.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['users/show'],

  initialize: function () {
    this.collection = this.model.songs();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addSong);
    this.listenTo(this.collection, 'remove', this.removeSong);
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addSong: function (song) {
    var subview = new NoisyNimbus.Views.SongItem({ model: song });
    this.addSubview('.song-items', subview);
  },

  removeSong: function (song) {
    this.removeModelSubview('.song-items', song);
  }
});
