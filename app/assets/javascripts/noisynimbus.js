window.NoisyNimbus = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new NoisyNimbus.Routers.Router({ $rootEl: $('#main') });
    Backbone.history.start();
  }
};
