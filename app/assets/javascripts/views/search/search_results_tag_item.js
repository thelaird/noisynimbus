NoisyNimbus.Views.SearchResultsTagItem = Backbone.View.extend({
  template: JST['search/results_tag_item'],

  initialize: function (options) {
    this.playlists = options.playlists;
  },

  events: {
    'click .tag-list-item': 'addSongs'
  },

  render: function () {
    var content = this.template({ tag: this.model });
    this.$el.html(content);
    return this;
  },

  addSongs: function () {
    debugger;
    var view = new NoisyNimbus.Views.SongsIndex({
      collection: this.model.songs(),
      playlists: this.playlists,
      template: JST['songs/search_results']
    });
    $('.tag-songs').html(view.render().$el);
  }
});
