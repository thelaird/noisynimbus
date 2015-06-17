NoisyNimbus.Views.SearchResults = Backbone.CompositeView.extend({
  template: JST['search/results'],

  initialize: function (options) {
    this.songsByArtist = options.songsByArtist;
    this.songsByTitle = options.songsByTitle;
    this.users = options.users;
    this.tags = options.tags;

    this.listenTo(this.songsByArtist, 'reset', this.addSongsByArtist);
    this.listenTo(this.songsByTitle, 'reset', this.addSongsByTitle);
    this.listenTo(this.tags, 'reset', this.addTags);
    this.listenTo(this.users, 'reset', this.addUsers);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addSongByArtist: function (song) {
    var subview = new NoisyNimbus.Views.SearchResultsSongs({
      collection: this.songsByArtist
    });
    this.addSubview('.songs-by-artist', subview);
  },

  addSongsByArtist: function () {
    this.songsByArtist.each( function (song) {
      this.addSongByArtist(song);
    }, this);
  },

  addSongByTitle: function (song) {
    var subview = new NoisyNimbus.Views.SearchResultsSongs({
      collection: this.songsByTitle
    });
    this.addSubview('.songs-by-title', subview);
  },

  addSongsByTitle: function () {
    this.songsByTitle.each( function (song) {
      this.addSongByTitle(song);
    }, this);
  },

  addTag: function (tag) {
    var subview = new NoisyNimbus.Views.SearchResultsTags({
      collection: this.tags
    });
    this.addSubview('.tags', subview);
  },

  addTags: function () {
    this.tags.each( function (tag) {
      this.addTag(tag);
    }, this);
  },

  addUser: function (user) {
    var subview = new NoisyNimbus.Views.SearchResultsUsers({
      collection: this.users
    });
    this.addSubview('.users', subview);
  },

  addUsers: function () {
    this.users.each( function (user) {
      this.addUser(user);
    }, this);
  }


});
