NoisyNimbus.Models.Song = Backbone.Model.extend({
  urlRoot: 'api/songs',

  uploader: function () {
    if (!this._uploader) {
      this._uploader = new NoisyNimbus.Models.User ({ id: this.uploader_id });
    }

    return this._uploader;
  },

  parse: function (response) {
    if (response.uploader) {
      response.uploader = NoisyNimbus.Models.User.prototype.parse(response.uploader);
      this.uploader().set(response.uploader);
      delete response.uploader;
    }

    return response;
  }
});
