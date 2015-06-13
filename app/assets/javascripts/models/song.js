NoisyNimbus.Models.Song = Backbone.Model.extend({
  urlRoot: 'api/songs',

  followed_songs: function () {
    if(!this._followed_songs) {
      this._followed_songs = new NoisyNimbus.Collections.Songs();
    }

    return this._followed_songs;
  },

  parse: function (response) {
    if (response.songs) {
      this.followed_songs().set(response.songs);
    }
  }
});
