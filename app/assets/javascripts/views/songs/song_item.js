NoisyNimbus.Views.SongItem = Backbone.View.extend({
  template: JST['songs/item'],

  events: {
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
    if (NoisyNimbus.globalFooterPlayer.player[0].paused) {
      NoisyNimbus.globalFooterPlayer.play(this);
    } else {
      this.$el.find('.toggle-play').attr("src", NoisyNimbus.AMAZON_URL + "pause.png");
      this.$el.find('.panel-body').addClass("current-song");
      NoisyNimbus.globalFooterPlayer.play(this);
    }
  },

  activateSong: function () {
    this.$el.find('.toggle-play').attr("src", NoisyNimbus.AMAZON_URL + "pause.png");
    this.$el.find('.panel-body').addClass("current-song");
  },

  toggleIcon: function () {
    if (NoisyNimbus.globalFooterPlayer.player[0].paused) {
      this.$el.find('.toggle-play').attr("src", NoisyNimbus.AMAZON_URL + "play.png");
    } else {
      this.$el.find('.toggle-play').attr("src", NoisyNimbus.AMAZON_URL + "pause.png");
    }
  },

  togglePlay: function () {
    if (!NoisyNimbus.globalFooterPlayer) {
      NoisyNimbus.globalFooterPlayer = new NoisyNimbus.Views.Player( { model: this.model } );
      $('#player').html(NoisyNimbus.globalFooterPlayer.$el);
      NoisyNimbus.globalFooterPlayer.render();
      this.$el.find('.panel-body').addClass("current-song");
      NoisyNimbus.globalFooterPlayer.play(this);
      this.toggleIcon();
    } else {
      if (NoisyNimbus.globalFooterPlayer.model == this.model) {
        NoisyNimbus.globalFooterPlayer.toggleState();
        this.toggleIcon();
      } else {
        NoisyNimbus.globalFooterPlayer.play(this);
        this.activateSong();
      }
    }


  }
});
