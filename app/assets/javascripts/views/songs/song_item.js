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

  createGlobalPlayer: function () {
    NoisyNimbus.globalFooterPlayer = new NoisyNimbus.Views.Player( { model: this.model } );
    $('#player').html(NoisyNimbus.globalFooterPlayer.$el);
    NoisyNimbus.globalFooterPlayer.render();
    NoisyNimbus.globalFooterPlayer.play(this);
    this.toggleIcon();
  },

  playSong: function () {
    if (NoisyNimbus.globalFooterPlayer.player[0].paused) {
      NoisyNimbus.globalFooterPlayer.play(this);
    } else {
      this.$('.toggle-play').attr("src", NoisyNimbus.AMAZON_URL + "pause.png");
      this.$('.panel-body').addClass("current-song");
      NoisyNimbus.globalFooterPlayer.play(this);
    }
  },

  activateSong: function () {
    this.$('.toggle-play').attr("src", NoisyNimbus.AMAZON_URL + "pause.png");
    this.$('.panel-body').addClass("current-song");
  },

  toggleIcon: function () {
    if (NoisyNimbus.globalFooterPlayer.player[0].paused) {
      this.$('.toggle-play').attr("src", NoisyNimbus.AMAZON_URL + "play.png");
    } else {
      this.$('.toggle-play').attr("src", NoisyNimbus.AMAZON_URL + "pause.png");
    }
  },

  togglePlay: function () {
    if (!NoisyNimbus.globalFooterPlayer) {
      this.$('.panel-body').addClass("current-song");
      this.createGlobalPlayer();
    } else if (NoisyNimbus.globalFooterPlayer.model == this.model) {
      NoisyNimbus.globalFooterPlayer.toggleState();
      this.toggleIcon();
    } else {
      NoisyNimbus.globalFooterPlayer.play(this);
      this.activateSong();
    }

  }
});
