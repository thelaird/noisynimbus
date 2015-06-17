NoisyNimbus.Views.SearchResultsTags = Backbone.View.extend({
  template: JST['search/results_tags'],

  render: function () {
    var content = this.template({ tags: this.collection });
    this.$el.html(content);
    return this;
  }
});
