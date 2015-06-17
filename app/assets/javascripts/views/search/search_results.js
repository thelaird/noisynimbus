NoisyNimbus.Views.SearchResults = Backbone.CompositeView.extend({
  template: JST['search/results'],

  initialize: function (options) {
    this.playlists = options.playlists;
    this.songsByArtist = options.songsByArtist;
    this.songsByTitle = options.songsByTitle;
    this.users = options.users;
    this.tags = options.tags;
    this.addSongsByArtist();
    this.listenTo(this.songsByArtist, 'reset', this.addSongsByArtist);
    this.listenTo(this.songsByTitle, 'reset', this.addSongsByTitle);
    this.listenTo(this.tags, 'reset', this.addTag);
    this.listenTo(this.users, 'reset', this.addUser);
  },

  events: {
    'click .songs-by-artist-link': 'selectSongsByArtist',
    'click .songs-by-title-link': 'selectSongsByTitle',
    'click .tags-link': 'selectTags',
    'click .users-link': 'selectUsers'
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addSongsByArtist: function () {
    var subview = new NoisyNimbus.Views.SongsIndex({
      collection: this.songsByArtist,
      playlists: this.playlists
    });
    this._swapView(subview);
  },

  addSongsByTitle: function () {
    var subview = new NoisyNimbus.Views.SongsIndex({
      collection: this.songsByTitle,
      playlists: this.playlists
    });
    this._swapView(subview);
  },

  addTags: function (tag) {
    var subview = new NoisyNimbus.Views.SearchResultsTags({
      collection: this.tags,
      playlists: this.playlists
    });
    this._swapView(subview);
  },

  addUsers: function (user) {
    var subview = new NoisyNimbus.Views.SearchResultsUsers({
      collection: this.users,
      playlists: this.playlists
    });
    this._swapView(subview);
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    $('.results-main').html(view.render().$el);
  },

  selectSongsByArtist: function () {
    $('.results-nav-active-background').css('left', '26px');
    this.addSongsByArtist();
  },

  selectSongsByTitle: function () {
    $('.results-nav-active-background').css('left', '323px');
    this.addSongsByTitle();
  },

  selectUsers: function () {
    $('.results-nav-active-background').css('left', '620px');
    this.addUsers();
  },

  selectTags: function () {
    $('.results-nav-active-background').css('left', '918px');
    this.addTags();
  }


});
