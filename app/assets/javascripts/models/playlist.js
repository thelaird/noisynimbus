NoisyNimbus.Models.Playlist = Backbone.Model.extend({
  urlRoot: 'api/playlists',

  parse: function (response) {
    if (response.songs) {
      this.songs().set(response.songs);
      delete response.songs;
    }

    return response;
  },

  songs: function () {
    if(!this._songs) {
      this._songs = new NoisyNimbus.Collections.Songs({ user: this });
    }

    return this._songs;
  }
});
