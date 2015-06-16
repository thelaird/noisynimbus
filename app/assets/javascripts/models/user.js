NoisyNimbus.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users',

  following: function () {
    if (!this._following) {
      this._following = new NoisyNimbus.Models.Following();
    }

    return this._following;
  },

  isFollowed: function () {
    return !this.following().isNew();
  },

  parse: function (response) {

    if (response.songs) {
      this.songs().set(response.songs, {parse: true});
      delete response.songs;
    }

    if (response.following) {
      this.following().set(response.following);
      delete response.following;
    }

    return response;
  },

  songs: function () {
    if(!this._songs) {
      this._songs = new NoisyNimbus.Collections.Songs();
    }

    return this._songs;
  },

});
