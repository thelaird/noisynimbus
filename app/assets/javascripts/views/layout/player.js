NoisyNimbus.Views.Player = Backbone.View.extend({
  className: "footer",
  template: JST['layout/player'],

  initialize: function () {

  },


  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);
    this.createPlayer();
    return this;
  },

  activateNewSong: function (songView) {
    $('audio').attr("src", songView.model.get("song_url"));
  },

  deactivateOldSong: function (songView) {
    songView.$el.find('.panel-body').removeClass('current-song');
    songView.$el.find('.toggle-play').attr("src", NoisyNimbus.AMAZON_URL + "play.png");
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
          // width of audio player
          audioWidth: 400,
          // height of audio player
          audioHeight: 30,
          // initial volume when the player starts
          startVolume: 0.8,
          // useful for <audio> player loops
          loop: false,
          // enables Flash and Silverlight to resize to content size
          enableAutosize: true,
          // the order of controls you want on the control bar (and other plugins below)
          features: ['playpause','progress','current','duration','tracks','volume','fullscreen'],
          // Hide controls when playing and mouse is not over the video
          alwaysShowControls: false,
          // force iPad's native controls
          iPadUseNativeControls: false,
          // force iPhone's native controls
          iPhoneUseNativeControls: false,
          // force Android's native controls
          AndroidUseNativeControls: false,
          // forces the hour marker (##:00:00)
          alwaysShowHours: false,
          // show framecount in timecode (##:00:00:00)
          showTimecodeFrameCount: false,
          // used when showTimecodeFrameCount is set to true
          framesPerSecond: 25,
          // turns keyboard support on and off for this instance
          enableKeyboard: true,
          // when this player starts, it will pause other players
          pauseOtherPlayers: true,
          // array of keyboard commands
          keyActions: []

      });
  }
});
