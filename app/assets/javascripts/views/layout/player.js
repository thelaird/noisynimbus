NoisyNimbus.Views.Player = Backbone.View.extend({
  className: "footer",
  template: JST['layout/player'],

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);
    audioLize(this.$audio());
    return this;
  },

  activateNewSong: function (songView) {
    songView.$el.find('.panel-body').addClass('current-song');
    songView.$el.find('.toggle-play').attr("src", NoisyNimbus.AMAZON_URL + "pause.png");
    $('source').attr("src", songView.model.get("song_url"));
  },

  $audio: function () {
    return this.$el.find('#audioplayer');
  },

  deactivateOldSong: function (songView) {
    songView.$el.find('.panel-body').removeClass('current-song');
    songView.$el.find('.toggle-play').attr("src", NoisyNimbus.AMAZON_URL + "play.png");
  },

  pause: function() {
    this.song().pause();
  },

  play: function (newSongView) {
    if (this.currentSongView) {
      this.deactivateOldSong(this.currentSongView);
    }
    this.model = newSongView.model;
    this.currentSongView = newSongView;
    this.activateNewSong(this.currentSongView);
    this.song().load();
    this.song().play();
  },

  song: function () {
    return this.$audio()[0];
  }
});
