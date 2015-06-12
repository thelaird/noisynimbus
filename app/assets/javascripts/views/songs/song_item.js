NoisyNimbus.Views.SongItem = Backbone.View.extend({
  template: JST['songs/item'],

  events: {
    'click .play': 'playSong'
  },

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);
    return this;

  },

  playSong: function (event) {
    if (!NoisyNimbus.Player) {
      NoisyNimbus.globalFooterPlayer = new NoisyNimbus.Views.Player( { model: this.model } );
      $('#player').html(NoisyNimbus.globalFooterPlayer.render().$el);
    }

    NoisyNimbus.globalFooterPlayer.play(this.model);
  }
});
