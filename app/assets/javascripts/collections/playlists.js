NoisyNimbus.Collections.Playlists = Backbone.Collection.extend({
  url: 'api/playlists',
  model: NoisyNimbus.Models.Playlist,

  getOrFetch: function (id) {
    var model = this.get(id);

    if (model) {
      model.fetch();
    } else {
      model = new this.model({ id: id });
      model.fetch({
        success: function () {
          this.add(model);
        }.bind(this)
      });
    }

    return model;
  }
});
