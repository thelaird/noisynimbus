NoisyNimbus.Views.SongDeleteWindow = Backbone.View.extend({
  template: JST['songs/delete_window'],

  events: {
    'click .really-delete': "deleteSong"
  },

  intialize: function () {
  },

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);
    return this;
  },

  deleteSong: function () {
    this.model.destroy();
    Backbone.history.navigate('', { trigger: true });
  }
});
