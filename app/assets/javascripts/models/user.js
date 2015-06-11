NoisyNimbus.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users',

  songs: function () {
    if(!this._songs) {
      this._songs = new NoisyNimbus.Collections.Songs({ user: this });
    }

    return this._songs;
  },

  parse: function (response) {
    if (response.songs) {
      this.songs().set(response.songs);
      delete response.songs;
    }

    return response;
  }
});
