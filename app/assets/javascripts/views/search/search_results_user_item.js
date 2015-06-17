NoisyNimbus.Views.SearchResultsUserItem = Backbone.View.extend({
  template: JST['search/results_user_item'],

  initialize: function (options) {
    this.playlists = options.playlists;
  },

  events: {
    'click .user-list-item': 'addSongs'
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    return this;
  },

  addSongs: function () {
    var view = new NoisyNimbus.Views.SongsIndex({
      collection: this.model.songs(),
      playlists: this.playlists,
      template: JST['songs/search_results']
    });
    $('.user-songs').html(view.render().$el);
  }
});
