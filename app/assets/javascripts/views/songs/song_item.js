NoisyNimbus.Views.SongItem = Backbone.View.extend({
  template: JST['songs/item'],

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);
    return this;
  }
});
