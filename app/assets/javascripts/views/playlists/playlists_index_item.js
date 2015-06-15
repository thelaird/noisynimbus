NoisyNimbus.Views.PlaylistsIndexItem = Backbone.View.extend({
  template: JST['playlists/index_item'],
  render: function () {
    debugger
    var content = this.template({ playlist: this.model });
    this.$el.html(content);
    return this;
  }
});
