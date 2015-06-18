NoisyNimbus.Views.EmbedSong = Backbone.View.extend({
  template: JST['songs/embed'],

  initialize: function () {
    this.addSong();
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  addSong: function () {
    var subview = new NoisyNimbus.Views.SongItem({
      model: this.model,
      embed: true
    });
    $('body').append(subview.render().$el);
  }
});
