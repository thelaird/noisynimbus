NoisyNimbus.Models.Tag = Backbone.Model.extend({
  urlRoot: 'api/tags',

  parse: function (response) {
    if (response.songs) {
      this.songs().set(response.songs, { parse: true });
      delete response.songs;
    }

    return response;
  },

  songs: function () {
    if(!this._songs) {
      this._songs = new NoisyNimbus.Collections.Songs();
    }

    return this._songs;
  }
});
