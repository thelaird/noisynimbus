NoisyNimbus.Views.SongItemBottom = Backbone.View.extend({
  template: JST['songs/item_bottom'],

  events: {
    'click .playlist-item': 'addToPlaylist'
  },

  initialize: function (options) {
    this.playlists = options.playlists;
    this.listenTo(this.playlists, 'add', this.render);
  },

  render: function () {
    var content = this.template({
      song: this.model,
      playlists: this.playlists
    });
    this.$el.html(content);
    return this;
  },

  addToPlaylist: function (event) {
    var playlistItem = new NoisyNimbus.Models.PlaylistItem({
        "song_id": this.model.id,
        "playlist_id": $(event.currentTarget).data('id')
    });

    playlistItem.save();
  },
});
