NoisyNimbus.Views.PlaylistsIndexItem = Backbone.View.extend({
  template: JST['playlists/index_item'],
  events: {
    'click img': 'showPlaylist',
    'mouseenter .playlist-index-item': 'showDeleteLink',
    'mouseleave .playlist-index-item': 'removeDeleteLink'
  },

  initialize: function () {
    this.listenTo(this.model.songs(), 'add remove', this.render);
  },

  render: function () {
    var content = this.template({ playlist: this.model });
    this.$el.html(content);
    return this;
  },

  deletePlaylist: function () {
    this.model.destroy();
  },

  removeDeleteLink: function () {
    this.$('.playlist-delete-button').toggleClass('hidden');
    this.$('.playlist-delete-button').off();
  },

  showDeleteLink: function () {
    this.$('.playlist-delete-button').toggleClass('hidden');
    this.$('.playlist-delete-button').on('click', function () {
      this.deletePlaylist();
    }.bind(this));
  },

  showPlaylist: function () {
    Backbone.history.navigate('playlists/' + this.model.id, { trigger: true });
  }
});
