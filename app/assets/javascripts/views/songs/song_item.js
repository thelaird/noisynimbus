NoisyNimbus.Views.SongItem = Backbone.View.extend({
  template: JST['songs/item'],

  events: {
    'click .play': 'playSong',
    'click .toggle-play': 'togglePlay'
  },

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);
    return this;

  },

  playSong: function (event) {
    this.$el.find('.play').attr("src", NoisyNimbus.AMAZON_URL + "pause.png");
    this.$el.find('.panel-body').addClass("current-song");
    if (!NoisyNimbus.globalFooterPlayer) {
      NoisyNimbus.globalFooterPlayer = new NoisyNimbus.Views.Player( { model: this.model } );
      $('#player').html(NoisyNimbus.globalFooterPlayer.$el);
      NoisyNimbus.globalFooterPlayer.render();
    }

    NoisyNimbus.globalFooterPlayer.play(this.model, this);
  }
});
