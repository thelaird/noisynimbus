NoisyNimbus.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.users = new NoisyNimbus.Collections.Users();
    this.users.fetch();
  },

  routes:{
    '': 'userShow'
  },

  userShow: function () {
    var user = this.users.getOrFetch(CURRENT_USER_ID);
    var view = NoisyNimbus.Views.UserShow({ model: user });
    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this._currentView.html(view.render().$el);
  }
});
