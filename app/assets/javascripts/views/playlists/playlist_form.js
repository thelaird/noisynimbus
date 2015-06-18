NoisyNimbus.Views.PlaylistForm = Backbone.View.extend({
  template: JST['playlists/form'],

  events: {
    'click .submit': 'submit'
  },

  initialize: function (options) {
    this.firstSongId = options.firstSongId;
  },

  render: function () {
    var content = this.template({ playlist: this.model });
    this.$el.html(content);
    return this;
  },

  submit: function (event) {
    event.preventDefault();
    var data = $('.playlist-form').serializeJSON();
    data["song_ids"] = [this.firstSongId];
    this.model.set(data);
    this.model.save({},{
      success: function () {
        this.collection.add(this.model);
        Backbone.history.navigate("playlists/" + this.model.id, { trigger: true });
      }.bind(this)
    });
  }
});
