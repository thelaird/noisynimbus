NoisyNimbus.Models.Song = Backbone.Model.extend({
  urlRoot: 'api/songs',

  uploader: function () {
    if (!this._uploader) {
      this._uploader = new NoisyNimbus.Models.User ();
    }

    return this._uploader;
  },

  parse: function (response) {
    if (response.uploader) {
      this.uploader().set(this.uploader().parse(response.uploader));
      delete response.uploader;
    }

    return response;
  }
});
