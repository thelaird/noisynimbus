NoisyNimbus.Views.SearchResultsUsers = Backbone.View.extend({
  template: JST['search/results_users'],

  render: function () {
    var content = this.template({ users: this.collection });
    this.$el.html(content);
    return this;
  }
});
