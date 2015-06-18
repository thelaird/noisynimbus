NoisyNimbus.Views.SearchResultsTags = Backbone.CompositeView.extend({
  template: JST['search/results_tags'],

  initialize: function (options) {
    this.playlists = options.playlists;
    this.listenTo(this.collection, 'add', this.addTagItem);
    this.listenTo(this.collection, 'remove', this.removeTagItem);
    this.addTags();
  },

  render: function () {
    var content = this.template({ tags: this.collection });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addTags: function () {
    this.collection.each( function (tag) {
      this.addTagItem(tag);
    }, this);
  },

  addTagItem: function (tag) {
    var subview = new NoisyNimbus.Views.SearchResultsTagItem({
      model: tag,
      playlists: this.playlists
    });
    this.addSubview('.tag-results-list', subview);
  },

  removeTagItem: function (tag) {
    this.removeModelSubview('.tag-results-list', subview);
  }

});
