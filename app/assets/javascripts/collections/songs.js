NoisyNimbus.Collections.Songs = Backbone.Collection.extend({
  model: NoisyNimbus.Models.Song,
  url: 'api/songs',
  comparator: function (song) {
  },

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
