NoisyNimbus.Views.SongItem = Backbone.View.extend({
  template: JST['songs/item'],

  events: {
    // 'click .play': 'playSong',
    'click .toggle-play': 'togglePlay'
  },

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);
    return this;

  },

  changeSong: function () {

  },

  playSong: function () {
    this.$el.find('.toggle-play').attr("src", NoisyNimbus.AMAZON_URL + "pause.png");
    this.$el.find('.panel-body').addClass("current-song");
    NoisyNimbus.globalFooterPlayer.play(this);
  },

  pauseSong: function () {
    this.$el.find('.toggle-play').attr("src", NoisyNimbus.AMAZON_URL + "play.png");
    NoisyNimbus.globalFooterPlayer.pause(this);
  },

  togglePlay: function () {
    if (!NoisyNimbus.globalFooterPlayer) {
      NoisyNimbus.globalFooterPlayer = new NoisyNimbus.Views.Player( { model: this.model } );
      $('#player').html(NoisyNimbus.globalFooterPlayer.$el);
      NoisyNimbus.globalFooterPlayer.render();
      debugger
    }

    if (NoisyNimbus.globalFooterPlayer.song().paused ||
          NoisyNimbus.globalFooterPlayer.model !== this.model) {
      this.playSong();
    } else {
      this.pauseSong();
    }
  }
});
