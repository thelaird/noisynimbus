NoisyNimbus.Models.Song = Backbone.Model.extend({
  urlRoot: 'api/songs',

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

    response.timeago = $.timeago(response.created_at);
    return response;
  }
});
