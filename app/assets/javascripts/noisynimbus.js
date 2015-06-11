window.NoisyNimbus = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new NoisyNimbus.Routers.Router({ $rootEl: $('#main') });
    var navbar = new NoisyNimbus.Views.Navbar({ router: router });
    $('#navbar').html(navbar.render().$el);
    Backbone.history.start();
  }
};

// 
// SongItemView(Subview)
//
//   events:
//    click .play : playSong
//
//
//    playSong: function (event) {
//
//     //  if (!NN.globalFooterPlayer) {
//     //     NN.globalFooterPlayer = new FooterPlayerView
//     //   }
//
//     NN.globalFooterPlayer.play(this.model)
//
