NoisyNimbus.Views.Navbar = Backbone.View.extend({
  template: JST['layout/navbar'],

  events: {
    'click .nav-sign-out': 'signOut',
  },

  initialize: function (options) {
    this.router = options.router;
    this.listenTo(this.router, 'route', this.makeActive);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  makeActive: function (route, params) {
    if (this.$currentActive) {
      this.$currentActive.toggleClass('active');
    }
    switch (route) {
      case 'songsIndex':
        this.$currentActive = $('.nav-home').toggleClass('active');
        break;
      case 'songsUpload':
        this.$currentActive = $('.nav-upload').toggleClass('active');
        break;
      case 'playlistNew':
      case 'playlistsIndex':
      case 'playlistShow':
      case 'playlistEdit':
        this.$currentActive = $('.nav-playlists').toggleClass('active');
        break;
      case 'userShow':
        if (params[0] === CURRENT_USER_ID) {
          this.$currentActive = $('.nav-my-songs').toggleClass('active');
        }
        break;
      case 'songsExplore':
        this.$currentActive = $('.nav-explore').toggleClass('active');
        break;
    }


  },

  handleNavbarClick: function (event) {
    if (this.$currentActive) {
      this.$currentActive.toggleClass('active');
    }
    $(event.currentTarget).toggleClass('active');
    this.$currentActive = $(event.currentTarget);
  },

  signOut: function (event) {
    event.preventDefault();

    $.ajax({
      url: '/session',
      type: 'DELETE',
      success: function () {
        window.location.href = '/session/new';
      }
    });
  }
});
