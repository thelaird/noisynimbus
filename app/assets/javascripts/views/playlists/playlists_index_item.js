NoisyNimbus.Views.PlaylistsIndexItem = Backbone.View.extend({
  template: JST['playlists/index_item'],
  events: {
    'click img': 'showPlaylist'
  },

  initialize: function () {
    this.listenTo(this.model.songs(), 'add remove', this.render);
  },

  render: function () {
    var content = this.template({ playlist: this.model });
    this.$el.html(content);
    return this;
  },

  showPlaylist: function () {
    Backbone.history.navigate('playlists/' + this.model.id, { trigger: true });
  }
});
