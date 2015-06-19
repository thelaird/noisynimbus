NoisyNimbus.Views.PlaylistSongItem = Backbone.View.extend({
  template: JST['playlists/song_item'],

  events: {
    'click .toggle-play': 'togglePlay',
  },

  initialize: function () {
    this.oldProgress = 100;
    this.listenTo(this.playlists, 'add', this.render);
    this.listenTo(NoisyNimbus.globalEvents, "playNext", this.playNext);
  },

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);
    return this;
  },

  activateSong: function () {
    this.$('.toggle-play span').removeClass("glyphicon-play");
    this.$('.toggle-play span').addClass("glyphicon-pause");
    this.$('.panel-body').addClass("current-song");
  },

  createGlobalPlayer: function () {
    NoisyNimbus.globalFooterPlayer = new NoisyNimbus.Views.Player( { model: this.model } );
    $('#player').html(NoisyNimbus.globalFooterPlayer.$el);
    NoisyNimbus.globalFooterPlayer.render();
    NoisyNimbus.globalFooterPlayer.play(this);
    this.setIcon();
    NoisyNimbus.globalFooterPlayer.$('#footer').removeClass('hide-player');
  },

  playSong: function () {
    if (!NoisyNimbus.globalFooterPlayer.player[0].paused) {
      this.$('.toggle-play span').removeClass("glyphicon-play");
      this.$('.toggle-play span').removeClass("glyphicon-pause");
      this.$('.panel-body').addClass("current-song");
    }

    NoisyNimbus.globalFooterPlayer.play(this);
  },

  playNext: function (song) {
    if ( song.id === this.model.id ){
      this.playSong();
      this.activateSong();
    }
  },

  progress: function (num) {

    if (num) {
      this.$('.progress-radial').removeClass("progress-" + this.oldProgress);
      this.$('.progress-radial').addClass("progress-" + num);
      this.oldProgress = num;
    } else {
      var duration = NoisyNimbus.globalFooterPlayer.player[0].duration;
      var currentTime = NoisyNimbus.globalFooterPlayer.player[0].currentTime;
      var newProgress = Math.floor((currentTime / duration) * 100);

      if (newProgress !== this.oldProgress) {
        this.$('.progress-radial').removeClass("progress-" + this.oldProgress);
        this.$('.progress-radial').addClass("progress-" + newProgress);
        this.oldProgress = newProgress;
      }
    }
  },

  setIcon: function () {
    if (NoisyNimbus.globalFooterPlayer.player[0].paused) {
      this.$('.toggle-play span').removeClass("glyphicon-pause");
      this.$('.toggle-play span').addClass("glyphicon-play");
    } else {
      this.$('.toggle-play span').removeClass("glyphicon-play");
      this.$('.toggle-play span').addClass("glyphicon-pause");
    }
  },

  togglePlay: function () {
    if (!NoisyNimbus.globalFooterPlayer) {
      this.$('.panel-body').addClass("current-song");
      this.createGlobalPlayer();
    } else if (NoisyNimbus.globalFooterPlayer.model == this.model) {
      NoisyNimbus.globalFooterPlayer.toggleState();
      this.setIcon();
    } else {
      NoisyNimbus.globalFooterPlayer.play(this);
      this.activateSong();
    }

  }
});
