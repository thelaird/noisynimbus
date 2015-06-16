NoisyNimbus.Collections.ArtistSongs = Backbone.Collection.extend({
  model: NoisyNimbus.Models.Song,

  initialize: function (options) {
    options || (options = {});
    this.artist = options.artist;
  },

  url: function () {
    return 'api/artist/' + this.artist;
  }
});
