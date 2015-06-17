NoisyNimbus.Views.SearchResultsSongs = Backbone.View.extend({
  template: JST['search/results_songs'],

  render: function () {
    var content = this.template({ songs: this.collection });
    this.$el.html(content);
    return this;
  }
});
