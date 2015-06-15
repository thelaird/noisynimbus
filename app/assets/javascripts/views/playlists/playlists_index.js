NoisyNimbus.Views.PlaylistsIndex = Backbone.CompositeView.extend({
  template: JST['playlists/index'],

  initialize: function () {
    this.addPlaylists();
    this.listenTo(this.collection, 'add', this.addPlaylist);
    this.listenTo(this.collection, 'remove', this.removePlaylist);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addPlaylist: function (playlist) {
    var subview = new NoisyNimbus.Views.PlaylistsIndexItem({ model: playlist });
    this.addSubview('.playlist-items', subview);
  },

  addPlaylists: function () {
    this.collection.each( function (playlist) {
      this.addPlaylist(playlist);
    }, this);
  },

  removePlaylist: function (playlist) {
    this.removeModelSubview('.playlist-items', playlist);
  }
});
