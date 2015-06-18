window.NoisyNimbus = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new NoisyNimbus.Routers.Router({ $rootEl: $('#main') });
    if (CURRENT_USER_ID) {
      var navbar = new NoisyNimbus.Views.Navbar({ router: router });
      $('#navbar').html(navbar.render().$el);
    }
    Backbone.history.start();
  }
};
