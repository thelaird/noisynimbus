NoisyNimbus.Views.Navbar = Backbone.View.extend({
  template: JST['layout/navbar'],

  events: {
    'click .sign-out': 'signOut'
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  signOut: function(event) {
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
