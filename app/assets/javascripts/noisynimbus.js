window.NoisyNimbus = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    DEFAULT_IMAGE_URL = "https://s3.amazonaws.com/noisynimbus-prod/default.png";
    
    var router = new NoisyNimbus.Routers.Router({ $rootEl: $('#main') });
    var navbar = new NoisyNimbus.Views.Navbar({ router: router });
    $('#navbar').html(navbar.render().$el);
    Backbone.history.start();
  }
};
