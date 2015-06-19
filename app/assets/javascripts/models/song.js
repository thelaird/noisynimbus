NoisyNimbus.Models.Song = Backbone.Model.extend({
  urlRoot: 'api/songs',

  playlist: function () {
    if (!this._playlist) {
      this._playlist = new NoisyNimbus.Models.Playlist();
    }

    return this._playlist;
  },

  playlistItem: function () {
    if (!this._playlistItem) {
      this._playlistItem = new NoisyNimbus.Models.PlaylistItem();
    }

    return this._playlistItem;
  },

  uploader: function () {
    if (!this._uploader) {
      this._uploader = new NoisyNimbus.Models.User();
    }

    return this._uploader;
  },

  tags: function () {
    if (!this._tags) {
      this._tags = new NoisyNimbus.Collections.Tags();
    }

    return this._tags;
  },

  parse: function (response) {
    if (response.uploader) {
      this.uploader().set(this.uploader().parse(response.uploader));
      delete response.uploader;
    }

    if (response.tags) {
      this.tags().set(response.tags);
      delete response.tags;
    }

    if (response.playlist_item) {
      this.playlistItem().set(response.playlist_item);
      delete response.playlist_item;
    }

    response.timeago = $.timeago(response.created_at);
    return response;
  }
});
