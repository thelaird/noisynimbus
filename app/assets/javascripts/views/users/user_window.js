NoisyNimbus.Views.UserWindow = Backbone.View.extend({
  template: JST['users/window'],

  className: "user-window",

  events: {
    'click .follow': 'follow',
    'click .view': 'view',
    'mouseleave': 'hideWindow'
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  follow: function () {
    console.log('Congrats you are now following this user!');
  },

  hideWindow: function () {
    $('.uploader').tooltipster('hide');
  },

  view: function () {
    Backbone.history.navigate("users/" + this.model.get('uploader').id,
      { trigger: true} );
  }
});
