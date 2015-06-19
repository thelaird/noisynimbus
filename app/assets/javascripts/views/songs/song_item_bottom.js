NoisyNimbus.Views.SongItemBottom = Backbone.View.extend({
  template: JST['songs/item_bottom'],

  events: {
    'click .playlist-item': 'addToPlaylist'
    },

  initialize: function (options) {
    this.playlists = options.playlists;
    this.listenTo(this.playlists, 'add', this.render);
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.updateTooltip);
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
    playlistId = $(event.currentTarget).data('id');
    var playlistItem = new NoisyNimbus.Models.PlaylistItem({
        "song_id": this.model.id,
        "playlist_id": playlistId,
        "ord": this.playlists.get(playlistId).songs().length + 1
    });

    playlistItem.save();
  },

  attachEmbedTooltip: function () {
    var src = "http:\/\/noisynimbus.com\/embed#" + this.model.id;
    var options = "width=\"780\" height=\"133\" scrolling=\"no\" style=\"overflow:hidden\" frameBorder=\"0\"";
    var embedCode = "<iframe src=\"" + src + "\" " + options + "></iframe>";
    var $embed = $("<input type=\'text\' onClick=\"this.select();\" value=\'" + embedCode + "\'/>");
    $('.btn-embed-' + this.model.id).tooltipster( {
      content: $embed,
      interactive: true,
      theme: 'tooltipster-light',
      delay: 100,
      updateAnimation: false,
      trigger: 'click'
      });
  },

  onRender: function () {
    this.attachEmbedTooltip();
  }
});
