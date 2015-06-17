NoisyNimbus.Views.Player = Backbone.View.extend({
  template: JST['layout/player'],

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);
    this.createPlayer();
    return this;
  },

  activateNewSong: function (songView) {
    this.player.attr("src", songView.model.get("song_url"));
    // NoisyNimbus.globalEvents.trigger("next-song", this.model);
    this.player.on('play pause', function () { songView.setIcon(); });
    this.player.on('timeupdate', function () { songView.progress(); });
  },

  deactivateOldSong: function (songView) {
    songView.$el.find('.panel-body').removeClass('current-song');
    songView.$('.toggle-play span').removeClass("glyphicon-pause");
    songView.$('.toggle-play span').addClass("glyphicon-play");
    songView.progress(100);
    this.player.off('play pause');
    this.player.off('timeupdate');
  },

  play: function (newSongView) {
    if (this.currentSongView) {
      this.deactivateOldSong(this.currentSongView);
    }
      this.currentSongView = newSongView;
      this.model = newSongView.model;
      this.activateNewSong(newSongView);
      this.player[0].play();
  },

  toggleState: function () {
    if (this.player[0].paused) {
      this.player[0].play();
    } else {
      this.player[0].pause();
    }
  },

  createPlayer: function () {
    this.player = $('audio').mediaelementplayer({
          audioWidth: 800,
          audioHeight: 50,
          startVolume: 8,
          loop: false,
          enableAutosize: true,
          features: ['playpause','progress','current','duration','tracks','volume','fullscreen'],
          alwaysShowControls: false,
          iPadUseNativeControls: false,
          iPhoneUseNativeControls: false,
          AndroidUseNativeControls: false,
          alwaysShowHours: false,
          showTimecodeFrameCount: false,
          framesPerSecond: 25,
          enableKeyboard: true,
          pauseOtherPlayers: true,
          keyActions: []

      });
  }
});
