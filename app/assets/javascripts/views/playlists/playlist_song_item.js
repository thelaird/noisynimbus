NoisyNimbus.Views.PlaylistSongItem = Backbone.View.extend({
  template: JST['playlist/song_item'],

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);
    return this;
  }
});
