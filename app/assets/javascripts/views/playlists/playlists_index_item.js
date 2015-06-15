NoisyNimbus.Views.PlaylistsIndexItem = Backbone.View.extend({
  template: JST['playlists/index_item'],
  className: 'playlist-index-item',

  initialize: function () {
    this.listenTo(this.model.songs(), 'add remove', this.render);
  },

  render: function () {
    var content = this.template({ playlist: this.model });
    this.$el.html(content);
    return this;
  }
});
