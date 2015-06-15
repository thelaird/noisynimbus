NoisyNimbus.Views.PlaylistsIndexItem = Backbone.View.extend({
  template: JST['playlists/index_item'],
  className: 'playlist-index-item',
  render: function () {
    var content = this.template({ playlist: this.model });
    this.$el.html(content);
    return this;
  }
});
