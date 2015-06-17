NoisyNimbus.Views.SearchResultsUsers = Backbone.CompositeView.extend({
  template: JST['search/results_users'],

  initialize: function (options) {
    this.playlists = options.playlists;
    this.listenTo(this.collection, 'add', this.addUserItem);
    this.listenTo(this.collection, 'remove', this.removeUserItem);
    this.addUsers();
  },

  render: function () {
    var content = this.template({ users: this.collection });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addUsers: function () {
    this.collection.each( function (user) {
      this.addUserItem(user);
    }, this);
  },

  addUserItem: function (user) {
    var subview = new NoisyNimbus.Views.SearchResultsUserItem({
      model: user,
      playlists: this.playlists
    });
    this.addSubview('.user-list', subview);
  },

  removeUserItem: function (user) {
    this.removeModelSubview('.user-list', subview);
  }

});
