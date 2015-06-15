NoisyNimbus.Collections.Tags = Backbone.Collection.extend({
  url: 'api/tags',
  model: NoisyNimbus.Models.Tag,

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
