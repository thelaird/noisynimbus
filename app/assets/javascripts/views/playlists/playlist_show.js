NoisyNimbus.Views.PlaylistShow = Backbone.CompositeView.extend({
  template: JST['playlists/show'],

  initialize: function (options) {
    this.addSongs();
    this.listenTo(this.model.songs(), 'add', this.addSong);
    this.listenTo(this.model.songs(), 'remove', this.removeSong);
    this.listenTo(NoisyNimbus.globalEvents, 'ended', this.playNext);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  onRender: function () {
      this.attachSortable();
  },

  attachSortable: function () {
    $('.song-items').sortable({
      stop: function (event, ui) { this.updateOrd(event,  ui); }.bind(this)
    });
  },

  addSongs: function () {
    this.model.songs().each( function (song) {
      this.addSong(song);
    }, this);
  },

  addSong: function (song) {
    var subview = new NoisyNimbus.Views.PlaylistSongItem({ model: song });
    this.addSubview('.song-items', subview);
  },

  playNext: function (song) {
    var nextSong = this.model.songs().at(this.model.songs().indexOf(song) + 1);
    if (nextSong) {
      NoisyNimbus.globalEvents.trigger('playNext', nextSong);
    }
  },

  removeSong: function (song) {
    this.removeModelSubview('.song-items', song);
  },

  updateOrd: function (event, ui) {
    $('.playlist-song-outer').each( function (idx, item) {
      var playlistItem = this.model.songs().get($(item).data('song-id')).playlistItem();
      if (playlistItem.get('ord') !== idx + 1) {
        if ($(item).data('song-id') === ui.item.data('song-id')) {
          playlistItem.save({ ord: idx + 1 });
        } else {
          playlistItem.set({ ord: idx + 1});
        }
      }
    }.bind(this));
  }
});
