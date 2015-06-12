NoisyNimbus.Views.Player = Backbone.View.extend({
  template: JST['layout/player'],

  render: function () {
    var content = this.template({ song: this.model});
    this.$el.html(content);
    return this;
  },

  play: function (song) {
  }
});
