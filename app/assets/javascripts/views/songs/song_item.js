NoisyNimbus.Views.SongItem = Backbone.CompositeView.extend({
  template: JST['songs/item'],

  events: {
    'click .toggle-play': 'togglePlay',
    'mouseover .panel-body': 'addUserWindow',
    'click .playlist-item': 'addToPlaylist'
  },

  initialize: function (options) {
    this.playlists = options.playlists;
    this.oldProgress = 100;
    this.addTags();
    this.listenTo(this.playlists, 'add', this.render);
    this.listenTo(this.model.tags(), 'add', this.addTag);
    this.listenTo(this.model.tags(), 'remove', this.removeTag);

    this.addUserWindow = _.once(function () {
      this.userWindowView = new NoisyNimbus.Views.UserWindow({ model: this.model });
      userWindow = this.userWindowView.render().$el;

      $('.uploader-' + this.model.id).tooltipster( {
        content: userWindow,
        arrow: false,
        autoClose: false,
        interactive: true,
        theme: 'tooltipster-light',
        delay: 100,
        position: 'right',
        multiple: 'true',
        offsetX: -110,
        animation: 'grow',
        updateAnimation: false
        });
    });
  },

  render: function () {
    var content = this.template({ song: this.model,
      playlists: this.playlists,
      tags: this.model.tags().first(3) });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  activateSong: function () {
    this.$('.toggle-play span').removeClass("glyphicon-play");
    this.$('.toggle-play span').addClass("glyphicon-pause");
    this.$('.panel-body').addClass("current-song");
  },

  addTag: function (tag) {
    var subview = new NoisyNimbus.Views.TagItem({ model: tag });
    this.addSubview('.tags', subview);
  },

  addTags: function () {
    this.model.tags().each( function (tag) {
      this.addTag(tag);
    }, this);
  },

  removeTag: function (tag) {
    this.removeModelSubview('.tags', tag);
  },

  addToPlaylist: function (event) {
    var playlistItem = new NoisyNimbus.Models.PlaylistItem({
        "song_id": this.model.id,
        "playlist_id": $(event.currentTarget).data('id')
    });

    playlistItem.save();
  },

  createGlobalPlayer: function () {
    NoisyNimbus.globalFooterPlayer = new NoisyNimbus.Views.Player( { model: this.model } );
    $('#player').html(NoisyNimbus.globalFooterPlayer.$el);
    NoisyNimbus.globalFooterPlayer.render();
    NoisyNimbus.globalFooterPlayer.play(this);
    this.setIcon();
    NoisyNimbus.globalFooterPlayer.$('#footer').removeClass('initial');
  },

  playSong: function () {
    if (!NoisyNimbus.globalFooterPlayer.player[0].paused) {
      this.$('.toggle-play span').removeClass("glyphicon-play");
      this.$('.toggle-play span').removeClass("glyphicon-pause");
      this.$('.panel-body').addClass("current-song");
    }

    NoisyNimbus.globalFooterPlayer.play(this);
  },

  progress: function (num) {

    if (num) {
      this.$('.progress-radial').removeClass("progress-" + this.oldProgress);
      this.$('.progress-radial').addClass("progress-" + num);
      this.oldProgress = num;
    } else {
      var duration = NoisyNimbus.globalFooterPlayer.player[0].duration;
      var currentTime = NoisyNimbus.globalFooterPlayer.player[0].currentTime;
      var newProgress = Math.floor((currentTime / duration) * 100);

      if (newProgress !== this.oldProgress) {
        this.$('.progress-radial').removeClass("progress-" + this.oldProgress);
        this.$('.progress-radial').addClass("progress-" + newProgress);
        this.oldProgress = newProgress;
      }
    }
  },

  setIcon: function () {
    if (NoisyNimbus.globalFooterPlayer.player[0].paused) {
      this.$('.toggle-play span').removeClass("glyphicon-pause");
      this.$('.toggle-play span').addClass("glyphicon-play");
    } else {
      this.$('.toggle-play span').removeClass("glyphicon-play");
      this.$('.toggle-play span').addClass("glyphicon-pause");
    }
  },

  togglePlay: function () {
    if (!NoisyNimbus.globalFooterPlayer) {
      this.$('.panel-body').addClass("current-song");
      this.createGlobalPlayer();
    } else if (NoisyNimbus.globalFooterPlayer.model == this.model) {
      NoisyNimbus.globalFooterPlayer.toggleState();
      this.setIcon();
    } else {
      NoisyNimbus.globalFooterPlayer.play(this);
      this.activateSong();
    }

  }
});
