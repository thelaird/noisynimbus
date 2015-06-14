NoisyNimbus.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users',

  following: function () {
    if (!this._following) {
      this._following = new NoisyNimbus.Models.Following({
        followee_id: this.id,
        follower_id: CURRENT_USER_ID
        });
    }

    return this._following;
  },

  isFollowed: function () {
    return !this.following().isNew();
  },

  parse: function (response) {
    if (response.songs) {
      this.songs().set(response.songs);
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
      this._songs = new NoisyNimbus.Collections.Songs({ user: this });
    }

    return this._songs;
  },

});
