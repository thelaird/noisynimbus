NoisyNimbus.Views.Player = Backbone.View.extend({
  className: "footer",
  template: JST['layout/player'],

  initialize: function () {
    this.$audio = this.$el.find('audio');
    this.song = this.$audio[0];
  },

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);
    audioLize(this.$audio);
    return this;
  },

  pause: function(){
    this.song.pause();
  },

  play: function (song, songView) {
    if (this.currentSongView) {
      this.currentSongView.$el.find('.panel-body').removeClass('current-song');
      this.currentSongView.$el.find('.play').attr("src", NoisyNimbus.AMAZON_URL + "play.png");
    }
    this.currentSongView = songView;
    this.currentSongView.$el.find('.panel-body').addClass('current-song');
    this.$el.find('source').attr("src", song.get("song_url"));
  }
});
