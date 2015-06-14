NoisyNimbus.Views.SongItem = Backbone.View.extend({
  template: JST['songs/item'],

  events: {
    'click .toggle-play': 'togglePlay',
    'mouseover .panel-body': 'addUserWindow'
  },

  initialize: function () {
    this.oldProgress = 100;
  },

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);
    return this;
  },

  activateSong: function () {
    this.$('.toggle-play span').removeClass("glyphicon-play");
    this.$('.toggle-play span').addClass("glyphicon-pause");
    this.$('.panel-body').addClass("current-song");
  },

  addUserWindow: function () {
    var userWindowView = new NoisyNimbus.Views.UserWindow({ model: this.model });
    var userWindow = userWindowView.render().$el;

    $('.uploader').tooltipster( {
      content: userWindow,
      autoClose: false,
      interactive: true,
      theme: 'tooltipster-light',
      delay: 100,
      position: 'right'
      });
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
